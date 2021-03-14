(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+nbM":
/*!***********************************************!*\
  !*** ./src/app/shared/constants/constants.ts ***!
  \***********************************************/
/*! exports provided: MASK_SERIES_PASSPORT, MASK_TAX_NUMBER, MASK_NUMBER_PASSPORT, MASK_NUMBER_PASSPORT_ID_CARD, MASK_IDENTITY_ISSUER_ID_CARD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK_SERIES_PASSPORT", function() { return MASK_SERIES_PASSPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK_TAX_NUMBER", function() { return MASK_TAX_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK_NUMBER_PASSPORT", function() { return MASK_NUMBER_PASSPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK_NUMBER_PASSPORT_ID_CARD", function() { return MASK_NUMBER_PASSPORT_ID_CARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK_IDENTITY_ISSUER_ID_CARD", function() { return MASK_IDENTITY_ISSUER_ID_CARD; });
const MASK_SERIES_PASSPORT = [/[А-Яа-яёЁЇїІіЄєҐґ]/, /[А-Яа-яёЁЇїІіЄєҐґ]/];
const MASK_TAX_NUMBER = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const MASK_NUMBER_PASSPORT = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const MASK_NUMBER_PASSPORT_ID_CARD = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const MASK_IDENTITY_ISSUER_ID_CARD = [/\d/, /\d/, /\d/, /\d/];


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! W:\Angular(курсы)\Form-Registration\registration\Form-registration\src\main.ts */"zUnb");


/***/ }),

/***/ "0h//":
/*!**********************************************************!*\
  !*** ./src/app/shared/components/form/form.component.ts ***!
  \**********************************************************/
/*! exports provided: FormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormComponent", function() { return FormComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const _c0 = ["*"];
class FormComponent {
    constructor() {
        this.fields = [];
        this.globalErrors = {};
        this.errorMessages = {};
        this.errors = {};
    }
    ngOnInit() {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({});
        this.fields.forEach((item) => {
            this.setupControls(item, this.form, this.errors, this.errorMessages);
        });
        this.form.valueChanges.subscribe(() => {
            this.checkForms(this.form, this.errors, this.errorMessages);
        });
    }
    setupControls(_control, _parent, errors, errorMessages) {
        if (_control.controls) {
            _parent.addControl(_control.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({}, { updateOn: _control.updateOn || 'change' }));
            errors[_control.name] = {};
            errorMessages[_control.name] = {};
            return _control.controls.forEach(item => {
                this.setupControls(item, _parent.controls[_control.name], errors[_control.name], errorMessages[_control.name]);
            });
        }
        _parent.addControl(_control.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](_control.defaultValue || '', {
            updateOn: _control.updateOn || 'change',
            validators: _control.validation
        }));
        errors[_control.name] = _control.errors;
        errorMessages[_control.name] = '';
    }
    addFormControl(control, _formGroup, _errors, _errorMessages) {
        const formGroup = _formGroup || this.form;
        const errors = _errors || this.errors;
        const errorMessages = _errorMessages || this.errorMessages;
        formGroup.addControl(control.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](control.defaultValue || '', {
            updateOn: control.updateOn || 'change',
            validators: control.validation
        }));
        errors[control.name] = control.errors;
        errorMessages[control.name] = '';
    }
    // to remove from inner form group - set controls and join by dots. e.g. group1.subgroup2.fieldName
    removeFormControl(controlName) {
        const controlData = this.getControlData(controlName, this.form);
        if (controlData != null && controlData.control != null) {
            controlData.formGroup.removeControl(controlData.controlName);
            delete controlData.errors;
            delete controlData.errorMessages[controlData.controlName];
        }
    }
    checkForms(_formGroup, _errors, _errorMessages) {
        for (const key in _formGroup.controls) {
            if (_formGroup.controls[key] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]) {
                this.checkForms(_formGroup.controls[key], _errors[key], _errorMessages[key]);
            }
            else {
                this.checkError(key, _formGroup.controls[key].errors, _errors[key], _errorMessages);
            }
        }
    }
    checkError(_controlName, _errors, _controlErrors, _errorMessages) {
        if (!_errors) {
            _errorMessages[_controlName] = '';
            return false;
        }
        const key = Object.keys(_errors)[0];
        _errorMessages[_controlName] = '';
        if (!!_controlErrors && !!_controlErrors[key]) {
            _errorMessages[_controlName] = _controlErrors[key];
        }
        if (!!this.globalErrors[key] && !_errorMessages[_controlName]) {
            _errorMessages[_controlName] = this.globalErrors[key];
        }
        else if (!_errorMessages[_controlName]) {
            _errorMessages[_controlName] = this.textError || 'Error!';
        }
    }
    checkIfTheButtonIsPressed() {
        return this.form.touched;
    }
    setFieldError(_controlName, error) {
        const controlData = this.getControlData(_controlName);
        if (!!controlData.errors && !controlData.errors[error]) {
            return this.setFieldErrorCustom(_controlName, error, controlData);
        }
        const errors = {};
        errors[error] = true;
        this.setControlError(controlData.control, errors);
    }
    setFieldErrorCustom(_controlName, error, _controlData) {
        const controlData = _controlData || this.getControlData(_controlName);
        const control = controlData.control;
        control.setErrors({ customError: true });
        control.markAsDirty();
        control.markAsTouched();
        controlData.errorMessages[_controlName] = error;
        this.textError = error;
    }
    setControlError(control, errors) {
        control.setErrors(errors);
        control.markAsDirty();
        control.markAsTouched();
        this.form.updateValueAndValidity();
    }
    submit() {
        this.updateControls();
        this.setControlsTouchableAndDirty();
        this.checkForms(this.form, this.errors, this.errorMessages);
    }
    getControl(_controlName) {
        return this.form.get(_controlName);
    }
    getControlData(_controlName, _formGroup, _errors, _errorMessages) {
        const formGroup = _formGroup || this.form;
        const errors = _errors || this.errors;
        const errorMessages = _errorMessages || this.errorMessages;
        const controlPath = _controlName.split('.');
        const controlKey = controlPath.shift();
        const control = formGroup.get(controlKey);
        if (!control) {
            return null;
        }
        if (controlPath.length === 0) {
            return {
                control: control,
                errors: errors[controlKey],
                errorMessages,
                formGroup,
                controlName: controlKey
            };
        }
        return this.getControlData(controlPath.join('.'), control, errors[controlKey], errorMessages[controlKey]);
    }
    getAllControls(_formGroup) {
        let controls = [];
        const formGroup = _formGroup || this.form;
        for (const key in formGroup.controls) {
            if (formGroup.controls[key] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]) {
                controls = [...controls, ...this.getAllControls(formGroup.controls[key])];
            }
            else {
                controls.push(formGroup.controls[key]);
            }
        }
        return controls;
    }
    setControlsTouchableAndDirty() {
        const controls = this.getAllControls();
        controls.forEach(_control => {
            _control.markAsDirty();
            _control.markAsTouched();
        });
    }
    updateControls() {
        const controls = this.getAllControls();
        controls.forEach(_control => {
            _control.updateValueAndValidity();
        });
    }
}
FormComponent.ɵfac = function FormComponent_Factory(t) { return new (t || FormComponent)(); };
FormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormComponent, selectors: [["app-form"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLmNvbXBvbmVudC5zY3NzIn0= */"], encapsulation: 2 });


/***/ }),

/***/ "1Mzz":
/*!*********************************************************!*\
  !*** ./src/app/shared/components/input/input.module.ts ***!
  \*********************************************************/
/*! exports provided: InputModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputModule", function() { return InputModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-text-mask */ "904P");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-device-detector */ "9YtQ");
/* harmony import */ var _input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./input.component */ "QlUG");







class InputModule {
}
InputModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: InputModule });
InputModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function InputModule_Factory(t) { return new (t || InputModule)(); }, providers: [{
            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => _input_component__WEBPACK_IMPORTED_MODULE_5__["InputComponent"]),
            multi: true
        }, ngx_device_detector__WEBPACK_IMPORTED_MODULE_4__["DeviceDetectorService"]], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            angular2_text_mask__WEBPACK_IMPORTED_MODULE_3__["TextMaskModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](InputModule, { declarations: [_input_component__WEBPACK_IMPORTED_MODULE_5__["InputComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        angular2_text_mask__WEBPACK_IMPORTED_MODULE_3__["TextMaskModule"]], exports: [_input_component__WEBPACK_IMPORTED_MODULE_5__["InputComponent"]] }); })();


/***/ }),

/***/ "8ZgK":
/*!***************************************************!*\
  !*** ./src/app/shared/validators/max-min-date.ts ***!
  \***************************************************/
/*! exports provided: minMaxDateValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minMaxDateValidator", function() { return minMaxDateValidator; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

function dateCheck(startDate, nowDate, endDate) {
    const start = Date.parse(moment__WEBPACK_IMPORTED_MODULE_0__(startDate).format('YYYY/MM/DD'));
    const now = Date.parse(moment__WEBPACK_IMPORTED_MODULE_0__(nowDate).format('YYYY/MM/DD'));
    const end = Date.parse(moment__WEBPACK_IMPORTED_MODULE_0__(endDate).format('YYYY/MM/DD'));
    return (start <= now && now <= end);
}
function minMaxDateValidator(start, end) {
    return (control) => {
        if (!dateCheck(start, control.value, end)) {
            return { dateValidation: true };
        }
        return null;
    };
}


/***/ }),

/***/ "A6+d":
/*!************************************************************!*\
  !*** ./src/app/shared/components/calendar/date-adapter.ts ***!
  \************************************************************/
/*! exports provided: CustomDateAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomDateAdapter", function() { return CustomDateAdapter; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");





/** Расширение для календаря, чтобы неделя начиналась с понедельника. **/
class CustomDateAdapter extends _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateAdapter"] {
    constructor(locale, platformId) {
        super(locale, platformId);
        this.locale = locale;
    }
    getFirstDayOfWeek() {
        return Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["getLocaleFirstDayOfWeek"])(this.locale);
    }
}
CustomDateAdapter.ɵfac = function CustomDateAdapter_Factory(t) { return new (t || CustomDateAdapter)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"])); };
CustomDateAdapter.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CustomDateAdapter, factory: CustomDateAdapter.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DklM":
/*!***************************************************************!*\
  !*** ./src/app/shared/components/calendar/calendar.module.ts ***!
  \***************************************************************/
/*! exports provided: CalendarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarModule", function() { return CalendarModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _calendar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calendar.component */ "cSYd");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../input/input.component */ "QlUG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _date_adapter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./date-adapter */ "A6+d");











class CalendarModule {
}
CalendarModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CalendarModule });
CalendarModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CalendarModule_Factory(t) { return new (t || CalendarModule)(); }, providers: [{
            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(() => _input_input_component__WEBPACK_IMPORTED_MODULE_4__["InputComponent"]),
            multi: true
        }, {
            provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["DateAdapter"],
            useClass: _date_adapter__WEBPACK_IMPORTED_MODULE_9__["CustomDateAdapter"]
        }], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__["MatDatepickerModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatNativeDateModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CalendarModule, { declarations: [_calendar_component__WEBPACK_IMPORTED_MODULE_3__["CalendarComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__["MatDatepickerModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatNativeDateModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"]], exports: [_calendar_component__WEBPACK_IMPORTED_MODULE_3__["CalendarComponent"]] }); })();


/***/ }),

/***/ "IXn5":
/*!*********************************************************!*\
  !*** ./src/app/shared/validators/validator-cyrillic.ts ***!
  \*********************************************************/
/*! exports provided: CyrillicValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CyrillicValidator", function() { return CyrillicValidator; });
function CyrillicValidator(control) {
    const test = /^[А-Яа-яёЁЇїІіЄєҐґ.,’`‘ '-]+$/.test(control.value);
    if (!test) {
        return { cyrillicValidator: true };
    }
    return null;
}


/***/ }),

/***/ "KPc0":
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/user-passport-data/user-passport-data.module.ts ***!
  \***********************************************************************************/
/*! exports provided: UserPassportDataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPassportDataModule", function() { return UserPassportDataModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _user_passport_data_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-passport-data.component */ "gXcr");
/* harmony import */ var _input_input_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../input/input.module */ "1Mzz");
/* harmony import */ var _calendar_calendar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../calendar/calendar.module */ "DklM");
/* harmony import */ var _email_block_email_block_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../email-block/email-block.component */ "h2Zm");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class UserPassportDataModule {
}
UserPassportDataModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: UserPassportDataModule });
UserPassportDataModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ factory: function UserPassportDataModule_Factory(t) { return new (t || UserPassportDataModule)(); }, providers: [], imports: [[
            _calendar_calendar_module__WEBPACK_IMPORTED_MODULE_4__["CalendarModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _input_input_module__WEBPACK_IMPORTED_MODULE_3__["InputModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](UserPassportDataModule, { declarations: [_user_passport_data_component__WEBPACK_IMPORTED_MODULE_2__["UserPassportDataComponent"], _email_block_email_block_component__WEBPACK_IMPORTED_MODULE_5__["EmailBlockComponent"]], imports: [_calendar_calendar_module__WEBPACK_IMPORTED_MODULE_4__["CalendarModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _input_input_module__WEBPACK_IMPORTED_MODULE_3__["InputModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]], exports: [_user_passport_data_component__WEBPACK_IMPORTED_MODULE_2__["UserPassportDataComponent"], _email_block_email_block_component__WEBPACK_IMPORTED_MODULE_5__["EmailBlockComponent"]] }); })();


/***/ }),

/***/ "NJzO":
/*!******************************************************************!*\
  !*** ./src/app/shared/services/cookie-servise/cookie.service.ts ***!
  \******************************************************************/
/*! exports provided: CookieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieService", function() { return CookieService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class CookieService {
    constructor() {
    }
    setData(key, value) {
        this.setDataOnClient(key, value);
    }
    getData(key) {
        return this.getDataOnClient(key);
    }
    setDataOnClient(key, value) {
        document.cookie = `${key}=${value || ''}; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; path=/`;
    }
    getDataOnClient(key) {
        const name = key + '=';
        const cookiesArray = document.cookie.split(';');
        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return '';
    }
}
CookieService.ɵfac = function CookieService_Factory(t) { return new (t || CookieService)(); };
CookieService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CookieService, factory: CookieService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "OI7v":
/*!*****************************************************!*\
  !*** ./src/app/shared/validators/validators-inn.ts ***!
  \*****************************************************/
/*! exports provided: TaxNumberValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaxNumberValidator", function() { return TaxNumberValidator; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_tax_number_decryption_tax_number_decryption_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/tax-number-decryption/tax-number-decryption.service */ "Qgoc");


function TaxNumberValidator(control) {
    const injector = _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"].create([{ provide: _services_tax_number_decryption_tax_number_decryption_service__WEBPACK_IMPORTED_MODULE_1__["DecryptTaxNumberService"], useClass: _services_tax_number_decryption_tax_number_decryption_service__WEBPACK_IMPORTED_MODULE_1__["DecryptTaxNumberService"], deps: [] }]);
    const nameMethodsService = injector.get(_services_tax_number_decryption_tax_number_decryption_service__WEBPACK_IMPORTED_MODULE_1__["DecryptTaxNumberService"]);
    if (nameMethodsService.getDecodeTaxNumber(control.value) === false) {
        return { taxNumberValidator: true };
    }
    return null;
}


/***/ }),

/***/ "Qgoc":
/*!****************************************************************************************!*\
  !*** ./src/app/shared/services/tax-number-decryption/tax-number-decryption.service.ts ***!
  \****************************************************************************************/
/*! exports provided: DecryptTaxNumberService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecryptTaxNumberService", function() { return DecryptTaxNumberService; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DecryptTaxNumberService {
    getDecodeTaxNumber(num) {
        if (num.length !== 10) {
            return false;
        }
        const split = num.split('');
        // @ts-ignore
        const sum = split[0] * (-1) + split[1] * 5 + split[2] * 7 + split[3] * 9 + split[4] * 4 + split[5] * 6 + split[6] * 10 + split[7] * 5 + split[8] * 7;
        // tslint:disable-next-line:radix
        let control = parseInt(String(sum - (11 * parseInt(String(sum / 11)))));
        if (control === 10) {
            control = 0;
        }
        // tslint:disable-next-line:radix
        if (control !== parseInt(split[9])) {
            return false;
        }
        // @ts-ignore
        const gender = (split[8] % 2) ? 1 : 2;
        const addDays = num.substr(0, 5);
        const date = moment__WEBPACK_IMPORTED_MODULE_0__('1900-01-01').add(addDays, 'days').subtract(1, 'days');
        return { num, gender, date };
    }
}
DecryptTaxNumberService.ɵfac = function DecryptTaxNumberService_Factory(t) { return new (t || DecryptTaxNumberService)(); };
DecryptTaxNumberService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DecryptTaxNumberService, factory: DecryptTaxNumberService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "QlUG":
/*!************************************************************!*\
  !*** ./src/app/shared/components/input/input.component.ts ***!
  \************************************************************/
/*! exports provided: InputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputComponent", function() { return InputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../animations/fading-away.animate */ "xi4J");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-device-detector */ "9YtQ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular2-text-mask */ "904P");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__);








