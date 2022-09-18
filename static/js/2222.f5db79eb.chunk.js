"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[2222],{42222:function(e,n,r){r.r(n),r.d(n,{default:function(){return k},position:function(){return V},title:function(){return M}});var t=r(96103),s=r(93433),a=r(79188),c=r(65832),i=r(48648),l=r(93298),o=r(64919),u=r(45043),f=r(59461),d=r(10072),h=r(46417);function x(e){var n=e.character,r=e.modifier,t=e.onChange,s=e.onDelete;return(0,h.jsx)(c.Z,{border:"secondary",children:(0,h.jsx)(c.Z.Body,{children:(0,h.jsxs)(i.Z,{direction:"horizontal",gap:1,children:[(0,h.jsx)(d.w,{value:r.prop,options:g,onChange:function(e){if(e){var n=u.G.Values.isFlatStat(r.prop),s=u.G.Values.isFlatStat(e),a=r.value;r.prop=e,r.value=n!==s?s?100*a:a/100:a,t()}}}),(0,h.jsx)(o.K,{value:r.value,percent:!u.G.Values.isFlatStat(r.prop),onChange:function(e){r.value=e,t()}}),(0,h.jsx)(l.Z,{variant:"danger",onClick:function(){n.customModifiers.removeModifier(r),s()},children:(0,h.jsx)(f.Z,{})})]})})})}var g=u.G.Values.ListCharacterStat.filter((function(e){return!e.match(/ATK$/i)&&!e.includes("Level")&&!e.includes("Ascended")&&"HP"!==e&&"DEF"!==e})),j=r(74308),E=r(13736),m=r(95878);function C(e){var n=e.character,r=e.onChange,t=n.customModifiers.getModifiers(),o=(0,E.h)(t,6);return(0,h.jsxs)(c.Z,{children:[(0,h.jsx)(c.Z.Header,{className:"bg-info ",children:(0,h.jsx)("h5",{className:"m-0",children:(0,a.KF)("EFFECT_CUSTOM")})}),(0,h.jsx)(c.Z.Body,{children:(0,h.jsxs)(i.Z,{gap:1,children:[(0,h.jsxs)(l.Z,{onClick:function(){n.customModifiers.createModifier("ATKpercent",0),r()},children:[(0,h.jsx)(j.Z,{className:"me-1",style:{verticalAlign:"-0.125em"}}),(0,a.KF)("ACTION_ADD")]}),(0,s.Z)(o.items).reverse().map((function(e,t){return(0,h.jsx)(m.L,{children:function(t){return(0,h.jsx)(x,{character:n,modifier:e,onChange:t,onDelete:r})}},t)})),t.length<=6?null:(0,h.jsx)("div",{className:"d-flex justify-content-center",children:(0,h.jsx)(o.Pagination,{})})]})})]})}var Z=r(1413),F=r(45987),v=r(86828),p=["character","onChange"];function T(e){var n=e.character,r=e.onChange,t=(0,F.Z)(e,p),i=[].concat((0,s.Z)(n.effects.get().filter((function(e){return e.enabled}))),(0,s.Z)(n.effects.getExternal().filter((function(e){return e.enabled})))).filter((function(e,n,r){return r.indexOf(e)===n})),l=n.weapon.name,o=n.bonus.effects.map((function(e){return e.name}));return(0,h.jsxs)(c.Z,{children:[(0,h.jsx)(c.Z.Header,{className:"bg-info",as:"h5",children:(0,a.KF)("EFFECT_ACTIVE")}),(0,h.jsx)(c.Z.Body,{children:(0,h.jsx)(v.X,(0,Z.Z)((0,Z.Z)({},t),{},{hideToggle:function(e){return e.name.includes(l)||o.includes(e.name)},effects:i,onChange:r}))})]})}var A=r(93324),_=r(47313),b=r(53768);function S(e){var n=e.character,r=e.onChange,t=(0,_.useMemo)((function(){return{EFFECT_PASSIVE:n.effects.getPassives(),EFFECT_ES:n.effects.getElementalSkills(),EFFECT_EB:n.effects.getElementalBursts(),EFFECT_CONST:n.effects.getConstellations(),EFFECT_EXTERNAL:n.effects.getExternal()}}),[n]),s=n.weapon.name,i=n.bonus.effects.map((function(e){return e.name}));return(0,h.jsxs)(c.Z,{children:[(0,h.jsx)(c.Z.Header,{className:"bg-info",as:"h5",children:(0,a.KF)("EFFECT_AVAILABLE")}),(0,h.jsx)(c.Z.Body,{children:(0,h.jsx)(b.Z,{defaultActiveKey:"EFFECT_PASSIVE",children:Object.entries(t).map((function(e){var n=(0,A.Z)(e,2),t=n[0],c=n[1];return(0,h.jsxs)(b.Z.Item,{eventKey:t,children:[(0,h.jsx)(b.Z.Header,{children:(0,a.KF)(t)}),(0,h.jsx)(b.Z.Body,{children:(0,h.jsx)(v.X,{hideToggle:function(e){return e.name.includes(s)||i.includes(e.name)},isOwnEffect:"EFFECT_EXTERNAL"!==t,effects:c,onChange:r})})]},t)}))})})]})}var y=r(42072),K=r(22102),N=r(63849),B=r(31616),M="effects",V=2;function k(){var e=(0,t.tl)(),n=(0,y.P)().update;return(0,h.jsx)(K.Z,{children:(0,h.jsxs)(N.Z,{children:[(0,h.jsx)(B.Z,{lg:6,sm:12,children:(0,h.jsx)(S,{character:e,onChange:n})}),(0,h.jsx)(B.Z,{lg:6,sm:12,children:(0,h.jsxs)(i.Z,{gap:1,children:[(0,h.jsx)(T,{border:"secondary",character:e,onChange:n}),(0,h.jsx)(C,{character:e,onChange:n})]})})]})})}}}]);