!function(){var t={45043:function(t,e,r){"use strict";r.d(e,{G:function(){return n}});var n=r(93189)},36269:function(t,e,r){"use strict";r.r(e),r.d(e,{getWorkerThreads:function(){return i},setWorkerThreads:function(){return a}});var n=4;function a(t){n=t}function i(){return n}},55783:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return l},type:function(){return f}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c=r(36269),f="config",l=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){t.language&&u.G.Describe.setLanguage(t.language),t.threads&&(0,c.setWorkerThreads)(t.threads||4)}}]),r}(s.z)},39396:function(t,e,r){"use strict";r.r(e)},31548:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-artifacts-child",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){var t;(0,n.Z)(this,r);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(t=e.call.apply(e,[this].concat(i))).optimizer=void 0,t}return(0,a.Z)(r,[{key:"onMessage",value:function(t){if(t instanceof Array){if(!this.optimizer)throw new Error("Optimizer not initialized");return this.optimizer.configure({chunk:t}),this.optimizer.optimize().getResult()}this.initialize(t)}},{key:"initialize",value:function(t){var e=u.G.CharacterLoader.importCharacter(t.character),r=new u.G.Rotation(t.rotation);if(r.setCharacter(e),this.optimizer=new u.G.ArtifactsOptimizer(e,(function(){return r.calculate()}),!1),t.filters&&t.filters.length){var n=t.filters;this.optimizer.filter((function(t){return u.G.applyFilters(t,n)}))}t.effects&&t.effects.length&&this.optimizer.configure({effects:t.effects}),this.optimizer.prepare()}}]),r}(s.z)},37344:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return l},type:function(){return f}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c=r(85336),f="optimizer-artifacts-count",l=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=(0,c.getArtifacts)(t);if("number"===typeof e)throw new Error("No artifacts found");var r=e;return u.G.ArtifactsOptimizer.groupArtifacts(r).map((function(t){return t.length})).reduce((function(t,e){return t*e}),1)}}]),r}(s.z)},3619:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return v},type:function(){return g}});var n=r(74165),a=r(15861),i=r(15671),o=r(43144),u=r(60136),s=r(27277),c=r(45043),f=r(77786),l=r(95397),p=r(36269),d=r(85336),g="optimizer-artifacts",v=function(t){(0,u.Z)(r,t);var e=(0,s.Z)(r);function r(){var t;(0,i.Z)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))).counter=0,t.result={damage:-1,indexes:[]},t.total=0,t}return(0,o.Z)(r,[{key:"createWorker",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e,r){var a,i;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=g+"-"+r,i=new f.Z,t.next=4,i.setLanguage(c.G.Describe.getLanguage());case 4:return i.postMessage({id:a,data:e,type:g+"-child"}),t.next=7,new Promise((function(t){var e=i.addMessageListener((function(r){r.id===a&&(t(),i.removeMessageListener(e))}))}));case 7:return t.abrupt("return",i);case 8:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()},{key:"initWorkers",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e){var r,i,o=this;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(0,p.getWorkerThreads)(),t.next=3,Promise.all(Array.from(Array(r).keys()).map((0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.createWorker(e,0);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))));case 3:return i=t.sent,t.abrupt("return",i);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"sendChunk",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e,r){var a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=performance.now(),e.postMessage({id:a,type:g+"-child",data:r}),t.abrupt("return",new Promise((function(t){var r=e.addMessageListener((function(n){n.id===a&&(e.removeMessageListener(r),t(n.result))}))})));case 3:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()},{key:"onMessage",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e){var r,i,o,u,s,f,l,g,v,m,h=this;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=(0,p.getWorkerThreads)(),this.counter=0,this.result={damage:-1,indexes:[]},"number"!==typeof(i=(0,d.getArtifacts)(e.query))){t.next=6;break}throw new Error("No artifacts found");case 6:return o=i,this.total=c.G.ArtifactsOptimizer.groupArtifacts(o).map((function(t){return t.length})).reduce((function(t,e){return t*e}),1),u=c.G.CharacterLoader.importCharacter(e.character),(s=new c.G.Rotation(e.rotation)).setCharacter(u),t.next=13,this.initWorkers(e);case 13:return f=t.sent,(l=new c.G.ArtifactsOptimizer(u,(function(){return s.calculate()}),!1)).configure({artifacts:o,chunkSize:1e4*r}),l.onChunkGenerated(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(f.map(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){var a,i;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.splice(0,1e4),t.next=3,h.sendChunk(r,a);case 3:i=t.sent,h.counter+=a.length,i.forEach((function(t){t.damage>h.result.damage&&(h.result=t)})),h.postMessage([h.counter,h.total]);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=19,l.generateChunks();case 19:return f.forEach((function(t){return t.terminate()})),g=this.result,v=g.indexes.map((function(t){return o[t]})).filter((function(t){return void 0!==t})),c.G.CharacterLoader.importArtifacts(v,u),m=u.bonus.effects.map((function(t){var r;return null===(r=e.effects)||void 0===r?void 0:r.find((function(e){return e.name===t.name}))})).filter((function(t){return!!t})),t.abrupt("return",{damage:g.damage,artifacts:v,bonus:m});case 25:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()}]),r}(l.z)},13128:function(t,e,r){"use strict";r.r(e)},95105:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-bonus",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=this,r=u.G.CharacterLoader.importCharacter(t.character),n=new u.G.Rotation(t.rotation);n.setCharacter(r);var a=new u.G.ArtifactBonusOptimizer(r,(function(){return n.calculate()}),!1);a.configure(t),a.onProgress((function(t,r,n){e.postMessage([r,n])})),a.optimize();var i=a.getResult(),o=a.getSimpleResult();return i.map((function(t,e){return[t,o[e]]}))}}]),r}(s.z)},71253:function(t,e,r){"use strict";r.r(e)},61619:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-mainstat",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=this,r=u.G.CharacterLoader.importCharacter(t.character),n=new u.G.Rotation(t.rotation);n.setCharacter(r);var a=new u.G.MainstatsOptimizer(r,(function(){return n.calculate()}),!1);a.configure(t),a.onProgress((function(t,r,n){e.postMessage([r,n])})),a.optimize();var i=a.getResult(),o=a.getSimpleResult();return i.map((function(t,e){return[t,o[e]]}))}}]),r}(s.z)},84195:function(t,e,r){"use strict";r.r(e)},90368:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-resin",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=this,r=u.G.CharacterLoader.importCharacter(t.character),n=new u.G.Rotation(t.rotation);n.setCharacter(r);var a=new u.G.ResinOptimizer(r,(function(){return n.calculate()}),!1);a.configure(t),a.onProgress((function(t,r,n){e.postMessage([r,n])})),a.optimize();var i=a.getResult(),o=a.getSimpleResult();return i.map((function(t,e){return[t,o[e]]}))}}]),r}(s.z)},76418:function(t,e,r){"use strict";r.r(e)},56606:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-substats",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=this,r=u.G.CharacterLoader.importCharacter(t.character),n=new u.G.Rotation(t.rotation);n.setCharacter(r);var a=new u.G.SubstatsOptimizer(r,(function(){return n.calculate()}),!1);a.configure(t);var i=t.filters;i&&a.filter((function(t){return u.G.applyFilters(t,i)})),a.onProgress((function(t,r,n){e.postMessage([r,n])})),a.generate(),a.optimize();var o=a.getResult(),s=a.getSimpleResult();return o.map((function(t,e){return[t,s[e]]}))}}]),r}(s.z)},47491:function(t,e,r){"use strict";r.r(e)},46635:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-weapon-advanced-child",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=this,r=u.G.CharacterLoader.importCharacter(t.character),n=new u.G.Rotation(t.rotation);n.setCharacter(r);var a=new u.G.AdvancedWeaponOptimizer(r,(function(){return n.calculate()}),!1);a.configure(t),a.onProgress((function(t,r){"CALCULATING_COMBINATIONS"===t&&e.postMessage(r)})),a.optimize();var i=a.getResult(),o=a.getSimpleResult();return i.map((function(t,e){return[t,o[e]]}))}}]),r}(s.z)},67757:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return v},type:function(){return g}});var n=r(74165),a=r(15861),i=r(15671),o=r(43144),u=r(60136),s=r(27277),c=r(45043),f=r(77786),l=r(95397),p=r(93189),d=r(36269),g="optimizer-weapon-advanced",v=function(t){(0,u.Z)(r,t);var e=(0,s.Z)(r);function r(){return(0,i.Z)(this,r),e.apply(this,arguments)}return(0,o.Z)(r,[{key:"onMessage",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e){var r,i,o,u,s,l,v,m,h,y,Z,S,b,w,k,z=this;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=(0,d.getWorkerThreads)(),i=c.G.CharacterLoader.importCharacter(e.character),(o=new p.SubstatsOptimizer(i,(function(){return 0}),!1)).configure(e.substats),o.generate(),u=o.getCombinations(),(s=new p.WeaponOptimizer(i,(function(){return 0}),!1)).configure(e),l=s.generate(),v=l.total,m=s.getCombinations()){t.next=12;break}return t.abrupt("return",[]);case 12:return h=Math.max(1,Math.ceil(m.length/r)),y=Array.from(Array(r).keys()).map((function(){return new f.Z})),Z=0,S=function(){Z++,z.postMessage([Z,v])},b=y.map(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,a){var i,s;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.setLanguage(c.G.Describe.getLanguage());case 2:return s=m.splice(0,h),r.postMessage({id:g+"-"+a,type:g+"-child",data:{character:e.character,rotation:e.rotation,combinations:s,substats:{tier:null===(i=e.substats)||void 0===i?void 0:i.tier,combinations:u,range:o.getRange(),values:o.getValues()},stacks:e.stacks,ranks:e.ranks,rules:e.rules}}),t.abrupt("return",new Promise((function(t){r.addMessageListener((function(e){!1===e.complete?S():e.result&&"number"!==typeof e.result&&t(e.result)}))})));case 5:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()),w=new c.G.PriorityQueue,t.next=20,Promise.all(b);case 20:return k=t.sent,y.forEach((function(t){return t.terminate()})),k.forEach((function(t){t.forEach((function(t){w.enqueue(t,t[0].damage)}))})),t.abrupt("return",w.getItems());case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),r}(l.z)},63678:function(t,e,r){"use strict";r.r(e)},68565:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="optimizer-weapon",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=this,r=u.G.CharacterLoader.importCharacter(t.character),n=new u.G.Rotation(t.rotation);n.setCharacter(r);var a=new u.G.WeaponOptimizer(r,(function(){return n.calculate()}),!1);a.configure(t),a.onProgress((function(t,r,n){e.postMessage([r,n])})),a.optimize();var i=a.getResult(),o=a.getSimpleResult();return i.map((function(t,e){return[t,o[e]]}))}}]),r}(s.z)},17776:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f},type:function(){return c}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(45043),s=r(95397),c="calculate-rotation",f=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){var e=u.G.CharacterLoader.importCharacter(t.character),r=new u.G.Rotation(t.rotation);return r.setCharacter(e),r.calculateDetailed()}}]),r}(s.z)},16261:function(t,e,r){"use strict";r.r(e)},89706:function(t,e,r){"use strict";r.r(e),r.d(e,{deleteArtifact:function(){return a}});var n=r(31673);function a(t){var e=t.id,r=(0,n.getStorage)("artifacts");if(!r)return!1;var a=r.findIndex((function(t){return t.id===e}));return-1!==a&&(r.splice(a,1),!0)}},85336:function(t,e,r){"use strict";r.r(e),r.d(e,{getArtifacts:function(){return i}});var n=r(45043),a=r(31673);function i(t){var e=(0,a.getStorage)("artifacts");if(!e)return[];var r=e;if(t.level){var i=t.level;r=r.filter((function(t){var e=n.G.DatabaseValues.getLevelByMainstatValue(t.stars,t.mainstat.name,t.mainstat.value);return e>=i.min&&e<=i.max}))}if(t.mainstat&&t.mainstat.length){var o=t.mainstat;r=r.filter((function(t){return o.includes(t.mainstat.name)}))}if(t.piece&&t.piece.length){var u=t.piece;r=r.filter((function(t){return u.includes(t.piece)}))}if(t.bonus&&t.bonus.length){var s=t.bonus;r=r.filter((function(t){return s.includes(t.bonus||"")}))}if(t.substats&&t.substats.list.length){var c=t.substats.operator,f=t.substats.list;r=r.filter((function(t){var e=[];return t.substats.forEach((function(t){return e.includes(t.name)?null:e.push(t.name)})),"AND"===c?f.every((function(t){return e.includes(t)})):f.some((function(t){return e.includes(t)}))}))}return void 0!==t.locked&&(r=r.filter((function(e){return!!e.locked===!!t.locked}))),t.count?r.length:r}},80907:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return d},type:function(){return p}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(95397),s=r(31673),c=r(89706),f=r(85336),l=r(14848),p="storage-artifacts",d=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){if(t.get)return(0,f.getArtifacts)(t.get);if(t.set){var e=(0,l.setArtifact)(t.set);return e&&(0,s.postStorage)(),e}if(t.delete){var r=(0,c.deleteArtifact)(t.delete);return r&&(0,s.postStorage)(),r}}}]),r}(u.z)},14848:function(t,e,r){"use strict";r.r(e),r.d(e,{setArtifact:function(){return a}});var n=r(31673);function a(t){var e=(0,n.getStorage)("artifacts");if(e){if(t.id){var r=e.findIndex((function(e){return e.id===t.id}));if(-1===r)return;e[r]=t}else t.id=(0,n.createId)(),e.splice(0,0,t);return t.id}}},41246:function(t,e,r){"use strict";r.r(e)},623:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return v},type:function(){return g}});var n=r(1413),a=r(93433),i=r(15671),o=r(43144),u=r(60136),s=r(27277),c=r(45043),f=r(95397),l=r(85336),p=r(31673),d=r(10533),g="storage-export",v=function(t){(0,u.Z)(r,t);var e=(0,s.Z)(r);function r(){return(0,i.Z)(this,r),e.apply(this,arguments)}return(0,o.Z)(r,[{key:"onMessage",value:function(t){var e={};if(t.all)e.projects=(0,p.getStorage)("projects")||[],e.rotations=[].concat((0,a.Z)(c.G.GlobalRotations.getFactories()),(0,a.Z)((0,p.getStorage)("rotations")||[])),e.artifacts=(0,p.getStorage)("artifacts")||[];else{if(t.projects){var r,i=t.projects,o=null===(r=(0,p.getStorage)("projects"))||void 0===r?void 0:r.filter((function(t){return i.includes(t.title)}));o&&(e.projects=o)}if(t.rotations){var u=t.rotations,s=[].concat((0,a.Z)(c.G.GlobalRotations.getFactories()),(0,a.Z)((0,p.getStorage)("rotations")||[])).filter((function(t){return void 0!==t.id&&u.includes(t.id)}));s&&s.length&&(e.rotations=s)}if(t.artifacts&&t.artifacts.mode!==d.STORAGE_EXPORT_ARTIFACTS.NONE){var f=[];switch(t.artifacts.mode){case d.STORAGE_EXPORT_ARTIFACTS.ALL:f=(0,p.getStorage)("artifacts")||[];break;case d.STORAGE_EXPORT_ARTIFACTS.FILTERED:var g=(0,l.getArtifacts)((0,n.Z)((0,n.Z)({},t.artifacts.query),{},{count:!1}));"number"===typeof g||(f=g)}"number"!==typeof f&&(e.artifacts=f)}}return JSON.stringify(e)}}]),r}(f.z)},10533:function(t,e,r){"use strict";var n;r.r(e),r.d(e,{STORAGE_EXPORT_ARTIFACTS:function(){return n}}),function(t){t[t.ALL=0]="ALL",t[t.FILTERED=1]="FILTERED",t[t.NONE=2]="NONE"}(n||(n={}))},89356:function(t,e,r){"use strict";r.r(e),r.d(e,{importGoodFile:function(){return a}});var n=r(45043);function a(t){return(JSON.parse(t).artifacts||[]).map((function(t){return n.G.GoodImporter.importArtifact(t)}))}},94926:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return h},type:function(){return m}});var n=r(93433),a=r(1413),i=r(15671),o=r(43144),u=r(60136),s=r(27277),c=r(95397),f=r(83969),l=r(57178),p=r(31673),d=r(45043),g=r(94860),v=r(89356),m="storage-import",h=function(t){(0,u.Z)(r,t);var e=(0,s.Z)(r);function r(){var t;(0,i.Z)(this,r);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))).loadedStorage={},t}return(0,o.Z)(r,[{key:"onMessage",value:function(t){var e=t.file,r=t.good,n=t.confirm,a=t.edit;return e?this.loadFile(e):r?this.loadGoodFile(r):a?this.editObject(a):n?this.confirmImport(n):void 0}},{key:"editObject",value:function(t){var e={projects:{existing:[],imported:[]},rotations:{existing:[],imported:[]},artifacts:{maxPercent:{name:"ATKpercent",value:0},total:0,unique:0}};if(null!==t&&void 0!==t&&t.artifacts){var r=t.artifacts;if(void 0!==r.multiplyPercent&&Number.isFinite(r.multiplyPercent)){var n,i=r.multiplyPercent;null===(n=this.loadedStorage.artifacts)||void 0===n||n.forEach((function(t){return t.substats.forEach((function(t){d.G.Values.isFlatStat(t.name)||(t.value*=i)}))}))}return{compare:(0,a.Z)((0,a.Z)({},e),{},{artifacts:this.compareArtifacts(this.loadedStorage.artifacts)})}}return{compare:e}}},{key:"loadGoodFile",value:function(t){try{var e=(0,v.importGoodFile)(t);this.loadedStorage={artifacts:e};var r=JSON.stringify(this.loadedStorage);return this.loadFile(r)}catch(n){return{error:String(n).valueOf()}}}},{key:"compareArtifacts",value:function(t){var e=0,r=(0,p.getStorage)("artifacts")||[],n={name:"ATKpercent",value:-1/0};return(t||[]).forEach((function(t){r.every((function(e){return!d.G.Artifact.equals(e,t)}))&&e++,t.substats.forEach((function(t){d.G.Values.isFlatStat(t.name)||t.value>n.value&&(n.value=t.value,n.name=t.name)}))})),{total:(t||[]).length,unique:e,maxPercent:n}}},{key:"loadFile",value:function(t){this.loadedStorage={};try{var e,r=JSON.parse(t),a=(0,l.validateStorage)(r);this.loadedStorage=a;var i=(a.projects||[]).map((function(t){return{title:t.title,character:t.character.name,level:t.character.Level,id:t.id=(0,p.createId)()}})),o=(a.rotations||[]).map((function(t){return{name:t.name,characterName:t.characterName,id:t.id=(0,p.createId)()}}));return null===(e=a.artifacts)||void 0===e||e.map((function(t){return t.id=(0,p.createId)()})),{compare:{projects:{imported:i,existing:((0,p.getStorage)("projects")||[]).map((function(t){return t.title}))},rotations:{imported:o,existing:[].concat((0,n.Z)(d.G.GlobalRotations.getFactories()),(0,n.Z)((0,p.getStorage)("rotations")||[])).map((function(t){return t.name}))},artifacts:this.compareArtifacts(a.artifacts)}}}catch(u){return{error:String(u).valueOf()}}}},{key:"confirmImport",value:function(t){if(t.projects){var e,r=t.projects,a=null===(e=this.loadedStorage.projects)||void 0===e?void 0:e.filter((function(t){if(!t.id)return!1;var e=r.find((function(e){return e.id===t.id}));return!!e&&(t.title=e.title,!0)}));if(a){var i,o=new g.z0(null===(i=(0,p.getStorage)("projects"))||void 0===i?void 0:i.map((function(t){return t.title}))),u=a.filter((function(t){return"NAME_OK"===o.validateName(t.title)}));(0,p.setStorage)("projects",[].concat((0,n.Z)(u),(0,n.Z)((0,p.getStorage)("projects")||[])))}}if(t.rotations){var s,c=t.rotations,l=null===(s=this.loadedStorage.rotations)||void 0===s?void 0:s.filter((function(t){if(!t.id)return!1;var e=c.find((function(e){return e.id===t.id}));return!!e&&(t.name=e.name,t.custom=!0,!0)}));if(l){var v,m=new g.z0(null===(v=(0,p.getStorage)("rotations"))||void 0===v?void 0:v.map((function(t){return t.name}))),h=l.filter((function(t){return"NAME_OK"===m.validateName(t.name)}));(0,p.setStorage)("rotations",[].concat((0,n.Z)(h),(0,n.Z)((0,p.getStorage)("rotations")||[])))}}if(void 0!==t.artifacts){var y=(0,p.getStorage)("artifacts")||[],Z=this.loadedStorage.artifacts||[];switch(t.artifacts){case f.STORAGE_IMPORT_ARTIFACTS.NONE:break;case f.STORAGE_IMPORT_ARTIFACTS.ADD:(0,p.setStorage)("artifacts",[].concat((0,n.Z)(Z),(0,n.Z)(y)));break;case f.STORAGE_IMPORT_ARTIFACTS.ADD_UNIQUE:var S=Z.filter((function(t){return y.every((function(e){return!d.G.Artifact.equals(e,t)}))}));(0,p.setStorage)("artifacts",[].concat((0,n.Z)(S),(0,n.Z)(y)));break;case f.STORAGE_IMPORT_ARTIFACTS.REPLACE:(0,p.setStorage)("artifacts",Z)}}(0,p.postStorage)()}}]),r}(c.z)},83969:function(t,e,r){"use strict";var n;r.r(e),r.d(e,{STORAGE_IMPORT_ARTIFACTS:function(){return n}}),function(t){t[t.REPLACE=0]="REPLACE",t[t.ADD=1]="ADD",t[t.ADD_UNIQUE=2]="ADD_UNIQUE",t[t.NONE=3]="NONE"}(n||(n={}))},49638:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return l},type:function(){return f}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(95397),s=r(31673),c=r(57178),f="storage-load",l=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){"string"===typeof t&&(t=JSON.parse(t)),(t=(0,c.validateStorage)(t)).artifacts&&t.artifacts.forEach((function(t){return t.id=(0,s.createId)()})),t.rotations&&t.rotations.forEach((function(t){t.custom=!0,t.id=(0,s.createId)()})),(0,s.importStorage)(t)}}]),r}(u.z)},67721:function(t,e,r){"use strict";r.r(e),r.d(e,{deleteProject:function(){return i}});var n=r(60720),a=r(31673);function i(t){var e=(0,a.getStorage)("projects");if(!e)return!1;var r=(0,n.D)(t.name,e.map((function(t){return t.title})),!0);return 0!==r.length&&-1!==r[0]&&(e.splice(r[0],1),!0)}},63134:function(t,e,r){"use strict";r.r(e),r.d(e,{getProjects:function(){return s}});var n=r(74165),a=r(93433),i=r(15861),o=r(60720),u=r(31673);function s(t){return c.apply(this,arguments)}function c(){return(c=(0,i.Z)((0,n.Z)().mark((function t(e){var r,i,s,c;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=(0,u.getStorage)("projects")){t.next=3;break}return t.abrupt("return",[]);case 3:if(i=(0,a.Z)(r),e.name&&(s=e.name,c=(0,o.D)(s,i.map((function(t){return t.title})),e.exact),i=c.map((function(t){return i[t]}))),e.basics){t.next=9;break}return t.abrupt("return",i);case 9:return t.abrupt("return",i.map((function(t){return{title:t.title,character:t.character.name,level:t.character.Level}})));case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},20692:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return g},type:function(){return d}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(95397),s=r(31673),c=r(67721),f=r(63134),l=r(44689),p=r(53521),d="storage-projects",g=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){if(t.get)return(0,f.getProjects)(t.get);if(t.set){var e=(0,p.setProject)(t.set);return e&&(0,s.postStorage)(),e}if(t.rename){var r=(0,l.renameProject)(t.rename);return r&&(0,s.postStorage)(),r}if(t.delete){var n=(0,c.deleteProject)(t.delete);return n&&(0,s.postStorage)(),n}}}]),r}(u.z)},44689:function(t,e,r){"use strict";r.r(e),r.d(e,{renameProject:function(){return o}});var n=r(94860),a=r(60720),i=r(31673);function o(t){var e=(0,i.getStorage)("projects");if(!e)return!1;var r=e.map((function(t){return t.title})),o=(0,a.D)(t.name,r,!0);if(0===o.length||-1===o[0])return!1;var u=new n.z0(r);return e[o[0]].title=u.insertName(t.newName),!0}},53521:function(t,e,r){"use strict";r.r(e),r.d(e,{setProject:function(){return i}});var n=r(60720),a=r(31673);function i(t){var e=(0,a.getStorage)("projects");if(!e)return!1;var r=(0,n.D)(t.name,e.map((function(t){return t.title})),!0);return 0===r.length||-1===r[0]?(e.splice(0,0,t.project),!0):(e[r[0]]=t.project,!0)}},48361:function(t,e,r){"use strict";r.r(e)},1139:function(t,e,r){"use strict";r.r(e),r.d(e,{addRotation:function(){return u}});var n=r(93433),a=r(94860),i=r(45043),o=r(31673);function u(t){var e=t.characterName,r=(0,o.getStorage)("rotations");r||(r=[]);var u=[].concat((0,n.Z)(i.G.GlobalRotations.getFactories()),(0,n.Z)(r)),s={name:new a.z0(u.map((function(t){return t.name}))).insertName("Untitled"),id:(0,o.createId)(),characterName:e,custom:!0,duration:1,autoIncludeRules:!1};return(0,o.setStorage)("rotations",[s].concat((0,n.Z)(r))),s}},85876:function(t,e,r){"use strict";r.r(e),r.d(e,{deleteRotation:function(){return a}});var n=r(31673);function a(t){var e=t.id,r=(0,n.getStorage)("rotations");r||(r=[]);var a=r.findIndex((function(t){return t.id===e}));return!(a<0)&&(r.splice(a,1),(0,n.setStorage)("rotations",r),!0)}},65059:function(t,e,r){"use strict";r.r(e),r.d(e,{duplicateRotation:function(){return u}});var n=r(93433),a=r(94860),i=r(45043),o=r(31673);function u(t){var e=t.id,r=(0,o.getStorage)("rotations");r||(r=[]);var u=[].concat((0,n.Z)(i.G.GlobalRotations.getFactories()),(0,n.Z)(r)),s=u.find((function(t){return t.id===e}));if(s){var c=new a.z0(u.map((function(t){return t.name}))),f=JSON.parse(JSON.stringify(s));return f.name=c.insertName(f.name),f.id=(0,o.createId)(),f.custom=!0,(0,o.setStorage)("rotations",[f].concat((0,n.Z)(r))),f}}},56686:function(t,e,r){"use strict";r.r(e),r.d(e,{getRotations:function(){return s}});var n=r(93433),a=r(94860),i=r(60720),o=r(45043),u=r(31673);function s(t){var e=(0,u.getStorage)("rotations");e||(e=[]);var r=[].concat((0,n.Z)(o.G.GlobalRotations.getFactories()),(0,n.Z)(e));if(t.id)return 0===(r=r.filter((function(e){return e.id===t.id}))).length?[]:[r[0]];if(t.custom&&(r=r.filter((function(t){return t.custom}))),t.character){var s=t.character;r=r.filter((function(t){return"string"===typeof t.characterName?t.characterName===s:t.characterName.includes(s)}))}if(t.name){var c=t.name,f=(0,i.D)(c,r.map((function(t){return t.characterName})),t.exact);r=f.map((function(t){return r[t]}))}var l=JSON.parse(JSON.stringify(r)),p=new a.z0;return l.forEach((function(t){return t.name=p.insertName(t.name)})),l}},92245:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return v},type:function(){return g}});var n=r(15671),a=r(43144),i=r(60136),o=r(27277),u=r(95397),s=r(31673),c=r(1139),f=r(85876),l=r(65059),p=r(56686),d=r(52541),g="storage-rotations",v=function(t){(0,i.Z)(r,t);var e=(0,o.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"onMessage",value:function(t){if(t.get)return(0,p.getRotations)(t.get);if(t.set){var e=(0,d.setRotation)(t.set);return e&&(0,s.postStorage)(),e}if(t.duplicate){var r=(0,l.duplicateRotation)(t.duplicate);return r&&(0,s.postStorage)(),r}if(t.delete){var n=(0,f.deleteRotation)(t.delete);return n&&(0,s.postStorage)(),n}if(t.add){var a=(0,c.addRotation)(t.add);return a&&(0,s.postStorage)(),a}}}]),r}(u.z)},52541:function(t,e,r){"use strict";r.r(e),r.d(e,{setRotation:function(){return a}});var n=r(31673);function a(t){var e=(0,n.getStorage)("rotations");if(e||(e=[]),!t.id)return!1;var r=e.findIndex((function(e){return e.id===t.id}));return-1!==r&&(e[r]=t.rotation,!0)}},59816:function(t,e,r){"use strict";r.r(e)},31673:function(t,e,r){"use strict";r.r(e),r.d(e,{createId:function(){return m},getStorage:function(){return l},importStorage:function(){return c},postStorage:function(){return g},setStorage:function(){return f},setStoragePoster:function(){return p}});var n=r(93433),a=r(15671),i=r(43144),o=function(){function t(e,r){(0,a.Z)(this,t),this.delay=e,this.callback=r,this.counter=0,this.completed=!0,this.lastParam=void 0,this.onReturn=function(){}}return(0,i.Z)(t,[{key:"internalCall",value:function(t){for(var e=this,r=arguments.length,a=new Array(r>1?r-1:0),i=1;i<r;i++)a[i-1]=arguments[i];this.completed&&(this.completed=!1,setTimeout((function(){e.onReturn(e.callback.apply(e,a)),e.completed=!0,e.counter!==t&&e.lastParam&&e.internalCall.apply(e,[e.counter].concat((0,n.Z)(e.lastParam)))}),this.delay))}},{key:"call",value:function(){this.counter++;for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];this.lastParam=e,this.internalCall.apply(this,[this.counter].concat(e))}}]),t}();var u,s={projects:[],artifacts:[],rotations:[]};function c(t){Object.assign(s,t)}function f(t,e){s[t]=e}function l(t){return s[t]}function p(t){u=t}var d=new o(1e3,(function(){u&&u(JSON.stringify(s))}));function g(){d.call()}var v=0;function m(){return Date.now().toString(36)+"-"+performance.now().toString(36)+"-"+(v++).toString(36)}},52249:function(t,e,r){"use strict";r.r(e)},57178:function(t,e,r){"use strict";r.r(e),r.d(e,{validateStorage:function(){return o}});var n=r(37762),a=r(94860),i=r(45043);function o(t){if(t.artifacts){var e,r=[],o=(0,n.Z)(t.artifacts);try{for(o.s();!(e=o.n()).done;){var u=e.value;i.G.ArtifactLoader.testObject(u)&&r.push(u)}}catch(h){o.e(h)}finally{o.f()}t.artifacts=r}if(t.rotations){var s,c=[],f=(0,n.Z)(t.rotations);try{for(f.s();!(s=f.n()).done;){var l=s.value;i.G.RotationLoader.testRotation(l)&&c.push(l)}}catch(h){f.e(h)}finally{f.f()}t.rotations=c}if(t.projects){var p,d=new a.z0,g=[],v=(0,n.Z)(t.projects);try{for(v.s();!(p=v.n()).done;){var m=p.value;i.G.CharacterLoader.testObject(m.character)&&(m.title=d.insertName(m.title),g.push(m))}}catch(h){v.e(h)}finally{v.f()}t.projects=g}return t}},48545:function(t,e,r){"use strict";var n=r(74165),a=r(15861),i=r(31673),o=self;(0,i.setStoragePoster)((function(t){return o.postMessage({type:"storage-post",result:t})}));var u=new Map,s=r(18096);s.keys().forEach((function(t){var e=s(t);if(e.type&&e.default){var r=e.type,n=new e.default(o);n.setPoster((function(t){return o.postMessage(t)})),u.set(r,n)}})),o.onmessage=function(){var t=(0,a.Z)((0,n.Z)().mark((function t(e){var r,a,i;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.data,!(a=u.get(r.type))){t.next=17;break}return t.prev=3,a.setRequest(r),t.next=7,a.onMessage(r.data);case 7:i=t.sent,o.postMessage({result:i,id:r.id,type:r.type,complete:!0}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(3),console.warn("Error in worker:",t.t0),o.postMessage({error:t.t0,id:r.id,type:r.type,complete:!1});case 15:t.next=19;break;case 17:console.warn("Unknown action type:",r.type),o.postMessage({error:"Unknown action type",id:r.id,type:r.type});case 19:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(e){return t.apply(this,arguments)}}()},18096:function(t,e,r){var n={"./config/config.ts":36269,"./config/index.ts":55783,"./config/type.ts":39396,"./optimizer/artifacts/child.ts":31548,"./optimizer/artifacts/count.ts":37344,"./optimizer/artifacts/index.ts":3619,"./optimizer/artifacts/type.ts":13128,"./optimizer/bonus/index.ts":95105,"./optimizer/bonus/type.ts":71253,"./optimizer/mainstat/index.ts":61619,"./optimizer/mainstat/type.ts":84195,"./optimizer/resin/index.ts":90368,"./optimizer/resin/type.ts":76418,"./optimizer/substats/index.ts":56606,"./optimizer/substats/type.ts":47491,"./optimizer/weapon/index.ts":68565,"./optimizer/weapon2/child.ts":46635,"./optimizer/weapon2/index.ts":67757,"./optimizer/weapon2/type.ts":63678,"./rotation/index.ts":17776,"./rotation/type.ts":16261,"./storage/artifacts/delete.ts":89706,"./storage/artifacts/get.ts":85336,"./storage/artifacts/index.ts":80907,"./storage/artifacts/set.ts":14848,"./storage/artifacts/type.ts":41246,"./storage/export/index.ts":623,"./storage/export/type.ts":10533,"./storage/import/good.ts":89356,"./storage/import/index.ts":94926,"./storage/import/type.ts":83969,"./storage/load.ts":49638,"./storage/projects/delete.ts":67721,"./storage/projects/get.ts":63134,"./storage/projects/index.ts":20692,"./storage/projects/rename.ts":44689,"./storage/projects/set.ts":53521,"./storage/projects/type.ts":48361,"./storage/rotations/add.ts":1139,"./storage/rotations/delete.ts":85876,"./storage/rotations/duplicate.ts":65059,"./storage/rotations/get.ts":56686,"./storage/rotations/index.ts":92245,"./storage/rotations/set.ts":52541,"./storage/rotations/type.ts":59816,"./storage/storage.ts":31673,"./storage/type.ts":52249,"./storage/validate.ts":57178};function a(t){var e=i(t);return r(e)}function i(t){if(!r.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}a.keys=function(){return Object.keys(n)},a.resolve=i,t.exports=a,a.id=18096}},e={};function r(n){var a=e[n];if(void 0!==a)return a.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.m=t,r.x=function(){var t=r.O(void 0,[1292,9690,213,2803,9415,2954,211,364,2713,8586,9866,1680,4860,720,7098,5397],(function(){return r(48545)}));return t=r.O(t)},function(){var t=[];r.O=function(e,n,a,i){if(!n){var o=1/0;for(f=0;f<t.length;f++){n=t[f][0],a=t[f][1],i=t[f][2];for(var u=!0,s=0;s<n.length;s++)(!1&i||o>=i)&&Object.keys(r.O).every((function(t){return r.O[t](n[s])}))?n.splice(s--,1):(u=!1,i<o&&(o=i));if(u){t.splice(f--,1);var c=a();void 0!==c&&(e=c)}}return e}i=i||0;for(var f=t.length;f>0&&t[f-1][2]>i;f--)t[f]=t[f-1];t[f]=[n,a,i]}}(),r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,{a:e}),e},r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(e,n){return r.f[n](t,e),e}),[]))},r.u=function(t){return 4860===t?"static/js/4860.ce6dc6b3.chunk.js":720===t?"static/js/720.48eff6db.chunk.js":5397===t?"static/js/5397.d9a5091c.chunk.js":8545===t?"static/js/8545.bec0a91c.chunk.js":"static/js/"+({211:"npm.lodash.isequal",213:"npm.ajv",364:"npm.lodash.xor",1292:"npm.__babel",1680:"npm.json-schema-traverse",2713:"npm.to-json-schema",2803:"npm.__bygdle",2954:"npm.lodash.merge",8586:"npm.js-priority-queue",9415:"npm.uri-js",9690:"npm.fast-deep-equal",9866:"npm.lodash.keys"}[t]||t)+"."+{211:"3392519c",213:"391cb7ba",364:"f3754a38",1292:"deb77f92",1680:"29da2b10",2713:"68daefdf",2803:"3d456b50",2954:"bebbd2bf",7098:"e064b121",8586:"6e6ac4e0",9415:"4743fd60",9690:"1290c870",9866:"2f39ec7f"}[t]+".js"},r.miniCssF=function(t){},r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}(),r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},r.j=8545,r.p="/genshin-damage-calc/",function(){r.b=self.location+"/../../../";var t={8545:1};r.f.i=function(e,n){t[e]||importScripts(r.p+r.u(e))};var e=self.webpackChunkgenshin_gui=self.webpackChunkgenshin_gui||[],n=e.push.bind(e);e.push=function(e){var a=e[0],i=e[1],o=e[2];for(var u in i)r.o(i,u)&&(r.m[u]=i[u]);for(o&&o(r);a.length;)t[a.pop()]=1;n(e)}}(),function(){var t=r.x;r.x=function(){return Promise.all([1292,9690,213,2803,9415,2954,211,364,2713,8586,9866,1680,4860,720,7098,5397].map(r.e,r)).then(t)}}();r.x()}();