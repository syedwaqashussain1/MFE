import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()

export class CustomValidationService {
    constructor(){}

    static validateFieldBySaleType(control: AbstractControl): { [key: string]: boolean }{

        const group = control.parent;
        if (group) {
            if (control.parent.value.sale_type.name == "EXCHANGE" && control.value == "") {

                return { required: true };
            }

        }

        return null;
    }
}