const _c0 = ["inputElement"];
const _c1 = function (a0) { return { "visible-error": a0 }; };
function InputComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@transformPanel", undefined)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c1, ctx_r0.visibleError));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
} }
const _c2 = function (a0) { return { "correct-icon": a0 }; };
function InputComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseover", function InputComponent_span_5_Template_span_mouseover_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.visualError(); })("click", function InputComponent_span_5_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.visualErrorMob(); })("mouseleave", function InputComponent_span_5_Template_span_mouseleave_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.visibleError = false; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c2, ctx_r2.formControlInput.invalid && !!ctx_r2.errorMessage));
} }
const _c3 = function (a0, a1) { return { "error-input": a0, "disabled-input": a1 }; };
const _c4 = function (a0) { return { "err-label": a0 }; };
class InputComponent {
    constructor(deviceService, cdRef) {
        this.deviceService = deviceService;
        this.cdRef = cdRef;
        this.placeholderInput = '';
        this.inputValue = '';
        this.outside = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.visibleError = false;
    }
    ngOnInit() {
        if (!this.formControlInput) {
            this.formControlInput = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: '', disabled: this.disabledInput }, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            });
        }
        if (this.disabledInput) {
            this.formControlInput.disable();
        }
        if (!this.inputValue && this.formControlInput.value) {
            this.inputValue = this.formControlInput.value;
        }
    }
    get maskOptions() {
        if (this.disabledInput) {
            this.formControlInput.disable();
        }
        if (this.maskInput) {
            return {
                guide: false,
                keepCharPositions: false,
                mask: this.maskInput
            };
        }
        else if (this.maskInput && this.typeInput === 'text') {
            return {
                mask: this.maskInput
            };
        }
        else {
            return { mask: false };
        }
    }
    lossOfFocus(e) {
        this.outside.emit(e);
    }
    focus() {
        this.inputElement.nativeElement.focus();
    }
    errorChecking() {
        if (this.formControlInput) {
            return this.formControlInput.invalid && (this.formControlInput.dirty || this.formControlInput.touched) && !!this.errorMessage;
        }
    }
    visualError() {
        if (this.deviceService.isDesktop()) {
            if (this.formControlInput) {
                if (this.formControlInput.invalid && (this.formControlInput.dirty || this.formControlInput.touched) && !!this.errorMessage) {
                    this.visibleError = true;
                }
            }
        }
    }
    visualErrorMob() {
        if (!this.deviceService.isDesktop()) {
            if (this.formControlInput) {
                if (this.formControlInput.invalid && (this.formControlInput.dirty || this.formControlInput.touched) && !!this.errorMessage) {
                    this.visibleError = true;
                }
            }
        }
    }
}
InputComponent.ɵfac = function InputComponent_Factory(t) { return new (t || InputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_3__["DeviceDetectorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
InputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InputComponent, selectors: [["app-input"]], viewQuery: function InputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.inputElement = _t.first);
    } }, inputs: { formControlInput: "formControlInput", label: "label", nameInput: "nameInput", placeholderInput: "placeholderInput", maxLengthInput: "maxLengthInput", minLengthInput: "minLengthInput", typeInput: "typeInput", inputValue: "inputValue", disabledInput: "disabledInput", maskInput: "maskInput", errorMessage: "errorMessage" }, outputs: { outside: "outside" }, decls: 8, vars: 19, consts: [[1, "input-customize"], [1, "input-position"], ["class", "error-block", 3, "ngClass", 4, "ngIf"], [1, "form-input", 3, "name", "placeholder", "textMask", "formControl", "type", "ngClass", "blur", "mouseout", "mouseleave"], ["inputElement", ""], ["class", "error-icon", 3, "ngClass", "mouseover", "click", "mouseleave", 4, "ngIf"], [1, "form-label", 3, "ngClass"], [1, "error-block", 3, "ngClass"], [1, "error-block__text"], [1, "error-icon", 3, "ngClass", "mouseover", "click", "mouseleave"]], template: function InputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, InputComponent_div_2_Template, 3, 5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("blur", function InputComponent_Template_input_blur_3_listener($event) { return ctx.lossOfFocus($event); })("mouseout", function InputComponent_Template_input_mouseout_3_listener($event) { return ctx.lossOfFocus($event); })("mouseleave", function InputComponent_Template_input_mouseleave_3_listener() { return ctx.visibleError = false; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, InputComponent_span_5_Template, 1, 3, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.visibleError);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ng-empty", !ctx.formControlInput.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", ctx.nameInput)("placeholder", ctx.placeholderInput)("textMask", ctx.maskOptions)("formControl", ctx.formControlInput)("type", ctx.typeInput)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](14, _c3, ctx.errorChecking(), ctx.disabledInput));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("maxLength", ctx.maxLengthInput)("minLength", ctx.minLengthInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorChecking());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c4, ctx.errorChecking()));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.label);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__["MaskedInputDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"]], styles: ["[_ngcontent-%COMP%]:root {\n  --mainFont: CoreSansG;\n  --header-color: linear-gradient(90deg, #0D5297 0.26%, #0D5297 47.1%, #0D5297 99.8%);\n  --grey1: #CFE0F4;\n  --black: #000;\n  --white: #fff;\n  --grey: #ccc;\n  --grey2: #808080;\n  --grey3: #D3D3D3;\n  --grey5: #979797;\n  --grey6: #F5F5F5;\n  --blue: #6987F0;\n  --blue2: #3851C6;\n  --blue4: #0D5297;\n  --red: #f06979;\n  --black-rgba: rgba(0, 0, 0, 0.7);\n  --passport-toggle: #6987F0;\n  --input-focus: #0D5297;\n  --btn1-normal: linear-gradient(167.72deg, #0D5297 -33.07%, #0D5297 48.35%, #0D5297 139.94%);\n  --btn1-hover: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-focus: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-disabled: linear-gradient(167.72deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn1-color-text-focus: #6D98D9;\n  --btn1-color-text: #fff;\n  --btn4-hover: linear-gradient(122.5deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn4-border: #CCCCCC;\n  --background-selected-day: linear-gradient(314.41deg, #5A4BE6 -48.61%, #73AFF7 33.69%, #93D0D9 126.27%);\n  --color-text-header: rgba(0, 0, 0, 0.543337);\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .error-block[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .error-block__text[_ngcontent-%COMP%] {\n  left: 0;\n  right: 0;\n  top: -10px;\n  display: flex;\n  background: var(--white);\n  padding: 13px 16px;\n  z-index: 1000 !important;\n  position: absolute;\n  color: var(--red);\n  border: 1px solid var(--red);\n  transform: translateY(-100%);\n  box-shadow: 0 4px 4px rgba(240, 105, 121, 0.3);\n  border-radius: 3px;\n  min-height: 70px;\n  align-items: center;\n  -moz-hyphens: auto;\n  -webkit-hyphens: auto;\n  -ms-hyphens: auto;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .error-block__text[_ngcontent-%COMP%]:after {\n  content: \"\";\n  top: 100%;\n  right: 9px;\n  width: 30px;\n  height: 30px;\n  z-index: 1000 !important;\n  display: block;\n  background: var(--white);\n  position: absolute;\n  border-left: 1px solid var(--red);\n  border-bottom: 1px solid var(--red);\n  transform: translateY(-14.4px) rotateZ(-45deg);\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .visible-error[_ngcontent-%COMP%] {\n  display: block;\n  z-index: 100 !important;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  height: 60px;\n  border: 1px solid var(--grey);\n  border-radius: 4px;\n  margin: 0 auto;\n  display: flex;\n  width: 100%;\n  color: var(--black);\n  caret-color: var(--input-focus);\n  background-color: var(--white);\n  transition: all 0.3s ease-in-out;\n  font: 16px/19px var(--mainFont);\n  outline: 0;\n  padding: 28px 35px 8px 18px;\n}\n\n@media (max-width: 480px) {\n  .input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n    font-size: 3.5vw;\n  }\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {\n  transition: all 0.3s ease-in;\n  border: 1px solid var(--input-focus);\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .disabled-input[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .error-input[_ngcontent-%COMP%] {\n  transition: all 0.3s ease-in;\n  border: 1px solid var(--red) !important;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%], .input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .correct-icon[_ngcontent-%COMP%] {\n  top: 32px;\n  right: 14px;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  position: absolute;\n  transform: translateY(-50%);\n  transition: 0.3s ease-out;\n  background: url('signaling.svg') center center/contain no-repeat;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus    ~ .correct-icon[_ngcontent-%COMP%], .input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:not(:focus):not(.ng-empty)    ~ .correct-icon[_ngcontent-%COMP%] {\n  top: 39px;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus    ~ .form-label[_ngcontent-%COMP%] {\n  top: -3px;\n  left: 18px;\n  padding: 10px 0;\n  font-size: 1.5ch;\n  transition: all 0.3s ease-in;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:not(:focus):not(.ng-empty)    ~ .form-label[_ngcontent-%COMP%] {\n  top: -3px;\n  font-size: 1.5ch;\n  color: var(--grey);\n  left: 18px;\n  padding: 10px 0;\n  text-align: left;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:not(:focus).ng-invalid.ng-empty    ~ .err-label[_ngcontent-%COMP%] {\n  top: 12px;\n  font-size: 15px;\n  color: var(--grey);\n  left: 18px !important;\n  padding: 10px 0;\n  width: 75%;\n  text-align: left;\n}\n\n@media (max-width: 360px) {\n  .input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:not(:focus).ng-invalid.ng-empty    ~ .err-label[_ngcontent-%COMP%] {\n    width: 75%;\n  }\n}\n\n@media (max-width: 345px) {\n  .input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:not(:focus).ng-invalid.ng-empty    ~ .err-label[_ngcontent-%COMP%] {\n    width: 73%;\n  }\n}\n\n@media (max-width: 340px) {\n  .input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus    ~ .error-icon[_ngcontent-%COMP%] {\n    transition: 0.3s ease-out;\n    top: 37px;\n  }\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  font: 15px var(--mainFont);\n  pointer-events: none;\n  color: var(--grey);\n  left: 18px;\n  padding: 10px 0;\n  transition: 0.2s;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 90%;\n  text-align: left;\n}\n\n.input-customize[_ngcontent-%COMP%]   .input-position[_ngcontent-%COMP%]   .err-label[_ngcontent-%COMP%] {\n  transition: all 0.3s ease-in;\n  color: var(--red) !important;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 90%;\n  text-align: left;\n}\n\n[_ngcontent-%COMP%]:active, [_ngcontent-%COMP%]:hover, [_ngcontent-%COMP%]:focus {\n  outline: 0;\n  outline-offset: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlc1xcdmFyaWFibGVzLnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXGlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BO0VBRUUscUJBQUE7RUFFQSxtRkFBQTtFQUVBLGdCQUFBO0VBR0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFHQSxnQ0FBQTtFQUdBLDBCQUFBO0VBR0Esc0JBQUE7RUFJQSwyRkFBQTtFQUNBLDBGQUFBO0VBQ0EsMEZBQUE7RUFDQSw2RkFBQTtFQUNBLGdDQUFBO0VBQ0EsdUJBQUE7RUFJQSx5RkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUdBQUE7RUFDQSw0Q0FBQTtBQ3RCRjs7QUF6QkU7RUFDRSxrQkFBQTtBQTRCSjs7QUExQkk7RUFDRSxhQUFBO0FBNEJOOztBQTFCTTtFQUNFLE9BQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSw0QkFBQTtFQUNBLDhDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBNEJSOztBQTFCUTtFQUNFLFdBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlDQUFBO0VBQ0EsbUNBQUE7RUFDQSw4Q0FBQTtBQTRCVjs7QUF2Qkk7RUFDRSxjQUFBO0VBQ0EsdUJBQUE7QUF5Qk47O0FBdEJJO0VBQ0UsWUFBQTtFQUNBLDZCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLCtCQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsVUFBQTtFQUNBLDJCQUFBO0FBd0JOOztBQXZCTTtFQWRGO0lBZUksZ0JBQUE7RUEwQk47QUFDRjs7QUF4Qk07RUFDRSw0QkFBQTtFQUNBLG9DQUFBO0FBMEJSOztBQXRCSTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQXdCTjs7QUFwQkk7RUFDRSw0QkFBQTtFQUNBLHVDQUFBO0FBc0JOOztBQW5CSTtFQUNFLFNBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0VBQUE7QUFxQk47O0FBbEJJO0VBQ0UsU0FBQTtBQW9CTjs7QUFqQkk7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBbUJOOztBQWhCSTtFQUNFLFNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQWtCTjs7QUFmSTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUFpQk47O0FBaEJNO0VBUkY7SUFTSSxVQUFBO0VBbUJOO0FBQ0Y7O0FBbEJNO0VBWEY7SUFZSSxVQUFBO0VBcUJOO0FBQ0Y7O0FBakJNO0VBREY7SUFFSSx5QkFBQTtJQUNBLFNBQUE7RUFvQk47QUFDRjs7QUFqQkk7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSwwQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0FBbUJOOztBQWhCSTtFQUNFLDRCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUFrQk47O0FBWEE7RUFDRSxVQUFBO0VBQ0EsaUJBQUE7QUFjRiIsImZpbGUiOiJpbnB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiR4czogMDtcclxuJHNtOiA1NzZweDtcclxuJG1kOiA3NjdweDtcclxuJGxnOiA5OTJweDtcclxuJHhsOiAxMjAwcHg7XHJcblxyXG46cm9vdCB7XHJcbiAgLy8gZm9udFxyXG4gIC0tbWFpbkZvbnQ6IENvcmVTYW5zRztcclxuICAvLyBjb2xvclxyXG4gIC0taGVhZGVyLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwRDUyOTcgMC4yNiUsICMwRDUyOTcgNDcuMSUsICMwRDUyOTcgOTkuOCUpO1xyXG4gIC8vJGdyZXk6ICNjY2M7XHJcbiAgLS1ncmV5MTogI0NGRTBGNDtcclxuXHJcbiAgLy8gYmFja2dyb3VuZFxyXG4gIC0tYmxhY2s6ICMwMDA7XHJcbiAgLS13aGl0ZTogI2ZmZjtcclxuICAtLWdyZXk6ICNjY2M7XHJcbiAgLS1ncmV5MjogIzgwODA4MDtcclxuICAtLWdyZXkzOiAjRDNEM0QzO1xyXG4gIC0tZ3JleTU6ICM5Nzk3OTc7XHJcbiAgLS1ncmV5NjogI0Y1RjVGNTtcclxuICAtLWJsdWU6ICM2OTg3RjA7XHJcbiAgLS1ibHVlMjogIzM4NTFDNjtcclxuICAtLWJsdWU0OiAjMEQ1Mjk3O1xyXG4gIC0tcmVkOiAjZjA2OTc5O1xyXG5cclxuICAvLyBiYWNrZ3JvdW5kXHJcbiAgLS1ibGFjay1yZ2JhOiByZ2JhKDAsIDAsIDAsIDAuNyk7XHJcblxyXG4gIC8vIGJ0bi1wYXNzcG9ydFxyXG4gIC0tcGFzc3BvcnQtdG9nZ2xlOiAjNjk4N0YwO1xyXG5cclxuICAvLyBpbnB1dFxyXG4gIC0taW5wdXQtZm9jdXM6ICMwRDUyOTc7XHJcblxyXG5cclxuICAvLyBidXR0b24gY29sb3IgcHJpbWFyeVxyXG4gIC0tYnRuMS1ub3JtYWw6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICMwRDUyOTcgLTMzLjA3JSwgIzBENTI5NyA0OC4zNSUsICMwRDUyOTcgMTM5Ljk0JSk7XHJcbiAgLS1idG4xLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xyXG4gIC0tYnRuMS1mb2N1czogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcclxuICAtLWJ0bjEtZGlzYWJsZWQ6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XHJcbiAgLS1idG4xLWNvbG9yLXRleHQtZm9jdXM6ICM2RDk4RDk7XHJcbiAgLS1idG4xLWNvbG9yLXRleHQ6ICNmZmY7XHJcblxyXG5cclxuICAvLyBjYWxlbmRhciBjb2xvclxyXG4gIC0tYnRuNC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDEyMi41ZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xyXG4gIC0tYnRuNC1ib3JkZXI6ICNDQ0NDQ0M7XHJcbiAgLS1iYWNrZ3JvdW5kLXNlbGVjdGVkLWRheTogbGluZWFyLWdyYWRpZW50KDMxNC40MWRlZywgIzVBNEJFNiAtNDguNjElLCAjNzNBRkY3IDMzLjY5JSwgIzkzRDBEOSAxMjYuMjclKTtcclxuICAtLWNvbG9yLXRleHQtaGVhZGVyOiByZ2JhKDAsIDAsIDAsIDAuNTQzMzM3KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuIiwiOnJvb3Qge1xuICAtLW1haW5Gb250OiBDb3JlU2Fuc0c7XG4gIC0taGVhZGVyLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwRDUyOTcgMC4yNiUsICMwRDUyOTcgNDcuMSUsICMwRDUyOTcgOTkuOCUpO1xuICAtLWdyZXkxOiAjQ0ZFMEY0O1xuICAtLWJsYWNrOiAjMDAwO1xuICAtLXdoaXRlOiAjZmZmO1xuICAtLWdyZXk6ICNjY2M7XG4gIC0tZ3JleTI6ICM4MDgwODA7XG4gIC0tZ3JleTM6ICNEM0QzRDM7XG4gIC0tZ3JleTU6ICM5Nzk3OTc7XG4gIC0tZ3JleTY6ICNGNUY1RjU7XG4gIC0tYmx1ZTogIzY5ODdGMDtcbiAgLS1ibHVlMjogIzM4NTFDNjtcbiAgLS1ibHVlNDogIzBENTI5NztcbiAgLS1yZWQ6ICNmMDY5Nzk7XG4gIC0tYmxhY2stcmdiYTogcmdiYSgwLCAwLCAwLCAwLjcpO1xuICAtLXBhc3Nwb3J0LXRvZ2dsZTogIzY5ODdGMDtcbiAgLS1pbnB1dC1mb2N1czogIzBENTI5NztcbiAgLS1idG4xLW5vcm1hbDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzBENTI5NyAtMzMuMDclLCAjMEQ1Mjk3IDQ4LjM1JSwgIzBENTI5NyAxMzkuOTQlKTtcbiAgLS1idG4xLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xuICAtLWJ0bjEtZm9jdXM6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XG4gIC0tYnRuMS1kaXNhYmxlZDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcbiAgLS1idG4xLWNvbG9yLXRleHQtZm9jdXM6ICM2RDk4RDk7XG4gIC0tYnRuMS1jb2xvci10ZXh0OiAjZmZmO1xuICAtLWJ0bjQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgxMjIuNWRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcbiAgLS1idG40LWJvcmRlcjogI0NDQ0NDQztcbiAgLS1iYWNrZ3JvdW5kLXNlbGVjdGVkLWRheTogbGluZWFyLWdyYWRpZW50KDMxNC40MWRlZywgIzVBNEJFNiAtNDguNjElLCAjNzNBRkY3IDMzLjY5JSwgIzkzRDBEOSAxMjYuMjclKTtcbiAgLS1jb2xvci10ZXh0LWhlYWRlcjogcmdiYSgwLCAwLCAwLCAwLjU0MzMzNyk7XG59XG5cbi5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmlucHV0LWN1c3RvbWl6ZSAuaW5wdXQtcG9zaXRpb24gLmVycm9yLWJsb2NrIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIC5lcnJvci1ibG9ja19fdGV4dCB7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IC0xMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS13aGl0ZSk7XG4gIHBhZGRpbmc6IDEzcHggMTZweDtcbiAgei1pbmRleDogMTAwMCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbG9yOiB2YXIoLS1yZWQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1yZWQpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xuICBib3gtc2hhZG93OiAwIDRweCA0cHggcmdiYSgyNDAsIDEwNSwgMTIxLCAwLjMpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIG1pbi1oZWlnaHQ6IDcwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC1tb3otaHlwaGVuczogYXV0bztcbiAgLXdlYmtpdC1oeXBoZW5zOiBhdXRvO1xuICAtbXMtaHlwaGVuczogYXV0bztcbn1cbi5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIC5lcnJvci1ibG9ja19fdGV4dDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHRvcDogMTAwJTtcbiAgcmlnaHQ6IDlweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgei1pbmRleDogMTAwMCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZDogdmFyKC0td2hpdGUpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tcmVkKTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXJlZCk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTQuNHB4KSByb3RhdGVaKC00NWRlZyk7XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAudmlzaWJsZS1lcnJvciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB6LWluZGV4OiAxMDAgIWltcG9ydGFudDtcbn1cbi5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIC5mb3JtLWlucHV0IHtcbiAgaGVpZ2h0OiA2MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ncmV5KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiB2YXIoLS1ibGFjayk7XG4gIGNhcmV0LWNvbG9yOiB2YXIoLS1pbnB1dC1mb2N1cyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIGZvbnQ6IDE2cHgvMTlweCB2YXIoLS1tYWluRm9udCk7XG4gIG91dGxpbmU6IDA7XG4gIHBhZGRpbmc6IDI4cHggMzVweCA4cHggMThweDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAuaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZm9ybS1pbnB1dCB7XG4gICAgZm9udC1zaXplOiAzLjV2dztcbiAgfVxufVxuLmlucHV0LWN1c3RvbWl6ZSAuaW5wdXQtcG9zaXRpb24gLmZvcm0taW5wdXQ6Zm9jdXMge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pbnB1dC1mb2N1cyk7XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZGlzYWJsZWQtaW5wdXQge1xuICBvcGFjaXR5OiAwLjY7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZXJyb3ItaW5wdXQge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1yZWQpICFpbXBvcnRhbnQ7XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZXJyb3ItaWNvbiwgLmlucHV0LWN1c3RvbWl6ZSAuaW5wdXQtcG9zaXRpb24gLmNvcnJlY3QtaWNvbiB7XG4gIHRvcDogMzJweDtcbiAgcmlnaHQ6IDE0cHg7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIHRyYW5zaXRpb246IDAuM3MgZWFzZS1vdXQ7XG4gIGJhY2tncm91bmQ6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvc2lnbmFsaW5nLnN2Z1wiKSBjZW50ZXIgY2VudGVyL2NvbnRhaW4gbm8tcmVwZWF0O1xufVxuLmlucHV0LWN1c3RvbWl6ZSAuaW5wdXQtcG9zaXRpb24gLmZvcm0taW5wdXQ6Zm9jdXMgfiAuY29ycmVjdC1pY29uLCAuaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZm9ybS1pbnB1dDpub3QoOmZvY3VzKTpub3QoLm5nLWVtcHR5KSB+IC5jb3JyZWN0LWljb24ge1xuICB0b3A6IDM5cHg7XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZm9ybS1pbnB1dDpmb2N1cyB+IC5mb3JtLWxhYmVsIHtcbiAgdG9wOiAtM3B4O1xuICBsZWZ0OiAxOHB4O1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIGZvbnQtc2l6ZTogMS41Y2g7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW47XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZm9ybS1pbnB1dDpub3QoOmZvY3VzKTpub3QoLm5nLWVtcHR5KSB+IC5mb3JtLWxhYmVsIHtcbiAgdG9wOiAtM3B4O1xuICBmb250LXNpemU6IDEuNWNoO1xuICBjb2xvcjogdmFyKC0tZ3JleSk7XG4gIGxlZnQ6IDE4cHg7XG4gIHBhZGRpbmc6IDEwcHggMDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIC5mb3JtLWlucHV0Om5vdCg6Zm9jdXMpLm5nLWludmFsaWQubmctZW1wdHkgfiAuZXJyLWxhYmVsIHtcbiAgdG9wOiAxMnB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiB2YXIoLS1ncmV5KTtcbiAgbGVmdDogMThweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIHdpZHRoOiA3NSU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgLmlucHV0LWN1c3RvbWl6ZSAuaW5wdXQtcG9zaXRpb24gLmZvcm0taW5wdXQ6bm90KDpmb2N1cykubmctaW52YWxpZC5uZy1lbXB0eSB+IC5lcnItbGFiZWwge1xuICAgIHdpZHRoOiA3NSU7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAzNDVweCkge1xuICAuaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZm9ybS1pbnB1dDpub3QoOmZvY3VzKS5uZy1pbnZhbGlkLm5nLWVtcHR5IH4gLmVyci1sYWJlbCB7XG4gICAgd2lkdGg6IDczJTtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDM0MHB4KSB7XG4gIC5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIC5mb3JtLWlucHV0OmZvY3VzIH4gLmVycm9yLWljb24ge1xuICAgIHRyYW5zaXRpb246IDAuM3MgZWFzZS1vdXQ7XG4gICAgdG9wOiAzN3B4O1xuICB9XG59XG4uaW5wdXQtY3VzdG9taXplIC5pbnB1dC1wb3NpdGlvbiAuZm9ybS1sYWJlbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMnB4O1xuICBmb250OiAxNXB4IHZhcigtLW1haW5Gb250KTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS1ncmV5KTtcbiAgbGVmdDogMThweDtcbiAgcGFkZGluZzogMTBweCAwO1xuICB0cmFuc2l0aW9uOiAwLjJzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDkwJTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5pbnB1dC1jdXN0b21pemUgLmlucHV0LXBvc2l0aW9uIC5lcnItbGFiZWwge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluO1xuICBjb2xvcjogdmFyKC0tcmVkKSAhaW1wb3J0YW50O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDkwJTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuOmFjdGl2ZSwgOmhvdmVyLCA6Zm9jdXMge1xuICBvdXRsaW5lOiAwO1xuICBvdXRsaW5lLW9mZnNldDogMDtcbn0iXX0= */"], data: { animation: [_animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_2__["transformPanel"], _animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_2__["showAnimate"]] } });


