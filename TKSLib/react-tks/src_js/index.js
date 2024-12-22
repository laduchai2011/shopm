'use strict';

var React = require('react');
var require$$0 = require('react-dom');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$f = ".TKS-Table{width:100%}.TKS-Table--Control{align-items:center;display:flex;justify-content:center;margin:10px 0}.TKS-Table--Row{overflow-x:auto;width:100%}";
styleInject(css_248z$f);

var ContextTable = React.createContext(undefined);

function useFollowState(input) {
    var initialValue = input === null || input === void 0 ? void 0 : input.initialValue;
    var config = input === null || input === void 0 ? void 0 : input.config;
    var registerState = config === null || config === void 0 ? void 0 : config.registerState;
    // const registerStates_: string[] = [];
    var countOccurrences = function (arr, value) {
        return arr.reduce(function (count, currentValue) {
            return currentValue === value ? count + 1 : count;
        }, 0);
    };
    var getRegisterState_ = function (registerState_) {
        var registerStates__ = [];
        for (var i = 0; i < registerState_.length; i++) {
            var state_i = registerState_[i].state;
            if (state_i) {
                registerStates__.push(state_i);
            }
        }
        return registerStates__;
    };
    var registerStates_ = React.useMemo(function () {
        if (registerState) {
            return getRegisterState_(registerState);
        }
        else {
            return [];
        }
    }, [registerState]);
    if (registerState) {
        for (var i = 0; i < registerStates_.length; i++) {
            var valueToCount = registerStates_[i];
            var counter = countOccurrences(registerStates_, valueToCount);
            if (counter > 1) {
                console.warn({
                    message: "Having states that is more one (".concat(counter, ")"),
                    state: valueToCount,
                    all_states: registerStates_
                });
                break;
            }
        }
    }
    else {
        console.warn({
            message: 'You need to registe states that will used in this config!',
            config: config
        });
    }
    var _a = React.useState(function () {
        if (initialValue && registerState) {
            var valueToCount = initialValue;
            var counter = countOccurrences(registerState, valueToCount);
            if (counter === 1) {
                return [initialValue];
            }
            else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    state: initialValue
                });
            }
            return [initialValue];
        }
        else {
            return [];
        }
    }), states = _a[0], setSates = _a[1];
    var _b = React.useState(undefined), newState = _b[0], setNewState = _b[1];
    __spreadArray([], registerStates_, true);
    var getRegistedStateConst = React.useCallback(function () {
        var _a;
        var CONST = {};
        if (registerState) {
            for (var i = 0; i < registerState.length; i++) {
                var state = (_a = registerState[i]) === null || _a === void 0 ? void 0 : _a.state;
                if (state) {
                    CONST[state] = state;
                }
            }
        }
        return CONST;
    }, [registerState]);
    var addState = React.useCallback(function (newState) {
        setNewState(newState);
    }, []);
    React.useEffect(function () {
        if (registerState && newState) {
            // const registerStates_: string[] = getRegisterState_(registerState);
            var valueToCount = newState;
            var counter = countOccurrences(registerStates_, valueToCount);
            if (counter === 1) {
                setSates(function (pre) { return __spreadArray(__spreadArray([], pre, true), [newState], false); });
            }
            else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    method: 'addState'
                });
            }
            setNewState(undefined);
        }
    }, [newState, config, registerStates_, registerState]);
    var clearStates = React.useCallback(function () {
        setSates([]);
    }, []);
    var getCurrrentState = React.useCallback(function () {
        var len = states.length;
        return states[len - 1];
    }, [states]);
    var getBeforeState = React.useCallback(function (index) {
        var len = states.length;
        return states[len - 1 - index];
    }, [states]);
    var getAllState = React.useCallback(function () {
        return states;
    }, [states]);
    var isBeforCurrent = React.useCallback(function (beforeState, currentState) {
        var beforeState_m = getBeforeState(1);
        var currentState_m = getCurrrentState();
        if (beforeState_m === beforeState && currentState_m === currentState) {
            return true;
        }
        return false;
    }, [getBeforeState, getCurrrentState]);
    var _c = React.useState(function () {
        return {
            config: config,
            getData: {
                getRegistedStateConst: getRegistedStateConst,
                getCurrrentState: getCurrrentState,
                getBeforeState: getBeforeState,
                getAllState: getAllState
            },
            setData: {
                addState: addState,
                clearStates: clearStates
            },
            event: { isBeforCurrent: isBeforCurrent }
        };
    }), followState = _c[0], setFollowState = _c[1];
    // useEffect(() => {
    //     setFollowState(pre => {
    //         return {
    //             ...pre,
    //             config: config
    //         }
    //     })
    // }, [])
    React.useEffect(function () {
        setFollowState(function (pre) {
            return __assign(__assign({}, pre), { setData: __assign(__assign({}, pre.setData), { addState: addState }) });
        });
    }, [addState]);
    React.useEffect(function () {
        setFollowState(function (pre) {
            return __assign(__assign({}, pre), { setData: __assign(__assign({}, pre.setData), { clearStates: clearStates }) });
        });
    }, [clearStates]);
    React.useEffect(function () {
        setFollowState(function (pre) {
            return __assign(__assign({}, pre), { getData: __assign(__assign({}, pre.getData), { getCurrrentState: getCurrrentState }) });
        });
    }, [getCurrrentState]);
    React.useEffect(function () {
        setFollowState(function (pre) {
            return __assign(__assign({}, pre), { getData: __assign(__assign({}, pre.getData), { getBeforeState: getBeforeState }) });
        });
    }, [getBeforeState]);
    React.useEffect(function () {
        setFollowState(function (pre) {
            return __assign(__assign({}, pre), { getData: __assign(__assign({}, pre.getData), { getAllState: getAllState }) });
        });
    }, [getAllState]);
    React.useEffect(function () {
        setFollowState(function (pre) {
            return __assign(__assign({}, pre), { event: { isBeforCurrent: isBeforCurrent } });
        });
    }, [isBeforCurrent]);
    return followState;
}

// import React from 'react';
// define color
var WARNING_COLOR = '#d3d602';
var LOAD_STATE = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    READY: 'READY'
};
// load componets
var LOAD_COMPONENTS_CONST = {
    LOADING_TYPE: {
        LINE_CIRCLE: 'LINE_CIRCLE',
        DOT_CIRCLE: 'DOT_CIRCLE',
        SKELETON: 'SKELETON'
    }
};
// message
var TOAST_MESSAGE_CONST = {
    TYPE: {
        SUCCESS: 'SUCCESS',
        WARN: 'WARN',
        ERROR: 'ERROR'
    }
};
// overlay 
var OVERLAY_CONST = {
    SHOW_TYPE: {
        SHOW_TOP: 'SHOW_TOP',
        SHOW_LEFT: 'SHOW_LEFT',
        SHOW_RIGHT: 'SHOW_RIGHT',
        SHOW_BOTTOM: 'SHOW_BOTTOM'
    }
};
// dialog
var DIALOG_CONST = {
    MESSAGE_TYPE: {
        SUCCESS: 'SUCCESS',
        WARN: 'WARN',
        ERROR: 'ERROR'
    }
};

var css_248z$e = ".TKS-Row{--background-color:#fff;width:max-content}.TKS-Row:not(:first-child){cursor:pointer}.TKS-Row-indexColumn{align-items:center;background-color:var(--background-color);display:flex;position:absolute;z-index:5}.TKS-Row-indexColumn>div{align-items:center;border:1px solid gray;box-sizing:border-box;display:flex;height:30px;justify-content:center;width:50px}.TKS-Row-column{background-color:var(--background-color);display:flex;margin-left:100px;z-index:4}";
styleInject(css_248z$e);

var css_248z$d = ".TKS-Cell{--Cell-width:150px;--Cell-height:30px;--Cell-textColor:#000;--Cell-textWeight:300;border:1px solid gray;box-sizing:border-box;color:var(--Cell-textColor);font-weight:var(--Cell-textWeight);height:var(--Cell-height);min-width:50px;overflow:hidden;position:relative;width:var(--Cell-width)}.TKS-Cell>div:first-child,.TKS-Cell>div:nth-child(2){position:absolute;width:100%}.TKS-Cell>div:nth-child(2){align-items:center;display:flex;height:100%;justify-content:center}.TKS-Cell>div:nth-child(3){height:100%;position:absolute;right:0;width:3px}.TKS-Cell>div:nth-child(3).selected{background-color:blue;width:2px}.TKS-Cell>div:nth-child(3):hover{background-color:blue}";
styleInject(css_248z$d);

var css_248z$c = ".TKS-Loading{align-items:center;display:flex;height:100%;justify-content:center;width:100%}";
styleInject(css_248z$c);

var css_248z$b = ".TKS-Load-DotCircle{--dot-index:0;--dotSize:0;--dotBackgroundColor:0;--dotAmount:0;--circleSize:0;height:100vh;width:100vw}.TKS-Load-DotCircle,.TKS-Load-DotCircle>div{align-items:center;display:flex;justify-content:center}.TKS-Load-DotCircle>div{height:50px;width:50px}.TKS-Load-DotCircle>div>span{aspect-ratio:1/1;background-color:var(--dotBackgroundColor);border-radius:50%;height:calc(5px*(var(--dot-index)/var(--dotSize)));position:absolute;transform:rotate(calc(var(--dot-index)*(1turn/var(--dotAmount)))) translateY(var(--circleSize))}";
styleInject(css_248z$b);

document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
document.getElementById.bind(document);

var DotCircle = function (_a) {
    var dotCircleLoad = _a.dotCircleLoad;
    React.useEffect(function () {
        var q_dots = $$('.TKS-Load-DotCircle-dot');
        for (var i = 0; i < q_dots.length; i++) {
            if (q_dots !== undefined) {
                var q_dot = q_dots[i];
                q_dot.style.setProperty('--dot-index', "".concat(i + 1));
                q_dot.style.setProperty('--dotSize', dotCircleLoad.dotSize);
                q_dot.style.setProperty('--dotBackgroundColor', dotCircleLoad.dotBackgroundColor);
                q_dot.style.setProperty('--dotAmount', dotCircleLoad.dotAmount);
                q_dot.style.setProperty('--circleSize', "".concat(dotCircleLoad.circleSize, "px"));
            }
        }
    }, [dotCircleLoad]);
    var spanArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var list_dot = spanArr.map(function (data, index) {
        return (React.createElement("span", { className: 'TKS-Load-DotCircle-dot', key: index }));
    });
    return React.createElement("div", { className: "TKS-Load-DotCircle" },
        React.createElement("div", null, list_dot));
};
var DotCircle$1 = React.memo(DotCircle);

