/*! For license information please see npm.react-redux.233f9a63.js.LICENSE.txt */
"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[9794],{85554:function(e,t,n){n.d(t,{zt:function(){return g},I0:function(){return _},v9:function(){return S}});var r=n(51239),o=n(17836),u=n(1168);var c=function(e){e()},a=function(){return c},i=n(47313),f=i.createContext(null);function s(){return(0,i.useContext)(f)}var l=function(){throw new Error("uSES not initialized!")},v=l,b=function(e,t){return e===t};function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=e===f?s:function(){return(0,i.useContext)(e)};return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:b;var r=t(),o=r.store,u=r.subscription,c=r.getServerState,a=v(u.addNestedSub,o.getState,c||o.getState,e,n);return(0,i.useDebugValue)(a),a}}var S=d();n(67861),n(86440);var y={notify:function(){},get:function(){return[]}};function p(e,t){var n,r=y;function o(){c.onStateChange&&c.onStateChange()}function u(){n||(n=t?t.addNestedSub(o):e.subscribe(o),r=function(){var e=a(),t=null,n=null;return{clear:function(){t=null,n=null},notify:function(){e((function(){for(var e=t;e;)e.callback(),e=e.next}))},get:function(){for(var e=[],n=t;n;)e.push(n),n=n.next;return e},subscribe:function(e){var r=!0,o=n={callback:e,next:null,prev:n};return o.prev?o.prev.next=o:t=o,function(){r&&null!==t&&(r=!1,o.next?o.next.prev=o.prev:n=o.prev,o.prev?o.prev.next=o.next:t=o.next)}}}}())}var c={addNestedSub:function(e){return u(),r.subscribe(e)},notifyNestedSubs:function(){r.notify()},handleChangeWrapper:o,isSubscribed:function(){return Boolean(n)},trySubscribe:u,tryUnsubscribe:function(){n&&(n(),n=void 0,r.clear(),r=y)},getListeners:function(){return r}};return c}var m=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement)?i.useLayoutEffect:i.useEffect;var g=function(e){var t=e.store,n=e.context,r=e.children,o=e.serverState,u=(0,i.useMemo)((function(){var e=p(t);return{store:t,subscription:e,getServerState:o?function(){return o}:void 0}}),[t,o]),c=(0,i.useMemo)((function(){return t.getState()}),[t]);m((function(){var e=u.subscription;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),c!==t.getState()&&e.notifyNestedSubs(),function(){e.tryUnsubscribe(),e.onStateChange=void 0}}),[u,c]);var a=n||f;return i.createElement(a.Provider,{value:u},r)};function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=e===f?s:function(){return(0,i.useContext)(e)};return function(){return t().store}}var x=h();function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=e===f?x:h(e);return function(){return t().dispatch}}var C,E,_=w();C=o.useSyncExternalStoreWithSelector,v=C,function(e){e}(r.useSyncExternalStore),E=u.unstable_batchedUpdates,c=E},15230:function(e,t){var n,r=Symbol.for("react.element"),o=Symbol.for("react.portal"),u=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),f=Symbol.for("react.context"),s=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),v=Symbol.for("react.suspense"),b=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen");function p(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case u:case a:case c:case v:case b:return e;default:switch(e=e&&e.$$typeof){case s:case f:case l:case S:case d:case i:return e;default:return t}}case o:return t}}}n=Symbol.for("react.module.reference")},86440:function(e,t,n){n(15230)}}]);