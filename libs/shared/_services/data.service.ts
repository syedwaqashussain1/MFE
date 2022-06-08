import {Injectable} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {IUsers, IGridConfig} from '../interface'
import {Observable, Subject} from 'rxjs';
import {TemplateService} from '../_services/template.service';
import {ConstantsService} from '../_services/constants.service';
import {AuthService} from '../_services/auth.service';
import {filter} from 'rxjs-compat/operator/filter';
import {isArray} from "ngx-bootstrap/chronos";

@Injectable()

export class DataService {
  constructor(public apiService: ApiService, public constantsService: ConstantsService, public templateService: TemplateService, public authService: AuthService) {
  }

  private _data: any;
  public dashBoardDate = new Subject();

  private static __data: any;

  public get data(): any {
    return this._data;
  }

  public set data(value) {
    this._data = value;
  }

  public static get staticData(): any {
    return this.__data;
  }

  public static set staticData(value) {
    this.__data = value;
  }

  getLoggedInUserFromServer(resp: (result: any) => void) {

    this.apiService.create('user/loggedinuser', false)
      .get({}, (res, isSuccess) => {
        if (isSuccess) {
          resp(res.data);
        }
      });
  }

  setDashboardDate(date: Date) {
    this.dashBoardDate.next(date);
  }

  getVehicleTypeName(vehicle) {
    let autoDealerMake = [];

    if (vehicle && vehicle.auto_dealer_vehicle_make_id) {
      autoDealerMake = vehicle.auto_dealer_vehicle_make_id.split(',')
    }

    //for new vehicle
    if (vehicle.vehicle_type_id == 1) {
      return "New";
    }
    //for certified vehicle
    else if (vehicle.vehicle_type_id == 2 && autoDealerMake.findIndex(x => Number(x) == Number(vehicle.vehicle_make_id)) != -1 && vehicle.is_certified == 1) {
      return "Certified";
    }
    //for Brand vehicle
    else if (vehicle.vehicle_type_id == 2 && autoDealerMake.findIndex(x => Number(x) == Number(vehicle.vehicle_make_id)) != -1 && (vehicle.is_certified == 0 || vehicle.is_certified == null)) {
      return "Non-Certified";
    }
    //for other used vehicle
    else if (vehicle.vehicle_type_id == 2 && autoDealerMake.findIndex(x => Number(x) == Number(vehicle.vehicle_make_id)) == -1) {
      return "Other Makes";
    }
  }

  getVehicleTypeSlug(vehicle) {

    //for new vehicle
    if (vehicle.vehicle_type_id == 1) {
      return "new";
    }
    //for certified vehicle
    else if (vehicle.vehicle_type_id == 2 && vehicle.vehicle_make_id == vehicle.auto_dealer_vehicle_make_id && vehicle.is_certified == 1) {
      return "used_certified";
    }
    //for Brand vehicle
    else if (vehicle.vehicle_type_id == 2 && vehicle.vehicle_make_id == vehicle.auto_dealer_vehicle_make_id && (vehicle.is_certified == 0 || vehicle.is_certified == null)) {
      return "used_brand";
    }
    //for other used vehicle
    else if (vehicle.vehicle_type_id == 2 && vehicle.vehicle_make_id != vehicle.auto_dealer_vehicle_make_id) {
      return "other_used";
    }
  }

  getVehicleYears() {
    let yearFrom = this.constantsService.getConstants().VEHICLE_YEAR.CURRENT_YEAR_MINUS_FROM;
    let yearTo = this.constantsService.getConstants().VEHICLE_YEAR.CURRENT_YEAR_PLUS_TO;
    let startYear = new Date(new Date().setFullYear(new Date().getFullYear() + yearTo)).getFullYear();
    let years = []
    for (var i = startYear; i > startYear - yearFrom; i--) {
      years.push(i);
    }

    return years;
  }

  getVehicleStatus(vehicle) {
    let status = 'In Stock';

    if (vehicle.status_slug == 'sold' && vehicle.is_deal_closed == 1) {

      status = 'Sold / Close Deal';
    } else if (vehicle.status_slug == 'sold' && vehicle.is_delivered == 0) {

      status = 'Sold / Not Delivered';
    } else if (vehicle.status_slug == 'sold' && vehicle.is_delivered == 1) {

      status = 'Sold / Delivered';
    } else if (vehicle.status_slug == 'sold') {

      status = 'Save / Store';
    }

    return status;
  }

  getAutoDealerVehicleMakeId() {

    let loggedInUserInfo = this.authService.getUserSession();
    const vehicleMakes = loggedInUserInfo.autoDealer.vehicleMakes as Array<any>;
    return vehicleMakes.map((x) => {
      return x.id
    });
  }

  makeVehicleDisplayFormat(make, model, year) {

    if (make == "" || model == "" || year == "") {

      return "";
    }

    return year + " " + make + " " + model;
  }

  getAutoDealerInfoFromServer(type = 'Observable') {
    let loggedInUserInfo = this.authService.getUserSession();
    let autoDealerId = loggedInUserInfo.autoDealer.id;

    if (type == 'Observable') {

      return this.apiService.create('autodealer/' + autoDealerId).getObservable({});
    }
  }

