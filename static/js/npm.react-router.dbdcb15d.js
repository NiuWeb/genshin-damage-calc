"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[3617],{97890:function(e,t,n){n.d(t,{AW:function(){return w},F0:function(){return k},Fg:function(){return S},TH:function(){return b},Z5:function(){return j},s0:function(){return E}});var r=n(93324),a=n(91246),i=n(47313),u=(0,i.createContext)(null);var o=(0,i.createContext)(null);var c=(0,i.createContext)({outlet:null,matches:[]});function s(e,t){if(!e)throw new Error(t)}function l(e,t,n){void 0===n&&(n="/");var r=x(("string"===typeof t?(0,a.cP)(t):t).pathname||"/",n);if(null==r)return null;var i=h(e);!function(e){e.sort((function(e,t){return e.score!==t.score?t.score-e.score:function(e,t){var n=e.length===t.length&&e.slice(0,-1).every((function(e,n){return e===t[n]}));return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((function(e){return e.childrenIndex})),t.routesMeta.map((function(e){return e.childrenIndex})))}))}(i);for(var u=null,o=0;null==u&&o<i.length;++o)u=m(i[o],r);return u}function h(e,t,n,r){return void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===r&&(r=""),e.forEach((function(e,a){var i={relativePath:e.path||"",caseSensitive:!0===e.caseSensitive,childrenIndex:a,route:e};i.relativePath.startsWith("/")&&(i.relativePath.startsWith(r)||s(!1),i.relativePath=i.relativePath.slice(r.length));var u=y([r,i.relativePath]),o=n.concat(i);e.children&&e.children.length>0&&(!0===e.index&&s(!1),h(e.children,t,o,u)),(null!=e.path||e.index)&&t.push({path:u,score:v(u,e.index),routesMeta:o})})),t}var p=/^:\w+$/,f=function(e){return"*"===e};function v(e,t){var n=e.split("/"),r=n.length;return n.some(f)&&(r+=-2),t&&(r+=2),n.filter((function(e){return!f(e)})).reduce((function(e,t){return e+(p.test(t)?3:""===t?1:10)}),r)}function m(e,t){for(var n=e.routesMeta,r={},a="/",i=[],u=0;u<n.length;++u){var o=n[u],c=u===n.length-1,s="/"===a?t:t.slice(a.length)||"/",l=d({path:o.relativePath,caseSensitive:o.caseSensitive,end:c},s);if(!l)return null;Object.assign(r,l.params);var h=o.route;i.push({params:r,pathname:y([a,l.pathname]),pathnameBase:P(y([a,l.pathnameBase])),route:h}),"/"!==l.pathnameBase&&(a=y([a,l.pathnameBase]))}return i}function d(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});var n=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);var r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(function(e,t){return r.push(t),"([^\\/]+)"}));e.endsWith("*")?(r.push("*"),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):a+=n?"\\/*$":"(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)";return[new RegExp(a,t?void 0:"i"),r]}(e.path,e.caseSensitive,e.end),a=(0,r.Z)(n,2),i=a[0],u=a[1],o=t.match(i);if(!o)return null;var c=o[0],s=c.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:u.reduce((function(e,t,n){if("*"===t){var r=l[n]||"";s=c.slice(0,c.length-r.length).replace(/(.)\/+$/,"$1")}return e[t]=function(e,t){try{return decodeURIComponent(e)}catch(n){return e}}(l[n]||""),e}),{}),pathname:c,pathnameBase:s,pattern:e}}function g(e,t,n){var r,i="string"===typeof e?(0,a.cP)(e):e,u=""===e||""===i.pathname?"/":i.pathname;if(null==u)r=n;else{var o=t.length-1;if(u.startsWith("..")){for(var c=u.split("/");".."===c[0];)c.shift(),o-=1;i.pathname=c.join("/")}r=o>=0?t[o]:"/"}var s=function(e,t){void 0===t&&(t="/");var n="string"===typeof e?(0,a.cP)(e):e,r=n.pathname,i=n.search,u=void 0===i?"":i,o=n.hash,c=void 0===o?"":o,s=r?r.startsWith("/")?r:function(e,t){var n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((function(e){".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(r,t):t;return{pathname:s,search:C(u),hash:$(c)}}(i,r);return u&&"/"!==u&&u.endsWith("/")&&!s.pathname.endsWith("/")&&(s.pathname+="/"),s}function x(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;var n=e.charAt(t.length);return n&&"/"!==n?null:e.slice(t.length)||"/"}var y=function(e){return e.join("/").replace(/\/\/+/g,"/")},P=function(e){return e.replace(/\/+$/,"").replace(/^\/*/,"/")},C=function(e){return e&&"?"!==e?e.startsWith("?")?e:"?"+e:""},$=function(e){return e&&"#"!==e?e.startsWith("#")?e:"#"+e:""};function W(){return null!=(0,i.useContext)(o)}function b(){return W()||s(!1),(0,i.useContext)(o).location}function E(){W()||s(!1);var e=(0,i.useContext)(u),t=e.basename,n=e.navigator,r=(0,i.useContext)(c).matches,a=b().pathname,o=JSON.stringify(r.map((function(e){return e.pathnameBase}))),l=(0,i.useRef)(!1);return(0,i.useEffect)((function(){l.current=!0})),(0,i.useCallback)((function(e,r){if(void 0===r&&(r={}),l.current)if("number"!==typeof e){var i=g(e,JSON.parse(o),a);"/"!==t&&(i.pathname=y([t,i.pathname])),(r.replace?n.replace:n.push)(i,r.state)}else n.go(e)}),[t,n,o,a])}function B(e,t){return void 0===t&&(t=[]),null==e?null:e.reduceRight((function(n,r,a){return(0,i.createElement)(c.Provider,{children:void 0!==r.route.element?r.route.element:n,value:{outlet:n,matches:t.concat(e.slice(0,a+1))}})}),null)}function S(e){var t=e.to,n=e.replace,r=e.state;W()||s(!1);var a=E();return(0,i.useEffect)((function(){a(t,{replace:n,state:r})})),null}function w(e){s(!1)}function k(e){var t=e.basename,n=void 0===t?"/":t,r=e.children,c=void 0===r?null:r,l=e.location,h=e.navigationType,p=void 0===h?a.aU.Pop:h,f=e.navigator,v=e.static,m=void 0!==v&&v;W()&&s(!1);var d=P(n),g=(0,i.useMemo)((function(){return{basename:d,navigator:f,static:m}}),[d,f,m]);"string"===typeof l&&(l=(0,a.cP)(l));var y=l,C=y.pathname,$=void 0===C?"/":C,b=y.search,E=void 0===b?"":b,B=y.hash,S=void 0===B?"":B,w=y.state,k=void 0===w?null:w,j=y.key,M=void 0===j?"default":j,O=(0,i.useMemo)((function(){var e=x($,d);return null==e?null:{pathname:e,search:E,hash:S,state:k,key:M}}),[d,$,E,S,k,M]);return null==O?null:(0,i.createElement)(u.Provider,{value:g},(0,i.createElement)(o.Provider,{children:c,value:{location:O,navigationType:p}}))}function j(e){var t=e.children,n=e.location;return function(e,t){W()||s(!1);var n,r=(0,i.useContext)(c).matches,u=r[r.length-1],o=u?u.params:{},h=(u&&u.pathname,u?u.pathnameBase:"/"),p=(u&&u.route,b());if(t){var f,v="string"===typeof t?(0,a.cP)(t):t;"/"===h||(null==(f=v.pathname)?void 0:f.startsWith(h))||s(!1),n=v}else n=p;var m=n.pathname||"/",d=l(e,{pathname:"/"===h?m:m.slice(h.length)||"/"});return B(d&&d.map((function(e){return Object.assign({},e,{params:Object.assign({},o,e.params),pathname:y([h,e.pathname]),pathnameBase:"/"===e.pathnameBase?h:y([h,e.pathnameBase])})})),r)}(M(t),n)}function M(e){var t=[];return i.Children.forEach(e,(function(e){if((0,i.isValidElement)(e))if(e.type!==i.Fragment){e.type!==w&&s(!1);var n={caseSensitive:e.props.caseSensitive,element:e.props.element,index:e.props.index,path:e.props.path};e.props.children&&(n.children=M(e.props.children)),t.push(n)}else t.push.apply(t,M(e.props.children))})),t}}}]);