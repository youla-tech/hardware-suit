(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/main/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/main/entity/AirConditionModel.js":
/*!************************************************!*\
  !*** ./build/main/entity/AirConditionModel.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-15 17:12:36
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirConditionModel = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
//  import { Converter } from '../utils/converter';
class AirConditionModel extends Status_1.Status {
    constructor(status, ac) {
        super(status);
        this.keys = [];
        this.serialId = '';
        this.name = '';
        this.rmodel = '';
        this.keyValue = '';
        this.temperature = '';
        this.mode = '';
        this.speed = '';
        this.horizontalWing = '';
        this.verticalWing = '';
        this.power = '';
        this.mode = status.slice(0, 2);
        this.speed = status.slice(2, 4);
        this.temperature = status.slice(4, 6);
        this.verticalWing = status.slice(6, 8);
        this.horizontalWing = status.slice(8, 10);
        if (ac) {
            this.keys = ac.keys;
            this.serialId = ac.serialId;
            this.deviceType = ac.deviceType;
            this.index = ac.indexOsm;
            this.name = ac.name;
            this.rmodel = ac.rmodel;
            this.keyValue = ac.keyValue;
            // this.init()
        }
    }
    init() {
        if (!this.keyValue)
            return;
        if (['on', 'off'].includes(this.keyValue)) {
            this.setPower(this.keyValue);
        }
        else {
            const keys = this.keyValue.split('_');
            if (keys.filter(i => i).length)
                this.setPower('on');
            keys[0] && this.setMode(keys[0]);
            keys[1] && this.setSpeed(keys[1]);
            this.setTemperature(keys[2] || '1a');
            keys[3] && this.setVerticalWing(keys[3]);
            keys[4] && this.setHorizontalWing(keys[4]);
        }
    }
    getKeys() {
        return this.keys;
    }
    getKeyValue() {
        return this.keyValue;
    }
    getSerialId() {
        return this.serialId;
    }
    getDeviceType() {
        return this.deviceType;
    }
    getIndex() {
        return this.index;
    }
    getName() {
        return this.name;
    }
    getrModel() {
        return this.rmodel;
    }
    setTemperature(tmp) {
        this.temperature = tmp;
        return this;
    }
    getTemperature() {
        return this.temperature;
    }
    setMode(mode) {
        this.mode = mode;
        return this;
    }
    getMode() {
        return this.mode;
    }
    setSpeed(speed) {
        this.speed = speed;
        return this;
    }
    getSpeed() {
        return this.speed;
    }
    setHorizontalWing(wing) {
        this.horizontalWing = wing;
        return this;
    }
    getHorizontalWing() {
        return this.horizontalWing;
    }
    setVerticalWing(wing) {
        this.verticalWing = wing;
        return this;
    }
    getVerticalWing() {
        return this.verticalWing;
    }
    setPower(power) {
        this.power = power;
        return this;
    }
    getPower() {
        return this.power;
    }
}
exports.AirConditionModel = AirConditionModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlyQ29uZGl0aW9uTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW50aXR5L0FpckNvbmRpdGlvbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7O0FBRUgscUNBQWlDO0FBWWpDLG1EQUFtRDtBQUNuRCxNQUFhLGlCQUFrQixTQUFRLGVBQU07SUFnQjNDLFlBQWEsTUFBYyxFQUFFLEVBQU87UUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBaEJmLFNBQUksR0FBVSxFQUFFLENBQUE7UUFDaEIsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUdyQixTQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ2pCLFdBQU0sR0FBVyxFQUFFLENBQUE7UUFDbkIsYUFBUSxHQUFXLEVBQUUsQ0FBQTtRQUVyQixnQkFBVyxHQUFXLEVBQUUsQ0FBQTtRQUN4QixTQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ2pCLFVBQUssR0FBVyxFQUFFLENBQUE7UUFDbEIsbUJBQWMsR0FBVyxFQUFFLENBQUE7UUFDM0IsaUJBQVksR0FBVyxFQUFFLENBQUE7UUFDekIsVUFBSyxHQUFXLEVBQUUsQ0FBQTtRQUloQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxD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

/***/ }),

/***/ "./build/main/entity/CardPowerStatus.js":
/*!**********************************************!*\
  !*** ./build/main/entity/CardPowerStatus.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:25:24
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-12 17:29:58
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPowerStatus = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
/**
 * 窗帘
 */
class CardPowerStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        /** 当前状态 */
        this.state = '';
        /** 设置状态 */
        this.confState = '';
        /** 使能状态 */
        this.actionState = '';
        this.confState = this.status.slice(0, 2);
        this.state = this.status.slice(2, 4);
        this.actionState = this.status.slice(4, 6);
    }
    /**
     * 获取当前状态
     */
    getStatus() {
        return this.state.toEvenHex();
    }
    /**
     * 设置当前状态
     * @param state 当前状态值
     */
    setStatus(state) {
        this.state = state.toEvenHex();
        return this;
    }
    /**
     * 设置状态
     * @param state 设置状态值
     */
    setConfStatus(state) {
        this.confState = state.toEvenHex();
        return this;
    }
    getConfStatus() {
        return this.confState.toEvenHex();
    }
    setActionState(state) {
        this.actionState = state.toEvenHex();
        return this;
    }
    getActionState() {
        return this.actionState.toEvenHex();
    }
}
exports.CardPowerStatus = CardPowerStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFBvd2VyU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0eS9DYXJkUG93ZXJTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7QUFFSCxxQ0FBa0M7QUFDbEM7O0dBRUc7QUFDSCxNQUFhLGVBQWdCLFNBQVEsZUFBTTtJQU96QyxZQUFhLE1BQWM7UUFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBUGYsV0FBVztRQUNKLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDMUIsV0FBVztRQUNKLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDOUIsV0FBVztRQUNKLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFDRDs7T0FFRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUNEOzs7T0FHRztJQUNILFNBQVMsQ0FBRSxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNEOzs7T0FHRztJQUNILGFBQWEsQ0FBRSxLQUFhO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2xDLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDbkMsQ0FBQztJQUNELGNBQWMsQ0FBRSxLQUFhO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3BDLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDckMsQ0FBQztDQUNGO0FBN0NELDBDQTZDQyJ9

/***/ }),

/***/ "./build/main/entity/CurtainStatus.js":
/*!********************************************!*\
  !*** ./build/main/entity/CurtainStatus.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CurtainStatus = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:25:18
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 11:03:16
 */
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
/**
 * 窗帘
 */
class CurtainStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        this.state = '';
        this.state = status.slice(0, 2);
    }
    getStatus() {
        return this.state.toEvenHex();
    }
    setStatus(state) {
        this.state = state.toEvenHex();
        return this;
    }
}
exports.CurtainStatus = CurtainStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VydGFpblN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdHkvQ3VydGFpblN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7R0FLRztBQUNILHFDQUFrQztBQUNsQzs7R0FFRztBQUNILE1BQWEsYUFBYyxTQUFRLGVBQU07SUFFdkMsWUFBYSxNQUFjO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUZSLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBQ0QsU0FBUyxDQUFFLEtBQWE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDOUIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0NBQ0Y7QUFiRCxzQ0FhQyJ9

/***/ }),

/***/ "./build/main/entity/LampStatus.js":
/*!*****************************************!*\
  !*** ./build/main/entity/LampStatus.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LampStatus = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
// TODO 待优化
class LampStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        //  普通灯状态
        this.normalLampStatus = '';
        // 色灯状态
        this.colorLampStatus = '';
        // 亮度状态
        this.brightnessStatus = '';
        // 冷光
        this.coldColorStatus = '';
        // 暖光
        this.warmColorStatus = '';
        // 时延
        this.timeDelayStatus = '';
        this.exceptionStatus = '';
        this.normalLampStatus = status.slice(0, 2);
        this.colorLampStatus = status.slice(2, 4);
        this.brightnessStatus = status.slice(0, 2);
        this.coldColorStatus = status.slice(2, 4);
        this.warmColorStatus = status.slice(4, 6);
        this.timeDelayStatus = status.slice(12, 14);
        this.exceptionStatus = status.slice(14);
    }
    getNormalLampStatus() {
        return this.normalLampStatus;
    }
    getColorLampStatus() {
        return this.colorLampStatus;
    }
    setBrightnessStatus(bright) {
        this.brightnessStatus = bright.toEvenHex();
        return this;
    }
    getBrightnessStatus() {
        return this.brightnessStatus;
    }
    setColdColorStatus(color) {
        this.coldColorStatus = color.toEvenHex();
        return this;
    }
    getColdColorStatus() {
        return this.coldColorStatus;
    }
    setWarmColorStatus(warm) {
        this.warmColorStatus = warm.toEvenHex();
        return this;
    }
    getWarmColorStatus() {
        return this.warmColorStatus;
    }
    setTimeDelayStatus(timeDelay) {
        this.timeDelayStatus = timeDelay.toEvenHex();
        return this;
    }
    getTimeDelayStatus() {
        return this.timeDelayStatus;
    }
    getExceptionStatus() {
        return this.exceptionStatus;
    }
}
exports.LampStatus = LampStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtcFN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdHkvTGFtcFN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBa0M7QUFFbEMsV0FBVztBQUNYLE1BQWEsVUFBVyxTQUFRLGVBQU07SUFpQnBDLFlBQVksTUFBYztRQUN4QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFqQmhCLFNBQVM7UUFDTyxxQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFDOUMsT0FBTztRQUNTLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBRTdDLE9BQU87UUFDQSxxQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFDckMsS0FBSztRQUNFLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBQ3BDLEtBQUs7UUFDRSxvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUNwQyxLQUFLO1FBQ0Usb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFFN0Isb0JBQWUsR0FBVyxFQUFFLENBQUE7UUFJakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFDTSxrQkFBa0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxNQUFjO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFDTSxrQkFBa0IsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNNLGtCQUFrQjtRQUN2QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNNLGtCQUFrQixDQUFDLElBQVk7UUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sa0JBQWtCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ00sa0JBQWtCLENBQUMsU0FBaUI7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sa0JBQWtCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ00sa0JBQWtCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtJQUM3QixDQUFDO0NBQ0Y7QUFuRUQsZ0NBbUVDIn0=

/***/ }),

/***/ "./build/main/entity/SensorAcStatus.js":
/*!*********************************************!*\
  !*** ./build/main/entity/SensorAcStatus.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorAcStatus = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-12-22 15:09:23
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-22 15:11:20
 */
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
/**
 * AC 人体红外传感器
 */
class SensorAcStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        this.state = '';
        this.sense = status.slice(0, 2);
        this.state = status.slice(2, 4);
    }
    getStatus() {
        return this.state.toEvenHex();
    }
    setStatus(state) {
        this.state = state.toEvenHex();
        return this;
    }
}
exports.SensorAcStatus = SensorAcStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yQWNTdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW50aXR5L1NlbnNvckFjU3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztHQUtHO0FBQ0gscUNBQWtDO0FBQ2xDOztHQUVHO0FBQ0gsTUFBYSxjQUFlLFNBQVEsZUFBTTtJQUd4QyxZQUFhLE1BQWM7UUFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBSFIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUl4QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUNELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUNELFNBQVMsQ0FBRSxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGO0FBZkQsd0NBZUMifQ==

/***/ }),

/***/ "./build/main/entity/SensorAcmanStatus.js":
/*!************************************************!*\
  !*** ./build/main/entity/SensorAcmanStatus.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorAcmanStatus = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
/**
 * AC 人体红外 + 光感传感器
 */
class SensorAcmanStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        this.state = '';
        this.man = '';
        this.state = status.slice(2, 4);
        this.man = status.slice(6, 8);
    }
    getStatus() {
        return this.state.toEvenHex();
    }
    setStatus(state) {
        this.state = state.toEvenHex();
        return this;
    }
    getManStatus() {
        return this.man;
    }
}
exports.SensorAcmanStatus = SensorAcmanStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yQWNtYW5TdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW50aXR5L1NlbnNvckFjbWFuU3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFrQztBQUNsQzs7R0FFRztBQUNILE1BQWEsaUJBQWtCLFNBQVEsZUFBTTtJQUczQyxZQUFhLE1BQWM7UUFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBSFIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBR3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBQ0QsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBQ0QsU0FBUyxDQUFFLEtBQWE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDOUIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQ0QsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0NBQ0Y7QUFsQkQsOENBa0JDIn0=

/***/ }),

/***/ "./build/main/entity/SensorDetectStatus.js":
/*!*************************************************!*\
  !*** ./build/main/entity/SensorDetectStatus.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDetectStatus = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
/**
 * 一键呼叫、门磁
 */
class SensorDetectStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        // 事件标识
        this.state = '';
        // 类型
        this.type = '';
        // 电压
        this.vol = '';
        this.type = status.slice(0, 2);
        this.state = status.slice(2, 4);
        this.vol = status.slice(6, 8);
    }
    parseBitState(state, count) {
        return this.__parseBitState(state, count, 1);
    }
    getStatus() {
        return this.state.toEvenHex();
    }
    setStatus(state) {
        this.state = state.toEvenHex();
        return this;
    }
    getTypeStatus() {
        return this.type.toEvenHex();
    }
    getVolStatus() {
        return this.vol.toEvenHex();
    }
}
exports.SensorDetectStatus = SensorDetectStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yRGV0ZWN0U3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0eS9TZW5zb3JEZXRlY3RTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWtDO0FBQ2xDOztHQUVHO0FBQ0gsTUFBYSxrQkFBbUIsU0FBUSxlQUFNO0lBTzVDLFlBQWEsTUFBYztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFQZixPQUFPO1FBQ0EsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUMxQixLQUFLO1FBQ0wsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixLQUFLO1FBQ0wsUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQUdkLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDRCxhQUFhLENBQUUsS0FBYSxFQUFFLEtBQWE7UUFDekMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUNELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUNELFNBQVMsQ0FBRSxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQUNELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDN0IsQ0FBQztDQUNGO0FBN0JELGdEQTZCQyJ9

/***/ }),

/***/ "./build/main/entity/SocketStatus.js":
/*!*******************************************!*\
  !*** ./build/main/entity/SocketStatus.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketStatus = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
class SocketStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        /**
         * 开关插座状态
         */
        this.plugStatus = '';
        /**
         * 触摸面板状态
         */
        this.touchStatus = '';
        /**
         * 混合面板
         */
        this.mixupStatus = '';
        /**
         * 场景面板
         */
        this.sceneStatus = '';
        this.state = '';
        this.plugStatus = status.slice(0, 2);
        this.touchStatus = status.slice(0, 2);
        this.mixupStatus = status.slice(2, 4);
        this.sceneStatus = status.slice(6, 8);
        this.state = status.slice(6, 8);
    }
    setState(state) {
        if (state.length < 2) {
            console.warn('two bytes needed!');
        }
        this.state = state;
    }
    getState() {
        return this.state;
    }
    getPlugStatus() {
        return this.plugStatus;
    }
    getTouchStatus() {
        return this.touchStatus;
    }
    getMixupStatus() {
        return this.mixupStatus;
    }
    getSceneStatus() {
        return this.sceneStatus;
    }
}
exports.SocketStatus = SocketStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0U3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0eS9Tb2NrZXRTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWtDO0FBQ2xDLE1BQWEsWUFBYSxTQUFRLGVBQU07SUFrQnRDLFlBQVksTUFBYztRQUN4QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFsQmhCOztXQUVHO1FBQ2EsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4Qzs7V0FFRztRQUNhLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pDOztXQUVHO1FBQ2EsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekM7O1dBRUc7UUFDYSxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUNsQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ00sUUFBUSxDQUFDLEtBQWE7UUFDM0IsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ00sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ00sYUFBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNNLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDTSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ00sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBL0NELG9DQStDQyJ9

/***/ }),

/***/ "./build/main/entity/Status.js":
/*!*************************************!*\
  !*** ./build/main/entity/Status.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const converter_1 = __webpack_require__(/*! ../utils/converter */ "./build/main/utils/converter.js");
class Status {
    constructor(status) {
        this.status = '';
        status = status.length < 16 ? status.padRight(16) : status;
        this.status = status;
    }
    /**
     * 根据给定数量值，将16进制状态解析成二进制状态码，
     * 并反正顺序返回 ['01', '11', '10', '00'] => ["00", "10", "11", "01"]
     * @param state 16进制状态码('01')
     * @param count 码数量
     * @param splitSize 分割位数
     */
    __parseBitState(state, count, splitSize = 2) {
        let keyList = [];
        const converter = new converter_1.Converter(state || '00', 16);
        const bits = converter.fill(8, converter.toBinary());
        let i = 0;
        for (let index = count; index > 0; index--) {
            keyList.push(bits.slice(bits.length - splitSize * (i + 1), bits.length - splitSize * i));
            i += 1;
        }
        if (splitSize === 1)
            keyList = keyList.map(k => this.adaptHex(k));
        return keyList;
    }
    adaptHex(hex) {
        if (!hex)
            return '';
        return hex.length > 1 ? hex : `0${hex}`;
    }
}
exports.Status = Status;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0eS9TdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0RBQStDO0FBRS9DLE1BQWEsTUFBTTtJQUVqQixZQUFZLE1BQWM7UUFEVixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBRWxDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSCxlQUFlLENBQUUsS0FBYSxFQUFFLEtBQWEsRUFBRSxZQUFvQixDQUFDO1FBQ2xFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNoQixNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNsRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVCxLQUFLLElBQUksS0FBSyxHQUFHLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hGLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDUDtRQUNELElBQUksU0FBUyxLQUFLLENBQUM7WUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqRSxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0lBQ00sUUFBUSxDQUFDLEdBQVc7UUFDekIsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBN0JELHdCQTZCQyJ9

/***/ }),

/***/ "./build/main/entity/SwitchMixStatus.js":
/*!**********************************************!*\
  !*** ./build/main/entity/SwitchMixStatus.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-21 16:10:33
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchMixStatus = void 0;
const SwitchStatus_1 = __webpack_require__(/*! ./SwitchStatus */ "./build/main/entity/SwitchStatus.js");
class SwitchMixStatus extends SwitchStatus_1.SwitchStatus {
    /**
     * 混合面板(情景 + 开关)
     * @param status 状态码
     * @param count 按键数量列表
     * @param pattern 类型范式
     */
    constructor(status, count, pattern) {
        super(status, count, pattern);
        this.extraState = status.slice(2, 4);
        this.extraKeyDots = this.__parseBitState(this.extraState, this.extraCount);
    }
    // 非主程面板按键数
    get extraCount() {
        return this.count[SwitchStatus_1.OrderEnum.Secondary] || 0;
    }
    /**
     * 设置按键值
     * @param v 二进制值
     * @param index 索引
     */
    setExtraKeyDots(v, index) {
        if (index + 1 > this.extraCount)
            return this;
        this.extraKeyDots[index] = v.toEven();
        return this;
    }
    /**
     * 获取按键值
     * @param index 索引
     */
    getExtraKeyDotByIndex(index) {
        if (index + 1 > this.extraCount)
            return;
        return this.extraKeyDots[index];
    }
    getExtraState() {
        return this.extraState;
    }
}
exports.SwitchMixStatus = SwitchMixStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoTWl4U3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0eS9Td2l0Y2hNaXhTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7QUFFSCxpREFBeUQ7QUFFekQsTUFBYSxlQUFnQixTQUFRLDJCQUFZO0lBRy9DOzs7OztPQUtHO0lBQ0gsWUFBYSxNQUFjLEVBQUUsS0FBcUIsRUFBRSxPQUFnQjtRQUNsRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1RSxDQUFDO0lBRUQsV0FBVztJQUNYLElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILGVBQWUsQ0FBRSxDQUFTLEVBQUUsS0FBYTtRQUN2QyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNyQyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFDRDs7O09BR0c7SUFDSCxxQkFBcUIsQ0FBRSxLQUFhO1FBQ2xDLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU07UUFDdkMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQ3hCLENBQUM7Q0FDRjtBQXpDRCwwQ0F5Q0MifQ==

/***/ }),

/***/ "./build/main/entity/SwitchPlugStatus.js":
/*!***********************************************!*\
  !*** ./build/main/entity/SwitchPlugStatus.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchPlugStatus = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-12-18 14:25:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 15:54:35
 */
const SwitchStatus_1 = __webpack_require__(/*! ./SwitchStatus */ "./build/main/entity/SwitchStatus.js");
/**
 * 智能插座
 */
class SwitchPlugStatus extends SwitchStatus_1.SwitchStatus {
    constructor(status, count) {
        super(status, count);
        this.state = ''; // 开关状态
        this.typeState = status.slice(0, 2);
        this.timeState = status.slice(2, 4);
        this.overloadPowerState = status.slice(6, 8);
        this.curPowerState = status.slice(8, 12);
        this.kWhState = status.slice(12, 16);
        this.state = status.slice(0, 2);
        this.extraCount = 0;
        this.extraState = '';
        this.extraKeyDots = [];
        this.keyDots = this.getKeyDots();
    }
    getKeyDots() {
        return this.__parseBitState(this.state, this._count, 1);
    }
    setExtraKeyDots(v, index) {
        console.log(v, index);
        return this;
    }
    /**
     * 获取按键值
     * @param index 索引
     */
    getExtraKeyDotByIndex(index) {
        console.log(index);
        return '';
    }
    getExtraState() {
        return '';
    }
}
exports.SwitchPlugStatus = SwitchPlugStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoUGx1Z1N0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdHkvU3dpdGNoUGx1Z1N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7R0FLRztBQUNILGlEQUE4QztBQUM5Qzs7R0FFRztBQUNILE1BQWEsZ0JBQWlCLFNBQVEsMkJBQVk7SUFVaEQsWUFBYSxNQUFjLEVBQUUsS0FBcUI7UUFDaEQsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQVZmLFVBQUssR0FBVyxFQUFFLENBQUMsQ0FBRSxPQUFPO1FBV2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUE7UUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDbEMsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFRCxlQUFlLENBQUUsQ0FBUyxFQUFFLEtBQWE7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDckIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gscUJBQXFCLENBQUUsS0FBYTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQTlDRCw0Q0E4Q0MifQ==

/***/ }),