var css_248z$a = ".TKS-Load-LineCircle{--lineBackgroundColor:#000;--lineSize:10;--circleSize:150px;--amplify:1;aspect-ratio:1/1;width:var(--circleSize)}.TKS-Load-LineCircle>svg{align-items:center;animation:TKSLoadingLineCircle1 10s linear infinite;aspect-ratio:1/1;display:flex;justify-content:center;position:relative;width:100%}@keyframes TKSLoadingLineCircle1{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.TKS-Load-LineCircle>svg>circle{fill:none;stroke-width:var(--lineSize);stroke:var(--lineBackgroundColor);stroke-linecap:round;stroke-dasharray:calc(440px*var(--amplify));stroke-dashoffset:calc(440px*var(--amplify));animation:TKSLoadingLineCircle2 4s linear infinite;height:100%;width:100%}@keyframes TKSLoadingLineCircle2{0%,to{stroke-dashoffset:calc(440px*var(--amplify))}50%{stroke-dashoffset:10px}50.1%{stroke-dashoffset:calc(880px*var(--amplify))}}";
styleInject(css_248z$a);

var LineCircle = function (_a) {
    var lineCircleLoad = _a.lineCircleLoad;
    var circleSize = lineCircleLoad.circleSize;
    var lineSize = lineCircleLoad.lineSize;
    var lineBackgroundColor = lineCircleLoad.lineBackgroundColor;
    var amplify = circleSize / 150;
    var r = (circleSize - lineSize) / 2;
    var myElementRef = React.useRef(null);
    React.useEffect(function () {
        if (myElementRef.current) {
            myElementRef.current.style.setProperty('--lineBackgroundColor', lineBackgroundColor);
            myElementRef.current.style.setProperty('--lineSize', "".concat(lineSize));
            myElementRef.current.style.setProperty('--circleSize', "".concat(circleSize, "px"));
            myElementRef.current.style.setProperty('--amplify', "".concat(amplify));
        }
    }, [circleSize, lineBackgroundColor, lineSize, amplify]);
    return React.createElement("div", { className: "TKS-Load-LineCircle", ref: myElementRef },
        React.createElement("svg", null,
            React.createElement("circle", { cx: "".concat(circleSize / 2), cy: "".concat(circleSize / 2), r: r })));
};
var LineCircle$1 = React.memo(LineCircle);

var css_248z$9 = ".TKS-Load-Skeleton{--width:100px;--height:100px;--circleSize:100}.TKS-Load-Skeleton--Loading{height:var(--height);overflow:hidden;position:relative;width:var(--width)}.TKS-Load-Skeleton--Loading:after{background-color:#ddd;z-index:2}.TKS-Load-Skeleton--Loading:after,.TKS-Load-Skeleton--Loading:before{bottom:0;content:\"\";height:100%;left:0;position:absolute;right:0;top:0;width:100%}.TKS-Load-Skeleton--Loading:before{animation:skeletonLoading 1.5s infinite alternate;background:linear-gradient(90deg,#ddd,#fff,#ddd);z-index:3}@keyframes skeletonLoading{0%{left:-50%}to{left:50%}}";
styleInject(css_248z$9);

var Skeleton = function (_a) {
    var skeletonLoad = _a.skeletonLoad;
    var myElementRef = React.useRef(null);
    React.useEffect(function () {
        // const q_skeletonCircle = $('.TKS-Load-Skeleton') as HTMLElement;
        // q_skeletonCircle.style.setProperty('--width', `${skeletonLoad.width}px`);
        // q_skeletonCircle.style.setProperty('--height', `${skeletonLoad.height}px`);
        // if (skeletonLoad.maxminWidth===undefined) {
        //     q_skeletonCircle.style.setProperty('--width', `${skeletonLoad.width}px`);
        // } else {
        //     if (skeletonLoad.maxminWidth==='max') {
        //         q_skeletonCircle.style.setProperty('--width', '100%');
        //     } else if (skeletonLoad.maxminWidth==='min') {
        //         q_skeletonCircle.style.setProperty('--width', 'min-content');
        //     } else {
        //         console.warn('The maxminWidth value of skeletonLoad is invalid. It only recive values: [max, min]');
        //     }
        // }
        // if (skeletonLoad.maxminHeight===undefined) {
        //     q_skeletonCircle.style.setProperty('--height', `${skeletonLoad.height}px`);
        // } else {
        //     if (skeletonLoad.maxminHeight==='max') {
        //         q_skeletonCircle.style.setProperty('--height', '100%');
        //     } else if (skeletonLoad.maxminHeight==='min') {
        //         q_skeletonCircle.style.setProperty('--height', 'min-content');
        //     } else {
        //         console.warn('The maxminHeight value of skeletonLoad is invalid. It only recive values: [max, min]');
        //     }
        // }
        if (myElementRef.current) {
            if (skeletonLoad.maxminWidth === undefined) {
                myElementRef.current.style.setProperty('--width', "".concat(skeletonLoad.width, "px"));
            }
            else {
                if (skeletonLoad.maxminWidth === 'max') {
                    myElementRef.current.style.setProperty('--width', '100%');
                }
                else if (skeletonLoad.maxminWidth === 'min') {
                    myElementRef.current.style.setProperty('--width', 'min-content');
                }
                else {
                    console.warn('The maxminWidth value of skeletonLoad is invalid. It only recive values: [max, min]');
                }
            }
            if (skeletonLoad.maxminHeight === undefined) {
                myElementRef.current.style.setProperty('--height', "".concat(skeletonLoad.height, "px"));
            }
            else {
                if (skeletonLoad.maxminHeight === 'max') {
                    myElementRef.current.style.setProperty('--height', '100%');
                }
                else if (skeletonLoad.maxminHeight === 'min') {
                    myElementRef.current.style.setProperty('--height', 'min-content');
                }
                else {
                    console.warn('The maxminHeight value of skeletonLoad is invalid. It only recive values: [max, min]');
                }
            }
        }
    }, [skeletonLoad]);
    return React.createElement("div", { className: "TKS-Load-Skeleton TKS-Load-Skeleton--Loading", ref: myElementRef });
};
var Skeleton$1 = React.memo(Skeleton);

var Loading = function (_a) {
    var load = _a.load;
    var infor = load.infor;
    switch (load.type) {
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE: {
            if (!((typeof (infor.dotSize) === 'string') &&
                (typeof (infor.dotBackgroundColor) === 'string') &&
                (typeof (infor.dotAmount) === 'string') &&
                (typeof (infor.circleSize) === 'string'))) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: "Loading type is a ".concat(LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE, ", when data type is NOT a DotCircleLoadProps")
                });
            }
            break;
        }
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE: {
            if (!((typeof (infor.lineSize) === 'number') &&
                (typeof (infor.lineBackgroundColor) === 'string') &&
                (typeof (infor.circleSize) === 'number'))) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: "Loading type is a ".concat(LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE, ", when data type is NOT a LineCircleLoadProps")
                });
            }
            break;
        }
        case LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON: {
            if (!((typeof (infor.width) === 'number') &&
                ((infor.maxminWidth === 'max') || (infor.maxminWidth === 'min') || (infor.maxminWidth === undefined)) &&
                (typeof (infor.height) === 'number') &&
                ((infor.maxminHeight === 'max') || (infor.maxminHeight === 'min') || (infor.maxminHeight === undefined)))) {
                console.warn({
                    type: 'Data type NOT valid',
                    message: "Loading type is a ".concat(LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON, ", when data type is NOT a SkeletonLoadProps")
                });
            }
            break;
        }
    }
    return React.createElement("div", { className: "TKS-Loading" },
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.DOT_CIRCLE && React.createElement(DotCircle$1, { dotCircleLoad: load.infor }),
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE && React.createElement(LineCircle$1, { lineCircleLoad: load.infor }),
        load.type === LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON && React.createElement(Skeleton$1, { skeletonLoad: load.infor }));
};
var Loading$1 = React.memo(Loading);

var Cell = function (_a) {
    var _b;
    var data = _a.data, cellIndex = _a.cellIndex, rowIndex = _a.rowIndex, column = _a.column;
    var context = React.useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    var table = context.table, cellElements = context.cellElements, resizableStatus = context.resizableStatus, cellWidth = context.cellWidth, cellX = context.cellX, selectedColumn = context.selectedColumn, columnAmount = context.columnAmount, rowAmount = context.rowAmount;
    var loadDataState = (_b = table === null || table === void 0 ? void 0 : table.control) === null || _b === void 0 ? void 0 : _b.loadDataState;
    React.useEffect(function () {
        // const q_Cell = $$('.TKS-Cell')[cellIndex] as HTMLElement;
        var q_Cell = cellElements.current[cellIndex];
        if (q_Cell) {
            (data === null || data === void 0 ? void 0 : data.width) && q_Cell.style.setProperty('--Cell-width', data === null || data === void 0 ? void 0 : data.width);
            (data === null || data === void 0 ? void 0 : data.height) && q_Cell.style.setProperty('--Cell-height', data === null || data === void 0 ? void 0 : data.height);
            (data === null || data === void 0 ? void 0 : data.textColor) && q_Cell.style.setProperty('--Cell-textColor', data === null || data === void 0 ? void 0 : data.textColor);
            (data === null || data === void 0 ? void 0 : data.textWeight) && q_Cell.style.setProperty('--Cell-textWeight', data === null || data === void 0 ? void 0 : data.textWeight);
        }
    }, [cellElements, cellIndex, data]);
    var handleMouseDown = function (e) {
        // const q_cells = $$('.TKS-Cell');
        var q_cells = cellElements.current;
        cellX.current = e.clientX;
        var sbWidth = window.getComputedStyle(q_cells[cellIndex]).width;
        cellWidth.current = parseInt(sbWidth, 10);
        resizableStatus.current = true;
        selectedColumn.current = column;
        if (resizableStatus.current && selectedColumn.current !== undefined) {
            for (var i = 0; i < rowAmount.current; i++) {
                var qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                qq_cells.children[1].classList.add('selected');
            }
        }
    };
    var skeletonLoad = {
        width: 100,
        height: 100,
        maxminWidth: 'max'
    };
    var load = {
        type: LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON,
        infor: skeletonLoad
    };
    return React.createElement("div", { className: "TKS-Cell", ref: function (el) { return (cellElements.current[cellIndex] = el); } },
        React.createElement("div", null, loadDataState === LOAD_STATE.LOADING && rowIndex !== 0 && React.createElement(Loading$1, { load: load })),
        React.createElement("div", null, data.content),
        React.createElement("div", { onMouseDown: function (e) { return handleMouseDown(e); } }));
};

