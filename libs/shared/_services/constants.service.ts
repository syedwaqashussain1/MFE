import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConstantsService {
    constructor() { }

    getConstants(): any {

        return {
            'USER_ROLES': {
                'SALES_PERSON': 'sale_person',
                'SALES_MANAGER': 'sale_manager',
                'FNI_MANAGER': 'finance_manager',
                'CLOSER': 'closer_manager',
                'BUSINESS_MANAGER': 'business_manager',
            },
            'STATUS': {
                'ACTIVE': 'active',
                'IN_ACTIVE': 'inactive',
                'DELETE': 'delete',
                'SOLD': 'sold',
                'DEALER_TRADE': 'dealer_trade',
            },
            'VEHICLE_YEAR': {
                'CURRENT_YEAR_MINUS_FROM': 126, //Current Year - 119 = 1900
                'CURRENT_YEAR_PLUS_TO': 7, //Current Year + 5 = 2023
            },
            'MONTHS_BY_NAME': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'START_FROM_DATE': '1900-01-01'
        }
    }

    getTypes(): any {
        let types = [
            { type: 'newSale', heading: 'New', status: 'new', graphType: 'NEW', color: '#f20414', slug: 'NEW' },
            { type: 'certifiedSale', heading: 'Certified', status: 'certified', graphType: 'CERTIFIED', color: '#59aedb', slug: 'CERTIFIED' },
            { type: 'brandSale', heading: 'Non-Certified', status: 'brand', graphType: 'NON_CERTIFIED', color: '#58a33f', slug: 'NON-CERTIFIED' },
            { type: 'otherUsedSale', heading: 'Other-Makes', status: 'otherUsed', graphType: 'OTHER', color: '#f99140', slug: 'OTHER' },
            { type: 'preOwnedSale', heading: 'Total Pre-owned', status: 'preOwned', graphType: 'USED', color: '#9e91c6', slug: 'PRE-OWNED' },
            { type: 'totalSale', heading: 'Grand Total', status: '', graphType: 'TOTAL', color: '#e8a73e', slug: 'TOTAL' }
        ];

        return types;
    }

    getVehicleServices(): any {
        let services = [
            { label: 'Oil Change', value: 'oil change' },
            { label: 'Paint', value: 'paint' },
            { label: 'Dent', value: 'dent' },
            { label: 'Car Wash', value: 'car wash' },
            { label: 'Engine Repairing', value: 'engine repairing' },
            { label: 'AC Service', value: 'ac service' },
            { label: 'Brake', value: 'brake' },
            { label: 'Tint', value: 'tint' },
            { label: 'Key Replacement', value: 'key replacement' },
            { label: 'Maintenance', value: 'maintenance' },
            { label: 'Timing Belt', value: 'timing belt' },
            { label: 'Oil & Filter', value: 'oil & filter' },
            { label: 'Tire Rotation', value: 'tire rotation' },
            { label: 'CVT Transmission SRV', value: 'cvt transmission srv' },
            { label: 'Tmng BLT/WTR Pump', value: 'tmng blt/wtr pump' },
            { label: 'Decline Multi Point', value: 'decline multi point' },
            { label: 'Wiper Blades Front', value: 'wiper blades front' },
            { label: 'Customer Full Detail', value: 'customer full detail' },
            { label: 'A/C Diagnosis', value: 'a/c diagnosis' },
            { label: 'Diagnostic', value: 'diagnostic' },
            { label: 'Resurface Rotors', value: 'resurface rotors' },
            { label: 'Premier Wash', value: 'premier wash' },
            { label: 'Valve Adjustment', value: 'valve adjustment' },
            { label: 'Steering Concern', value: 'steering concern' },
            { label: 'Transmission Flush', value: 'transmission flush' },
            { label: 'Emission Sys Concern', value: 'emission sys concern' },
            { label: 'Sublet Repair', value: 'sublet repair' },
            { label: 'Bulb Concern', value: 'bulb concern' },
            { label: 'A/C Concern', value: 'a/c concern' },
            { label: 'Engine Oil Leak', value: 'engine oil leak' },
            { label: 'R&R RR Pads & Rotors', value: 'r&r rr pads & rotors' },
            { label: 'REPL Eng DRV Belt', value: 'repl eng drv belt' },
            { label: 'Battery Service', value: 'battery service' },
            { label: 'Wash And Vacuum', value: 'wash and vacuum' },
            { label: 'Starter', value: 'starter' },
            { label: 'Wiper Blades Rear', value: 'wiper blades rear' },
            { label: 'Balance Tires', value: 'balance tires' },
            { label: 'Tire Repair', value: 'tire repair' },
            { label: 'Drive Belts All', value: 'drive belts all' },
            { label: 'Exterior Concern', value: 'exterior concern' },
            { label: 'Engine Light', value: 'engine light' },
            { label: 'Diff Service Front', value: 'diff service front' },
            { label: 'Kry/FOB Replacement', value: 'kry/fob replacement' },
            { label: 'Cooling Sys Concern', value: 'cooling sys concern' },
            { label: 'Alignment Concern', value: 'alignment concern' },
            { label: 'Drive Axle Concern', value: 'drive axle concern' },
            { label: 'RR Shock/Strut', value: 'rr shock/strut' },
            { label: 'Recall', value: 'recall' },
            { label: 'Service Campaigns', value: 'service campaigns' },
            { label: 'Diff Axle Seal', value: 'diff axle seal' },
            { label: 'High Mount BRK Bulb', value: 'high mount brk bulb' },
            { label: 'Engine Repair', value: 'engine repair' },
            { label: 'Minor Engine Concern', value: 'minor engine concern' },
            { label: 'Full Detail Car', value: 'full detail car' },
            { label: 'Auto Trans Concern', value: 'auto trans concern' },
            { label: 'Bulb Repair', value: 'bulb repair' },
            { label: 'Accessory Concern', value: 'accessory concern' },
            { label: 'P/S Fluid Leak', value: 'p/s fluid leak' },
            { label: 'TBelt TNSR', value: 'tbelt tnsr' },
            { label: 'Trans Leak', value: 'trans leak' },
            { label: 'Accessory Install', value: 'accessory install' },
            { label: 'Symbol a SVC', value: 'symbol a svc' },
            { label: 'Engine Concern', value: 'engine concern' },
            { label: 'Coolant Leak', value: 'coolant leak' },
            { label: 'Suspension Concern', value: 'suspension concern' },
            { label: 'Decline Car Wash', value: 'decline car wash' },
            { label: 'REPL RR Pads/Shoes', value: 'repl rr pads/shoes' },
            { label: 'INT TRIM Concern', value: 'int trim concern' },
            { label: 'Headlight Restore', value: 'headlight restore' },
            { label: 'Eng Elect Concern', value: 'eng elect concern' },
            { label: 'TBelt', value: 'tbelt' },
            { label: 'A/C CNDSR', value: 'a/c cndsr' },
            { label: 'FT Wheel BRNG', value: 'ft wheel brng' },
            { label: 'Road Force Balance', value: 'road force balance' },
            { label: 'Headlump Bulb', value: 'headlump bulb' },
            { label: 'Brake Concern', value: 'brake concern' },
            { label: 'Body Elec Concern', value: 'body elec concern' },
            { label: 'R&R FT Pads & Rotors', value: 'r&r ft pads & rotors' },
            { label: 'Spring Special', value: 'spring special' },
            { label: 'Major Engine Concern', value: 'major engine concern' },
            { label: 'Damage Concern', value: 'damage concern' },
            { label: 'Engine Splash Shield', value: 'engine splash shield' },
            { label: 'Replace 3 Tires', value: 'replace 3 tires' },
            { label: 'Ext Trim Concern', value: 'ext trim concern' },
            { label: 'A/C Comp W/ Clutch', value: 'a/c comp w/ clutch' },
            { label: 'Alternator', value: 'alternator' },
            { label: 'Multi-Point Inspect', value: 'multi-point inspect' },
            { label: 'Cabin Air Filter R&R', value: 'cabin air filter r&r' },
            { label: '4 Wheel Alignment', value: '4 wheel alignment' },
            { label: 'ENG Air Filter R&R', value: 'eng air filter r&r' },
            { label: 'Transmission Service', value: 'transmission service' },
            { label: 'Brake Fluid Exchange', value: 'brake fluid exchange' },
            { label: 'Wiper Inserts Front', value: 'wiper inserts front' },
            { label: 'Rotate And Balance', value: 'rotate and balance' },
            { label: 'Coolant Flush', value: 'coolant flush' },
            { label: 'Fuel Induction SVC', value: 'fuel induction svc' },
            { label: 'Replace Battery', value: 'replace battery' },
            { label: 'R&R FT Pads Mach RTR', value: 'r&r ft pads mach rtr' },
            { label: 'R&R RR Pads Mach RTR', value: 'r&r rr pads mach rtr' },
            { label: 'Replace 4 Tires', value: 'replace 4 tires' },
            { label: 'Wiper Insert Rear', value: 'wiper insert rear' },
            { label: 'Diff Service Rear', value: 'diff service rear' },
            { label: 'P/S Fluid Exchange', value: 'p/s fluid exchange' }
        ];
        return services;
    }
}