/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn-bd": "loYQ",
	"./bn-bd.js": "loYQ",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-in": "7C5Q",
	"./en-in.js": "7C5Q",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./en-sg": "t+mt",
	"./en-sg.js": "t+mt",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-mx": "tbfe",
	"./es-mx.js": "tbfe",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fil": "1ppg",
	"./fil.js": "1ppg",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-deva": "qvJo",
	"./gom-deva.js": "qvJo",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./oc-lnc": "Fnuy",
	"./oc-lnc.js": "Fnuy",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tk": "Wv91",
	"./tk.js": "Wv91",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-mo": "OmwH",
	"./zh-mo.js": "OmwH",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _shared_services_cookie_servise_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/services/cookie-servise/cookie.service */ "NJzO");
/* harmony import */ var _shared_services_language_browser_service_language_browser_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/services/language-browser-service/language-browser.service */ "nFaK");
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/components/header/header.component */ "aZ8m");
/* harmony import */ var _shared_components_registration_registration_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/components/registration/registration.component */ "ZsJX");






class AppComponent {
    constructor(translate, cookie, langBrowser) {
        this.translate = translate;
        this.cookie = cookie;
        this.langBrowser = langBrowser;
        translate.addLangs(['ru', 'uk']);
        translate.setDefaultLang('ru');
        let lang = this.cookie.getData('lang');
        if (!lang || !lang.match(/ru|uk/)) {
            lang = this.langBrowser.getBrowserLanguage();
            this.cookie.setData('lang', this.langBrowser.getBrowserLanguage());
        }
        translate.use((lang.match(/ru|uk/) || ['ru'])[0]);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_cookie_servise_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_language_browser_service_language_browser_service__WEBPACK_IMPORTED_MODULE_3__["LanguageBrowserService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [[1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-registration");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _shared_components_registration_registration_component__WEBPACK_IMPORTED_MODULE_5__["RegistrationComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/locales/ru */ "wq8c");
/* harmony import */ var _angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common_locales_uk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/locales/uk */ "dp1V");
/* harmony import */ var _angular_common_locales_uk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_uk__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/components/header/header.component */ "aZ8m");
/* harmony import */ var _shared_components_registration_registration_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/components/registration/registration.component */ "ZsJX");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_components_input_input_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/components/input/input.module */ "1Mzz");
/* harmony import */ var _shared_components_user_passport_data_user_passport_data_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/components/user-passport-data/user-passport-data.module */ "KPc0");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/http-loader */ "mqiu");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");













// import ngx-translate and the http loader







Object(_angular_common__WEBPACK_IMPORTED_MODULE_16__["registerLocaleData"])(_angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_2___default.a, 'ru');
Object(_angular_common__WEBPACK_IMPORTED_MODULE_16__["registerLocaleData"])(_angular_common_locales_uk__WEBPACK_IMPORTED_MODULE_3___default.a, 'uk');
// required for AOT compilation
function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_14__["TranslateHttpLoader"](http);
}
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__["MatSnackBar"],
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], useValue: { locales: ['uk', 'ru'] } }
    ], imports: [[
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
            _shared_components_input_input_module__WEBPACK_IMPORTED_MODULE_8__["InputModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateLoader"],
                    useFactory: HttpLoaderFactory,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClient"]]
                }
            }),
            _shared_components_user_passport_data_user_passport_data_module__WEBPACK_IMPORTED_MODULE_9__["UserPassportDataModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot([]),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
        _shared_components_registration_registration_component__WEBPACK_IMPORTED_MODULE_6__["RegistrationComponent"]], imports: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
        _shared_components_input_input_module__WEBPACK_IMPORTED_MODULE_8__["InputModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateModule"], _shared_components_user_passport_data_user_passport_data_module__WEBPACK_IMPORTED_MODULE_9__["UserPassportDataModule"], _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"]] }); })();


/***/ }),

/***/ "ZsJX":
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/registration/registration.component.ts ***!
  \**************************************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var _form_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../form/form.component */ "0h//");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/constants */ "+nbM");
/* harmony import */ var _validators_validator_cyrillic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validators/validator-cyrillic */ "IXn5");
/* harmony import */ var _validators_validators_inn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../validators/validators-inn */ "OI7v");
/* harmony import */ var _animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../animations/fading-away.animate */ "xi4J");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _email_block_email_block_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../email-block/email-block.component */ "h2Zm");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../input/input.component */ "QlUG");
/* harmony import */ var _user_passport_data_user_passport_data_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../user-passport-data/user-passport-data.component */ "gXcr");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "ofXK");















const _c0 = ["passportData"];
const _c1 = ["email"];
const _c2 = function (a0, a1) { return { "btn-primary-disabled": a0, "cursor-wait": a1 }; };
const _c3 = function (a0) { return { "loader-text": a0 }; };
class RegistrationComponent extends _form_form_component__WEBPACK_IMPORTED_MODULE_0__["FormComponent"] {
    constructor(snackBar, translate) {
        super();
        this.snackBar = snackBar;
        this.translate = translate;
        this.disabledBtn = false;
        this.btnSubmit = false;
        this.maskTaxNumber = _constants_constants__WEBPACK_IMPORTED_MODULE_3__["MASK_TAX_NUMBER"];
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.fields = [
            {
                name: 'first_name', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _validators_validator_cyrillic__WEBPACK_IMPORTED_MODULE_4__["CyrillicValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(100)],
                errors: {
                    required: 'Registration.ErrorMassage.Required',
                    cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
                },
            }, {
                name: 'last_name', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _validators_validator_cyrillic__WEBPACK_IMPORTED_MODULE_4__["CyrillicValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(100)],
                errors: {
                    required: 'Registration.ErrorMassage.Required',
                    cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
                },
            }, {
                name: 'middle_name', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _validators_validator_cyrillic__WEBPACK_IMPORTED_MODULE_4__["CyrillicValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(100)],
                errors: {
                    required: 'Registration.ErrorMassage.Required',
                    cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
                },
            }, {
                name: 'tax_number', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _validators_validators_inn__WEBPACK_IMPORTED_MODULE_5__["TaxNumberValidator"]],
                errors: {
                    required: 'Registration.ErrorMassage.Required',
                    taxNumberValidator: 'Registration.ErrorMassage.TaxNumberValidator',
                },
            },
        ];
    }
    ngOnInit() {
        super.ngOnInit();
    }
    nextInput() {
        if (this.form.controls.tax_number.valid) {
            this.passportComponent.nextInput('passport-series');
        }
    }
    submitRegistrationForm() {
        this.disabledBtn = true;
        this.btnSubmit = true;
        super.submit();
        this.passportComponent.submit();
        if (this.passportComponent.statusForm() && this.form.valid && this.email.form.valid) {
            const errorForm = [];
            for (let i = 0; i < this.fields.length; i++) {
                if (this.form.controls[this.fields[i].name].value.toString().length <= 1) {
                    errorForm.push(this.form.controls[this.fields[i].name].value.toString());
                }
            }
            if (errorForm.length >= 1) {
                this.snackBar.open(this.translate.instant('SnackBarMessage.ErrorSend'), '', {
                    duration: 3000,
                    panelClass: 'error-snack-bar',
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                });
            }
            else {
                this.snackBar.open(this.translate.instant('SnackBarMessage.SuccessfullySend'), '', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                });
            }
            this.disabledBtn = false;
            this.btnSubmit = false;
        }
        else {
            this.disabledBtn = false;
            this.btnSubmit = false;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
RegistrationComponent.ɵfac = function RegistrationComponent_Factory(t) { return new (t || RegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"])); };
RegistrationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: RegistrationComponent, selectors: [["app-registration"]], viewQuery: function RegistrationComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.passportComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.email = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 52, vars: 58, consts: [[1, "container"], [1, "row"], [1, "col-12"], [1, "title"], [1, "panel"], [1, "bank-account-block"], [1, "bank-account-block__title"], ["email", ""], [1, "form-registration2"], ["id", "registrationForm-2", 1, "form-block-content", 3, "formGroup"], [1, "user-personal-data"], [1, "form-block"], [1, "list-input"], ["typeInput", "text", "nameInput", "first_name", "maxLengthInput", "100", 1, "input", "order-2", "order-md-0", 3, "label", "errorMessage", "formControlInput"], ["nameInput", "last_name", "typeInput", "text", "maxLengthInput", "100", 1, "input", "order-1", "order-md-0", 3, "label", "errorMessage", "formControlInput"], ["typeInput", "text", "maxLengthInput", "100", "nameInput", "middle_name", 1, "input", "order-3", "order-md-0", "hidden-input", 3, "label", "errorMessage", "formControlInput"], ["typeInput", "tel", "nameInput", "tax_number", 1, "input", "order-4", "order-md-0", 3, "label", "maskInput", "errorMessage", "formControlInput", "input"], [1, "passport-data-user"], ["passportData", ""], [1, "btn-block"], [1, "info-content"], [1, "info-content__item-text"], ["href", "#", "target", "_blank", 1, "link"], [1, "info-content__item-text", "link"], [1, "btn-next"], ["type", "submit", 1, "btn-primary", 3, "ngClass", "disabled", "click"], [3, "ngClass"]], template: function RegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "app-email-block", null, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "form", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "app-input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](18, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](19, "app-input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](20, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](21, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](22, "app-input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](23, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "app-input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("input", function RegistrationComponent_Template_app_input_input_25_listener() { return ctx.nextInput(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](26, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](27, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "app-user-passport-data", null, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](34);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](35, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](39, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](40, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](42, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](44, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](45);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](46, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](47, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RegistrationComponent_Template_button_click_48_listener() { return ctx.submitRegistrationForm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](49, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](50);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](51, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@showAnimate", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 25, "Registration.Registration"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@showAnimate", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](17, 27, "Registration.RegistrationsForm.FirstName"))("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](18, 29, ctx.errorMessages.first_name))("formControlInput", ctx.form.controls.first_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](20, 31, "Registration.RegistrationsForm.LastName"))("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](21, 33, ctx.errorMessages.last_name))("formControlInput", ctx.form.controls.last_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](23, 35, "Registration.RegistrationsForm.MiddleName"))("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](24, 37, ctx.errorMessages.middle_name))("formControlInput", ctx.form.controls.middle_name);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](26, 39, "Registration.RegistrationsForm.TaxNumber"))("maskInput", ctx.maskTaxNumber)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](27, 41, ctx.errorMessages.tax_number))("formControlInput", ctx.form.controls.tax_number);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](35, 43, "link.NextRedirectLink"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](39, 45, "link.PersonalData"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](42, 47, "link.And"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](46, 49, "link.ServiceInformation"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction2"](53, _c2, ctx.checkIfTheButtonIsPressed() && !(ctx.form.valid && ctx.passportComponent.statusForm()), ctx.disabledBtn))("disabled", ctx.checkIfTheButtonIsPressed() && !(ctx.form.valid && ctx.passportComponent.statusForm()) || ctx.disabledBtn);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](56, _c3, ctx.disabledBtn));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](51, 51, "General.Next"));
    } }, directives: [_email_block_email_block_component__WEBPACK_IMPORTED_MODULE_10__["EmailBlockComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _input_input_component__WEBPACK_IMPORTED_MODULE_11__["InputComponent"], _user_passport_data_user_passport_data_component__WEBPACK_IMPORTED_MODULE_12__["UserPassportDataComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgClass"]], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslatePipe"]], styles: ["@charset \"UTF-8\";\n[_ngcontent-%COMP%]:root {\n  --mainFont: CoreSansG;\n  --header-color: linear-gradient(90deg, #0D5297 0.26%, #0D5297 47.1%, #0D5297 99.8%);\n  --grey1: #CFE0F4;\n  --black: #000;\n  --white: #fff;\n  --grey: #ccc;\n  --grey2: #808080;\n  --grey3: #D3D3D3;\n  --grey5: #979797;\n  --grey6: #F5F5F5;\n  --blue: #6987F0;\n  --blue2: #3851C6;\n  --blue4: #0D5297;\n  --red: #f06979;\n  --black-rgba: rgba(0, 0, 0, 0.7);\n  --passport-toggle: #6987F0;\n  --input-focus: #0D5297;\n  --btn1-normal: linear-gradient(167.72deg, #0D5297 -33.07%, #0D5297 48.35%, #0D5297 139.94%);\n  --btn1-hover: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-focus: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-disabled: linear-gradient(167.72deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn1-color-text-focus: #6D98D9;\n  --btn1-color-text: #fff;\n  --btn4-hover: linear-gradient(122.5deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn4-border: #CCCCCC;\n  --background-selected-day: linear-gradient(314.41deg, #5A4BE6 -48.61%, #73AFF7 33.69%, #93D0D9 126.27%);\n  --color-text-header: rgba(0, 0, 0, 0.543337);\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 10px 0;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%] {\n  max-height: 260px;\n  min-height: 100px;\n  background: var(--grey6);\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block__title[_ngcontent-%COMP%] {\n  padding: 20px 10px;\n  text-align: center;\n  font-family: var(--mainFont);\n  font-style: normal;\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 19px;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%]   .bank-link-block[_ngcontent-%COMP%] {\n  overflow: hidden;\n  overflow-x: auto;\n  position: relative;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%]   .bank-link-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%] {\n  height: 109px;\n  display: flex;\n  justify-content: space-evenly;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%]   .bank-link-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%]   .bank-link[_ngcontent-%COMP%] {\n  height: 55px;\n  max-width: 130px;\n  min-width: 130px;\n  cursor: pointer;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%]   .bank-link-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%]   .bank-link[_ngcontent-%COMP%]   .icon-bank[_ngcontent-%COMP%] {\n  display: block;\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  width: 100%;\n  height: 100%;\n  margin: auto;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%]   .bank-link-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%]   .bank-link[_ngcontent-%COMP%]   .name-bank[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--mainFont);\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  margin: 10px 10px;\n  text-align: center;\n  color: var(--grey5);\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .bank-account-block[_ngcontent-%COMP%]   .bank-link-block[_ngcontent-%COMP%]   .position[_ngcontent-%COMP%] {\n    width: 600px;\n  }\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .user-personal-data[_ngcontent-%COMP%]   .form-block[_ngcontent-%COMP%] {\n  margin: 20px 0;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .user-personal-data[_ngcontent-%COMP%]   .form-block[_ngcontent-%COMP%]   .list-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  width: 94%;\n  margin: auto;\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .user-personal-data[_ngcontent-%COMP%]   .form-block[_ngcontent-%COMP%]   .list-input[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .user-personal-data[_ngcontent-%COMP%]   .form-block[_ngcontent-%COMP%]   .list-input[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {\n  width: 48%;\n  margin: 10px auto;\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .user-personal-data[_ngcontent-%COMP%]   .form-block[_ngcontent-%COMP%]   .list-input[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {\n    width: 98%;\n  }\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .passport-data-user[_ngcontent-%COMP%] {\n  width: 92%;\n  margin: 0 auto 30px auto;\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .passport-data-user[_ngcontent-%COMP%] {\n    margin: auto;\n  }\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%] {\n  margin: 20px 38px;\n  display: flex;\n  justify-content: space-between;\n}\n@media (max-width: 992px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%] {\n    margin: 20px 27px;\n  }\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%] {\n    flex-direction: column;\n    margin: 10px 15px;\n  }\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n  width: 49%;\n  font-size: 14px;\n  color: var(--passport-toggle);\n  line-height: 16px;\n  margin: auto;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .info-content__item-text[_ngcontent-%COMP%] {\n  font-family: var(--mainFont);\n  font-size: 13px;\n  color: var(--grey2);\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .info-content__item-text[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 500;\n  background: var(--blue4);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  line-height: 14px;\n  border-bottom: 1px solid transparent;\n  transition: all 0.4s ease-out;\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .info-content__item-text[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:hover {\n  transition: all 0.4s ease-in;\n  border-bottom: 1px solid var(--blue4);\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .info-content__item-text[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:hover {\n    border-bottom: 1px solid transparent;\n  }\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .info-content[_ngcontent-%COMP%] {\n    width: 97%;\n    margin: 10px auto;\n    line-height: 18px;\n  }\n}\n.container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .btn-next[_ngcontent-%COMP%] {\n  width: 50%;\n}\n@media (max-width: 767px) {\n  .container[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]   .form-registration2[_ngcontent-%COMP%]   .form-block-content[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]   .btn-next[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 10px 0;\n  }\n}\n@media (max-width: 480px) {\n  .hidden-input[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  \n  width: 0;\n  \n  background: transparent;\n  \n}\n.bank-account-block[_ngcontent-%COMP%] {\n  -ms-overflow-style: none;\n  \n  scrollbar-width: none;\n  \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxccmVnaXN0cmF0aW9uLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcc3R5bGVzXFx2YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNNaEI7RUFFRSxxQkFBQTtFQUVBLG1GQUFBO0VBRUEsZ0JBQUE7RUFHQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUdBLGdDQUFBO0VBR0EsMEJBQUE7RUFHQSxzQkFBQTtFQUlBLDJGQUFBO0VBQ0EsMEZBQUE7RUFDQSwwRkFBQTtFQUNBLDZGQUFBO0VBQ0EsZ0NBQUE7RUFDQSx1QkFBQTtFQUlBLHlGQUFBO0VBQ0Esc0JBQUE7RUFDQSx1R0FBQTtFQUNBLDRDQUFBO0FEckJGO0FBMUJFO0VBQ0UsVUFBQTtFQUNBLGNBQUE7QUE2Qko7QUEzQkk7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esd0JBQUE7QUE2Qk47QUEzQk07RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBNkJSO0FBMUJNO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBNEJSO0FBMUJRO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSw2QkFBQTtBQTRCVjtBQTFCVTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQTRCWjtBQTFCWTtFQUNFLGNBQUE7RUFDQSw0QkFBQTtFQUNBLDRCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBNEJkO0FBekJZO0VBQ0UsY0FBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUEyQmQ7QUF2QlU7RUFoQ0Y7SUFpQ0ksWUFBQTtFQTBCVjtBQUNGO0FBbEJVO0VBQ0UsY0FBQTtBQW9CWjtBQWxCWTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUFvQmQ7QUFuQmM7RUFMRjtJQU1JLHNCQUFBO0VBc0JkO0FBQ0Y7QUFwQmM7RUFDRSxVQUFBO0VBQ0EsaUJBQUE7QUFzQmhCO0FBckJnQjtFQUhGO0lBSUksVUFBQTtFQXdCaEI7QUFDRjtBQWpCUTtFQUNFLFVBQUE7RUFDQSx3QkFBQTtBQW1CVjtBQWxCVTtFQUhGO0lBSUksWUFBQTtFQXFCVjtBQUNGO0FBbEJRO0VBQ0UsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7QUFvQlY7QUFuQlU7RUFKRjtJQUtJLGlCQUFBO0VBc0JWO0FBQ0Y7QUFyQlU7RUFQRjtJQVFJLHNCQUFBO0lBQ0EsaUJBQUE7RUF3QlY7QUFDRjtBQXRCVTtFQUNFLFVBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUF3Qlo7QUF0Qlk7RUFDRSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQXdCZDtBQXRCYztFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxvQ0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0NBQUE7RUFDQSw2QkFBQTtBQXdCaEI7QUF0QmdCO0VBQ0UsNEJBQUE7RUFDQSxxQ0FBQTtBQXdCbEI7QUF2QmtCO0VBSEY7SUFJSSxvQ0FBQTtFQTBCbEI7QUFDRjtBQXJCWTtFQWhDRjtJQWlDSSxVQUFBO0lBQ0EsaUJBQUE7SUFDQSxpQkFBQTtFQXdCWjtBQUNGO0FBckJVO0VBQ0UsVUFBQTtBQXVCWjtBQXJCWTtFQUhGO0lBSUksV0FBQTtJQUNBLGNBQUE7RUF3Qlo7QUFDRjtBQWZFO0VBREY7SUFFSSxhQUFBO0VBbUJGO0FBQ0Y7QUFoQkE7RUFBc0IsaUJBQUE7RUFDcEIsUUFBQTtFQUFVLHVCQUFBO0VBQ1YsdUJBQUE7RUFBeUIsZ0JBQUE7QUFzQjNCO0FBbkJBO0VBQ0Usd0JBQUE7RUFBMEIsV0FBQTtFQUMxQixxQkFBQTtFQUF1QixZQUFBO0FBd0J6QiIsImZpbGUiOiJyZWdpc3RyYXRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG46cm9vdCB7XG4gIC0tbWFpbkZvbnQ6IENvcmVTYW5zRztcbiAgLS1oZWFkZXItY29sb3I6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzBENTI5NyAwLjI2JSwgIzBENTI5NyA0Ny4xJSwgIzBENTI5NyA5OS44JSk7XG4gIC0tZ3JleTE6ICNDRkUwRjQ7XG4gIC0tYmxhY2s6ICMwMDA7XG4gIC0td2hpdGU6ICNmZmY7XG4gIC0tZ3JleTogI2NjYztcbiAgLS1ncmV5MjogIzgwODA4MDtcbiAgLS1ncmV5MzogI0QzRDNEMztcbiAgLS1ncmV5NTogIzk3OTc5NztcbiAgLS1ncmV5NjogI0Y1RjVGNTtcbiAgLS1ibHVlOiAjNjk4N0YwO1xuICAtLWJsdWUyOiAjMzg1MUM2O1xuICAtLWJsdWU0OiAjMEQ1Mjk3O1xuICAtLXJlZDogI2YwNjk3OTtcbiAgLS1ibGFjay1yZ2JhOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gIC0tcGFzc3BvcnQtdG9nZ2xlOiAjNjk4N0YwO1xuICAtLWlucHV0LWZvY3VzOiAjMEQ1Mjk3O1xuICAtLWJ0bjEtbm9ybWFsOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjMEQ1Mjk3IC0zMy4wNyUsICMwRDUyOTcgNDguMzUlLCAjMEQ1Mjk3IDEzOS45NCUpO1xuICAtLWJ0bjEtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XG4gIC0tYnRuMS1mb2N1czogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcbiAgLS1idG4xLWRpc2FibGVkOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xuICAtLWJ0bjEtY29sb3ItdGV4dC1mb2N1czogIzZEOThEOTtcbiAgLS1idG4xLWNvbG9yLXRleHQ6ICNmZmY7XG4gIC0tYnRuNC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDEyMi41ZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xuICAtLWJ0bjQtYm9yZGVyOiAjQ0NDQ0NDO1xuICAtLWJhY2tncm91bmQtc2VsZWN0ZWQtZGF5OiBsaW5lYXItZ3JhZGllbnQoMzE0LjQxZGVnLCAjNUE0QkU2IC00OC42MSUsICM3M0FGRjcgMzMuNjklLCAjOTNEMEQ5IDEyNi4yNyUpO1xuICAtLWNvbG9yLXRleHQtaGVhZGVyOiByZ2JhKDAsIDAsIDAsIDAuNTQzMzM3KTtcbn1cblxuLmNvbnRhaW5lciAucGFuZWwge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDEwcHggMDtcbn1cbi5jb250YWluZXIgLnBhbmVsIC5iYW5rLWFjY291bnQtYmxvY2sge1xuICBtYXgtaGVpZ2h0OiAyNjBweDtcbiAgbWluLWhlaWdodDogMTAwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWdyZXk2KTtcbn1cbi5jb250YWluZXIgLnBhbmVsIC5iYW5rLWFjY291bnQtYmxvY2tfX3RpdGxlIHtcbiAgcGFkZGluZzogMjBweCAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluRm9udCk7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTlweDtcbn1cbi5jb250YWluZXIgLnBhbmVsIC5iYW5rLWFjY291bnQtYmxvY2sgLmJhbmstbGluay1ibG9jayB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5jb250YWluZXIgLnBhbmVsIC5iYW5rLWFjY291bnQtYmxvY2sgLmJhbmstbGluay1ibG9jayAucG9zaXRpb24ge1xuICBoZWlnaHQ6IDEwOXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbn1cbi5jb250YWluZXIgLnBhbmVsIC5iYW5rLWFjY291bnQtYmxvY2sgLmJhbmstbGluay1ibG9jayAucG9zaXRpb24gLmJhbmstbGluayB7XG4gIGhlaWdodDogNTVweDtcbiAgbWF4LXdpZHRoOiAxMzBweDtcbiAgbWluLXdpZHRoOiAxMzBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNvbnRhaW5lciAucGFuZWwgLmJhbmstYWNjb3VudC1ibG9jayAuYmFuay1saW5rLWJsb2NrIC5wb3NpdGlvbiAuYmFuay1saW5rIC5pY29uLWJhbmsge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLmNvbnRhaW5lciAucGFuZWwgLmJhbmstYWNjb3VudC1ibG9jayAuYmFuay1saW5rLWJsb2NrIC5wb3NpdGlvbiAuYmFuay1saW5rIC5uYW1lLWJhbmsge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1mYW1pbHk6IHZhcigtLW1haW5Gb250KTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbjogMTBweCAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1ncmV5NSk7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmNvbnRhaW5lciAucGFuZWwgLmJhbmstYWNjb3VudC1ibG9jayAuYmFuay1saW5rLWJsb2NrIC5wb3NpdGlvbiB7XG4gICAgd2lkdGg6IDYwMHB4O1xuICB9XG59XG4uY29udGFpbmVyIC5wYW5lbCAuZm9ybS1yZWdpc3RyYXRpb24yIC5mb3JtLWJsb2NrLWNvbnRlbnQgLnVzZXItcGVyc29uYWwtZGF0YSAuZm9ybS1ibG9jayB7XG4gIG1hcmdpbjogMjBweCAwO1xufVxuLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC51c2VyLXBlcnNvbmFsLWRhdGEgLmZvcm0tYmxvY2sgLmxpc3QtaW5wdXQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHdpZHRoOiA5NCU7XG4gIG1hcmdpbjogYXV0bztcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY29udGFpbmVyIC5wYW5lbCAuZm9ybS1yZWdpc3RyYXRpb24yIC5mb3JtLWJsb2NrLWNvbnRlbnQgLnVzZXItcGVyc29uYWwtZGF0YSAuZm9ybS1ibG9jayAubGlzdC1pbnB1dCB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxufVxuLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC51c2VyLXBlcnNvbmFsLWRhdGEgLmZvcm0tYmxvY2sgLmxpc3QtaW5wdXQgLmlucHV0IHtcbiAgd2lkdGg6IDQ4JTtcbiAgbWFyZ2luOiAxMHB4IGF1dG87XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC51c2VyLXBlcnNvbmFsLWRhdGEgLmZvcm0tYmxvY2sgLmxpc3QtaW5wdXQgLmlucHV0IHtcbiAgICB3aWR0aDogOTglO1xuICB9XG59XG4uY29udGFpbmVyIC5wYW5lbCAuZm9ybS1yZWdpc3RyYXRpb24yIC5mb3JtLWJsb2NrLWNvbnRlbnQgLnBhc3Nwb3J0LWRhdGEtdXNlciB7XG4gIHdpZHRoOiA5MiU7XG4gIG1hcmdpbjogMCBhdXRvIDMwcHggYXV0bztcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY29udGFpbmVyIC5wYW5lbCAuZm9ybS1yZWdpc3RyYXRpb24yIC5mb3JtLWJsb2NrLWNvbnRlbnQgLnBhc3Nwb3J0LWRhdGEtdXNlciB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG59XG4uY29udGFpbmVyIC5wYW5lbCAuZm9ybS1yZWdpc3RyYXRpb24yIC5mb3JtLWJsb2NrLWNvbnRlbnQgLmJ0bi1ibG9jayB7XG4gIG1hcmdpbjogMjBweCAzOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5AbWVkaWEgKG1heC13aWR0aDogOTkycHgpIHtcbiAgLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC5idG4tYmxvY2sge1xuICAgIG1hcmdpbjogMjBweCAyN3B4O1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC5idG4tYmxvY2sge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWFyZ2luOiAxMHB4IDE1cHg7XG4gIH1cbn1cbi5jb250YWluZXIgLnBhbmVsIC5mb3JtLXJlZ2lzdHJhdGlvbjIgLmZvcm0tYmxvY2stY29udGVudCAuYnRuLWJsb2NrIC5pbmZvLWNvbnRlbnQge1xuICB3aWR0aDogNDklO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS1wYXNzcG9ydC10b2dnbGUpO1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC5idG4tYmxvY2sgLmluZm8tY29udGVudF9faXRlbS10ZXh0IHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLW1haW5Gb250KTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogdmFyKC0tZ3JleTIpO1xufVxuLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC5idG4tYmxvY2sgLmluZm8tY29udGVudF9faXRlbS10ZXh0IC5saW5rIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXdlaWdodDogNTAwO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1ibHVlNCk7XG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2Utb3V0O1xufVxuLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC5idG4tYmxvY2sgLmluZm8tY29udGVudF9faXRlbS10ZXh0IC5saW5rOmhvdmVyIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJsdWU0KTtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY29udGFpbmVyIC5wYW5lbCAuZm9ybS1yZWdpc3RyYXRpb24yIC5mb3JtLWJsb2NrLWNvbnRlbnQgLmJ0bi1ibG9jayAuaW5mby1jb250ZW50X19pdGVtLXRleHQgLmxpbms6aG92ZXIge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5jb250YWluZXIgLnBhbmVsIC5mb3JtLXJlZ2lzdHJhdGlvbjIgLmZvcm0tYmxvY2stY29udGVudCAuYnRuLWJsb2NrIC5pbmZvLWNvbnRlbnQge1xuICAgIHdpZHRoOiA5NyU7XG4gICAgbWFyZ2luOiAxMHB4IGF1dG87XG4gICAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIH1cbn1cbi5jb250YWluZXIgLnBhbmVsIC5mb3JtLXJlZ2lzdHJhdGlvbjIgLmZvcm0tYmxvY2stY29udGVudCAuYnRuLWJsb2NrIC5idG4tbmV4dCB7XG4gIHdpZHRoOiA1MCU7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmNvbnRhaW5lciAucGFuZWwgLmZvcm0tcmVnaXN0cmF0aW9uMiAuZm9ybS1ibG9jay1jb250ZW50IC5idG4tYmxvY2sgLmJ0bi1uZXh0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDEwcHggMDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmhpZGRlbi1pbnB1dCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgLyogY2hyb21lIGJhc2VkICovXG4gIHdpZHRoOiAwO1xuICAvKiDRiNC40YDQuNC90LAgc2Nyb2xsYmFyJ2EgKi9cbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC8qINC+0L/RhtC40L7QvdCw0LvRjNC90L4gKi9cbn1cblxuLmJhbmstYWNjb3VudC1ibG9jayB7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbiAgLyogSUUgMTArICovXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgLyogRmlyZWZveCAqL1xufSIsIiR4czogMDtcclxuJHNtOiA1NzZweDtcclxuJG1kOiA3NjdweDtcclxuJGxnOiA5OTJweDtcclxuJHhsOiAxMjAwcHg7XHJcblxyXG46cm9vdCB7XHJcbiAgLy8gZm9udFxyXG4gIC0tbWFpbkZvbnQ6IENvcmVTYW5zRztcclxuICAvLyBjb2xvclxyXG4gIC0taGVhZGVyLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwRDUyOTcgMC4yNiUsICMwRDUyOTcgNDcuMSUsICMwRDUyOTcgOTkuOCUpO1xyXG4gIC8vJGdyZXk6ICNjY2M7XHJcbiAgLS1ncmV5MTogI0NGRTBGNDtcclxuXHJcbiAgLy8gYmFja2dyb3VuZFxyXG4gIC0tYmxhY2s6ICMwMDA7XHJcbiAgLS13aGl0ZTogI2ZmZjtcclxuICAtLWdyZXk6ICNjY2M7XHJcbiAgLS1ncmV5MjogIzgwODA4MDtcclxuICAtLWdyZXkzOiAjRDNEM0QzO1xyXG4gIC0tZ3JleTU6ICM5Nzk3OTc7XHJcbiAgLS1ncmV5NjogI0Y1RjVGNTtcclxuICAtLWJsdWU6ICM2OTg3RjA7XHJcbiAgLS1ibHVlMjogIzM4NTFDNjtcclxuICAtLWJsdWU0OiAjMEQ1Mjk3O1xyXG4gIC0tcmVkOiAjZjA2OTc5O1xyXG5cclxuICAvLyBiYWNrZ3JvdW5kXHJcbiAgLS1ibGFjay1yZ2JhOiByZ2JhKDAsIDAsIDAsIDAuNyk7XHJcblxyXG4gIC8vIGJ0bi1wYXNzcG9ydFxyXG4gIC0tcGFzc3BvcnQtdG9nZ2xlOiAjNjk4N0YwO1xyXG5cclxuICAvLyBpbnB1dFxyXG4gIC0taW5wdXQtZm9jdXM6ICMwRDUyOTc7XHJcblxyXG5cclxuICAvLyBidXR0b24gY29sb3IgcHJpbWFyeVxyXG4gIC0tYnRuMS1ub3JtYWw6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICMwRDUyOTcgLTMzLjA3JSwgIzBENTI5NyA0OC4zNSUsICMwRDUyOTcgMTM5Ljk0JSk7XHJcbiAgLS1idG4xLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xyXG4gIC0tYnRuMS1mb2N1czogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcclxuICAtLWJ0bjEtZGlzYWJsZWQ6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XHJcbiAgLS1idG4xLWNvbG9yLXRleHQtZm9jdXM6ICM2RDk4RDk7XHJcbiAgLS1idG4xLWNvbG9yLXRleHQ6ICNmZmY7XHJcblxyXG5cclxuICAvLyBjYWxlbmRhciBjb2xvclxyXG4gIC0tYnRuNC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDEyMi41ZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xyXG4gIC0tYnRuNC1ib3JkZXI6ICNDQ0NDQ0M7XHJcbiAgLS1iYWNrZ3JvdW5kLXNlbGVjdGVkLWRheTogbGluZWFyLWdyYWRpZW50KDMxNC40MWRlZywgIzVBNEJFNiAtNDguNjElLCAjNzNBRkY3IDMzLjY5JSwgIzkzRDBEOSAxMjYuMjclKTtcclxuICAtLWNvbG9yLXRleHQtaGVhZGVyOiByZ2JhKDAsIDAsIDAsIDAuNTQzMzM3KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuIl19 */"], data: { animation: [_animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_6__["showAnimate"]] } });


