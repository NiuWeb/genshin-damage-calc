"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[9218],{79218:function(t,e,n){n.r(e),n.d(e,{default:function(){return w},position:function(){return j},title:function(){return I}});var r=n(74165),a=n(1413),s=n(15861),o=n(96103),c=n(87967),i=n(1836),u=n(34805),d=n(46323),f=n(79188),h=n(45043),l=n(29447);function p(t,e){var n=performance.now();return t.character instanceof h.G.Character&&(t.character=h.G.CharacterLoader.exportCharacter(t.character)),t.rotation instanceof h.G.Rotation&&(t.rotation=h.G.RotationLoader.exportRotation(t.rotation)),(0,l.HB)().postMessage({id:n,type:"optimizer-bonus",data:t}),new Promise((function(t){var r=(0,l.HB)().addMessageListener((function(a){a.id===n&&(!1===a.complete?e(a.result):(t(a.result),(0,l.HB)().removeMessageListener(r)))}))}))}var x=n(47017),g=n(48648),k=n(93298),m=n(65832),Z=n(97890),v=n(46417),I="OPTIMIZER_BONUS",j=3;function w(){var t=(0,u.t)(),e=(0,i.r)(),n=(0,d.a)(),h=(0,Z.s0)();function l(){return(l=(0,s.Z)((0,r.Z)().mark((function s(){var c,i,u,d,f,l,g;return(0,r.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=(0,o.vo)(),i=c.character,u=c.rotationId,e.show(),r.next=4,(0,x.q$)({id:u});case 4:return d=r.sent[0],r.next=7,p((0,a.Z)({character:i,rotation:d},t.getConfig()),(function(t){e.setCurrent(t[0]),e.setTotal(t[1])}));case 7:f=r.sent,l=f.map((function(t){return t[0]})),g=f.map((function(t){return t[1]})),n.setRows(g),n.setStates(l),e.hide(),h("/editor/optimizer/results");case 14:case"end":return r.stop()}}),s)})))).apply(this,arguments)}return(0,v.jsxs)(g.Z,{gap:1,children:[(0,v.jsx)(k.Z,{variant:"warning",className:"text-black",onClick:function(){return l.apply(this,arguments)},children:(0,f.KF)("OPTIMIZER_OPTIMIZE")}),(0,v.jsxs)(m.Z,{children:[(0,v.jsx)(m.Z.Header,{as:"h5",className:"bg-info m-0",children:(0,f.KF)("OPTIMIZER_BONUS_CONFIGURE")}),(0,v.jsx)(m.Z.Body,{children:(0,v.jsx)(g.Z,{gap:1,children:(0,v.jsx)("div",{className:"d-flex justify-content-center",children:(0,v.jsx)(c.L,{stacks:t.stacks.getStacks(),onDelete:t.stacks.removeStack,onAdd:t.stacks.addStack})})})})]})]})}}}]);