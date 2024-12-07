(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[292],{2398:(e,t,r)=>{Promise.resolve().then(r.bind(r,8983))},8983:(e,t,r)=>{"use strict";r.d(t,{ArticleSummaries:()=>m});var c=r(3003),o=r(4303),a=r(132);r(2491);var s=r(7952);let l=o.A.theme.colors.cornflower,n=o.A.theme.colors.bittersweet;function i(e){let{articleSummary:t,index:r,numberOfArticles:o}=e,i=(0,s.a)(t.url)?"/articles/".concat(t.slug):t.url,h={borderColor:"color-mix(in oklab, ".concat(n," ").concat("".concat(r/(o-1)*100,"%"),", ").concat(l,")")};return(0,c.jsx)(a.B,{title:t.title,url:i,style:h,children:t.description})}var h=r(3730);function m(e){let{articleSummaries:t}=e;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(h.Y,{title:"Writing",subText:"My published articles from all over the web."}),(0,c.jsx)("section",{children:t.map((e,r)=>(0,c.jsx)(i,{articleSummary:e,index:r,numberOfArticles:t.length},e.slug))})]})}},3730:(e,t,r)=>{"use strict";r.d(t,{Y:()=>n});var c=r(3003),o=r(5791),a=r(7952);function s(e){let{children:t,href:r}=e;return(0,a.a)(r)?t:(0,c.jsx)("a",{className:"no-underline hover:underline",href:r,children:t})}function l(e){let{tag:t,href:r}=e;return t&&r?(0,c.jsx)("div",{className:"mb-2 mt-3 text-sm text-theme-accent",children:(0,c.jsx)(o.v,{value:t,attribute:"technology",href:r})}):null}function n(e){let{children:t,superText:r,title:o,href:a,subText:n,tag:i,tagHref:h}=e,m="mx-auto my-1 m-width[50ch] text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";return(0,c.jsxs)("header",{className:"my-6 text-center",children:[(0,c.jsxs)("h1",{className:"my-0",children:[(0,c.jsx)("span",{className:"block ".concat(m),children:r})," ",(0,c.jsx)("span",{className:"block",children:(0,c.jsx)(s,{href:a,children:o})})]}),(0,c.jsx)("div",{className:"my-2 block ".concat(m),"data-test-id":"sub-text",children:n}),(0,c.jsx)(l,{tag:i,href:h}),t]})}},132:(e,t,r)=>{"use strict";r.d(t,{B:()=>o});var c=r(3003);function o(e){let{title:t,url:r,children:o,style:a,tag:s,tagAttribute:l}=e;return(0,c.jsxs)("a",{className:"my-4 block border-l-[3px] border-theme-accent pl-[calc(theme('spacing.3')-3px)] text-theme-text outline-none transition-all duration-75 ease-in hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline hocus:shadow-theme-backgroundHighlight",href:r,style:a,...s&&l&&{["data-".concat(l)]:s},children:[(0,c.jsx)("h3",{className:"my-0 text-base",children:t}),(0,c.jsx)("p",{className:"my-0 italic",children:o})]})}},5791:(e,t,r)=>{"use strict";r.d(t,{v:()=>o});var c=r(3003);function o(e){let{value:t,attribute:r,...o}=e,a={["data-".concat(r)]:t},s="\n    inline-block rounded-full border-none bg-theme-accent px-2 py-0.75 font-sans text-xs\n    font-normal uppercase tracking-wider text-white no-underline transition-shadow duration-75\n    ease-in hocus:shadow-outline hocus:shadow-theme-accent/50 selected:shadow-outline\n    selected:shadow-theme-accent/50 md:text-2xs\n  ";if("href"in o)return(0,c.jsx)("a",{href:o.href,className:s,...a,children:t});let{onClick:l,selected:n}=o;return(0,c.jsx)("button",{type:"button",className:s,...a,onClick:()=>l(t),role:"switch","aria-checked":n,children:t})}},5087:(e,t,r)=>{"use strict";r.d(t,{AC:()=>y,EL:()=>m,Fr:()=>j,H1:()=>l,Hm:()=>s,Ho:()=>o,Hw:()=>p,IO:()=>b,IP:()=>x,Li:()=>h,R6:()=>f,Xe:()=>a,aE:()=>g,cK:()=>k,fQ:()=>i,fg:()=>u,iT:()=>c,oV:()=>w,o_:()=>v,pC:()=>d,yG:()=>n});let c="Article",o="App",a="Book",s="Course",l="Live Talk",n="Podcast",i="Recorded Talk",h="Video",m="Business",u="Development",d="Psychology",x="Health",b="Other",f=[m,u,d,x,b],p="TypeScript / JavaScript",g="Ruby",y="Git",k="Neovim",w="Shell",j=[p,g,y,k,w],v="Landon Schropp"},4303:(e,t,r)=>{"use strict";r.d(t,{A:()=>g,K:()=>u});var c=r(5087),o=r(6291),a=r(6798),s=r(2153),l=r.n(s),n=r(4102),i=r.n(n),h=r(3943),m=r.n(h);let u="(max-aspect-ratio: 1/1)",d={content:["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],darkMode:"class",theme:{extend:{fontSize:{"2xs":"0.625rem"},boxShadow:{outline:"0 0 0 ".concat(.234375,"rem"),largeOutline:"0 0 0 ".concat(.625,"rem")}},spacing:{"0.25":"".concat(1.25/16,"rem"),"0.75":"".concat(.234375,"rem"),"3.6":"".concat(1.125,"rem"),...(0,a.a)(i().spacing,(e,t)=>isNaN(Number(t))?e:"".concat(1.25*Number(t)/4,"rem"))},screens:{md:"420px",lg:"960px",xl:"1280px","max-md":{max:"419px"},"max-lg":{max:"959px"},"max-xl":{max:"1279px"},portrait:{raw:u}},fontFamily:{sans:["Open Sans","sans-serif"],serif:["Gentium Book Plus","serif"],mono:["Source Code Pro","monospace"]},colors:{inherit:"inherit",blackOut:"#1b1c21",mineShaft:"#292b33",emperor:"#484a54",gray:"#81838f",greatFalls:"#a1a4b3",cerebral:"#bec1cc",steam:"#d3d5de",bleach:"#ebecf2",white:"#fff",cornflower:"#627ff6",purple:"#836fdd",amethyst:"#955fc2",mulberry:"#ca6399",bittersweet:"#ff6d71"}}},x={[c.EL]:d.theme.colors.cornflower,[c.fg]:d.theme.colors.purple,[c.pC]:d.theme.colors.amethyst,[c.IP]:d.theme.colors.mulberry,[c.IO]:d.theme.colors.bittersweet},b={[c.Hw]:d.theme.colors.cornflower,[c.aE]:d.theme.colors.purple,[c.AC]:d.theme.colors.amethyst,[c.cK]:d.theme.colors.mulberry,[c.oV]:d.theme.colors.bittersweet},f=["&:hover","&:focus-visible"],p=["&[aria-checked='true']","&[aria-current='page']"],g={...d,plugins:[m()(e=>{let{addVariant:t}=e;t("hocus",f),t("selected",p),t("shocus",[...f,...p])}),l()({themes:[{name:"base",selectors:[":root"],theme:{colors:{theme:{accent:d.theme.colors.cornflower,background:d.theme.colors.white,backgroundHighlight:d.theme.colors.bleach,extraLightText:d.theme.colors.gray,header:d.theme.colors.blackOut,lightText:d.theme.colors.emperor,text:d.theme.colors.mineShaft}}}},{name:"dark",mediaQuery:"@media (prefers-color-scheme: dark)",theme:{colors:{theme:{background:d.theme.colors.blackOut,backgroundHighlight:d.theme.colors.mineShaft,header:d.theme.colors.white,text:d.theme.colors.bleach,lightText:d.theme.colors.steam,extraLightText:d.theme.colors.greatFalls}}}},...Object.entries(x).map(e=>{let[t,r]=e;return{name:(0,o.A)(t),selectors:['[data-category="'.concat(t,'"]')],theme:{colors:{theme:{accent:r}}}}}),...Object.entries(b).map(e=>{let[t,r]=e;return{name:(0,o.A)(t),selectors:['[data-technology="'.concat(t,'"]')],theme:{colors:{theme:{accent:r}}}}})]})]}},7952:(e,t,r)=>{"use strict";function c(e){return null==e}r.d(t,{a:()=>c})}},e=>{var t=t=>e(e.s=t);e.O(0,[733,176,57,358],()=>t(2398)),_N_E=e.O()}]);