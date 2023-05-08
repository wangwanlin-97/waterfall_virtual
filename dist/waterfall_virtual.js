!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.waterfall_virtual=e():t.waterfall_virtual=e()}(self,(()=>(()=>{"use strict";var t={596:function(t,e,i){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=s(i(459));e.default=n.default},459:function(t,e){var i=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(n,h){function a(t){try{o(s.next(t))}catch(t){h(t)}}function r(t){try{o(s.throw(t))}catch(t){h(t)}}function o(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}o((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=function(){let t;return class{constructor(e,i,s,n,h,a){if(this.container=null,this.datas=[],this.trueDatas=[],this.heights=[],this.containerHeight=0,this.column=0,this.columnWidth=0,this.min=0,this.max=0,this.gap=0,this.showing=!1,this.reachBottom=!1,this.fetching=!1,this.onReachBottom=()=>{},this.renderedList=new Set,this.debounced=()=>{},t)return t.container=e,t.datas=i,t.min=n,t.max=h,t.gap=a,t.debounced(),t;this.container=e,this.datas=i,this.generateFun=s,this.min=n,this.max=h,this.gap=a,this.showing=!1,this.render(),this.debounced=this.debounce(this.render.bind(this),200),this.refreshAble(),t=this}render(){var t,e;return i(this,void 0,void 0,(function*(){if(!this.container||this.showing)return;if(!this.generateFun)return;this.renderedList.clear(),this.showing=!0,this.container.style.width="100%",this.container.style.height="100%",this.container.style.position="relative",this.container.style.paddingTop="80px",this.container.style.paddingLeft="10px",this.container.style.paddingRight="10px";let i=this.container.offsetWidth-20;i<this.min&&(i=this.min);let s=3,n=(i-(s-1)*this.gap)/s,h=null;for(;n<this.min||n>this.max;){if(n<this.min){if(!0===h)break;s--,h=!1}else{if(!1===h)break;s++,h=!0}n=(i-(s-1)*this.gap)/s}this.columnWidth=n,this.column=s,this.trueDatas=yield this.generateFun(this.datas,this.columnWidth),this.heights=[];for(let t=0;t<s;t++)this.heights[t]=80;this.container.innerHTML="";let a=document.createDocumentFragment();for(let i=0;i<this.trueDatas.length;i++){let s=this.heights.indexOf(Math.min(...this.heights)),h=this.trueDatas[i].ele;h.style.position="absolute",h.style.left="0",h.style.top="0",h.style.transform=`translate(${(n+this.gap)*s+10}px , ${this.heights[s]}px)`;let r=null===(t=this.container.parentElement)||void 0===t?void 0:t.scrollTop,o=null===(e=this.container.parentElement)||void 0===e?void 0:e.clientHeight;this.trueDatas[i].translateX=(n+this.gap)*s+10,this.trueDatas[i].translateY=this.heights[s],void 0!==r&&void 0!==o&&this.trueDatas[i].translateY+this.trueDatas[i].height+this.gap>r&&this.trueDatas[i].translateY+r<=o&&(this.renderedList.add(i),a.appendChild(h)),this.heights[s]+=this.trueDatas[i].height+this.gap}return this.container.appendChild(a),this.container.parentElement&&(this.containerHeight=this.container.parentElement.clientHeight),this.container.style.height=Math.max(...this.heights)+"px",this.showing=!1,this}))}refreshAble(){var t;window.onresize=this.debounce(this.render.bind(this),200),(null===(t=this.container)||void 0===t?void 0:t.parentElement)&&(this.container.parentElement.onscroll=this.debounce(this.update.bind(this),16))}getRange(){var t,e;let i=null===(e=null===(t=this.container)||void 0===t?void 0:t.parentElement)||void 0===e?void 0:e.scrollTop,s=0,n=this.trueDatas.length-1;if(void 0!==i){let t=!1;for(let e=0;e<this.trueDatas.length;e++)if(!t&&this.trueDatas[e].translateY+this.trueDatas[e].height+80>i&&(t=!0,s=e),this.trueDatas[e].translateY-100>this.containerHeight+i){n=e;break}}return[s,n]}update(){let t=this.container;if(t){let[e,i]=this.getRange();i===this.trueDatas.length-1?(this.reachBottom=!0,!this.fetching&&this.onReachBottom()):this.reachBottom=!1;let s=this.renderedList,n=[],h=[],a=Array.from(s),r=t.childNodes;for(let t=e;t<=i;t++)s.has(t)?s.delete(t):n.push(t);s.forEach((t=>{h.push(a.indexOf(t))})),s.clear();for(let t=e;t<=i;t++)s.add(t);if(0===h[0])for(;h.length;){let e=r[0];t.removeChild(e),h.pop()}else for(;h.length;){let e=r[r.length-1];t.removeChild(e),h.pop()}let o=document.createDocumentFragment();if(n.map((t=>{o.appendChild(this.trueDatas[t].ele)})),n[0]===e){let e=t.firstChild;t.insertBefore(o,e)}else t.appendChild(o)}}pushData(t){return i(this,void 0,void 0,(function*(){if(this.container&&this.generateFun){let e=yield this.generateFun(t,this.columnWidth);for(let t=0;t<e.length;t++){let i=this.heights.indexOf(Math.min(...this.heights)),s=e[t].ele;s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.cursor="pointer",s.style.transform=`translate(${(this.columnWidth+this.gap)*i+10}px , ${this.heights[i]}px)`,e[t].translateX=(this.columnWidth+this.gap)*i+10,e[t].translateY=this.heights[i],e[t].ele=s,this.trueDatas.push(e[t]),this.heights[i]+=e[t].height+this.gap}this.container.style.height=Math.max(...this.heights)+"px"}}))}debounce(t,e){let i=null;return function(){i&&clearTimeout(i),i=setTimeout((()=>{t(),clearTimeout(i),i=null}),e)}}}}();e.default=s}},e={};return function i(s){var n=e[s];if(void 0!==n)return n.exports;var h=e[s]={exports:{}};return t[s].call(h.exports,h,h.exports,i),h.exports}(596)})()));