/***/ "./build/main/entity/SwitchStatus.js":
/*!*******************************************!*\
  !*** ./build/main/entity/SwitchStatus.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-21 17:19:55
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchStatus = exports.OrderEnum = void 0;
const SwitchMixEquip_1 = __webpack_require__(/*! ../modules/SwitchMixEquip */ "./build/main/modules/SwitchMixEquip.js");
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
var OrderEnum;
(function (OrderEnum) {
    OrderEnum[OrderEnum["Primary"] = 0] = "Primary";
    OrderEnum[OrderEnum["Secondary"] = 1] = "Secondary";
})(OrderEnum = exports.OrderEnum || (exports.OrderEnum = {}));
/**
 * 开关 或 情景状态
 */
class SwitchStatus extends Status_1.Status {
    constructor(status, count, pattern) {
        super(status);
        this.state = '';
        this.pattern = ''; // 类型范式
        this.count = [1]; // 按键数列表 [3, 3] ---> 开关 3， 情景 3
        this.state = status.slice(0, 2) || '00';
        this.count = count || [1];
        this.pattern = pattern || '';
        this.keyDots = this.getKeyDots();
    }
    // 主程按键数，普通开关面板 -> 开关，情景 -> 情景， 混合 -> 情景
    get _count() {
        return this.count[OrderEnum.Primary];
    }
    get _pattern() {
        return this.pattern;
    }
    /**
     * 获取主程按键坑位，二进制码
     * 并获取按键正序
     * 情景 一个 bit 表示一个按键
     */
    getKeyDots() {
        const bit = SwitchMixEquip_1.ScenePatterns.includes(this.pattern) ? 1 : 2;
        return this.__parseBitState(this.state, this._count, bit);
    }
    /**
     * 设置按键值
     * @param v 二进制值
     * @param index 索引
     */
    setKeyDot(v, index) {
        if (index + 1 > this._count)
            return this;
        this.keyDots[index] = v.toEven();
        return this;
    }
    /**
     * 获取按键值
     * @param index 索引
     */
    getKeyDotByIndex(index) {
        if (index + 1 > this._count)
            return;
        return this.keyDots[index];
    }
    getState() {
        return this.state;
    }
}
exports.SwitchStatus = SwitchStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0eS9Td2l0Y2hTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7QUFFSCw4REFBMEQ7QUFDMUQscUNBQWtDO0FBRWxDLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNuQiwrQ0FBVyxDQUFBO0lBQ1gsbURBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUNEOztHQUVHO0FBQ0gsTUFBYSxZQUFhLFNBQVEsZUFBTTtJQUt0QyxZQUFhLE1BQWMsRUFBRSxLQUFxQixFQUFFLE9BQWdCO1FBQ2xFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUxSLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDMUIsWUFBTyxHQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU87UUFDN0IsVUFBSyxHQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFJcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUE7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDbEMsQ0FBQztJQUNELHdDQUF3QztJQUN4QyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxVQUFVO1FBQ1IsTUFBTSxHQUFHLEdBQUcsOEJBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFFLENBQVMsRUFBRSxLQUFhO1FBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNEOzs7T0FHRztJQUNILGdCQUFnQixDQUFFLEtBQWE7UUFDN0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTTtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztDQUNGO0FBakRELG9DQWlEQyJ9

/***/ }),

/***/ "./build/main/entity/WireConditionStatus.js":
/*!**************************************************!*\
  !*** ./build/main/entity/WireConditionStatus.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 18:04:29
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WireAirConditionModel = void 0;
const Status_1 = __webpack_require__(/*! ./Status */ "./build/main/entity/Status.js");
//  import { Converter } from '../utils/converter';
class WireAirConditionModel extends Status_1.Status {
    constructor(status) {
        super(status);
        this.temperature = ''; // 设置温度
        this.mode = ''; // 模式
        this.speed = ''; // 风速
        this.horizontalWing = ''; // 左右摆风
        this.verticalWing = ''; // 上下摆风
        this.power = ''; // 电源
        this.preserve = status.slice(0, 2);
        this.mode = status.slice(2, 4);
        this.power = status.slice(2, 4);
        this.speed = status.slice(4, 6);
        this.temperature = status.slice(6, 8);
        this.verticalWing = status.slice(8, 10);
        this.horizontalWing = status.slice(10, 12);
        this.roomTemp = status.slice(12, 14) || '32';
    }
    setTemperature(tmp) {
        this.temperature = tmp;
        return this;
    }
    getTemperature() {
        return this.temperature;
    }
    setMode(mode) {
        this.mode = mode;
        return this;
    }
    getMode() {
        return this.mode;
    }
    setSpeed(speed) {
        this.speed = speed;
        return this;
    }
    getSpeed() {
        return this.speed;
    }
    setHorizontalWing(wing) {
        this.horizontalWing = wing;
        return this;
    }
    getHorizontalWing() {
        return this.horizontalWing;
    }
    setVerticalWing(wing) {
        this.verticalWing = wing;
        return this;
    }
    getVerticalWing() {
        return this.verticalWing;
    }
    setPower(power) {
        this.power = power;
        return this;
    }
    getPower() {
        return this.power;
    }
}
exports.WireAirConditionModel = WireAirConditionModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lyZUNvbmRpdGlvblN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdHkvV2lyZUNvbmRpdGlvblN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7OztBQUVILHFDQUFpQztBQUVqQyxtREFBbUQ7QUFDbkQsTUFBYSxxQkFBc0IsU0FBUSxlQUFNO0lBVS9DLFlBQWEsTUFBYztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFWZixnQkFBVyxHQUFXLEVBQUUsQ0FBQSxDQUFDLE9BQU87UUFDaEMsU0FBSSxHQUFXLEVBQUUsQ0FBQSxDQUFDLEtBQUs7UUFDdkIsVUFBSyxHQUFXLEVBQUUsQ0FBQSxDQUFDLEtBQUs7UUFDeEIsbUJBQWMsR0FBVyxFQUFFLENBQUEsQ0FBQyxPQUFPO1FBQ25DLGlCQUFZLEdBQVcsRUFBRSxDQUFBLENBQUMsT0FBTztRQUNqQyxVQUFLLEdBQVcsRUFBRSxDQUFBLENBQUUsS0FBSztRQU12QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFBO0lBQzlDLENBQUM7SUFFRCxjQUFjLENBQUUsR0FBVztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtRQUN0QixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFDRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFDRCxPQUFPLENBQUUsSUFBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFDRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFDRCxRQUFRLENBQUUsS0FBYTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFDRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFDRCxpQkFBaUIsQ0FBRSxJQUFZO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO1FBQzFCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsZUFBZSxDQUFFLElBQVk7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDeEIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQ0QsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtJQUMxQixDQUFDO0lBQ0QsUUFBUSxDQUFFLEtBQWE7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFoRUQsc0RBZ0VDIn0=

/***/ }),

/***/ "./build/main/entity/sensor/HumiditySensorStatus.js":
/*!**********************************************************!*\
  !*** ./build/main/entity/sensor/HumiditySensorStatus.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HumiditySensorStatus = void 0;
const SensorStatus_1 = __webpack_require__(/*! ./SensorStatus */ "./build/main/entity/sensor/SensorStatus.js");
class HumiditySensorStatus extends SensorStatus_1.SensorStatus {
    constructor(status) {
        super(status);
        // 温度状态
        this.temperatureStatus = '';
        // 湿度状态
        this.humidityStatus = '';
        this.temperatureStatus = status.slice(2, 4);
        this.humidityStatus = status.slice(6, 8);
    }
    /**
     *
     * @param tmp 温度 十六进制
     */
    setTemperatureStatus(tmp) {
        this.temperatureStatus = tmp.toEvenHex();
        return this;
    }
    getTemperatureStatus() {
        return this.temperatureStatus;
    }
    setHumidityStatus(hum) {
        this.humidityStatus = hum.toEvenHex();
        return this;
    }
    getHumidityStatus() {
        return this.humidityStatus;
    }
}
exports.HumiditySensorStatus = HumiditySensorStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVtaWRpdHlTZW5zb3JTdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZW50aXR5L3NlbnNvci9IdW1pZGl0eVNlbnNvclN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBOEM7QUFFOUMsTUFBYSxvQkFBcUIsU0FBUSwyQkFBWTtJQUtwRCxZQUFZLE1BQWM7UUFDeEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTGhCLE9BQU87UUFDQSxzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDdEMsT0FBTztRQUNBLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxvQkFBb0IsQ0FBQyxHQUFXO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sb0JBQW9CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxHQUFXO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNNLGlCQUFpQjtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBOUJELG9EQThCQyJ9

/***/ }),

/***/ "./build/main/entity/sensor/SensorStatus.js":
/*!**************************************************!*\
  !*** ./build/main/entity/sensor/SensorStatus.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorStatus = void 0;
const Status_1 = __webpack_require__(/*! ../Status */ "./build/main/entity/Status.js");
class SensorStatus extends Status_1.Status {
    constructor(status) {
        super(status);
        // 常规状态
        this.normalStatus = '';
        // 常规传感器状态
        this.temperatureStatus = '';
        this.humidityStatus = '';
        this.pluginPowerStatus = '';
        this.normalStatus = status.slice(8, 10);
        this.pluginPowerStatus = status.slice(0, 2);
        this.temperatureStatus = status.slice(2, 4);
        this.humidityStatus = status.slice(6, 8);
    }
    setSensorNormalStatus(normal) {
        this.normalStatus = this.adaptHex(normal);
        return this;
    }
    getSensorNormalStatus() {
        return this.normalStatus;
    }
    getSensorCardStatus() {
        return this.pluginPowerStatus;
    }
    getSensorTemperatureStatus() {
        return this.temperatureStatus;
    }
    getSensorHumidityStatus() {
        return this.humidityStatus;
    }
}
exports.SensorStatus = SensorStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2VudGl0eS9zZW5zb3IvU2Vuc29yU3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFtQztBQUNuQyxNQUFhLFlBQWEsU0FBUSxlQUFNO0lBUXRDLFlBQVksTUFBYztRQUN4QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFSaEIsT0FBTztRQUNBLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQ2pDLFVBQVU7UUFDTSxzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBSTdDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxNQUFjO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDTSxxQkFBcUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDTSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUNNLDBCQUEwQjtRQUMvQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBQ00sdUJBQXVCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFoQ0Qsb0NBZ0NDIn0=

/***/ }),

/***/ "./build/main/index.js":
/*!*****************************!*\
  !*** ./build/main/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
__webpack_require__(/*! ./utils/string */ "./build/main/utils/string.js");
__exportStar(__webpack_require__(/*! ./utils/converter */ "./build/main/utils/converter.js"), exports);
__exportStar(__webpack_require__(/*! ./utils/Descriptor */ "./build/main/utils/Descriptor.js"), exports);
__exportStar(__webpack_require__(/*! ./utils/suiter */ "./build/main/utils/suiter.js"), exports);
__exportStar(__webpack_require__(/*! ./utils/typeHints */ "./build/main/utils/typeHints.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/BaseEquip */ "./build/main/modules/BaseEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/LampEquip */ "./build/main/modules/LampEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/LedLampEquip */ "./build/main/modules/LedLampEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/ControlLampEquip */ "./build/main/modules/ControlLampEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/AirConditionEquip */ "./build/main/modules/AirConditionEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/WireConditionEquip */ "./build/main/modules/WireConditionEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/HumidityEquip */ "./build/main/modules/HumidityEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SwitchEquip */ "./build/main/modules/SwitchEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SwitchMixEquip */ "./build/main/modules/SwitchMixEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SwitchPlugEquip */ "./build/main/modules/SwitchPlugEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SocketEquip */ "./build/main/modules/SocketEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/CurtainEquip */ "./build/main/modules/CurtainEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/CardPowerEquip */ "./build/main/modules/CardPowerEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorAcEquip */ "./build/main/modules/SensorAcEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorAcmanEquip */ "./build/main/modules/SensorAcmanEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorBedWetEquip */ "./build/main/modules/SensorBedWetEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorCallEquip */ "./build/main/modules/SensorCallEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorDoorEquip */ "./build/main/modules/SensorDoorEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorGasEquip */ "./build/main/modules/SensorGasEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorSmogEquip */ "./build/main/modules/SensorSmogEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorWaterEquip */ "./build/main/modules/SensorWaterEquip.js"), exports);
__exportStar(__webpack_require__(/*! ./modules/SensorEquip */ "./build/main/modules/SensorEquip.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLDBCQUF3QjtBQUN4QixvREFBa0M7QUFDbEMscURBQW1DO0FBQ25DLGlEQUErQjtBQUMvQixvREFBa0M7QUFFbEMsc0RBQW9DO0FBQ3BDLHNEQUFvQztBQUNwQyx5REFBdUM7QUFDdkMsNkRBQTJDO0FBQzNDLDhEQUE0QztBQUM1QywrREFBNkM7QUFDN0MsMERBQXdDO0FBQ3hDLHdEQUFzQztBQUN0QywyREFBeUM7QUFDekMsNERBQTBDO0FBQzFDLHdEQUFzQztBQUN0Qyx5REFBdUM7QUFDdkMsMkRBQXlDO0FBQ3pDLDBEQUF3QztBQUN4Qyw2REFBMkM7QUFDM0MsOERBQTJDO0FBQzNDLDREQUF5QztBQUN6Qyw0REFBeUM7QUFDekMsMkRBQXdDO0FBQ3hDLDREQUF5QztBQUN6Qyw2REFBMEM7QUFDMUMsd0RBQXFDIn0=

/***/ }),

/***/ "./build/main/modules/AirConditionEquip.js":
/*!*************************************************!*\
  !*** ./build/main/modules/AirConditionEquip.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-21 16:59:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 15:08:45
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirConditionEquip = exports.ConditionTempEnum = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const AirConditionModel_1 = __webpack_require__(/*! ../entity/AirConditionModel */ "./build/main/entity/AirConditionModel.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
var ConditionTempEnum;
(function (ConditionTempEnum) {
    ConditionTempEnum[ConditionTempEnum["default"] = 26] = "default";
    ConditionTempEnum[ConditionTempEnum["min"] = 16] = "min";
    ConditionTempEnum[ConditionTempEnum["max"] = 30] = "max";
})(ConditionTempEnum = exports.ConditionTempEnum || (exports.ConditionTempEnum = {}));
class AirConditionEquip extends BaseEquip_1.BaseEquip {
    /**
     * 红外空调
     * @param status          16进制状态字符串
     * @param deviceType      设备类型
     * @param deviceChildType 设备子类型
     * @param ac              空调对象信息
     */
    constructor(status = '', deviceType, deviceChildType, ac) {
        super(status, deviceType, deviceChildType);
        /** 模式_风速_温度_上下摆风_左右摆风_p0 */
        this.bytes = `{0}_{1}_{2}_{3}_{4}_p0`;
        /**
         * 空调实体对象
         */
        this.airModel = new AirConditionModel_1.AirConditionModel(status, ac);
        if (ac)
            this.airEntity = new AirConditionModel_1.AirConditionModel(status, ac);
        if (this.hasHorizontalSwing())
            this.setHorizontalWing(0);
        if (this.hasVerticalSwing())
            this.setVerticalWing(0);
        this.__init();
    }
    /**
     * 默认温度值
     */
    static get defaultTemp() {
        return ConditionTempEnum.default;
    }
    __init() {
        const keyValue = this.airModel.getKeyValue();
        if (!keyValue)
            return;
        if ([`${constant_1.PowerEnum.ON}`, `${constant_1.PowerEnum.OFF}`].includes(keyValue)) {
            this.setPower(keyValue === constant_1.PowerEnum.ON);
        }
        else {
            const keys = keyValue.split('_');
            if (keys.filter(i => i).length)
                this.airModel.setPower(constant_1.PowerEnum.ON);
            keys[0] && this.setMode(+this.getMode(keys[0]));
            keys[1] && this.setSpeed(+this.getSpeed(keys[1]));
            this.setTemperature(+this.getTemperature(new this.Converter(keys[2] ? keys[2] : `${AirConditionEquip.defaultTemp}`, 10).toHex()));
            keys[3] && this.setVerticalWing(+this.getVerticalWing(keys[3]));
            keys[4] && this.setHorizontalWing(+this.getHorizontalWing(keys[4]));
        }
    }
    /**
     * 是否红外
     */
    isInfrared() {
        return !this.status;
    }
    /**
     * 获取空调实体对象信息
     * @param ac 空调对象详情
     */
    getEntity(ac) {
        this.airEntity = new AirConditionModel_1.AirConditionModel(ac);
        return this.airEntity;
    }
    /**
     * 设置空调温度值
     * @param temp 十进制温度值
     */
    setTemperature(temp) {
        const temperature = temp < ConditionTempEnum.min ? temp + 1 : temp > ConditionTempEnum.max ? temp - 1 : temp;
        const tempHex = new this.Converter(`${temperature}`, 10).toHex();
        this.airModel.setTemperature(tempHex);
        return this;
    }
    /**
     * 获取空调温度值
     */
    getTemperature(v) {
        const temp = v || this.airModel.getTemperature();
        const tmepDecimal = new this.Converter(temp, 16).toDecimal();
        return tmepDecimal;
    }
    getTemperatureText() {
        const temp = this.getTemperature();
        return this.isPowerOn() ? `${temp}` : '--';
    }
    /**
     * 设置空调模式
     * @param mode 模式值（1 自动，2 制冷， 3 抽湿， 4 送风， 5 制热）
     */
    setMode(mode) {
        mode = mode > 5 ? constant_1.ModeEnum.AUTO : mode;
        this.airModel.setMode(constant_1.ModeMap[mode]);
        // 制冷、抽湿， 自动风， 否则 弱风
        this.setSpeed([constant_1.ModeEnum.AUTO, constant_1.ModeEnum.COLD, constant_1.ModeEnum.WEDY].includes(mode) ? constant_1.SpeedEnum.AUTO : constant_1.SpeedEnum.WEAK);
        // 自动、抽湿 无温度，否则默认温度
        if (![constant_1.ModeEnum.AUTO, constant_1.ModeEnum.WEDY].includes(mode)) {
            this.setTemperature(AirConditionEquip.defaultTemp);
        }
        return this;
    }
    /**
     * 获取空调模式键值: 0,1,2,3,4,5
     */
    getMode(v) {
        const mode = v || this.airModel.getMode();
        const modeKey = Object.keys(constant_1.ModeMap).find(key => constant_1.ModeMap[key] === mode);
        return modeKey || '';
    }
    /**
     * 获取空调模式值: a,r,d,w,h
     */
    getModeValue() {
        return this.airModel.getMode();
    }
    /**
     * 获取模式描述: 自动、制冷...
     */
    getModeText() {
        const mode = constant_1.ModeDescriptorMap[this.getMode()] || constant_1.ModeDescriptorMap[constant_1.ModeEnum.COLD];
        return this.isPowerOn() ? `${mode}` : '--';
    }
    /**
     * 设置风速
     * @param speed （0 自动， 1 弱， 2 中， 3 强）
     */
    setSpeed(speed) {
        this.airModel.setSpeed(constant_1.SpeedMap[speed > 3 ? constant_1.SpeedEnum.AUTO : speed]);
        return this;
    }
    /**
     * 获取风速键值: 0, 1,2,3
     */
    getSpeed(v) {
        const speed = v || this.airModel.getSpeed();
        const speedKey = Object.keys(constant_1.SpeedMap).find(key => constant_1.SpeedMap[key] === speed);
        return speedKey || '';
    }
    /**
     * 获取风速值: s0,s1,s2,s3
     */
    getSpeedValue() {
        return this.airModel.getSpeed();
    }
    getSpeedText() {
        const speed = constant_1.SpeedDescriptorMap[this.getSpeed()] || constant_1.SpeedDescriptorMap[constant_1.SpeedEnum.AUTO];
        return this.isPowerOn() ? `${speed}` : '--';
    }
    /**
     * 设置左右摆风
     * @param wing 0~1
     */
    setHorizontalWing(wing = 0) {
        this.airModel.setHorizontalWing(constant_1.HorizontalWingMap[wing > 1 ? constant_1.HWingEnum.OFF : wing]);
        if (wing === constant_1.HWingEnum.ON)
            this.setVerticalWing(constant_1.VWingEnum.OFF);
        return this;
    }
    /**
     * 获取左右摆风
     */
    getHorizontalWing(v) {
        const wing = v || this.airModel.getHorizontalWing();
        const wingKey = Object.keys(constant_1.HorizontalWingMap).find(key => constant_1.HorizontalWingMap[key] === wing);
        return wingKey || '';
    }
    getHorizontalWingValue() {
        return this.airModel.getHorizontalWing();
    }
    /**
     * 设置上下摆风
     * @param wing 0~1
     */
    setVerticalWing(wing = 0) {
        this.airModel.setVerticalWing(constant_1.VerticalWingMap[wing > 1 ? constant_1.VWingEnum.OFF : wing]);
        if (wing === constant_1.VWingEnum.ON)
            this.setHorizontalWing(constant_1.HWingEnum.OFF);
        return this;
    }
    getVerticalWing(v) {
        const wing = v || this.airModel.getVerticalWing();
        const wingKey = Object.keys(constant_1.VerticalWingMap).find(key => constant_1.VerticalWingMap[key] === wing);
        return wingKey || '';
    }
    getVerticalWingVlaue() {
        return this.airModel.getVerticalWing();
    }
    getWingText() {
        const w = constant_1.WingDescriptorMap[this.getHorizontalWingValue()] || constant_1.WingDescriptorMap[this.getVerticalWingVlaue()] || '--';
        return this.isPowerOn() ? `${w}` : '--';
    }
    /**
     * 启动电源
     * @param temp 温度
     * @param speed 风速
     * @param mode 模式
     */
    setPowerOn(temp = 26, speed = 0, mode = 1) {
        this.airModel.setPower(constant_1.PowerEnum.ON);
        this.setTemperature(temp).setSpeed(speed).setMode(mode);
        return this;
    }
    /**
     * 关闭电源
     */
    setPowerOff() {
        this.airModel.setPower(constant_1.PowerEnum.OFF);
        return this;
    }
    setPower(power) {
        return power ? this.setPowerOn() : this.setPowerOff();
    }
    /**
     * 获取电源值
     */
    getPower() {
        return this.airModel.getPower();
    }
    getPowerStatus() {
        return this.isPowerOn();
    }
    /**
     * 电源是否开启
     */
    isPowerOn() {
        return this.getPower() === constant_1.PowerEnum.ON;
    }
    /**
     * 温度是否可设置
     */
    isTemperatureValid() {
        return this.isPowerOn() && [`${constant_1.ModeEnum.COLD}`, `${constant_1.ModeEnum.HOT}`].includes(this.getMode());
    }
    /**
     * 风速是否可设置
     */
    isFanSpeedValid() {
        return this.isPowerOn() && [`${constant_1.ModeEnum.AUTO}`, `${constant_1.ModeEnum.COLD}`, `${constant_1.ModeEnum.HOT}`].includes(this.getMode());
    }
    isWingValid() {
        return this.isPowerOn() && [`${constant_1.ModeEnum.AUTO}`, `${constant_1.ModeEnum.COLD}`, `${constant_1.ModeEnum.HOT}`].includes(this.getMode());
    }
    /**
     * 是否有左右摆风
     * @param keys 空调按键列表
     */
    hasHorizontalSwing(keys = []) {
        const wingKeys = this.airEntity ? this.airEntity.getKeys() : keys;
        if (!wingKeys || !wingKeys.length)
            return false;
        const index = Array.from(wingKeys).findIndex(item => {
            const key = item.key;
            return key.includes('_') && ((key.includes('l0') || key.includes('l1')) && !key.includes('*'));
        });
        return index !== -1;
    }
    /**
     * 是否有上下摆风
     * @param keys 空调按键列表
     */
    hasVerticalSwing(keys = []) {
        const wingKeys = this.airEntity ? this.airEntity.getKeys() : keys;
        if (!wingKeys || !wingKeys.length)
            return false;
        const index = Array.from(wingKeys).findIndex(item => {
            const key = item.key;
            return key.includes('_') && ((key.includes('u0') || key.includes('u1')) && !key.includes('*'));
        });
        return index !== -1;
    }
    /**
     * 获取电源字节字符串
     */
    getPowerBytes() {
        return this.getPower();
    }
    getBytes() {
        const mode = this.getModeValue();
        const speed = this.getSpeedValue();
        const temperature = this.getTemperature();
        const vwing = this.getVerticalWingVlaue();
        const hwing = this.getHorizontalWingValue();
        return this.bytes.format(mode, speed, temperature, vwing, hwing);
    }
}
exports.AirConditionEquip = AirConditionEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlyQ29uZGl0aW9uRXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9BaXJDb25kaXRpb25FcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7OztBQUVILDJDQUF3QztBQUN4QyxtRUFBZ0U7QUFDaEUsaURBYTRCO0FBRTVCLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUMzQixnRUFBWSxDQUFBO0lBQ1osd0RBQVEsQ0FBQTtJQUNSLHdEQUFRLENBQUE7QUFDVixDQUFDLEVBSlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFJNUI7QUFFRCxNQUFhLGlCQUFrQixTQUFRLHFCQUFTO0lBTTlDOzs7Ozs7T0FNRztJQUNILFlBQWEsU0FBaUIsRUFBRSxFQUFFLFVBQW1CLEVBQUUsZUFBd0IsRUFBRSxFQUFRO1FBQ3ZGLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFBO1FBWDVDLDRCQUE0QjtRQUNYLFVBQUssR0FBRyx3QkFBd0IsQ0FBQztRQVdoRDs7V0FFRztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDakQsSUFBSSxFQUFFO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFDQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUUxRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4RCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFcEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUNEOztPQUVHO0lBQ0gsTUFBTSxLQUFLLFdBQVc7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

/***/ }),