/***/ }),

/***/ "aZ8m":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _services_cookie_servise_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/cookie-servise/cookie.service */ "NJzO");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




const _c0 = function (a0) { return { "active-lang": a0 }; };
class HeaderComponent {
    constructor(translate, cookie) {
        this.translate = translate;
        this.cookie = cookie;
    }
    langToggle(toggleLang) {
        this.translate.use(toggleLang);
        this.cookie.setData('lang', toggleLang);
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_cookie_servise_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 11, vars: 6, consts: [[1, "header"], [1, "container"], [1, "label"], [1, "label__icon"], [1, "lang"], [1, "lang__item", 3, "ngClass", "click"], [1, "line"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Registration ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_6_listener() { return ctx.langToggle("ru"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "RU");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_9_listener() { return ctx.langToggle("uk"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "UK");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, ctx.translate.currentLang === "ru"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c0, ctx.translate.currentLang === "uk"));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"]], styles: ["[_ngcontent-%COMP%]:root {\n  --mainFont: CoreSansG;\n  --header-color: linear-gradient(90deg, #0D5297 0.26%, #0D5297 47.1%, #0D5297 99.8%);\n  --grey1: #CFE0F4;\n  --black: #000;\n  --white: #fff;\n  --grey: #ccc;\n  --grey2: #808080;\n  --grey3: #D3D3D3;\n  --grey5: #979797;\n  --grey6: #F5F5F5;\n  --blue: #6987F0;\n  --blue2: #3851C6;\n  --blue4: #0D5297;\n  --red: #f06979;\n  --black-rgba: rgba(0, 0, 0, 0.7);\n  --passport-toggle: #6987F0;\n  --input-focus: #0D5297;\n  --btn1-normal: linear-gradient(167.72deg, #0D5297 -33.07%, #0D5297 48.35%, #0D5297 139.94%);\n  --btn1-hover: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-focus: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-disabled: linear-gradient(167.72deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn1-color-text-focus: #6D98D9;\n  --btn1-color-text: #fff;\n  --btn4-hover: linear-gradient(122.5deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn4-border: #CCCCCC;\n  --background-selected-day: linear-gradient(314.41deg, #5A4BE6 -48.61%, #73AFF7 33.69%, #93D0D9 126.27%);\n  --color-text-header: rgba(0, 0, 0, 0.543337);\n}\n\n.header[_ngcontent-%COMP%] {\n  height: 100px;\n  background: var(--header-color);\n}\n\n@media (max-width: 576px) {\n  .header[_ngcontent-%COMP%] {\n    height: 60px;\n  }\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n  display: flex;\n  margin: auto;\n  padding: 0 30px;\n  height: 100px;\n}\n\n@media (max-width: 576px) {\n  .header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n    padding: 0 10px;\n    height: 60px;\n  }\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--grey1);\n  font-size: 33px;\n  justify-content: center;\n  width: 60%;\n  font-family: var(--mainFont);\n  margin: auto 0 auto 0;\n  text-align: left;\n}\n\n@media (max-width: 576px) {\n  .header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .label__icon[_ngcontent-%COMP%] {\n  font-family: var(--mainFont);\n  border-bottom: 3px solid var(--grey1);\n  padding-bottom: 3px;\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .lang[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  width: 40%;\n  font-size: 16px;\n  margin: auto;\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .lang[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  display: block;\n  border-left: 2px solid var(--grey1);\n  height: 22px;\n  position: relative;\n  top: 2px;\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .lang__item[_ngcontent-%COMP%] {\n  color: var(--grey1);\n  padding: 0 10px;\n  font-family: var(--mainFont);\n  transition: all 0.3s ease-in-out;\n  font-weight: 400;\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .lang__item[_ngcontent-%COMP%]:hover {\n  transition: all 0.3s ease-in;\n  cursor: pointer;\n  color: var(--blue);\n}\n\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .lang[_ngcontent-%COMP%]   .active-lang[_ngcontent-%COMP%] {\n  color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlc1xcdmFyaWFibGVzLnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXGhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtFQUVFLHFCQUFBO0VBRUEsbUZBQUE7RUFFQSxnQkFBQTtFQUdBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBR0EsZ0NBQUE7RUFHQSwwQkFBQTtFQUdBLHNCQUFBO0VBSUEsMkZBQUE7RUFDQSwwRkFBQTtFQUNBLDBGQUFBO0VBQ0EsNkZBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0VBSUEseUZBQUE7RUFDQSxzQkFBQTtFQUNBLHVHQUFBO0VBQ0EsNENBQUE7QUN0QkY7O0FBMUJBO0VBQ0UsYUFBQTtFQUNBLCtCQUFBO0FBNkJGOztBQTVCRTtFQUhGO0lBSUksWUFBQTtFQStCRjtBQUNGOztBQTdCRTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUErQko7O0FBOUJJO0VBTEY7SUFNSSxlQUFBO0lBQ0EsWUFBQTtFQWlDSjtBQUNGOztBQS9CSTtFQUNFLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQWlDTjs7QUFoQ007RUFSRjtJQVNJLGVBQUE7RUFtQ047QUFDRjs7QUFqQ007RUFDRSw0QkFBQTtFQUNBLHFDQUFBO0VBQ0EsbUJBQUE7QUFtQ1I7O0FBL0JJO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBaUNOOztBQS9CTTtFQUNFLGNBQUE7RUFDQSxtQ0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7QUFpQ1I7O0FBOUJNO0VBQ0UsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0FBZ0NSOztBQTdCUTtFQUNFLDRCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBK0JWOztBQTNCTTtFQUNFLFVBQUE7QUE2QlIiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJHhzOiAwO1xyXG4kc206IDU3NnB4O1xyXG4kbWQ6IDc2N3B4O1xyXG4kbGc6IDk5MnB4O1xyXG4keGw6IDEyMDBweDtcclxuXHJcbjpyb290IHtcclxuICAvLyBmb250XHJcbiAgLS1tYWluRm9udDogQ29yZVNhbnNHO1xyXG4gIC8vIGNvbG9yXHJcbiAgLS1oZWFkZXItY29sb3I6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzBENTI5NyAwLjI2JSwgIzBENTI5NyA0Ny4xJSwgIzBENTI5NyA5OS44JSk7XHJcbiAgLy8kZ3JleTogI2NjYztcclxuICAtLWdyZXkxOiAjQ0ZFMEY0O1xyXG5cclxuICAvLyBiYWNrZ3JvdW5kXHJcbiAgLS1ibGFjazogIzAwMDtcclxuICAtLXdoaXRlOiAjZmZmO1xyXG4gIC0tZ3JleTogI2NjYztcclxuICAtLWdyZXkyOiAjODA4MDgwO1xyXG4gIC0tZ3JleTM6ICNEM0QzRDM7XHJcbiAgLS1ncmV5NTogIzk3OTc5NztcclxuICAtLWdyZXk2OiAjRjVGNUY1O1xyXG4gIC0tYmx1ZTogIzY5ODdGMDtcclxuICAtLWJsdWUyOiAjMzg1MUM2O1xyXG4gIC0tYmx1ZTQ6ICMwRDUyOTc7XHJcbiAgLS1yZWQ6ICNmMDY5Nzk7XHJcblxyXG4gIC8vIGJhY2tncm91bmRcclxuICAtLWJsYWNrLXJnYmE6IHJnYmEoMCwgMCwgMCwgMC43KTtcclxuXHJcbiAgLy8gYnRuLXBhc3Nwb3J0XHJcbiAgLS1wYXNzcG9ydC10b2dnbGU6ICM2OTg3RjA7XHJcblxyXG4gIC8vIGlucHV0XHJcbiAgLS1pbnB1dC1mb2N1czogIzBENTI5NztcclxuXHJcblxyXG4gIC8vIGJ1dHRvbiBjb2xvciBwcmltYXJ5XHJcbiAgLS1idG4xLW5vcm1hbDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzBENTI5NyAtMzMuMDclLCAjMEQ1Mjk3IDQ4LjM1JSwgIzBENTI5NyAxMzkuOTQlKTtcclxuICAtLWJ0bjEtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XHJcbiAgLS1idG4xLWZvY3VzOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xyXG4gIC0tYnRuMS1kaXNhYmxlZDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcclxuICAtLWJ0bjEtY29sb3ItdGV4dC1mb2N1czogIzZEOThEOTtcclxuICAtLWJ0bjEtY29sb3ItdGV4dDogI2ZmZjtcclxuXHJcblxyXG4gIC8vIGNhbGVuZGFyIGNvbG9yXHJcbiAgLS1idG40LWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMTIyLjVkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XHJcbiAgLS1idG40LWJvcmRlcjogI0NDQ0NDQztcclxuICAtLWJhY2tncm91bmQtc2VsZWN0ZWQtZGF5OiBsaW5lYXItZ3JhZGllbnQoMzE0LjQxZGVnLCAjNUE0QkU2IC00OC42MSUsICM3M0FGRjcgMzMuNjklLCAjOTNEMEQ5IDEyNi4yNyUpO1xyXG4gIC0tY29sb3ItdGV4dC1oZWFkZXI6IHJnYmEoMCwgMCwgMCwgMC41NDMzMzcpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCI6cm9vdCB7XG4gIC0tbWFpbkZvbnQ6IENvcmVTYW5zRztcbiAgLS1oZWFkZXItY29sb3I6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzBENTI5NyAwLjI2JSwgIzBENTI5NyA0Ny4xJSwgIzBENTI5NyA5OS44JSk7XG4gIC0tZ3JleTE6ICNDRkUwRjQ7XG4gIC0tYmxhY2s6ICMwMDA7XG4gIC0td2hpdGU6ICNmZmY7XG4gIC0tZ3JleTogI2NjYztcbiAgLS1ncmV5MjogIzgwODA4MDtcbiAgLS1ncmV5MzogI0QzRDNEMztcbiAgLS1ncmV5NTogIzk3OTc5NztcbiAgLS1ncmV5NjogI0Y1RjVGNTtcbiAgLS1ibHVlOiAjNjk4N0YwO1xuICAtLWJsdWUyOiAjMzg1MUM2O1xuICAtLWJsdWU0OiAjMEQ1Mjk3O1xuICAtLXJlZDogI2YwNjk3OTtcbiAgLS1ibGFjay1yZ2JhOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gIC0tcGFzc3BvcnQtdG9nZ2xlOiAjNjk4N0YwO1xuICAtLWlucHV0LWZvY3VzOiAjMEQ1Mjk3O1xuICAtLWJ0bjEtbm9ybWFsOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjMEQ1Mjk3IC0zMy4wNyUsICMwRDUyOTcgNDguMzUlLCAjMEQ1Mjk3IDEzOS45NCUpO1xuICAtLWJ0bjEtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XG4gIC0tYnRuMS1mb2N1czogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcbiAgLS1idG4xLWRpc2FibGVkOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xuICAtLWJ0bjEtY29sb3ItdGV4dC1mb2N1czogIzZEOThEOTtcbiAgLS1idG4xLWNvbG9yLXRleHQ6ICNmZmY7XG4gIC0tYnRuNC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDEyMi41ZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xuICAtLWJ0bjQtYm9yZGVyOiAjQ0NDQ0NDO1xuICAtLWJhY2tncm91bmQtc2VsZWN0ZWQtZGF5OiBsaW5lYXItZ3JhZGllbnQoMzE0LjQxZGVnLCAjNUE0QkU2IC00OC42MSUsICM3M0FGRjcgMzMuNjklLCAjOTNEMEQ5IDEyNi4yNyUpO1xuICAtLWNvbG9yLXRleHQtaGVhZGVyOiByZ2JhKDAsIDAsIDAsIDAuNTQzMzM3KTtcbn1cblxuLmhlYWRlciB7XG4gIGhlaWdodDogMTAwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWhlYWRlci1jb2xvcik7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmhlYWRlciB7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICB9XG59XG4uaGVhZGVyIC5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IGF1dG87XG4gIHBhZGRpbmc6IDAgMzBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAuaGVhZGVyIC5jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gIH1cbn1cbi5oZWFkZXIgLmNvbnRhaW5lciAubGFiZWwge1xuICBjb2xvcjogdmFyKC0tZ3JleTEpO1xuICBmb250LXNpemU6IDMzcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogNjAlO1xuICBmb250LWZhbWlseTogdmFyKC0tbWFpbkZvbnQpO1xuICBtYXJnaW46IGF1dG8gMCBhdXRvIDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgLmhlYWRlciAuY29udGFpbmVyIC5sYWJlbCB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICB9XG59XG4uaGVhZGVyIC5jb250YWluZXIgLmxhYmVsX19pY29uIHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLW1haW5Gb250KTtcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHZhcigtLWdyZXkxKTtcbiAgcGFkZGluZy1ib3R0b206IDNweDtcbn1cbi5oZWFkZXIgLmNvbnRhaW5lciAubGFuZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIHdpZHRoOiA0MCU7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLmhlYWRlciAuY29udGFpbmVyIC5sYW5nIC5saW5lIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tZ3JleTEpO1xuICBoZWlnaHQ6IDIycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAycHg7XG59XG4uaGVhZGVyIC5jb250YWluZXIgLmxhbmdfX2l0ZW0ge1xuICBjb2xvcjogdmFyKC0tZ3JleTEpO1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluRm9udCk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuLmhlYWRlciAuY29udGFpbmVyIC5sYW5nX19pdGVtOmhvdmVyIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogdmFyKC0tYmx1ZSk7XG59XG4uaGVhZGVyIC5jb250YWluZXIgLmxhbmcgLmFjdGl2ZS1sYW5nIHtcbiAgY29sb3I6IHJlZDtcbn0iXX0= */"] });


/***/ }),

/***/ "cSYd":
/*!******************************************************************!*\
  !*** ./src/app/shared/components/calendar/calendar.component.ts ***!
  \******************************************************************/
/*! exports provided: CalendarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarComponent", function() { return CalendarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");










const _c0 = ["calendarInput"];
const _c1 = function (a0) { return { "visible-error": a0 }; };
function CalendarComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@transformPanel", undefined)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c1, ctx_r0.visibleError));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
} }
const _c2 = function (a0, a1) { return { "error-input": a0, "disabled-input": a1 }; };
const _c3 = function (a0, a1, a2) { return { "icon-calendar": a0, "icon-calendar-active": a1, "disabled-input": a2 }; };
const _c4 = function (a0, a1) { return { "active-label": a0, "no-active-label": a1 }; };
const _c5 = function (a0) { return { "err-label": a0 }; };
class CalendarComponent {
    constructor(cdRef, translate, adapter) {
        this.cdRef = cdRef;
        this.translate = translate;
        this.adapter = adapter;
        this.coll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.iconActive = false;
    }
    ngOnInit() {
        this.getLocaleCalendar();
        if (!this.formControlCalendar) {
            this.formControlCalendar = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: this.dataUser, disabled: this.disableCalendar }, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            });
        }
        if (this.disableCalendar) {
            this.formControlCalendar.disable();
        }
        this.formControlCalendar.valueChanges.subscribe((value) => {
            if (value !== this.dataUser) {
                this.dataUser = value;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.formControlCalendar) {
            this.labelActive = this.formControlCalendar.value === '';
            this.cdRef.detectChanges();
        }
    }
    onKeydownHandler(e) {
        if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
        }
        const lengthString = e.target.value.length;
        if (lengthString !== 1 || lengthString !== 3) {
            if (e.keyCode === 47) {
                e.preventDefault();
            }
        }
        if (lengthString === 2) {
            e.target.value += '.';
        }
        if (lengthString === 5) {
            e.target.value += '.';
        }
    }
    getLocaleCalendar() {
        this.local = this.translate.currentLang;
        console.log(this.local);
        this.adapter.setLocale(this.local);
    }
    errorChecking() {
        if (this.formControlCalendar) {
            return this.formControlCalendar.invalid && (this.formControlCalendar.dirty);
        }
    }
    transferDate(e) {
        this.visibleError = false;
        if (e.target.value.length === 10) {
            const year = e.target.value.split('.').reverse().join('').slice(0, 4);
            const mount = e.target.value.split('.').reverse().join('').slice(4, 6);
            const day = e.target.value.split('.').reverse().join('').slice(6, 8);
            const dataForm = new Date();
            dataForm.setFullYear(year);
            dataForm.setMonth(mount - 1);
            dataForm.setDate(day);
            this.dataUser = dataForm;
            if (this.formControlCalendar) {
                setTimeout(() => {
                    this.formControlCalendar.setValue(dataForm);
                });
            }
        }
    }
    errorVisible() {
        this.visibleError = this.errorChecking();
    }
    transferParent(value) {
        if (value !== null) {
            this.dataUser = value;
            if (this.formControlCalendar) {
                this.formControlCalendar.setValue(this.dataUser);
            }
        }
        else {
            this.formControlCalendar.setValue('');
        }
        this.calendarInput.nativeElement.dispatchEvent(new Event('focus', { bubbles: true }));
    }
    focusCalendar(e, click) {
        this.calendarInput.nativeElement.dispatchEvent(new Event('blur', { bubbles: true }));
        this.iconActive = !this.disableCalendar;
        if (click) {
            this.clickCalendar(e);
        }
    }
    clickCalendar(e) {
        if (e) {
            this.coll.emit(true);
        }
        else {
            this.coll.emit(false);
        }
    }
}
CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_5__["DateAdapter"])); };
CalendarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CalendarComponent, selectors: [["app-calendar"]], viewQuery: function CalendarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_3__["MatCalendar"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.calendarInput = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.datePicker = _t.first);
    } }, hostBindings: function CalendarComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keypress", function CalendarComponent_keypress_HostBindingHandler($event) { return ctx.onKeydownHandler($event); });
    } }, inputs: { startDate: "startDate", endDate: "endDate", pattern: "pattern", formControlCalendar: "formControlCalendar", disableCalendar: "disableCalendar", labelCalendar: "labelCalendar", errorMessage: "errorMessage", nameInput: "nameInput" }, outputs: { coll: "coll" }, decls: 12, vars: 24, consts: [[1, "calendar-customize"], [1, "positions-calendar"], ["class", "error-block", 3, "ngClass", 4, "ngIf"], ["type", "text", "maxlength", "10", 1, "form-input", 3, "ngClass", "pattern", "formControl", "name", "matDatepicker", "min", "max", "mouseover", "mouseleave", "dateChange", "input", "focus"], ["calendarInput", ""], ["mat-raised-button", "", 1, "position-btn-calendar", 3, "click"], [1, "icon-calendar", 3, "ngClass", "click"], ["myDatePicker", ""], [1, "form-label", 3, "ngClass"], [3, "ngClass"], [1, "error-block", 3, "ngClass"], [1, "error-block__text"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CalendarComponent_div_2_Template, 3, 5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseover", function CalendarComponent_Template_input_mouseover_3_listener() { return ctx.errorVisible(); })("mouseleave", function CalendarComponent_Template_input_mouseleave_3_listener() { return ctx.visibleError = false; })("dateChange", function CalendarComponent_Template_input_dateChange_3_listener($event) { return ctx.transferParent($event.value); })("input", function CalendarComponent_Template_input_input_3_listener($event) { return ctx.transferDate($event); })("focus", function CalendarComponent_Template_input_focus_3_listener($event) { return ctx.focusCalendar($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalendarComponent_Template_div_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8); return _r2.open(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalendarComponent_Template_div_click_6_listener($event) { return ctx.focusCalendar($event, true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-datepicker", null, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.visibleError);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](12, _c2, ctx.errorChecking(), ctx.disableCalendar))("pattern", ctx.pattern)("formControl", ctx.formControlCalendar)("name", ctx.nameInput)("matDatepicker", _r2)("min", ctx.startDate)("max", ctx.endDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](15, _c3, ctx.iconActive, !ctx.iconActive, ctx.disableCalendar));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](19, _c4, !ctx.labelActive, ctx.labelActive));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](22, _c5, ctx.errorChecking()));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.labelCalendar);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_3__["MatDatepickerInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["MaxLengthValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["PatternValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_3__["MatDatepicker"]], styles: [":root {\n  --mainFont: CoreSansG;\n  --header-color: linear-gradient(90deg, #0D5297 0.26%, #0D5297 47.1%, #0D5297 99.8%);\n  --grey1: #CFE0F4;\n  --black: #000;\n  --white: #fff;\n  --grey: #ccc;\n  --grey2: #808080;\n  --grey3: #D3D3D3;\n  --grey5: #979797;\n  --grey6: #F5F5F5;\n  --blue: #6987F0;\n  --blue2: #3851C6;\n  --blue4: #0D5297;\n  --red: #f06979;\n  --black-rgba: rgba(0, 0, 0, 0.7);\n  --passport-toggle: #6987F0;\n  --input-focus: #0D5297;\n  --btn1-normal: linear-gradient(167.72deg, #0D5297 -33.07%, #0D5297 48.35%, #0D5297 139.94%);\n  --btn1-hover: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-focus: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-disabled: linear-gradient(167.72deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn1-color-text-focus: #6D98D9;\n  --btn1-color-text: #fff;\n  --btn4-hover: linear-gradient(122.5deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn4-border: #CCCCCC;\n  --background-selected-day: linear-gradient(314.41deg, #5A4BE6 -48.61%, #73AFF7 33.69%, #93D0D9 126.27%);\n  --color-text-header: rgba(0, 0, 0, 0.543337);\n}\n\n.calendar-customize .positions-calendar {\n  position: relative;\n}\n\n.calendar-customize .positions-calendar .error-block {\n  display: none;\n}\n\n.calendar-customize .positions-calendar .error-block__text {\n  left: 0;\n  right: 0;\n  top: -10px;\n  display: flex;\n  background: var(--white);\n  padding: 13px 16px;\n  z-index: 1000 !important;\n  position: absolute;\n  color: var(--red);\n  border: 1px solid var(--red);\n  transform: translateY(-100%);\n  box-shadow: 0 4px 4px rgba(240, 105, 121, 0.3);\n  border-radius: 2px;\n  min-height: 70px;\n  align-items: center;\n}\n\n.calendar-customize .positions-calendar .error-block__text:after {\n  content: \"\";\n  top: 100%;\n  right: 14px;\n  width: 30px;\n  height: 30px;\n  z-index: 1000 !important;\n  display: block;\n  background: var(--white);\n  position: absolute;\n  border-left: 1px solid var(--red);\n  border-bottom: 1px solid var(--red);\n  transform: translateY(-14.4px) rotateZ(-45deg);\n}\n\n.calendar-customize .positions-calendar .visible-error {\n  display: block;\n}\n\n.calendar-customize .positions-calendar .form-input {\n  height: 60px;\n  border: 1px solid var(--grey);\n  border-radius: 4px;\n  margin: 0 auto 2px auto;\n  display: flex;\n  width: 100%;\n  color: var(--black);\n  caret-color: var(--input-focus);\n  background-color: var(--white);\n  transition: all 0.3s ease-in-out;\n  font: 16px/19px var(--mainFont);\n  outline: 0;\n  padding: 28px 16px 8px 18px;\n}\n\n@media (max-width: 480px) {\n  .calendar-customize .positions-calendar .form-input {\n    font-size: 3.5vw;\n  }\n}\n\n.calendar-customize .positions-calendar .form-input:focus {\n  transition: all 0.3s ease-in;\n  border: 1px solid var(--input-focus);\n}\n\n.calendar-customize .positions-calendar .error-input {\n  transition: all 0.3s ease-in;\n  border: 1px solid var(--red) !important;\n}\n\n.calendar-customize .positions-calendar .disabled-input {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.calendar-customize .positions-calendar .position-btn-calendar {\n  position: absolute;\n  right: 3px;\n  top: 11px;\n  width: 40px;\n  height: 40px;\n  cursor: pointer;\n}\n\n.calendar-customize .positions-calendar .position-btn-calendar .icon-calendar {\n  animation: sheen 0.5s ease-out !important;\n  width: 40px;\n  height: 40px;\n  background-image: url('calendar.png');\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n\n.calendar-customize .positions-calendar .position-btn-calendar .icon-calendar-active {\n  animation: sheen 0.5s ease-out;\n  width: 40px;\n  height: 40px;\n  background-image: url('calendar1.png');\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n\n.calendar-customize .positions-calendar .form-input:focus ~ .form-label {\n  top: -3px;\n  left: 18px;\n  padding: 10px 0;\n  font-size: 1.5ch;\n  transition: all 0.3s ease-in;\n}\n\n.calendar-customize .positions-calendar .form-input:not(:focus):not(.ng-empty) ~ .form-label {\n  top: 11px;\n  font-size: 15px;\n  color: var(--grey);\n  left: 18px;\n  padding: 10px 0;\n  transition: 0.2s ease-out;\n}\n\n.calendar-customize .positions-calendar .form-input:not(:focus) ~ .form-label {\n  top: -3px;\n  font-size: 15px;\n  color: var(--grey);\n  left: 18px !important;\n  padding: 10px 0;\n  width: 77%;\n  text-align: left;\n}\n\n.calendar-customize .positions-calendar .form-input:focus.ng-invalid ~ .form-label {\n  top: -3px;\n  font-size: 1.5ch !important;\n  color: var(--grey);\n  left: 18px !important;\n  padding: 10px 0;\n  width: 77%;\n  text-align: left;\n}\n\n.calendar-customize .positions-calendar .form-label {\n  position: absolute;\n  top: 11px;\n  font: 15px var(--mainFont);\n  pointer-events: none;\n  z-index: 100;\n  color: var(--grey);\n  left: 18px;\n  padding: 10px 0;\n  transition: 0.2s;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 90%;\n}\n\n.calendar-customize .positions-calendar .form-label .err-label {\n  transition: all 0.2s ease-in;\n  color: var(--red) !important;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 70%;\n}\n\n@media (max-width: 360px) {\n  .calendar-customize .positions-calendar .form-label .err-label {\n    width: 75%;\n  }\n}\n\n@media (max-width: 345px) {\n  .calendar-customize .positions-calendar .form-label .err-label {\n    width: 73%;\n  }\n}\n\n.calendar-customize .positions-calendar .form-input:not(:focus).disabled-input.ng-untouched.ng-pristine ~ .no-active-label {\n  top: 11px !important;\n}\n\n.calendar-customize .positions-calendar .no-active-label {\n  top: 11px;\n}\n\n.calendar-customize .positions-calendar .active-label {\n  font-size: 1.5ch !important;\n  top: -3px !important;\n}\n\n@keyframes sheen {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlc1xcdmFyaWFibGVzLnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXGNhbGVuZGFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BO0VBRUUscUJBQUE7RUFFQSxtRkFBQTtFQUVBLGdCQUFBO0VBR0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFHQSxnQ0FBQTtFQUdBLDBCQUFBO0VBR0Esc0JBQUE7RUFJQSwyRkFBQTtFQUNBLDBGQUFBO0VBQ0EsMEZBQUE7RUFDQSw2RkFBQTtFQUNBLGdDQUFBO0VBQ0EsdUJBQUE7RUFJQSx5RkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUdBQUE7RUFDQSw0Q0FBQTtBQ3RCRjs7QUF6QkU7RUFDRSxrQkFBQTtBQTRCSjs7QUExQkk7RUFDRSxhQUFBO0FBNEJOOztBQTFCTTtFQUNFLE9BQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSw0QkFBQTtFQUNBLDhDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBNEJSOztBQTFCUTtFQUNFLFdBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlDQUFBO0VBQ0EsbUNBQUE7RUFDQSw4Q0FBQTtBQTRCVjs7QUF2Qkk7RUFDRSxjQUFBO0FBeUJOOztBQXRCSTtFQUNFLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7RUFDQSw4QkFBQTtFQUNBLGdDQUFBO0VBQ0EsK0JBQUE7RUFDQSxVQUFBO0VBQ0EsMkJBQUE7QUF3Qk47O0FBdkJNO0VBZEY7SUFlSSxnQkFBQTtFQTBCTjtBQUNGOztBQXhCTTtFQUNFLDRCQUFBO0VBQ0Esb0NBQUE7QUEwQlI7O0FBdEJJO0VBQ0UsNEJBQUE7RUFDQSx1Q0FBQTtBQXdCTjs7QUFyQkk7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7QUF1Qk47O0FBcEJJO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQXNCTjs7QUFwQk07RUFDRSx5Q0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EscUNBQUE7RUFDQSw0QkFBQTtFQUNBLDRCQUFBO0FBc0JSOztBQW5CTTtFQUNFLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsNEJBQUE7QUFxQlI7O0FBakJJO0VBQ0UsU0FBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtBQW1CTjs7QUFoQkk7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQWtCTjs7QUFmSTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUFpQk47O0FBZEk7RUFDRSxTQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQWdCTjs7QUFiSTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDBCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtBQWVOOztBQWJNO0VBQ0UsNEJBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7QUFlUjs7QUFkUTtFQVBGO0lBUUksVUFBQTtFQWlCUjtBQUNGOztBQWhCUTtFQVZGO0lBV0ksVUFBQTtFQW1CUjtBQUNGOztBQWJJO0VBQ0Usb0JBQUE7QUFlTjs7QUFaSTtFQUNFLFNBQUE7QUFjTjs7QUFYSTtFQUNFLDJCQUFBO0VBQ0Esb0JBQUE7QUFhTjs7QUFQQTtFQUNFO0lBQ0UsVUFBQTtFQVVGO0VBUkE7SUFDRSxZQUFBO0VBVUY7RUFSQTtJQUNFLFVBQUE7RUFVRjtBQUNGIiwiZmlsZSI6ImNhbGVuZGFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJHhzOiAwO1xyXG4kc206IDU3NnB4O1xyXG4kbWQ6IDc2N3B4O1xyXG4kbGc6IDk5MnB4O1xyXG4keGw6IDEyMDBweDtcclxuXHJcbjpyb290IHtcclxuICAvLyBmb250XHJcbiAgLS1tYWluRm9udDogQ29yZVNhbnNHO1xyXG4gIC8vIGNvbG9yXHJcbiAgLS1oZWFkZXItY29sb3I6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzBENTI5NyAwLjI2JSwgIzBENTI5NyA0Ny4xJSwgIzBENTI5NyA5OS44JSk7XHJcbiAgLy8kZ3JleTogI2NjYztcclxuICAtLWdyZXkxOiAjQ0ZFMEY0O1xyXG5cclxuICAvLyBiYWNrZ3JvdW5kXHJcbiAgLS1ibGFjazogIzAwMDtcclxuICAtLXdoaXRlOiAjZmZmO1xyXG4gIC0tZ3JleTogI2NjYztcclxuICAtLWdyZXkyOiAjODA4MDgwO1xyXG4gIC0tZ3JleTM6ICNEM0QzRDM7XHJcbiAgLS1ncmV5NTogIzk3OTc5NztcclxuICAtLWdyZXk2OiAjRjVGNUY1O1xyXG4gIC0tYmx1ZTogIzY5ODdGMDtcclxuICAtLWJsdWUyOiAjMzg1MUM2O1xyXG4gIC0tYmx1ZTQ6ICMwRDUyOTc7XHJcbiAgLS1yZWQ6ICNmMDY5Nzk7XHJcblxyXG4gIC8vIGJhY2tncm91bmRcclxuICAtLWJsYWNrLXJnYmE6IHJnYmEoMCwgMCwgMCwgMC43KTtcclxuXHJcbiAgLy8gYnRuLXBhc3Nwb3J0XHJcbiAgLS1wYXNzcG9ydC10b2dnbGU6ICM2OTg3RjA7XHJcblxyXG4gIC8vIGlucHV0XHJcbiAgLS1pbnB1dC1mb2N1czogIzBENTI5NztcclxuXHJcblxyXG4gIC8vIGJ1dHRvbiBjb2xvciBwcmltYXJ5XHJcbiAgLS1idG4xLW5vcm1hbDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzBENTI5NyAtMzMuMDclLCAjMEQ1Mjk3IDQ4LjM1JSwgIzBENTI5NyAxMzkuOTQlKTtcclxuICAtLWJ0bjEtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XHJcbiAgLS1idG4xLWZvY3VzOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xyXG4gIC0tYnRuMS1kaXNhYmxlZDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcclxuICAtLWJ0bjEtY29sb3ItdGV4dC1mb2N1czogIzZEOThEOTtcclxuICAtLWJ0bjEtY29sb3ItdGV4dDogI2ZmZjtcclxuXHJcblxyXG4gIC8vIGNhbGVuZGFyIGNvbG9yXHJcbiAgLS1idG40LWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMTIyLjVkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XHJcbiAgLS1idG40LWJvcmRlcjogI0NDQ0NDQztcclxuICAtLWJhY2tncm91bmQtc2VsZWN0ZWQtZGF5OiBsaW5lYXItZ3JhZGllbnQoMzE0LjQxZGVnLCAjNUE0QkU2IC00OC42MSUsICM3M0FGRjcgMzMuNjklLCAjOTNEMEQ5IDEyNi4yNyUpO1xyXG4gIC0tY29sb3ItdGV4dC1oZWFkZXI6IHJnYmEoMCwgMCwgMCwgMC41NDMzMzcpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCI6cm9vdCB7XG4gIC0tbWFpbkZvbnQ6IENvcmVTYW5zRztcbiAgLS1oZWFkZXItY29sb3I6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzBENTI5NyAwLjI2JSwgIzBENTI5NyA0Ny4xJSwgIzBENTI5NyA5OS44JSk7XG4gIC0tZ3JleTE6ICNDRkUwRjQ7XG4gIC0tYmxhY2s6ICMwMDA7XG4gIC0td2hpdGU6ICNmZmY7XG4gIC0tZ3JleTogI2NjYztcbiAgLS1ncmV5MjogIzgwODA4MDtcbiAgLS1ncmV5MzogI0QzRDNEMztcbiAgLS1ncmV5NTogIzk3OTc5NztcbiAgLS1ncmV5NjogI0Y1RjVGNTtcbiAgLS1ibHVlOiAjNjk4N0YwO1xuICAtLWJsdWUyOiAjMzg1MUM2O1xuICAtLWJsdWU0OiAjMEQ1Mjk3O1xuICAtLXJlZDogI2YwNjk3OTtcbiAgLS1ibGFjay1yZ2JhOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gIC0tcGFzc3BvcnQtdG9nZ2xlOiAjNjk4N0YwO1xuICAtLWlucHV0LWZvY3VzOiAjMEQ1Mjk3O1xuICAtLWJ0bjEtbm9ybWFsOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjMEQ1Mjk3IC0zMy4wNyUsICMwRDUyOTcgNDguMzUlLCAjMEQ1Mjk3IDEzOS45NCUpO1xuICAtLWJ0bjEtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XG4gIC0tYnRuMS1mb2N1czogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcbiAgLS1idG4xLWRpc2FibGVkOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xuICAtLWJ0bjEtY29sb3ItdGV4dC1mb2N1czogIzZEOThEOTtcbiAgLS1idG4xLWNvbG9yLXRleHQ6ICNmZmY7XG4gIC0tYnRuNC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDEyMi41ZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xuICAtLWJ0bjQtYm9yZGVyOiAjQ0NDQ0NDO1xuICAtLWJhY2tncm91bmQtc2VsZWN0ZWQtZGF5OiBsaW5lYXItZ3JhZGllbnQoMzE0LjQxZGVnLCAjNUE0QkU2IC00OC42MSUsICM3M0FGRjcgMzMuNjklLCAjOTNEMEQ5IDEyNi4yNyUpO1xuICAtLWNvbG9yLXRleHQtaGVhZGVyOiByZ2JhKDAsIDAsIDAsIDAuNTQzMzM3KTtcbn1cblxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5lcnJvci1ibG9jayB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmVycm9yLWJsb2NrX190ZXh0IHtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogLTEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXdoaXRlKTtcbiAgcGFkZGluZzogMTNweCAxNnB4O1xuICB6LWluZGV4OiAxMDAwICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29sb3I6IHZhcigtLXJlZCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXJlZCk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDRweCByZ2JhKDI0MCwgMTA1LCAxMjEsIDAuMyk7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgbWluLWhlaWdodDogNzBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAuZXJyb3ItYmxvY2tfX3RleHQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICB0b3A6IDEwMCU7XG4gIHJpZ2h0OiAxNHB4O1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICB6LWluZGV4OiAxMDAwICFpbXBvcnRhbnQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS13aGl0ZSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1yZWQpO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tcmVkKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNC40cHgpIHJvdGF0ZVooLTQ1ZGVnKTtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAudmlzaWJsZS1lcnJvciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5mb3JtLWlucHV0IHtcbiAgaGVpZ2h0OiA2MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ncmV5KTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBtYXJnaW46IDAgYXV0byAycHggYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiB2YXIoLS1ibGFjayk7XG4gIGNhcmV0LWNvbG9yOiB2YXIoLS1pbnB1dC1mb2N1cyk7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIGZvbnQ6IDE2cHgvMTlweCB2YXIoLS1tYWluRm9udCk7XG4gIG91dGxpbmU6IDA7XG4gIHBhZGRpbmc6IDI4cHggMTZweCA4cHggMThweDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAuY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmZvcm0taW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMy41dnc7XG4gIH1cbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAuZm9ybS1pbnB1dDpmb2N1cyB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW47XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlucHV0LWZvY3VzKTtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAuZXJyb3ItaW5wdXQge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1yZWQpICFpbXBvcnRhbnQ7XG59XG4uY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmRpc2FibGVkLWlucHV0IHtcbiAgb3BhY2l0eTogMC42O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5wb3NpdGlvbi1idG4tY2FsZW5kYXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAzcHg7XG4gIHRvcDogMTFweDtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5wb3NpdGlvbi1idG4tY2FsZW5kYXIgLmljb24tY2FsZW5kYXIge1xuICBhbmltYXRpb246IHNoZWVuIDAuNXMgZWFzZS1vdXQgIWltcG9ydGFudDtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9jYWxlbmRhci5wbmdcIik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCU7XG59XG4uY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLnBvc2l0aW9uLWJ0bi1jYWxlbmRhciAuaWNvbi1jYWxlbmRhci1hY3RpdmUge1xuICBhbmltYXRpb246IHNoZWVuIDAuNXMgZWFzZS1vdXQ7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvY2FsZW5kYXIxLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAuZm9ybS1pbnB1dDpmb2N1cyB+IC5mb3JtLWxhYmVsIHtcbiAgdG9wOiAtM3B4O1xuICBsZWZ0OiAxOHB4O1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIGZvbnQtc2l6ZTogMS41Y2g7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW47XG59XG4uY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmZvcm0taW5wdXQ6bm90KDpmb2N1cyk6bm90KC5uZy1lbXB0eSkgfiAuZm9ybS1sYWJlbCB7XG4gIHRvcDogMTFweDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBjb2xvcjogdmFyKC0tZ3JleSk7XG4gIGxlZnQ6IDE4cHg7XG4gIHBhZGRpbmc6IDEwcHggMDtcbiAgdHJhbnNpdGlvbjogMC4ycyBlYXNlLW91dDtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAuZm9ybS1pbnB1dDpub3QoOmZvY3VzKSB+IC5mb3JtLWxhYmVsIHtcbiAgdG9wOiAtM3B4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiB2YXIoLS1ncmV5KTtcbiAgbGVmdDogMThweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIHdpZHRoOiA3NyU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmZvcm0taW5wdXQ6Zm9jdXMubmctaW52YWxpZCB+IC5mb3JtLWxhYmVsIHtcbiAgdG9wOiAtM3B4O1xuICBmb250LXNpemU6IDEuNWNoICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiB2YXIoLS1ncmV5KTtcbiAgbGVmdDogMThweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIHdpZHRoOiA3NyU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmZvcm0tbGFiZWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTFweDtcbiAgZm9udDogMTVweCB2YXIoLS1tYWluRm9udCk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB6LWluZGV4OiAxMDA7XG4gIGNvbG9yOiB2YXIoLS1ncmV5KTtcbiAgbGVmdDogMThweDtcbiAgcGFkZGluZzogMTBweCAwO1xuICB0cmFuc2l0aW9uOiAwLjJzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDkwJTtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAuZm9ybS1sYWJlbCAuZXJyLWxhYmVsIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbjtcbiAgY29sb3I6IHZhcigtLXJlZCkgIWltcG9ydGFudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdpZHRoOiA3MCU7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5mb3JtLWxhYmVsIC5lcnItbGFiZWwge1xuICAgIHdpZHRoOiA3NSU7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAzNDVweCkge1xuICAuY2FsZW5kYXItY3VzdG9taXplIC5wb3NpdGlvbnMtY2FsZW5kYXIgLmZvcm0tbGFiZWwgLmVyci1sYWJlbCB7XG4gICAgd2lkdGg6IDczJTtcbiAgfVxufVxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5mb3JtLWlucHV0Om5vdCg6Zm9jdXMpLmRpc2FibGVkLWlucHV0Lm5nLXVudG91Y2hlZC5uZy1wcmlzdGluZSB+IC5uby1hY3RpdmUtbGFiZWwge1xuICB0b3A6IDExcHggIWltcG9ydGFudDtcbn1cbi5jYWxlbmRhci1jdXN0b21pemUgLnBvc2l0aW9ucy1jYWxlbmRhciAubm8tYWN0aXZlLWxhYmVsIHtcbiAgdG9wOiAxMXB4O1xufVxuLmNhbGVuZGFyLWN1c3RvbWl6ZSAucG9zaXRpb25zLWNhbGVuZGFyIC5hY3RpdmUtbGFiZWwge1xuICBmb250LXNpemU6IDEuNWNoICFpbXBvcnRhbnQ7XG4gIHRvcDogLTNweCAhaW1wb3J0YW50O1xufVxuXG5Aa2V5ZnJhbWVzIHNoZWVuIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufSJdfQ== */"], encapsulation: 2, data: { animation: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('transformPanel', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                    transform: 'scaleY(0)',
                    minWidth: '100%',
                    opacity: 0,
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('showing', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                    opacity: 1,
                    minWidth: 'calc(100% + 32px)',
                    transform: 'scaleY(1)',
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('showing-multiple', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                    opacity: 1,
                    minWidth: 'calc(100% + 64px)',
                    transform: 'scaleY(1)',
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('120ms cubic-bezier(0.1, 0, 0.2, 0.1)')),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('1ms 2ms linear', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ opacity: 0 })))
            ])] } });


