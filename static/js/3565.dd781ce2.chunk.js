"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[3565],{93565:function(t,e,r){r.r(e),r.d(e,{default:function(){return x},position:function(){return w},title:function(){return g}});var n=r(74165),a=r(15861),o=r(96103),i=r(1836),s=r(46323),c=r(79188),u=r(45043),f=r(29447);function p(t,e){var r=performance.now();return t.character instanceof u.G.Character&&(t.character=u.G.CharacterLoader.exportCharacter(t.character)),t.rotation instanceof u.G.Rotation&&(t.rotation=u.G.RotationLoader.exportRotation(t.rotation)),(0,f.HB)().postMessage({id:r,type:"optimizer-mainstat",data:t}),new Promise((function(t){var n=(0,f.HB)().addMessageListener((function(a){a.id===r&&(!1===a.complete?e(a.result):(t(a.result),(0,f.HB)().removeMessageListener(n)))}))}))}var h=r(47017),d=r(48648),l=r(93298),m=r(97890),v=r(46417),g="OPTIMIZER_MAINSTAT",w=4;function x(){var t=(0,i.r)(),e=(0,s.a)(),r=(0,m.s0)();function u(){return(u=(0,a.Z)((0,n.Z)().mark((function a(){var i,s,c,u,f,d,l;return(0,n.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=(0,o.vo)(),s=i.character,c=i.rotationId,t.show(),n.next=4,(0,h.q$)({id:c});case 4:return u=n.sent[0],n.next=7,p({character:s,rotation:u},(function(e){t.setCurrent(e[0]),t.setTotal(e[1])}));case 7:f=n.sent,d=f.map((function(t){return t[0]})),l=f.map((function(t){return t[1]})),e.setRows(l),e.setStates(d),t.hide(),r("/editor/optimizer/results");case 14:case"end":return n.stop()}}),a)})))).apply(this,arguments)}return(0,v.jsx)(d.Z,{gap:1,children:(0,v.jsx)(l.Z,{variant:"warning",className:"text-black",onClick:function(){return u.apply(this,arguments)},children:(0,c.KF)("OPTIMIZER_OPTIMIZE")})})}}}]);