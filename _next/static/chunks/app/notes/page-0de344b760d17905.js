(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[568],{6453:(e,t,n)=>{Promise.resolve().then(n.bind(n,5072))},694:(e,t,n)=>{"use strict";var s=n(5149);n.o(s,"usePathname")&&n.d(t,{usePathname:function(){return s.usePathname}}),n.o(s,"useRouter")&&n.d(t,{useRouter:function(){return s.useRouter}}),n.o(s,"useSearchParams")&&n.d(t,{useSearchParams:function(){return s.useSearchParams}})},5755:(e,t,n)=>{"use strict";n.d(t,{h:()=>a});var s=n(5015),r=e=>e.at(-1);function a(e){let{items:t}=e;return 0===t.length?null:1===t.length?t[0]:[...t.slice(0,-1).flatMap(e=>[e,", "]).slice(0,-1)," and ",function(...e){return(0,s.a)(r,e)}(t)]}},3730:(e,t,n)=>{"use strict";n.d(t,{Y:()=>o});var s=n(3003),r=n(5791),a=n(7952);function c(e){let{children:t,href:n}=e;return(0,a.a)(n)?t:(0,s.jsx)("a",{className:"no-underline hover:underline",href:n,children:t})}function l(e){let{tag:t,href:n}=e;return t&&n?(0,s.jsx)("div",{className:"mb-2 mt-3 text-sm text-theme-accent",children:(0,s.jsx)(r.v,{value:t,attribute:"technology",href:n})}):null}function o(e){let{children:t,superText:n,title:r,href:a,subText:o,tag:u,tagHref:i}=e,h="mx-auto my-1 m-width[50ch] text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";return(0,s.jsxs)("header",{className:"my-6 text-center",children:[(0,s.jsxs)("h1",{className:"my-0",children:[(0,s.jsx)("span",{className:"block ".concat(h),children:n})," ",(0,s.jsx)("span",{className:"block",children:(0,s.jsx)(c,{href:a,children:r})})]}),(0,s.jsx)("div",{className:"my-2 block ".concat(h),"data-test-id":"sub-text",children:o}),(0,s.jsx)(l,{tag:u,href:i}),t]})}},132:(e,t,n)=>{"use strict";n.d(t,{B:()=>r});var s=n(3003);function r(e){let{title:t,url:n,children:r,style:a,tag:c,tagAttribute:l}=e;return(0,s.jsxs)("a",{className:"my-4 block border-l-[3px] border-theme-accent pl-[calc(theme('spacing.3')-3px)] text-theme-text outline-none transition-all duration-75 ease-in hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline hocus:shadow-theme-backgroundHighlight",href:n,style:a,...c&&l&&{["data-".concat(l)]:c},children:[(0,s.jsx)("h3",{className:"my-0 text-base",children:t}),(0,s.jsx)("p",{className:"my-0 italic",children:r})]})}},5791:(e,t,n)=>{"use strict";n.d(t,{v:()=>r});var s=n(3003);function r(e){let{value:t,attribute:n,...r}=e,a={["data-".concat(n)]:t},c="\n    inline-block rounded-full border-none bg-theme-accent px-2 py-0.75 font-sans text-xs\n    font-normal uppercase tracking-wider text-white no-underline transition-shadow duration-75\n    ease-in hocus:shadow-outline hocus:shadow-theme-accent/50 selected:shadow-outline\n    selected:shadow-theme-accent/50 md:text-2xs\n  ";if("href"in r)return(0,s.jsx)("a",{href:r.href,className:c,...a,children:t});let{onClick:l,selected:o}=r;return(0,s.jsx)("button",{type:"button",className:c,...a,onClick:()=>l(t),role:"switch","aria-checked":o,children:t})}},2314:(e,t,n)=>{"use strict";n.d(t,{Y:()=>l});var s=n(3003),r=n(5791),a=n(9700),c=n(2491);function l(e){let{values:t,type:n}=e,[l,o]=(0,a.Z)(n,t),u=(0,c.useCallback)(e=>o(l===e?null:e),[l,o]);return(0,s.jsx)("div",{className:"mb-4 mt-3.5 flex flex-wrap justify-center gap-2",children:t.map(e=>(0,s.jsx)(r.v,{value:e,onClick:u,selected:l===e,attribute:n},e))})}},5072:(e,t,n)=>{"use strict";n.d(t,{NoteSummaries:()=>g});var s=n(3003),r=n(5755),a=n(132);function c(e){let{note:t}=e;return(0,s.jsx)("span",{className:"max-md:block",children:(0,s.jsx)(r.h,{items:t.authors})},"authors")}function l(e){let{note:t}=e;return(0,s.jsx)("span",{className:"max-md:italic",children:"source"in t&&t.source},"source")}function o(e){let{note:t}=e,n=(0,s.jsx)(c,{note:t}),r=(0,s.jsx)(l,{note:t});return"source"in t&&!(1===t.authors.length&&t.authors[0]===t.source)?0!==t.authors.length?(0,s.jsxs)(s.Fragment,{children:[n," ",(0,s.jsx)("span",{className:"max-md:hidden",children:"∙"})," ",r]}):r:n}function u(e){let{note:t}=e;return(0,s.jsx)(a.B,{url:"/notes/".concat(t.slug),title:t.title,tag:t.category,tagAttribute:"category",children:(0,s.jsx)(o,{note:t})})}var i=n(3730),h=n(2314),d=n(5087),m=n(8502),x=n(9700),f=n(2491);function g(e){let{notes:t}=e,[n]=(0,x.Z)("category",d.R6),r=(0,f.useMemo)(()=>(0,m.w)(t,"category",n),[t,n]).map(e=>(0,s.jsx)(u,{note:e},e.slug));return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.Y,{title:"Notes",subText:"My personal notes on books, articles, talks, podcasts and more.",children:(0,s.jsx)(h.Y,{type:"category",values:d.R6})}),(0,s.jsx)("section",{className:"my-8",children:r})]})}},5087:(e,t,n)=>{"use strict";n.d(t,{AC:()=>j,EL:()=>h,Fr:()=>k,H1:()=>l,Hm:()=>c,Ho:()=>r,Hw:()=>p,IO:()=>f,IP:()=>x,Li:()=>i,R6:()=>g,Xe:()=>a,aE:()=>b,cK:()=>v,fQ:()=>u,fg:()=>d,iT:()=>s,oV:()=>y,o_:()=>N,pC:()=>m,yG:()=>o});let s="Article",r="App",a="Book",c="Course",l="Live Talk",o="Podcast",u="Recorded Talk",i="Video",h="Business",d="Development",m="Psychology",x="Health",f="Other",g=[h,d,m,x,f],p="TypeScript / JavaScript",b="Ruby",j="Git",v="Neovim",y="Shell",k=[p,b,j,v,y],N="Landon Schropp"},8502:(e,t,n)=>{"use strict";function s(e,t,n){return null===n?e:e.filter(e=>e[t]===n)}n.d(t,{w:()=>s})},9700:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var s=n(694),r=n(2491);function a(e,t){let n=(0,r.useCallback)(e=>t.includes(e),[t]),[a,c]=function(e){var t;let n=(0,s.useRouter)(),a=(0,s.usePathname)(),c=(0,s.useSearchParams)();return[null!==(t=null==c?void 0:c.get(e))&&void 0!==t?t:null,(0,r.useCallback)(t=>{if(!c)return;let s=new URLSearchParams(Array.from(c.entries()));t?s.set(e,t):s.delete(e);let r=0===s.size?"":"?".concat(s);n.replace("".concat(a).concat(r))},[e,a,n,c])]}(e);return[n(a)?a:null,e=>c(e)]}},7952:(e,t,n)=>{"use strict";function s(e){return null==e}n.d(t,{a:()=>s})},5015:(e,t,n)=>{"use strict";function s(e,t,n){let s=e.length-t.length;if(0===s)return e(...t);if(1===s){let s;return s=n=>e(n,...t),void 0===n?s:Object.assign(s,{lazy:n,lazyArgs:t})}throw Error("Wrong number of arguments")}n.d(t,{a:()=>s})}},e=>{var t=t=>e(e.s=t);e.O(0,[176,57,358],()=>t(6453)),_N_E=e.O()}]);