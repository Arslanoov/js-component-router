define("js-component-router",[],(function(){return function(){"use strict";var t,e={d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.r(n),e.d(n,{RouterMode:function(){return t},Router:function(){return i}}),function(t){t.history="history",t.hash="hash"}(t||(t={}));var i=function(){function e(n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"routes",[]),o(this,"root","/#/"),this.mode=window.history.pushState?t.history:t.hash,this.listen(n),window.router=this,window.addEventListener("load",(function(){return r.listen({},!0)})),this.isHistoryMode()?window.history.pushState=new Proxy(window.history.pushState,{apply:function(t,e,n){var o=t.apply(e,n);return r.listen({}),o}}):window.addEventListener("hashchange",(function(){return r.listen({})}))}var n,i;return n=e,i=[{key:"add",value:function(t,e){return this.routes.push({path:t,cb:e}),this}},{key:"remove",value:function(t){for(var e=0;e<this.routes.length;e++)if(this.routes[e].path===t)return this.routes.slice(e,1),this;return this}},{key:"removeAll",value:function(){return this.routes=[],this}},{key:"navigate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return this.isHistoryMode()?window.history.pushState(null,null,this.root+this.clearSlashes(t)):window.location.href="".concat(window.location.href.replace(/#(.*)$/,""),"#").concat(t),this}},{key:"listen",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];null!=t&&t.mode&&(this.mode=t.mode),null!=t&&t.root&&(this.root=t.root),this.interval(e)}},{key:"interval",value:function(t){var e=this;(this.getFragment()!==this.current||t)&&(this.current=this.getFragment(),this.routes.some((function(t){var n=e.current.match(t.path);return!!n&&(n.shift(),t.cb.apply({},n),n)})))}},{key:"clearSlashes",value:function(t){return t.toString().replace(/\/$/,"").replace(/^\//,"")}},{key:"isHistoryMode",value:function(){return this.mode===t.history}},{key:"getFragment",value:function(){var t,e=window.location.href.match(/#(.*)$/);return this.isHistoryMode()?(t=(t=this.clearSlashes(decodeURIComponent(window.location.pathname+window.location.search))).replace(/\?(.*)$/,""),t="/"!==this.root?t.replace(this.root,""):t):t=e?e[1]:"",this.clearSlashes(t)}}],i&&r(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),e}();return n}()}));