/***/ "./build/main/modules/BaseEquip.js":
/*!*****************************************!*\
  !*** ./build/main/modules/BaseEquip.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEquip = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:47
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 15:11:24
 */
const suiter_1 = __importStar(__webpack_require__(/*! ../utils/suiter */ "./build/main/utils/suiter.js"));
const typeHints_1 = __webpack_require__(/*! ../utils/typeHints */ "./build/main/utils/typeHints.js");
const converter_1 = __webpack_require__(/*! ../utils/converter */ "./build/main/utils/converter.js");
class BaseEquip {
    /**
     * 套件基类
     * @param status 状态码
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        this.Suiter = {};
        this.SuitStatus = {};
        this.SuitTypes = {};
        this.deviceType = '';
        this.deviceChildType = '';
        this.status = '';
        this.Suiter = suiter_1.default;
        this.SuitStatus = suiter_1.SuitStatus;
        this.SuitTypes = suiter_1.SuitTypes;
        this.TypeHints = typeHints_1.TypeHints;
        this.Converter = converter_1.Converter;
        this.deviceType = deviceType;
        this.deviceChildType = deviceChildType;
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    getPrimaryStatusCode(mainDevType, status) {
        if (!mainDevType || !status) {
            console.warn('primary device type or status can not be empty!');
            return '';
        }
        return `${mainDevType}${status}`;
    }
    getSecondaryStatusCode(mainDevType, secondarySubType, status) {
        if (!mainDevType || !secondarySubType || !status) {
            console.warn('device type or status can not be empty!');
            return '';
        }
        return `${mainDevType}${secondarySubType}${status}`;
    }
    getDescriptorByCode(code) {
        if (!code) {
            console.warn('key code can not be empty!');
        }
        return this.SuitStatus[code];
    }
    getMainDescriptor(mainDevType, code) {
        return this.getDescriptorByCode(this.getPrimaryStatusCode(mainDevType, code));
    }
    getDescriptors(mainDevType, statusBitStr, separator = ',') {
        const descriptor = [];
        for (let i = statusBitStr.length; i > 0; i -= 2) {
            const statusBit = statusBitStr.slice(i - 2, i);
            descriptor.push(this.getDescriptorByCode(this.getPrimaryStatusCode(mainDevType, statusBit)));
        }
        return descriptor.join(separator);
    }
}
exports.BaseEquip = BaseEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvQmFzZUVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7R0FLRztBQUNILDBEQUFnRTtBQUNoRSxrREFBK0M7QUFDL0Msa0RBQStDO0FBQy9DLE1BQWEsU0FBUztJQVVwQjs7Ozs7T0FLRztJQUNILFlBQVksTUFBYyxFQUFFLFVBQW1CLEVBQUUsZUFBd0I7UUFmekQsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUlmLGVBQVUsR0FBdUIsRUFBRSxDQUFDO1FBQ3BDLG9CQUFlLEdBQXVCLEVBQUUsQ0FBQztRQUNsRCxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBUXpCLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxrQkFBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVNLG9CQUFvQixDQUFDLFdBQW1CLEVBQUUsTUFBYztRQUM3RCxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztZQUNoRSxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsT0FBTyxHQUFHLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sc0JBQXNCLENBQUMsV0FBbUIsRUFBRSxnQkFBd0IsRUFBRSxNQUFjO1FBQ3pGLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoRCxPQUFPLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDeEQsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sR0FBRyxXQUFXLEdBQUcsZ0JBQWdCLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVNLG1CQUFtQixDQUFDLElBQVk7UUFDckMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQVEsSUFBSSxDQUFDLFVBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsSUFBWTtRQUN4RCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FDN0MsQ0FBQztJQUNKLENBQUM7SUFFTSxjQUFjLENBQUMsV0FBbUIsRUFBRSxZQUFvQixFQUFFLFlBQW9CLEdBQUc7UUFDdEYsTUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDO1FBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9DLFVBQVUsQ0FBQyxJQUFJLENBQ2IsSUFBSSxDQUFDLG1CQUFtQixDQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUNsRCxDQUNGLENBQUM7U0FDSDtRQUNELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUF6RUQsOEJBeUVDIn0=

/***/ }),

/***/ "./build/main/modules/CardPowerEquip.js":
/*!**********************************************!*\
  !*** ./build/main/modules/CardPowerEquip.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPowerEquip = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:33:54
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-03 10:55:50
 */
const CardPowerStatus_1 = __webpack_require__(/*! ../entity/CardPowerStatus */ "./build/main/entity/CardPowerStatus.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
var CardStatus;
(function (CardStatus) {
    CardStatus["IN"] = "0";
    CardStatus["OUT"] = "1";
    CardStatus["OFF"] = "2";
})(CardStatus || (CardStatus = {}));
const CardStatusMap = {
    [CardStatus.IN]: '取电中',
    [CardStatus.OUT]: '拔卡',
    [CardStatus.OFF]: '断电'
};
var CardActionStatus;
(function (CardActionStatus) {
    CardActionStatus[CardActionStatus["ENABLE"] = 0] = "ENABLE";
    CardActionStatus[CardActionStatus["DISABLE"] = 1] = "DISABLE";
})(CardActionStatus || (CardActionStatus = {}));
/**
 * 插卡取电
 */
class CardPowerEquip extends BaseEquip_1.BaseEquip {
    /**
     * 插卡取电
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `{0}{1}{2}00000000000`;
        this.cardPowerStatus = new CardPowerStatus_1.CardPowerStatus(status);
    }
    /**
     * 获取状态字节串
     */
    getbytes() {
        return '';
    }
    getStatusDescriptor() {
        const status = new this.Converter(this.cardPowerStatus.state, 16).toDecimalNumber();
        return CardStatusMap[status];
    }
    getActionStatus() {
        const actionStatus = new this.Converter(this.cardPowerStatus.actionState, 2).toDecimalNumber();
        if (actionStatus === undefined || actionStatus === null)
            return 1;
        return actionStatus;
    }
}
exports.CardPowerEquip = CardPowerEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFBvd2VyRXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9DYXJkUG93ZXJFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7R0FLRztBQUNILCtEQUE0RDtBQUM1RCwyQ0FBd0M7QUFFeEMsSUFBSyxVQUlKO0FBSkQsV0FBSyxVQUFVO0lBQ2Isc0JBQVEsQ0FBQTtJQUNSLHVCQUFTLENBQUE7SUFDVCx1QkFBUyxDQUFBO0FBQ1gsQ0FBQyxFQUpJLFVBQVUsS0FBVixVQUFVLFFBSWQ7QUFFRCxNQUFNLGFBQWEsR0FBUTtJQUN6QixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLO0lBQ3RCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUk7SUFDdEIsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSTtDQUN2QixDQUFBO0FBRUQsSUFBSyxnQkFHSjtBQUhELFdBQUssZ0JBQWdCO0lBQ25CLDJEQUFVLENBQUE7SUFDViw2REFBVyxDQUFBO0FBQ2IsQ0FBQyxFQUhJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFHcEI7QUFFRDs7R0FFRztBQUNILE1BQWEsY0FBZSxTQUFRLHFCQUFTO0lBSTNDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcsc0JBQXNCLENBQUM7UUFVOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDbkYsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVELGVBQWU7UUFDYixNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDOUYsSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFlBQVksS0FBSyxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUE7UUFDakUsT0FBTyxZQUFZLENBQUE7SUFDckIsQ0FBQztDQUNGO0FBL0JELHdDQStCQyJ9

/***/ }),

/***/ "./build/main/modules/ControlLampEquip.js":
/*!************************************************!*\
  !*** ./build/main/modules/ControlLampEquip.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlLampEquip = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:54
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 14:12:11
 */
const LampEquip_1 = __webpack_require__(/*! ./LampEquip */ "./build/main/modules/LampEquip.js");
class ControlLampEquip extends LampEquip_1.LampEquip {
    /**
     * 遥控灯
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
    }
}
exports.ControlLampEquip = ControlLampEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbExhbXBFcXVpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL0NvbnRyb2xMYW1wRXF1aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0dBS0c7QUFDSCwyQ0FBd0M7QUFFeEMsTUFBYSxnQkFBaUIsU0FBUSxxQkFBUztJQUM3Qzs7Ozs7T0FLRztJQUNILFlBQVksTUFBYyxFQUFFLFVBQW1CLEVBQUUsZUFBd0I7UUFDdkUsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBVkQsNENBVUMifQ==

/***/ }),

/***/ "./build/main/modules/CurtainEquip.js":
/*!********************************************!*\
  !*** ./build/main/modules/CurtainEquip.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CurtainEquip = exports.CurtainStatusMap = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const CurtainStatus_1 = __webpack_require__(/*! ../entity/CurtainStatus */ "./build/main/entity/CurtainStatus.js");
/**
 * 操作枚举
 */
var CurtainStatusEnum;
(function (CurtainStatusEnum) {
    CurtainStatusEnum[CurtainStatusEnum["STOP"] = 0] = "STOP";
    CurtainStatusEnum[CurtainStatusEnum["PAUSE"] = 1] = "PAUSE";
    CurtainStatusEnum[CurtainStatusEnum["OPEN"] = 2] = "OPEN";
})(CurtainStatusEnum || (CurtainStatusEnum = {}));
// 操作值与描述映射表
exports.CurtainStatusMap = {
    [CurtainStatusEnum.STOP]: '关',
    [CurtainStatusEnum.PAUSE]: '暂停',
    [CurtainStatusEnum.OPEN]: '开'
};
// 值与索引对应表
const CurtainStatusBitMap = {
    [CurtainStatusEnum.STOP]: 2,
    [CurtainStatusEnum.PAUSE]: 1,
    [CurtainStatusEnum.OPEN]: 0
};
/**
 * 窗帘套件
 *
 * 使用示例：
 * ```js
 * const curtainEquip = new CurtainEquip(status, deviceType, deviceChildType)
 *
 * const statusBytes = curtainEquip.open().getBytes()
 * console.log(statusBytes)
 *
 * ```
 */
class CurtainEquip extends BaseEquip_1.BaseEquip {
    /**
     * 窗帘套件
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `{0}00000000000000`;
        this.curtainStatus = new CurtainStatus_1.CurtainStatus(status);
    }
    /**
     * 当前状态
     */
    get curStatus() {
        return this.curtainStatus.getStatus();
    }
    /**
     * 当前状态整型
     */
    get curStatusInt() {
        return +new this.Converter(this.curStatus, 16).toDecimal();
    }
    /**
     * 获取按键电源/活跃状态
     * [0, 1, 0] --> 开、停、关 --- 2、0、1 （power 值）
     */
    getPower() {
        const v = this.curStatusInt;
        let power = [0, 0, 0];
        if (v >= 0)
            power[CurtainStatusBitMap[v]] = 1;
        return power;
    }
    /**
     * 与SwitchMixEquip的方法保持一致
     * // bit [0, 1, 0] --> 开、停、关  ==> {1: 1}
     */
    getCurtainPowerInt() {
        const powerInts = this.getPower();
        const powerMap = { 0: 'ON', 1: 'PAUSE', 2: 'OFF' };
        let power = [];
        const defaultPower = [{ OFF: 0 }];
        power = powerInts.map((p, i) => { return p && { [powerMap[i]]: p }; }).filter((t) => t);
        return power.length ? power : defaultPower;
    }
    /**
     * 设置状态
     * @param status 状态值 （0 关， 1 暂停， 2 开）
     */
    setStatus(status) {
        if (status < 0 || status > 2)
            return console.warn('value should be between 0 and 2');
        this.curtainStatus.setStatus(new this.Converter(status.toString(), 10).toHex());
        return this;
    }
    /**
     * 开启
     */
    open() {
        return this.setStatus(CurtainStatusEnum.OPEN);
    }
    /**
     * 暂停
     */
    pause() {
        return this.setStatus(CurtainStatusEnum.PAUSE);
    }
    /**
     * 停止
     */
    stop() {
        return this.setStatus(CurtainStatusEnum.STOP);
    }
    /**
     * 获取窗帘状态
     */
    getStatusDescriptor() {
        return exports.CurtainStatusMap[this.curStatusInt] || '';
    }
    /**
     * 获取状态字节串
     */
    getBytes() {
        return this.bytes.format(this.curtainStatus.getStatus());
    }
}
exports.CurtainEquip = CurtainEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VydGFpbkVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvQ3VydGFpbkVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUF3QztBQUN4QywyREFBd0Q7QUFFdkQ7O0dBRUc7QUFDSCxJQUFLLGlCQUlMO0FBSkEsV0FBSyxpQkFBaUI7SUFDckIseURBQVEsQ0FBQTtJQUNSLDJEQUFTLENBQUE7SUFDVCx5REFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUpLLGlCQUFpQixLQUFqQixpQkFBaUIsUUFJdEI7QUFFRCxZQUFZO0FBQ0MsUUFBQSxnQkFBZ0IsR0FBTztJQUNsQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUc7SUFDN0IsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJO0lBQy9CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRztDQUM5QixDQUFBO0FBRUQsVUFBVTtBQUNWLE1BQU0sbUJBQW1CLEdBQU87SUFDOUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzNCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUM1QixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDNUIsQ0FBQTtBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBRUgsTUFBYSxZQUFhLFNBQVEscUJBQVM7SUFJekM7Ozs7O09BS0c7SUFDSCxZQUFZLE1BQWMsRUFBRSxVQUFtQixFQUFFLGVBQXdCO1FBQ3ZFLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBVDVCLFVBQUssR0FBRyxtQkFBbUIsQ0FBQztRQVUzQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNkJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJ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

/***/ }),

/***/ "./build/main/modules/HumidityEquip.js":
/*!*********************************************!*\
  !*** ./build/main/modules/HumidityEquip.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:37
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-29 15:09:48
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumidityEquip = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const HumiditySensorStatus_1 = __webpack_require__(/*! ../entity/sensor/HumiditySensorStatus */ "./build/main/entity/sensor/HumiditySensorStatus.js");
/**
 * 温湿度传感器
 *
 * 使用示例：
 *```js
 * import { HumidityEquip } from 'hardware-suit'
 * const humidity = new HumidityEquip(state)
 * console.log(`${humidity.getTemperature()}℃/${humidity.getHumidity()}%`)
 *```
 */
class HumidityEquip extends BaseEquip_1.BaseEquip {
    /**
     * 温湿度传感器
     * @param status        温湿度状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        // TODO
        this.bytes = `0000000000000000`;
        this.humidityStatus = new HumiditySensorStatus_1.HumiditySensorStatus(status);
    }
    /**
     * 设置温度
     * @param tmp 温度值
     */
    setTemperature(tmp) {
        const converter = new this.Converter(`${tmp}`, 10);
        this.humidityStatus.setTemperatureStatus(converter.toHex());
        return this;
    }
    /**
     * 获取温度
     */
    getTemperature() {
        const tmp = this.humidityStatus.getTemperatureStatus();
        const converter = new this.Converter(tmp, 16);
        return +converter.toDecimal() - 30;
    }
    setHumidity(hum) {
        const converter = new this.Converter(`${hum}`, 10);
        this.humidityStatus.setHumidityStatus(converter.toHex());
        return this;
    }
    /**
     * 获取湿度
     */
    getHumidity() {
        const hum = this.humidityStatus.getHumidityStatus();
        const converter = new this.Converter(hum, 16);
        return +converter.toDecimal();
    }
    getStatusDescriptor() {
        const temp = this.getTemperature();
        const hum = this.getHumidity();
        return `温度：${temp}℃ 湿度：${hum}%`;
    }
    // TODO
    getBytes() {
        return this.bytes;
    }
}
exports.HumidityEquip = HumidityEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVtaWRpdHlFcXVpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL0h1bWlkaXR5RXF1aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7QUFFSCwyQ0FBd0M7QUFDeEMsZ0ZBQTZFO0FBRTdFOzs7Ozs7Ozs7R0FTRztBQUNILE1BQWEsYUFBYyxTQUFRLHFCQUFTO0lBSzFDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVY3QyxPQUFPO1FBQ1UsVUFBSyxHQUFHLGtCQUFrQixDQUFDO1FBVTFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksY0FBYyxDQUFDLEdBQVc7UUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRDs7T0FFRztJQUNJLGNBQWM7UUFDbkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3ZELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDcEMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxHQUFXO1FBQzVCLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxXQUFXO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNwRCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNNLG1CQUFtQjtRQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDbEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzlCLE9BQU8sTUFBTSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUE7SUFDakMsQ0FBQztJQUNELE9BQU87SUFDQSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQXhERCxzQ0F3REMifQ==

/***/ }),

/***/ "./build/main/modules/LampEquip.js":
/*!*****************************************!*\
  !*** ./build/main/modules/LampEquip.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LampEquip = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
class LampEquip extends BaseEquip_1.BaseEquip {
    /**
     * 灯套件
     * @param status 状态
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
    }
}
exports.LampEquip = LampEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtcEVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvTGFtcEVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF3QztBQUV4QyxNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUN0Qzs7Ozs7T0FLRztJQUNILFlBQVksTUFBYyxFQUFFLFVBQW1CLEVBQUUsZUFBd0I7UUFDdkUsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBVkQsOEJBVUMifQ==

/***/ }),

/***/ "./build/main/modules/LedLampEquip.js":
/*!********************************************!*\
  !*** ./build/main/modules/LedLampEquip.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * @Author: eamiear
 * @Date: 2020-08-20 16:08:49
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-28 18:36:24
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedLampEquip = void 0;
const LampEquip_1 = __webpack_require__(/*! ./LampEquip */ "./build/main/modules/LampEquip.js");
const LampStatus_1 = __webpack_require__(/*! ../entity/LampStatus */ "./build/main/entity/LampStatus.js");
/**
 * LED 灯（单色灯、双色灯）
 *
 * **使用示例**
 *```js
 * const ledLampEquip = new LedLampEquip(status, deviceType, deviceChildType)
 * this.power = ledLampEquip.isPowerOn()
 *
 * const statusBytes = this.ledLampEquip.setBrightness(50).setColdColor(30).getBytes()
 * console.log(statusBytes)
 * ```
 */