  calculateColumnTotal(data: any[], fields: string[]) {
    let total = 0;

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      for (let field_idx = 0; field_idx < fields.length; field_idx++) {
        const field = fields[field_idx];
        total += Number.parseFloat(element[field])
      }
    }

    return total;
  }

  computeTotal(obj: any) {
    let subTotal: any = {};
    if (isArray(obj)) {
      obj.forEach(element => {
        let ele: any = element
        for (const key in ele) {
          if (Object.prototype.hasOwnProperty.call(element, key) && !isNaN(element[key])) {
            subTotal[key] = (isNaN(subTotal[key]) ? 0 : subTotal[key]) + element[key];
          }
        }
      });
      return subTotal;
    } else {
      return obj;
    }
  }

  computeFooterAverage(gridConfig: IGridConfig): any[] {
    let average = 0;
    let number = 0;
    gridConfig.footerData.forEach(element => {
      for (const key in element) {
        if (Object.prototype.hasOwnProperty.call(element, key) && !isNaN(element[key])) {
          let total = element.label.toLowerCase().includes('sub') ? gridConfig.records.length : gridConfig.recordsCount;
          average = Number(this.templateService.numberWithTwoDecimalPlaces(Number(element[key]) / Number(total)));
          number = Number(element[key]);
          element[key] = {value: number.toFixed(2), average: average};
        }
      }
    });
    return gridConfig.footerData;
  }

  changeElementPos(data: any[], field, fieldValue, index = 0) {
    data.forEach((x, ind, arr) => {
      if (x[field] == fieldValue) {
        let element = data.splice(ind, 1)[0];
        data.splice(index, 0, element)
      }
    })
    return data;
  }

  fillAgGrid(data, grid: IGridConfig) {
    let scope = this;
    let footerData = [];

    grid.footerData = [];
    scope.templateService.convertAllStringsIntoNumber(data.rows);

    grid.records = data.rows;
    grid.recordsCount = data.count;

    if (Object.keys(data.grandTotal).length > 0 && grid.records.length > 0) {
      data.grandTotal = scope.templateService.convertAllStringsIntoNumber(data.grandTotal)
      data.grandTotal = scope.computeTotal(data.grandTotal)
      grid.footerData.push(data.grandTotal);
      grid.footerData[0].label = 'Grand Total';

      let records = scope.computeTotal(grid.records)
      records.label = 'Sub Total';
      grid.footerData.splice(0, 0, records);

      grid.footerData = Object.assign([], scope.computeFooterAverage(grid));
      console.log('-----------------------');
      console.log(grid.footerData);
    }

    return grid;
  }

  fillServerSideAgGrid(serverSideParams, grid: IGridConfig) {
    if (serverSideParams) {
      serverSideParams.params.successCallback(grid.records, grid.recordsCount.valueOf())
      serverSideParams.agGridStatusBarComponent.totalRecords = grid.recordsCount.valueOf();
    }
  }

  setAgGridFilters(params, filters) {

    this.setAgGridSortModel(filters, params)
    this.setAgGridFilterModel(filters, params)

    filters.pageInfo.offset = params.request.startRow;
    filters.pageInfo.limit = params.request.endRow - params.request.startRow;
    return filters;
  }

  resetAgGridFilters(params) {
    params.params.api.rowModel.reset();
    params.agGridStatusBarComponent.page = 0;
  }

  setAgGridSortModel(filters, params) {

    console.log(params);

    const p: any = params;
    if (p) {
      const sortModel = (p.api.sortController) ? p.api.sortController.getSortModel() : [];
      const sortColumns = [];

      sortModel.forEach((model) => {
        const colDef = p.api.valueService.columnController.gridColumns.find((a) => {
          return a.colId == model.colId
        }).colDef;
        model.column = (typeof colDef.sortColumn == 'string') ? colDef.sortColumn : colDef.sortColumn[0];
        if (colDef.filterParams && colDef.filterParams.sortColumn) {
          model.column = (typeof colDef.filterParams.sortColumn == 'string') ? colDef.filterParams.sortColumn : colDef.filterParams.sortColumn[0];
        }
        sortColumns.push(model);
      });
      const sort: any = {};
      if (sortColumns.length > 0) {
        sort.sortField = sortColumns[0].column;
        sort.sortOrder = sortColumns[0].sort;
      }
      filters.sort = sort;
    } else {
      filters.sort = null;
    }
    return filters;
  }

  setAgGridFilterModel(filters, params) {
    // Check For empty Object
    if (Object.keys(params.request.filterModel).length === 0 && params.request.filterModel.constructor === Object) {
      filters.col_search = null;
    }
    // if Not empty
    else {
      for (const key in params.request.filterModel) {
        if (Object.prototype.hasOwnProperty.call(params.request.filterModel, key)) {
          let element = params.request.filterModel[key];
          element.search = params.columnApi.getColumn(key).colDef.search;
        }
      }
      filters.col_search = params.request.filterModel;
    }
    return filters;
  }

}