/***/ }),

/***/ "gXcr":
/*!**************************************************************************************!*\
  !*** ./src/app/shared/components/user-passport-data/user-passport-data.component.ts ***!
  \**************************************************************************************/
/*! exports provided: UserPassportDataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPassportDataComponent", function() { return UserPassportDataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/constants */ "+nbM");
/* harmony import */ var _form_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../form/form.component */ "0h//");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _validators_max_min_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../validators/max-min-date */ "8ZgK");
/* harmony import */ var _validators_validator_cyrillic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../validators/validator-cyrillic */ "IXn5");
/* harmony import */ var _animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../animations/fading-away.animate */ "xi4J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../input/input.component */ "QlUG");
/* harmony import */ var _calendar_calendar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../calendar/calendar.component */ "cSYd");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");














const _c0 = ["passportSeries"];
const _c1 = ["passportNumber"];
const _c2 = ["identityNumber"];
const _c3 = ["identityIssuer"];
const _c4 = ["cal"];
function UserPassportDataComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, "Registration.PassportData.Passport"));
} }
function UserPassportDataComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, "Registration.PassportData.PassportID"));
} }
function UserPassportDataComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, "Registration.PassportData.DataIDPassport"));
} }
function UserPassportDataComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, "Registration.PassportData.DataPassport"));
} }
function UserPassportDataComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "app-input", 8, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function UserPassportDataComponent_div_8_Template_app_input_input_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.nextInput("passport_number"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-input", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 12, "Registration.PassportData.PassportSeries"))("minLengthInput", 1)("maskInput", ctx_r4.maskSeriesPassport)("disabledInput", ctx_r4.currentCredit)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 14, ctx_r4.errorMessages.passport_series))("formControlInput", ctx_r4.form.controls.passport_series);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 16, "Registration.PassportData.PassportNumber"))("disabledInput", ctx_r4.currentCredit)("maskInput", ctx_r4.maskNumberPassport)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 18, ctx_r4.errorMessages.passport_number))("formControlInput", ctx_r4.form.controls.passport_number);
} }
function UserPassportDataComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-calendar", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 11, "Registration.PassportData.IdentityIssuer"))("disabledInput", ctx_r5.currentCredit)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 13, ctx_r5.errorMessages.identity_issuer))("formControlInput", ctx_r5.form.controls.identity_issuer);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("labelCalendar", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 15, "Registration.PassportData.IdentityIssuedDate"))("disableCalendar", ctx_r5.currentCredit)("startDate", ctx_r5.passportStartDate)("endDate", ctx_r5.passportEndDate)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 17, ctx_r5.errorMessages.identity_issued_date))("formControlCalendar", ctx_r5.form.controls.identity_issued_date);
} }
function UserPassportDataComponent_div_10_app_input_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-input", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function UserPassportDataComponent_div_10_app_input_1_Template_app_input_input_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.nextInput("passport_number"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined)("label", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 6, "Registration.PassportData.IdentityNumber"))("disabledInput", ctx_r12.currentCredit)("maskInput", ctx_r12.maskNumberPassportIDCard)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 8, ctx_r12.errorMessages.identity_number))("formControlInput", ctx_r12.form.controls.identity_number);
} }
function UserPassportDataComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserPassportDataComponent_div_10_app_input_1_Template, 4, 10, "app-input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.idCard);
} }
function UserPassportDataComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-input", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-calendar", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@showAnimate", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 12, "Registration.PassportData.IdentityIssuerIdCard"))("disabledInput", ctx_r7.currentCredit)("maskInput", ctx_r7.maskIdentityIssuerIDCard)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 14, ctx_r7.errorMessages.identity_issuer_id_card))("formControlInput", ctx_r7.form.controls.identity_issuer_id_card);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("labelCalendar", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 16, "Registration.PassportData.IdentityIssuedIdDate"))("startDate", ctx_r7.passportStartDate)("endDate", ctx_r7.passportEndDate)("disableCalendar", ctx_r7.currentCredit)("errorMessage", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 18, ctx_r7.errorMessages.identity_issued_id_date))("formControlCalendar", ctx_r7.form.controls.identity_issued_id_date);
} }
class UserPassportDataComponent extends _form_form_component__WEBPACK_IMPORTED_MODULE_3__["FormComponent"] {
    constructor(cdRef) {
        super();
        this.cdRef = cdRef;
        this.maskSeriesPassport = _constants_constants__WEBPACK_IMPORTED_MODULE_2__["MASK_SERIES_PASSPORT"];
        this.maskNumberPassport = _constants_constants__WEBPACK_IMPORTED_MODULE_2__["MASK_NUMBER_PASSPORT"];
        this.maskNumberPassportIDCard = _constants_constants__WEBPACK_IMPORTED_MODULE_2__["MASK_NUMBER_PASSPORT_ID_CARD"];
        this.maskIdentityIssuerIDCard = _constants_constants__WEBPACK_IMPORTED_MODULE_2__["MASK_IDENTITY_ISSUER_ID_CARD"];
        this.idCard = false;
        this.passportStartDate = new Date();
        this.passportEndDate = new Date(new Date().setDate(new Date().getDate() - 1));
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.typePassport = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.fields = [
            {
                name: 'passport_series',
                validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(2)],
                errors: {
                    required: 'Registration.ErrorMassage.PassportError',
                    minlength: 'Registration.ErrorMassage.PassportError'
                },
            }, {
                name: 'passport_number', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)],
                errors: {
                    required: 'Registration.ErrorMassage.NumberPassportError',
                    minlength: 'Registration.ErrorMassage.NumberPassportError',
                },
            }, {
                name: 'identity_number', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(9)],
                errors: {
                    required: 'Registration.ErrorMassage.PassportIDError',
                    minlength: 'Registration.ErrorMassage.PassportIDError',
                },
            }, {
                name: 'identity_issuer',
                validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _validators_validator_cyrillic__WEBPACK_IMPORTED_MODULE_6__["CyrillicValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(100)],
                errors: {
                    required: 'Registration.ErrorMassage.IdentityIssuerError',
                    cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
                    maxlength: 'Registration.ErrorMassage.IdentityIssuerError',
                },
            }, {
                name: 'identity_issuer_id_card', validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(4)],
                errors: {
                    required: 'Registration.ErrorMassage.IdentityIssuerIdCardError',
                    minlength: 'Registration.ErrorMassage.IdentityIssuerIdCardError',
                },
            }, {
                name: 'identity_issued_date',
                validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, Object(_validators_max_min_date__WEBPACK_IMPORTED_MODULE_5__["minMaxDateValidator"])(this.passportStartDate, this.passportEndDate)],
                errors: {
                    required: 'Registration.ErrorMassage.IdentityIssuedDateError',
                    dateValidation: 'Registration.ErrorMassage.IdentityIssuedDateError',
                },
            }, {
                name: 'identity_issued_id_date',
                validation: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, Object(_validators_max_min_date__WEBPACK_IMPORTED_MODULE_5__["minMaxDateValidator"])(this.passportStartDate, this.passportEndDate)],
                errors: {
                    required: 'Registration.ErrorMassage.IdentityIssuedIdDateError',
                    dateValidation: 'Registration.ErrorMassage.IdentityIssuedIdDateError',
                },
            }
        ];
    }
    ngOnInit() {
        super.ngOnInit();
        this.onIdentityTypeChange();
    }
    ngAfterViewChecked() {
        this.onIdentityTypeChange();
        this.cdRef.detectChanges();
    }
    statusForm() {
        this.checkFormsUser();
        return this.form.valid;
    }
    checkFormsUser() {
        if (!this.idCard) {
            this.form.controls.identity_number.disable();
            this.form.controls.identity_issuer_id_card.disable();
            this.form.controls.identity_issued_id_date.disable();
        }
        else {
            this.form.controls.passport_number.disable();
            this.form.controls.passport_series.disable();
            this.form.controls.identity_issuer.disable();
            this.form.controls.identity_issued_date.disable();
        }
    }
    nextInput(id) {
        if (id === 'passport-series') {
            if (!this.idCard) {
                this.passportSeries.focus();
            }
            else {
                this.identityNumber.focus();
            }
        }
        if (id === 'passport_number') {
            if (!this.idCard) {
                if (this.form.controls.passport_series.valid) {
                    this.passportNumber.focus();
                }
            }
            else {
                if (this.form.controls.identity_number.valid) {
                    this.identityIssuer.focus();
                }
            }
        }
    }
    onIdentityTypeChange() {
        if (!this.idCard) {
            this.passportStartDate.setFullYear(1991, 7, 25);
            this.form.controls.identity_issued_date.setValidators(Object(_validators_max_min_date__WEBPACK_IMPORTED_MODULE_5__["minMaxDateValidator"])(this.passportStartDate, this.passportEndDate));
        }
        else {
            this.passportStartDate.setFullYear(2016, 1, 10);
            this.form.controls.identity_issued_id_date.setValidators(Object(_validators_max_min_date__WEBPACK_IMPORTED_MODULE_5__["minMaxDateValidator"])(this.passportStartDate, this.passportEndDate));
        }
    }
    toggleIdentityType() {
        if (!this.currentCredit) {
            this.idCard = !this.idCard;
            if (this.idCard) {
                this.typePassport.emit('identity');
            }
            else {
                this.typePassport.emit('passport');
            }
            this.form.enable();
            this.form.updateValueAndValidity();
            this.form.markAsPristine();
            this.form.markAsUntouched();
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
UserPassportDataComponent.ɵfac = function UserPassportDataComponent_Factory(t) { return new (t || UserPassportDataComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
UserPassportDataComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserPassportDataComponent, selectors: [["app-user-passport-data"]], viewQuery: function UserPassportDataComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c4, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.passportSeries = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.passportNumber = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.identityNumber = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.identityIssuer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.calendar = _t.first);
    } }, inputs: { currentCreditStatus: "currentCreditStatus" }, outputs: { typePassport: "typePassport" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 9, consts: [[1, "info-user"], [1, "info-user__title"], [4, "ngIf"], [1, "info-user__toggle", 3, "click"], [1, "form-block", 3, "formGroup"], ["class", "input-section1", 4, "ngIf"], ["class", "input-section2", 4, "ngIf"], [1, "input-section1"], ["typeInput", "text", "nameInput", "passport_series", "id", "passport-1", 1, "passport-series", 3, "label", "minLengthInput", "maskInput", "disabledInput", "errorMessage", "formControlInput", "input"], ["passportSeries", ""], ["typeInput", "tel", "nameInput", "passport_number", "id", "passport-2", 3, "label", "disabledInput", "maskInput", "errorMessage", "formControlInput"], ["passportNumber", ""], [1, "input-section2"], ["typeInput", "text", "maxLengthInput", "100", "nameInput", "identity_issuer", "id", "passport-3", 3, "label", "disabledInput", "errorMessage", "formControlInput"], ["nameInput", "identity_issued_date", 3, "labelCalendar", "disableCalendar", "startDate", "endDate", "errorMessage", "formControlCalendar"], ["typeInput", "tel", "class", "input-id-card", "nameInput", "identity_number", 3, "label", "disabledInput", "maskInput", "errorMessage", "formControlInput", "input", 4, "ngIf"], ["typeInput", "tel", "nameInput", "identity_number", 1, "input-id-card", 3, "label", "disabledInput", "maskInput", "errorMessage", "formControlInput", "input"], ["identityNumber", ""], ["typeInput", "tel", "nameInput", "identity_issuer", 3, "label", "disabledInput", "maskInput", "errorMessage", "formControlInput"], ["identityIssuer", ""], ["nameInput", "identity_issued_date", 3, "labelCalendar", "startDate", "endDate", "disableCalendar", "errorMessage", "formControlCalendar"], ["cal", ""]], template: function UserPassportDataComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UserPassportDataComponent_span_2_Template, 3, 4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UserPassportDataComponent_span_3_Template, 3, 4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserPassportDataComponent_Template_p_click_4_listener() { return ctx.toggleIdentityType(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, UserPassportDataComponent_span_5_Template, 3, 4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, UserPassportDataComponent_span_6_Template, 3, 4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, UserPassportDataComponent_div_8_Template, 9, 20, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, UserPassportDataComponent_div_9_Template, 7, 19, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, UserPassportDataComponent_div_10_Template, 2, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, UserPassportDataComponent_div_11_Template, 9, 20, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.idCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.idCard);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroupDirective"], _input_input_component__WEBPACK_IMPORTED_MODULE_9__["InputComponent"], _calendar_calendar_component__WEBPACK_IMPORTED_MODULE_10__["CalendarComponent"]], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslatePipe"]], styles: ["[_ngcontent-%COMP%]:root {\n  --mainFont: CoreSansG;\n  --header-color: linear-gradient(90deg, #0D5297 0.26%, #0D5297 47.1%, #0D5297 99.8%);\n  --grey1: #CFE0F4;\n  --black: #000;\n  --white: #fff;\n  --grey: #ccc;\n  --grey2: #808080;\n  --grey3: #D3D3D3;\n  --grey5: #979797;\n  --grey6: #F5F5F5;\n  --blue: #6987F0;\n  --blue2: #3851C6;\n  --blue4: #0D5297;\n  --red: #f06979;\n  --black-rgba: rgba(0, 0, 0, 0.7);\n  --passport-toggle: #6987F0;\n  --input-focus: #0D5297;\n  --btn1-normal: linear-gradient(167.72deg, #0D5297 -33.07%, #0D5297 48.35%, #0D5297 139.94%);\n  --btn1-hover: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-focus: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-disabled: linear-gradient(167.72deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn1-color-text-focus: #6D98D9;\n  --btn1-color-text: #fff;\n  --btn4-hover: linear-gradient(122.5deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn4-border: #CCCCCC;\n  --background-selected-day: linear-gradient(314.41deg, #5A4BE6 -48.61%, #73AFF7 33.69%, #93D0D9 126.27%);\n  --color-text-header: rgba(0, 0, 0, 0.543337);\n}\n\n.info-user[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 20px 0 10px 0;\n}\n\n@media (max-width: 450px) {\n  .info-user[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n\n.info-user__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--mainFont);\n  font-style: normal;\n  font-weight: 500;\n  font-size: 20px;\n  line-height: 23px;\n  color: var(--black);\n}\n\n@media (max-width: 450px) {\n  .info-user__title[_ngcontent-%COMP%] {\n    margin: 7px 0;\n  }\n}\n\n.info-user__toggle[_ngcontent-%COMP%] {\n  font-family: var(--mainFont);\n  font-style: normal;\n  font-weight: normal;\n  font-size: 16px;\n  color: var(--blue2);\n  line-height: 19px;\n  cursor: pointer;\n  margin: 0;\n}\n\n@media (max-width: 450px) {\n  .info-user__toggle[_ngcontent-%COMP%] {\n    margin: 7px 0;\n  }\n}\n\n.form-block[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  margin: 20px auto;\n  justify-content: space-between;\n}\n\n@media (max-width: 767px) {\n  .form-block[_ngcontent-%COMP%] {\n    flex-direction: column;\n    margin: 15px auto;\n  }\n}\n\n.form-block[_ngcontent-%COMP%]   .input-section1[_ngcontent-%COMP%] {\n  display: flex;\n  width: 49%;\n  justify-content: space-between;\n}\n\n@media (max-width: 767px) {\n  .form-block[_ngcontent-%COMP%]   .input-section1[_ngcontent-%COMP%] {\n    margin: 10px auto;\n    width: 100%;\n  }\n}\n\n@media (max-width: 350px) {\n  .form-block[_ngcontent-%COMP%]   .input-section1[_ngcontent-%COMP%] {\n    margin: 0 auto;\n    flex-direction: column;\n  }\n  .form-block[_ngcontent-%COMP%]   .input-section1[_ngcontent-%COMP%]   app-input[_ngcontent-%COMP%] {\n    width: 100% !important;\n    margin: 8px 0;\n  }\n}\n\n.form-block[_ngcontent-%COMP%]   .input-section1[_ngcontent-%COMP%]   app-input[_ngcontent-%COMP%] {\n  width: 49%;\n}\n\n.form-block[_ngcontent-%COMP%]   .input-section1[_ngcontent-%COMP%]   .input-id-card[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: auto;\n}\n\n.form-block[_ngcontent-%COMP%]   .input-section2[_ngcontent-%COMP%] {\n  display: flex;\n  width: 49%;\n  justify-content: space-between;\n}\n\n@media (max-width: 767px) {\n  .form-block[_ngcontent-%COMP%]   .input-section2[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n}\n\n.form-block[_ngcontent-%COMP%]   .input-section2[_ngcontent-%COMP%]   app-input[_ngcontent-%COMP%], .form-block[_ngcontent-%COMP%]   .input-section2[_ngcontent-%COMP%]   app-calendar[_ngcontent-%COMP%] {\n  width: 49%;\n}\n\n@media (max-width: 767px) {\n  .form-block[_ngcontent-%COMP%]   .input-section2[_ngcontent-%COMP%]   app-input[_ngcontent-%COMP%], .form-block[_ngcontent-%COMP%]   .input-section2[_ngcontent-%COMP%]   app-calendar[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 10px auto;\n  }\n}\n\n[_nghost-%COMP%]  .passport-series .form-input {\n  text-transform: uppercase;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlc1xcdmFyaWFibGVzLnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXHVzZXItcGFzc3BvcnQtZGF0YS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtFQUVFLHFCQUFBO0VBRUEsbUZBQUE7RUFFQSxnQkFBQTtFQUdBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBR0EsZ0NBQUE7RUFHQSwwQkFBQTtFQUdBLHNCQUFBO0VBSUEsMkZBQUE7RUFDQSwwRkFBQTtFQUNBLDBGQUFBO0VBQ0EsNkZBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0VBSUEseUZBQUE7RUFDQSxzQkFBQTtFQUNBLHVHQUFBO0VBQ0EsNENBQUE7QUN0QkY7O0FBMUJBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtBQTZCRjs7QUE1QkU7RUFMRjtJQU1JLGFBQUE7SUFDQSxzQkFBQTtJQUNBLHVCQUFBO0VBK0JGO0FBQ0Y7O0FBN0JFO0VBQ0UsU0FBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBK0JKOztBQTlCSTtFQVJGO0lBU0ksYUFBQTtFQWlDSjtBQUNGOztBQTlCRTtFQUNFLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUFnQ0o7O0FBL0JJO0VBVEY7SUFVSSxhQUFBO0VBa0NKO0FBQ0Y7O0FBOUJBO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO0FBaUNGOztBQWhDRTtFQUxGO0lBTUksc0JBQUE7SUFDQSxpQkFBQTtFQW1DRjtBQUNGOztBQWpDRTtFQUNFLGFBQUE7RUFDQSxVQUFBO0VBQ0EsOEJBQUE7QUFtQ0o7O0FBbENJO0VBSkY7SUFLSSxpQkFBQTtJQUNBLFdBQUE7RUFxQ0o7QUFDRjs7QUFwQ0k7RUFSRjtJQVNJLGNBQUE7SUFDQSxzQkFBQTtFQXVDSjtFQXRDSTtJQUNFLHNCQUFBO0lBQ0EsYUFBQTtFQXdDTjtBQUNGOztBQXJDSTtFQUNFLFVBQUE7QUF1Q047O0FBcENJO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFzQ047O0FBbENFO0VBQ0UsYUFBQTtFQUNBLFVBQUE7RUFDQSw4QkFBQTtBQW9DSjs7QUFuQ0k7RUFKRjtJQUtJLHNCQUFBO0lBQ0EsV0FBQTtFQXNDSjtBQUNGOztBQXBDSTtFQUNFLFVBQUE7QUFzQ047O0FBckNNO0VBRkY7SUFHSSxXQUFBO0lBQ0EsaUJBQUE7RUF3Q047QUFDRjs7QUFsQ0U7RUFDRSx5QkFBQTtBQXFDSiIsImZpbGUiOiJ1c2VyLXBhc3Nwb3J0LWRhdGEuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkeHM6IDA7XHJcbiRzbTogNTc2cHg7XHJcbiRtZDogNzY3cHg7XHJcbiRsZzogOTkycHg7XHJcbiR4bDogMTIwMHB4O1xyXG5cclxuOnJvb3Qge1xyXG4gIC8vIGZvbnRcclxuICAtLW1haW5Gb250OiBDb3JlU2Fuc0c7XHJcbiAgLy8gY29sb3JcclxuICAtLWhlYWRlci1jb2xvcjogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMEQ1Mjk3IDAuMjYlLCAjMEQ1Mjk3IDQ3LjElLCAjMEQ1Mjk3IDk5LjglKTtcclxuICAvLyRncmV5OiAjY2NjO1xyXG4gIC0tZ3JleTE6ICNDRkUwRjQ7XHJcblxyXG4gIC8vIGJhY2tncm91bmRcclxuICAtLWJsYWNrOiAjMDAwO1xyXG4gIC0td2hpdGU6ICNmZmY7XHJcbiAgLS1ncmV5OiAjY2NjO1xyXG4gIC0tZ3JleTI6ICM4MDgwODA7XHJcbiAgLS1ncmV5MzogI0QzRDNEMztcclxuICAtLWdyZXk1OiAjOTc5Nzk3O1xyXG4gIC0tZ3JleTY6ICNGNUY1RjU7XHJcbiAgLS1ibHVlOiAjNjk4N0YwO1xyXG4gIC0tYmx1ZTI6ICMzODUxQzY7XHJcbiAgLS1ibHVlNDogIzBENTI5NztcclxuICAtLXJlZDogI2YwNjk3OTtcclxuXHJcbiAgLy8gYmFja2dyb3VuZFxyXG4gIC0tYmxhY2stcmdiYTogcmdiYSgwLCAwLCAwLCAwLjcpO1xyXG5cclxuICAvLyBidG4tcGFzc3BvcnRcclxuICAtLXBhc3Nwb3J0LXRvZ2dsZTogIzY5ODdGMDtcclxuXHJcbiAgLy8gaW5wdXRcclxuICAtLWlucHV0LWZvY3VzOiAjMEQ1Mjk3O1xyXG5cclxuXHJcbiAgLy8gYnV0dG9uIGNvbG9yIHByaW1hcnlcclxuICAtLWJ0bjEtbm9ybWFsOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjMEQ1Mjk3IC0zMy4wNyUsICMwRDUyOTcgNDguMzUlLCAjMEQ1Mjk3IDEzOS45NCUpO1xyXG4gIC0tYnRuMS1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcclxuICAtLWJ0bjEtZm9jdXM6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XHJcbiAgLS1idG4xLWRpc2FibGVkOiBsaW5lYXItZ3JhZGllbnQoMTY3LjcyZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xyXG4gIC0tYnRuMS1jb2xvci10ZXh0LWZvY3VzOiAjNkQ5OEQ5O1xyXG4gIC0tYnRuMS1jb2xvci10ZXh0OiAjZmZmO1xyXG5cclxuXHJcbiAgLy8gY2FsZW5kYXIgY29sb3JcclxuICAtLWJ0bjQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgxMjIuNWRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcclxuICAtLWJ0bjQtYm9yZGVyOiAjQ0NDQ0NDO1xyXG4gIC0tYmFja2dyb3VuZC1zZWxlY3RlZC1kYXk6IGxpbmVhci1ncmFkaWVudCgzMTQuNDFkZWcsICM1QTRCRTYgLTQ4LjYxJSwgIzczQUZGNyAzMy42OSUsICM5M0QwRDkgMTI2LjI3JSk7XHJcbiAgLS1jb2xvci10ZXh0LWhlYWRlcjogcmdiYSgwLCAwLCAwLCAwLjU0MzMzNyk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiIsIjpyb290IHtcbiAgLS1tYWluRm9udDogQ29yZVNhbnNHO1xuICAtLWhlYWRlci1jb2xvcjogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMEQ1Mjk3IDAuMjYlLCAjMEQ1Mjk3IDQ3LjElLCAjMEQ1Mjk3IDk5LjglKTtcbiAgLS1ncmV5MTogI0NGRTBGNDtcbiAgLS1ibGFjazogIzAwMDtcbiAgLS13aGl0ZTogI2ZmZjtcbiAgLS1ncmV5OiAjY2NjO1xuICAtLWdyZXkyOiAjODA4MDgwO1xuICAtLWdyZXkzOiAjRDNEM0QzO1xuICAtLWdyZXk1OiAjOTc5Nzk3O1xuICAtLWdyZXk2OiAjRjVGNUY1O1xuICAtLWJsdWU6ICM2OTg3RjA7XG4gIC0tYmx1ZTI6ICMzODUxQzY7XG4gIC0tYmx1ZTQ6ICMwRDUyOTc7XG4gIC0tcmVkOiAjZjA2OTc5O1xuICAtLWJsYWNrLXJnYmE6IHJnYmEoMCwgMCwgMCwgMC43KTtcbiAgLS1wYXNzcG9ydC10b2dnbGU6ICM2OTg3RjA7XG4gIC0taW5wdXQtZm9jdXM6ICMwRDUyOTc7XG4gIC0tYnRuMS1ub3JtYWw6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICMwRDUyOTcgLTMzLjA3JSwgIzBENTI5NyA0OC4zNSUsICMwRDUyOTcgMTM5Ljk0JSk7XG4gIC0tYnRuMS1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcbiAgLS1idG4xLWZvY3VzOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xuICAtLWJ0bjEtZGlzYWJsZWQ6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XG4gIC0tYnRuMS1jb2xvci10ZXh0LWZvY3VzOiAjNkQ5OEQ5O1xuICAtLWJ0bjEtY29sb3ItdGV4dDogI2ZmZjtcbiAgLS1idG40LWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMTIyLjVkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XG4gIC0tYnRuNC1ib3JkZXI6ICNDQ0NDQ0M7XG4gIC0tYmFja2dyb3VuZC1zZWxlY3RlZC1kYXk6IGxpbmVhci1ncmFkaWVudCgzMTQuNDFkZWcsICM1QTRCRTYgLTQ4LjYxJSwgIzczQUZGNyAzMy42OSUsICM5M0QwRDkgMTI2LjI3JSk7XG4gIC0tY29sb3ItdGV4dC1oZWFkZXI6IHJnYmEoMCwgMCwgMCwgMC41NDMzMzcpO1xufVxuXG4uaW5mby11c2VyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW46IDIwcHggMCAxMHB4IDA7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNDUwcHgpIHtcbiAgLmluZm8tdXNlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG59XG4uaW5mby11c2VyX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6IHZhcigtLW1haW5Gb250KTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGxpbmUtaGVpZ2h0OiAyM3B4O1xuICBjb2xvcjogdmFyKC0tYmxhY2spO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XG4gIC5pbmZvLXVzZXJfX3RpdGxlIHtcbiAgICBtYXJnaW46IDdweCAwO1xuICB9XG59XG4uaW5mby11c2VyX190b2dnbGUge1xuICBmb250LWZhbWlseTogdmFyKC0tbWFpbkZvbnQpO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6IHZhcigtLWJsdWUyKTtcbiAgbGluZS1oZWlnaHQ6IDE5cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luOiAwO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XG4gIC5pbmZvLXVzZXJfX3RvZ2dsZSB7XG4gICAgbWFyZ2luOiA3cHggMDtcbiAgfVxufVxuXG4uZm9ybS1ibG9jayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDIwcHggYXV0bztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5mb3JtLWJsb2NrIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG1hcmdpbjogMTVweCBhdXRvO1xuICB9XG59XG4uZm9ybS1ibG9jayAuaW5wdXQtc2VjdGlvbjEge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogNDklO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmZvcm0tYmxvY2sgLmlucHV0LXNlY3Rpb24xIHtcbiAgICBtYXJnaW46IDEwcHggYXV0bztcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KSB7XG4gIC5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMSB7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAuZm9ybS1ibG9jayAuaW5wdXQtc2VjdGlvbjEgYXBwLWlucHV0IHtcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogOHB4IDA7XG4gIH1cbn1cbi5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMSBhcHAtaW5wdXQge1xuICB3aWR0aDogNDklO1xufVxuLmZvcm0tYmxvY2sgLmlucHV0LXNlY3Rpb24xIC5pbnB1dC1pZC1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiA0OSU7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuZm9ybS1ibG9jayAuaW5wdXQtc2VjdGlvbjIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbi5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMiBhcHAtaW5wdXQsIC5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMiBhcHAtY2FsZW5kYXIge1xuICB3aWR0aDogNDklO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMiBhcHAtaW5wdXQsIC5mb3JtLWJsb2NrIC5pbnB1dC1zZWN0aW9uMiBhcHAtY2FsZW5kYXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMTBweCBhdXRvO1xuICB9XG59XG5cbjpob3N0OjpuZy1kZWVwIC5wYXNzcG9ydC1zZXJpZXMgLmZvcm0taW5wdXQge1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufSJdfQ== */"], data: { animation: [_animations_fading_away_animate__WEBPACK_IMPORTED_MODULE_7__["showAnimate"]] } });