class LedLampEquip extends LampEquip_1.LampEquip {
    /**
     * LED 灯（单色灯、双色灯）
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `{0}{1}{2}0000000200`;
        this.lampStatus = new LampStatus_1.LampStatus(status);
    }
    /**
     * 是否双色灯
     */
    isBicolor() {
        // return this.lampStatus.getColdColorStatus() !== '00';
        return this.TypeHints.isBicolorLed(this.deviceChildType, this.deviceType);
    }
    /**
     * 是否单色灯
     */
    isPlainColor() {
        return this.TypeHints.isPlainLed(this.deviceChildType, this.deviceType);
    }
    /**
     * 是否三色灯
     */
    isTriColor() {
        return this.TypeHints.isTricolorLed(this.deviceChildType, this.deviceType);
    }
    /**
     * 电源是否启动
     */
    isPowerOn() {
        return this.getBrightness() > 0;
    }
    /**
     * 设置亮度值
     * @param value 亮度值（0~100）
     */
    setBrightness(value) {
        if (value < 0 || value > 100) {
            console.warn('value should be 0 ~ 100');
            return this;
        }
        const converter = new this.Converter(`${value + 154}`, 10);
        const status = value === 0 ? '00' : converter.toHex();
        this.lampStatus.setBrightnessStatus(status);
        return this;
    }
    /**
     * 获取亮度值
     */
    getBrightness() {
        const bright = this.lampStatus.getBrightnessStatus() || 0;
        const converter = new this.Converter(`${bright}`, 16);
        const val = +converter.toDecimal() - 154;
        return bright ? val < 0 ? 0 : val : 0;
    }
    /**
     * 设置冷色温值
     * @param value 冷色值
     */
    setColdColor(value) {
        if (value < 0 || value > 255) {
            console.warn('value should be 0 ~ 255');
            return this;
        }
        // const colorValue = 255 - Math.round(value * 2.55);
        const converter = new this.Converter(`${value}`, 10);
        this.lampStatus.setColdColorStatus(converter.toHex());
        return this;
    }
    /**
     * 获取冷色温
     */
    getColdColor() {
        const colorValue = this.lampStatus.getColdColorStatus() || 0;
        const converter = new this.Converter(`${colorValue}`, 16);
        // return 100 - Math.round(+converter.toDecimal() / 2.55);
        return +converter.toDecimal();
    }
    /**
     * 设置暖色值
     */
    setWarmColor() {
        this.lampStatus.setWarmColorStatus(this.isBicolor() ? 'ff' : '00');
        return this;
    }
    /**
     * 获取暖色温
     */
    getWarmColor() {
        this.setWarmColor();
        return this.lampStatus.getWarmColorStatus();
    }
    /**
     * 获取关灯字节状态字符串
     */
    getTurnOffBytes() {
        return this.setBrightness(0)
            .setColdColor(0)
            .setWarmColor()
            .getBytes();
    }
    /**
     * 获取关灯字节状态字符串
     * @param bright 亮度
     * @param cold 冷色值
     */
    getTurnOnBytes(bright, cold) {
        return this.setBrightness(bright || 100)
            .setColdColor(cold || 0)
            .setWarmColor()
            .getBytes();
    }
    /**
     * 获取灯异常状态
     */
    getLampExceptionStatus() {
        // 01,02,03 十六机制
        // 00000001 00000010 00000011
        const bytes = this.lampStatus.getExceptionStatus();
        // const bits = exception.split('')
        if (!bytes || !bytes.length)
            return '无异常';
        // return bits[0] === '1' ? '开路' : bits[1] === '1' ? '短路' : '无异常'
        const bytesMap = {
            '01': '开路',
            '02': '短路',
            '03': '异常'
        };
        return bytesMap[bytes] || '无异常';
    }
    /**
     * 获取状态描述
     */
    getStatusDescriptor() {
        const bright = this.getBrightness();
        if (this.isPlainColor()) { // 单色灯
            return bright ? '开' : '关';
        }
        if (this.isBicolor()) { // 双色灯
            const cold = this.getColdColor();
            // return bright ? `开 - （亮度:${bright}，冷色:${cold}）` : '关'
            return bright ? `开` : '关';
        }
        if (this.isTriColor()) { // 三色灯
            const cold = this.getColdColor();
            const warm = this.getWarmColor();
            // return bright ? `开 - （亮度:${bright}，冷色:${cold}，暖色:${warm}）` : '关'
            return bright ? `开` : '关';
        }
        return '';
    }
    /**
     * 获取设备字节状态字符串
     */
    getBytes() {
        const bright = this.lampStatus.getBrightnessStatus();
        const coldColor = this.lampStatus.getColdColorStatus();
        const warmColor = this.lampStatus.getWarmColorStatus();
        return this.bytes.format(bright, coldColor, warmColor);
    }
}
exports.LedLampEquip = LedLampEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVkTGFtcEVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvTGVkTGFtcEVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7O0FBRUgsMkNBQXdDO0FBQ3hDLHFEQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQWEsWUFBYSxTQUFRLHFCQUFTO0lBSXpDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcscUJBQXFCLENBQUM7UUFVN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNEOztPQUVHO0lBQ0ksU0FBUztRQUNkLHdEQUF3RDtRQUN4RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFDRDs7T0FFRztJQUNJLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1RSxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFDRDs7O09BR0c7SUFDSSxhQUFhLENBQUMsS0FBYTtRQUNoQyxJQUFJ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

/***/ }),

/***/ "./build/main/modules/SensorAcEquip.js":
/*!*********************************************!*\
  !*** ./build/main/modules/SensorAcEquip.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorAcEquip = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const SensorAcStatus_1 = __webpack_require__(/*! ../entity/SensorAcStatus */ "./build/main/entity/SensorAcStatus.js");
/**
 * 操作枚举
 */
var SensorAcStatusEnum;
(function (SensorAcStatusEnum) {
    SensorAcStatusEnum[SensorAcStatusEnum["NONE"] = 0] = "NONE";
    SensorAcStatusEnum[SensorAcStatusEnum["PEOPLE"] = 1] = "PEOPLE";
})(SensorAcStatusEnum || (SensorAcStatusEnum = {}));
const SensorAcStatusMap = {
    [SensorAcStatusEnum.NONE]: '无人',
    [SensorAcStatusEnum.PEOPLE]: '有人',
};
/**
 * AC人体红外
 *
 * 使用示例：
 * ```js
 * const SensorAcEquip = new SensorAcEquip(status, deviceType, deviceChildType)
 *
 * const statusBytes = SensorAcEquip.getStatusDescriptor()
 *
 * ```
 */
class SensorAcEquip extends BaseEquip_1.BaseEquip {
    /**
     * AC人体红外
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `00{0}000000000000`;
        this.SensorAcStatus = new SensorAcStatus_1.SensorAcStatus(status);
    }
    /**
     * 当前状态
     */
    get curStatus() {
        return this.SensorAcStatus.getStatus();
    }
    /**
     * 当前状态整型
     */
    get curStatusInt() {
        return +new this.Converter(this.curStatus, 16).toDecimal() ? 1 : 0;
    }
    /**
     * 获取窗帘状态
     */
    getStatusDescriptor() {
        return SensorAcStatusMap[this.curStatusInt] || '';
    }
    /**
     * 获取状态字节串
     */
    getBytes() {
        return this.bytes.format(this.SensorAcStatus.getStatus());
    }
}
exports.SensorAcEquip = SensorAcEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yQWNFcXVpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL1NlbnNvckFjRXF1aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXdDO0FBQ3hDLDZEQUEwRDtBQUV6RDs7R0FFRztBQUNILElBQUssa0JBR0w7QUFIQSxXQUFLLGtCQUFrQjtJQUN0QiwyREFBUSxDQUFBO0lBQ1IsK0RBQVUsQ0FBQTtBQUNaLENBQUMsRUFISyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBR3ZCO0FBRUQsTUFBTSxpQkFBaUIsR0FBTztJQUM1QixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUk7SUFDL0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJO0NBQ2xDLENBQUE7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBYSxhQUFjLFNBQVEscUJBQVM7SUFJMUM7Ozs7O09BS0c7SUFDSCxZQUFZLE1BQWMsRUFBRSxVQUFtQixFQUFFLGVBQXdCO1FBQ3ZFLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBVDVCLFVBQUssR0FBRyxtQkFBbUIsQ0FBQztRQVUzQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ25ELENBQUM7SUFDRDs7T0FFRztJQUNJLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0NBQ0Y7QUF6Q0Qsc0NBeUNDIn0=

/***/ }),

/***/ "./build/main/modules/SensorAcmanEquip.js":
/*!************************************************!*\
  !*** ./build/main/modules/SensorAcmanEquip.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorAcmanEquip = void 0;
const SensorAcmanStatus_1 = __webpack_require__(/*! ../entity/SensorAcmanStatus */ "./build/main/entity/SensorAcmanStatus.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
class SensorAcmanEquip extends BaseEquip_1.BaseEquip {
    /**
     * AC人体红外 + 光感
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorAcStatus = new SensorAcmanStatus_1.SensorAcmanStatus(status);
    }
}
exports.SensorAcmanEquip = SensorAcmanEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yQWNtYW5FcXVpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL1NlbnNvckFjbWFuRXF1aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUVBQWdFO0FBQ2hFLDJDQUF3QztBQUV4QyxNQUFhLGdCQUFpQixTQUFRLHFCQUFTO0lBSTdDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFVMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFDQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRjtBQWRELDRDQWNDIn0=

/***/ }),

/***/ "./build/main/modules/SensorBedWetEquip.js":
/*!*************************************************!*\
  !*** ./build/main/modules/SensorBedWetEquip.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorBedWetEquip = void 0;
const SensorDetectStatus_1 = __webpack_require__(/*! ../entity/SensorDetectStatus */ "./build/main/entity/SensorDetectStatus.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const SensorDetectPowerStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE]: '无尿床',
    [constant_1.SensorDetectStatusEnum.ON]: '尿床'
};
const SensorDetectAwakeStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
    [constant_1.SensorDetectStatusEnum.AWAKE]: '唤醒'
};
const SensorDetectKeyStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_KEY]: '无按键',
    [constant_1.SensorDetectStatusEnum.KEY]: '按键'
};
class SensorBedWetEquip extends BaseEquip_1.BaseEquip {
    /**
     * 尿床
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorDetectStatus = new SensorDetectStatus_1.SensorDetectStatus(status);
    }
    // 获取事件类型
    getEventStatusDescriptor() {
        const state = this.sensorDetectStatus.getStatus();
        const stateBits = this.sensorDetectStatus.parseBitState(state, 2);
        const power = SensorDetectPowerStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()];
        const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()];
        const key = SensorDetectKeyStatusMap[new this.Converter(stateBits[2], 2).toDecimalNumber()];
        return [power, awake, key];
    }
    // 获取电压
    getVolStatusDescriptor() {
        const state = this.sensorDetectStatus.getVolStatus();
        const vol = new this.Converter(state, 16).toDecimalNumber();
        return constant_1.SensorDoorVolMap[vol] || '';
    }
    /**
     * 获取状态描述
     */
    getStatusDescriptor() {
        const status = this.getEventStatusDescriptor();
        return status[0];
    }
}
exports.SensorBedWetEquip = SensorBedWetEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yQmVkV2V0RXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9TZW5zb3JCZWRXZXRFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBa0U7QUFDbEUsaURBQThFO0FBQzlFLDJDQUF3QztBQUV4QyxNQUFNLDBCQUEwQixHQUFPO0lBQ3JDLENBQUMsaUNBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSztJQUNwQyxDQUFDLGlDQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7Q0FDbEMsQ0FBQTtBQUNELE1BQU0sMEJBQTBCLEdBQVE7SUFDdEMsQ0FBQyxpQ0FBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLO0lBQzFDLENBQUMsaUNBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtDQUNyQyxDQUFBO0FBQ0QsTUFBTSx3QkFBd0IsR0FBUTtJQUNwQyxDQUFDLGlDQUFzQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUs7SUFDeEMsQ0FBQyxpQ0FBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJO0NBQ25DLENBQUE7QUFFRCxNQUFhLGlCQUFrQixTQUFRLHFCQUFTO0lBRzlDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFVMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVM7SUFDVCx3QkFBd0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvRixNQUFNLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDL0YsTUFBTSxHQUFHLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQzNGLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxPQUFPO0lBQ1Asc0JBQXNCO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQzNELE9BQU8sMkJBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3BDLENBQUM7SUFDRDs7T0FFRztJQUNILG1CQUFtQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUFwQ0QsOENBb0NDIn0=

/***/ }),

/***/ "./build/main/modules/SensorCallEquip.js":
/*!***********************************************!*\
  !*** ./build/main/modules/SensorCallEquip.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorCallEquip = void 0;
const SensorDetectStatus_1 = __webpack_require__(/*! ../entity/SensorDetectStatus */ "./build/main/entity/SensorDetectStatus.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
// 事件
const SensorDetectPowerStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE]: '无呼叫',
    [constant_1.SensorDetectStatusEnum.ON]: '呼叫'
};
const SensorDetectAwakeStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
    [constant_1.SensorDetectStatusEnum.AWAKE]: '唤醒'
};
class SensorCallEquip extends BaseEquip_1.BaseEquip {
    /**
     * 一键呼叫
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorDetectStatus = new SensorDetectStatus_1.SensorDetectStatus(status);
    }
    // 获取事件类型
    getEventStatusDescriptor() {
        const state = this.sensorDetectStatus.getStatus();
        const stateBits = this.sensorDetectStatus.parseBitState(state, 2);
        const power = SensorDetectPowerStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()];
        const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()];
        return [power, awake];
    }
    // 获取电压
    getVolStatusDescriptor() {
        const state = this.sensorDetectStatus.getVolStatus();
        const vol = new this.Converter(state, 16).toDecimalNumber();
        return constant_1.SensorDoorVolMap[vol] || '';
    }
    getStatusDescriptor() {
        const status = this.getEventStatusDescriptor();
        return status[0];
    }
}
exports.SensorCallEquip = SensorCallEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yQ2FsbEVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvU2Vuc29yQ2FsbEVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFrRTtBQUNsRSxpREFBOEU7QUFDOUUsMkNBQXdDO0FBRXhDLEtBQUs7QUFDTCxNQUFNLDBCQUEwQixHQUFPO0lBQ3JDLENBQUMsaUNBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSztJQUNwQyxDQUFDLGlDQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7Q0FDbEMsQ0FBQTtBQUNELE1BQU0sMEJBQTBCLEdBQVE7SUFDdEMsQ0FBQyxpQ0FBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLO0lBQzFDLENBQUMsaUNBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtDQUNyQyxDQUFBO0FBRUQsTUFBYSxlQUFnQixTQUFRLHFCQUFTO0lBRzVDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFVMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVM7SUFDVCx3QkFBd0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvRixNQUFNLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDL0YsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0QsT0FBTztJQUNQLHNCQUFzQjtRQUNwQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUMzRCxPQUFPLDJCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsbUJBQW1CO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1FBQzlDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQWhDRCwwQ0FnQ0MifQ==

/***/ }),

/***/ "./build/main/modules/SensorDoorEquip.js":
/*!***********************************************!*\
  !*** ./build/main/modules/SensorDoorEquip.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDoorEquip = void 0;
const SensorDetectStatus_1 = __webpack_require__(/*! ../entity/SensorDetectStatus */ "./build/main/entity/SensorDetectStatus.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
// 事件
const SensorDetectPowerStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE]: '关闭',
    [constant_1.SensorDetectStatusEnum.ON]: '打开'
};
const SensorDetectAwakeStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
    [constant_1.SensorDetectStatusEnum.AWAKE]: '唤醒'
};
const SensorDetectKeyStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_KEY]: '无按键',
    [constant_1.SensorDetectStatusEnum.KEY]: '按键'
};
class SensorDoorEquip extends BaseEquip_1.BaseEquip {
    /**
     * 门窗磁
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorDetectStatus = new SensorDetectStatus_1.SensorDetectStatus(status);
    }
    // 获取事件类型
    getEventStatusDescriptor() {
        const state = this.sensorDetectStatus.getStatus();
        const stateBits = this.sensorDetectStatus.parseBitState(state, 3);
        const power = SensorDetectPowerStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()];
        const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()];
        const key = SensorDetectKeyStatusMap[new this.Converter(stateBits[2], 2).toDecimalNumber()];
        return [power, awake, key];
    }
    // 获取电压
    getVolStatusDescriptor() {
        const state = this.sensorDetectStatus.getVolStatus();
        const vol = new this.Converter(state, 16).toDecimalNumber();
        return constant_1.SensorDoorVolMap[vol] || '';
    }
    getStatusDescriptor() {
        const status = this.getEventStatusDescriptor();
        return status[0];
    }
}
exports.SensorDoorEquip = SensorDoorEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yRG9vckVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvU2Vuc29yRG9vckVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFrRTtBQUNsRSxpREFBOEU7QUFDOUUsMkNBQXdDO0FBRXhDLEtBQUs7QUFDTCxNQUFNLDBCQUEwQixHQUFPO0lBQ3JDLENBQUMsaUNBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSTtJQUNuQyxDQUFDLGlDQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7Q0FDbEMsQ0FBQTtBQUNELE1BQU0sMEJBQTBCLEdBQVE7SUFDdEMsQ0FBQyxpQ0FBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLO0lBQzFDLENBQUMsaUNBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtDQUNyQyxDQUFBO0FBQ0QsTUFBTSx3QkFBd0IsR0FBUTtJQUNwQyxDQUFDLGlDQUFzQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUs7SUFDeEMsQ0FBQyxpQ0FBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJO0NBQ25DLENBQUE7QUFFRCxNQUFhLGVBQWdCLFNBQVEscUJBQVM7SUFHNUM7Ozs7O09BS0c7SUFDSCxZQUFZLE1BQWMsRUFBRSxVQUFtQixFQUFFLGVBQXdCO1FBQ3ZFLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBVDVCLFVBQUssR0FBRyxrQkFBa0IsQ0FBQztRQVUxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsU0FBUztJQUNULHdCQUF3QjtRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDakQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDakUsTUFBTSxLQUFLLEdBQUcsMEJBQTBCLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQy9GLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvRixNQUFNLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDM0YsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELE9BQU87SUFDUCxzQkFBc0I7UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDM0QsT0FBTywyQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDcEMsQ0FBQztJQUNELG1CQUFtQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUFqQ0QsMENBaUNDIn0=

/***/ }),

/***/ "./build/main/modules/SensorEquip.js":
/*!*******************************************!*\
  !*** ./build/main/modules/SensorEquip.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorEquip = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const SensorBedWetEquip_1 = __webpack_require__(/*! ./SensorBedWetEquip */ "./build/main/modules/SensorBedWetEquip.js");
const SensorCallEquip_1 = __webpack_require__(/*! ./SensorCallEquip */ "./build/main/modules/SensorCallEquip.js");
const SensorDoorEquip_1 = __webpack_require__(/*! ./SensorDoorEquip */ "./build/main/modules/SensorDoorEquip.js");
const SensorGasEquip_1 = __webpack_require__(/*! ./SensorGasEquip */ "./build/main/modules/SensorGasEquip.js");
const SensorSmogEquip_1 = __webpack_require__(/*! ./SensorSmogEquip */ "./build/main/modules/SensorSmogEquip.js");
const SensorWaterEquip_1 = __webpack_require__(/*! ./SensorWaterEquip */ "./build/main/modules/SensorWaterEquip.js");
class SensorEquip extends BaseEquip_1.BaseEquip {
    /**
     * 传感类工厂函数
     * @param status 状态字符串
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     *
     * @example
     *
     * const factory = new SensorEquip(status, device, deviceChildType)
     * const equip = factory.create()
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.equip = {};
    }
    create() {
        let equip = {};
        if (this.TypeHints.isBedwetSensors(this.deviceChildType, this.deviceType)) {
            equip = new SensorBedWetEquip_1.SensorBedWetEquip(this.status, this.deviceType, this.deviceChildType);
        }
        else if (this.TypeHints.isCallSensors(this.deviceChildType, this.deviceType)) {
            equip = new SensorCallEquip_1.SensorCallEquip(this.status, this.deviceType, this.deviceChildType);
        }
        else if (this.TypeHints.isDoorSensors(this.deviceChildType, this.deviceType)) {
            equip = new SensorDoorEquip_1.SensorDoorEquip(this.status, this.deviceType, this.deviceChildType);
        }
        else if (this.TypeHints.isGasSensors(this.deviceChildType, this.deviceType)) {
            equip = new SensorGasEquip_1.SensorGasEquip(this.status, this.deviceType, this.deviceChildType);
        }
        else if (this.TypeHints.isSmogSensors(this.deviceChildType, this.deviceType)) {
            equip = new SensorSmogEquip_1.SensorSmogEquip(this.status, this.deviceType, this.deviceChildType);
        }
        else if (this.TypeHints.isWaterSensors(this.deviceChildType, this.deviceType)) {
            equip = new SensorWaterEquip_1.SensorWaterEquip(this.status, this.deviceType, this.deviceChildType);
        }
        return this.equip = equip;
    }
}
exports.SensorEquip = SensorEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yRXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9TZW5zb3JFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBd0M7QUFDeEMsMkRBQXdEO0FBQ3hELHVEQUFvRDtBQUNwRCx1REFBb0Q7QUFDcEQscURBQWtEO0FBQ2xELHVEQUFvRDtBQUNwRCx5REFBc0Q7QUFFdEQsTUFBYSxXQUFZLFNBQVEscUJBQVM7SUFHeEM7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksTUFBYyxFQUFFLFVBQW1CLEVBQUUsZUFBd0I7UUFDdkUsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFiNUMsVUFBSyxHQUFRLEVBQUUsQ0FBQztJQWNoQixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQTtRQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pFLEtBQUssR0FBRyxJQUFJLHFDQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7U0FDbEY7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlFLEtBQUssR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUNoRjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUUsS0FBSyxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1NBQ2hGO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3RSxLQUFLLEdBQUcsSUFBSSwrQkFBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7U0FDL0U7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlFLEtBQUssR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUNoRjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0UsS0FBSyxHQUFHLElBQUksbUNBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUNqRjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDM0IsQ0FBQztDQUNGO0FBbENELGtDQWtDQyJ9

/***/ }),

