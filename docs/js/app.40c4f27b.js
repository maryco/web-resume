(function(t){function e(e){for(var r,o,s=e[0],c=e[1],l=e[2],h=0,f=[];h<s.length;h++)o=s[h],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/resume/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1a6e":function(t,e,n){},"287e":function(t,e,n){},"40d9":function(t,e,n){"use strict";var r=n("e77e"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r={props:{mobileMaxWidth:{type:String,default:"576px"},tabletMinWidth:{type:String,default:"768px"},pcMinWidth:{type:String,default:"992px"}},methods:{isMobileScreen:function(){return window.matchMedia("(max-width: ".concat(this.mobileMaxWidth,")")).matches},supportsTouch:function(){return"ontouchstart"in window},isIE:function(){return/Trident/gi.test(navigator.userAgent)}}},a=(n("6d93"),n("2b0e")),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Header"),n("div",{staticClass:"contents-container-wrap"},[n("JobResumeChart")],1),n("Footer"),n("Overlay")],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("svg",{class:t.$style.headerbg,attrs:{viewBox:"0 0 "+t.containerWidth+" "+t.containerHeight,preserveAspectRatio:"none"}},[n("defs",[n("filter",{attrs:{id:"header-banner__shadow"}},[n("feGaussianBlur",{attrs:{in:"SourceAlpha",stdDeviation:"8",result:"blur"}}),n("feOffset",{attrs:{dy:"-6"}}),n("feMerge",[n("feMergeNode"),n("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1)]),n("mask",{attrs:{id:"circle-mask"}},[n("path",{attrs:{d:t.bannerPoints,fill:"#fff"}})]),n("path",{class:t.$style.gBanner,attrs:{d:t.bannerPoints,filter:"url(#header-banner__shadow)"}}),n("circle",{class:t.$style.gCircle,attrs:{cx:"80%",cy:"0",r:"50%",mask:"url(#circle-mask)",filter:"url(#header-banner__shadow)"}})]),n("div",{staticClass:"header-container"},[n("UiRangeController",{attrs:{min:t.termRangeMinYear,max:t.termRangeMaxYear,"initial-range-from":t.defaultStartFrom,"initial-range-to":t.defaultStartTo},on:{"range-change-completed":t.onRangeChangeCompleted}}),t._m(0)],1)])},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-title"},[n("h1",[t._v("JOB RESUME")])])}],l=(n("a4d3"),n("99af"),n("4de4"),n("4160"),n("a9e3"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"range-control"},[n("div",{staticClass:"range-control-base"},[n("svg",t._g({attrs:{viewBox:t.responsiveViewPort,width:"100%",height:"100%",id:"range-control-svg"}},t.changeRangeHandler),[n("filter",{attrs:{id:"range-control-knob__shadow",width:"160%",height:"160%"}},[n("feGaussianBlur",{attrs:{in:"SourceAlpha",stdDeviation:"2",result:"blur"}}),n("feOffset",{attrs:{dx:"2",dy:"2"}}),n("feComponentTransfer",[n("feFuncA",{attrs:{type:"linear",slope:"0.3"}})],1),n("feMerge",[n("feMergeNode"),n("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1),n("filter",{attrs:{id:"range-control-gauge__glow"}},[n("feFlood",{attrs:{"flood-color":"#cccccc"}}),n("feComposite",{attrs:{in2:"SourceAlpha",operator:"out"}}),n("feGaussianBlur",{attrs:{stdDeviation:"2",result:"blur"}}),n("feComposite",{attrs:{operator:"atop",in2:"SourceGraphic"}})],1),n("rect",{staticClass:"range-control-gauge-base",attrs:{x:"0",y:"31",width:"100%",height:"18",rx:"9",filter:"url(#range-control-gauge__glow)"}}),n("rect",{staticClass:"range-control-gauge",attrs:{x:t.activeGaugeScope.x,y:"31",width:t.activeGaugeScope.width,height:"18",filter:"url(#range-control-gauge__glow)"}}),n("g",{class:{"range-control-knob__active":t.isActiveL}},[n("text",{staticClass:"range-control-label",attrs:{x:t.rangeLabelPositionL,y:"16"},on:{click:function(t){t.preventDefault(),t.stopPropagation()}}},[t._v(" "+t._s(t.rangeFrom)+" "),t.isTooClosePosition?[t._v("-"+t._s(t.rangeTo))]:t._e()],2),n("circle",t._g({staticClass:"range-control-knob",attrs:{cx:t.rangeKnobPositionL,cy:"40",r:t.gaugeKnobRadius,filter:"url(#range-control-knob__shadow)"}},t.supportsTouch()?{touchstart:function(e){return t.activateControl(e,!0)}}:{mousedown:function(e){return t.activateControl(e,!0)}}))]),n("g",{class:{"range-control-knob__conceal":t.rangeFrom===t.rangeTo,"range-control-knob__active":t.isActiveR}},[t.isTooClosePosition?t._e():n("text",{staticClass:"range-control-label",attrs:{x:t.rangeLabelPositionR,y:"16"},on:{click:function(t){t.preventDefault(),t.stopPropagation()}}},[t._v(" "+t._s(t.rangeTo)+" ")]),n("circle",t._g({staticClass:"range-control-knob",attrs:{cx:t.rangePositionR-t.gaugeKnobRadius,cy:"40",r:t.gaugeKnobRadius,filter:"url(#range-control-knob__shadow)"}},t.supportsTouch()?{touchstart:function(e){return t.activateControl(e)}}:{mousedown:function(e){return t.activateControl(e)}}))])])])])},h=[],f=(n("e25e"),n("2ef0")),g=n("22b5"),d={name:"UiRangeController",data:function(){return{rangeFrom:this.min,rangeTo:this.max,isActiveL:!1,isActiveR:!1,rangePositionL:this.sizeProps.pc.gaugeCapWidth,rangePositionR:this.sizeProps.pc.baseWidth-this.sizeProps.pc.gaugeCapWidth,positionTweenL:null,positionTweenR:null}},props:{min:{type:Number,default:0},max:{type:Number,default:2e3},step:{type:Number,default:1},initialRangeFrom:{type:Number,default:null},initialRangeTo:{type:Number,default:null},sizeProps:{type:Object,default:function(){return{mobile:{baseWidth:270,gaugeCapWidth:30,gaugeKnobRadius:12},pc:{baseWidth:354,gaugeCapWidth:32,gaugeKnobRadius:14}}}}},created:function(){this.rangePositionL=this.gaugeCapWidth,this.rangePositionR=this.baseWidth-this.gaugeCapWidth},mounted:function(){this.emitChangeEvent(),this.emitChangeCompleteEvent()},beforeDestroy:function(){g["a"].removeAll()},watch:{min:function(t){this.rangeFrom=this.rangeFrom<t?t:this.rangeFrom,this.emitChangeEvent()},max:function(t){this.rangeTo=this.rangeTo>t?t:this.rangeTo,this.emitChangeEvent()},rangePositionL:function(){this.rangeFrom=this.$_UiRangeController_getSafeRangeFrom(),this.emitChangeEvent()},rangePositionR:function(){this.rangeTo=this.$_UiRangeController_getSafeRangeTo(),this.emitChangeEvent()},initialRangeFrom:function(t,e){if(null===e&&null!==t&&t>=this.rangeFrom){for(var n=this.rangeFrom,r=this.rangePositionL,a=0;t>n&&this.trialLoopMax>a;r+=this.step,a++)n=this.$_UiRangeController_getSafeRangeFrom(r);var i=this;this.positionTweenL=new g["a"].Tween({pos:this.rangePositionL}).to({pos:r},1e3).easing(g["a"].Easing.Quadratic.InOut).onUpdate((function(t){i.$_UiRangeController_updatePositionL(t.pos)}))}},initialRangeTo:function(t,e){if(null===e&&null!==t&&t<=this.rangeTo){for(var n=this.rangeTo,r=this.rangePositionR,a=0;t<n&&this.trialLoopMax>a;r-=this.step,a++)n=this.$_UiRangeController_getSafeRangeFrom(r);var i=this;this.positionTweenR=new g["a"].Tween({pos:this.rangePositionR}).to({pos:r},1e3).easing(g["a"].Easing.Quadratic.InOut).onUpdate((function(t){i.$_UiRangeController_updatePositionR(t.pos)}))}},isReadyToAnimate:function(t,e){if(t){var n=this;this.positionTweenL.chain(this.positionTweenR).onComplete((function(){n.emitChangeCompleteEvent(),g["a"].removeAll()})).start(),this.$_UiRangeController_animate()}}},computed:{ChangeEvent:function(){return"range-changed"},ChangeCompleteEvent:function(){return"range-change-completed"},UpdateTriggerGap:function(){return 1},trialLoopMax:function(){return 500},changeRangeHandler:function(){var t=this;return this.supportsTouch()?{touchmove:function(e){return t.refreshRange(e)},touchend:function(e){return t.updateRangeComplete(e)}}:{mousemove:function(e){return t.refreshRange(e)},mouseup:function(e){return t.updateRangeComplete(e)},mouseleave:function(e){return t.updateRangeComplete(e)}}},fullGaugeWidth:function(){return this.baseWidth-2*this.gaugeCapWidth},activeGaugeScope:function(){return{x:this.rangePositionL,width:this.rangePositionR-this.rangePositionL}},responsiveViewPort:function(){return this.isMobileScreen()?"0 0 ".concat(this.sizeProps.mobile.baseWidth," 68"):"0 0 ".concat(this.sizeProps.pc.baseWidth," 68")},baseWidth:function(){return this.isMobileScreen()?this.sizeProps.mobile.baseWidth:this.sizeProps.pc.baseWidth},gaugeCapWidth:function(){return this.isMobileScreen()?this.sizeProps.mobile.gaugeCapWidth:this.sizeProps.pc.gaugeCapWidth},gaugeKnobRadius:function(){return this.isMobileScreen()?this.sizeProps.mobile.gaugeKnobRadius:this.sizeProps.pc.gaugeKnobRadius},rangeKnobPositionL:function(){return this.rangePositionL+this.gaugeKnobRadius},rangeLabelPositionR:function(){return this.rangePositionR-2*this.gaugeKnobRadius},rangeLabelPositionL:function(){return this.rangePositionL>this.fullGaugeWidth-this.gaugeCapWidth?this.fullGaugeWidth-this.gaugeCapWidth-this.gaugeKnobRadius:this.rangeFrom===this.rangeTo?this.rangeLabelPositionR:this.rangePositionL},isTooClosePosition:function(){return 72>=this.rangePositionR-this.rangePositionL&&this.rangeFrom!==this.rangeTo},isReadyToAnimate:function(){return null!==this.positionTweenL&&null!==this.positionTweenR}},methods:{emitChangeEvent:function(){this.$emit(this.ChangeEvent,this.rangeFrom,this.rangeTo)},emitChangeCompleteEvent:function(){this.$emit(this.ChangeCompleteEvent,this.rangeFrom,this.rangeTo)},activateControl:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.isActiveL=e,this.isActiveR=!this.isActiveL},updateRangeComplete:function(t){var e=this.convertScreenToSvgView(t);this.isActiveL?this.$_UiRangeController_updatePositionL(e):this.isActiveR&&this.$_UiRangeController_updatePositionR(e),(this.isActiveL||this.isActiveR)&&this.emitChangeCompleteEvent(),this.isActiveL=!1,this.isActiveR=!1},refreshRange:Object(f["throttle"])((function(t){if(t.preventDefault(),t.stopPropagation(),this.isActiveL!==this.isActiveR){var e=this.convertScreenToSvgView(t);!0===this.isActiveL&&this.$_UiRangeController_updatePositionL(e),!0===this.isActiveR&&this.$_UiRangeController_updatePositionR(e)}}),100),getSafePositionX:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return Math.abs(t-e)<this.UpdateTriggerGap?t:void 0!==n&&e<n?n:void 0!==r&&e>r?r:e},convertScreenToSvgView:function(t){var e=0;this.supportsTouch()&&t instanceof TouchEvent?e=t.changedTouches[0].clientX:t instanceof MouseEvent&&(e=t.clientX);var n=this.$el.querySelector("#range-control-svg"),r=n.getBoundingClientRect();return parseInt(e-r.left)},$_UiRangeController_getSafeRangeFrom:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t=null===t?this.rangePositionL:t;var e=Math.abs(this.max-this.min),n=parseInt(e*((t-this.gaugeCapWidth)/this.fullGaugeWidth))+this.min;return n<=this.min?this.min:n>this.rangeTo?this.rangeTo:n},$_UiRangeController_getSafeRangeTo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t=null===t?this.rangePositionR:t;var e=Math.abs(this.max-this.min),n=parseInt(e*((t-this.gaugeCapWidth)/this.fullGaugeWidth))+this.min;return n>=this.max?this.max:n<this.rangeFrom?this.rangeFrom:n},$_UiRangeController_updatePositionL:function(t){this.rangePositionL=this.getSafePositionX(this.rangePositionL,t,this.gaugeCapWidth,this.rangePositionR)},$_UiRangeController_updatePositionR:function(t){this.rangePositionR=this.getSafePositionX(this.rangePositionR,t,this.rangePositionL,this.baseWidth-this.gaugeCapWidth)},$_UiRangeController_animate:function(){var t=requestAnimationFrame(this.$_UiRangeController_animate);g["a"].update()||(this.emitChangeCompleteEvent(),cancelAnimationFrame(t))}}},p=d,m=(n("b8e5"),n("2877")),v=Object(m["a"])(p,u,h,!1,null,"3d928682",null),b=v.exports,w=n("2f62");function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O={name:"Header",components:{UiRangeController:b},props:{containerWidth:{type:Number,default:1200},containerHeight:{type:Number,default:270}},computed:_({},Object(w["d"])({defaultStartFrom:function(t){return t.jobResume.defaultStartFrom},defaultStartTo:function(t){return t.jobResume.defaultStartTo}}),{},Object(w["c"])(["termRangeMinYear","termRangeMaxYear"]),{bannerPoints:function(){return"M 0 0 L 0 ".concat(this.containerHeight-10," L ").concat(this.containerWidth," 134 L ").concat(this.containerWidth," 0")}}),mounted:function(){},created:function(){},watch:{},methods:_({},Object(w["b"])(["changeTermAction"]),{onRangeChangeCompleted:function(t,e){this.changeTermAction({from:t,to:e})}})},T=O,D=n("be9f");function R(t){this["$style"]=D["default"].locals||D["default"]}var C=Object(m["a"])(T,s,c,!1,R,null,null),S=C.exports,P=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},x=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("div",{staticClass:"footer-container"})])}],j={name:"Footer"},A=j,M=Object(m["a"])(A,P,x,!1,null,"7221a4ce",null),$=M.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contents-container"},[n("div",{staticClass:"card-container"},t._l(t.chartData,(function(e,r){return n("div",{key:r,staticClass:"card"},[n("div",{staticClass:"card-title"},[n("h2",{style:t.jaStyles,attrs:{id:t.$_JobResumeChart_makeTopicId(e.topic)}},[t._v(t._s(t.localeText(e.topic)))])]),n("div",{staticClass:"card-body"},[Array.isArray(e.data)?n("UiPieChart",{attrs:{"d3-scale":e.scale,"chart-data":e.data}}):t._e()],1)])})),0),n("div",{staticClass:"contents-nav-container"},[n("UiDropDown",{attrs:{items:t.topicDropDown,"open-row-max":4},on:{selected:t.moveToTopic}})],1)])},F=[],U=(n("d81d"),n("4e82"),n("0d03"),n("b0c0"),n("d3b7"),n("96cf"),n("5698")),W=(n("cb29"),n("a15b"),n("ac1f"),n("5319"),n("1276"),{computed:{randomStringSeed:function(){return"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"}},methods:{generateRandomString:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.randomStringSeed.split(""),n=[];return Array(t).fill(0).forEach((function(t){var r=parseInt(Math.random()*e.length);n.push(e[r])})),n.join("")},isProbablyDateFormat:function(t){return/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(t)},camelToKebab:function(t){return t.replace(/([A-Z]+)/g,"-$1").toLowerCase()}}}),L=(n("fb6a"),n("45fc"),{presentation:{scaleColors:["#eac295","#eaea95","#b8ea95","#a69ab0","#8d74b0","#70a2dd","#b0a272","#e09f63","#779595","#e2a8a8","#c0ceaa","#abbcd3","#e5d177"],initialShowRange:{from:2015,to:2019}},aggregate:{defaultTermRange:{min:1970,max:2019},workHourPerDay:8,topicKeys:["backendLanguages","frontendLanguages","frameworksBackend","frameworksFront","databases","webServers","libraries","systemPlatformOs","devWorkOs","ide","vcs","projectManagementTools"]},localization:{ja:{assignedTasks:"担当業務",backendLanguages:"プログラミング言語 (back-end)",frontendLanguages:"開発利用言語 (front-end)",frameworksBackend:"フレームワーク (back-end)",frameworksFront:"フレームワーク (front-end)",databases:"データベース",webServers:"Webサーバ",libraries:"ライブラリ",systemPlatformOs:"システムプラットフォームOS",devWorkOs:"開発作業マシンOS",ide:"IDE",vcs:"VCS",projectManagementTools:"プロジェクトマネジメントツール",otherToolsAndService:"その他ツール&サービス"},en:{assignedTasks:"Tasks",backendLanguages:"Programing Languages (back-end)",frontendLanguages:"Used Dev-Languages (front-end)",frameworksBackend:"Frameworks (back-end)",frameworksFront:"Frameworks (front-end)",databases:"Databases",webServers:"Web Servers",libraries:"Libraries",systemPlatformOs:"OS (system platform)",devWorkOs:"OS (for a dev-work)",ide:"IDE",vcs:"VCS",projectManagementTools:"Project Management Tools",otherToolsAndService:"Other Tools And Service"}}}),E={computed:{lang:function(){return"ja"===navigator.language.slice(0,2)?"ja":"en"},isJa:function(){return"ja"===this.lang}},methods:{localeText:function(t){var e=L.localization[[this.lang]];return Object.keys(e).some((function(e){return e===t}))?e[t]:t}}},I={name:"scrollMixin",data:function(){return{scrollWindowTween:void 0}},watch:{scrollWindowTween:function(t){void 0!==t&&this.animateWindow()}},methods:{scrollWindow:function(t){this.scrollTween,this.scrollWindowTween=new g["a"].Tween({posY:window.pageYOffset}).to({posY:t}).delay(100).easing(g["a"].Easing.Cubic.Out).onUpdate((function(t){window.scrollTo(0,parseInt(t.posY))})).start()},generateScrollElmTween:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return void 0===t.scrollTop?null:new g["a"].Tween({posY:t.scrollTop}).to({posY:e>=0?t.clientHeight:0}).delay(100).onUpdate((function(){t.scrollTop=t.scrollTop+e}))},animateWindow:function(){var t=requestAnimationFrame(this.animateWindow);g["a"].update()||cancelAnimationFrame(t)}}},H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{staticClass:"pie-chart",attrs:{viewBox:t.baseViewBox,width:t.svgWidth,height:t.svgHeight,preserveAspectRatio:"xMinYMid"}},[n("filter",{attrs:{id:"pie-slice__shadow"}},[n("feGaussianBlur",{attrs:{in:"SourceAlpha",stdDeviation:"3",result:"blur"}}),n("feOffset",{attrs:{dy:"2",dx:"2"}}),n("feComponentTransfer",[n("feFuncA",{attrs:{type:"linear",slope:"0.2"}})],1),n("feMerge",[n("feMergeNode"),n("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1),n("g",[n("g",{staticClass:"pie-background"},[n("circle",{staticClass:"pie-chart-circle__light chart__ux-reflect",attrs:{r:142,cx:"50%",cy:"50%"}}),n("circle",{staticClass:"pie-chart-circle__light",attrs:{r:107,cx:"50%",cy:"50%"}}),n("circle",{staticClass:"pie-chart-circle__light chart__center",attrs:{r:57,cx:"50%",cy:"50%"}})]),n("g",{staticClass:"pie-slice-arcs"}),n("g",{staticClass:"pie-slice-labels"}),n("g",{staticClass:"pie-slice-label-pointers"})])])},B=[];function Y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function K(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Y(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var J={name:"UiPieChart",data:function(){return{chartBaseArc:void 0,d3Pie:void 0,focusedData:void 0}},props:{chartData:{type:Array,required:!0},d3Scale:{type:Function,required:!0},baseWidth:{type:Number,default:388},baseHeight:{type:Number,default:306},chartSize:{type:Object,default:function(){return{inner:168,outer:226}}}},computed:{baseViewBox:function(){return"0 0 ".concat(this.baseWidth," ").concat(this.baseHeight)},svgWidth:function(){return this.isIE()?this.baseWidth:"100%"},svgHeight:function(){return this.isIE()?this.baseHeight:"100%"},labelTextDy:function(){return"-0.5em"}},watch:{chartData:function(t,e){Array.isArray(t)&&this.renderChart()},focusedData:function(t,e){t!==e&&(void 0!==t?(void 0!==e&&this.resetFocus(),this.focusData(t)):this.resetFocus())}},created:function(){},mounted:function(){this.renderChart()},methods:{refDataKey:function(t){return t.data.key},labelOuterPos:function(t){return t[0]=t[0]<=0?-(this.baseWidth/2-20):this.baseWidth/2-20,t},renderChart:function(){this.focusedData&&U["g"](this.$el).select("circle.chart__ux-reflect").attr("style","stroke:"),this.d3Pie=U["e"](this.chartData).sort(null).value((function(t){return t.value})),this.chartBaseArc=U["a"]().innerRadius(this.chartSize.inner/2).outerRadius(this.chartSize.outer/2);var t=this,e=U["g"](this.$el).select("g.pie-slice-arcs").attr("transform","translate(".concat(this.baseWidth/2,", ").concat(this.baseHeight/2,")")),n=e.selectAll("path.pie-slice").data(this.d3Pie(this.chartData),this.refDataKey);n.enter().append("path").merge(n).style("fill",(function(e){return t.d3Scale(e.data.key)})).attr("filter","url('#pie-slice__shadow')").attr("class","pie-slice").on(t.supportsTouch()?"touchstart":"mouseover",(function(e){t.focusedData=e}),{passive:!0}).on("mouseout",(function(e){t.supportsTouch()||(t.focusedData=void 0)})).transition().duration(500).attrTween("d",(function(e){this._current=this._current||e;var n=U["c"](this._current,e);return this._current=n(0),function(e){var r=U["a"]().innerRadius(t.chartBaseArc.innerRadius()).outerRadius(t.chartBaseArc.outerRadius());return r(K({},n(e)))}})),n.exit().remove(),this.renderLabelParts()},renderLabelParts:function(){if(this.d3Pie){var t=this,e=U["g"](this.$el).select("g.pie-slice-labels").attr("transform","translate(".concat(this.baseWidth/2,", ").concat(this.baseHeight/2,")")),n=e.selectAll("text.pie-label-text").data(this.d3Pie(this.chartData),this.refDataKey);n.enter().append("text").merge(n).text((function(t){return"".concat(t.data.label,"(").concat(t.data.value,")")})).attr("class","pie-label-text").attr("dy",this.labelTextDy).attr("transform","translate(0, 0)").attr("transform",(function(e){return"translate(".concat(t.labelOuterPos(t.chartBaseArc.centroid(e)),")")})).attr("text-anchor",(function(e){return t.chartBaseArc.centroid(e)[0]<=0?"start":"end"})),n.exit().remove();var r=U["g"](this.$el).select("g.pie-slice-label-pointers").attr("transform","translate(".concat(this.baseWidth/2,", ").concat(this.baseHeight/2,")")),a=r.selectAll("polyline.pie-label-polyline").data(this.d3Pie(this.chartData),this.refDataKey);a.enter().append("polyline").merge(a).attr("class","pie-label-polyline").attr("points",(function(e){return[t.chartBaseArc.centroid(e),t.labelOuterPos(t.chartBaseArc.centroid(e))]})),a.exit().remove()}},focusData:function(t){var e=this,n=this.d3Scale.range()[t.index],r=function(t){return[0,t[1]>-25?10:-20]};U["g"](this.$el).select("circle.chart__ux-reflect").attr("style","stroke: ".concat(n,";"));var a=U["g"](this.$el).selectAll("text").filter((function(e){return e.data.key===t.data.key}));a.empty()||a.attr("transformInitial",a.attr("transform")).attr("textAnchorInitial",a.attr("text-anchor")).attr("dy","0").attr("text-anchor","middle").transition().duration(300).attr("transform","translate(0, 0) scale(1.5)");var i=U["g"](this.$el).selectAll("polyline").filter((function(e){return e.data.key===t.data.key}));i.empty()||i.attr("pointsInitial",i.attr("points")).transition().duration(300).attr("points",(function(t){return[e.chartBaseArc.centroid(t),r(e.chartBaseArc.centroid(t))]}))},resetFocus:function(){var t=this;U["g"](this.$el).select("circle.chart__ux-reflect").attr("style","stroke:"),U["g"](this.$el).selectAll("text").select((function(){var e=U["g"](this).attr("dy",t.labelTextDy).interrupt();null!==e.attr("transformInitial")&&(e.attr("transform",e.attr("transformInitial")),e.attr("transformInitial",null)),null!==e.attr("textAnchorInitial")&&(e.attr("text-anchor",e.attr("textAnchorInitial")),e.attr("textAnchorInitial",null))})),U["g"](this.$el).selectAll("polyline").select((function(){var t=U["g"](this).interrupt();null!==t.attr("pointsInitial")&&(t.attr("points",t.attr("pointsInitial")),t.attr("pointsInitial",null))}))}}},N=J,z=(n("d68a"),Object(m["a"])(N,H,B,!1,null,"40dbeb02",null)),V=z.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-wrap"},[n("button",t._g({staticClass:"md-show contents-nav-scroller __up"},t.scrollUpHandler)),n("transition-group",{staticClass:"contents-nav",class:{dropdown__open:t.isOpen},style:{"max-height":t.listMaxHeight},attrs:{tag:"ul",name:"trans-dropdown-list"}},t._l(t.activeItems,(function(e,r){return n("li",{key:r,staticClass:"nav-item",class:{"nav-item__selected":t.switchSelected(r,e.value)}},[n("a",{staticClass:"btn",attrs:{href:"#",role:"button"},on:{click:function(n){return n.preventDefault(),n.stopPropagation(),t.selected(e.value)}}},[t._v(t._s(e.label))])])})),0),t.isListMode?t._e():n("div",{staticClass:"dropdown-controller"},[n("button",{staticClass:"contents-nav-toggler",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.toggleDropDown()}}}),t.isOpen&&t.items.length>t.openRowMax?n("button",t._g({staticClass:"contents-nav-scroller __up"},t.scrollUpHandler)):t._e(),t.isOpen&&t.items.length>t.openRowMax?n("button",t._g({staticClass:"contents-nav-scroller"},t.scrollDownHandler)):t._e()]),t.items.length>t.openRowMax?n("button",t._g({staticClass:"md-show contents-nav-scroller"},t.scrollDownHandler)):t._e()],1)},q=[];function X(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Q(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?X(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var Z={name:"UiDropDown",mixins:[I],data:function(){return{isOpen:!1,selectedValue:null,isListMode:!0,scrollDownTween:null,scrollUpTween:null}},props:{items:{type:Array,default:function(){return[]}},openRowMax:{type:Number,default:5},ignoreSameSelect:{type:Boolean,default:!1}},computed:Q({SelectedEvent:function(){return"selected"},ScrollDirection:function(){return{UP:1,DOWN:2}}},Object(w["d"])({isOverlayActive:function(t){return t.appCommon.isOverlayActivated}}),{listMaxHeight:function(){return"".concat(50*(this.openRowMax+1),"px")},activeItems:function(){var t=this;return this.isListMode||this.isOpen?this.items:this.items.filter((function(e,n){return e.value===t.selectedValue||null===t.selectedValue&&0===n}))},groundPositionY:function(){return 88},scrollUpHandler:function(){var t=this;return this.supportsTouch()?{touchstart:function(){return t.scrollItems(t.ScrollDirection.UP)},touchend:function(){return t.stopScroll()}}:{mousedown:function(){return t.scrollItems(t.ScrollDirection.UP)},mouseup:function(){return t.stopScroll()}}},scrollDownHandler:function(){var t=this;return this.supportsTouch()?{touchstart:function(){return t.scrollItems(t.ScrollDirection.DOWN)},touchend:function(){return t.stopScroll()}}:{mousedown:function(){return t.scrollItems(t.ScrollDirection.DOWN)},mouseup:function(){return t.stopScroll()}}}}),created:function(){},mounted:function(){window.addEventListener("resize",this.$_UiDroopDown_resetUi),this.$_UiDroopDown_resetUi()},beforeDestroy:function(){window.removeEventListener("resize",this.$_UiDroopDown_resetUi)},watch:{selectedValue:function(){this.$_UiDroopDown_emitSelected()},isOpen:function(){this.switchOverlayAction(this.isOpen)},isOverlayActive:function(t){!1===t&&!0===this.isOpen&&(this.isOpen=!1)}},methods:Q({},Object(w["b"])(["switchOverlayAction"]),{selected:function(t){this.ignoreSameSelect||this.selectedValue!==t||this.$_UiDroopDown_emitSelected(),this.selectedValue=t,this.isOpen=!1},toggleDropDown:function(){this.isOpen=!this.isOpen},switchSelected:function(t,e){return 0===t&&null===this.selectedValue?(this.selectedValue=e,!0):this.selectedValue===e},scrollItems:Object(f["throttle"])((function(t){if(t===this.ScrollDirection.UP||t===this.ScrollDirection.DOWN){var e=this.$el.querySelector("ul");if(t===this.ScrollDirection.UP){if(this.scrollUpTween||(this.scrollUpTween=this.generateScrollElmTween(e,-5)),e.scrollTop<=0)return;this.scrollUpTween.start()}else if(t===this.ScrollDirection.DOWN){if(this.scrollDownTween||(this.scrollDownTween=this.generateScrollElmTween(e,5)),e.scrollTop>32*this.items.length)return;this.scrollDownTween.start()}this.$_UiDroopDown_animate()}}),1e3),scrollUp:function(){var t=this.$el.querySelector("ul");this.scrollUpTween||(this.scrollUpTween=this.generateScrollElmTween(t,-5)),t.scrollTop<=0||(this.scrollUpTween.start(),this.$_UiDroopDown_animate())},scrollDown:function(){var t=this.$el.querySelector("ul");this.scrollDownTween||(this.scrollDownTween=this.generateScrollElmTween(t,5)),t.scrollTop>32*this.items.length||(this.scrollDownTween.start(),this.$_UiDroopDown_animate())},stopScroll:function(){this.scrollUpTween&&this.scrollUpTween.stop(),this.scrollDownTween&&this.scrollDownTween.stop()},$_UiDroopDown_animate:function(){var t=requestAnimationFrame(this.$_UiDroopDown_animate);g["a"].update()||cancelAnimationFrame(t)},$_UiDroopDown_emitSelected:function(){var t=this.$el.getBoundingClientRect();this.$emit(this.SelectedEvent,t.top+this.groundPositionY,this.selectedValue)},$_UiDroopDown_resetUi:Object(f["throttle"])((function(){this.isMobileScreen()?this.isListMode=!1:(this.isListMode=!0,this.isOverlayActive&&this.switchOverlayAction(!1))}),1e3)})},tt=Z,et=(n("5dd6"),Object(m["a"])(tt,G,q,!1,null,"35dda796",null)),nt=et.exports;function rt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function at(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?rt(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):rt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var it={name:"JobResumeChart",components:{UiDropDown:nt,UiPieChart:V},mixins:[W,E,I],data:function(){return{sourceData:null,chartData:[],topicDropDown:[],labelKeyMap:{}}},props:{},computed:at({},Object(w["d"])({termStartFrom:function(t){return t.jobResume.termStartFrom},termStartTo:function(t){return t.jobResume.termStartTo}}),{},Object(w["c"])(["termStartFromDate","termStartToDate","termRangeMinYear","termRangeMaxYear"]),{initialTerms:function(){var t=L.presentation.initialShowRange.from;(!t||this.termRangeMinYear>=t||this.termRangeMaxYear<=t)&&(t=this.termRangeMinYear);var e=L.presentation.initialShowRange.to;return(!e||this.termRangeMinYear>=e||this.termRangeMaxYear<=e)&&(e=this.termRangeMaxYear),t>e?[+this.termRangeMinYear,+this.termRangeMaxYear]:[t,e]},jaStyles:function(){return this.isJa?{"font-weight":"normal"}:{}}}),watch:{termStartFrom:function(){this.generateChartModel()},termStartTo:function(){this.generateChartModel()}},created:function(){},mounted:function(){var t=this;L.aggregate.topicKeys.forEach((function(e){t.topicDropDown.push({label:t.localeText(e),value:t.$_JobResumeChart_makeTopicId(e)}),t.labelKeyMap[e]={}})),this.fetchData()},methods:at({},Object(w["b"])(["changeTermRangeAction","changeDefaultTermAction"]),{fetchData:function(){var t,e,n;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(U["d"]("./resources/json/resume.json"));case 2:if(t=r.sent,this.sourceData=t,e=this,!this.sourceData){r.next=11;break}return n=U["b"](this.sourceData.projects,(function(t){return e.isProbablyDateFormat(t.outline.termFrom)?t.outline.termFrom:"1970-01-01"})),r.next=9,regeneratorRuntime.awrap(this.changeTermRangeAction({min:n[0],max:n[1]}));case 9:return r.next=11,regeneratorRuntime.awrap(this.changeDefaultTermAction({from:this.initialTerms[0],to:this.initialTerms[1]}));case 11:this.generateChartModel();case 12:case"end":return r.stop()}}),null,this)},generateChartModel:function(){var t=this;if(!this.sourceData)return!1;var e=this,n=this.sourceData.projects.filter((function(t){if(!0===t.skip)return!1;var n=!0,r=new Date("".concat(t.outline.termFrom));return null!==e.termStartFromDate&&(n=r.valueOf()>=e.termStartFromDate.valueOf()),n&&null!==e.termStartToDate&&(n=r.valueOf()<e.termStartToDate.valueOf()),n}));if(!n||0===n.length)return this.chartData=[],void L.aggregate.topicKeys.forEach((function(e){t.chartData.push(t.$_JobResumeChart_packDataForChart([],e))}));this.chartData=[];var r={};n.forEach((function(e){var n=t.$_JobResumeChart_getManHour(e.outline);L.aggregate.topicKeys.forEach((function(a){var i="".concat(a)in r?r[a]:{};"".concat(a)in e.outline&&(i=t.$_JobResumeChart_buildTopicModel(e.outline[[a]],a,n,i)),"".concat(a)in e.technicalDetails&&(i=t.$_JobResumeChart_buildTopicModel(e.technicalDetails[[a]],a,n,i)),"".concat(a)in e.developmentTools&&(i=t.$_JobResumeChart_buildTopicModel(e.developmentTools[[a]],a,n,i)),r[a]=i}))})),L.aggregate.topicKeys.forEach((function(e){t.chartData.push(t.$_JobResumeChart_packDataForChart(r[[e]],e))}))},moveToTopic:function(t,e){var n=this.$el.querySelector("#".concat(e));n&&this.scrollWindow(n.offsetTop-t)},$_JobResumeChart_packDataForChart:function(t,e){var n=U["h"](t).sort((function(t,e){return t.label>e.label?1:-1})),r=U["f"]().domain(n.map((function(t){return t.key}))).range(L.presentation.scaleColors);return{topic:e,scale:r,data:n}},$_JobResumeChart_makeTopicId:function(t){return"chart-".concat(this.camelToKebab(t))},$_JobResumeChart_buildTopicModel:function(t,e,n,r){var a=this;return t.forEach((function(t){r[[t]]="".concat(t)in r?a.$_JobResumeChart_createDataModel(e,t,r[[t]].value+n,r[[t]].key):a.$_JobResumeChart_createDataModel(e,t,n,null)})),r},$_JobResumeChart_createDataModel:function(t,e){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return null===a&&(Object.keys(this.labelKeyMap[[t]]).forEach((function(r){n.labelKeyMap[[t]][r]===e&&(a=r)})),null===a&&(a="".concat(t,"_").concat(this.generateRandomString(8)),this.labelKeyMap[[t]][[a]]=e)),{key:a,label:"".concat(e),value:r}},$_JobResumeChart_getManHour:function(t){if(t.manHour>0)return t.manHour;var e=t.termFrom?new Date("".concat(t.termFrom)):new Date,n=t.termTo?new Date("".concat(t.termTo)):new Date;if(e>n)return console.warn("Invalid project term. (".concat(t.name,")")),0;var r=(n.getTime()-e.getTime())/864e5;return r*L.aggregate.workHourPerDay}})},ot=it,st=Object(m["a"])(ot,k,F,!1,null,"23e5c3e2",null),ct=st.exports,lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"}},[t.isActive?n("div",{staticClass:"overlay-container",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.forceTeardown(e)}}}):t._e()])},ut=[];function ht(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function ft(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ht(Object(n),!0).forEach((function(e){Object(l["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ht(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var gt={name:"Overlay",mounted:function(){},computed:ft({},Object(w["d"])({isActive:function(t){return t.appCommon.isOverlayActivated}})),watch:{isActive:function(t,e){}},methods:ft({},Object(w["b"])(["switchOverlayAction"]),{forceTeardown:function(){this.switchOverlayAction(!1)}})},dt=gt,pt=(n("40d9"),Object(m["a"])(dt,lt,ut,!1,null,"ea7311cc",null)),mt=pt.exports,vt={name:"app",components:{Overlay:mt,JobResumeChart:ct,Footer:$,Header:S}},bt=vt,wt=Object(m["a"])(bt,i,o,!1,null,null,null),yt=wt.exports,_t=function(t){this.name="JobResumeException",this.message=t},Ot={termStartFrom:null,termStartTo:null,defaultStartFrom:null,defaultStartTo:null,termRangeMin:null,termRangeMax:null},Tt={termStartFromDate:function(t){return null!==t.termStartFrom?new Date("".concat(t.termStartFrom,"-01-01")):null},termStartToDate:function(t){return null!==t.termStartTo?new Date("".concat(t.termStartTo,"-12-31")):null},termRangeMinYear:function(t){return t.termRangeMin instanceof Date?t.termRangeMin.getFullYear():L.aggregate.defaultTermRange.min},termRangeMaxYear:function(t){return t.termRangeMax instanceof Date?t.termRangeMax.getFullYear():L.aggregate.defaultTermRange.max}},Dt={changeTermAction:function(t,e){var n=t.commit,r=e.from,a=e.to;Ct.validateYearTerm(r,a)&&n("setTerm",{from:r,to:a})},changeDefaultTermAction:function(t,e){var n=t.commit,r=e.from,a=e.to;Ct.validateYearTerm(r,a)&&n("setDefaultTerm",{from:r,to:a})},changeTermRangeAction:function(t,e){var n=t.commit,r=e.min,a=e.max;if(!W.methods.isProbablyDateFormat(r)||!W.methods.isProbablyDateFormat(a))throw new _t("Invalid date format. (min:".concat(r," max:").concat(a,")"));n("setTermRange",{min:r,max:a})}},Rt={setTerm:function(t,e){var n=e.from,r=e.to;t.termStartFrom=n,t.termStartTo=r},setDefaultTerm:function(t,e){var n=e.from,r=e.to;t.defaultStartFrom=n,t.defaultStartTo=r},setTermRange:function(t,e){var n=e.min,r=e.max;t.termRangeMin=new Date(n),t.termRangeMax=new Date(r)}},Ct={validateYearTerm:function(t,e){if(!/[0-9]{4}/.test(parseInt(t))||!/[0-9]{4}/.test(parseInt(e)))throw new _t("Invalid parameter (from:".concat(t," to:").concat(e,")"));if(parseInt(t)>parseInt(e))throw new _t('"to" must greater than "from" (from:'.concat(t," to:").concat(e,")"));return!0}},St={namespaced:!1,state:Ot,getters:Tt,mutations:Rt,actions:Dt},Pt={isOverlayActivated:!1},xt={},jt={setOverlayState:function(t,e){t.isOverlayActivated=e}},At={switchOverlayAction:function(t,e){var n=t.commit;n("setOverlayState",e)},activateOverlayAction:function(t){var e=t.commit;e("setOverlayState",!0)},teardownOverlayAction:function(t){var e=t.commit;e("setOverlayState",!1)}},Mt={namespaced:!1,state:Pt,getters:xt,mutations:jt,actions:At};a["a"].use(w["a"]);var $t=new w["a"].Store({modules:{jobResume:St,appCommon:Mt}});n("907d"),a["a"].config.productionTip=!1,a["a"].mixin(r),new a["a"]({store:$t,render:function(t){return t(yt)}}).$mount("#app")},"599f":function(t,e,n){t.exports={headerbg:"TheHeader_headerbg_1nnAB",gBanner:"TheHeader_gBanner_Jxayh",gCircle:"TheHeader_gCircle_3JBmt"}},"5dd6":function(t,e,n){"use strict";var r=n("8796"),a=n.n(r);a.a},8796:function(t,e,n){},"907d":function(t,e,n){},b8e5:function(t,e,n){"use strict";var r=n("1a6e"),a=n.n(r);a.a},be9f:function(t,e,n){"use strict";var r=n("599f"),a=n.n(r);e["default"]=a.a},d68a:function(t,e,n){"use strict";var r=n("287e"),a=n.n(r);a.a},e77e:function(t,e,n){}});
//# sourceMappingURL=app.40c4f27b.js.map