/***/ }),

/***/ "h2Zm":
/*!************************************************************************!*\
  !*** ./src/app/shared/components/email-block/email-block.component.ts ***!
  \************************************************************************/
/*! exports provided: EmailBlockComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailBlockComponent", function() { return EmailBlockComponent; });
/* harmony import */ var _form_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../form/form.component */ "0h//");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _validators_validator_email__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../validators/validator-email */ "hZKY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _input_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../input/input.component */ "QlUG");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








class EmailBlockComponent extends _form_form_component__WEBPACK_IMPORTED_MODULE_0__["FormComponent"] {
    constructor() {
        super();
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.fields = [
            {
                name: 'email',
                validation: [_validators_validator_email__WEBPACK_IMPORTED_MODULE_3__["ValidatorEmail"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(100),
                ],
                errors: {
                    emailValidator: 'Укажите корректный Email',
                    maxLength: 'Разрешено вводить не больше 100 символов',
                },
            }
        ];
    }
    ngOnInit() {
        super.ngOnInit();
    }
    saveEmail() {
        this.submit();
        if (this.form.valid) {
            return this.form.controls.email.value;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
EmailBlockComponent.ɵfac = function EmailBlockComponent_Factory(t) { return new (t || EmailBlockComponent)(); };
EmailBlockComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: EmailBlockComponent, selectors: [["app-email-block"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 6, consts: [["novalidate", "", 3, "formGroup"], [1, "message-block"], [1, "message-block-description"], [1, "message-block-description__icon"], [1, "message-block-description__text"], [1, "message-block-input"], ["label", "E-mail", "nameInput", "email", "typeInput", "text", "maxLengthInput", "100", 3, "errorMessage", "formControlInput"]], template: function EmailBlockComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "section", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "app-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 4, "Email.EmailBonuses"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("errorMessage", ctx.errorMessages.email)("formControlInput", ctx.form.controls.email);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _input_input_component__WEBPACK_IMPORTED_MODULE_5__["InputComponent"]], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslatePipe"]], styles: ["[_ngcontent-%COMP%]:root {\n  --mainFont: CoreSansG;\n  --header-color: linear-gradient(90deg, #0D5297 0.26%, #0D5297 47.1%, #0D5297 99.8%);\n  --grey1: #CFE0F4;\n  --black: #000;\n  --white: #fff;\n  --grey: #ccc;\n  --grey2: #808080;\n  --grey3: #D3D3D3;\n  --grey5: #979797;\n  --grey6: #F5F5F5;\n  --blue: #6987F0;\n  --blue2: #3851C6;\n  --blue4: #0D5297;\n  --red: #f06979;\n  --black-rgba: rgba(0, 0, 0, 0.7);\n  --passport-toggle: #6987F0;\n  --input-focus: #0D5297;\n  --btn1-normal: linear-gradient(167.72deg, #0D5297 -33.07%, #0D5297 48.35%, #0D5297 139.94%);\n  --btn1-hover: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-focus: linear-gradient(351.95deg, #0D5297 -48.61%, #0D5297 33.69%, #0D5297 126.27%);\n  --btn1-disabled: linear-gradient(167.72deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn1-color-text-focus: #6D98D9;\n  --btn1-color-text: #fff;\n  --btn4-hover: linear-gradient(122.5deg, #5A4BE6 -33.07%, #73AFF7 48.35%, #93D0D9 139.94%);\n  --btn4-border: #CCCCCC;\n  --background-selected-day: linear-gradient(314.41deg, #5A4BE6 -48.61%, #73AFF7 33.69%, #93D0D9 126.27%);\n  --color-text-header: rgba(0, 0, 0, 0.543337);\n}\n\n.message-block[_ngcontent-%COMP%] {\n  background: var(--grey6);\n  min-height: 103px;\n  display: flex;\n  margin: auto;\n  align-items: center;\n}\n\n@media (max-width: 767px) {\n  .message-block[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n\n.message-block[_ngcontent-%COMP%]   .message-block-description[_ngcontent-%COMP%] {\n  width: 40%;\n  display: flex;\n  margin: auto;\n}\n\n@media (max-width: 992px) {\n  .message-block[_ngcontent-%COMP%]   .message-block-description[_ngcontent-%COMP%] {\n    width: 42%;\n  }\n}\n\n@media (max-width: 767px) {\n  .message-block[_ngcontent-%COMP%]   .message-block-description[_ngcontent-%COMP%] {\n    margin: 20px auto 0 auto;\n    flex-direction: column;\n    width: 100%;\n    align-items: center;\n  }\n}\n\n.message-block[_ngcontent-%COMP%]   .message-block-description__icon[_ngcontent-%COMP%] {\n  min-width: 70px;\n  background-image: url('mail.png');\n  background-repeat: no-repeat;\n  background-position: 2px 3px;\n  height: 44px;\n  margin: auto;\n}\n\n@media (max-width: 767px) {\n  .message-block[_ngcontent-%COMP%]   .message-block-description__icon[_ngcontent-%COMP%] {\n    background-position: 9px 3px;\n  }\n}\n\n.message-block[_ngcontent-%COMP%]   .message-block-description__text[_ngcontent-%COMP%] {\n  margin: 0 10px;\n  text-align: left;\n  font-family: var(--mainFont);\n  font-style: normal;\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 22px;\n  color: var(--black);\n  display: flex;\n  align-items: center;\n}\n\n@media (max-width: 767px) {\n  .message-block[_ngcontent-%COMP%]   .message-block-description__text[_ngcontent-%COMP%] {\n    margin: 10px 10px;\n    text-align: center;\n  }\n}\n\n.message-block[_ngcontent-%COMP%]   .message-block-input[_ngcontent-%COMP%] {\n  width: 46%;\n  margin: auto;\n}\n\n@media (max-width: 767px) {\n  .message-block[_ngcontent-%COMP%]   .message-block-input[_ngcontent-%COMP%] {\n    width: 96%;\n    margin: 10px auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlc1xcdmFyaWFibGVzLnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXGVtYWlsLWJsb2NrLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BO0VBRUUscUJBQUE7RUFFQSxtRkFBQTtFQUVBLGdCQUFBO0VBR0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFHQSxnQ0FBQTtFQUdBLDBCQUFBO0VBR0Esc0JBQUE7RUFJQSwyRkFBQTtFQUNBLDBGQUFBO0VBQ0EsMEZBQUE7RUFDQSw2RkFBQTtFQUNBLGdDQUFBO0VBQ0EsdUJBQUE7RUFJQSx5RkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUdBQUE7RUFDQSw0Q0FBQTtBQ3RCRjs7QUExQkE7RUFDRSx3QkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQTZCRjs7QUE1QkU7RUFORjtJQU9JLHNCQUFBO0VBK0JGO0FBQ0Y7O0FBN0JFO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBK0JKOztBQTlCSTtFQUpGO0lBS0ksVUFBQTtFQWlDSjtBQUNGOztBQWhDSTtFQVBGO0lBUUksd0JBQUE7SUFDQSxzQkFBQTtJQUNBLFdBQUE7SUFDQSxtQkFBQTtFQW1DSjtBQUNGOztBQWpDSTtFQUNFLGVBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsNEJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQW1DTjs7QUFsQ007RUFQRjtJQVFJLDRCQUFBO0VBcUNOO0FBQ0Y7O0FBbENJO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFvQ047O0FBbkNNO0VBWEY7SUFZSSxpQkFBQTtJQUNBLGtCQUFBO0VBc0NOO0FBQ0Y7O0FBbENFO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUFvQ0o7O0FBbkNJO0VBSEY7SUFJSSxVQUFBO0lBQ0EsaUJBQUE7RUFzQ0o7QUFDRiIsImZpbGUiOiJlbWFpbC1ibG9jay5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiR4czogMDtcclxuJHNtOiA1NzZweDtcclxuJG1kOiA3NjdweDtcclxuJGxnOiA5OTJweDtcclxuJHhsOiAxMjAwcHg7XHJcblxyXG46cm9vdCB7XHJcbiAgLy8gZm9udFxyXG4gIC0tbWFpbkZvbnQ6IENvcmVTYW5zRztcclxuICAvLyBjb2xvclxyXG4gIC0taGVhZGVyLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwRDUyOTcgMC4yNiUsICMwRDUyOTcgNDcuMSUsICMwRDUyOTcgOTkuOCUpO1xyXG4gIC8vJGdyZXk6ICNjY2M7XHJcbiAgLS1ncmV5MTogI0NGRTBGNDtcclxuXHJcbiAgLy8gYmFja2dyb3VuZFxyXG4gIC0tYmxhY2s6ICMwMDA7XHJcbiAgLS13aGl0ZTogI2ZmZjtcclxuICAtLWdyZXk6ICNjY2M7XHJcbiAgLS1ncmV5MjogIzgwODA4MDtcclxuICAtLWdyZXkzOiAjRDNEM0QzO1xyXG4gIC0tZ3JleTU6ICM5Nzk3OTc7XHJcbiAgLS1ncmV5NjogI0Y1RjVGNTtcclxuICAtLWJsdWU6ICM2OTg3RjA7XHJcbiAgLS1ibHVlMjogIzM4NTFDNjtcclxuICAtLWJsdWU0OiAjMEQ1Mjk3O1xyXG4gIC0tcmVkOiAjZjA2OTc5O1xyXG5cclxuICAvLyBiYWNrZ3JvdW5kXHJcbiAgLS1ibGFjay1yZ2JhOiByZ2JhKDAsIDAsIDAsIDAuNyk7XHJcblxyXG4gIC8vIGJ0bi1wYXNzcG9ydFxyXG4gIC0tcGFzc3BvcnQtdG9nZ2xlOiAjNjk4N0YwO1xyXG5cclxuICAvLyBpbnB1dFxyXG4gIC0taW5wdXQtZm9jdXM6ICMwRDUyOTc7XHJcblxyXG5cclxuICAvLyBidXR0b24gY29sb3IgcHJpbWFyeVxyXG4gIC0tYnRuMS1ub3JtYWw6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICMwRDUyOTcgLTMzLjA3JSwgIzBENTI5NyA0OC4zNSUsICMwRDUyOTcgMTM5Ljk0JSk7XHJcbiAgLS1idG4xLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xyXG4gIC0tYnRuMS1mb2N1czogbGluZWFyLWdyYWRpZW50KDM1MS45NWRlZywgIzBENTI5NyAtNDguNjElLCAjMEQ1Mjk3IDMzLjY5JSwgIzBENTI5NyAxMjYuMjclKTtcclxuICAtLWJ0bjEtZGlzYWJsZWQ6IGxpbmVhci1ncmFkaWVudCgxNjcuNzJkZWcsICM1QTRCRTYgLTMzLjA3JSwgIzczQUZGNyA0OC4zNSUsICM5M0QwRDkgMTM5Ljk0JSk7XHJcbiAgLS1idG4xLWNvbG9yLXRleHQtZm9jdXM6ICM2RDk4RDk7XHJcbiAgLS1idG4xLWNvbG9yLXRleHQ6ICNmZmY7XHJcblxyXG5cclxuICAvLyBjYWxlbmRhciBjb2xvclxyXG4gIC0tYnRuNC1ob3ZlcjogbGluZWFyLWdyYWRpZW50KDEyMi41ZGVnLCAjNUE0QkU2IC0zMy4wNyUsICM3M0FGRjcgNDguMzUlLCAjOTNEMEQ5IDEzOS45NCUpO1xyXG4gIC0tYnRuNC1ib3JkZXI6ICNDQ0NDQ0M7XHJcbiAgLS1iYWNrZ3JvdW5kLXNlbGVjdGVkLWRheTogbGluZWFyLWdyYWRpZW50KDMxNC40MWRlZywgIzVBNEJFNiAtNDguNjElLCAjNzNBRkY3IDMzLjY5JSwgIzkzRDBEOSAxMjYuMjclKTtcclxuICAtLWNvbG9yLXRleHQtaGVhZGVyOiByZ2JhKDAsIDAsIDAsIDAuNTQzMzM3KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuIiwiOnJvb3Qge1xuICAtLW1haW5Gb250OiBDb3JlU2Fuc0c7XG4gIC0taGVhZGVyLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwRDUyOTcgMC4yNiUsICMwRDUyOTcgNDcuMSUsICMwRDUyOTcgOTkuOCUpO1xuICAtLWdyZXkxOiAjQ0ZFMEY0O1xuICAtLWJsYWNrOiAjMDAwO1xuICAtLXdoaXRlOiAjZmZmO1xuICAtLWdyZXk6ICNjY2M7XG4gIC0tZ3JleTI6ICM4MDgwODA7XG4gIC0tZ3JleTM6ICNEM0QzRDM7XG4gIC0tZ3JleTU6ICM5Nzk3OTc7XG4gIC0tZ3JleTY6ICNGNUY1RjU7XG4gIC0tYmx1ZTogIzY5ODdGMDtcbiAgLS1ibHVlMjogIzM4NTFDNjtcbiAgLS1ibHVlNDogIzBENTI5NztcbiAgLS1yZWQ6ICNmMDY5Nzk7XG4gIC0tYmxhY2stcmdiYTogcmdiYSgwLCAwLCAwLCAwLjcpO1xuICAtLXBhc3Nwb3J0LXRvZ2dsZTogIzY5ODdGMDtcbiAgLS1pbnB1dC1mb2N1czogIzBENTI5NztcbiAgLS1idG4xLW5vcm1hbDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzBENTI5NyAtMzMuMDclLCAjMEQ1Mjk3IDQ4LjM1JSwgIzBENTI5NyAxMzkuOTQlKTtcbiAgLS1idG4xLWhvdmVyOiBsaW5lYXItZ3JhZGllbnQoMzUxLjk1ZGVnLCAjMEQ1Mjk3IC00OC42MSUsICMwRDUyOTcgMzMuNjklLCAjMEQ1Mjk3IDEyNi4yNyUpO1xuICAtLWJ0bjEtZm9jdXM6IGxpbmVhci1ncmFkaWVudCgzNTEuOTVkZWcsICMwRDUyOTcgLTQ4LjYxJSwgIzBENTI5NyAzMy42OSUsICMwRDUyOTcgMTI2LjI3JSk7XG4gIC0tYnRuMS1kaXNhYmxlZDogbGluZWFyLWdyYWRpZW50KDE2Ny43MmRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcbiAgLS1idG4xLWNvbG9yLXRleHQtZm9jdXM6ICM2RDk4RDk7XG4gIC0tYnRuMS1jb2xvci10ZXh0OiAjZmZmO1xuICAtLWJ0bjQtaG92ZXI6IGxpbmVhci1ncmFkaWVudCgxMjIuNWRlZywgIzVBNEJFNiAtMzMuMDclLCAjNzNBRkY3IDQ4LjM1JSwgIzkzRDBEOSAxMzkuOTQlKTtcbiAgLS1idG40LWJvcmRlcjogI0NDQ0NDQztcbiAgLS1iYWNrZ3JvdW5kLXNlbGVjdGVkLWRheTogbGluZWFyLWdyYWRpZW50KDMxNC40MWRlZywgIzVBNEJFNiAtNDguNjElLCAjNzNBRkY3IDMzLjY5JSwgIzkzRDBEOSAxMjYuMjclKTtcbiAgLS1jb2xvci10ZXh0LWhlYWRlcjogcmdiYSgwLCAwLCAwLCAwLjU0MzMzNyk7XG59XG5cbi5tZXNzYWdlLWJsb2NrIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tZ3JleTYpO1xuICBtaW4taGVpZ2h0OiAxMDNweDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiBhdXRvO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5tZXNzYWdlLWJsb2NrIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG59XG4ubWVzc2FnZS1ibG9jayAubWVzc2FnZS1ibG9jay1kZXNjcmlwdGlvbiB7XG4gIHdpZHRoOiA0MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogYXV0bztcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA5OTJweCkge1xuICAubWVzc2FnZS1ibG9jayAubWVzc2FnZS1ibG9jay1kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDQyJTtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5tZXNzYWdlLWJsb2NrIC5tZXNzYWdlLWJsb2NrLWRlc2NyaXB0aW9uIHtcbiAgICBtYXJnaW46IDIwcHggYXV0byAwIGF1dG87XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG4ubWVzc2FnZS1ibG9jayAubWVzc2FnZS1ibG9jay1kZXNjcmlwdGlvbl9faWNvbiB7XG4gIG1pbi13aWR0aDogNzBweDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9tYWlsLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMnB4IDNweDtcbiAgaGVpZ2h0OiA0NHB4O1xuICBtYXJnaW46IGF1dG87XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLm1lc3NhZ2UtYmxvY2sgLm1lc3NhZ2UtYmxvY2stZGVzY3JpcHRpb25fX2ljb24ge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDlweCAzcHg7XG4gIH1cbn1cbi5tZXNzYWdlLWJsb2NrIC5tZXNzYWdlLWJsb2NrLWRlc2NyaXB0aW9uX190ZXh0IHtcbiAgbWFyZ2luOiAwIDEwcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluRm9udCk7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcbiAgY29sb3I6IHZhcigtLWJsYWNrKTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAubWVzc2FnZS1ibG9jayAubWVzc2FnZS1ibG9jay1kZXNjcmlwdGlvbl9fdGV4dCB7XG4gICAgbWFyZ2luOiAxMHB4IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG4ubWVzc2FnZS1ibG9jayAubWVzc2FnZS1ibG9jay1pbnB1dCB7XG4gIHdpZHRoOiA0NiU7XG4gIG1hcmdpbjogYXV0bztcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAubWVzc2FnZS1ibG9jayAubWVzc2FnZS1ibG9jay1pbnB1dCB7XG4gICAgd2lkdGg6IDk2JTtcbiAgICBtYXJnaW46IDEwcHggYXV0bztcbiAgfVxufSJdfQ== */"] });


/***/ }),