/***/ "./build/main/modules/SensorGasEquip.js":
/*!**********************************************!*\
  !*** ./build/main/modules/SensorGasEquip.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorGasEquip = void 0;
const SensorDetectStatus_1 = __webpack_require__(/*! ../entity/SensorDetectStatus */ "./build/main/entity/SensorDetectStatus.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
// 事件
const SensorDetectPowerStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE]: '无燃气',
    [constant_1.SensorDetectStatusEnum.ON]: '燃气报警'
};
const SensorDetectAwakeStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
    [constant_1.SensorDetectStatusEnum.AWAKE]: '唤醒'
};
class SensorGasEquip extends BaseEquip_1.BaseEquip {
    /**
     * 燃气传感器
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorDetectStatus = new SensorDetectStatus_1.SensorDetectStatus(status);
    }
    // 获取事件类型
    getEventStatusDescriptor() {
        const state = this.sensorDetectStatus.getStatus();
        const stateBits = this.sensorDetectStatus.parseBitState(state, 3);
        const power = SensorDetectPowerStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()];
        const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()];
        return [power, awake];
    }
    // 获取电压
    getVolStatusDescriptor() {
        const state = this.sensorDetectStatus.getVolStatus();
        const vol = new this.Converter(state, 16).toDecimalNumber();
        return constant_1.SensorDoorVolMap[vol] || '';
    }
    getStatusDescriptor() {
        const status = this.getEventStatusDescriptor();
        return status[0];
    }
}
exports.SensorGasEquip = SensorGasEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yR2FzRXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9TZW5zb3JHYXNFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBa0U7QUFDbEUsaURBQThFO0FBQzlFLDJDQUF3QztBQUV4QyxLQUFLO0FBQ0wsTUFBTSwwQkFBMEIsR0FBTztJQUNyQyxDQUFDLGlDQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUs7SUFDcEMsQ0FBQyxpQ0FBc0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNO0NBQ3BDLENBQUE7QUFDRCxNQUFNLDBCQUEwQixHQUFRO0lBQ3RDLENBQUMsaUNBQXNCLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSztJQUMxQyxDQUFDLGlDQUFzQixDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUk7Q0FDckMsQ0FBQTtBQUVELE1BQWEsY0FBZSxTQUFRLHFCQUFTO0lBRzNDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFVMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVM7SUFDVCx3QkFBd0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvRixNQUFNLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDL0YsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0QsT0FBTztJQUNQLHNCQUFzQjtRQUNwQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUMzRCxPQUFPLDJCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsbUJBQW1CO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1FBQzlDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQWhDRCx3Q0FnQ0MifQ==

/***/ }),

/***/ "./build/main/modules/SensorSmogEquip.js":
/*!***********************************************!*\
  !*** ./build/main/modules/SensorSmogEquip.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorSmogEquip = void 0;
const SensorDetectStatus_1 = __webpack_require__(/*! ../entity/SensorDetectStatus */ "./build/main/entity/SensorDetectStatus.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
// 事件
const SensorDetectPowerStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE]: '无烟雾',
    [constant_1.SensorDetectStatusEnum.ON]: '烟雾报警'
};
const SensorDetectAwakeStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
    [constant_1.SensorDetectStatusEnum.AWAKE]: '唤醒'
};
class SensorSmogEquip extends BaseEquip_1.BaseEquip {
    /**
     * 烟感传感器
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorDetectStatus = new SensorDetectStatus_1.SensorDetectStatus(status);
    }
    // 获取事件类型
    getEventStatusDescriptor() {
        const state = this.sensorDetectStatus.getStatus();
        const stateBits = this.sensorDetectStatus.parseBitState(state, 3);
        const power = SensorDetectPowerStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()];
        const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()];
        return [power, awake];
    }
    // 获取电压
    getVolStatusDescriptor() {
        const state = this.sensorDetectStatus.getVolStatus();
        const vol = new this.Converter(state, 16).toDecimalNumber();
        return constant_1.SensorDoorVolMap[vol] || '';
    }
    getStatusDescriptor() {
        const status = this.getEventStatusDescriptor();
        return status[0];
    }
}
exports.SensorSmogEquip = SensorSmogEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yU21vZ0VxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvU2Vuc29yU21vZ0VxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFrRTtBQUNsRSxpREFBOEU7QUFDOUUsMkNBQXdDO0FBRXhDLEtBQUs7QUFDTCxNQUFNLDBCQUEwQixHQUFPO0lBQ3JDLENBQUMsaUNBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSztJQUNwQyxDQUFDLGlDQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU07Q0FDcEMsQ0FBQTtBQUNELE1BQU0sMEJBQTBCLEdBQVE7SUFDdEMsQ0FBQyxpQ0FBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLO0lBQzFDLENBQUMsaUNBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtDQUNyQyxDQUFBO0FBR0QsTUFBYSxlQUFnQixTQUFRLHFCQUFTO0lBRzVDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQVQ1QixVQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFVMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVM7SUFDVCx3QkFBd0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvRixNQUFNLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDL0YsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0QsT0FBTztJQUNQLHNCQUFzQjtRQUNwQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUMzRCxPQUFPLDJCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QsbUJBQW1CO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1FBQzlDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQWhDRCwwQ0FnQ0MifQ==

/***/ }),

/***/ "./build/main/modules/SensorWaterEquip.js":
/*!************************************************!*\
  !*** ./build/main/modules/SensorWaterEquip.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorWaterEquip = void 0;
const SensorDetectStatus_1 = __webpack_require__(/*! ../entity/SensorDetectStatus */ "./build/main/entity/SensorDetectStatus.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
// 事件
const SensorDetectPowerStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE]: '解除水浸',
    [constant_1.SensorDetectStatusEnum.ON]: '水浸'
};
const SensorDetectAwakeStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_AWAKE]: '无唤醒',
    [constant_1.SensorDetectStatusEnum.AWAKE]: '唤醒'
};
const SensorDetectKeyStatusMap = {
    [constant_1.SensorDetectStatusEnum.NONE_KEY]: '无按键',
    [constant_1.SensorDetectStatusEnum.KEY]: '按键'
};
class SensorWaterEquip extends BaseEquip_1.BaseEquip {
    /**
     * 烟感传感器
     * @param status        状态值，16进制
     * @param deviceType    设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.bytes = `0000000000000000`;
        this.sensorDetectStatus = new SensorDetectStatus_1.SensorDetectStatus(status);
    }
    // 获取事件类型
    getEventStatusDescriptor() {
        const state = this.sensorDetectStatus.getStatus();
        const stateBits = this.sensorDetectStatus.parseBitState(state, 3);
        const power = SensorDetectPowerStatusMap[new this.Converter(stateBits[0], 2).toDecimalNumber()];
        const awake = SensorDetectAwakeStatusMap[new this.Converter(stateBits[1], 2).toDecimalNumber()];
        const key = SensorDetectKeyStatusMap[new this.Converter(stateBits[2], 2).toDecimalNumber()];
        return [power, awake, key];
    }
    // 获取电压
    getVolStatusDescriptor() {
        const state = this.sensorDetectStatus.getVolStatus();
        const vol = new this.Converter(state, 16).toDecimalNumber();
        return constant_1.SensorDoorVolMap[vol] || '';
    }
    getStatusDescriptor() {
        const status = this.getEventStatusDescriptor();
        return status[0];
    }
}
exports.SensorWaterEquip = SensorWaterEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yV2F0ZXJFcXVpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL1NlbnNvcldhdGVyRXF1aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQWtFO0FBQ2xFLGlEQUE4RTtBQUM5RSwyQ0FBd0M7QUFFeEMsS0FBSztBQUNMLE1BQU0sMEJBQTBCLEdBQU87SUFDckMsQ0FBQyxpQ0FBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNO0lBQ3JDLENBQUMsaUNBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtDQUNsQyxDQUFBO0FBQ0QsTUFBTSwwQkFBMEIsR0FBUTtJQUN0QyxDQUFDLGlDQUFzQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUs7SUFDMUMsQ0FBQyxpQ0FBc0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJO0NBQ3JDLENBQUE7QUFDRCxNQUFNLHdCQUF3QixHQUFRO0lBQ3BDLENBQUMsaUNBQXNCLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSztJQUN4QyxDQUFDLGlDQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUk7Q0FDbkMsQ0FBQTtBQUVELE1BQWEsZ0JBQWlCLFNBQVEscUJBQVM7SUFHN0M7Ozs7O09BS0c7SUFDSCxZQUFZLE1BQWMsRUFBRSxVQUFtQixFQUFFLGVBQXdCO1FBQ3ZFLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBVDVCLFVBQUssR0FBRyxrQkFBa0IsQ0FBQztRQVUxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsU0FBUztJQUNULHdCQUF3QjtRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDakQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDakUsTUFBTSxLQUFLLEdBQUcsMEJBQTBCLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQy9GLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUMvRixNQUFNLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7UUFDM0YsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELE9BQU87SUFDUCxzQkFBc0I7UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDM0QsT0FBTywyQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDcEMsQ0FBQztJQUNELG1CQUFtQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUFqQ0QsNENBaUNDIn0=

/***/ }),

/***/ "./build/main/modules/SocketEquip.js":
/*!*******************************************!*\
  !*** ./build/main/modules/SocketEquip.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEquip = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
class SocketEquip extends BaseEquip_1.BaseEquip {
    constructor(deviceType, deviceChildType, status) {
        super(status, deviceType, deviceChildType);
    }
}
exports.SocketEquip = SocketEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0RXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9Tb2NrZXRFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBd0M7QUFFeEMsTUFBYSxXQUFZLFNBQVEscUJBQVM7SUFDeEMsWUFBWSxVQUFrQixFQUFFLGVBQXVCLEVBQUUsTUFBYztRQUNyRSxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFKRCxrQ0FJQyJ9

/***/ }),

/***/ "./build/main/modules/SwitchEquip.js":
/*!*******************************************!*\
  !*** ./build/main/modules/SwitchEquip.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchEquip = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 14:16:51
 */
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const SwitchMixEquip_1 = __webpack_require__(/*! ./SwitchMixEquip */ "./build/main/modules/SwitchMixEquip.js");
const SwitchPlugEquip_1 = __webpack_require__(/*! ./SwitchPlugEquip */ "./build/main/modules/SwitchPlugEquip.js");
class SwitchEquip extends BaseEquip_1.BaseEquip {
    /**
     * 开关类工厂函数
     * @param status 状态字符串
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     *
     * @example
     *
     * const factory = new SwitchEquip(status, device, deviceChildType)
     * const equip = factory.create()
     * const power = euip.getPowerInt()
     * equip.setPower(1, 0)
     * const status = equip.getBytes()
     * const statusDescriptor = equip.getStatusDescriptor()
     */
    constructor(status, deviceType, deviceChildType, flag) {
        super(status, deviceType, deviceChildType);
        this.equip = {};
        this.flag = flag;
    }
    create() {
        let equip = new SwitchMixEquip_1.SwitchMixEquip(this.status, this.deviceType, this.deviceChildType, this.flag);
        if (equip.isSocket) {
            equip = new SwitchPlugEquip_1.SwitchPlugEquip(this.status, this.deviceType, this.deviceChildType);
        }
        return this.equip = equip;
    }
}
exports.SwitchEquip = SwitchEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoRXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9Td2l0Y2hFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7R0FLRztBQUNILDJDQUF3QztBQUN4QyxxREFBa0Q7QUFDbEQsdURBQW9EO0FBRXBELE1BQWEsV0FBWSxTQUFRLHFCQUFTO0lBSXhDOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsWUFBWSxNQUFjLEVBQUUsVUFBbUIsRUFBRSxlQUF3QixFQUFFLElBQVU7UUFDbkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFsQjVDLFVBQUssR0FBUSxFQUFFLENBQUM7UUFtQmQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLEtBQUssR0FBRyxJQUFJLCtCQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdGLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixLQUFLLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7U0FDaEY7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQzNCLENBQUM7Q0FDRjtBQTlCRCxrQ0E4QkMifQ==

/***/ }),

/***/ "./build/main/modules/SwitchMixEquip.js":
/*!**********************************************!*\
  !*** ./build/main/modules/SwitchMixEquip.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchMixEquip = exports.ScenePatterns = exports.KeyTypePatternEnum = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 15:17:51
 */
const SwitchMixStatus_1 = __webpack_require__(/*! ../entity/SwitchMixStatus */ "./build/main/entity/SwitchMixStatus.js");
const SwitchStatus_1 = __webpack_require__(/*! ../entity/SwitchStatus */ "./build/main/entity/SwitchStatus.js");
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const CurtainEquip_1 = __webpack_require__(/*! ./CurtainEquip */ "./build/main/modules/CurtainEquip.js");
// 按键类型索引 3|3
// 开关|情景|单线|插座|雷达|红外|窗帘
var SwitchKeyTypeIndex;
(function (SwitchKeyTypeIndex) {
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["SWITCH"] = 0] = "SWITCH";
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["SCENE"] = 1] = "SCENE";
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["LINE"] = 2] = "LINE";
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["SOCKET"] = 3] = "SOCKET";
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["RADAR"] = 4] = "RADAR";
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["INFRARED"] = 5] = "INFRARED";
    SwitchKeyTypeIndex[SwitchKeyTypeIndex["CURTAIN"] = 6] = "CURTAIN";
})(SwitchKeyTypeIndex || (SwitchKeyTypeIndex = {}));
// 开关类型
const SwitchKeyTypeIndexMap = {
    [SwitchKeyTypeIndex.SWITCH]: 'switch',
    [SwitchKeyTypeIndex.SCENE]: 'scene',
    [SwitchKeyTypeIndex.LINE]: 'line',
    [SwitchKeyTypeIndex.SOCKET]: 'socket',
    [SwitchKeyTypeIndex.RADAR]: 'radar',
    [SwitchKeyTypeIndex.INFRARED]: 'infrared',
    [SwitchKeyTypeIndex.CURTAIN]: 'curtain',
};
const SwitchTypeIndexObj = {
    switch: 0,
    scene: 0,
    line: 0,
    socket: 0,
    radar: 0,
    infrared: 0,
    curtain: 0
};
// 按键状态
var SwitchKeyStatus;
(function (SwitchKeyStatus) {
    SwitchKeyStatus[SwitchKeyStatus["ON"] = 1] = "ON";
    SwitchKeyStatus[SwitchKeyStatus["OFF"] = 0] = "OFF";
})(SwitchKeyStatus || (SwitchKeyStatus = {}));
const SwitchKeyStatusMap = {
    [SwitchKeyStatus.ON]: '开',
    [SwitchKeyStatus.OFF]: '关'
};
const DEFAULT_KEY_COUNT = 0; // 默认按键数
// 按键类型范式
var KeyTypePatternEnum;
(function (KeyTypePatternEnum) {
    KeyTypePatternEnum["SWITCH"] = "10";
    KeyTypePatternEnum["SCENE"] = "01";
    KeyTypePatternEnum["SWITCHSCENE"] = "11";
    KeyTypePatternEnum["LINE"] = "001";
    KeyTypePatternEnum["SOCKET"] = "0001";
    KeyTypePatternEnum["SWITCHRADAR"] = "10001";
    KeyTypePatternEnum["SCENERADAR"] = "01001";
    KeyTypePatternEnum["SWITCHIR"] = "100001";
    KeyTypePatternEnum["SCENEIR"] = "010001";
    KeyTypePatternEnum["SWITCHSCENEIR"] = "110001";
    KeyTypePatternEnum["SCENECURTAIN"] = "0100001";
})(KeyTypePatternEnum = exports.KeyTypePatternEnum || (exports.KeyTypePatternEnum = {}));
exports.ScenePatterns = [
    `${KeyTypePatternEnum.SCENE}`,
    `${KeyTypePatternEnum.SWITCHSCENE}`,
    `${KeyTypePatternEnum.SCENERADAR}`,
    `${KeyTypePatternEnum.SCENEIR}`,
    `${KeyTypePatternEnum.SWITCHSCENEIR}`,
    `${KeyTypePatternEnum.SCENECURTAIN}`,
];
class SwitchMixEquip extends BaseEquip_1.BaseEquip {
    /**
     * 面板开关(普通开关、情景开关、单线开关、混合开关[普通+情景])
     * @param status 状态
     * @param deviceType 主类型
     * @param deviceChildType 子类型
     * @param flag 标志位
     */
    constructor(status, deviceType, deviceChildType, flag) {
        super(status, deviceType, deviceChildType);
        this.bytes = `{0}{1}000000000000`;
        this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType);
        this.switchStatus = new SwitchMixStatus_1.SwitchMixStatus(this.__parseStatus(status, flag), this.orderCount, this.keyTypePattern);
    }
    /**
     * 解析状态码，情景类型： 操作时置零，获取状态时不置零，其他类型不处理
     * @param status 状态码串
     * @param flag 是否
     */
    __parseStatus(status, flag = false) {
        const isScene = this.isScene || this.isSwitchScene || this.isCurtain || this.isRadarScene || this.isInfraredScene;
        if (isScene) {
            return !flag ? `00${status.slice(2)}` : status;
        }
        return status;
    }
    /**
     * 类型索引 1|3
     */
    get typeIndex() {
        return this.typeStr;
    }
    /**
     * 开关类型标志
     * {
     *   switch: 1,
     *   scene: 0
     * }
     */
    get keyTypes() {
        if (!this.typeStr)
            return '';
        const types = this.typeStr.split('|');
        const typeObj = Object.assign({}, SwitchTypeIndexObj);
        for (let index = 0; index < types.length; index++) {
            typeObj[SwitchKeyTypeIndexMap[index]] = +!!types[index];
        }
        return typeObj;
    }
    // 类型范式 [3, 3] => '11', [3, 0] => '10', [0, 3] => '01'...
    get keyTypePattern() {
        let keys = this.typeStr.split('|');
        const keyList = []; // [3, 0, 2] => [1, 0, 1]
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            keyList[index] = +key ? 1 : 0;
        }
        return keyList.join('');
    }
    /**
     * 按键列表
     * ['00', '01', '10', '11']
     */
    get keyDots() {
        return this.switchStatus.keyDots.concat(this.switchStatus.extraKeyDots || []);
    }
    /**
     * 按键总数
     */
    get keyCount() {
        if (!this.typeStr || !this.typeStr.length)
            return DEFAULT_KEY_COUNT;
        let keys = this.typeStr.split('|');
        keys = keys.filter((it) => it);
        return +keys.reduce((a, b) => +a + (+b)) || DEFAULT_KEY_COUNT;
    }
    /**
     * 获取各类型按键数量列表 [2,3,....] ===> [开关数量, 情景数量,...]
     */
    get _keyCountList() {
        if (!this.typeStr || !this.typeStr.length)
            return [DEFAULT_KEY_COUNT];
        let keys = this.typeStr.split('|');
        const keyList = [];
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            keyList[index] = +key ? +key : DEFAULT_KEY_COUNT;
        }
        return keyList;
    }
    /**
     * 按键数列表，按主程类型排序
     *
     * 开关类型 - 开关为主入口
     * 情景类型 - 情景为主入口
     * 混合类型 - 情景为主入口
     * 单线开关 - 开关
     * 插座开关 - 插座
     */
    get orderCount() {
        const countList = [...this._keyCountList];
        if (!countList.length)
            return [];
        // 开关
        if (countList.length === 1 || this.isSwitch)
            return countList;
        // 主要主程
        if (this.isScene || this.isSwitchScene || this.isLine || this.isSocket)
            return countList.reverse().slice(0, 2);
        // 雷达主程，取开关或情景值。 eg [1, 0, 0, 0, 1] || [0, 1, 0, 0, 1]
        if (this.isRadar)
            return [countList.find(i => !!i) || DEFAULT_KEY_COUNT];
        // 红外主程，取开关或情景值，两者包含取情景。 eg 100001, 010001, 110001
        if (this.isInfrared) {
            const list = countList.filter(i => i);
            if (list.length === 2)
                return [...list];
            if (list.length === 3)
                return list.slice(0, 2);
        }
        // 窗帘主程， 取情景。 2按键取3bit, 4按键取6bit
        if (this.isCurtain)
            return [countList.find(i => !!i) || DEFAULT_KEY_COUNT];
        return [];
    }
    get isSwitch() {
        return this.keyTypePattern === KeyTypePatternEnum.SWITCH;
    }
    get isScene() {
        return this.keyTypePattern === KeyTypePatternEnum.SCENE;
    }
    get isSwitchScene() {
        return this.keyTypePattern === KeyTypePatternEnum.SWITCHSCENE;
    }
    get isLine() {
        return this.keyTypePattern === KeyTypePatternEnum.LINE;
    }
    get isSocket() {
        return this.keyTypePattern === KeyTypePatternEnum.SOCKET;
    }
    get isRadar() {
        return this.isRadarSwitch || this.isRadarScene;
    }
    get isRadarSwitch() {
        return this.keyTypePattern === KeyTypePatternEnum.SWITCHRADAR;
    }
    get isRadarScene() {
        return this.keyTypePattern === KeyTypePatternEnum.SCENERADAR;
    }
    get isInfrared() {
        return this.isInfraredSwitch || this.isInfraredScene;
    }
    get isInfraredSwitch() {
        return this.keyTypePattern === KeyTypePatternEnum.SWITCHIR;
    }
    get isInfraredScene() {
        return [`${KeyTypePatternEnum.SCENEIR}`, `${KeyTypePatternEnum.SWITCHSCENEIR}`].includes(this.keyTypePattern);
    }
    get isCurtain() {
        return this.keyTypePattern === KeyTypePatternEnum.SCENECURTAIN;
    }
    // 全部情景类型
    get isMixScene() {
        return exports.ScenePatterns.includes(this.keyTypePattern);
    }
    /**
     * 设置按键位
     * @param v 值
     * @param index 索引
     * @param t 非主程类型 > 0 的任意值
     */
    setPower(v, index, t) {
        const vb = new this.Converter(`${v}`, 10).toBinary();
        const setMethod = t ? 'setExtraKeyDots' : 'setKeyDot';
        const idx = t ? index - this.orderCount[SwitchStatus_1.OrderEnum.Primary] : index;
        this.switchStatus[setMethod](vb, idx);
        return this;
    }
    /**
     * 获取按键值 ['1', '0', '1']
     * @param index 索引
     * @param t  非主程类型 > 0 的任意值
     */
    getPower(index, t) {
        if (index !== undefined) {
            const getMethod = t ? 'getExtraKeyDotByIndex' : 'getKeyDotByIndex';
            const idx = t ? index - this.orderCount[0] : index;
            const v = this.switchStatus[getMethod](idx);
            const vd = new this.Converter(`${v}`, 2).toDecimal();
            return [vd];
        }
        else {
            return this.keyDots.map(item => new this.Converter(`${item}`, 2).toDecimal());
        }
    }
    /**
     * 获取按键位整型值  [1, 0, 1]
     * @param index 索引
     * @param t  非主程类型 > 0 的任意值
     */
    getPowerInt(index, t) {
        const powers = this.getPower(index, t);
        return powers.map(item => +item > 1 ? 0 : +item);
    }
    /**
     * 获取窗帘电源值
     * [{ON:1}]
     */
    getCurtainPowerInt() {
        // bit [0, 1, 0] --> 开、停、关  ==> {1: 1}
        const powerInts = this.getPowerInt();
        const powerMap = { 0: 'ON', 1: 'PAUSE', 2: 'OFF' };
        let power = [];
        const defaultPower = [{ OFF: 0 }];
        if (this.orderCount[0] === 6) {
            const panel1 = powerInts.slice(0, 3).map((p, i) => { return p && { [powerMap[i]]: p }; }).filter(i => i);
            const panel2 = powerInts.slice(3).map((p, i) => { return p && { [powerMap[i]]: p }; }).filter(i => i);
            const p1 = !panel1.length ? defaultPower : panel1;
            const p2 = !panel2.length ? defaultPower : panel2;
            power = p1.concat(p2);
        }
        else {
            power = powerInts.map((p, i) => { return p && { [powerMap[i]]: p }; }).filter(i => i);
        }
        return power.length ? power : defaultPower;
    }
    /**
     * 获取窗帘开关状态描述
     */
    getCurtainPowerStatusDescriptor() {
        const powerInts = this.getPowerInt();
        const _default = new Array(this.orderCount[0] / 3).fill(0);
        const status = powerInts.filter(i => i);
        const descriptor = status.length ? status : _default;
        return descriptor.map(s => CurtainEquip_1.CurtainStatusMap[s]).join(' | ');
    }
    /**
     * 获取状态描述
     */
    getStatusDescriptor() {
        if (this.isCurtain)
            return this.getCurtainPowerStatusDescriptor();
        const power = this.getPowerInt();
        return power.map(p => SwitchKeyStatusMap[p]).join(',');
    }
    getBytes() {
        // 按键从右至左取值，构建字节码需先取反
        let keyDots = [...this.switchStatus.keyDots];
        keyDots = keyDots.reverse();
        if (this.isMixScene) { // 情景开关按字节 8位获取按键 || 插座按前四位bit 一个bit一个按键
            keyDots = keyDots.map(k => `${+k}`);
        }
        const extraDots = [...this.switchStatus.extraKeyDots].reverse();
        const status = new this.Converter(keyDots.join('') || '00', 2).toHex();
        const extraStatus = new this.Converter(extraDots.join('') || '00', 2).toHex();
        return this.bytes.format(status, extraStatus);
    }
}
exports.SwitchMixEquip = SwitchMixEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoTWl4RXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9Td2l0Y2hNaXhFcXVpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7R0FLRztBQUNILCtEQUE0RDtBQUM1RCx5REFBbUQ7QUFDbkQsMkNBQXdDO0FBQ3hDLGlEQUFrRDtBQUVsRCxhQUFhO0FBQ2IsdUJBQXVCO0FBQ3ZCLElBQUssa0JBUUo7QUFSRCxXQUFLLGtCQUFrQjtJQUNyQiwrREFBVSxDQUFBO0lBQ1YsNkRBQVMsQ0FBQTtJQUNULDJEQUFRLENBQUE7SUFDUiwrREFBVSxDQUFBO0lBQ1YsNkRBQVMsQ0FBQTtJQUNULG1FQUFZLENBQUE7SUFDWixpRUFBVyxDQUFBO0FBQ2IsQ0FBQyxFQVJJLGtCQUFrQixLQUFsQixrQkFBa0IsUUFRdEI7QUFFRCxPQUFPO0FBQ1AsTUFBTSxxQkFBcUIsR0FBUTtJQUNqQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVE7SUFDckMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPO0lBQ25DLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTTtJQUNqQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVE7SUFDckMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPO0lBQ25DLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVTtJQUN6QyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVM7Q0FDeEMsQ0FBQTtBQUNELE1BQU0sa0JBQWtCLEdBQVE7SUFDOUIsTUFBTSxFQUFFLENBQUM7SUFDVCxLQUFLLEVBQUUsQ0FBQztJQUNSLElBQUksRUFBRSxDQUFDO0lBQ1AsTUFBTSxFQUFFLENBQUM7SUFDVCxLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxDQUFDO0lB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RSxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3BHLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtZQUNqRCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO1lBQ2pELEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3RCO2FBQU07WUFDTCxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2xGO1FBQ0QsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQTtJQUM1QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCwrQkFBK0I7UUFDN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtRQUNwRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQywrQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUE7UUFDakUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFFRCxRQUFRO1FBQ04scUJBQXFCO1FBQ3JCLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsd0NBQXdDO1lBQzdELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDcEM7UUFDRCxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMvRCxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDdEUsTUFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzdFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQy9DLENBQUM7Q0FDRjtBQTlQRCx3Q0E4UEMifQ==

