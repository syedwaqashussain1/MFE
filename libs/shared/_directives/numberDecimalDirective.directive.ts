import { Directive, Input, HostListener, ElementRef, DoCheck } from '@angular/core';
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[numberDecimal]'
})

export class NumberDecimalDirective implements DoCheck {
    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef, private ngControl: NgControl) {
        this.el = this.elementRef.nativeElement;
    }

    decimal_separator = '.';
    thousands_separator = ',';

    padding = "000000";
    oldValue: number;
    oldInputValue: string;

    @Input('decimalPoints') decimalPoints = -1;

    ngDoCheck() {
        const value = this.el.value;
        if (!isNaN(Number(value)) && value)
            this.convertToCurrrencyFormat(value, false);
    }

    @HostListener("blur", ['$event.target.value', '$event'])
    onblur(value, event) {
        if (value && value.indexOf('.') == -1) {
            this.ngControl.control.setValue(this.oldValue);
            this.el.value = value ;
        }
    }

    @HostListener("paste", ['$event.target.value', '$event'])
    onpaste(value, event) {
        setTimeout(() => {
            let val = '';
            if (isNaN(event.target.value)) {
                val = this.parse(event.target.value);
            }
            else {
                val = event.target.value;
            }
            this.onkeyup(val, event);
        });
    }


    @HostListener("keyup", ['$event.target.value', '$event'])
    onkeyup(value, event) {
        const position = this.el.selectionStart;
        const initialLength: number = value.toString().length;
        //return true,if arrow keys are press
        if (event.which >= 37 && event.which <= 40 ||
            // pressing 'a' reverted without Ctrl key
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // pressing 'c' reverted without Ctrl key
            (event.keyCode == 67 && event.ctrlKey === true) ||
            //pressing shift,ctrl,alt
            (event.keyCode >= 16 && event.keyCode <= 18) ||
            //pressing tab
            (event.keyCode == 9)
        ) {
            event.preventDefault();
            return false;
        }

        //if special character are press
        if (
            // pressing 'a' reverted without Ctrl key
            (event.keyCode == 65 && event.ctrlKey === false) ||
            // pressing 'c' reverted without Ctrl key
            (event.keyCode == 67 && event.ctrlKey === false) ||
            // pressing 'v' reverted without Ctrl key 
            (event.keyCode == 86 && event.ctrlKey === false) ||
            // pressing 'x' reverted without Ctrl key 
            (event.keyCode == 88 && event.ctrlKey === false) ||
            // pressing 'z' reverted without Ctrl key  
            (event.keyCode == 90 && event.ctrlKey === false) ||
            (event.which >= 68 && event.which <= 85) ||
            (event.which >= 186 && event.which <= 188) ||
            (event.which >= 191 && event.which <= 222) ||
            (event.which >= 106 && event.which <= 108) ||
            event.which == 111 ||
            event.which == 66 ||
            event.which == 87 ||
            event.which == 89 ||
            //if value is already has a negative sign and another negative sign is also press
            //189 means negative sign
            (event.which == 189 && (Number(this.oldValue) < 0 || position > 2) ) ||
            !this.checkValidationForDecimalNumber(value)
        ) {
            this.ngControl.control.setValue(this.oldValue);
            this.el.value = this.oldInputValue;
            event.preventDefault();
            return false;
        }

        if (isNaN(value)) {
            value = this.parse(value);
        }

        this.convertToCurrrencyFormat(value);
        const finalLength: number = this.el.value.length;
        const difference = finalLength - initialLength;
        this.el.selectionEnd = position + difference;
    }

    private checkValidationForDecimalNumber(value):boolean{
        let [integer, fraction = ""] = (value.toString() || "").toString().split(".");

        if (this.decimalPoints > -1) {
            if (fraction.length <= this.decimalPoints) {
                return true;
            }
            else{
                return false;
            }
        }
        return true;        
    }

    private convertToCurrrencyFormat(value: any, isModelChange: boolean = true) {
        let [integer, fraction = ""] = (value.toString() || "").toString().split(".");

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousands_separator);
        if (isModelChange)
            //set value for formControl, this property doesn't effect the value present in dom
            this.ngControl.control.setValue(value == "" ? null : Number(value));
        fraction = value.indexOf('.') == -1 ? '' : this.decimal_separator + fraction;
        //set value for DOM, this property doesn't effect the value in form control

        if(this.checkValidationForDecimalNumber(value)){
            this.el.value = (isNaN(parseFloat(integer)) && integer != '-') ? '' :  integer + fraction;
            this.oldValue = value;
            this.oldInputValue = this.el.value;
        }
    }

    parse(value: string): string {
        let [integer, fraction] = (value || "").replace(new RegExp(this.thousands_separator, "g"), "")
            .split(this.decimal_separator);

        fraction = this.getFraction(fraction);

        return integer + fraction;
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
}