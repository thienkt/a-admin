import{p as he,g as l,q as oe,s as Ce,v as J,x as _e,y as Ie,z as Ee,A as ne,f as R,B as Le,C as ke,D as Se,E as le,G as Ne,H as xe,I as Fe,J as we,K as Be,L as P,M as Te,N as Ae,O as Q,h as $,o as B,P as De,m as Pe,w as E,r as K,Q as O,R as W,S as Me,j as Z,c as $e,T as M,U as Re,W as Ue,i as r,V as ie,X as ee,Y as T,Z as G,$ as z,a0 as qe,a1 as je,a2 as He,a3 as Ke,a4 as Oe,F as We,a5 as ze,a6 as Ge,a7 as te,a8 as Xe,a9 as Ye,aa as Je,a as D,b as N,ab as Qe,d as ae}from"./CL9fQ8rX.js";import{u as Ze,a as et,b as tt,c as at,V as ue,d as st}from"./DGbJcgVN.js";import{u as rt,a as ot,e as nt,b as lt,f as it,c as ut,F as dt,r as ct}from"./DXwC1kLZ.js";import"./DlAUqK2U.js";const mt=a=>{const t=he(a);return{formRef:t,isValid:l(()=>{var e;return((e=t.value)==null?void 0:e.isValid)||!1}),immediate:l(()=>{var e;return((e=t.value)==null?void 0:e.immediate)||!1}),isLoading:l(()=>{var e;return((e=t.value)==null?void 0:e.isLoading)||!1}),isDirty:l(()=>{var e;return((e=t.value)==null?void 0:e.isDirty)||!1}),isTouched:l(()=>{var e;return((e=t.value)==null?void 0:e.isTouched)||!1}),fields:l(()=>{var e;return((e=t.value)==null?void 0:e.fields)??[]}),fieldsNamed:l(()=>{var e;return((e=t.value)==null?void 0:e.fieldsNamed)??[]}),fieldNames:l(()=>{var e;return((e=t.value)==null?void 0:e.fieldNames)??[]}),formData:l(()=>{var e;return((e=t.value)==null?void 0:e.formData)??{}}),errorMessages:l(()=>{var e;return((e=t.value)==null?void 0:e.errorMessages)||[]}),errorMessagesNamed:l(()=>{var e;return((e=t.value)==null?void 0:e.errorMessagesNamed)||{}}),validate:()=>{var e;return(e=t.value)==null?void 0:e.validate()},validateAsync:()=>{var e;return(e=t.value)==null?void 0:e.validateAsync()},reset:()=>{var e;return(e=t.value)==null?void 0:e.reset()},resetValidation:()=>{var e;return(e=t.value)==null?void 0:e.resetValidation()},focus:()=>{var e;return(e=t.value)==null?void 0:e.focus()},focusInvalidField:()=>{var e;return(e=t.value)==null?void 0:e.focusInvalidField()}}},se=a=>typeof a=="object"?a.listen:a,j=a=>typeof a=="object"?a.emit:a,de=a=>{const t=()=>a.map(j),e=i=>`on${i.charAt(0).toUpperCase()+i.slice(1)}`;return{createListeners:i=>a.reduce((c,n)=>({...c,[e(se(n))]:(...m)=>i(j(n),...m)}),{}),createVOnListeners:i=>a.reduce((c,n)=>({...c,[se(n)]:(...m)=>i(j(n),...m)}),{}),createEmits:t}},pt=(...a)=>(...t)=>a.forEach(e=>e(...t)),ft={autofocus:{type:Boolean,default:!1}},vt=(a,t)=>{const e=()=>{Ce(J(a.value))},o=()=>{_e(J(a.value))};return oe(()=>{t.autofocus&&e()}),{focus:e,blur:o}},gt=a=>{if(!Ie)return;const t=ne();if(!t)throw new Error("`useDeprecated` hook must be used only inside of setup function!");a.forEach(e=>{const o=e();typeof o=="string"&&Ee(`(${t.type.name} component) ${o}`)})},re=nt(ue),{createEmits:yt,createListeners:Vt}=de(["change","keyup","keypress","keydown","focus","blur","input"]),{createEmits:bt,createListeners:ht}=de(["click","click-prepend","click-append","click-prepend-inner","click-append-inner"]),Ct=R({name:"VaInput",__name:"VaInput",props:{...re,...tt,...ft,...ot,...et,...le,...Se,placeholder:{type:String,default:""},tabindex:{type:[String,Number],default:0},modelValue:{type:[Number,String,null],default:""},type:{type:String,default:"text"},inputClass:{type:String,default:""},pattern:{type:String},inputmode:{type:String,default:"text"},counter:{type:Boolean,default:!1},autocomplete:{type:String},ariaResetLabel:ke("$t:reset"),strictBindInputValue:{type:Boolean,default:!1}},emits:["update:modelValue",...rt,...Ze,...yt(),...bt(),...Le],setup(a,{expose:t,emit:e}){const o=a,d=e;gt([()=>o.type!=="textarea"||'Use VaTextarea component instead of VaInput with type="textarea"']);const i=Ne(),{valueComputed:c}=xe(o,d,"modelValue"),n=()=>F(()=>{c.value=o.clearValue,d("clear"),w()}),{focus:m,blur:C}=vt(i,o),L=Fe(),v=l(()=>{const p=["icon"];return Object.keys(L).filter(V=>!p.includes(V))}),{tp:b}=we(),{isValid:_,isTouched:f,isDirty:h,computedError:I,computedErrorMessages:k,listeners:{onBlur:x},validationAriaAttributes:s,isLoading:u,withoutValidation:F,resetValidation:w}=lt(o,d,{reset:n,focus:m,value:c}),{modelValue:y}=Be(o),{canBeCleared:A,clearIconProps:U}=at(o,y,i,I),X=Vt(d),ce={...X,onBlur:pt(x,X.onBlur)},Y=p=>{if(!o.strictBindInputValue)return;const V=i.value;if(!V)return;const S=V.selectionStart||0,q=V.selectionEnd||0;V.value!==p&&(V.value=String(p)),V.setSelectionRange(S,q)};P(c,p=>{Y(String(p))},{immediate:!0}),Te("input",()=>{Y(String(c.value))},i);const me=l(()=>o.disabled?-1:o.tabindex),pe=Ae(),fe=l(()=>({"aria-label":o.inputAriaLabel||o.label,"aria-labelledby":o.inputAriaLabelledby,"aria-required":o.requiredMark,tabindex:me.value,class:o.inputClass,"aria-disabled":o.disabled,"aria-readonly":o.readonly,...s.value})),ve=l(()=>({...fe.value,...Q(o,["type","disabled","readonly","placeholder","pattern","inputmode","name","autocomplete"]),...Q(pe,["minlength","minlength"])})),ge=l(()=>o.counter&&typeof c.value=="string"?c.value.length:void 0),ye=p=>{!p.target||!("tagName"in p.target)||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA"||m()},Ve=it(re),be=ht(d);return t({isValid:_,isDirty:h,isTouched:f,isLoading:u,computedError:I,computedErrorMessages:k,reset:n,focus:m,blur:C,value:c,withoutValidation:F,resetValidation:w}),(p,V)=>(B(),$(r(ue),M({...r(be),...r(Ve)},{class:["va-input",p.$attrs.class],style:p.$attrs.style,loading:p.$props.loading||r(u),error:r(I),"error-messages":r(k),"error-count":p.errorCount,"counter-value":ge.value,onClick:ye}),De({icon:E(S=>[r(A)?(B(),$(r(ie),M({key:0,role:"button","aria-label":r(b)(p.$props.ariaResetLabel)},r(U),{onClick:T(n,["stop"]),onKeydown:[ee(T(n,["stop"]),["enter"]),ee(T(n,["stop"]),["space"])]}),null,16,["aria-label","onKeydown"])):Z("",!0),K(p.$slots,"icon",O(W(S)))]),default:E(()=>[p.$slots.content?Z("",!0):Me((B(),$e("input",M({key:0,ref_key:"input",ref:i,class:"va-input__content__input"},{...ve.value,...ce},{"onUpdate:modelValue":V[0]||(V[0]=S=>Re(c)?c.value=S:null)}),null,16)),[[Ue,r(c)]])]),_:2},[Pe(v.value,S=>({name:S,fn:E(q=>[K(p.$slots,S,O(W(q)))])}))]),1040,["class","style","loading","error","error-messages","error-count","counter-value"]))}}),_t=G(Ct),It=a=>{const t=z(new Map);return{immediate:l(()=>a.immediate),fields:l(()=>[...t.value.values()]),forceHideErrors:l(()=>a.hideErrors),forceHideErrorMessages:l(()=>a.hideErrorMessages),forceHideLoading:l(()=>a.hideLoading),forceDirty:z(!1),registerField:(e,o)=>{t.value.set(e,o)},unregisterField:e=>{t.value.delete(e)}}},Et=a=>{const t=It(a);qe(dt,t);const{fields:e,forceDirty:o}=t,d=l(()=>e.value.map(s=>r(s.name)).filter(Boolean)),i=l(()=>e.value.reduce((s,u)=>(r(u.name)&&(s[r(u.name)]=u),s),{})),c=l(()=>e.value.reduce((s,u)=>(r(u.name)&&(s[r(u.name)]=r(u.value)),s),{})),n=l(()=>e.value.every(s=>r(s.isValid))),m=l(()=>e.value.some(s=>r(s.isLoading))),C=l(()=>e.value.map(s=>r(s.errorMessages)).flat()),L=l(()=>e.value.reduce((s,u)=>(r(u.name)&&(s[r(u.name)]=r(u.errorMessages)),s),{})),v=l({get(){return e.value.some(s=>r(s.isDirty))||o.value},set(s){o.value=s,e.value.forEach(u=>{u.isDirty=s})}}),b=l({get(){return e.value.some(s=>s.isTouched)},set(s){e.value.forEach(u=>{u.isTouched=s})}}),_=()=>(v.value=!0,e.value.reduce((s,u)=>u.validate()&&s,!0)),f=()=>(v.value=!0,Promise.all(e.value.map(s=>s.validateAsync())).then(s=>s.every(Boolean))),h=()=>{v.value=!1,e.value.forEach(s=>s.reset())},I=()=>{v.value=!1,e.value.forEach(s=>s.resetValidation())},k=()=>{var s;(s=e.value[0])==null||s.focus()},x=()=>{const s=e.value.find(u=>!u.isValid);s==null||s.focus()};return ut({name:je(a,"name"),isValid:n,isLoading:m,isDirty:v,isTouched:b,validate:_,validateAsync:f,reset:h,resetValidation:I,focus:k,errorMessages:C}),{immediate:l(()=>a.immediate),isDirty:v,isTouched:b,formData:c,fields:e,fieldsNamed:i,fieldNames:d,isValid:n,isLoading:m,errorMessages:C,errorMessagesNamed:L,validate:_,validateAsync:f,reset:h,resetValidation:I,focus:k,focusInvalidField:x}},g={stateful:!0},Lt={VaInput:g,VaSelect:g,VaCheckbox:g,VaRadio:g,VaDatePicker:g,VaTimePicker:g,VaColorPicker:g,VaSlider:g,VaSwitch:g,VaFileUpload:g,VaRating:g,VaDateInput:g,VaTimeInput:g},kt=R({name:"VaForm",__name:"VaForm",props:{...le,autofocus:{type:Boolean,default:!1},immediate:{type:Boolean,default:!1},tag:{type:String,default:"form"},trigger:{type:String,default:"blur"},modelValue:{type:Boolean,default:!0},hideErrors:{type:Boolean,default:!1},hideErrorMessages:{type:Boolean,default:!1},hideLoading:{type:Boolean,default:!1},stateful:{type:Boolean,default:!1},name:{type:String,default:void 0}},emits:["update:modelValue"],setup(a,{expose:t,emit:e}){const o=a,d=e,i=Et(o);P(i.isValid,y=>{d("update:modelValue",y)}),P(()=>o.autofocus,y=>{y&&i.focus()}),oe(()=>{o.autofocus&&i.focus()}),P(i.fields,y=>{y.length&&o.immediate&&i.validate()},{immediate:!0}),He(l(()=>o.stateful?Lt:{}));const{immediate:c,isDirty:n,isTouched:m,formData:C,fields:L,fieldsNamed:v,fieldNames:b,isValid:_,isLoading:f,errorMessages:h,errorMessagesNamed:I,validate:k,validateAsync:x,reset:s,resetValidation:u,focus:F,focusInvalidField:w}=i;return t({immediate:c,isDirty:n,formData:C,fields:L,fieldsNamed:v,fieldNames:b,isValid:_,isTouched:m,isLoading:f,errorMessages:h,errorMessagesNamed:I,validate:k,validateAsync:x,reset:s,resetValidation:u,focus:F,focusInvalidField:w}),(y,A)=>(B(),$(Ke(a.tag),M({class:"va-form",onSubmit:A[0]||(A[0]=U=>y.$attrs.action===void 0&&U.preventDefault())},y.$attrs),{default:E(()=>[K(y.$slots,"default",O(W({isValid:r(_),isDirty:r(n),isTouched:r(m),isLoading:r(f),errorMessages:r(h),errorMessagesNamed:r(I),formData:r(C),fields:r(L),fieldsNamed:r(v),fieldNames:r(b),validate:r(k),validateAsync:r(x),reset:r(s),resetValidation:r(u),focus:r(F),focusInvalidField:r(w)})))]),_:3},16))}}),St=G(kt),Nt=R({name:"VaValue",props:{defaultValue:{type:null,required:!1,default:!1}},setup(a,{slots:t}){const e=z(a.defaultValue),o=new Proxy(e,{get(d,i){return i==="value"?d.value:d[i]},set(d,i,c){return i==="value"&&(d.value=c),!0}});return()=>Oe(We,[ct(t.default,o)])}}),xt=G(Nt),Ft=()=>{const a=ne();return l(()=>{var t;return((t=ze())==null?void 0:t._context)||(a==null?void 0:a.appContext)})},wt=()=>{const a=Ft(),t=[],e=n=>{const m=Xe(n,a.value);return m&&t.push(m),m};return{init:n=>e(n),notify:e,close:n=>te(n),closeAll:(n=!1)=>Ge(n?void 0:a.value),closeAllCreatedInThisHook:()=>{t.forEach(n=>te(n))}}},H={email:a=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)||"Please enter a valid email address",required:a=>!!a||"This field is required"},Bt={class:"auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"},Tt={class:"flex justify-center mt-4"},At={class:"flex justify-center mt-2"},Rt=R({__name:"index",setup(a){const{validate:t}=mt("form"),{push:e}=Ye(),{init:o}=wt(),d=Je({email:"",password:"",keepLoggedIn:!1}),i=()=>{t()&&(o({message:"You've successfully logged in",color:"success"}),e({name:"dashboard"}))};return(c,n)=>{const m=_t,C=ie,L=xt,v=st,b=Qe,_=St;return B(),$(_,{ref:"form",class:"mb-10",onSubmit:T(i,["prevent"])},{default:E(()=>[n[5]||(n[5]=D("h1",{class:"font-semibold text-4xl mb-4"},"Log in",-1)),N(m,{modelValue:d.email,"onUpdate:modelValue":n[0]||(n[0]=f=>d.email=f),rules:[r(H).required,r(H).email],class:"mb-4",label:"Email",type:"email"},null,8,["modelValue","rules"]),N(L,{"default-value":!1},{default:E(f=>[N(m,{modelValue:d.password,"onUpdate:modelValue":n[1]||(n[1]=h=>d.password=h),rules:[r(H).required],type:f.value?"text":"password",class:"mb-4",label:"Password",onClickAppendInner:T(h=>f.value=!f.value,["stop"])},{appendInner:E(()=>[N(C,{name:f.value?"visibility_off":"visibility",class:"cursor-pointer",color:"secondary"},null,8,["name"])]),_:2},1032,["modelValue","rules","type","onClickAppendInner"])]),_:1}),D("div",Bt,[N(v,{modelValue:d.keepLoggedIn,"onUpdate:modelValue":n[2]||(n[2]=f=>d.keepLoggedIn=f),class:"mb-2 sm:mb-0",label:"Keep me signed in on this device"},null,8,["modelValue"])]),D("div",Tt,[N(b,{class:"w-full",onClick:i},{default:E(()=>n[3]||(n[3]=[ae(" Login")])),_:1})]),D("div",At,[N(b,{class:"w-full",color:"secondary",onClick:i},{default:E(()=>n[4]||(n[4]=[ae(" Login with Google")])),_:1})])]),_:1},512)}}});export{Rt as default};