/***/ }),

/***/ "./build/main/modules/SwitchPlugEquip.js":
/*!***********************************************!*\
  !*** ./build/main/modules/SwitchPlugEquip.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchPlugEquip = void 0;
/*
 * @Author: eamiear
 * @Date: 2020-12-18 14:24:35
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-01-19 14:16:02
 */
const SwitchPlugStatus_1 = __webpack_require__(/*! ../entity/SwitchPlugStatus */ "./build/main/entity/SwitchPlugStatus.js");
const SwitchMixEquip_1 = __webpack_require__(/*! ./SwitchMixEquip */ "./build/main/modules/SwitchMixEquip.js");
var PlugStatus;
(function (PlugStatus) {
    PlugStatus[PlugStatus["ON"] = 1] = "ON";
    PlugStatus[PlugStatus["OFF"] = 0] = "OFF";
})(PlugStatus || (PlugStatus = {}));
const SwitchPlugStatusMap = {
    [PlugStatus.ON]: '开',
    [PlugStatus.OFF]: '关'
};
class SwitchPlugEquip extends SwitchMixEquip_1.SwitchMixEquip {
    /**
     * 智能插座
     * @param status 状态
     * @param deviceType 设备住类型
     * @param deviceChildType 设备子类型
     */
    constructor(status, deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        this.switchStatus = new SwitchPlugStatus_1.SwitchPlugStatus(status, this.orderCount);
        this.bytes = `{0}0000000000`;
    }
    /**
     * 获取状态描述
     */
    getStatusDescriptor() {
        const power = this.getPowerInt();
        return power.map(p => SwitchPlugStatusMap[p]).join(',');
    }
    getBytes() {
        let keyDots = [...this.switchStatus.keyDots];
        keyDots = keyDots.reverse();
        keyDots = keyDots.map(k => `${+k}`);
        const status = new this.Converter(keyDots.join('') || '00', 2).toHex();
        return this.bytes.format(status);
    }
}
exports.SwitchPlugEquip = SwitchPlugEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoUGx1Z0VxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvU3dpdGNoUGx1Z0VxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztHQUtHO0FBQ0gsaUVBQThEO0FBQzlELHFEQUFrRDtBQUVsRCxJQUFLLFVBR0o7QUFIRCxXQUFLLFVBQVU7SUFDYix1Q0FBTSxDQUFBO0lBQ04seUNBQU8sQ0FBQTtBQUNULENBQUMsRUFISSxVQUFVLEtBQVYsVUFBVSxRQUdkO0FBRUQsTUFBTSxtQkFBbUIsR0FBUTtJQUMvQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ3BCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUc7Q0FDdEIsQ0FBQTtBQUVELE1BQWEsZUFBZ0IsU0FBUSwrQkFBYztJQUNqRDs7Ozs7T0FLRztJQUNILFlBQVksTUFBYyxFQUFFLFVBQW1CLEVBQUUsZUFBd0I7UUFDdkUsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUE7SUFDOUIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsbUJBQW1CO1FBQ2pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNoQyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDM0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDdEUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0NBQ0Y7QUEzQkQsMENBMkJDIn0=

/***/ }),

/***/ "./build/main/modules/WireConditionEquip.js":
/*!**************************************************!*\
  !*** ./build/main/modules/WireConditionEquip.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WireConditionEquip = void 0;
const BaseEquip_1 = __webpack_require__(/*! ./BaseEquip */ "./build/main/modules/BaseEquip.js");
const constant_1 = __webpack_require__(/*! ../shared/constant */ "./build/main/shared/constant.js");
const WireConditionStatus_1 = __webpack_require__(/*! ../entity/WireConditionStatus */ "./build/main/entity/WireConditionStatus.js");
const AirConditionEquip_1 = __webpack_require__(/*! ./AirConditionEquip */ "./build/main/modules/AirConditionEquip.js");
class WireConditionEquip extends BaseEquip_1.BaseEquip {
    /**
     * 线控空调
     * @param status          16进制状态字符串
     * @param deviceType      设备类型
     * @param deviceChildType 设备子类型
     */
    constructor(status = '', deviceType, deviceChildType) {
        super(status, deviceType, deviceChildType);
        /** 预留_模式_风速_温度_上下摆风_左右摆风_室温 */
        // 预留先移除
        this.bytes = `{0}{1}{2}{3}{4}{5}`;
        this.status = `00${status}`;
        this.airModel = new WireConditionStatus_1.WireAirConditionModel(this.status);
    }
    static get defaultTemp() {
        return AirConditionEquip_1.ConditionTempEnum.default;
    }
    /**
     * 设置空调温度值
     * @param temp 十进制温度值
     */
    setTemperature(temp) {
        const temperature = temp < AirConditionEquip_1.ConditionTempEnum.min ? temp + 1 : temp > AirConditionEquip_1.ConditionTempEnum.max ? temp - 1 : temp;
        const tempHex = new this.Converter(`${temperature}`, 10).toHex();
        this.airModel.setTemperature(tempHex);
        return this;
    }
    /**
     * 获取空调温度值
     */
    getTemperature(v) {
        const temp = v || this.airModel.getTemperature();
        const tmepDecimal = new this.Converter(temp, 16).toDecimal();
        return tmepDecimal;
    }
    /**
     * 获取温度存储值（hex）
     */
    getTemperatureRawValue() {
        return this.airModel.getTemperature();
    }
    /**
     * 获取温度文本
     */
    get temperatureText() {
        const temp = this.getTemperature();
        return this.isPowerOn ? `${temp}` : '--';
    }
    /**
     * 设置空调模式
     *
     * @param mode 模式值（2 制冷， 3 制热）
     */
    setMode(mode) {
        mode = mode > 3 ? 2 : mode;
        this.airModel.setMode(constant_1.WireModeMap[mode]);
        this.setSpeed(+this.getSpeed() || constant_1.WireSpeed.AUTO);
        this.setTemperature(+this.getTemperature() || WireConditionEquip.defaultTemp);
        return this;
    }
    /**
     * 获取空调模式键值: 0,1,2,3
     */
    getMode(v) {
        const mode = v || this.airModel.getMode();
        const modeKey = Object.keys(constant_1.WireModeMap).find(key => constant_1.WireModeMap[key] === mode);
        return modeKey || '';
    }
    /**
     * 获取空调模式值: 21， 51
     */
    getModeRawValue() {
        return this.airModel.getMode();
    }
    /**
     * 获取模式描述: 自动、制冷...
     */
    get modeText() {
        const mode = [constant_1.WireMode.ON, constant_1.WireMode.OFF].includes(+this.getMode()) ? constant_1.WireMode.COLD : this.getMode();
        return this.isPowerOn ? `${constant_1.WireModeDescriptorMap[mode]}` : '--';
    }
    /**
     * 设置风速
     * @param speed （0 自动， 1 弱， 2 中， 3 强）
     */
    setSpeed(speed) {
        this.airModel.setSpeed(constant_1.WireSpeedMap[speed > 3 ? 0 : speed]);
        return this;
    }
    /**
     * 获取风速键值: 0, 1,2,3
     */
    getSpeed(v) {
        const speed = v || this.airModel.getSpeed();
        const speedKey = Object.keys(constant_1.WireSpeedMap).find(key => constant_1.WireSpeedMap[key] === speed);
        return speedKey || '';
    }
    /**
     * 获取风速值: 00, 01, 02, 03
     */
    getSpeedRawValue() {
        return this.airModel.getSpeed();
    }
    get speedText() {
        const speed = constant_1.WireSpeedDescriptorMap[this.getSpeed()] || constant_1.WireSpeedDescriptorMap[constant_1.WireSpeed.AUTO];
        return this.isPowerOn ? `${speed}` : '--';
    }
    /**
     * 设置左右摆风
     * @param wing 0~1
     */
    setHorizontalWing(wing = 0) {
        this.airModel.setHorizontalWing(constant_1.WireHWingMap[wing > 1 ? 0 : wing]);
        if (wing === 1)
            this.setVerticalWing(0);
        return this;
    }
    /**
     * 获取左右摆风 key 0， 1
     */
    getHorizontalWing(v) {
        const wing = v || this.airModel.getHorizontalWing();
        const wingKey = Object.keys(constant_1.WireHWingMap).find(key => constant_1.WireHWingMap[key] === wing);
        return wingKey || '';
    }
    /**
     * 获取左右摆风值 00， 01
     */
    getHorizontalWingRawValue() {
        return this.airModel.getHorizontalWing();
    }
    /**
     * 获取左右摆风文本: '左右', '--'
     */
    get horizontalWingText() {
        const w = constant_1.WireHWingDescriptorMap[this.getHorizontalWing()] || constant_1.WireHWingDescriptorMap[constant_1.WireHWing.OFF];
        return this.isPowerOn ? `${w}` : '';
    }
    /**
     * 设置上下摆风
     * @param wing 0~1
     */
    setVerticalWing(wing = 0) {
        this.airModel.setVerticalWing(constant_1.WWireVWingMap[wing > 1 ? 0 : wing]);
        if (wing === 1)
            this.setHorizontalWing(0);
        return this;
    }
    /**
     * 获取摆风 key 0， 1
     */
    getVerticalWing(v) {
        const wing = v || this.airModel.getVerticalWing();
        const wingKey = Object.keys(constant_1.WWireVWingMap).find(key => constant_1.WWireVWingMap[key] === wing);
        return wingKey || '';
    }
    /**
     * 获取摆风值 00， 01
     */
    getVerticalWingRawValue() {
        return this.airModel.getVerticalWing();
    }
    /**
     * 获取摆风文本: '左右', '--'
     */
    get verticalWingText() {
        const w = constant_1.WireVWingDescriptorMap[this.getVerticalWing()] || constant_1.WireVWingDescriptorMap[constant_1.WireVWing.OFF];
        return this.isPowerOn ? `${w}` : '';
    }
    /**
     * 启动电源
     * @param temp 温度
     * @param speed 风速
     * @param mode 模式
     */
    setPowerOn() {
        this.airModel.setPower(constant_1.WireModeMap[constant_1.WireMode.ON]);
        this.setMode(constant_1.WireMode.COLD).setHorizontalWing(constant_1.WireHWing.OFF).setVerticalWing(constant_1.WireVWing.OFF);
        // this.setTemperature(temp).setSpeed(speed).setHorizontalWing(WireHWing.OFF).setVerticalWing(WireVWing.OFF)
        return this;
    }
    /**
     * 关闭电源
     */
    setPowerOff() {
        this.airModel.setPower(constant_1.WireModeMap[constant_1.WireMode.OFF]);
        this.setMode(constant_1.WireMode.OFF).setHorizontalWing(constant_1.WireHWing.OFF).setVerticalWing(constant_1.WireVWing.OFF);
        // this.setTemperature(WireConditionEquip.defaultTemp).setSpeed(WireSpeed.AUTO).setHorizontalWing(WireHWing.OFF).setVerticalWing(WireVWing.OFF)
        return this;
    }
    setPower(power) {
        return power ? this.setPowerOn() : this.setPowerOff();
    }
    /**
     * 获取电源值
     */
    getPower() {
        return this.airModel.getPower();
    }
    /**
     * 获取电源当前状态
     */
    getPowerStatus() {
        return this.isPowerOn;
    }
    /**
     * 电源是否开启
     */
    get isPowerOn() {
        return this.getPower() === constant_1.WireModeMap[constant_1.WireMode.ON] || !!+this.getModeRawValue();
    }
    /**
     * 温度是否可设置
     */
    get isTemperatureValid() {
        return this.isPowerOn;
    }
    /**
     * 风速是否可设置
     */
    get isFanSpeedValid() {
        return this.isPowerOn;
    }
    get isWingValid() {
        return this.isPowerOn;
    }
    get hasWing() {
        return true;
    }
    /**
     * 获取电源字节字符串
     */
    getPowerBytes() {
        const mode = this.getPower();
        const speed = this.getSpeedRawValue();
        const temperature = this.getTemperatureRawValue();
        const vwing = this.getVerticalWingRawValue();
        const hwing = this.getHorizontalWingRawValue();
        return this.bytes.format(mode, speed, temperature, vwing, hwing, this.airModel.roomTemp);
    }
    getBytes() {
        const mode = this.getModeRawValue();
        console.log('mode ---- ', this.getModeRawValue());
        const speed = this.getSpeedRawValue();
        const temperature = this.getTemperatureRawValue();
        const vwing = this.getVerticalWingRawValue();
        const hwing = this.getHorizontalWingRawValue();
        return this.bytes.format(mode, speed, temperature, vwing, hwing, this.airModel.roomTemp);
    }
    getStatusDescriptor() {
        // return this.isPowerOn ? WireModeDescriptorMap[WireMode.ON] : WireModeDescriptorMap[WireMode.OFF]
        if (this.isPowerOn) {
            const modeValue = this.getModeRawValue();
            if (!modeValue)
                return constant_1.WireModeDescriptorMap[constant_1.WireMode.ON];
            if (constant_1.WireModeMap[constant_1.WireMode.COLD] === modeValue)
                return constant_1.WireModeDescriptorMap[constant_1.WireMode.COLD];
            if (constant_1.WireModeMap[constant_1.WireMode.HOT] === modeValue)
                return constant_1.WireModeDescriptorMap[constant_1.WireMode.HOT];
        }
        return constant_1.WireModeDescriptorMap[constant_1.WireMode.OFF];
    }
}
exports.WireConditionEquip = WireConditionEquip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lyZUNvbmRpdGlvbkVxdWlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvV2lyZUNvbmRpdGlvbkVxdWlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF3QztBQUN4QyxpREFhNEI7QUFDNUIsdUVBQXNFO0FBQ3RFLDJEQUF3RDtBQUV4RCxNQUFhLGtCQUFtQixTQUFRLHFCQUFTO0lBTS9DOzs7OztPQUtHO0lBQ0gsWUFBWSxTQUFpQixFQUFFLEVBQUUsVUFBcUIsRUFBRSxlQUEwQjtRQUNoRixLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQTtRQVg1QywrQkFBK0I7UUFDL0IsUUFBUTtRQUNTLFVBQUssR0FBRyxvQkFBb0IsQ0FBQztRQVU1QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssTUFBTSxFQUFFLENBQUE7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDJDQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBQ0QsTUFBTSxLQUFLLFdBQVc7UUFDcEIsT0FBTyxxQ0FBaUIsQ0FBQyxPQUFPLENBQUE7SUFDbEMsQ0FBQztJQUNEOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxJQUFZO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxxQ0FBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxxQ0FBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUM1RyxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFD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

/***/ }),

/***/ "./build/main/shared/constant.js":
/*!***************************************!*\
  !*** ./build/main/shared/constant.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///// 红外空调 ///////
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDetectStatusEnum = exports.SensorDoorVolMap = exports.SensorDoorVolEnum = exports.WireVWingDescriptorMap = exports.WWireVWingMap = exports.WireVWing = exports.WireHWingDescriptorMap = exports.WireHWingMap = exports.WireHWing = exports.WireSpeedDescriptorMap = exports.WireSpeedMap = exports.WireSpeed = exports.WireModeDescriptorMap = exports.WireModeMap = exports.WireMode = exports.WingDescriptorMap = exports.VerticalWingMap = exports.VWingEnum = exports.HorizontalWingMap = exports.HWingEnum = exports.SpeedDescriptorMap = exports.SpeedMap = exports.SpeedEnum = exports.ModeDescriptorMap = exports.ModeMap = exports.ModeEnum = exports.PowerEnum = void 0;
// 电源
var PowerEnum;
(function (PowerEnum) {
    PowerEnum["ON"] = "on";
    PowerEnum["OFF"] = "off";
})(PowerEnum = exports.PowerEnum || (exports.PowerEnum = {}));
// 模式
var ModeEnum;
(function (ModeEnum) {
    ModeEnum[ModeEnum["AUTO"] = 1] = "AUTO";
    ModeEnum[ModeEnum["COLD"] = 2] = "COLD";
    ModeEnum[ModeEnum["WEDY"] = 3] = "WEDY";
    ModeEnum[ModeEnum["WING"] = 4] = "WING";
    ModeEnum[ModeEnum["HOT"] = 5] = "HOT"; // 制热
})(ModeEnum = exports.ModeEnum || (exports.ModeEnum = {}));
exports.ModeMap = {
    [ModeEnum.AUTO]: 'a',
    [ModeEnum.COLD]: 'r',
    [ModeEnum.WEDY]: 'd',
    [ModeEnum.WING]: 'w',
    [ModeEnum.HOT]: 'h'
};
/**
 * 模式描述表
 */
