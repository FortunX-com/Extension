"use strict";(self.webpackChunkthanx_dashboard=self.webpackChunkthanx_dashboard||[]).push([[599],{2599:(W,f,i)=>{i.r(f),i.d(f,{ContactModule:()=>X});var m=i(9808),w=i(6816),h=i(1083),t=i(5e3),u=i(655),v=i(4987),d=i(2271),y=i(284),b=i(5089),P=i(3306),I=i(8489),C=i(5245);function Q(n,o){if(1&n&&(t.TgZ(0,"view-column")(1,"view-row",3)(2,"mat-icon",4),t._uU(3),t.qZA(),t._UZ(4,"view-delimiter",5),t.TgZ(5,"strong"),t._uU(6),t.qZA()(),t.TgZ(7,"div"),t._uU(8),t.qZA()()),2&n){const e=o.$implicit,a=o.index,p=t.oxw();t.Udp("margin-bottom",a!==p.contactItems.length-1?"1.5em":void 0),t.xp6(3),t.Oqu(e.icon),t.xp6(1),t.Q6J("width","0.5em"),t.xp6(2),t.Oqu(e.label),t.xp6(2),t.Oqu(e.value)}}let S=(()=>{class n{constructor(){this.title="Contact Us"}get enumTitle(){return d.s}ngOnInit(){this.prepareStaticData()}prepareStaticData(){this.description="\n            Let's talk business or just have a coffee <br/>\n            We would love to hear from you!\n        ",this.populateDummyContactItems()}populateDummyContactItems(){this.contactItems=this.contactItems?this.contactItems:[{icon:"pin_drop",label:"Address",value:"M. Hrushevskoho str., 12/2 Kyiv, Ukraine, 01008"},{icon:"call",label:"Phone",value:"(380 44) 200 45 25"},{icon:"mail",label:"Email",value:"example@gmail.com"}]}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["view-contact-info"]],inputs:{contactItems:"contactItems",title:"title",description:"description"},decls:3,vars:4,consts:[["id","title",3,"title","titleMode"],["id","description",3,"content"],[3,"margin-bottom",4,"ngFor","ngForOf"],[1,"label-wrapper"],[1,"icon"],[3,"width"]],template:function(e,a){1&e&&(t._UZ(0,"view-title",0)(1,"hub-inner-html",1),t.YNc(2,Q,9,6,"view-column",2)),2&e&&(t.Q6J("title",a.title)("titleMode",a.enumTitle.H1),t.xp6(1),t.Q6J("content",a.description),t.xp6(1),t.Q6J("ngForOf",a.contactItems))},dependencies:[m.sg,y.e,b.s,d.Q,P.O,I.L,C.Hw],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column}#title[_ngcontent-%COMP%]{font-size:2.5em}#description[_ngcontent-%COMP%]{display:block;margin:0 0 2em;padding:0}.label-wrapper[_ngcontent-%COMP%]{margin-bottom:.5em}.label-wrapper[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-top:2px;color:#ff7e1d}@media all and (max-width: 480px){#title[_ngcontent-%COMP%]{font-size:1.8em}}@media all and (max-width: 768px){#title[_ngcontent-%COMP%]{font-size:1.8em}}"]}),n})();var r=i(3075),x=i(5188),l=i(7725),g=i(8188),O=i(3372);let s=class{constructor(o,e){this._httpApiService=o,this._auth=e}submitQuestion(o){const e={subject:o.subject,email:o.email,message:o.message},a=this._auth.isLogin()?"/tickets":"/tickets/anon";return this._httpApiService.callApiService(a,g.fn.POST,e)}};s.\u0275fac=function(o){return new(o||s)(t.LFG(g.OG),t.LFG(O.g))},s.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac}),s=(0,u.gn)([(0,v.c)({checkProperties:!0}),(0,u.w6)("design:paramtypes",[g.OG,O.g])],s);var F=i(7261),T=i(1542),J=i(9206),B=i(2434),A=i(7795);const M=function(n){return{$implicit:n}};function Z(n,o){if(1&n&&t.GkF(0,9),2&n){const e=t.oxw().$implicit,a=t.MAs(6);t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(2,M,e))}}function U(n,o){if(1&n&&t.GkF(0,9),2&n){const e=t.oxw().$implicit,a=t.MAs(6);t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(2,M,e))}}function N(n,o){if(1&n&&(t.TgZ(0,"textarea",10),t._uU(1,"                "),t.qZA()),2&n){const e=t.oxw().$implicit;t.Q6J("formControlName",e.name)("placeholder",e.placeholder)}}function _(n,o){if(1&n&&t._UZ(0,"input",11),2&n){const e=o.$implicit;t.Q6J("type",e.type)("formControlName",e.name)("placeholder",e.placeholder)}}function L(n,o){if(1&n&&(t.TgZ(0,"view-form-input",4),t.ynx(1,5),t.YNc(2,Z,1,4,"ng-container",6),t.YNc(3,U,1,4,"ng-container",6),t.YNc(4,N,2,2,"textarea",7),t.BQk(),t.YNc(5,_,1,3,"ng-template",null,8,t.W1O),t.qZA()),2&n){const e=o.$implicit,a=t.oxw();t.Q6J("formCtrlName",e.name)("icon",e.icon)("title",e.title)("options",a.formInputOptions[e.type]),t.xp6(1),t.Q6J("ngSwitch",e.type),t.xp6(1),t.Q6J("ngSwitchCase","text"),t.xp6(1),t.Q6J("ngSwitchCase","email"),t.xp6(1),t.Q6J("ngSwitchCase","textarea")}}let z=(()=>{class n{constructor(e,a,p){this.formBuilder=e,this._apiService=a,this._snackBar=p,this.submitBtnLoading=!1}ngOnInit(){this.prepareStaticData(),this.buildQuestionForm()}buildQuestionForm(){const e={};this.fields.forEach(a=>{e[a.name]=new r.NI(a.value||"",(0,x.r)(a.validators),(0,x.tt)(a.asyncValidators))}),this.form=this.formBuilder.group(e)}onFormSubmit(e){e?this.sendQuestion():this._snackBar.open("Please, complete the form","OK",{duration:5e3})}sendQuestion(){this.submitBtnLoading=!0,this._apiService.submitQuestion({subject:this.getQuestionFormFieldVal("subject"),email:this.getQuestionFormFieldVal("email"),message:this.getQuestionFormFieldVal("message")}).subscribe(e=>{this.submitBtnLoading=!1,e&&this._snackBar.open("Successfully sent","OK",{duration:2e3})})}getQuestionFormFieldVal(e){return this.form.get(e).value}prepareStaticData(){this.prepareOptions(),this.prepareQuestionFormFields()}prepareOptions(){const e={card:{border:"1px solid #ccc",bgColor:"#fff",borderRadius:l.borderRadiusMedium,boxShadow:"0 2px 8px #eee"}};this.formInputOptions={text:e,email:e,textarea:{card:{border:"1px solid #ccc",bgColor:"#fff",borderRadius:l.borderRadiusMedium,boxShadow:"0 2px 8px #eee"}}},this.formOptions={submitBtnColor:{darkColor:l.colorPrimary,lightColor:l.colorPrimary}}}prepareQuestionFormFields(){this.fields=[{type:"text",name:"subject",title:"SUBJECT",placeholder:"Ex. Need help",icon:"person",validators:[{name:"required"},{name:"minlength",value:10},{name:"maxlength",value:250}]},{type:"email",name:"email",title:"EMAIL ADDRESS",placeholder:"example@gmail.com",icon:"mail",validators:[{name:"required"},{name:"email"}]},{type:"textarea",name:"message",title:"MESSAGE",placeholder:"Ex. How can I register your service?",icon:"chat",validators:[{name:"required"},{name:"minlength",value:3},{name:"maxlength",value:1500}]}]}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.qu),t.Y36(s),t.Y36(F.ux))},n.\u0275cmp=t.Xpm({type:n,selectors:[["view-contact-question"]],features:[t._Bn([s])],decls:4,vars:6,consts:[["id","main"],["id","title",3,"title"],["id","form",3,"formGroup","options","submitBtnText","submitBtnLoading","outputOnSubmit"],[3,"formCtrlName","icon","title","options",4,"ngFor","ngForOf"],[3,"formCtrlName","icon","title","options"],[3,"ngSwitch"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngSwitchCase"],["class","message-textarea","directiveViewFormInput","",3,"formControlName","placeholder",4,"ngSwitchCase"],["inputItemTemp",""],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["directiveViewFormInput","",1,"message-textarea",3,"formControlName","placeholder"],["directiveViewFormInput","",3,"type","formControlName","placeholder"]],template:function(e,a){1&e&&(t.TgZ(0,"view-card",0),t._UZ(1,"view-title",1),t.TgZ(2,"view-form",2),t.NdJ("outputOnSubmit",function(k){return a.onFormSubmit(k)}),t.YNc(3,L,7,8,"view-form-input",3),t.qZA()()),2&e&&(t.xp6(1),t.Q6J("title","Leave us message"),t.xp6(1),t.Q6J("formGroup",a.form)("options",a.formOptions)("submitBtnText","Submit")("submitBtnLoading",a.submitBtnLoading),t.xp6(1),t.Q6J("ngForOf",a.fields))},dependencies:[m.sg,m.tP,m.RF,m.n9,T.y,d.Q,J.I,B.E,A.d,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:["[_nghost-%COMP%]{display:block}#main[_ngcontent-%COMP%]{display:flex;flex-direction:column;box-shadow:0 0 9.5px .5px #0000000d,0 5px 50px #00000014;padding:2em}#main[_ngcontent-%COMP%]   #title[_ngcontent-%COMP%]{text-align:center;font-size:1.4em;margin-bottom:1.5em}#main[_ngcontent-%COMP%]   #form[_ngcontent-%COMP%]{width:100%}#main[_ngcontent-%COMP%]   .message-textarea[_ngcontent-%COMP%]{resize:vertical}"]}),n})(),c=class{constructor(){this.title="Contact Us"}ngOnInit(){this.prepareStaticData()}prepareStaticData(){this.prepareOptions()}prepareOptions(){this.options=Object.assign({background:"./assets/images/valencia-map.jpg"},this.options||{})}};c.\u0275fac=function(o){return new(o||c)},c.\u0275cmp=t.Xpm({type:c,selectors:[["view-contact"]],inputs:{options:"options",contactItems:"contactItems",title:"title",description:"description"},decls:5,vars:9,consts:[["id","background"],["id","main"],["id","info",3,"title","description","contactItems"],["id","delimiter"],["id","ask-question"]],template:function(o,e){1&o&&(t._UZ(0,"div",0),t.TgZ(1,"div",1),t._UZ(2,"view-contact-info",2)(3,"span",3)(4,"view-contact-question",4),t.qZA()),2&o&&(t.Udp("background",e.options.background.includes(".")?"url("+e.options.background+")":e.options.background)("background-repeat","no-repeat")("background-size","cover"),t.xp6(2),t.Q6J("title",e.title)("description",e.description)("contactItems",e.contactItems))},dependencies:[S,z],styles:["[_nghost-%COMP%]{display:block;width:100%;height:100%}#background[_ngcontent-%COMP%]{position:absolute;left:0;top:0;z-index:-1;width:100%;height:100%;opacity:.3}#main[_ngcontent-%COMP%]{display:flex;width:100%;height:100%;padding:5em}#main[_ngcontent-%COMP%]   #info[_ngcontent-%COMP%]{flex:1}#main[_ngcontent-%COMP%]   #delimiter[_ngcontent-%COMP%]{width:5em}#main[_ngcontent-%COMP%]   #ask-question[_ngcontent-%COMP%]{flex:1}@media all and (max-width: 480px){#main[_ngcontent-%COMP%]{flex-direction:column;padding:2em}#main[_ngcontent-%COMP%]   #info[_ngcontent-%COMP%]{margin:0 1em}#main[_ngcontent-%COMP%]   #delimiter[_ngcontent-%COMP%]{height:3em}}@media all and (max-width: 768px){#main[_ngcontent-%COMP%]{flex-direction:column;padding:2em}#main[_ngcontent-%COMP%]   #info[_ngcontent-%COMP%]{margin:0 1em}#main[_ngcontent-%COMP%]   #delimiter[_ngcontent-%COMP%]{height:3em}}"]}),c=(0,u.gn)([(0,v.c)({checkProperties:!0})],c);const j=[{path:"",component:(()=>{class n{ngOnInit(){this.prepareStaticData()}prepareStaticData(){this.prepareContactItems()}prepareContactItems(){}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["thanx-contact"]],decls:1,vars:1,consts:[[3,"contactItems"]],template:function(e,a){1&e&&t._UZ(0,"view-contact",0),2&e&&t.Q6J("contactItems",a.contactItems)},dependencies:[c]}),n})()}];let D=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[h.Bz.forChild(j),h.Bz]}),n})();var E=i(4697),G=i(4528),R=i(6321),V=i(2424),Y=i(3206),H=i(8857),$=i(4395);let K=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[m.ez,E.R,G.B,R.r,V.O,Y.S,H.d,C.Ps,$.J,r.UX]}),n})(),X=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[m.ez,w.m,D,K]}),n})()}}]);