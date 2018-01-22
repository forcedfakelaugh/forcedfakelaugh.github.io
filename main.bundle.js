webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-conversion></app-conversion>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__conversion_conversion_component__ = __webpack_require__("../../../../../src/app/conversion/conversion.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__conversion_conversion_component__["a" /* ConversionComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* NoopAnimationsModule */],
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/conversion/conversion.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".button {\r\n    background-color: #555555; /* Green */\r\n    border: none;\r\n    color: white;\r\n    padding: 15px 32px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 4px 2px;\r\n    cursor: pointer;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/conversion/conversion.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <h1>PROFIT CALCULATOR</h1>\r\n  <br>\r\n  <br>\r\n  \r\n  <div class=\"row\">\r\n    <div class=\"col-md form-group\">\r\n      <p>Amount of BTC:\r\n        <b>${{pricePaid | number:'1.0-0'}}</b>\r\n      </p>\r\n      <input class='form-control input-sm' type=\"number\" name=\"amount\" id=\"\" [(ngModel)]='amount' step='0.1'>\r\n    </div>\r\n  </div>\r\n  <p>Conversion Rate (&#8363;/USD)</p>\r\n  <input class='form-control input-sm' type=\"number\" name=\"conversionRate\" id=\"\" [(ngModel)]='conversionRate' step='100'>\r\n  <br>\r\n  <div class=\"row\">\r\n    <div class=\"col-md form-group\">\r\n      <p>Exchange BTC fee: </p>\r\n      <input class='form-control input-sm' class='form-control input-sm' type=\"number\" name=\"buyFee\" id=\"\" [(ngModel)]='buyFee'>\r\n    </div>\r\n    <div class=\"col-md\">\r\n      <p>Convert to USD fee: </p>\r\n      <input class='form-control input-sm' type=\"number\" name=\"conversionFee\" id=\"\" [(ngModel)]='conversionFee' step='0.005'>\r\n    </div>\r\n    <div class=\"col-md\">\r\n      <p>Wire to US fee: </p>\r\n      <input class='form-control input-sm' type=\"number\" name=\"wireToUsaFee\" id=\"\" [(ngModel)]='wireToUsaFee' step='0.005'>\r\n    </div>\r\n  </div>\r\n  <br>\r\n  <p>Remitano Price (&#8363;)  <b>- Copy and Paste</b></p>\r\n  <input class='form-control input-sm' type=\"number\" name=\"remitano\" [(ngModel)]='remitanoPrice' step='1000000'>\r\n  <br>\r\n  <p>Exchange Price: $ {{usdPrice | number:'1.0-0'}}</p>\r\n  <p>Exchange Price: &#8363; {{vndPrice | number:'1.0-0'}} </p>\r\n  <div>\r\n    <button type=\"button\" class=\"btn btn-success btn-lg\" (click)=\"Calculate()\">Calculate</button>\r\n  </div>\r\n  <!-- <button mat-raised-button color=\"warn\" (click)=\"Calculate()\">Calculate Profit</button> -->\r\n  <br>\r\n  <b>Profit: {{profit | percent :'1.0-1'}}</b>\r\n  <br>\r\n  <b>Profit: $ {{usdProfit | number:'1.0-2'}}</b>\r\n  <br>\r\n  <b>Profit: &#8363; {{vndProfit | number:'1.0-0'}}</b>\r\n  \r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/conversion/conversion.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConversionComponent = (function () {
    function ConversionComponent(http) {
        this.http = http;
        this.amount = 1;
        this.buyFee = 0.0025;
        this.remitanoPrice = 300000000;
        this.profit = 0.5;
        this.usdProfit = 0;
        this.vndProfit = 0;
        this.conversionFee = 0.01;
        this.wireToUsaFee = 0.01;
        this.pricePaid = 0;
        this.conversionRate = 0;
        this.url = 'https://api.coindesk.com/v1/bpi/currentprice/vnd.json';
    }
    ConversionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(this.url).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.usdPrice = data['bpi'].USD.rate_float;
            _this.vndPrice = data['bpi'].VND.rate_float;
            _this.pricePaid = _this.amount * _this.usdPrice;
            _this.conversionRate = Math.trunc(_this.vndPrice / _this.usdPrice);
        });
    };
    ConversionComponent.prototype.Calculate = function () {
        var _this = this;
        this.http.get(this.url).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.usdPrice = data['bpi'].USD.rate_float;
        });
        this.pricePaid = this.amount * this.usdPrice;
        this.vndProfit = (this.remitanoPrice - this.amount * this.usdPrice * this.conversionRate
            * (1 + this.conversionFee + this.wireToUsaFee + this.buyFee));
        this.usdProfit = this.vndProfit / this.conversionRate;
        this.profit = (this.remitanoPrice - this.amount * this.vndPrice * (1 + this.conversionFee + this.wireToUsaFee))
            / (this.amount * this.vndPrice);
        this.vndPrice = this.conversionRate * this.usdPrice;
    };
    return ConversionComponent;
}());
ConversionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-conversion',
        template: __webpack_require__("../../../../../src/app/conversion/conversion.component.html"),
        styles: [__webpack_require__("../../../../../src/app/conversion/conversion.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ConversionComponent);

var _a;
//# sourceMappingURL=conversion.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map