(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[93],{80936:function(t,n,e){var i=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,c="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g,a="object"==typeof self&&self&&self.Object===Object&&self,s=c||a||Function("return this")(),l=Object.prototype.toString,p=Math.max,v=Math.min,b=function(){return s.Date.now()};function g(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==l.call(t)}(t))return NaN;if(g(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=g(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var e=o.test(t);return e||u.test(t)?f(t.slice(2),e?2:8):r.test(t)?NaN:+t}t.exports=function(t,n,e){var i,r,o,u,f,c,a=0,s=!1,l=!1,m=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function d(n){var e=i,o=r;return i=r=void 0,a=n,u=t.apply(o,e)}function h(t){return a=t,f=setTimeout(O,n),s?d(t):u}function j(t){var e=t-c;return void 0===c||e>=n||e<0||l&&t-a>=o}function O(){var t=b();if(j(t))return x(t);f=setTimeout(O,function(t){var e=n-(t-c);return l?v(e,o-(t-a)):e}(t))}function x(t){return f=void 0,m&&i?d(t):(i=r=void 0,u)}function T(){var t=b(),e=j(t);if(i=arguments,r=this,c=t,e){if(void 0===f)return h(c);if(l)return f=setTimeout(O,n),d(c)}return void 0===f&&(f=setTimeout(O,n)),u}return n=y(n)||0,g(e)&&(s=!!e.leading,o=(l="maxWait"in e)?p(y(e.maxWait)||0,n):o,m="trailing"in e?!!e.trailing:m),T.cancel=function(){void 0!==f&&clearTimeout(f),a=0,i=c=r=f=void 0},T.flush=function(){return void 0===f?u:x(b())},T}}}]);