"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[7669],{10047:function(e,n,r){r.d(n,{gP:function(){return d}});var t=r(93324),u=r(47313);function o(e,n,r,t){Object.defineProperty(e,n,{get:r,set:t,enumerable:!0,configurable:!0})}var i={};o(i,"SSRProvider",(function(){return f})),o(i,"useSSRSafeId",(function(){return d})),o(i,"useIsSSR",(function(){return p}));var c={prefix:String(Math.round(1e10*Math.random())),current:0},a=u.createContext(c);function f(e){var n=(0,u.useContext)(a),r=(0,u.useMemo)((function(){return{prefix:n===c?"":"".concat(n.prefix,"-").concat(++n.current),current:0}}),[n]);return u.createElement(a.Provider,{value:r},e.children)}var s=Boolean("undefined"!==typeof window&&window.document&&window.document.createElement);function d(e){var n=(0,u.useContext)(a);return n!==c||s||console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server."),(0,u.useMemo)((function(){return e||"react-aria".concat(n.prefix,"-").concat(++n.current)}),[e])}function p(){var e=(0,u.useContext)(a)!==c,n=(0,u.useState)(e),r=(0,t.Z)(n,2),o=r[0],i=r[1];return"undefined"!==typeof window&&e&&(0,u.useLayoutEffect)((function(){i(!1)}),[]),o}}}]);