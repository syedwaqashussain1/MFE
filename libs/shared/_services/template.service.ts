import { Injectable } from '@angular/core';
import { Validators, FormArray, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from './auth.service';
import { ConstantsService } from './constants.service';
// import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { CommonData } from '../commonData'
import { IGridConfig, ISearch } from '../interface';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Injectable()

export class TemplateService {
  public static embeddedComponentData: any = {};
  private _tempData: any;

  public eventEmitter: Subject<Object> = new Subject();


  constructor(private authService: AuthService, private constantService: ConstantsService, private route: ActivatedRoute
    // , private messageService: MessageService
    , private confirmationService: ConfirmationService
  ) {

  }

  loader: boolean = false;
  totalRowsInTable: number = 20;
  formatMoment: string = 'MM/DD/YYYY';
  formatDateTimeMoment: string = 'MM-DD-YYYY hh:mm:ss';
  formatMomentSendToServer: string = 'YYYY-MM-DD';
  formatDateTimeAPMMoment: string = 'MM-DD-YYYY hh:mm A';
  public static messageNotificationChange: Subject<Object> = new Subject();
  public static confirmationNotificationChange: Subject<Object> = new Subject();
  decimal_separator = '.';
  thousands_separator = ',';
  prefix = '$';

  // toggleLoader(showLoader){
  //     this.loader=showLoader;
  //     this.cdr.detectChanges();
  // }

  success(successMsg: string) {
    TemplateService.messageNotificationChange.next({
      severity: 'success',
      summary: 'Success!',
      detail: successMsg,
      key: 'customToast',
      life: 5000
    });
  }

  info(infoMsg: string) {
    TemplateService.messageNotificationChange.next({
      severity: 'info',
      summary: 'Info!',
      detail: infoMsg,
      key: 'customToast',
      life: 5000
    });
  }

  warn(warningMsg: string) {
    TemplateService.messageNotificationChange.next({
      severity: 'warn',
      summary: 'Warning!',
      detail: warningMsg,
      key: 'customToast',
      life: 5000
    });
  }

  error(errorMsg: string) {
    TemplateService.messageNotificationChange.next({
      severity: 'error',
      summary: 'Error!',
      detail: errorMsg,
      key: 'customToast',
      life: 5000
    });
  }

  popMessage({ severity = 'error', summary = 'Error!', detail = '', data = {}, key = 'customToast', life = 5000}) {
    TemplateService.messageNotificationChange.next({
      severity: severity,
      summary: summary,
      detail: detail,
      data: data,
      key: key,
      life: life,
      closable: false
    });
  }

  // confirmationMessage({ severity = 'error', summary = 'Error!', detail = '', data = {}, key = 'customToast', life = 5000 }) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to proceed?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.msgs = [{ severity: severity, summary: 'Confirmed', detail: 'You have accepted' }];
  //     },
  //     reject: () => {
  //       this.msgs = [{ severity: severity, summary: 'Rejected', detail: 'You have rejected' }];
  //     });
  //   // TemplateService.messageNotificationChange.next({
  //   //   severity: severity,
  //   //   summary: summary,
  //   //   detail: detail,
  //   //   data: data,
  //   //   key: key,
  //   //   life: life,
  //   //   closable: false
  //   // });
  // }

  isFloat(n): boolean {
    return (Number(n) === n && n % 1 !== 0) ? true : false;
  }

  trackingRoundOff(n) {
    if (this.isFloat(n)) {
      const integer = parseInt(n);
      return (n % integer) <= 0.50 ? Number(integer + 0.5) : Number(integer + 1);
    }
    return n;
  }

  convertIntoNumber(num: any) {
    return (num) ? Number(num) : null;
  }

  numberWithCommas(x): any {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  numberWithDollarAndCommas(x): any {
    x = this.numberWithTwoDecimalPlaces(x);
    return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  numberWithTwoDecimalPlaces(num: number) {
    return this.isFloat(num) ? num.toFixed(2) : num;
  }

  roundOffNumber(num: number, precision: number = 2) {
    return this.isFloat(num) ? Number(num.toFixed(precision)) : num;
  }

  deepCopyArray(data: any): any {
    let newArrayObj = JSON.stringify(data);
    newArrayObj = JSON.parse(newArrayObj);

    return newArrayObj;
  }

  convertAllStringsIntoNumber(obj) {
    let scope = this;
    if (Array.isArray(obj)) {
      obj.forEach(element => {
        scope.convertAllStringsIntoNumber(element);
      });
    }

    for (var key in obj) {
      if (Array.isArray(obj[key]) || typeof (obj[key]) == 'object') {
        scope.convertAllStringsIntoNumber(obj[key]);
      }
      else {
        obj[key] = (isNaN(obj[key]) || typeof (obj[key]) == 'number') ? obj[key] : Number(obj[key]);
      }
    }
    return obj;
  }

  addRemoveFieldValidation(formGroup, fields, action) {

    for (var i = 0; i < fields.length; i++) {
      let fieldName = fields[i];

      if (action == 'add') {

        formGroup.get(fieldName).setValidators([Validators.required]);
        formGroup.get(fieldName).updateValueAndValidity();
      } else if (action == 'remove') {

        formGroup.get(fieldName).clearValidators();
        formGroup.get(fieldName).updateValueAndValidity();
      }
    }
  }

  gcd(a, b) {
    return (b == 0) ? a : this.gcd(b, a % b);
  }

  NulltoEmptyString(value) {
    value = value == null ? '' : value;
  }

  emptyFields(formGroup, fields) {

    var formFields = formGroup.value;

    for (var key in formFields) {
      if (formFields.hasOwnProperty(key)) {

        if (fields.indexOf(key) != -1) {
          formGroup.controls[key].setValue('');
        }
      }
    }
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  rowsPerPageOpt(perPage?: any) {

    var rowsPerPageOptions: number[] = [
      50, 100, 250, 500, 1000
    ];
    //Min length of rows per page should not less than 20
    // if (perPage > 24) {
    //     rowsPerPageOptions.push(perPage / 2);
    // }
    // rowsPerPageOptions.push(perPage);
    // rowsPerPageOptions.push(perPage * 2);
    // rowsPerPageOptions.push(perPage * 5);
    // rowsPerPageOptions.push(perPage * 10);

    return rowsPerPageOptions;
  }

  makePaginationObject(event) {
    //return (Number(n) === n && n % 1 !== 0) ? true : false;
    let page = {};
    let totalSaleRowsInTableDB: boolean = false;
    page['page'] = event;
    page['page']['offset'] = event.first;

    if (event.rows != undefined) {

      page['page']['limit'] = event.first + event.rows;
      page['page']['totalSaleRowsInTable'] = event.rows;
    } else {

      page['page']['totalSaleRowsInTable'] = null;
    }

    return page;
  }

  //sale units tracking
  getUnitTracking(totalSale: number, numberOfDays: number, dealerWorkingDays): number {
    return numberOfDays == 0 ? 0 : (totalSale / numberOfDays) * (dealerWorkingDays);
  }

  //tracking other than sales unit
  getTotalTracking(value: number, totalSale: number, trackingUnitSold): number {
    return (value / totalSale) * (trackingUnitSold);
  }

  //sale units average
  getUnitAverage(unitSold: number, workedDays: number): number {
    return workedDays == 0 ? 0 : unitSold / workedDays;
  }

  //total average other than sales unit
  getTotalAverage(value: number, unitSold: number): number {
    if (value < 0 && unitSold < 0) {
      return value / -(unitSold);
    }
    else {
      return value / unitSold;
    }
  }

  covertFirstCharacterUpperCase(word) {
    word.replace(/^\w/, c => c.toUpperCase());
  }

  getTodaysDate() {
    return moment().format(this.formatMoment);
  }

  getCurrentMonthName() {
    return moment().format('MMMM');
  }

  getCurrentDayName(date?: any) {
    return typeof date == 'undefined' ? moment().format('dddd') : moment(date).format('dddd');
  }

  getCurrentMonthNumber(date?) {
    return typeof date == 'undefined' ? moment().format('M') : moment(date).format('M');
  }

  getCurrentYearNumber(date?) {
    return typeof date == 'undefined' ? moment().format('Y') : moment(date).format('Y');
  }

  getCurrentMonthYearName(date?) {
    return typeof date == 'undefined' ? moment().format('MMMM YYYY') : moment(date).format('MMMM YYYY');
  }

  getCurrentYearName() {
    return moment().format('YYYY');
  }

  getCurrentDayNumber(date?) {
    return typeof date == 'undefined' ? moment().format('D') : moment(date).format('D');
  }

  getNumberOfDaysInAMonth(date?) {
    return typeof date == 'undefined' ? moment().daysInMonth() : moment(date).daysInMonth();
  }

  convertStringToFloat(value) {
    return parseFloat(value);
  }

  getFirstDateOFMonth(date) {
    return typeof date == 'undefined' ? moment().startOf('month') : moment(date).startOf('month');
  }

  getLastDateOFMonth(date) {
    return typeof date == 'undefined' ? moment().endOf('month') : moment(date).endOf('month');
  }

  lastTenYears(date?) {
    const preTenthYear = typeof date != 'undefined' ? parseInt(moment(date).subtract(9, 'year').format('YYYY')) : parseInt(moment().subtract(9, 'year').format('YYYY'));
    let lastTenYears: number[] = [];
    for (let index = 0; index < 10; index++) {
      lastTenYears.push(preTenthYear + index);
    }
    return lastTenYears;
  }

  getDiffInDays(startDate, endDate) {

    return moment(moment(startDate).format('YYYY-MM-DD')).diff(moment(endDate), 'days');
  }

  formatDateForDatePicker(date) {
    if (date != '0000-00-00' && date != 'Invalid date' && date != '' && date != null) {

      return moment(date).format(this.formatMoment);
    }
  }

  formatDateForServer(date) {
    if (date != '0000-00-00' && date != 'Invalid date' && date != '' && date != null) {

      return moment(date).format(this.formatMomentSendToServer);
    }
  }

  setComparsionColor(actual: any, comparsion: any[], field: string, index: number, isCompareId: Boolean = false, primaryKey: string = null, isDealslug: Boolean = false) {

    if (comparsion && comparsion.length > 0) {
      try {
        let actualNumber: number = actual[field];
        let comparisionNumber: number;

        if (isCompareId) {
          let actualId = actual[primaryKey], comparsionId: number;

          if (!isDealslug) {
            comparsion.forEach(x => {
              if (x[primaryKey] == actualId) {
                comparsionId = x[primaryKey];
                comparisionNumber = x[field];
              }
            })
          }
          else {
            for (let index = 0; index < CommonData.deal_slug.length; index++) {

              const element = CommonData.deal_slug[index];
              let actualDealSlug = actual['deal_slug'];

              comparsion.forEach(x => {
                if (x[primaryKey] == actualId && x['deal_slug'] == actualDealSlug) {
                  comparsionId = x[primaryKey];
                  comparisionNumber = x[field];
                }
              });

            }
          }

          if (actualNumber && comparisionNumber && actualId == comparsionId) {
            return actualNumber > comparisionNumber ? 'txt-cl-green' : 'txt-cl-red';
          }
          else {
            return '';
          }
        }
        else {
          comparisionNumber = comparsion[index] != undefined ? comparsion[index][field] : null;

          if (actualNumber && comparisionNumber)
            return actualNumber > comparisionNumber ? 'txt-cl-green' : 'txt-cl-red';
          else {
            return '';
          }
        }
      }
      catch (e) {
        console.log('error', comparsion[index]);
        debugger;
      }
    }
  }


  getPastYearDate(startdate, endDate) {
    if ((startdate != '0000-00-00' && startdate != 'Invalid date' && startdate != '' && startdate != null) ||
      (endDate != '0000-00-00' && endDate != 'Invalid date' && endDate != '' && endDate != null)
    ) {
      let subtractStartDate, subtractEndDate;
      let diffYear = moment(endDate).diff(moment(startdate), 'years') + 1;

      subtractStartDate = moment(startdate).subtract(diffYear, 'years');
      subtractEndDate = moment(endDate).subtract(diffYear, 'years');

      return { startDatePast: subtractStartDate, endDatePast: subtractEndDate };
    }
  }

  isEmptyObject = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  };

  isEmptyVariable = function (field) {
    if (field) {
      return true;
    }

    return false;
  };

  getTimeInterval(startTime, endTime) {
    const s = moment.duration(moment(endTime).diff(moment(startTime)));
    return s.hours() + 'H ' + s.minutes() + 'M ' + s.seconds() + 'S';
  }

  //Function to get the number of days which has been passed
  getPassedDayNumber = function (date) {

    var lastDayOfMonth = moment(date).endOf('month');
    var currentDate = moment();

    if (lastDayOfMonth.diff(currentDate, 'days') < 0) {

      return lastDayOfMonth.diff(currentDate, 'days');
    } else {
      return parseInt(moment().format('D'));
    }
  };

  set tempData(data) {
    this._tempData = data;
  }

  get tempData() {
    return this._tempData;
  }

  getRoleType(url) {
    if (url.search('sale_person') != -1) {
      return 'sale_person';
    }
    if (url.search('sale_manager') != -1) {
      return 'sale_manager';
    }
    if (url.search('finance_manager') != -1) {
      return 'finance_manager';
    }
    if (url.search('closer_manager') != -1) {
      return 'closer_manager';
    }
  }

  /*CHECK MODULE PERMISSIONS*/
  hasAnyAuthority(authorities): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }

  hasAnyAuthorityDirect(authorities): boolean {

    const user = this.getCurrentUser();
    if (user.userType.user_type_slug == 'admin-user' || user.userType.user_type_slug == 'auto-group-user') {
      return true;
    }

    let permissions = {};
    const url = this.route.snapshot['_routerState'].url;
    if ((url.split('?')[0] === '/dashboard' && this.route.snapshot.queryParams.roleType) || (url.search('/sales/view') != -1 && (url.search('sale_person') != -1 || url.search('sale_manager') != -1 || url.search('finance_manager') != -1 || url.search('closer_manager') != -1))) {
      const roleType = this.route.snapshot.queryParams.roleType ? this.route.snapshot.queryParams.roleType : this.getRoleType(url);
      permissions = this.authService.getRoleTypeSession(roleType);
      for (let key in permissions) {
        if (key.match(/dashboard.dashboard_stats.*.clickable/)) {
          permissions[key] = true;
        }
      }
    }
    else {
      permissions = this.authService.getUserSession().app_permissions;
    }

    let result = false;
    authorities.forEach((permission, ind) => {
      if (permissions && permissions[permission] && permissions[permission] === true) {
        result = true;
      }
    });
    return result;
  }

  hasAllAuthority(authorities): Promise<boolean> {
    return Promise.resolve(this.hasAllAuthorityDirect(authorities));
  }

  hasAllAuthorityDirect(authorities): boolean {
    const user = this.getCurrentUser();
    let permissions = {}, permissionCount = 0;

    if (user.userType.user_type_slug == 'admin-user' || user.userType.user_type_slug == 'auto-group-user') {
      return true;
    }
    permissions = this.authService.getUserSession().app_permissions;

    let result = false;
    authorities.forEach((permission, ind) => {
      if (permissions && permissions[permission] && permissions[permission] === true) {
        permissionCount++;
      }
    });
    result = authorities.length == permissionCount;
    return result;
  }

  hasActionAuthority(authorities): Promise<boolean> {
    return Promise.resolve(this.hasActionAuthorityDirect(authorities));
  }

  hasActionAuthorityDirect(authorities): boolean {
    const user = this.getCurrentUser();
    let result = false;

    authorities.forEach((permission, ind) => {
      if (user.userType.user_type_slug == permission) {
        result = true;
      }
    });
    return result;
  }

  maskColumn(data, authorities = []) {
    if (!this.hasActionAuthorityDirect(authorities)) {
      return '****'
    }
    else {
      return data
    }
  }

  permissionBasedCols(columnDefs: []) {
    let children = [], parentIndexs = [], childidxs = [];

    columnDefs.forEach((parentElement, parentIdx) => {
      // Check Parent Permission
      if (parentElement['parentPermission'] && !this.hasAllAuthorityDirect(parentElement['parentPermission'])) {
        parentIndexs.push(parentIdx)
      }
      // Check Parent Permission at child level
      else if (parentElement['children']) {
        children = parentElement['children'];
        children.forEach((element, childIdx) => {
          if (element['parentPermission'] && !this.hasAllAuthorityDirect(element['parentPermission'])) {
            childidxs.push({ parent: parentIdx, child: childIdx })
          }
        });
      }
      // Check Permission
      if (parentElement['permission'] && !this.hasAnyAuthorityDirect(parentElement['permission'])) {
        parentIndexs.push(parentIdx)
      }
      // Check Permission at child level
      else if (parentElement['children']) {
        children = parentElement['children'];
        children.forEach((element, childIdx) => {
          if (element['permission'] && !this.hasAnyAuthorityDirect(element['permission'])) {
            childidxs.push({ parent: parentIdx, child: childIdx })
          }
        });
      }
    });

    //remove elements of parent if they don't have permission
    for (var i = parentIndexs.length - 1; i >= 0; i--) {
      columnDefs.splice(parentIndexs[i], 1)
    }

    //remove elements of child if they don't have permission
    for (var i = childidxs.length - 1; i >= 0; i--) {
      (<[]>columnDefs[childidxs[i].parent]['children']).splice(childidxs[i].child, 1)
    }
  }

  deepMerger(target, source) {
    if (source) {
      for (const key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], this.deepMerger(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }

  makeAddress(address) {
    let addr = '';
    addr += (address.address_line1 != '' && address.address_line1 != null) ? address.address_line1 : '';
    addr += (address.city != '' && address.city != null) ? ', ' + address.city : '';
    addr += (address.state != '' && address.state != null) ? ', ' + address.state : '';
    addr += (address.zip != '' && address.zip != null) ? ', ' + address.zip : '';

    return addr;
  }

  getCurrentDate() {
    return moment().format(this.formatMomentSendToServer);
  }

  userHasPermission(requiredPermission): boolean {
    const permiss: string[] = (typeof requiredPermission === 'string') ? [requiredPermission] : requiredPermission;
    const currentUser = this.authService.getUserSession();
    const userCurrentPermissions = currentUser.permissionsData;
    let pe = false;
    permiss.forEach((p) => {
      if (userCurrentPermissions && userCurrentPermissions.length > 0 && userCurrentPermissions.indexOf(p) !== -1) {
        pe = true;
      }
    });
    return pe;
  }

  getVehicleTypes(): any {
    let vehicleTypes = [];
    if (this.authService.getUserSession() &&
      this.authService.getUserSession().autoDealer && this.authService.getUserSession().autoDealer.vehicleClassifications) {
      vehicleTypes = this.authService.getUserSession().autoDealer.vehicleClassifications;
    }
    return vehicleTypes;
  }

  getObjectFromArray = function (col, val, dataObj) {

    for (let element of dataObj) {
      if (element[col] === val) {
        return element;
      }
    }
  };


  getValueFromObject($array, $key, $emptyValue = '') {
    const $keys = $key.split('.');
    let $arrayClone = $array;
    for (var $k in $keys) {
      if (typeof $arrayClone[$keys[$k]] != undefined) {
        $arrayClone = $arrayClone[$keys[$k]];
      } else {
        $arrayClone = '';
      }
    }

    if (!$arrayClone) {
      $arrayClone = $emptyValue;
    }
    return $arrayClone;
  }


  validateDate(date, format = 'YYYY-MM-DD') {
    if (date && date !== '' && date != null && date !== '0000-00-00' && date !== 'Invalid date') {
      if (format === 'object') {
        return moment(date).toDate();
      } else {
        return moment(date).format(format);
      }
    }
    return '';
  }
  validateDatePickerDate(date) {
    if (date && date !== '' && date != null && date !== '0000-00-00' && date !== 'Invalid date') {
      return moment(date).toDate();
    }
    return null;
  }

  getImagePath(userId) {
    if (userId) {
      const userImages = this.authService.getAllUserImagesSession();
      const image = userImages.find(x => x.id == userId);
      return typeof image == 'undefined' ? '' : image.image_path;
    }
    else {
      return '';
    }
  }
  getUserAbbr(userId) {
    if (userId) {
      const userImages = this.authService.getAllUserImagesSession();
      const image = userImages.find(x => x.id == userId);
      return typeof image == 'undefined' ? '' : image.first_name + ' ' + image.last_name;
    }
    else {
      return '';
    }
  }

  getAbbreName(userName) {
    if (userName) {
      const completeName = userName.split(' ');
      let abbre = completeName[0].charAt(0).toUpperCase();
      abbre += completeName[1] ? completeName[1].charAt(0).toUpperCase() : '';
      abbre += completeName[2] ? completeName[2].charAt(0).toUpperCase() : '';
      abbre += completeName[3] ? completeName[3].charAt(0).toUpperCase() : '';

      return abbre;
    }
    else {
      return '';
    }
  }

  deepMergePermissions(template, permissions) {
    if (permissions) {
      template.forEach((levelOne, indOne) => {
        levelOne.data.forEach((levelTwo, indTwo) => {
          const lvlOneFilter = permissions[indOne].data.filter((item, i) => {
            return (levelTwo.slug === item.slug);
          });
          if (lvlOneFilter.length === 0) {
            permissions[indOne].data.splice(indTwo, 0, levelTwo);
          }
          if (levelTwo.attributes) {
            levelTwo.attributes.forEach((levelThree, indThree) => {
              const lvlThreeFilter = permissions[indOne].data[indTwo].attributes.filter((item, i) => {
                return (levelThree.slug === item.slug);
              });
              if (lvlThreeFilter.length === 0) {
                permissions[indOne].data[indTwo].attributes.splice(indThree, 0, levelThree);
              }
            });
          }

        });
      });
      return permissions;
    } else {
      return template;
    }
  }

  formatDateTimeAPM = function (dateString) {

    if (dateString != "") {
      return moment(dateString).format('YYYY-MM-DD hh:mm A');
    } else {
      return "";
    }

  }

  getDynamicLabel(data, field, staticLabel) {

    const isFound = data.find(x => x.field == field);

    if (isFound != undefined) {

      return isFound['value'];
    }

    return staticLabel;
  }

  paginationInfo(event) {
    //console.log(event);
    const pagination: any = {
      start: event.first,
      limit: event.rows,
      end: (event.first + event.rows) - 1,
    }
    if (event.sortField) {
      pagination.sort = {
        sortField: event.sortField,
        sortOrder: event.sortOrder,
      }
    }
    return pagination;
  }

  getCurrentUser() {
    return AuthService._loggedInUserData;
  }

  getDealerTimezone() {
    return (this.getCurrentUser().autoDealer && this.getCurrentUser().autoDealer.appTimezone ) ? this.getCurrentUser().autoDealer.appTimezone.timezone : '';
  }

  getGridConfig(): IGridConfig {
    let gridConfig: IGridConfig = {
      records: [],
      recordsCount: 0,
      lazyLoadingData: {},
      footerData: [],
      perPageOptions: this.rowsPerPageOpt(0),
      rowsPerPage: this.rowsPerPageOpt(0)[0],
      filter: {
        search: '',
        year: moment().format('YYYY'),
        from: moment().format('YYYY-MM-01'),
        to: moment().format('YYYY-MM-') + moment().daysInMonth()
      }
    };
    return gridConfig;
  }
  camelCase(value) {
    let result = '';
    if (value && typeof value === 'string') {
      let splittedValues = value.split(' ');

      splittedValues.forEach((element, index) => {
        //element = element.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        result += index != 0 ? ` ${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}` : element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    }
    return result;
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };

  customSort(data: any, event: any, option: string = 'sort') {
    let previousValue: any;
    let currentValue: any;
    let comparer = function (a, b) {
      previousValue = eval(`a.${event.field}`);
      currentValue = eval(`b.${event.field}`);

      const value1 = isNaN(previousValue) ? previousValue : Number(previousValue);
      const value2 = isNaN(currentValue) ? currentValue : Number(currentValue);

      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      }
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return result;
    };

    return data[option](comparer);
  }


  dictCompClass(original, compared, type1, type2, type3) {
    if (original[type1] && compared[type1] && original[type1][type2] && compared[type1][type2] &&
      original[type1][type2][type3] && compared[type1][type2][type3]) {
      return this.compareClass(original[type1][type2][type3], compared[type1][type2][type3])
    }
    else {
      return 'txt-cl-green';
    }
  }

  compareClass(orignalvalue, comparedvalue) {
    return orignalvalue >= comparedvalue ? 'txt-cl-green' : 'txt-cl-red';
  }

  getDealerScoreClass(autoDealer, value) {
    if (parseFloat(value) && (autoDealer.district_compare || autoDealer.national_compare || autoDealer.zone_compare)) {
      value = Number(value);
      if (autoDealer.district_compare && autoDealer.national_compare && autoDealer.zone_compare) {
        autoDealer.district_score = Number(autoDealer.district_score);
        autoDealer.national_score = Number(autoDealer.national_score);
        autoDealer.zone_score = Number(autoDealer.zone_score);
        const maxValue = Math.max(autoDealer.district_score, autoDealer.national_score, autoDealer.zone_score);
        return this.compareClass(value, maxValue);
      }
      if (autoDealer.district_compare && autoDealer.national_compare) {
        autoDealer.district_score = Number(autoDealer.district_score);
        autoDealer.national_score = Number(autoDealer.national_score);
        const maxValue = Math.max(autoDealer.district_score, autoDealer.national_score);
        return this.compareClass(value, maxValue);
      }
      if (autoDealer.national_compare && autoDealer.zone_compare) {
        autoDealer.national_score = Number(autoDealer.national_score);
        autoDealer.zone_score = Number(autoDealer.zone_score);
        const maxValue = Math.max(autoDealer.national_score, autoDealer.zone_score);
        return this.compareClass(value, maxValue);
      }
      if (autoDealer.district_compare && autoDealer.zone_compare) {
        autoDealer.district_score = Number(autoDealer.district_score);
        autoDealer.zone_score = Number(autoDealer.zone_score);
        const maxValue = Math.max(autoDealer.district_score, autoDealer.zone_score);
        return this.compareClass(value, maxValue);
      }
      if (autoDealer.district_compare) {
        autoDealer.district_score = Number(autoDealer.district_score);
        return this.compareClass(value, autoDealer.district_score);
      }
      if (autoDealer.national_compare) {
        autoDealer.national_score = Number(autoDealer.national_score);
        return this.compareClass(value, autoDealer.national_score);
      }
      if (autoDealer.zone_compare) {
        autoDealer.zone_score = Number(autoDealer.zone_score);
        return this.compareClass(value, autoDealer.zone_score);
      }
    }
  }

  parseCurrencyFormat(value: string): number {
    let [integer, fraction] = (value || "").replace(this.prefix, "").replace(new RegExp(this.thousands_separator, "g"), "")
      .split(this.decimal_separator);

    fraction = this.getFraction(fraction);

    return Number(integer + fraction);
  }

  private getFraction(fraction: string) {
    if (typeof fraction == 'undefined')
      fraction = '';
    else if (fraction.length)
      fraction = this.decimal_separator + fraction;
    else if (fraction.length == 0)
      fraction = '.';
    return fraction;
  }

  checkNanOrInfinity(number) {
    return isNaN(number) || !isFinite(number)
  }

  fillNanorInfinity(number, character = '-') {
    return this.checkNanOrInfinity(number) ? character : number
  }

  getFormSummaryHtml(formGroup, fg_discription){
    let allErrors = this.getFormSummary(formGroup, '');
    let error_obj = this.setErrorFormat(allErrors, fg_discription)
    if (error_obj){
      let html = this.getHtmlFromObject(error_obj, '')

      return html;
    }
  }

  getHtmlFromObject(error_obj, html) {
    if (error_obj.value) {
      for (let index = 0; index < error_obj.value.length; index++) {
        const element = error_obj.value[index];
        html += `<ul> <li>`;
        html += element.text;

        if (element.value) {
          html = this.getHtmlFromObject(element.value, html)
        }
        html += ` </li> </ul>`;
      }
    }
    else if (error_obj.length > 0) {
      html += `<ul>`;
      for (let index = 0; index < error_obj.length; index++) {
        const element = error_obj[index];
        html += element.text;
        if (element.value) {
          html = this.getHtmlFromObject(element.value, html)
        }
        else {
          // to Remove last appended text
          html = html.substring(0, html.length - element.text.length);
          html += `<li> ${element.text} </li>`
        }
      }
      html += `</ul>`;
    }
    else {
      html += error_obj.text;
    }
    return html
  }

  getFormSummary(formGroup, parentGroup) {
    let errors = []
    for (const key in formGroup) {
      if (Object.prototype.hasOwnProperty.call(formGroup, key)) {
        const element = formGroup[key];
        if (element instanceof FormGroup) {
          parentGroup = parentGroup == '' ? key : parentGroup + '>' + key;
          let terror = this.getFormSummary(element.controls, parentGroup)
          errors = [...errors, ...terror]
        }
        if (element instanceof FormArray) {
          parentGroup = parentGroup == '' ? key : parentGroup + '>' + key;
          for (let index = 0; index < element.controls.length; index++) {
            let ele = element.controls[index];
            let terror = this.getFormSummary(ele["controls"], parentGroup)
            errors = [...errors, ...terror]
          }
        }
        if (element instanceof FormControl && element.valid == false && element.errors && Object.keys(element.errors).length > 0) {
          for (const errorTypes in element.errors) {
            errors.push(parentGroup + '>' + key + ':' + errorTypes)
          }
        }
      }
    }
    return errors;
  }

  setErrorFormat(errors,discription){
    let errorObj: { text: string, key: string, value: Array<any>};

    for (let index = 0; index < errors.length; index++) {
      let element = errors[index];
      let elements = element.split(':');
      let error_elements = elements[0].split('>')
      error_elements.forEach((ele,idx) => {
        if(errorObj == null){
          errorObj = { text: discription[ele], key: ele, value: null };
        }
        else if (idx > 0){
          let error_t_obj = this.getErrorElement(errorObj, ele);
          // if (error_ele_obj){
          //   error_ele_obj.value = error_ele_obj.value && error_ele_obj.value.length > 0 ? error_ele_obj.value : new Array();
          //   error_ele_obj.value.push({ text: discription[ele], key: ele, value: null })
          // }

          let error_ele_obj = this.getErrorElement(errorObj, error_elements[idx - 1]);
          if (error_ele_obj && (error_t_obj == null || error_t_obj.key != error_elements[idx])) {
            let obj = { text: discription[ele], key: ele, value: null };
            error_ele_obj.value = error_ele_obj.value && error_ele_obj.value.length > 0 ? error_ele_obj.value : new Array();
            error_ele_obj.value.push(obj)
          }
        }
      });
    }
    return errorObj;
  }

  getErrorElement(error,s_key){
    if (error.key == s_key) {
      return error;
    }
    else if (error.value && error.value.length > 0) {
      for (let index = 0; index < error.value.length; index++) {
        let ele = error.value[index];
        let objerror = this.getErrorElement(ele, s_key);
        if (objerror != null ){
          return objerror;
        }
      }
    }
  }

  searchObservable({ observable$, searchTerms,search_cb, debounce=300}) {
    observable$ = searchTerms.pipe(
      // wait 10ms after each keystroke before considering the term
      debounceTime(debounce),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((obj: ISearch) => search_cb(obj)),
    );
    return observable$;
  }

  // Arrow Function is necessary to retain 'this' scope .
  search<T>(obj: ISearch): Observable<T[]>  {
    let searchObj = {}
    searchObj[obj.field] = obj.values;
    // 'customers/getCustomerNumbers'
    let obs$ = obj.apiService.create(obj.url, false).postObservable(searchObj)
    if (!obj.values.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return obs$;
  }

  setFormDataToRawValues(data){
    return data.map(element => {
      for (const key in element) {
        if (Object.prototype.hasOwnProperty.call(element, key)) {
          if (element[key].value) {
            element[key] = element[key].value;
          }
        }
      }
      if (element.value) {
        element = element.value
      }
      return element;
    });
  }

  /**
   * Remove All item form all form arrays
   * @param {FormGroup} formGroup
   */
  resetFormArrays(formGroup) {
    for (const key in formGroup) {
      if (Object.prototype.hasOwnProperty.call(formGroup, key)) {
        const element = formGroup[key];
        if (element instanceof FormGroup) {
          this.resetFormArrays(element.controls)
        }
        if (element instanceof FormArray) {
          while (element.controls.length >0){
            (element as FormArray).removeAt(0);
          }
        }
      }
    }
  }

  IsNullOrEmpty(data){
    return data == null || data == '' ? true : false
  }

  isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  confirmPasswordValidation(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value1 = control.parent.controls[controlName].value;
      const value2 = control.value;
      const valid = value1 != value2;
      return valid ? {invalid: {value: control.value}} : null;
    };
  }

  concatDateTime(date: string, time: string):Date {
    if(date != '' && time != '' ){
      return moment(date + ' ' + time.replace('pm', ' pm').replace('am', ' am')).toDate()
    }
  }

  getDealerTime() {
    const dealer = this.getCurrentUser();
    const m = moment().utcOffset(dealer.autoDealer.timezone)
    return m;
  }

  getEmbeddedAppToken() {
    return window.localStorage.getItem('nf_embedded_token');
  }
}
