"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[1494],{91494:function(e,n,r){r.d(n,{w:function(){return f}});var t=r(93433),a=r(93324),i=r(13736),s=r(46474),u=r(79188),l=r(47313),o=r(48648),c=r(2532),d=r(465),h=r(73091),v=r(85470),p=r(46417);function f(e){var n=(0,l.useState)([void 0,1]),r=(0,a.Z)(n,2),f=r[0],j=r[1];var m=Object.keys(e.data[0]),g=m.map((function(n){return e.mapHeaders?e.mapHeaders(n):n})),x=(0,l.useMemo)((function(){if(f[0]){var n=f[0];return(0,t.Z)(e.data).sort((function(e,r){var t=String(e[n]).valueOf().toLowerCase(),a=String(r[n]).valueOf().toLowerCase();return t.localeCompare(a)*f[1]}))}return e.data}),[e.data,f]),C=(0,s.R)(x,(function(e){return Object.values(e).join(" ")})),Z=C.search,b=C.setSearch,k=C.items,S=(0,i.h)(k,e.pageSize||20),w=S.items,O=S.Pagination;return(0,p.jsxs)(o.Z,{gap:1,children:[(0,p.jsxs)(o.Z,{direction:"horizontal",gap:1,children:[(0,p.jsx)(c.Z.Control,{type:"text",placeholder:(0,u.KF)("ACTION_SEARCHBY"),value:Z,onChange:function(e){return b(e.target.value)}}),(0,p.jsx)(O,{})]}),(0,p.jsxs)(d.Z,{responsive:!0,hover:!0,bordered:!0,striped:!0,children:[(0,p.jsx)("thead",{children:(0,p.jsx)("tr",{children:g.map((function(e,n){return(0,p.jsxs)("th",{className:"align-middle",onClick:function(){return e=m[n],void(f[0]===e?j([e,-f[1]]):j([e,1]));var e},children:[f[0]===m[n]?1===f[1]?(0,p.jsx)(h.Z,{}):(0,p.jsx)(v.Z,{}):null,e]},n)}))})}),(0,p.jsx)("tbody",{children:w.map((function(n,r){return(0,p.jsx)("tr",{children:m.map((function(r,t){var a,i;return(0,p.jsx)("td",{className:"align-middle",children:(null===(a=e.mapCells)||void 0===a||null===(i=a[r])||void 0===i?void 0:i.call(a,n[r]))||n[r]},t)}))},r)}))})]})]})}}}]);