var Row = function (_a) {
    // console.log('Row', rowIndex)
    var _b, _c;
    var rowData = _a.data, rowIndex = _a.rowIndex;
    var context = React.useContext(ContextTable);
    if (!context) {
        throw new Error('Context in row is undefined');
    }
    var table = context.table, default_pageSize = context.default_pageSize, default_maxRow = context.default_maxRow, cellElements = context.cellElements, resizableStatus = context.resizableStatus, cellWidth = context.cellWidth, cellX = context.cellX, selectedColumn = context.selectedColumn, columnAmount = context.columnAmount, rowAmount = context.rowAmount, pageIndex = context.pageIndex;
    var rowElement = React.useRef(null);
    var isSelectedRow = React.useRef(false);
    if (rowData === null || rowData === void 0 ? void 0 : rowData.cells) {
        columnAmount.current = rowData.cells.length;
    }
    var pageSize = React.useRef(default_pageSize);
    var maxRow = React.useRef(default_maxRow);
    if ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if ((_c = table === null || table === void 0 ? void 0 : table.config) === null || _c === void 0 ? void 0 : _c.maxRow) {
        maxRow.current = table.config.maxRow;
    }
    React.useEffect(function () {
        var handleMouseMove = function (e) {
            // const q_cells = $$('.TKS-Cell');
            var q_cells = cellElements.current;
            var dx = e.clientX - cellX.current;
            var cw = cellWidth.current + dx;
            if (resizableStatus.current && selectedColumn.current !== undefined) {
                for (var i = 0; i < rowAmount.current; i++) {
                    var qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                    qq_cells.style.width = "".concat(cw, "px");
                }
            }
        };
        var handleMouseUp = function (e) {
            resizableStatus.current = false;
            // const q_cells = $$('.TKS-Cell');
            var q_cells = cellElements.current;
            if (selectedColumn.current !== undefined) {
                for (var i = 0; i < rowAmount.current; i++) {
                    var qq_cells = q_cells[(columnAmount.current * i + selectedColumn.current)];
                    qq_cells.children[1].classList.remove('selected');
                }
            }
        };
        var handleMouseLeave = function (e) {
            resizableStatus.current = false;
        };
        document.addEventListener('mousemove', function (e) { return handleMouseMove(e); });
        document.addEventListener('mouseup', function (e) { return handleMouseUp(); });
        document.addEventListener('mouseleave', function (e) { return handleMouseLeave(); });
        return function () {
            document.removeEventListener('mousemove', function (e) { return handleMouseMove(e); });
            document.removeEventListener('mouseup', function (e) { return handleMouseUp(); });
            document.removeEventListener('mouseleave', function (e) { return handleMouseLeave(); });
        };
    }, [cellElements, cellWidth, cellX, columnAmount, resizableStatus, rowAmount, selectedColumn]);
    var handleHoverIn = function (e) {
        var hoverColor = 'rgb(233, 233, 233)';
        if (rowElement.current && rowIndex > 0) {
            rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    };
    var handleHoverOut = function (e) {
        var hoverColor = 'white';
        if (rowElement.current && !isSelectedRow.current) {
            rowElement.current.style.setProperty('--background-color', hoverColor);
        }
    };
    var handleClick = function (e) {
        isSelectedRow.current = !isSelectedRow.current;
    };
    var handleTableIndex = function (columnAmount, rowIndex, cellIndex) {
        return columnAmount * rowIndex + cellIndex;
    };
    var list_cell = (rowData === null || rowData === void 0 ? void 0 : rowData.cells) && rowData.cells.map(function (data, index) {
        return (rowData === null || rowData === void 0 ? void 0 : rowData.cells) && (React.createElement(Cell, { data: data, cellIndex: handleTableIndex(rowData.cells.length, rowIndex, index), rowIndex: rowIndex, column: index, key: index }));
    });
    var dataIndex = pageSize.current ? pageSize.current * (pageIndex - 1) + rowIndex : 0;
    return React.createElement("div", { className: "TKS-Row", ref: rowElement, 
        // handle hover
        onMouseOver: function (e) { return handleHoverIn(); }, onMouseOut: function (e) { return handleHoverOut(); }, onClick: function (e) { return handleClick(); } },
        React.createElement("div", { className: 'TKS-Row-indexColumn' },
            rowIndex > 0 ? React.createElement("div", null, rowIndex) : React.createElement("div", null, pageSize.current),
            rowIndex > 0 ? React.createElement("div", null, dataIndex) : React.createElement("div", null, maxRow.current)),
        React.createElement("div", { className: 'TKS-Row-column' }, list_cell));
};
var Row$1 = React.memo(Row);

var css_248z$8 = ".TKS-Table-Control-selectPageContainer{display:flex;margin:0 25px}.TKS-Table-Control-selectPageContainer>div{align-items:center;background-color:#d8d8d8;border:1px solid #cecece;border-radius:5px;cursor:pointer;display:flex;height:25px;justify-content:center;margin:0 5px;min-width:25px;overflow:hidden;padding:3px;position:relative}.TKS-Table-Control-selectPageContainer>div.selected,.TKS-Table-Control-selectPageContainer>div:hover{background-color:gray;color:#fff}.TKS-Table-Control-selectPageContainer>div>div{align-items:center;display:flex;height:100%;justify-content:center;position:absolute;width:100%}";
styleInject(css_248z$8);

var TKS_Init = {
    removeDefaultFunction: function () {
    },
};

var handleCutPXInString = function (s) {
    var arr = ['p', 'x'];
    var s_new = '';
    for (var i = 0; i < s.length; i++) {
        if (arr.indexOf(s[i]) === -1) {
            s_new = "".concat(s_new).concat(s[i]);
        }
    }
    return s_new.trim();
};

var Control = function () {
    var _a, _b, _c;
    var context = React.useContext(ContextTable);
    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }
    var table = context.table, pageIndex = context.pageIndex, setPageIndex = context.setPageIndex, default_pageSize = context.default_pageSize, default_maxRow = context.default_maxRow, loadDataState = context.loadDataState, follow_loadingState = context.follow_loadingState;
    var id = React.useRef("Control__T: ".concat(React.useId()));
    // const indexInit = 1;
    var firstIndex = 1;
    var nextIndex = React.useRef(0);
    var amountOfIndexCell = 4;
    var _d = React.useState(0), pageIndexCluster = _d[0], setPageIndexCluster = _d[1];
    var _e = React.useState(0), nextPageIndexCluster = _e[0], setNextPageIndexCluster = _e[1];
    var _f = React.useState(undefined), nextPageIndex = _f[0], setNextPageIndex = _f[1];
    var q_selectPageContainer = React.useRef(null);
    var q_loadingContainers = React.useRef([]);
    var _g = React.useState(undefined), load = _g[0], setLoad = _g[1];
    var _h = React.useState(1), loadIndex = _h[0], setLoadIndex = _h[1];
    var pageSize = React.useRef(default_pageSize);
    var maxRow = React.useRef(default_maxRow);
    if ((_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.pageSize) {
        pageSize.current = table.config.pageSize;
    }
    if ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.maxRow) {
        maxRow.current = table.config.maxRow;
    }
    var amountOfPages = React.useCallback(function () {
        if (maxRow.current % pageSize.current > 0) {
            return Math.floor(maxRow.current / pageSize.current) + 1;
        }
        else if (maxRow.current % pageSize.current === 0) {
            return Math.floor(maxRow.current / pageSize.current);
        }
        else {
            return 1;
        }
    }, [maxRow, pageSize]);
    var pageIndexCluster_max = amountOfPages() - amountOfIndexCell;
    var handleLoad = React.useCallback(function (index) {
        if (q_loadingContainers.current[index]) {
            var style_loadingContainer = void 0;
            style_loadingContainer = getComputedStyle(q_loadingContainers.current[index]);
            var circleSize_m = 0;
            var width = Number(handleCutPXInString(style_loadingContainer.width));
            var height = Number(handleCutPXInString(style_loadingContainer.height));
            if (width > height) {
                circleSize_m = height;
            }
            else {
                circleSize_m = width;
            }
            var lineCircleLoad = {
                lineSize: 3,
                lineBackgroundColor: 'blue',
                circleSize: circleSize_m
            };
            var load_m = {
                type: LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE,
                infor: lineCircleLoad
            };
            setLoad(load_m);
            setLoadIndex(index);
        }
    }, []);
    React.useEffect(function () {
        var qq_selectPageContainer = q_selectPageContainer.current;
        if (qq_selectPageContainer) {
            var q_pageIndexs = qq_selectPageContainer.children;
            var _loop_1 = function (i1) {
                if ((![5, 7].includes(i1)) && (loadDataState !== LOAD_STATE.LOADING)) {
                    q_pageIndexs[i1].onclick = function (e) {
                        var _a, _b;
                        var nextIndex_m = 0;
                        switch (i1) {
                            case 0:
                                setNextPageIndexCluster(0);
                                setNextPageIndex(firstIndex);
                                nextIndex_m = i1 + 1;
                                // setNextIndex(i1 + 1);
                                break;
                            case 1:
                                if (pageIndexCluster > 0) {
                                    setNextPageIndexCluster(function (x) { return x - 1; });
                                    nextIndex_m = i1 + 1;
                                    // setNextIndex(i1 + 1);
                                }
                                else {
                                    nextIndex_m = i1;
                                    // setNextIndex(i1);
                                }
                                setNextPageIndex(pageIndexCluster + i1);
                                break;
                            case 4:
                                if (pageIndex < amountOfPages() - 1) {
                                    setNextPageIndexCluster(function (x) { return x + 1; });
                                    nextIndex_m = i1 - 1;
                                    // setNextIndex(i1 - 1);
                                }
                                else if (pageIndex === amountOfPages() - 1) {
                                    nextIndex_m = i1;
                                    // setNextIndex(i1);
                                }
                                setNextPageIndex(pageIndexCluster + i1);
                                break;
                            case 6:
                                setNextPageIndexCluster(amountOfPages() - amountOfIndexCell);
                                setNextPageIndex(amountOfPages());
                                nextIndex_m = i1 - 2;
                                // setNextIndex(i1 - 2);
                                break;
                            default:
                                nextIndex_m = i1;
                                // setNextIndex(i1);
                                setNextPageIndex(pageIndexCluster + i1);
                        }
                        nextIndex.current = nextIndex_m;
                        // onSelectPage(nextIndex_m);
                        if (loadIndex !== i1 && loadDataState !== LOAD_STATE.LOADING) {
                            handleLoad(i1);
                        }
                        var TKS = __assign(__assign({}, TKS_Init), { name: (_a = table === null || table === void 0 ? void 0 : table.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, data: {
                                selectedPage: nextIndex_m
                            } });
                        (_b = table === null || table === void 0 ? void 0 : table.event) === null || _b === void 0 ? void 0 : _b.onSelectedPage(TKS);
                    };
                }
            };
            for (var i1 = 0; i1 < q_pageIndexs.length; i1++) {
                _loop_1(i1);
            }
        }
        return function () {
            if (qq_selectPageContainer) {
                var q_pageIndexs = qq_selectPageContainer.children;
                for (var i1 = 0; i1 < q_pageIndexs.length; i1++) {
                    q_pageIndexs[i1].removeAttribute("onclick");
                }
            }
        };
    }, [(_c = table === null || table === void 0 ? void 0 : table.config) === null || _c === void 0 ? void 0 : _c.name, table === null || table === void 0 ? void 0 : table.event, pageIndexCluster, pageIndex, amountOfPages, loadDataState, nextIndex, handleLoad, loadIndex]);
    React.useEffect(function () {
        var _a, _b, _c;
        // if (beforeLoadDataState.current===LOAD_STATE.LOADING && loadDataState===LOAD_STATE.SUCCESS && isControl_pageIndex_defaultFunction.current===true) {
        //     const qq_selectPageContainer = q_selectPageContainer.current;
        //     if (qq_selectPageContainer && nextPageIndex) {
        //         const q_pageIndexs = qq_selectPageContainer.children;
        //         for (let i = 0; i < q_pageIndexs.length; i++) {
        //             q_pageIndexs[i].classList.remove('selected');
        //         }
        //         setPageIndexCluster(nextPageIndexCluster);
        //         setPageIndex(nextPageIndex);
        //         setNextPageIndex(undefined);
        //         q_pageIndexs[nextIndex.current].classList.add('selected');
        //     }
        // }
        // follow_loadingState?.event?.isBeforCurrent && console.log(11111111, follow_loadingState.event.isBeforCurrent(LOAD_STATE.LOADING, LOAD_STATE.SUCCESS))
        if (((_a = follow_loadingState === null || follow_loadingState === void 0 ? void 0 : follow_loadingState.event) === null || _a === void 0 ? void 0 : _a.isBeforCurrent) &&
            follow_loadingState.event.isBeforCurrent(LOAD_STATE.LOADING, LOAD_STATE.SUCCESS)) {
            var qq_selectPageContainer = q_selectPageContainer.current;
            if (qq_selectPageContainer && nextPageIndex) {
                console.log(666666666);
                var q_pageIndexs = qq_selectPageContainer.children;
                for (var i = 0; i < q_pageIndexs.length; i++) {
                    q_pageIndexs[i].classList.remove('selected');
                }
                setPageIndexCluster(nextPageIndexCluster);
                setPageIndex(nextPageIndex);
                setNextPageIndex(undefined);
                ((_b = follow_loadingState.setData) === null || _b === void 0 ? void 0 : _b.addState) && ((_c = follow_loadingState.setData) === null || _c === void 0 ? void 0 : _c.addState(LOAD_STATE.READY));
                q_pageIndexs[nextIndex.current].classList.add('selected');
            }
        }
    }, [nextPageIndexCluster, nextPageIndex, setPageIndex, follow_loadingState === null || follow_loadingState === void 0 ? void 0 : follow_loadingState.event, follow_loadingState === null || follow_loadingState === void 0 ? void 0 : follow_loadingState.setData]);
    React.useEffect(function () {
        // const qq_selectPageContainer = q_selectPageContainer.current;
        // if (qq_selectPageContainer && isControl_pageIndex_defaultFunction.current===false) {
        //     const q_pageIndexs = qq_selectPageContainer.children;
        //     for (let i = 0; i < q_pageIndexs.length; i++) {
        //         q_pageIndexs[i].classList.remove('selected');
        //     }
        //     if (pageIndex < amountOfIndexCell) {
        //         setPageIndexCluster(0);
        //         q_pageIndexs[pageIndex].classList.add('selected');
        //     }
        //     if (pageIndex >= amountOfIndexCell) {
        //         if (pageIndex === amountOfPages()) {
        //             setPageIndexCluster(pageIndex - amountOfIndexCell);
        //             q_pageIndexs[amountOfIndexCell].classList.add('selected');
        //         } else {
        //             setPageIndexCluster(pageIndex - amountOfIndexCell + 1);
        //             q_pageIndexs[amountOfIndexCell - 1].classList.add('selected');
        //         }
        //     }
        //     if (pageIndex >= amountOfPages()+1) {
        //         console.warn({
        //             message: "pageIndex can't lager than page total",
        //             pageIndex: pageIndex,
        //             pageTotal: amountOfPages()
        //         })
        //     }
        // }    
    }, [amountOfPages, pageIndex]);
    // useEffect(() => {
    //     if (q_loadingContainers.current[nextIndex.current] && loadDataState===LOAD_STATE.LOADING) {
    //         let style_loadingContainer: CSSStyleDeclaration;
    //         if (firstIndexSelected.current) {
    //             style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current - 1]!);
    //         } else if (lastIndexSelected.current) {
    //             style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current + 2]!);
    //         } else {
    //             style_loadingContainer = getComputedStyle(q_loadingContainers.current[nextIndex.current]!);
    //         }
    //         let circleSize_m: number = 0;
    //         const width = Number(handleCutPXInString(style_loadingContainer.width));
    //         const height = Number(handleCutPXInString(style_loadingContainer.height));
    //         if (width > height) {
    //             circleSize_m = height;
    //         } else {
    //             circleSize_m = width;
    //         }
    //         const lineCircleLoad: LineCircleLoadProps = {
    //             lineSize: 3,
    //             lineBackgroundColor: 'blue',
    //             circleSize: circleSize_m
    //         }
    //         const load_m: LoadProps = {
    //             type: LOAD_COMPONENTS_CONST.LOADING_TYPE.LINE_CIRCLE,
    //             infor: lineCircleLoad
    //         }
    //         setLoad(load_m);
    //     } else {
    //         firstIndexSelected.current = false;
    //         lastIndexSelected.current = false;
    //     }
    // }, [loadDataState, firstIndexSelected, lastIndexSelected])
    return React.createElement("div", { className: "TKS-Table-Control" },
        React.createElement("div", { className: "TKS-Table-Control-selectPageContainer", ref: q_selectPageContainer },
            React.createElement("div", null,
                "First",
                React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[0] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 0 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 1 && React.createElement("div", { className: "selected" },
                pageIndexCluster + 1,
                React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[1] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 1 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 2 && React.createElement("div", null,
                pageIndexCluster + 2,
                React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[2] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 2 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 3 && React.createElement("div", null,
                pageIndexCluster + 3,
                React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[3] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 3 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 4 && React.createElement("div", null,
                pageIndexCluster + 4,
                React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[4] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 4 && React.createElement(Loading$1, { load: load }))),
            amountOfPages() >= 5 && (pageIndex <= amountOfPages() - 1) && (pageIndexCluster !== pageIndexCluster_max) && React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    "...",
                    React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[5] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 5 && React.createElement(Loading$1, { load: load }))),
                React.createElement("div", null,
                    "Last",
                    React.createElement("div", { ref: function (el) { return (q_loadingContainers.current[6] = el); } }, loadDataState === LOAD_STATE.LOADING && load !== undefined && loadIndex === 6 && React.createElement(Loading$1, { load: load })))),
            React.createElement("div", null, "".concat(pageIndex, "/").concat(amountOfPages()))));
};

var Table = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var table = _a.table;
    var config = __assign({}, table === null || table === void 0 ? void 0 : table.config);
    var isRender = ((_b = table === null || table === void 0 ? void 0 : table.config) === null || _b === void 0 ? void 0 : _b.columnsInfor) ? true : false;
    var data = (_c = table === null || table === void 0 ? void 0 : table.data) === null || _c === void 0 ? void 0 : _c.values;
    var resizableStatus = React.useRef(false);
    var cellWidth = React.useRef(0);
    var cellX = React.useRef(0);
    var selectedColumn = React.useRef(undefined);
    var columnAmount = React.useRef(0);
    var rowAmount = React.useRef(0);
    var _l = React.useState(1), pageIndex = _l[0], setPageIndex = _l[1];
    var _m = React.useState(undefined), loadDataState = _m[0], setLoadDataState = _m[1];
    var totalRow = React.useRef([]);
    var isControl_pageIndex_defaultFunction = React.useRef(true);
    var isControl_loadDataState_defaultFunction = React.useRef(true);
    var default_pageSize = 10;
    var default_maxRow = 50;
    var pageSize = (_d = table === null || table === void 0 ? void 0 : table.config) === null || _d === void 0 ? void 0 : _d.pageSize;
    var maxRow = (_e = table === null || table === void 0 ? void 0 : table.config) === null || _e === void 0 ? void 0 : _e.maxRow;
    var registedStates = [
        {
            descrition: 'When load data',
            state: LOAD_STATE.LOADING
        },
        {
            descrition: 'When load success',
            state: LOAD_STATE.SUCCESS
        },
        {
            descrition: 'When load failure',
            state: LOAD_STATE.FAILURE
        },
        {
            descrition: 'When load ready',
            state: LOAD_STATE.READY
        }
    ];
    var follow_loadingState = useFollowState({
        config: {
            registerState: registedStates
        }
    });
    React.useEffect(function () {
        var _a, _b, _c, _d, _e;
        if (((_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.pageIndex) !== undefined && ((_b = table === null || table === void 0 ? void 0 : table.control) === null || _b === void 0 ? void 0 : _b.pageIndex) !== null && ((_c = table === null || table === void 0 ? void 0 : table.control) === null || _c === void 0 ? void 0 : _c.pageIndex) < 1) {
            console.warn({
                message: 'pageIndex must is a number > 0',
                pageIndex: (_d = table === null || table === void 0 ? void 0 : table.control) === null || _d === void 0 ? void 0 : _d.pageIndex
            });
        }
        if ((_e = table === null || table === void 0 ? void 0 : table.control) === null || _e === void 0 ? void 0 : _e.pageIndex) {
            setPageIndex(table.control.pageIndex);
            isControl_pageIndex_defaultFunction.current = false;
        }
    }, [(_f = table === null || table === void 0 ? void 0 : table.control) === null || _f === void 0 ? void 0 : _f.pageIndex]);
    React.useEffect(function () {
        var _a;
        if ((_a = table === null || table === void 0 ? void 0 : table.control) === null || _a === void 0 ? void 0 : _a.loadDataState) {
            setLoadDataState(table.control.loadDataState);
            isControl_loadDataState_defaultFunction.current = false;
        }
    }, [(_g = table === null || table === void 0 ? void 0 : table.control) === null || _g === void 0 ? void 0 : _g.loadDataState, loadDataState]);
    React.useEffect(function () {
        var _a, _b;
        if (loadDataState && ((_a = follow_loadingState.setData) === null || _a === void 0 ? void 0 : _a.addState)) {
            (_b = follow_loadingState.setData) === null || _b === void 0 ? void 0 : _b.addState(loadDataState);
        }
    }, [loadDataState, follow_loadingState.setData]);
    // cell
    var cellElements = React.useRef([]);
    if (data) {
        rowAmount.current = data.length + 1;
        if (data.length > default_pageSize) {
            console.warn({
                message: 'Data more than default size (is 10). Data can lose',
                dataSize: data.length,
                defaultSize: default_pageSize
            });
        }
        if (pageSize === undefined) {
            console.warn({
                message: 'You should pass a value for "pageSize"',
                default_pageSize: default_pageSize
            });
        }
        if (maxRow === undefined) {
            console.warn({
                message: 'You should pass a value for "maxRow"',
                default_maxRow: default_maxRow
            });
        }
    }
    var rowForm = {
        cells: []
    };
    // set-up header oncly one time
    var cellHeader = function (fieldName, content, textColor, textWeight) {
        return {
            fieldName: fieldName,
            content: content,
            textColor: textColor,
            textWeight: textWeight
        };
    };
    var rowHeader = {
        cells: []
    };
    if ((config === null || config === void 0 ? void 0 : config.columnsInfor) && (rowHeader === null || rowHeader === void 0 ? void 0 : rowHeader.cells) && (rowForm === null || rowForm === void 0 ? void 0 : rowForm.cells)) {
        for (var i = 0; i < config.columnsInfor.length; i++) {
            // if (config.columnsInfor[i]!==undefined) {
            //     rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            //     rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
            // } else {
            //     rowHeader.cells.push(cellHeader('', `column ${i}`, 'black', '700'));
            //     rowForm.cells.push(cellHeader('', '', WARNING_COLOR, '300'));
            // }
            rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
        }
    }
    var totalRow_m = [];
    if (data) {
        for (var key = 0; key < data.length; key++) {
            // if (data.hasOwnProperty(key)) { 
            //     console.log(`log: ${key}: ${Object.keys(data[key])}`, data[key]);
            // }   
            // const rowData = { ...rowForm.current };
            var rowData = JSON.parse(JSON.stringify(rowForm));
            if ((_h = rowData === null || rowData === void 0 ? void 0 : rowData.cells) === null || _h === void 0 ? void 0 : _h.length) {
                for (var i = 0; i < rowData.cells.length; i++) {
                    var keyIndexInRow = Object.keys(data[key]).indexOf((_j = rowData.cells[i]) === null || _j === void 0 ? void 0 : _j.fieldName);
                    if (keyIndexInRow !== -1) {
                        var selectedKey = (_k = rowData.cells[i]) === null || _k === void 0 ? void 0 : _k.fieldName;
                        rowData.cells[i].content = data[key][selectedKey];
                    }
                    else {
                        rowData.cells[i].content = 'Empty';
                        rowData.cells[i].textColor = WARNING_COLOR;
                    }
                }
                totalRow_m.push(rowData);
            }
        }
    }
    totalRow_m.unshift(rowHeader);
    totalRow.current = totalRow_m;
    var handleControlPos = function () {
        if (config.controlPos === "bottom") {
            return 'bottom';
        }
        else {
            return 'top';
        }
    };
    var list_row = totalRow.current.map(function (data, index) {
        return (React.createElement(Row$1, { data: data, rowIndex: index, key: index }));
    });
    var contextValue = React.useMemo(function () { return ({
        table: table,
        cellElements: cellElements,
        resizableStatus: resizableStatus,
        cellWidth: cellWidth,
        cellX: cellX,
        selectedColumn: selectedColumn,
        columnAmount: columnAmount,
        rowAmount: rowAmount,
        pageIndex: pageIndex,
        setPageIndex: setPageIndex,
        default_pageSize: default_pageSize,
        default_maxRow: default_maxRow,
        loadDataState: loadDataState,
        setLoadDataState: setLoadDataState,
        isControl_pageIndex_defaultFunction: isControl_pageIndex_defaultFunction,
        isControl_loadDataState_defaultFunction: isControl_loadDataState_defaultFunction,
        follow_loadingState: follow_loadingState
    }); }, [table, pageIndex, setPageIndex, loadDataState, follow_loadingState]);
    return React.createElement(ContextTable.Provider, { value: contextValue }, isRender && React.createElement("div", { className: "TKS-Table" },
        handleControlPos() !== 'bottom' && React.createElement("div", { className: 'TKS-Table--Control' },
            React.createElement(Control, null)),
        React.createElement("div", { className: 'TKS-Table--Row' }, list_row),
        handleControlPos() === 'bottom' && React.createElement("div", { className: 'TKS-Table--Control' },
            React.createElement(Control, null))));
};
var index$3 = React.memo(Table);

var css_248z$7 = ".TKS-Dialog{--button1-background-color:blue;--button1-color:#fff;--button2-background-color:#ff0;--button2-color:#000;--button2-color2:#fff;--button3-background-color:red;--button3-color:#fff;--opacity-time:0.3;--show-time:0.3;--button-font-size:1;--button-min-width:60;--message-color:#000;background-color:#fff;border-radius:15px;box-sizing:border-box;cursor:default;opacity:0;padding:5px;transition:opacity calc(var(--opacity-time)*1s) linear;width:300px;z-index:1001}.TKS-Dialog.show{opacity:1}.TKS-Dialog>div:first-child{align-items:center;display:flex;height:max-content;justify-content:flex-end;width:100%}.TKS-Dialog>div:first-child>svg{cursor:pointer}.TKS-Dialog>div:first-child>svg:hover{background-color:#dadada}.TKS-Dialog>div:nth-child(2){display:flex;flex-direction:column;height:150px;width:100%}.TKS-Dialog>div:nth-child(2)>div{align-items:center;display:flex;justify-content:center;width:100%}.TKS-Dialog>div:nth-child(2)>div:first-child{color:var(--message-color);flex-grow:1}.TKS-Dialog>div:nth-child(2)>div:nth-child(2){height:75px}.TKS-Dialog>div:nth-child(3){align-items:center;box-sizing:border-box;display:flex;height:50px;justify-content:space-around;padding:5px;width:100%}.TKS-Dialog>div:nth-child(3)>button{aspect-ratio:3/2;border-radius:10px;box-sizing:border-box;cursor:pointer;font-size:calc(var(--button-font-size)*1em);min-width:calc(var(--button-min-width)*1px);padding:5px;width:max-content}.TKS-Dialog-botton1{background-color:var(--button1-background-color);border:1px solid var(--button1-background-color);color:var(--button1-color)}.TKS-Dialog-botton1:hover{background-color:var(--button1-color);color:var(--button1-background-color)}.TKS-Dialog-botton1:active{background-color:var(--button1-background-color);border:1px solid var(--button1-background-color);color:var(--button1-color)}.TKS-Dialog-botton2{background-color:var(--button2-background-color);border:1px solid var(--button2-background-color);color:var(--button2-color)}.TKS-Dialog-botton2:hover{background-color:var(--button2-color2);color:var(--button2-color)}.TKS-Dialog-botton2:active{background-color:var(--button2-background-color);border:1px solid var(--button2-background-color);color:var(--button2-color)}.TKS-Dialog-botton3{background-color:var(--button3-background-color);border:1px solid var(--button3-background-color);color:var(--button3-color)}.TKS-Dialog-botton3:hover{background-color:var(--button3-color);color:var(--button3-background-color)}.TKS-Dialog-botton3:active{background-color:var(--button3-background-color);border:1px solid var(--button3-background-color);color:var(--button3-color)}.TKS-Dialog>div:nth-child(4){height:max-content;width:100%}";
styleInject(css_248z$7);

var css_248z$6 = ".TKS-DeleteCircle{--size:30;--background: ;--fill:transparent;--stroke:#000;--animation-time:0;--stroke-width:1;stroke:var(--stroke);stroke-width:var(--stroke-width);fill:var(--fill);animation:TKSDeleteCircle calc(var(--animation-time)*1s) linear infinite;aspect-ratio:1/1;background-color:var(--background);border-radius:50%;scale:1;width:calc(var(--size)*1px)}@keyframes TKSDeleteCircle{0%,to{scale:.9}50%{scale:1}80%{scale:1.1}}";
styleInject(css_248z$6);

var DeleteCircle = function (_a) {
    var deleteCircle = _a.deleteCircle, props = __rest(_a, ["deleteCircle"]);
    var deleteCircleElement = React.useRef(null);
    React.useEffect(function () {
        if (deleteCircleElement.current) {
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.size) && deleteCircleElement.current.style.setProperty('--size', "".concat(deleteCircle.size));
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.background) && deleteCircleElement.current.style.setProperty('--background', "".concat(deleteCircle.background));
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.fill) && deleteCircleElement.current.style.setProperty('--fill', "".concat(deleteCircle.fill));
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.stroke) && deleteCircleElement.current.style.setProperty('--stroke', "".concat(deleteCircle.stroke));
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.animation_time) && deleteCircleElement.current.style.setProperty('--animation-time', "".concat(deleteCircle.animation_time));
            (deleteCircle === null || deleteCircle === void 0 ? void 0 : deleteCircle.stroke_width) && deleteCircleElement.current.style.setProperty('--stroke-width', "".concat(deleteCircle.stroke_width));
        }
    }, [deleteCircle]);
    return React.createElement("svg", __assign({ className: "TKS-DeleteCircle", ref: deleteCircleElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("circle", { cx: '12', cy: '12', r: '12' }),
        React.createElement("path", { d: "M5,5 L19,19 Z M5,19 L19,5 Z" }),
        props.children);
};
var DeleteCircle$1 = React.memo(DeleteCircle);

var css_248z$5 = ".TKS-TickSymbol{--size:30;--background:#0f0;--fill:transparent;--stroke:#000;--animation-time:0;--stroke-width:1;stroke:var(--stroke);stroke-width:var(--stroke-width);fill:var(--fill);animation:TKSTickSymbol calc(var(--animation-time)*1s) linear infinite;aspect-ratio:1/1;background-color:var(--background);border-radius:50%;scale:1;width:calc(var(--size)*1px)}@keyframes TKSTickSymbol{0%,to{scale:.9}50%{scale:1}80%{scale:1.1}}";
styleInject(css_248z$5);

var TickSymbol = function (_a) {
    var tickSymbol = _a.tickSymbol, props = __rest(_a, ["tickSymbol"]);
    var tickSymbolElement = React.useRef(null);
    React.useEffect(function () {
        if (tickSymbolElement.current) {
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.size) && tickSymbolElement.current.style.setProperty('--size', "".concat(tickSymbol.size));
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.background) && tickSymbolElement.current.style.setProperty('--background', "".concat(tickSymbol.background));
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.fill) && tickSymbolElement.current.style.setProperty('--fill', "".concat(tickSymbol.fill));
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.stroke) && tickSymbolElement.current.style.setProperty('--stroke', "".concat(tickSymbol.stroke));
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.animation_time) && tickSymbolElement.current.style.setProperty('--animation-time', "".concat(tickSymbol.animation_time));
            (tickSymbol === null || tickSymbol === void 0 ? void 0 : tickSymbol.stroke_width) && tickSymbolElement.current.style.setProperty('--stroke-width', "".concat(tickSymbol.stroke_width));
        }
    }, [tickSymbol]);
    return React.createElement("svg", __assign({ className: "TKS-TickSymbol", ref: tickSymbolElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("circle", { cx: '12', cy: '12', r: '12' }),
        React.createElement("path", { d: "M7,11 L12,19 Z M12,18 L18,6 Z" }),
        props.children);
};
var TickSymbol$1 = React.memo(TickSymbol);

var css_248z$4 = ".TKS-WarnTriangle{--size:35;--background: ;--fill:#ff0;--stroke:#000;--animation-time:0;--stroke-width:1;stroke:var(--stroke);stroke-width:var(--stroke-width);fill:var(--fill);animation:TKSWarnTriangle calc(var(--animation-time)*1s) linear infinite;aspect-ratio:1/1;background-color:var(--background);border-radius:50%;scale:1;width:calc(var(--size)*1px)}@keyframes TKSWarnTriangle{0%,to{scale:.9}50%{scale:1}80%{scale:1.1}}";
styleInject(css_248z$4);

var WarnTriangle = function (_a) {
    var warnTriangle = _a.warnTriangle, props = __rest(_a, ["warnTriangle"]);
    var warnTriangleElement = React.useRef(null);
    React.useEffect(function () {
        if (warnTriangleElement.current) {
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.size) && warnTriangleElement.current.style.setProperty('--size', "".concat(warnTriangle.size));
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.background) && warnTriangleElement.current.style.setProperty('--background', "".concat(warnTriangle.background));
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.fill) && warnTriangleElement.current.style.setProperty('--fill', "".concat(warnTriangle.fill));
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.stroke) && warnTriangleElement.current.style.setProperty('--stroke', "".concat(warnTriangle.stroke));
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.animation_time) && warnTriangleElement.current.style.setProperty('--animation-time', "".concat(warnTriangle.animation_time));
            (warnTriangle === null || warnTriangle === void 0 ? void 0 : warnTriangle.stroke_width) && warnTriangleElement.current.style.setProperty('--stroke-width', "".concat(warnTriangle.stroke_width));
        }
    }, [warnTriangle]);
    return React.createElement("svg", __assign({ className: "TKS-WarnTriangle", ref: warnTriangleElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M1.608,18 L12,0 L22.4,18 Z M12,3 L12,13 Z M12,15 L12,16 Z" }),
        props.children);
};
var WarnTriangle$1 = React.memo(WarnTriangle);

var css_248z$3 = ".TKS-ErrorCircle{--size:30;--background:red;--fill:transparent;--stroke:#fff;--animation-time:0;--stroke-width:1;stroke:var(--stroke);stroke-width:var(--stroke-width);fill:var(--fill);animation:TKSErrorCircle calc(var(--animation-time)*1s) linear infinite;aspect-ratio:1/1;background-color:var(--background);border-radius:50%;scale:1;width:calc(var(--size)*1px)}@keyframes TKSErrorCircle{0%,to{scale:.9}50%{scale:1}80%{scale:1.1}}";
styleInject(css_248z$3);

var ErrorCircle = function (_a) {
    var errorCircle = _a.errorCircle, props = __rest(_a, ["errorCircle"]);
    var errorCircleElement = React.useRef(null);
    React.useEffect(function () {
        if (errorCircleElement.current) {
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.size) && errorCircleElement.current.style.setProperty('--size', "".concat(errorCircle.size));
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.background) && errorCircleElement.current.style.setProperty('--background', "".concat(errorCircle.background));
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.fill) && errorCircleElement.current.style.setProperty('--fill', "".concat(errorCircle.fill));
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.stroke) && errorCircleElement.current.style.setProperty('--stroke', "".concat(errorCircle.stroke));
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.animation_time) && errorCircleElement.current.style.setProperty('--animation-time', "".concat(errorCircle.animation_time));
            (errorCircle === null || errorCircle === void 0 ? void 0 : errorCircle.stroke_width) && errorCircleElement.current.style.setProperty('--stroke-width', "".concat(errorCircle.stroke_width));
        }
    }, [errorCircle]);
    return React.createElement("svg", __assign({ className: "TKS-ErrorCircle", ref: errorCircleElement, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("circle", { cx: '12', cy: '12', r: '12' }),
        React.createElement("path", { d: "M12,3 L12,16 Z M12,18 L12,19 Z" }),
        props.children);
};
var ErrorCircle$1 = React.memo(ErrorCircle);

var Dialog = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var dialog = _a.dialog, props = __rest(_a, ["dialog"]);
    var id = React.useRef("Dialog__T: ".concat(React.useId()));
    var dialogElement = React.useRef(null);
    var showCommand = React.useRef('show');
    var _u = React.useState(), isShow_ = _u[0], setIsShow_ = _u[1];
    var showTime = React.useRef(0.3);
    var messageType = React.useRef(undefined);
    var activate_button_1 = React.useRef(undefined);
    var activate_button_2 = React.useRef(undefined);
    var activate_button_3 = React.useRef(undefined);
    var button_1_name = React.useRef(undefined);
    var button_2_name = React.useRef(undefined);
    var button_3_name = React.useRef(undefined);
    messageType.current = (_b = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _b === void 0 ? void 0 : _b.message_type;
    activate_button_1.current = (_c = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _c === void 0 ? void 0 : _c.activate_button_1;
    activate_button_2.current = (_d = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _d === void 0 ? void 0 : _d.activate_button_2;
    activate_button_3.current = (_e = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _e === void 0 ? void 0 : _e.activate_button_3;
    button_1_name.current = (_f = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _f === void 0 ? void 0 : _f.button_1_name;
    button_2_name.current = (_g = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _g === void 0 ? void 0 : _g.button_2_name;
    button_3_name.current = (_h = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _h === void 0 ? void 0 : _h.button_3_name;
    // set default button
    if (((_j = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _j === void 0 ? void 0 : _j.activate_button_1) === true || ((_k = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _k === void 0 ? void 0 : _k.activate_button_1) === undefined) {
        activate_button_1.current = true;
    }
    if (((_l = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _l === void 0 ? void 0 : _l.activate_button_3) === true || ((_m = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _m === void 0 ? void 0 : _m.activate_button_3) === undefined) {
        activate_button_3.current = true;
    }
    if (((_o = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _o === void 0 ? void 0 : _o.button_1_name) === undefined) {
        button_1_name.current = 'Button 1';
    }
    if (((_p = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _p === void 0 ? void 0 : _p.button_2_name) === undefined) {
        button_2_name.current = 'Button 2';
    }
    if (((_q = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _q === void 0 ? void 0 : _q.button_3_name) === undefined) {
        button_3_name.current = 'Button 3';
    }
    React.useEffect(function () {
        var _a, _b;
        if ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.id) {
            id.current = (_b = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _b === void 0 ? void 0 : _b.id;
        }
    }, [(_r = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _r === void 0 ? void 0 : _r.id]);
    React.useEffect(function () {
        var _a, _b, _c, _d, _e;
        if (dialogElement.current) {
            ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.opacity_time) && dialogElement.current.style.setProperty('--opacity-time', "".concat(dialog === null || dialog === void 0 ? void 0 : dialog.config.opacity_time));
            ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _b === void 0 ? void 0 : _b.show_time) && dialogElement.current.style.setProperty('--show-time', "".concat(dialog === null || dialog === void 0 ? void 0 : dialog.config.show_time)); /*NOT USE*/
            ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _c === void 0 ? void 0 : _c.button_font_size) && dialogElement.current.style.setProperty('--button-font-size', "".concat(dialog === null || dialog === void 0 ? void 0 : dialog.config.button_font_size));
            ((_d = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _d === void 0 ? void 0 : _d.button_min_width) && dialogElement.current.style.setProperty('--button-min-width', "".concat(dialog === null || dialog === void 0 ? void 0 : dialog.config.button_min_width));
            if ((_e = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _e === void 0 ? void 0 : _e.show_time) {
                showTime.current = dialog === null || dialog === void 0 ? void 0 : dialog.config.show_time;
            }
        }
    }, [dialog === null || dialog === void 0 ? void 0 : dialog.config]);
    React.useEffect(function () {
        var _a, _b;
        if (dialogElement.current) {
            ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _a === void 0 ? void 0 : _a.message_color) && dialogElement.current.style.setProperty('--message-color', "".concat((_b = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _b === void 0 ? void 0 : _b.message_color));
        }
    }, [dialog === null || dialog === void 0 ? void 0 : dialog.data]);
    React.useEffect(function () {
        var _a;
        setIsShow_((_a = dialog === null || dialog === void 0 ? void 0 : dialog.control) === null || _a === void 0 ? void 0 : _a.isShow);
    }, [(_s = dialog === null || dialog === void 0 ? void 0 : dialog.control) === null || _s === void 0 ? void 0 : _s.isShow]);
    React.useEffect(function () {
        if (dialogElement.current) {
            if (isShow_) {
                dialogElement.current.style.display = 'block';
                var interval_display_1 = setInterval(function () {
                    if (dialogElement.current) {
                        dialogElement.current.classList.add(showCommand.current);
                    }
                    clearInterval(interval_display_1);
                }, 0);
            }
            else {
                dialogElement.current.classList.remove(showCommand.current);
                var interval_display_2 = setInterval(function () {
                    if (dialogElement.current) {
                        dialogElement.current.style.display = 'none';
                    }
                    clearInterval(interval_display_2);
                }, showTime.current * 1000);
            }
        }
    }, [isShow_]);
    var handleDelete = function (e) {
        var _a, _b, _c;
        var isRemoveDefaultFunction = false;
        if ((_a = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _a === void 0 ? void 0 : _a.onClose) {
            var TKS = __assign(__assign({}, TKS_Init), { name: (_b = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _b === void 0 ? void 0 : _b.name, id: id.current, data: {
                    isShow: false
                }, event: {
                    defaultEvent: e
                }, removeDefaultFunction: function () {
                    isRemoveDefaultFunction = true;
                } });
            (_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClose(TKS);
            if (!isRemoveDefaultFunction) {
                setIsShow_(false);
            }
        }
        else {
            setIsShow_(false);
        }
    };
    var handleButton1Click = function (e) {
        var _a, _b, _c;
        var TKS = __assign(__assign({}, TKS_Init), { name: (_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, event: {
                defaultEvent: e
            } });
        ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _b === void 0 ? void 0 : _b.onClickButton1) && ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClickButton1(TKS));
    };
    var handleButton2Click = function (e) {
        var _a, _b, _c;
        var TKS = __assign(__assign({}, TKS_Init), { name: (_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, event: {
                defaultEvent: e
            } });
        ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _b === void 0 ? void 0 : _b.onClickButton2) && ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClickButton2(TKS));
    };
    var handleButton3Click = function (e) {
        var _a, _b, _c;
        var TKS = __assign(__assign({}, TKS_Init), { name: (_a = dialog === null || dialog === void 0 ? void 0 : dialog.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, event: {
                defaultEvent: e
            } });
        ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _b === void 0 ? void 0 : _b.onClickButton3) && ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.event) === null || _c === void 0 ? void 0 : _c.onClickButton3(TKS));
    };
    return React.createElement("div", __assign({ className: "TKS-Dialog" }, props, { ref: dialogElement, id: id.current }),
        React.createElement("div", null,
            React.createElement(DeleteCircle$1, { deleteCircle: { size: 22 }, onClick: function (e) { return handleDelete(e); } })),
        React.createElement("div", null,
            React.createElement("div", null, (_t = dialog === null || dialog === void 0 ? void 0 : dialog.data) === null || _t === void 0 ? void 0 : _t.message),
            messageType.current === DIALOG_CONST.MESSAGE_TYPE.SUCCESS && React.createElement("div", null,
                React.createElement(TickSymbol$1, null)),
            messageType.current === DIALOG_CONST.MESSAGE_TYPE.WARN && React.createElement("div", null,
                React.createElement(WarnTriangle$1, null)),
            messageType.current === DIALOG_CONST.MESSAGE_TYPE.ERROR && React.createElement("div", null,
                React.createElement(ErrorCircle$1, null))),
        React.createElement("div", null,
            activate_button_1.current && React.createElement("button", { className: 'TKS-Dialog-botton1', onClick: function (e) { return handleButton1Click(e); } }, button_1_name.current),
            activate_button_2.current && React.createElement("button", { className: 'TKS-Dialog-botton2', onClick: function (e) { return handleButton2Click(e); } }, button_2_name.current),
            activate_button_3.current && React.createElement("button", { className: 'TKS-Dialog-botton3', onClick: function (e) { return handleButton3Click(e); } }, button_3_name.current)),
        React.createElement("div", null, props.children));
};
var index$2 = React.memo(Dialog);

var css_248z$2 = ".TKS-Overlay{--zIndex:1000;--opacity-time:0.3;--show-time:0.3;--blear-rate:0.3;background-color:rgba(0,0,0,var(--blear-rate));cursor:pointer;position:fixed;z-index:var(--zIndex)}.TKS-Overlay.setupShowTop{height:100vh;left:0;opacity:0;right:0;top:-100vh;transition:top calc(var(--show-time)*1s) linear,opacity calc(var(--opacity-time)*1s) linear}.TKS-Overlay.showTop{opacity:1;top:0}.TKS-Overlay.setupShowBottom{bottom:-100vh;height:100vh;left:0;opacity:0;right:0;transition:bottom calc(var(--show-time)*1s) linear,opacity calc(var(--opacity-time)*1s) linear}.TKS-Overlay.showBottom{bottom:0;opacity:1}.TKS-Overlay.setupShowLeft{bottom:0;left:-100vw;opacity:0;top:0;transition:left calc(var(--show-time)*1s) linear,opacity calc(var(--opacity-time)*1s) linear;width:100vw}.TKS-Overlay.showLeft{left:0;opacity:1}.TKS-Overlay.setupShowRight{bottom:0;opacity:0;right:-100vw;top:0;transition:right calc(var(--show-time)*1s) linear,opacity calc(var(--opacity-time)*1s) linear;width:100vw}.TKS-Overlay.showRight{opacity:1;right:0}.TKS-Overlay.center{align-items:center;display:flex;justify-content:center}";
styleInject(css_248z$2);

var Overlay = function (_a) {
    var _b, _c, _d;
    var overlay = _a.overlay, props = __rest(_a, ["overlay"]);
    var overlayElement = React.useRef(null);
    var showCommand = React.useRef('showTop');
    var id = React.useRef("Dialog__T: ".concat(React.useId()));
    var _e = React.useState(), isShow_ = _e[0], setIsShow_ = _e[1];
    React.useEffect(function () {
        var _a, _b, _c, _d;
        if (overlayElement.current) {
            ((_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.zIndex) && overlayElement.current.style.setProperty('--zIndex', "".concat(overlay.config.zIndex));
            ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _b === void 0 ? void 0 : _b.opacity_time) && overlayElement.current.style.setProperty('--opacity-time', "".concat(overlay.config.opacity_time));
            ((_c = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _c === void 0 ? void 0 : _c.show_time) && overlayElement.current.style.setProperty('--show-time', "".concat(overlay.config.show_time));
            ((_d = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _d === void 0 ? void 0 : _d.blear_rate) && overlayElement.current.style.setProperty('--blear-rate', "".concat(overlay.config.blear_rate));
        }
    }, [overlay === null || overlay === void 0 ? void 0 : overlay.config]);
    React.useEffect(function () {
        var _a;
        var showType = (_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.show_type;
        if (overlayElement.current) {
            // remove all
            overlayElement.current.classList.remove('setupShowTop');
            overlayElement.current.classList.remove('showTop');
            overlayElement.current.classList.remove('setupShowBottom');
            overlayElement.current.classList.remove('showBottom');
            overlayElement.current.classList.remove('setupShowLeft');
            overlayElement.current.classList.remove('showLeft');
            overlayElement.current.classList.remove('setupShowRight');
            overlayElement.current.classList.remove('showRight');
            switch (showType) {
                case undefined: {
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_TOP: {
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_BOTTOM: {
                    overlayElement.current.classList.add('setupShowBottom');
                    showCommand.current = 'showBottom';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_LEFT: {
                    overlayElement.current.classList.add('setupShowLeft');
                    showCommand.current = 'showLeft';
                    break;
                }
                case OVERLAY_CONST.SHOW_TYPE.SHOW_RIGHT: {
                    overlayElement.current.classList.add('setupShowRight');
                    showCommand.current = 'showRight';
                    break;
                }
                default: {
                    console.warn('Show type is invalid !');
                    overlayElement.current.classList.add('setupShowTop');
                    showCommand.current = 'showTop';
                    break;
                }
            }
        }
    }, [overlay === null || overlay === void 0 ? void 0 : overlay.config]);
    React.useEffect(function () {
        var _a, _b;
        if ((_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.id) {
            id.current = (_b = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _b === void 0 ? void 0 : _b.id;
        }
    }, [(_b = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _b === void 0 ? void 0 : _b.id]);
    React.useEffect(function () {
        var _a;
        setIsShow_((_a = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _a === void 0 ? void 0 : _a.isShow);
    }, [(_c = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _c === void 0 ? void 0 : _c.isShow]);
    React.useEffect(function () {
        if (overlayElement.current) {
            if (isShow_) {
                overlayElement.current.classList.add(showCommand.current);
            }
            else {
                overlayElement.current.classList.remove(showCommand.current);
            }
        }
    }, [isShow_]);
    React.useEffect(function () {
        var _a, _b;
        if (overlayElement.current) {
            if (((_a = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _a === void 0 ? void 0 : _a.isCenter) || ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _b === void 0 ? void 0 : _b.isCenter) === undefined) {
                overlayElement.current.classList.add('center');
            }
            else {
                overlayElement.current.classList.remove('center');
            }
        }
    }, [(_d = overlay === null || overlay === void 0 ? void 0 : overlay.control) === null || _d === void 0 ? void 0 : _d.isCenter]);
    var handleClose = function (e) {
        var _a, _b, _c;
        if (e.target === e.currentTarget) {
            var isRemoveDefaultFunction_1 = false;
            var TKS = __assign(__assign({}, TKS_Init), { name: (_a = overlay === null || overlay === void 0 ? void 0 : overlay.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, data: {
                    isShow: false
                }, event: {
                    defaultEvent: e
                }, removeDefaultFunction: function () {
                    isRemoveDefaultFunction_1 = true;
                } });
            ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.event) === null || _b === void 0 ? void 0 : _b.onClose) && ((_c = overlay === null || overlay === void 0 ? void 0 : overlay.event) === null || _c === void 0 ? void 0 : _c.onClose(TKS));
            if (!isRemoveDefaultFunction_1) {
                setIsShow_(false);
            }
        }
    };
    return React.createElement("div", __assign({ className: "TKS-Overlay", ref: overlayElement, onClick: function (e) { return handleClose(e); } }, props), props.children);
};
var index$1 = React.memo(Overlay);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var client = {};

var hasRequiredClient;

function requireClient () {
	if (hasRequiredClient) return client;
	hasRequiredClient = 1;

	var m = require$$0;
	if (process.env.NODE_ENV === 'production') {
	  client.createRoot = m.createRoot;
	  client.hydrateRoot = m.hydrateRoot;
	} else {
	  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	  client.createRoot = function(c, o) {
	    i.usingClientEntryPoint = true;
	    try {
	      return m.createRoot(c, o);
	    } finally {
	      i.usingClientEntryPoint = false;
	    }
	  };
	  client.hydrateRoot = function(c, h, o) {
	    i.usingClientEntryPoint = true;
	    try {
	      return m.hydrateRoot(c, h, o);
	    } finally {
	      i.usingClientEntryPoint = false;
	    }
	  };
	}
	return client;
}

var clientExports = requireClient();
var ReactDOM = /*@__PURE__*/getDefaultExportFromCjs(clientExports);

var css_248z$1 = ".TKS-ToastMessage{width:0}";
styleInject(css_248z$1);

var css_248z = ".TKS-ToastMessage-MessageBox{--message-color: ;--show-time:1;align-items:center;border:1px solid gray;border-radius:5px;box-sizing:border-box;display:flex;height:50px;margin:5px 0;opacity:1;overflow:hidden;position:fixed;right:-300px;top:0;transition:right calc(var(--show-time)*1s) linear,top 1s linear,opacity 1s linear;width:300px}.TKS-ToastMessage-MessageBox.show{right:0}.TKS-ToastMessage-MessageBox>div:first-child{background-color:var(--message-color);height:100%;width:10px}.TKS-ToastMessage-MessageBox>div:nth-child(2),.TKS-ToastMessage-MessageBox>div:nth-child(4){align-items:center;display:flex;height:100%;margin:5px;width:max-content}.TKS-ToastMessage-MessageBox>div:nth-child(3){align-items:center;display:flex;flex-grow:1;justify-content:center}.TKS-ToastMessage-MessageBox>div:nth-child(4)>svg{cursor:pointer}.TKS-ToastMessage-MessageBox>div:nth-child(4)>svg:hover{background-color:#c9c9c9}";
styleInject(css_248z);

var MessageBox = function (_a) {
    var type = _a.type, message = _a.message;
    var messageBoxElement = React.useRef(null);
    var autoRemoveShow = React.useRef(true);
    var color;
    var successColor = '#6eff33';
    var warnColor = '#ffff00';
    var errorColor = 'red';
    if (type === TOAST_MESSAGE_CONST.TYPE.SUCCESS) {
        color = successColor;
    }
    if (type === TOAST_MESSAGE_CONST.TYPE.WARN) {
        color = warnColor;
    }
    if (type === TOAST_MESSAGE_CONST.TYPE.ERROR) {
        color = errorColor;
    }
    React.useEffect(function () {
        var top = 50;
        if (messageBoxElement.current) {
            messageBoxElement.current.style.setProperty('--show-time', '1');
            var interval_addShow_1 = setInterval(function () {
                messageBoxElement.current && messageBoxElement.current.classList.add('show');
                clearInterval(interval_addShow_1);
            }, 100);
            messageBoxElement.current.style.top = "".concat(top, "px");
            messageBoxElement.current.style.setProperty('--message-color', "".concat(color));
            var interval_removeShow_1 = setInterval(function () {
                if (messageBoxElement.current && autoRemoveShow.current) {
                    messageBoxElement.current.classList.remove('show');
                }
                clearInterval(interval_removeShow_1);
            }, 5000);
        }
    }, [color]);
    var handleDelete = function () {
        if (messageBoxElement.current) {
            messageBoxElement.current.style.setProperty('--show-time', '1');
            messageBoxElement.current.classList.remove('show');
        }
    };
    var handleMouseOver = function () {
        autoRemoveShow.current = false;
    };
    var tickSymbol = {
        size: 30,
        fill: color
    };
    var warnTriangle = {
        size: 30,
        fill: color
    };
    var errorCircle = {
        size: 30,
        fill: color
    };
    var deleteCircle = {
        size: 20
    };
    return React.createElement("div", { className: "TKS-ToastMessage-MessageBox", ref: messageBoxElement, onMouseOver: function () { return handleMouseOver(); } },
        React.createElement("div", null),
        React.createElement("div", null,
            type === TOAST_MESSAGE_CONST.TYPE.SUCCESS && React.createElement(TickSymbol$1, { tickSymbol: tickSymbol }),
            type === TOAST_MESSAGE_CONST.TYPE.WARN && React.createElement(WarnTriangle$1, { warnTriangle: warnTriangle }),
            type === TOAST_MESSAGE_CONST.TYPE.ERROR && React.createElement(ErrorCircle$1, { errorCircle: errorCircle })),
        React.createElement("div", null, message),
        React.createElement("div", null,
            React.createElement(DeleteCircle$1, { deleteCircle: deleteCircle, onClick: function () { return handleDelete(); } })));
};
var MessageBox$1 = React.memo(MessageBox);

var ToastMessage = function (_a) {
    var _b;
    var toastMessage = _a.toastMessage, props = __rest(_a, ["toastMessage"]);
    var id = React.useRef("ToastMessage__T: ".concat(React.useId()));
    var toastMessageElement = React.useRef(null);
    var toastMessageContainerElement = React.useRef(null);
    var maxMessage_ = React.useRef(10);
    var _c = React.useState([]), allData = _c[0], setAllData = _c[1];
    var distanceMessageBoxs = 60;
    React.useEffect(function () {
        var _a;
        var cp_allData = __spreadArray([], allData, true);
        if (toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data) {
            cp_allData.unshift(toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data);
            setAllData(cp_allData);
            if (toastMessageContainerElement.current) {
                var messageBoxDivElements_m = toastMessageContainerElement.current.children;
                var messageBoxDivElements = Array.from(messageBoxDivElements_m);
                var _loop_1 = function (i) {
                    var messageBoxElements = messageBoxDivElements[i].children;
                    if (messageBoxElements[0]) {
                        var pre_top = messageBoxElements[0].style.top;
                        var old_top = Number(handleCutPXInString(pre_top));
                        messageBoxElements[0].style.top = "".concat(old_top + distanceMessageBoxs, "px");
                        if (i === maxMessage_.current) {
                            messageBoxElements[0].style.opacity = '0';
                            var messageBoxDivElements_n_1 = messageBoxDivElements[i];
                            var remove_interval_1 = setInterval(function () {
                                messageBoxDivElements_n_1.remove();
                                clearInterval(remove_interval_1);
                            }, 1000);
                        }
                    }
                };
                for (var i = 0; i < messageBoxDivElements.length; i++) {
                    _loop_1(i);
                }
                createElement({ message: (_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data) === null || _a === void 0 ? void 0 : _a.message });
            }
        }
        // eslint-disable-next-line
    }, [toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data]);
    React.useEffect(function () {
        var _a, _b;
        if ((_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _a === void 0 ? void 0 : _a.max_message) {
            maxMessage_.current = (_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _b === void 0 ? void 0 : _b.max_message;
        }
    }, [toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config]);
    React.useEffect(function () {
        var _a, _b;
        if ((_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _a === void 0 ? void 0 : _a.id) {
            id.current = (_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _b === void 0 ? void 0 : _b.id;
        }
    }, [(_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _b === void 0 ? void 0 : _b.id]);
    React.useEffect(function () {
        var _a, _b, _c;
        var TKS = __assign(__assign({}, TKS_Init), { name: (_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.config) === null || _a === void 0 ? void 0 : _a.name, id: id.current, data: {
                allData: allData
            } });
        ((_b = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.event) === null || _b === void 0 ? void 0 : _b.onData) && ((_c = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.event) === null || _c === void 0 ? void 0 : _c.onData(TKS));
    }, [allData, toastMessage]);
    var createElement = function (createElement) {
        var _a, _b;
        var element = React.createElement(MessageBox$1, { type: (_a = toastMessage === null || toastMessage === void 0 ? void 0 : toastMessage.data) === null || _a === void 0 ? void 0 : _a.type, message: createElement.message });
        var newNode = document.createElement('div');
        newNode.style.width = '300px';
        ReactDOM.createRoot(newNode).render(element);
        (_b = toastMessageContainerElement.current) === null || _b === void 0 ? void 0 : _b.insertBefore(newNode, toastMessageContainerElement.current.firstChild);
    };
    return React.createElement("div", __assign({ className: "TKS-ToastMessage", ref: toastMessageElement }, props, { id: id.current }),
        React.createElement("div", { className: 'TKS-ToastMessage-Container', ref: toastMessageContainerElement }));
};
var index = React.memo(ToastMessage);

function handleNext() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var data = undefined;
    var gen;
    function next() {
        setTimeout(function () {
            gen.next();
        }, 0);
    }
    function generator() {
        var _i, args_1, arg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, args_1 = args;
                    _a.label = 1;
                case 1:
                    if (!(_i < args_1.length)) return [3 /*break*/, 4];
                    arg = args_1[_i];
                    return [4 /*yield*/, arg(data, next)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    return [2 /*return*/];
            }
        });
    }
    gen = generator();
    gen.next();
}

exports.DeleteCircle = DeleteCircle$1;
exports.Dialog = index$2;
exports.ErrorCircle = ErrorCircle$1;
exports.FollowState = useFollowState;
exports.Loading = Loading$1;
exports.Next = handleNext;
exports.OverLay = index$1;
exports.Table = index$3;
exports.TickSymbol = TickSymbol$1;
exports.ToastMessage = index;
exports.WarnTriangle = WarnTriangle$1;
//# sourceMappingURL=index.js.map