exports.ModeDescriptorMap = {
    [ModeEnum.AUTO]: '自动',
    [ModeEnum.COLD]: '制冷',
    [ModeEnum.WEDY]: '抽湿',
    [ModeEnum.WING]: '送风',
    [ModeEnum.HOT]: '制热'
};
// 风速
var SpeedEnum;
(function (SpeedEnum) {
    SpeedEnum[SpeedEnum["AUTO"] = 0] = "AUTO";
    SpeedEnum[SpeedEnum["WEAK"] = 1] = "WEAK";
    SpeedEnum[SpeedEnum["MEDIUM"] = 2] = "MEDIUM";
    SpeedEnum[SpeedEnum["STRONG"] = 3] = "STRONG";
})(SpeedEnum = exports.SpeedEnum || (exports.SpeedEnum = {}));
exports.SpeedMap = {
    [SpeedEnum.AUTO]: 's0',
    [SpeedEnum.WEAK]: 's1',
    [SpeedEnum.MEDIUM]: 's2',
    [SpeedEnum.STRONG]: 's3'
};
exports.SpeedDescriptorMap = {
    [SpeedEnum.AUTO]: '自动',
    [SpeedEnum.WEAK]: '弱',
    [SpeedEnum.MEDIUM]: '中',
    [SpeedEnum.STRONG]: '强'
};
// 左右摆风
var HWingEnum;
(function (HWingEnum) {
    HWingEnum[HWingEnum["ON"] = 1] = "ON";
    HWingEnum[HWingEnum["OFF"] = 0] = "OFF";
})(HWingEnum = exports.HWingEnum || (exports.HWingEnum = {}));
exports.HorizontalWingMap = {
    [HWingEnum.OFF]: 'l0',
    [HWingEnum.ON]: 'l1'
};
// 上下摆风
var VWingEnum;
(function (VWingEnum) {
    VWingEnum[VWingEnum["ON"] = 1] = "ON";
    VWingEnum[VWingEnum["OFF"] = 0] = "OFF";
})(VWingEnum = exports.VWingEnum || (exports.VWingEnum = {}));
exports.VerticalWingMap = {
    [VWingEnum.OFF]: 'u0',
    [VWingEnum.ON]: 'u1'
};
exports.WingDescriptorMap = {
    'l0': '',
    'l1': '左右',
    'u0': '',
    'u1': '上下'
};
////// 线控空调 ///////
// 模式
var WireMode;
(function (WireMode) {
    WireMode[WireMode["OFF"] = 0] = "OFF";
    WireMode[WireMode["ON"] = 1] = "ON";
    WireMode[WireMode["COLD"] = 2] = "COLD";
    WireMode[WireMode["HOT"] = 3] = "HOT";
})(WireMode = exports.WireMode || (exports.WireMode = {}));
exports.WireModeMap = {
    [WireMode.OFF]: '00',
    [WireMode.ON]: '01',
    [WireMode.COLD]: '21',
    [WireMode.HOT]: '51',
};
exports.WireModeDescriptorMap = {
    [WireMode.OFF]: '关',
    [WireMode.ON]: '开',
    [WireMode.COLD]: '制冷',
    [WireMode.HOT]: '制热',
};
// 风速
var WireSpeed;
(function (WireSpeed) {
    WireSpeed[WireSpeed["AUTO"] = 0] = "AUTO";
    WireSpeed[WireSpeed["WEAK"] = 1] = "WEAK";
    WireSpeed[WireSpeed["MEDIUM"] = 2] = "MEDIUM";
    WireSpeed[WireSpeed["STRONG"] = 3] = "STRONG";
})(WireSpeed = exports.WireSpeed || (exports.WireSpeed = {}));
exports.WireSpeedMap = {
    [WireSpeed.AUTO]: '00',
    [WireSpeed.WEAK]: '01',
    [WireSpeed.MEDIUM]: '02',
    [WireSpeed.STRONG]: '03',
};
exports.WireSpeedDescriptorMap = {
    [WireSpeed.AUTO]: '自动',
    [WireSpeed.WEAK]: '弱风',
    [WireSpeed.MEDIUM]: '中风',
    [WireSpeed.STRONG]: '强风',
};
// 左右摆风
var WireHWing;
(function (WireHWing) {
    WireHWing[WireHWing["ON"] = 1] = "ON";
    WireHWing[WireHWing["OFF"] = 0] = "OFF";
})(WireHWing = exports.WireHWing || (exports.WireHWing = {}));
exports.WireHWingMap = {
    [WireHWing.ON]: '01',
    [WireHWing.OFF]: '00'
};
exports.WireHWingDescriptorMap = {
    [WireHWing.ON]: '左右',
    [WireHWing.OFF]: ''
};
// 上下摆风
var WireVWing;
(function (WireVWing) {
    WireVWing[WireVWing["ON"] = 1] = "ON";
    WireVWing[WireVWing["OFF"] = 0] = "OFF";
})(WireVWing = exports.WireVWing || (exports.WireVWing = {}));
exports.WWireVWingMap = {
    [WireVWing.ON]: '01',
    [WireVWing.OFF]: '00'
};
exports.WireVWingDescriptorMap = {
    [WireVWing.ON]: '上下',
    [WireVWing.OFF]: ''
};
////// 传感器电压 ///////
var SensorDoorVolEnum;
(function (SensorDoorVolEnum) {
    SensorDoorVolEnum[SensorDoorVolEnum["LOW"] = 0] = "LOW";
    SensorDoorVolEnum[SensorDoorVolEnum["LEVEL1"] = 1] = "LEVEL1";
    SensorDoorVolEnum[SensorDoorVolEnum["LEVEL2"] = 2] = "LEVEL2";
    SensorDoorVolEnum[SensorDoorVolEnum["LEVEL3"] = 3] = "LEVEL3";
})(SensorDoorVolEnum = exports.SensorDoorVolEnum || (exports.SensorDoorVolEnum = {}));
exports.SensorDoorVolMap = {
    [SensorDoorVolEnum.LOW]: '低',
    [SensorDoorVolEnum.LEVEL1]: '中',
    [SensorDoorVolEnum.LEVEL2]: '高',
    [SensorDoorVolEnum.LEVEL3]: '满'
};
////// 传感器事件枚举 ///////
var SensorDetectStatusEnum;
(function (SensorDetectStatusEnum) {
    SensorDetectStatusEnum[SensorDetectStatusEnum["NONE"] = 0] = "NONE";
    SensorDetectStatusEnum[SensorDetectStatusEnum["ON"] = 1] = "ON";
    // 无定时唤醒
    SensorDetectStatusEnum[SensorDetectStatusEnum["NONE_AWAKE"] = 0] = "NONE_AWAKE";
    // 定时唤醒
    SensorDetectStatusEnum[SensorDetectStatusEnum["AWAKE"] = 1] = "AWAKE";
    // 无按键上报
    SensorDetectStatusEnum[SensorDetectStatusEnum["NONE_KEY"] = 0] = "NONE_KEY";
    // 按键上报
    SensorDetectStatusEnum[SensorDetectStatusEnum["KEY"] = 1] = "KEY";
})(SensorDetectStatusEnum = exports.SensorDetectStatusEnum || (exports.SensorDetectStatusEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2NvbnN0YW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxrQkFBa0I7OztBQUVsQixLQUFLO0FBQ0wsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLHNCQUFTLENBQUE7SUFDVCx3QkFBVyxDQUFBO0FBQ2IsQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCO0FBQ0QsS0FBSztBQUNMLElBQVksUUFNWDtBQU5ELFdBQVksUUFBUTtJQUNsQix1Q0FBUSxDQUFBO0lBQ1IsdUNBQVEsQ0FBQTtJQUNSLHVDQUFRLENBQUE7SUFDUix1Q0FBUSxDQUFBO0lBQ1IscUNBQU8sQ0FBQSxDQUFDLEtBQUs7QUFDZixDQUFDLEVBTlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFNbkI7QUFDWSxRQUFBLE9BQU8sR0FBUTtJQUMxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHO0lBQ3BCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUc7SUFDcEIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRztJQUNwQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHO0lBQ3BCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUc7Q0FDcEIsQ0FBQTtBQUNEOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBUTtJQUNwQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJO0lBQ3JCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUk7SUFDckIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSTtJQUNyQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJO0lBQ3JCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxF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

/***/ }),

/***/ "./build/main/utils/Descriptor.js":
/*!****************************************!*\
  !*** ./build/main/utils/Descriptor.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Descriptor = exports._Descriptor = void 0;
const converter_1 = __webpack_require__(/*! ./converter */ "./build/main/utils/converter.js");
const typeHints_1 = __webpack_require__(/*! ./typeHints */ "./build/main/utils/typeHints.js");
const suiter_1 = __importStar(__webpack_require__(/*! ../utils/suiter */ "./build/main/utils/suiter.js"));
const LampStatus_1 = __webpack_require__(/*! ../entity/LampStatus */ "./build/main/entity/LampStatus.js");
const SensorStatus_1 = __webpack_require__(/*! ../entity/sensor/SensorStatus */ "./build/main/entity/sensor/SensorStatus.js");
const SocketStatus_1 = __webpack_require__(/*! ../entity/SocketStatus */ "./build/main/entity/SocketStatus.js");
const CardPowerEquip_1 = __webpack_require__(/*! ../modules/CardPowerEquip */ "./build/main/modules/CardPowerEquip.js");
const CurtainEquip_1 = __webpack_require__(/*! ../modules/CurtainEquip */ "./build/main/modules/CurtainEquip.js");
const WireConditionEquip_1 = __webpack_require__(/*! ../modules/WireConditionEquip */ "./build/main/modules/WireConditionEquip.js");
const SwitchEquip_1 = __webpack_require__(/*! ../modules/SwitchEquip */ "./build/main/modules/SwitchEquip.js");
const SensorAcEquip_1 = __webpack_require__(/*! ../modules/SensorAcEquip */ "./build/main/modules/SensorAcEquip.js");
const LedLampEquip_1 = __webpack_require__(/*! ../modules/LedLampEquip */ "./build/main/modules/LedLampEquip.js");
const SensorEquip_1 = __webpack_require__(/*! ../modules/SensorEquip */ "./build/main/modules/SensorEquip.js");
const HumidityEquip_1 = __webpack_require__(/*! ../modules/HumidityEquip */ "./build/main/modules/HumidityEquip.js");
/**
 * 状态描述器
 */
class _Descriptor {
    constructor() {
        this.Suiter = {};
        this.SuitStatus = {};
        this.SuitTypes = {};
        this.Suiter = suiter_1.default;
        this.SuitStatus = suiter_1.SuitStatus;
        this.SuitTypes = suiter_1.SuitTypes;
        this.TypeHints = typeHints_1.TypeHints;
        this.Converter = converter_1.Converter;
    }
    _adaptHex(hex) {
        return hex.length > 1 ? hex : `0${hex}`;
    }
    /**
     * 获取设备类型码
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    getEquipTypeCode(deviceType, deviceChildType) {
        if (!deviceType) {
            console.warn('device type can not be empty!');
            return '';
        }
        return deviceChildType
            ? `${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`
            : `${deviceType.toHexNumber().toEvenHex()}`;
    }
    /**
     * 获取设备类型描述
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    getEquipTypeDescriptor(deviceType, deviceChildType) {
        const type = this.getEquipTypeCode(deviceType, deviceChildType);
        return this.SuitTypes[type];
    }
    /**
     * @see {getEquipTypeDescriptor}
     * @param deviceType
     * @param deviceChildType
     */
    getTypeDescriptor(deviceType, deviceChildType) {
        return this.getEquipTypeDescriptor(deviceType, deviceChildType);
    }
    /**
     * 获取主设备状态码
     * @param deviceType 主设备类型
     * @param status 状态码 - 如 01（一个字节）
     */
    getPrimaryStatusCode(deviceType, status) {
        if (!deviceType || !status) {
            console.warn('primary device type or status can not be empty!');
            return '';
        }
        return `${deviceType.toHexNumber().toEvenHex()}${status.toEvenHex()}`;
    }
    /**
     *
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     * @param status 状态码 - 01
     */
    getSecondaryStatusCode(deviceType, deviceChildType, status) {
        if (!deviceType || !deviceChildType || !status) {
            console.warn('device type or status can not be empty!');
            return '';
        }
        return `${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}${status.toEvenHex()}`;
    }
    /**
     * 根据状态码获取设备描述
     * @param code 状态码
     */
    getDescriptorByCode(code) {
        if (!code) {
            console.warn('key code can not be empty!');
        }
        return this.SuitStatus[code.toEvenHex()];
    }
    /**
     * 获取设备主类型状态描述
     * @param deviceType 设备主类型
     * @param code 状态码
     */
    getMainDescriptor(deviceType, code) {
        return this.getDescriptorByCode(this.getPrimaryStatusCode(deviceType, code));
    }
    /**
     * 获取开关状态描述
     * @param status 状态码 16位字符串
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    getSocketSwitchDescriptor(status, deviceType, deviceChildType) {
        const socketStatus = new SocketStatus_1.SocketStatus(status);
        if (!deviceChildType) {
            return this.getMainDescriptor(deviceType, socketStatus.getState());
        }
        const TypeHints = this.TypeHints;
        if (TypeHints.isXkeySocketSwitch(deviceChildType, deviceType)) {
            // const equip = new SwitchMixEquip(status, deviceType, deviceChildType)
            const factory = new SwitchEquip_1.SwitchEquip(status, deviceType, deviceChildType, true);
            const equip = factory.create();
            return equip.getStatusDescriptor();
        }
        return '';
    }
    /**
     * 获取窗帘状态描述
     * @param status 状态码 16位字符串
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    getSmartSwitchDescriptor(status, deviceType, deviceChildType) {
        const TypeHints = this.TypeHints;
        if (TypeHints.isCurtainSmartSwitch(deviceChildType, deviceType)) {
            const curtain = new CurtainEquip_1.CurtainEquip(status, deviceType, deviceChildType);
            return curtain.getStatusDescriptor();
        }
        return '';
    }
    /**
     * 获取电机状态描述
     * @param status 状态码 16位字符串
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    getSmartMotorDescriptor(status, deviceType, deviceChildType) {
        const TypeHints = this.TypeHints;
        if (TypeHints.isCurtainSmartMotor(deviceChildType, deviceType)) { // 同 智能窗帘
            const curtain = new CurtainEquip_1.CurtainEquip(status, deviceType, deviceChildType);
            return curtain.getStatusDescriptor();
        }
        return '';
    }
    /**
     * 获取灯状态描述
     * @param status 状态
     * @param deviceType 设备主类型
     * @param deviceChildType 设备子类型
     */
    getLedDescriptor(status, deviceType, deviceChildType) {
        const lampStatus = new LampStatus_1.LampStatus(status);
        if (!deviceChildType) {
            return this.getMainDescriptor(deviceType, lampStatus.getBrightnessStatus());
        }
        const TypeHints = this.TypeHints;
        if (TypeHints.isColorLed(deviceChildType, deviceType)) {
            const colorLedEquip = new LedLampEquip_1.LedLampEquip(status, deviceType, deviceChildType);
            return colorLedEquip.getStatusDescriptor();
        }
        return '';
    }
    /**
     * 获取传感状态描述
     * @param status 状态
     * @param deviceType 设备住类型
     * @param deviceChildType 设备子类型
     */
    getSensorsDescriptor(status, deviceType, deviceChildType) {
        if (!deviceChildType) {
            const sensorStatus = new SensorStatus_1.SensorStatus(status);
            return this.getMainDescriptor(deviceType, sensorStatus.getSensorNormalStatus());
        }
        const TypeHints = this.TypeHints;
        // 智能插座
        if (TypeHints.isPluginPowerSensors(deviceChildType, deviceType)) {
            const cardPowerEquip = new CardPowerEquip_1.CardPowerEquip(status, deviceType, deviceChildType);
            return cardPowerEquip.getStatusDescriptor();
        }
        // AC红外
        if (TypeHints.isAcSensors(deviceChildType, deviceType)) {
            const acEquip = new SensorAcEquip_1.SensorAcEquip(status, deviceType, deviceChildType);
            return acEquip.getStatusDescriptor();
        }
        // 检测类传感
        if (TypeHints.isDetectSensors(deviceChildType, deviceType)) {
            const factory = new SensorEquip_1.SensorEquip(status, deviceType, deviceChildType);
            const detectEquip = factory.create();
            return detectEquip.getStatusDescriptor();
        }
        // 温湿度传感
        if (TypeHints.isHumidifierSensors(deviceChildType, deviceType)) {
            const humEquip = new HumidityEquip_1.HumidityEquip(status, deviceType, deviceChildType);
            return humEquip.getStatusDescriptor();
        }
        return '';
    }
    /**
     * 线控器状态描述
     * @param status
     * @param deviceType
     * @param deviceChildType
     */
    getWireControlDescriptor(status, deviceType, deviceChildType) {
        const TypeHints = this.TypeHints;
        if (TypeHints.isAcWireControl(deviceChildType, deviceType)) {
            const condition = new WireConditionEquip_1.WireConditionEquip(status, deviceType, deviceChildType);
            return condition.getStatusDescriptor();
        }
        return '';
    }
    /**
     * 获取设备状态描述
     * @param status 状态 16位字符串
     * @param deviceType 设备类型
     * @param deviceChildType 设备子类型
     */
    getStatusDescriptor(status, deviceType, deviceChildType) {
        const deviceTypeKey = Array.from(Object.keys(this.Suiter)).find(suitKey => {
            const suitKeyCapital = suitKey.toCapital();
            return this.TypeHints[`is${suitKeyCapital}`].call(this.TypeHints, deviceType, deviceChildType) || '';
        }) || '';
        const statusMethodName = `get${deviceTypeKey.toCapital()}Descriptor`;
        if (this[statusMethodName]) {
            return this[statusMethodName].call(this, status, deviceType, deviceChildType);
        }
        return '';
    }
}
exports._Descriptor = _Descriptor;
/**
 * {@link _Descriptor}
 * 状态描述器
 */
exports.Descriptor = new _Descriptor();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9EZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBb0Q7QUFDcEQsMkNBQXdDO0FBQ3hDLDBEQUFnRTtBQUNoRSxxREFBa0Q7QUFDbEQsZ0VBQTZEO0FBQzdELHlEQUFzRDtBQUN0RCw4REFBMkQ7QUFDM0QsMERBQXVEO0FBQ3ZELHNFQUFtRTtBQUNuRSx3REFBcUQ7QUFDckQsNERBQXlEO0FBQ3pELDBEQUF1RDtBQUN2RCx3REFBcUQ7QUFDckQsNERBQXlEO0FBRXpEOztHQUVHO0FBQ0gsTUFBYSxXQUFXO0lBT3RCO1FBTGdCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFJN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQVMsQ0FBQztJQUM3QixDQUFDO0lBRU8sU0FBUyxDQUFDLEdBQVc7UUFDM0IsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0JBQWdCLENBQUMsVUFBa0IsRUFBRSxlQUF3QjtRQUNsRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxP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

/***/ }),

/***/ "./build/main/utils/converter.js":
/*!***************************************!*\
  !*** ./build/main/utils/converter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.fillLength = exports.toHex = exports.toDecimal = exports.toOctal = exports.toBinary = exports.Converter = void 0;
/**
 * 进制转换
 * @ignore
 * @param {string} value 转换的值
 * @param {number} from 将 from进制(2|8|10|16) 转成 to 进制
 * @param {number} to 目标进制
 */
const _fn = (value, from, to) => {
    return parseInt(value, from).toString(to);
};
const _toBinary = (value, from) => {
    return _fn(value, from, 2);
};
const _toOctal = (value, from) => {
    return _fn(value, from, 8);
};
const _toDecimal = (value, from) => {
    const radix = _fn(value, from, 10);
    return radix.length < 2 ? `0${radix}` : radix;
};
const _toHex = (value, from) => {
    const radix = _fn(value, from, 16);
    return radix.length < 2 ? `0${radix}` : radix;
};
const _fillLength = (value, len) => {
    return (new Array(len + 1).fill('0').join('') + value).slice(-len);
};
/**
 * 转换器
 */
class Converter {
    /**
     * 进制转换器
     * @param value 待转换的数值字符串
     * @param from 数值进制类型（二进制、八进制、十进制、十六进制）
     */
    constructor(value, from) {
        this.value = '';
        this.from = 10;
        if (!value || !from) {
            return this;
        }
        this.value = value;
        this.from = from;
        return this;
    }
    /**
     * 转为二进制
     */
    toBinary() {
        return _toBinary(this.value, this.from);
    }
    /**
     * 转为八进制
     */
    toOctal() {
        return _toOctal(this.value, this.from);
    }
    /**
     * 转为十进制
     */
    toDecimal() {
        return _toDecimal(this.value, this.from);
    }
    /**
     * 转为十进制数值
     */
    toDecimalNumber() {
        return parseInt(this.value, this.from);
    }
    /**
     * 转为十六进制
     */
    toHex() {
        return _toHex(this.value, this.from);
    }
    /**
     *
     * 获取指定长度字符串
     * @param len 字符串长度
     * @param value 指定值（默认 this.value）
     */
    fill(len, value = '') {
        return _fillLength(value || this.value, len);
    }
    fillBinary(value = '') {
        return this.fill((this.value.length || 1) * 8, value);
    }
}
exports.Converter = Converter;
exports.toBinary = _toBinary;
exports.toOctal = _toOctal;
exports.toDecimal = _toDecimal;
exports.toHex = _toHex;
exports.fillLength = _fillLength;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQUUsRUFBVSxFQUFVLEVBQUU7SUFDOUQsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQVUsRUFBRTtJQUN4RCxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBYSxFQUFFLElBQVksRUFBVSxFQUFFO0lBQ3ZELE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFhLEVBQUUsSUFBWSxFQUFVLEVBQUU7SUFDekQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkMsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2hELENBQUMsQ0FBQztBQUVGLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBYSxFQUFFLElBQVksRUFBVSxFQUFFO0lBQ3JELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxD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

/***/ }),

/***/ "./build/main/utils/log.js":
/*!*********************************!*\
  !*** ./build/main/utils/log.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = void 0;
exports.warn = (msg) => {
    console.error(`[hardware-suit warn]: ${msg}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLElBQUksR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsRUFBRSxDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUFBIn0=

/***/ }),

/***/ "./build/main/utils/string.js":
/*!************************************!*\
  !*** ./build/main/utils/string.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

String.prototype.toCapital = function () {
    return this.slice(0, 1).toUpperCase() + this.slice(1);
};
String.prototype.toLower = function () {
    return this.slice(0, 1).toLowerCase() + this.slice(1);
};
/**
 * 向左补充0， 默认16位
 */
String.prototype.padLeft = function (maxLength = 16) {
    return this.padStart(maxLength, '0');
};
/**
 * 向右补充0，默认16位
 */
String.prototype.padRight = function (maxLength = 16) {
    return this.padEnd(maxLength, '0');
};
/**
 * 转为16进制数值字符串
 */
String.prototype.toHexNumber = function () {
    if (!this.toString())
        return '';
    return parseInt(this.toString(), 16).toString();
};
// 单个数字转为偶数
String.prototype.toEven = function () {
    return this.toString().length > 1 ? this.toString() : this.padLeft(2);
};
String.prototype.toEvenHex = function () {
    return this.toEven();
};
/**
 * 16进制数组转为偶数16进制字符串
 */
String.prototype.toEvenHexWithArray = function (hex) {
    if (!hex || !hex.length)
        return '';
    return hex.map(h => h.toEvenHex()).join('');
};
String.prototype.format = function (..._args) {
    if (arguments.length === 0) {
        return this.toString();
    }
    const param = arguments[0];
    let s = this;
    if (typeof param === 'object') {
        for (let key in param) {
            s = s.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key]);
        }
        return s.toString();
    }
    else {
        for (let i = 0; i < arguments.length; i++) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
        }
        return s.toString();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUc7SUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUM7QUFDRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVMsWUFBb0IsRUFBRTtJQUN4RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQTtBQUNEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBUyxZQUFvQixFQUFFO0lBQ3pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBQ0Q7O0dBRUc7QUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRztJQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUFFLE9BQU8sRUFBRSxDQUFBO0lBQy9CLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNqRCxDQUFDLENBQUE7QUFDRCxXQUFXO0FBQ1gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUc7SUFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHO0lBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQTtBQUNEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxVQUFTLEdBQWtCO0lBQy9ELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtRQUFFLE9BQU8sRUFBRSxDQUFBO0lBQ2xDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUM3QyxDQUFDLENBQUE7QUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFTLEdBQUcsS0FBZTtJQUNuRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3hCO0lBQ0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNiLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3JCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ2hFO1FBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDcEI7U0FBTTtRQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDckI7QUFDSCxDQUFDLENBQUMifQ==

