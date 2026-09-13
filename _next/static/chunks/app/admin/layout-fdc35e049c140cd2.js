(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[91],{3912:function(e,t,r){Promise.resolve().then(r.bind(r,3631))},3631:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return k}});var a=r(7437),n=r(7138),s=r(6463),i=r(2265),l=r(1691),o=r(8030);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,o.Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);var c=r(7524);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=(0,o.Z)("Images",[["path",{d:"M18 22H4a2 2 0 0 1-2-2V6",key:"pblm9e"}],["path",{d:"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18",key:"nf6bnh"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["rect",{width:"16",height:"16",x:"6",y:"2",rx:"2",key:"12espp"}]]);var h=r(3149),f=r(7390),m=r(4086);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,o.Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var y=r(4697);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let v=(0,o.Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);var p=r(2873),b=r(7440);let g=[{label:"Dashboard",href:"/admin",icon:d},{label:"Products",href:"/admin/products",icon:c.Z},{label:"Home Slider",href:"/admin/slider",icon:u},{label:"Brands",href:"/admin/brands",icon:h.Z},{label:"Messages",href:"/admin/messages",icon:f.Z},{label:"Newsletter",href:"/admin/newsletter",icon:m.Z},{label:"Settings",href:"/admin/settings",icon:x}];function k(e){var t;let{children:r}=e,o=(0,s.usePathname)(),d=(0,s.useRouter)(),c=(0,l.d)(e=>e.user),u=(0,l.d)(e=>e.logout),f=(0,l.d)(e=>e.initProducts),[m,x]=(0,i.useState)(!1),[k,w]=(0,i.useState)(!1);return((0,i.useEffect)(()=>{w(!0),f()},[f]),(0,i.useEffect)(()=>{k&&!c&&"/admin/login"!==o&&d.push("/admin/login")},[k,c,o,d]),(0,i.useEffect)(()=>{x(!1)},[o]),k)?"/admin/login"!==o&&c?(0,a.jsxs)("div",{className:"fixed inset-0 z-50 flex bg-ivory font-inter",children:[m&&(0,a.jsx)("div",{className:"fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm md:hidden",onClick:()=>x(!1)}),(0,a.jsxs)("aside",{className:(0,b.cn)("fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-brown text-ivory transition-transform duration-300 md:static md:translate-x-0",m?"translate-x-0":"-translate-x-full"),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between border-b border-ivory/15 px-6 py-5",children:[(0,a.jsx)(n.default,{href:"/admin",className:"flex items-center",children:(0,a.jsx)("img",{src:"/logo.svg",alt:"SAH-KHUSH",className:"h-10 w-auto brightness-0 invert"})}),(0,a.jsx)("button",{onClick:()=>x(!1),className:"grid h-8 w-8 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:text-gold md:hidden",children:(0,a.jsx)(y.Z,{className:"h-4 w-4"})})]}),(0,a.jsx)("nav",{className:"flex-1 space-y-1 px-3 py-4",children:g.map(e=>{let t="/admin"===e.href?"/admin"===o:o.startsWith(e.href);return(0,a.jsxs)(n.default,{href:e.href,className:(0,b.cn)("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",t?"bg-gold text-brown":"text-ivory/70 hover:bg-ivory/10 hover:text-ivory"),children:[(0,a.jsx)(e.icon,{className:"h-5 w-5"}),e.label]},e.href)})}),(0,a.jsxs)("div",{className:"border-t border-ivory/15 px-3 py-4 space-y-1",children:[(0,a.jsxs)(n.default,{href:"/",className:"flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ivory/70 transition hover:bg-ivory/10 hover:text-ivory",children:[(0,a.jsx)(h.Z,{className:"h-5 w-5"}),"Back to Store"]}),(0,a.jsxs)("button",{onClick:()=>{u(),d.push("/admin/login")},className:"flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ivory/70 transition hover:bg-red-500/20 hover:text-red-400",children:[(0,a.jsx)(v,{className:"h-5 w-5"}),"Logout"]})]})]}),(0,a.jsxs)("div",{className:"flex flex-1 flex-col overflow-hidden",children:[(0,a.jsxs)("header",{className:"flex items-center gap-4 border-b border-taupe/15 bg-white px-6 py-4 shadow-sm",children:[(0,a.jsx)("button",{onClick:()=>x(!0),className:"grid h-9 w-9 place-items-center rounded-lg border border-taupe/20 transition hover:border-brown hover:text-brown md:hidden",children:(0,a.jsx)(p.Z,{className:"h-5 w-5"})}),(0,a.jsx)("div",{className:"flex-1",children:(0,a.jsx)("h2",{className:"text-lg font-semibold text-charcoal",children:(null===(t=g.find(e=>"/admin"===e.href?"/admin"===o:o.startsWith(e.href)))||void 0===t?void 0:t.label)||"Admin"})}),(0,a.jsxs)("div",{className:"flex items-center gap-3 text-sm text-taupe",children:[(0,a.jsx)("span",{className:"hidden sm:inline",children:c.email}),(0,a.jsx)("div",{className:"grid h-8 w-8 place-items-center rounded-full bg-gold text-sm font-bold text-brown",children:c.name[0]})]})]}),(0,a.jsx)("main",{className:"flex-1 overflow-y-auto p-6",children:r})]})]}):(0,a.jsx)(a.Fragment,{children:r}):(0,a.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-ivory",children:(0,a.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-2 border-taupe border-t-transparent"})})}},7440:function(e,t,r){"use strict";r.d(t,{G:function(){return l},H:function(){return i},cn:function(){return s}});var a=r(4839),n=r(6164);function s(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.m6)((0,a.W)(t))}function i(e){return"৳".concat(e.toLocaleString("en-BD"))}function l(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"8801XXXXXXXXX";return"https://wa.me/".concat(t,"?text=").concat(encodeURIComponent(e))}},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var a=r(2265);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),s=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a.forwardRef)((e,t)=>{let{color:r="currentColor",size:n=24,strokeWidth:l=2,absoluteStrokeWidth:o,className:d="",children:c,iconNode:u,...h}=e;return(0,a.createElement)("svg",{ref:t,...i,width:n,height:n,stroke:r,strokeWidth:o?24*Number(l)/Number(n):l,className:s("lucide",d),...h},[...u.map(e=>{let[t,r]=e;return(0,a.createElement)(t,r)}),...Array.isArray(c)?c:[c]])}),o=(e,t)=>{let r=(0,a.forwardRef)((r,i)=>{let{className:o,...d}=r;return(0,a.createElement)(l,{ref:i,iconNode:t,className:s("lucide-".concat(n(e)),o),...d})});return r.displayName="".concat(e),r}},4086:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},2873:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]])},7390:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]])},7524:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},3149:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",key:"6c3vgh"}]])},4697:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},7138:function(e,t,r){"use strict";r.d(t,{default:function(){return n.a}});var a=r(231),n=r.n(a)},6463:function(e,t,r){"use strict";var a=r(1169);r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})}},function(e){e.O(0,[151,868,231,691,971,23,744],function(){return e(e.s=3912)}),_N_E=e.O()}]);