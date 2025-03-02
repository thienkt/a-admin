import{aU as C,b9 as B,aN as E,g as i,z as T,ba as A,$ as k,a0 as D,aY as L,aw as F,c as f,o as d,r as v,f as _,L as R,b as S,w as y,n as g,k as $,h as w,a as V,j as U,b3 as I,F as j,af as N,I as q,m as K,i as b,bb as P}from"./CL9fQ8rX.js";import{u as W}from"./D6u7GzAX.js";import{_ as G}from"./DlAUqK2U.js";const M=["xs","sm","md","lg","xl","smUp","mdUp","lgUp","smDown","mdDown","lgDown"],H=M.reduce((t,r)=>(t[r]=!1,t),{}),pe=()=>{const t=C(B,{}),r=W(),{globalConfig:e}=E(),o=i(()=>{const n=e.value.breakpoint;return n||T("useBreakpoint: breakpointConfig is not defined!"),n??{}}),a=i(()=>o.value.enabled?{width:void 0,height:void 0,current:void 0,thresholds:o.value.thresholds,...H}:{});return A(()=>r.value?t:a.value)},Y={top:[0,1,2],left:[0,3,6],right:[2,5,8],bottom:[6,7,8]},Z=["left","right","top","bottom"],J=t=>{const r=()=>[...Z].sort((o,a)=>(t[o].order??0)-(t[a].order??0)),e=(o,a,n)=>{a.forEach(s=>{o[s]=n})};return i(()=>{const o=r(),a=[".",".",".",".",".",".",".",".","."].map(()=>"content");return o.forEach(n=>{e(a,Y[n],n)}),['"'+a.slice(0,3).join(" ")+'"','"'+a.slice(3,6).join(" ")+'"','"'+a.slice(6,9).join(" ")+'"'].join(" ")})},Q={top:{type:Object,default:()=>({order:2})},right:{type:Object,default:()=>({order:1})},left:{type:Object,default:()=>({order:1})},bottom:{type:Object,default:()=>({order:2})}},O="VaLayout",X=t=>{const r=k({top:null,right:null,bottom:null,left:null}),e=i(()=>{const{top:a,right:n,bottom:s,left:l}=r.value,{top:u,right:m,bottom:c,left:p}=t;return{top:a&&!u.absolute?a.sizes.height:0,right:n&&!m.absolute?n.sizes.width:0,bottom:s&&!c.absolute?s.sizes.height:0,left:l&&!p.absolute?l.sizes.width:0}}),o=i(()=>({top:t.top.order||0,right:t.right.order||0,bottom:t.bottom.order||0,left:t.left.order||0}));return D(O,{items:r,paddings:e,orders:o}),{paddings:e,orders:o,items:r}},ee=(t,r)=>{const e=C(O,null);if(!e)throw new Error("VaLayoutChild must be used inside VaLayout");return L(()=>{r.value?e.items.value[t]={sizes:r.value}:e.items.value[t]=null}),F(()=>{e.items.value[t]=null}),{paddings:i(()=>Object.keys(e.paddings.value).reduce((o,a)=>(e.orders.value[a]>e.orders.value[t]&&(o[a]=e.paddings.value[a]),o),{}))}},te={},ae={class:"va-layout__absolute-area-wrapper"};function oe(t,r){return d(),f("div",ae,[v(t.$slots,"default")])}const re=G(te,[["render",oe]]),le=_({name:"VaLayoutSizeKeeper",__name:"VaResizeObserver",emits:{resize:t=>!0},setup(t,{emit:r}){const e=r,o=k();let a=null;return R(o,n=>{a&&a.disconnect(),a=new ResizeObserver(([s])=>{e("resize",s.contentRect)}),a.observe(n)}),(n,s)=>(d(),f("div",{class:"va-resize-observer",ref_key:"el",ref:o},[v(n.$slots,"default")],512))}}),z=_({name:"VaLayoutFixedWrapper",__name:"VaLayoutFixedWrapper",props:{area:{type:String,required:!0}},setup(t){const r=t,e=k(null),o=i(()=>r.area==="top"||r.area==="bottom"?"vertical":"horizontal"),a=l=>l?l+"px":"0px",n=i(()=>o.value==="vertical"?{width:`calc(100% - ${a(s.value.left)} - ${a(s.value.right)})`,[r.area]:0}:{height:`calc(100% - ${a(s.value.top)} - ${a(s.value.bottom)})`,[r.area]:0}),{paddings:s}=ee(r.area,e);return i(()=>Object.keys(s.value).reduce((l,u)=>u===r.area?l:{...l,[u]:`${s.value[u]}px`},{})),(l,u)=>(d(),f("div",{class:"va-layout-fixed-wrapper",style:g([[{height:e.value&&o.value==="vertical"?e.value.height+"px":"auto",width:e.value&&o.value==="horizontal"?e.value.width+"px":"auto"}],`--va-styles-width: ${String(n.value.width)};--va-styles-height: ${String(n.value.height)}`])},[S(le,{class:$(["va-layout-fixed-wrapper__content",`va-layout-fixed-wrapper__content--${t.area}`]),style:g(e.value?{}:{position:"relative"}),onResize:u[0]||(u[0]=m=>e.value=m)},{default:y(()=>[v(l.$slots,"default")]),_:3},8,["class","style"])],4))}}),se=_({name:"VaLayoutArea",__name:"VaLayoutArea",props:{area:{type:String,required:!0},config:{type:Object,required:!0}},emits:["overlay-click"],setup(t,{emit:r}){const e=t,o=i(()=>e.config.absolute||!1),a=i(()=>e.config.fixed||!1),n=i(()=>e.config.overlay||!1),s=i(()=>(e.config.order||0)+1);return(l,u)=>(d(),f(j,null,[o.value?(d(),w(re,{key:0,style:g(`--va-props-area: ${String(l.$props.area)};--va-z-index: ${String(s.value)};--va-z-index-1: ${String(s.value-1)}`)},{default:y(()=>[V("div",{class:$(`va-layout-area va-layout__area va-layout__area--${t.area}`)},[a.value?(d(),w(z,{key:0,area:t.area},{default:y(()=>[v(l.$slots,"default")]),_:3},8,["area"])):v(l.$slots,"default",{key:1})],2)]),_:3},8,["style"])):(d(),f("div",{key:1,class:$(`va-layout-area va-layout__area va-layout__area--${t.area}`),style:g(`--va-props-area: ${String(l.$props.area)};--va-z-index: ${String(s.value)};--va-z-index-1: ${String(s.value-1)}`)},[a.value?(d(),w(z,{key:0,area:t.area},{default:y(()=>[v(l.$slots,"default")]),_:3},8,["area"])):v(l.$slots,"default",{key:1})],6)),S(I,{style:g(`--va-props-area: ${String(l.$props.area)};--va-z-index: ${String(s.value)};--va-z-index-1: ${String(s.value-1)}`)},{default:y(()=>[n.value?(d(),f("div",{key:0,class:$(["va-layout-area__overlay",{"va-layout-area__overlay--fixed":a.value}]),onClick:u[0]||(u[0]=m=>l.$emit("overlay-click"))},null,2)):U("",!0)]),_:1},8,["style"])],64))}}),ne={class:"va-layout__area va-layout__area--content"},x=["top","left","right","bottom"],ie=_({name:"VaLayout",__name:"VaLayout",props:{...Q,allowBodyScrollOnOverlay:{type:Boolean,default:!1}},emits:["top-overlay-click","left-overlay-click","right-overlay-click","bottom-overlay-click"],setup(t,{emit:r}){const e=t,{paddings:o}=X(e),a=i(()=>!e.allowBodyScrollOnOverlay&&x.some(c=>{var p;return(p=e[c])==null?void 0:p.overlay})),n=N();L(()=>{var c;const p=(c=n.value)==null?void 0:c.body;p&&(a.value?p.style.overflow="hidden":p.style.overflow="")});const s=J(e),l=q(),u=i(()=>[l.top?"min-content":"0fr","1fr",l.bottom?"min-content":"0fr"].filter(Boolean).join(" ")),m=i(()=>[l.left?"min-content":"0fr","1fr",l.right?"min-content":"0fr"].filter(Boolean).join(" "));return(c,p)=>(d(),f("div",{class:"va-layout",style:g(`--va-horizontal-template: ${String(m.value)};--va-vertical-template: ${String(u.value)};--va-template-area: ${String(b(s))};--va-paddings-top-px: ${b(o).top+"px"};--va-paddings-bottom-px: ${b(o).bottom+"px"};--va-paddings-left-px: ${b(o).left+"px"};--va-paddings-right-px: ${b(o).right+"px"}`)},[(d(),f(j,null,K(x,h=>S(se,{key:h,area:h,config:c.$props[h]||{},onOverlayClick:ue=>c.$emit(`${h}-overlay-click`)},{default:y(()=>[v(c.$slots,h)]),_:2},1032,["area","config","onOverlayClick"])),64)),V("div",ne,[v(c.$slots,"default",{},()=>[v(c.$slots,"content")])])],4))}}),fe=P(ie);export{fe as V,pe as u};