/***/ }),

/***/ "./build/main/utils/suiter.js":
/*!************************************!*\
  !*** ./build/main/utils/suiter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SuitStatus = exports.SuitTypes = exports.Suiter = void 0;
/**
 * 套件配置表模块
 *
 * 主类型、子类型均为16机制值
 * <pre>
 *  object<string, string> type:  设备类型匹配表.
 *    设备分为主设备类型及子设备类型，主类型的key为主类型码，
 *    子类型由主类型码及子类型码组成key <br/>
 *
 *  object<string, string> status: 设备状态匹配表，
 *    分类主类型设备状态，及子类型设备状态，其中主类型状态key由主类型码+状态码组成，
 *    子设备类型状态key由主类型码+子类型码+状态码组成 <br/>
 *
 *  object<string, array> group: 设备类型分组，同组类型状态截码位相同<br/>
 * </pre>
 */
exports.Suiter = {
    led: {
        /**
         * led.type 类
         */
        type: {
            '01': '灯',
            '0101': '单色灯',
            '0102': '双色灯',
            '0103': '三色光',
            '0111': '1路滑条调光',
            '0112': '2路滑条调光',
            '0113': '3路滑条调光',
            '0114': '4路滑条调光',
            '0115': '5路滑条调光',
            '0116': '6路滑条调光',
            '0119': '单 + 双',
            '0120': '单 + 三',
            '0121': '双 + 三',
            '0122': '单 + 双 + 三',
            '0132': '单线供电调光器',
            '0133': '风扇灯'
        },
        /**
         * led.status 状态
         * 状态转移至 Equip
         */
        status: {},
        /**
         * led.group 状态分组
         */
        group: {
            root: ['01'],
            simple: ['01', '02'],
            color: ['01', '02', '03'],
            way: ['13'],
            // 单色灯
            plain: ['01'],
            // 双色灯
            bicolor: ['02'],
            // 三色灯
            tricolor: ['03']
        }
    },
    /**
     * 电饭煲
     * @namespace Suiter.cooker
     */
    cooker: {
        // 电饭煲
        type: {
            '02': '智能电饭煲'
        }
    },
    /**
     * 加湿器
     * @namespace Suiter.humidifier
     */
    humidifier: {
        // 加湿器
        type: {
            '03': '智能加湿器'
        }
    },
    /**
     * 插座开关
     * @namespace Suiter.socketSwitch
     */
    socketSwitch: {
        // 插座开关
        type: {
            '04': '插座开关',
            // 智能插座
            '0401': '1路插座',
            // '0402': '单线开关'（停用）,
            // '0403': '触摸开关'（停用）,
            '0412': '2路插座',
            '0413': '3路插座',
            '0414': '4路插座',
            // 触摸开关
            '0421': '1路开关',
            '0422': '2路开关',
            '0423': '3路开关',
            '0424': '4路开关',
            '0425': '5路开关',
            '0426': '6路开关',
            // '0427': '触摸开关',
            '0428': '8路开关',
            // 情景开关
            '0431': '1路情景开关',
            '0432': '2路情景开关',
            '0433': '3路情景开关',
            '0434': '4路情景开关',
            '0436': '6键情景开关',
            // 混合开关
            '0441': '1路开关 + 3路情景',
            '0442': '2路开关 + 3路情景',
            '0443': '3路开关 + 3路情景',
            '0461': '1路开关 + 1路情景',
            '0462': '2路开关 + 2路情景',
            // 单线开关
            '0451': '1键单线开关',
            '0452': '2键单线开关',
            '0453': '3键单线开关',
            // 雷达开关
            '0471': '1路开关 + 雷达',
            '04101': '1路情景 + 雷达',
            // 红外
            '0480': '3路开关 + 红外面板',
            '0481': '1路开关 + 3路情景 + 红外面板',
            '0483': '3路开关 + 3路场景 + 红外面板',
            '0486': '6路情景 + 红外对管',
            '0490': 'WiFi插座',
            // 窗帘(情景类型)
            '0491': '2键窗帘面板',
            '0492': '4键窗帘面板',
            '04111': '2键开窗器',
            '04121': '4路情景 + 2调光调色',
            '04122': '可设置6键情景面板',
        },
        status: {
            '0400': '关',
            '0401': '开',
            '0410': '置反',
            '0411': '保持不变'
        },
        group: {
            // 类别分组， 状态取值区间相同，配置后会自动生成相应的判断方法
            root: ['04'],
            // 可设置情景面板
            settableScene: ['122'],
            // 混合面板 byte[1]
            mix: ['41', '42', '43', '62', '83'],
            mixup: ['41', '42', '43', '62', '83'],
            // 智能插座
            plug: ['01', '12', '13', '14'],
            // x 路开关 | TODO 插座开关隔离
            xkey: ['21', '22', '23', '24', '31', '32', '33', '34', '36', '41', '42', '43', '62', '51', '52', '53', '01', '12', '13', '14', '80', '81', '83', '86', '91', '92'],
            // 不设置按键名称类型，情景开关、1个按键的开关、包含情景的一键开关
            dissetKey: ['01', '21', '31', '32', '33', '34', '36', '41', '51', '71', '101', '81', '91', '92']
        },
        // 设备类型索引类型 一键开关 -> 1， 二建开关 -> 2 , 1路开关 + 3路情景面板 -> 1|3
        // 开关|情景|单线|插座|雷达|红外
        typeIndex: {
            // 普通开关
            '0421': '1|',
            '0422': '2|',
            '0423': '3|',
            '0424': '4|',
            // 情景面板
            '0431': '|1',
            '0432': '|2',
            '0433': '|3',
            '0434': '|4',
            '0436': '|6',
            '04122': '|6',
            // 开关情景面板 约定格式： 普通开关|情景
            '0441': '1|3',
            '0442': '2|3',
            '0443': '3|3',
            '0462': '2|2',
            // 单线开关
            '0451': '||1',
            '0452': '||2',
            '0453': '||3',
            // 插座开关
            '0401': '|||1',
            '0412': '|||2',
            '0413': '|||3',
            '0414': '|||4',
            // 雷达
            '0471': '1||||1',
            '04101': '|1|||1',
            // 红外
            '0480': '3|||||1',
            '0481': '1|3||||1',
            '0483': '3|3||||1',
            '0486': '|6||||1',
            // 窗帘面板, 情景按位（bit）取值
            '0491': '|3|||||1',
            '0492': '|6|||||1',
        },
        statusLength: {
            // 不同设备的状态码长度取值
            '01': 2,
            '12': 4,
            '13': 6,
            '14': 8,
            '21': 2,
            '22': 4,
            '23': 6,
            '24': 8,
            '41': 2,
            '42': 4,
            '43': 6,
            '51': 2,
            '52': 4,
            '62': 4,
            '71': 2,
            '81': 2,
            '83': 6
        }
    },
    /**
     * 智能开关
     * @namespace Suiter.smartSwitch
     */
    smartSwitch: {
        // 开关类设备
        type: {
            '05': '智能开关',
            '0501': '窗帘',
            '0502': '投影仪幕布'
        },
        group: {
            root: ['05'],
            curtain: ['01']
        },
        status: {}
    },
    // 电机类
    smartMotor: {
        type: {
            '23': '智能电机',
            '2301': 'DC窗帘',
        },
        group: {
            root: ['05'],
            curtain: ['01']
        }
    },
    /**
     * 智能风扇
     * @namespace Suiter.fans
     */
    fans: {
        type: {
            '06': '智能风扇'
        }
    },
    /**
     * 智能空气净化器
     * @namespace Suiter.airCondition
     */
    airCondition: {
        type: {
            '07': '空调'
        }
    },
    tv: {
        type: {
            '08': '电视'
        }
    },
    usbRf: {
        type: {
            '09': '测试用USB_RF模块'
        }
    },
    gateway: {
        type: {
            '10': '网关',
            '1001': '通用版本',
            '1002': '阿里版本'
        }
    },
    sensors: {
        type: {
            '11': '传感器',
            '1101': '光明',
            '1102': '水浸',
            '1103': '雷达',
            '1104': 'CO',
            '1105': '环境（光湿温）',
            '1106': '人体感应（雷达+红外）',
            '1107': '空气质量（PM2.5+VOC）',
            '1108': '供电检测器',
            '1109': '虚拟雷达',
            '1110': '光线传感器',
            '1111': '温湿度传感器',
            '1112': '烟雾传感器',
            '1113': '超声波传感器',
            '1114': '雷达传感器',
            '1115': '插卡取电',
            '1116': '环境传感器',
            '1117': '感应面板',
            '1118': 'DC红外',
            '1119': 'AC红外',
            '1120': 'PM2.5',
            '1121': '门窗磁',
            '1122': '雷达灯',
            '1123': 'DC人体+光感',
            '1124': 'AC人体+光感',
            '1125': '一键呼救传感器',
            '1126': '尿床传感器',
            '1127': '烟雾传感器',
            '1128': '燃气传感器',
            '1129': '插卡取电' // 插卡取电NFC
        },
        status: {
            // AC 红外
            '1100': '无人',
            '1101': '有人',
            // 插卡取电
            '11fe': '通电导通',
            '11fd': '断电',
            '11ff': '首次上电',
            '111500': '插卡',
            '111501': '拔卡',
            '111510': '断电',
            // 水浸
            '110200': '无异常',
            '110202': '无异常',
            '110201': '水浸警报',
            '112800': '无异常',
            '112802': '无异常',
            '112801': '燃气警报',
            '112700': '无异常',
            '112702': '无异常',
            '112701': '烟雾警报',
            '112600': '无异常',
            '112602': '无异常',
            '112601': '尿床警报',
            '112500': '无异常',
            '112502': '无异常',
            '112501': '呼救警报',
            '111900': '无人',
            '111901': '有人',
            '111902': '无人',
            '111903': '有人',
            '112400': '无人',
            '112401': '有人',
            '112300': '无人',
            '112301': '有人',
            '112302': '无人',
            '112303': '有人',
            '112100': '闭合',
            '112101': '打开',
            '112102': '闭合',
            '112103': '打开',
            // 插卡取电NFC
            '112900': '插卡',
            '112901': '拔卡',
            '112910': '断电',
        },
        group: {
            root: ['11'],
            als: ['01'],
            water: ['02'],
            radar: ['03'],
            co: ['04'],
            env: ['05'],
            body: ['06'],
            electric: ['08'],
            radarVirtual: ['09'],
            light: ['10'],
            humidifier: ['11'],
            smoke: ['12'],
            wave: ['13'],
            radarSence: ['14'],
            cardSense: ['15'],
            pluginPower: ['15', '29'],
            environment: ['16'],
            induction: ['17'],
            dc: '18',
            ac: ['19'],
            pm: ['20'],
            door: ['21'],
            radarLight: ['22'],
            acman: ['23'],
            dcman: ['24'],
            acdcman: ['23', '24'],
            call: ['25'],
            bedwet: ['26'],
            smog: ['27'],
            gas: ['28'],
            // 检测类(协议一致)
            detect: ['02', '21', '25', '26', '27', '28']
        }
    },
    meterReader: {
        type: {
            '12': '智能抄表器',
            '1201': '智能抄表器'
        }
    },
    wireControl: {
        type: {
            '13': '线控面板',
            '1301': '空调线控器'
        },
        group: {
            root: ['11'],
            ac: ['01']
        },
        status: {
            '1300': '关',
            '1301': '开'
        }
    },
    transponder: {
        type: {
            '14': '红外转发器',
            '1401': '蓝牙',
            '1402': 'wifi',
            '1403': '红外线控面板'
        }
    },
    remoteControl: {
        type: {
            '15': '智能遥控设备',
            '1501': '手持单向遥控器'
        }
    },
    autoMover: {
        type: {
            '16': '智能自行设备',
            '1601': '飞机',
            '1602': '机械车'
        },
        group: {
            plane: ['01']
        }
    },
    camera: {
        type: {
            '17': '智能摄像类设备',
            '1701': '固定摄像设备（家用）',
            '1702': '防抖摄像设备（配合云台）'
        },
        group: {
            root: ['17'],
            fixed: ['01'],
            moving: ['02']
        }
    },
    finger: {
        type: {
            '16': '智能门禁，中控指纹机'
        }
    },
    doorLock: {
        type: {
            '21': '锁',
            '2101': '亚太天能智能门锁',
            '2102': '亿万家智能门锁',
            '2103': '家居门锁',
            '2104': '酒店门锁'
        },
        status: {
            '2100': '指纹开锁',
            '2101': '密码开锁',
            '2102': '卡开锁',
            '2103': '钥匙开锁',
            '2104': '遥控开锁',
            '2105': '临时用户开锁',
            '21-1': '关闭',
            '21open0': '指纹开锁',
            '21open1': '密码开锁',
            '21open2': '卡开锁',
            '21open3': '钥匙开锁',
            '21open4': '遥控开锁',
            '21open5': '临时用户开锁',
            '21close4': '反锁',
            '21close5': '门关闭',
            '21close7': '掩门',
            '21close8': '锁开',
            '21close9': '反锁开',
            '21card': '门卡开锁',
            default: '关门'
        },
        group: {
            root: ['21']
        }
    },
    remoteControlLamp: {
        type: {
            '22': '遥控灯',
            '2201': '遥控灯'
        }
    },
    smartCamera: {
        type: {
            '32': '摄像头'
        }
    },
    wifiSocket: {
        type: {
            '80': '单品wifi插座'
        }
    },
    wifiIr: {
        type: {
            '81': '红外转发器'
        }
    },
    infrared: {
        type: {
            '81': '红外转发器'
        }
    },
    obox: {
        type: {
            '10': 'obox',
            '1010': 'obox'
        },
        satus: {
            // device_type + status
            '100': '离线',
            '101': '在线'
        },
        group: {
            root: ['10']
        }
    }
};
/**
 * 套件类型
 */
exports.SuitTypes = Array.from(Object.keys(exports.Suiter)).reduce(
// @ts-ignore
(item, next, index) => {
    if (index === 1) {
        item = exports.Suiter[item].type;
    }
    // @ts-ignore
    return Object.assign(Object.assign({}, item), exports.Suiter[next].type);
});
/**
 * 套件状态，整合所有设备状态
 */
exports.SuitStatus = Array.from(Object.keys(exports.Suiter)).reduce(
// @ts-ignore
(item, next, index) => {
    if (index === 1) {
        item = exports.Suiter[item].status;
    }
    // @ts-ignore
    return Object.assign(Object.assign({}, item), exports.Suiter[next].status);
});
exports.default = exports.Suiter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3N1aXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDVSxRQUFBLE1BQU0sR0FBRztJQUNwQixHQUFHLEVBQUU7UUFDSDs7V0FFRztRQUNILElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxHQUFHO1lBQ1QsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLFdBQVc7WUFDbkIsTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLEtBQUs7U0FDZDtRQUNEOzs7V0FHRztRQUNILE1BQU0sRUFBRSxFQUNQO1FBQ0Q7O1dBRUc7UUFDSCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDWixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNYLE1BQU07WUFDTixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDYixNQUFNO1lBQ04sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2YsTUFBTTtZQUNOLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNqQjtLQUNGO0lBQ0Q7OztPQUdHO0lBQ0gsTUFBTSxF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TSxFQUFFO1lBQ04sUUFBUTtZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPO1lBQ1AsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSztZQUNMLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLFVBQVU7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxDQUFDLElBQUksQ0FB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

/***/ }),

/***/ "./build/main/utils/typeHints.js":
/*!***************************************!*\
  !*** ./build/main/utils/typeHints.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeHints = exports._TypeHints = void 0;
const converter_1 = __webpack_require__(/*! ./converter */ "./build/main/utils/converter.js");
const log_1 = __webpack_require__(/*! ./log */ "./build/main/utils/log.js");
__webpack_require__(/*! ./string */ "./build/main/utils/string.js");
const suiter_1 = __importDefault(__webpack_require__(/*! ./suiter */ "./build/main/utils/suiter.js"));
const Suiter = suiter_1.default;
/**
 * 类型检测器
 */
class _TypeHints {
    constructor() {
        this.__normalTypeProcessor();
        this.__groupTypeProcessor();
        this.__typeIndexPocessor();
    }
    /**
     * 判断是否存在指定设备类型
     * @param suitTypes 类型对象, eg: {'01': '灯',...}
     * @param deviceType 主类型
     * @param deviceChildType  子类型
     */
    __hasNormalType(suitTypes, deviceType, deviceChildType) {
        if (!suitTypes) {
            return false;
        }
        if (!deviceType) {
            log_1.warn('deviceType 不能为空！');
            return false;
        }
        if (!deviceChildType) {
            return !!suitTypes[deviceType.toHexNumber().toEvenHex()];
        }
        return !!suitTypes[`${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`];
    }
    /**
     * 是否是分组设备类型
     * @param group 分组设备类型
     * @param deviceChildType 子类型
     */
    __hasGroupType(group, deviceChildType) {
        if (!group || !group.length) {
            return false;
        }
        if (!deviceChildType) {
            log_1.warn('deviceChildType 不能为空！');
            return false;
        }
        return group.includes(deviceChildType.toHexNumber().toEvenHex());
    }
    /**
     * 获取设备类型
     * @param typeIndex 类型索引对象
     * @param deviceType 设备类型
     * @param deviceChildType 设备子类型
     */
    __getTypeIndex(typeIndex, deviceType, deviceChildType) {
        return typeIndex[`${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`];
    }
    /**
     * 设备类型判断处理器
     * led  ===> isLed = (deviceType, deviceChildType) => {}
     */
    __normalTypeProcessor() {
        Array.from(Object.keys(Suiter)).map(item => {
            const normalTypes = Suiter[item].type; // ==> Suiter['led'].type
            const capital = item.toCapital();
            this[`is${capital}`] = (deviceType, deviceChildType) => {
                return this.__hasNormalType(normalTypes, deviceType, deviceChildType);
            };
        });
    }
    /**
     * 分组设备类型判断处理器
     * led: {group: {simple}} --> isSimpleLed = (deviceChildType, deviceType) => {}
     */
    __groupTypeProcessor() {
        Array.from(Object.keys(Suiter)).map(item => {
            const group = Suiter[item].group;
            const typeValue = new converter_1.Converter(Object.keys(Suiter[item].type)[0] || '0', 10).toHex();
            const mainType = item.toCapital();
            if (group) {
                Array.from(Object.keys(group)).map(key => {
                    const camel = key.toCapital();
                    this[`is${camel}${mainType}`] = (deviceChildType, deviceType) => {
                        if (deviceType && deviceType !== typeValue)
                            return false;
                        return this.__hasGroupType(group[key], deviceChildType);
                    };
                });
            }
        });
    }
    /**
     * 设备类型索引类型，用于界面按键数显示
     * 获取当前设备按键组合值: 一键开关 -> 1
     *
     * 1路开关(0421): getSocketSwitchTypeIndex(04, 21) => 1
     */
    __typeIndexPocessor() {
        Array.from(Object.keys(Suiter)).map(item => {
            const typeIndex = Suiter[item].typeIndex; // {'0401': '1'}
            const mainType = item.toCapital();
            if (typeIndex) {
                this[`get${mainType}TypeIndex`] = (deviceType, deviceChildType) => {
                    return this.__getTypeIndex(typeIndex, deviceType, deviceChildType);
                };
            }
        });
    }
}
exports._TypeHints = _TypeHints;
/**
 * {@link _TypeHints}
 */
exports.TypeHints = new _TypeHints();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZUhpbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3R5cGVIaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsK0JBQTZCO0FBQzdCLG9CQUFrQjtBQUNsQixzREFBNEI7QUFDNUIsTUFBTSxNQUFNLEdBQVEsZ0JBQUksQ0FBQztBQUV6Qjs7R0FFRztBQUNILE1BQWEsVUFBVTtJQUVyQjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGVBQWUsQ0FBQyxTQUFpQixFQUFFLFVBQWtCLEVBQUUsZUFBdUI7UUFDcEYsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsVUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDeEIsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsT0FBTyxDQUFDLENBQUUsU0FBaUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUNuRTtRQUNELE9BQU8sQ0FBQyxDQUFFLFNBQWlCLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNySCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGNBQWMsQ0FBQyxLQUFhLEVBQUUsZUFBdUI7UUFDM0QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsVUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUE7WUFDN0IsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSyxjQUFjLENBQUMsU0FBaUIsRUFBRSxVQUFrQixFQUFFLGVBQXVCO1FBQ25GLE9BQVEsU0FBaUIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2xILENBQUM7SUFFRDs7O09BR0c7SUFDSyxxQkFBcUI7UUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyx5QkFBeUI7WUFDaEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLElBQVksQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixFQUFFLGVBQXVCLEVBQVcsRUFBRTtnQkFDdkYsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssb0JBQW9CO1FBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDckYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xDLElBQUksS0FBSyxFQUFFO2dCQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdkMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM3QixJQUFZLENBQUMsS0FBSyxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQXVCLEVBQUUsVUFBbUIsRUFBVyxFQUFFO3dCQUNqRyxJQUFJLFVBQVUsSUFBSSxVQUFVLEtBQUssU0FBUzs0QkFBRSxPQUFPLEtBQUssQ0FBQTt3QkFDeEQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDMUQsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNLLG1CQUFtQjtRQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQjtZQUMxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbEMsSUFBSSxTQUFTLEVBQUU7Z0JBQ1osSUFBWSxDQUFDLE1BQU0sUUFBUSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsZUFBdUIsRUFBVSxFQUFFO29CQUNqRyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDckUsQ0FBQyxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXhHRCxnQ0F3R0M7QUFFRDs7R0FFRztBQUNVLFFBQUEsU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMifQ==

/***/ })

/******/ });
});
//# sourceMappingURL=hardware-suit.js.map