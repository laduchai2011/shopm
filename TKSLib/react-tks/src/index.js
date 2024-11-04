!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define("react-tks",["react"],t):"object"==typeof exports?exports["react-tks"]=t(require("react")):e["react-tks"]=t(e.react)}(self,(e=>(()=>{"use strict";var t={656:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(601),l=n.n(r),o=n(314),a=n.n(o)()(l());a.push([e.id,".TKS-Table-Control-selectPageContainer {\n    margin: 0 25px;\n    display: flex;\n}\n\n.TKS-Table-Control-selectPageContainer > div {\n    background-color: rgb(216, 216, 216);\n    margin: 0 5px;\n    height: 25px;\n    min-width: 25px;\n    padding: 3px;\n    border-radius: 5px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.TKS-Table-Control-selectPageContainer > div.selected,\n.TKS-Table-Control-selectPageContainer > div:hover {\n    background-color: gray;\n    color: white;\n}",""]);const c=a},511:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(601),l=n.n(r),o=n(314),a=n.n(o)()(l());a.push([e.id,".TKS-Cell {\n    --Cell-width: 150px;\n    --Cell-height: 30px;\n    --Cell-textColor: black;\n    --Cell-textWeight: 300;\n}\n\n.TKS-Cell {\n    width: var(--Cell-width);\n    height: var(--Cell-height);\n    color: var(--Cell-textColor);\n    font-weight: var(--Cell-textWeight);\n    border: 1px solid gray;\n    position: relative;\n    overflow: hidden;\n}\n\n.TKS-Cell > div:nth-child(1) {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n}\n\n.TKS-Cell > div:nth-child(2) {\n    width: 3px;\n    height: 100%;\n    position: absolute;\n    right: 0;\n}\n\n.TKS-Cell > div:nth-child(2).selected {\n    background-color: blue;\n    width: 2px;\n}\n\n.TKS-Cell > div:nth-child(2):hover {\n    background-color: blue;\n}",""]);const c=a},897:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(601),l=n.n(r),o=n(314),a=n.n(o)()(l());a.push([e.id,".TKS-Row-indexColumn {\n    position: absolute;\n    width: 100px;\n    display: flex;\n}\n\n.TKS-Row-indexColumn > div {\n    border: 1px solid gray;\n    box-sizing: border-box;\n    padding: 5px;\n    width: 50px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.TKS-Row-column {\n    display: flex;\n    margin-left: 100px;\n}",""]);const c=a},633:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(601),l=n.n(r),o=n(314),a=n.n(o)()(l());a.push([e.id,".TKS-Table {\n    width: max-content;\n}\n\n.TKS-Table--Control {\n    margin: 10px 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}",""]);const c=a},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,l,o){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(a[s]=!0)}for(var i=0;i<e.length;i++){var d=[].concat(e[i]);r&&a[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),l&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=l):d[4]="".concat(l)),t.push(d))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},a=[],c=0;c<e.length;c++){var s=e[c],i=r.base?s[0]+r.base:s[0],d=o[i]||0,u="".concat(i," ").concat(d);o[i]=d+1;var m=n(u),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==m)t[m].references++,t[m].updater(f);else{var p=l(f,r);r.byIndex=c,t.splice(c,0,{identifier:u,updater:p,references:1})}a.push(u)}return a}function l(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,l){var o=r(e=e||[],l=l||{});return function(e){e=e||[];for(var a=0;a<o.length;a++){var c=n(o[a]);t[c].references--}for(var s=r(e,l),i=0;i<o.length;i++){var d=n(o[i]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}o=s}}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var l=void 0!==n.layer;l&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,l&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},155:t=>{t.exports=e}},n={};function r(e){var l=n[e];if(void 0!==l)return l.exports;var o=n[e]={id:e,exports:{}};return t[e](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nc=void 0;var l={};r.r(l),r.d(l,{Table:()=>I});var o=r(155),a=r.n(o),c=r(72),s=r.n(c),i=r(825),d=r.n(i),u=r(659),m=r.n(u),f=r(56),p=r.n(f),v=r(540),h=r.n(v),g=r(113),b=r.n(g),y=r(633),x={};x.styleTagTransform=b(),x.setAttributes=p(),x.insert=m().bind(null,"head"),x.domAPI=d(),x.insertStyleElement=h(),s()(y.A,x),y.A&&y.A.locals&&y.A.locals;const C=(0,o.createContext)(void 0);var S=r(897),T={};T.styleTagTransform=b(),T.setAttributes=p(),T.insert=m().bind(null,"head"),T.domAPI=d(),T.insertStyleElement=h(),s()(S.A,T),S.A&&S.A.locals&&S.A.locals;const w=document.querySelector.bind(document),E=document.querySelectorAll.bind(document);document.getElementById.bind(document);var A=r(511),K={};K.styleTagTransform=b(),K.setAttributes=p(),K.insert=m().bind(null,"head"),K.domAPI=d(),K.insertStyleElement=h(),s()(A.A,K),A.A&&A.A.locals&&A.A.locals;const P=({data:e,index:t,column:n})=>{const r=(0,o.useContext)(C);if(!r)throw new Error("MyComponent must be used within a MyProvider");const{resizableStatus:l,cellWidth:c,cellX:s,selectedColumn:i,columnAmount:d,rowAmount:u}=r;return(0,o.useEffect)((()=>{const n=E(".TKS-Cell")[t];void 0!==n&&((null==e?void 0:e.width)&&n.style.setProperty("--Cell-width",null==e?void 0:e.width),(null==e?void 0:e.height)&&n.style.setProperty("--Cell-height",null==e?void 0:e.height),(null==e?void 0:e.textColor)&&n.style.setProperty("--Cell-textColor",null==e?void 0:e.textColor),(null==e?void 0:e.textWeight)&&n.style.setProperty("--Cell-textWeight",null==e?void 0:e.textWeight))}),[t,e]),a().createElement("div",{className:"TKS-Cell"},a().createElement("div",null,e.content),a().createElement("div",{onMouseDown:e=>(e=>{const r=E(".TKS-Cell");s.current=e.clientX;let o=window.getComputedStyle(r[t]).width;if(c.current=parseInt(o,10),l.current=!0,i.current=n,l.current&&void 0!==i.current)for(let e=0;e<u.current;e++)r[d.current*e+i.current].children[1].classList.add("selected")})(e)}))},M=a().memo((({data:e,index:t})=>{const n=(0,o.useContext)(C);if(!n)throw new Error("MyComponent must be used within a MyProvider");const{resizableStatus:r,cellWidth:l,cellX:c,selectedColumn:s,columnAmount:i,rowAmount:d,config:u}=n;i.current=e.cells.length;const m=(e,t,n)=>e*t+n,f=e.cells.map(((n,r)=>a().createElement(P,{data:n,index:m(e.cells.length,t,r),column:r,key:r})));return a().createElement("div",{className:"TKS-Row",onMouseMove:e=>(e=>{const t=E(".TKS-Cell"),n=e.clientX-c.current,o=l.current+n;if(r.current&&void 0!==s.current)for(let e=0;e<d.current;e++)t[i.current*e+s.current].style.width=`${o}px`})(e),onMouseUp:e=>(()=>{r.current=!1;const e=E(".TKS-Cell");if(void 0!==s.current)for(let t=0;t<d.current;t++)e[i.current*t+s.current].children[1].classList.remove("selected")})()},a().createElement("div",{className:"TKS-Row-indexColumn"},t>0?a().createElement("div",null,t):a().createElement("div",null,u.pageSize),t>0?a().createElement("div",null,t):a().createElement("div",null,u.maxRow)),a().createElement("div",{className:"TKS-Row-column"},f))}));var k=r(656),N={};N.styleTagTransform=b(),N.setAttributes=p(),N.insert=m().bind(null,"head"),N.domAPI=d(),N.insertStyleElement=h(),s()(k.A,N),k.A&&k.A.locals&&k.A.locals;const R=({data:e})=>{const t=(0,o.useContext)(C),[n,r]=(0,o.useState)(0),[l,c]=(0,o.useState)(1),s=e.pageSize,i=e.maxRow;if(!t)throw new Error("MyComponent must be used within a MyProvider");const{onSelectPage:d}=t,u=(0,o.useCallback)((()=>i%s>0?Math.floor(i/s)+1:i%s==0?Math.floor(i/s):1),[i,s]);return(0,o.useEffect)((()=>{const e=w(".TKS-Table-Control-selectPageContainer").children;for(let t=0;t<e.length;t++)[5,7].includes(t)||(e[t].onclick=function(o){for(let t=0;t<e.length;t++)e[t].classList.remove("selected");switch(t){case 0:r(0),c(1),e[t+1].classList.add("selected");break;case 1:n>0?(r((e=>e-1)),e[t+1].classList.add("selected")):e[t].classList.add("selected"),c(n+t);break;case 4:l<u()-1?(r((e=>e+1)),e[t-1].classList.add("selected")):l===u()-1&&e[t].classList.add("selected"),c(n+t);break;case 6:r(u()-4),c(u()),e[t-2].classList.add("selected");break;default:e[t].classList.add("selected"),c(n+t)}});return()=>{for(let t=0;t<e.length;t++)e[t].removeAttribute("onclick")}}),[n,l,u]),(0,o.useEffect)((()=>{d(l)}),[l,d]),a().createElement("div",{className:"TKS-Table-Control"},a().createElement("div",{className:"TKS-Table-Control-selectPageContainer"},a().createElement("div",null,"First"),u()>=1&&a().createElement("div",{className:"selected"},n+1),u()>=2&&a().createElement("div",null,n+2),u()>=3&&a().createElement("div",null,n+3),u()>=4&&a().createElement("div",null,n+4),u()>=5&&l<=u()-1&&a().createElement(a().Fragment,null,a().createElement("div",null,"..."),a().createElement("div",null,"Last")),a().createElement("div",null,`${l}/${u()}`)))},I=({data:e,config:t,onSelectPage:n})=>{var r,l;const c={pageIndex:t.pageIndex,pageSize:t.pageSize,maxRow:t.maxRow},s="#d3d602",i=(0,o.useRef)(!1),d=(0,o.useRef)(0),u=(0,o.useRef)(0),m=(0,o.useRef)(void 0),f=(0,o.useRef)(0),p=(0,o.useRef)(0),v=(0,o.useRef)([]),h=(0,o.useRef)({cells:[]});p.current=e.length+1;const g=(e,t,n,r)=>({fieldName:e,content:t,textColor:n,textWeight:r}),b={cells:[]};for(let e=0;e<t.columnAmount;e++)void 0!==t.columnsInfor&&void 0!==t.columnsInfor[e]?(b.cells.push(g(t.columnsInfor[e].fieldName,t.columnsInfor[e].columnName,"black","700")),h.current.cells.push(g(t.columnsInfor[e].fieldName,"","black","300"))):(b.cells.push(g("",`column ${e}`,"black","700")),h.current.cells.push(g("","",s,"300")));v.current.unshift(b);for(let t=0;t<e.length;t++){const n=JSON.parse(JSON.stringify(h.current));for(let o=0;o<n.cells.length;o++)if(-1!==Object.keys(e[t]).indexOf(null===(r=n.cells[o])||void 0===r?void 0:r.fieldName)){const r=null===(l=n.cells[o])||void 0===l?void 0:l.fieldName;n.cells[o].content=e[t][r]}else n.cells[o].content="Empty",n.cells[o].textColor=s;v.current.push(n)}const y={tableControl:c,rows:v.current},x=()=>"bottom"===t.controlPos?"bottom":"top",S=y.rows.map(((e,t)=>a().createElement(M,{data:e,index:t,key:t}))),T=(0,o.useMemo)((()=>({resizableStatus:i,cellWidth:d,cellX:u,selectedColumn:m,columnAmount:f,rowAmount:p,config:t,onSelectPage:n})),[t,n]);return a().createElement(C.Provider,{value:T},a().createElement("div",{className:"TKS-Table"},"bottom"!==x()&&a().createElement("div",{className:"TKS-Table--Control"},a().createElement(R,{data:y.tableControl})),a().createElement("div",null,S),"bottom"===x()&&a().createElement("div",{className:"TKS-Table--Control"},a().createElement(R,{data:y.tableControl}))))};return l})()));