/***/ "hZKY":
/*!******************************************************!*\
  !*** ./src/app/shared/validators/validator-email.ts ***!
  \******************************************************/
/*! exports provided: ValidatorEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorEmail", function() { return ValidatorEmail; });
function ValidatorEmail(control) {
    const test = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i.test(control.value);
    if (!test) {
        return { emailValidator: true };
    }
    return null;
}


/***/ }),

/***/ "nFaK":
/*!**************************************************************************************!*\
  !*** ./src/app/shared/services/language-browser-service/language-browser.service.ts ***!
  \**************************************************************************************/
/*! exports provided: LanguageBrowserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageBrowserService", function() { return LanguageBrowserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _cookie_servise_cookie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cookie-servise/cookie.service */ "NJzO");


class LanguageBrowserService {
    constructor(cookie) {
        this.cookie = cookie;
    }
    getBrowserLanguage() {
        let lang = this.cookie.getData('lang');
        if (!!lang) {
            return lang;
        }
        else {
            lang = this.languageBrowser();
        }
        return lang;
    }
    languageBrowser() {
        // @ts-ignore
        const clientLanguage = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
        return clientLanguage.substr(0, 2).toLowerCase();
    }
}
LanguageBrowserService.ɵfac = function LanguageBrowserService_Factory(t) { return new (t || LanguageBrowserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cookie_servise_cookie_service__WEBPACK_IMPORTED_MODULE_1__["CookieService"])); };
LanguageBrowserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LanguageBrowserService, factory: LanguageBrowserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "xi4J":
/*!**********************************************************!*\
  !*** ./src/app/shared/animations/fading-away.animate.ts ***!
  \**********************************************************/
/*! exports provided: transformPanel, showAnimate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformPanel", function() { return transformPanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showAnimate", function() { return showAnimate; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "R0Ic");

const transformPanel = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('transformPanel', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        transform: 'scaleY(0)',
        minWidth: '100%',
        opacity: 1,
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('showing', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: 'scaleY(1)',
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('showing-multiple', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 1,
        minWidth: 'calc(100% + 64px)',
        transform: 'scaleY(1)',
    })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('220ms cubic-bezier(0.1, 0, 0.2, 1)')),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('100ms 25ms linear', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 1 })))
]);
const showAnimate = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('showAnimate', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('1s', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                offset: 0,
                opacity: 0
            }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                offset: 1,
                opacity: 1
            })
        ]))
    ])
]);


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map