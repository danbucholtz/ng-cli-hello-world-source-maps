"use strict";
var __decorate = /*@__PURE__*/ require("tslib").__decorate;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /*@__PURE__*/ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent.prototype.clickMe = function () {
        console.log('test test test');
        window.taco();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
