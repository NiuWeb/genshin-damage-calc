"use strict";(self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[]).push([[7750],{87750:function(t,e,n){n.r(e),n.d(e,{default:function(){return k},position:function(){return C},title:function(){return x}});var r=n(74165),a=n(1413),o=n(15861),i=n(96103),s=n(98791),c=n(1836),u=n(34805),f=n(46323),p=n(79188),h=n(45043),d=n(29447);function l(t,e){var n=performance.now();return t.character instanceof h.G.Character&&(t.character=h.G.CharacterLoader.exportCharacter(t.character)),t.rotation instanceof h.G.Rotation&&(t.rotation=h.G.RotationLoader.exportRotation(t.rotation)),(0,d.HB)().postMessage({id:n,type:"optimizer-weapon",data:t}),new Promise((function(t){var r=(0,d.HB)().addMessageListener((function(a){a.id===n&&(!1===a.complete?e(a.result):(t(a.result),(0,d.HB)().removeMessageListener(r)))}))}))}var g=n(47017),v=n(48648),m=n(93298),w=n(97890),Z=n(46417),x="OPTIMIZER_WEAPON",C=1;function k(){var t=(0,u.t)(),e=(0,c.r)(),n=(0,f.a)(),h=(0,w.s0)();function d(){return(d=(0,o.Z)((0,r.Z)().mark((function o(){var s,c,u,f;return(0,r.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s=(0,i.vo)(),c=s.character,u=s.rotationId,e.show(),r.next=4,(0,g.q$)({id:u});case 4:f=r.sent[0],l((0,a.Z)({character:c,rotation:f},t.getConfig()),(function(t){e.setCurrent(t[0]),e.setTotal(t[1])})).then((function(t){var r=t.map((function(t){return t[0]})),a=t.map((function(t){return t[1]}));n.setRows(a),n.setStates(r),e.hide(),h("/editor/optimizer/results")}));case 6:case"end":return r.stop()}}),o)})))).apply(this,arguments)}return(0,Z.jsxs)(v.Z,{gap:1,children:[(0,Z.jsx)(m.Z,{variant:"warning",className:"text-black",onClick:function(){return d.apply(this,arguments)},children:(0,p.KF)("OPTIMIZER_OPTIMIZE")}),(0,Z.jsx)(s.P,{})]})}}}]);