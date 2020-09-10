(this.webpackJsonppublic=this.webpackJsonppublic||[]).push([[0],{35:function(e,t,n){e.exports=n(63)},57:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(28),u=n.n(c),l=n(31),o=n(2);var i=function(e){var t=e.children;return r.a.createElement("header",null,r.a.createElement("img",{className:"img-logo",src:"./logo.png",alt:"logo"}),t)},s=n(1),m=Object(a.createContext)({status:null,setStatus:function(){}});function d(e){var t=e.initialStatus,n=void 0!==t&&t,c=e.className,u=e.children,l=Object(a.useState)(n),o=Object(s.a)(l,2),i=o[0],d=o[1];return r.a.createElement(m.Provider,{value:{status:i,setStatus:d,timestamp:Date.now()}},r.a.createElement("div",{className:c},u))}function f(e){var t=e.status,n=e.children,c=Object(a.useContext)(m);return t.includes(c.status)&&r.a.createElement(r.a.Fragment,null,n)}var p=n(12),E=n(34);function v(e){var t=e.className,n=e.children;return r.a.createElement("div",{className:t},n)}function b(e){var t=Object(p.a)({},e),n=t.caption,c=t.status,u=Object(E.a)(t,["caption","status"]),l=Object(a.useContext)(m),o=c||!l.status;return r.a.createElement("button",Object.assign({onClick:function(){return l.setStatus(o)}},u),n)}function h(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,t)}var g=n(7),j=n.n(g);function O(e){var t=e.students,n=e.notFound,c=e.formatAs;return!Array.isArray(t)||t.length<1?r.a.createElement("p",null,n):t.map((function(e){return r.a.createElement(a.Fragment,{key:e.uuid},c(e))}))}var y=function(e){var t=e.source,n=e.notFound,c=e.loading,u=e.timestamp,l=e.children,o=function(e){var t=e.source,n=e.timestamp,r=Object(a.useState)({loading:!0,students:null}),c=Object(s.a)(r,2),u=c[0],l=c[1];return Object(a.useEffect)((function(){var e;return j.a.get(t,{cancelToken:new g.CancelToken((function(t){return e=t}))}).then((function(e){var t=e.data;l({loading:!1,students:t})})).catch((function(e){})),function(){return e()}}),[t,n]),[u]}({source:t,timestamp:u}),i=Object(s.a)(o,1)[0];return r.a.createElement(r.a.Fragment,null,i.loading?c:r.a.createElement(O,{students:i.students,notFound:n,formatAs:l}))},N=new Date,C=N.getMonth()+1,F=N.getFullYear(),S=N.getDate(),A=[{id:"BirthMonth",title:"Cumplea\xf1os del Mes",content:{source:"/api/students?date_month_birth=".concat(C),notFound:"Nadie cumple a\xf1os este mes...",formatAs:function(e){var t=new Date(e.birth);return"El cumplea\xf1os de ".concat(e.fullname," es ").concat(t.getUTCDate()," /  ").concat(t.getUTCMonth()+1)}}},{id:"AnnivMonth",title:"Aniversarios del Mes",content:{source:"/api/students?date_month_anivs=".concat(C,"&date_year_anivs=").concat(F),notFound:"Nadie festeja su aniversario este mes...",formatAs:function(e){var t=new Date(e.enroll),n=12*(N.getFullYear()-t.getUTCFullYear())+N.getMonth()-t.getUTCMonth();return n%3===0&&n>0&&n<15?"".concat(e.fullname," celebra ").concat(n," meses en Kumon"):null}}},{id:"PaymentMonth",title:"Pagos del Mes",content:{source:"/api/students?compare_gt_fee=pay-current",notFound:"Nadie debe pagos de este mes...",formatAs:function(e){return"".concat(e.fullname," ha pagado $").concat(e["pay-current"]," / $").concat(e.fee)}}}],w=[{id:"BirthDay",content:{source:"/api/students?date_month_birth=".concat(C,"&date_dayOfMonth_birth=").concat(S),notFound:"Nadie cumple a\xf1os hoy...",formatAs:function(e){return"El cumplea\xf1os de ".concat(e.fullname," es hoy! Felicitalo(a)!")}}},{id:"AnnivDay",content:{source:"/api/students?date_month_anivs=".concat(C,"&date_year_anivs=").concat(F,"&date_dayOfMonth_anivs=").concat(S),notFound:"Nadie festeja su aniversario hoy...",formatAs:function(e){var t=new Date(e.enroll),n=12*(N.getFullYear()-t.getUTCFullYear())+N.getMonth()-t.getUTCMonth();return n%3===0&&n>0&&n<15?"El aniversario de ".concat(n," meses de ").concat(e.fullname," es hoy! Felicitalo(a)!"):null}}}];function T(){return r.a.createElement("div",{className:"notifications"},w.map((function(e){return r.a.createElement(y,{key:e.id,source:e.content.source,notFound:e.content.notFound},(function(t){var n=e.content.formatAs(t);return n?r.a.createElement("p",null,n):null}))})))}var k=function(){return r.a.createElement(d,{initialStatus:!1,className:"notification-panel"},r.a.createElement(v,{className:"notification-button"},r.a.createElement(b,{caption:"Ver"})),r.a.createElement(h,null,r.a.createElement(f,{status:[!0]},r.a.createElement(T,null)),r.a.createElement(f,{status:[!1]},null)))};var D=function(e){var t=e.className,n=e.title,a=e.subtitle;return e.children,r.a.createElement("div",{className:t},r.a.createElement("h2",null,n),r.a.createElement("h3",null,a))},x=r.a.createContext({onToggle:function(){},isActive:null});function M(e){var t=e.children,n=Object(a.useState)(!1),c=Object(s.a)(n,2),u=c[0],l=c[1];return r.a.createElement(x.Provider,{value:{onToggle:function(){return l(!u)},isActive:u}},r.a.createElement("section",{className:"accordion"},t))}var _=function(e){var t=e.title,n=e.children,c=Object(a.useContext)(x);return r.a.createElement("div",{className:"accordion-head",onClick:c.onToggle},r.a.createElement("span",{className:"accordion-title"},t),n)};var P=function(e){var t=e.className,n=e.children,c=Object(a.useContext)(x);return r.a.createElement("span",{className:"".concat(t||"accordion-icon"," ").concat(c.isActive?"active":"inactive")},n)};var U=function(e){var t=e.children,n=Object(a.useRef)(),c=Object(a.useContext)(x);return Object(a.useEffect)((function(){var e=new MutationObserver((function(){n.current.style.height=c.isActive?"".concat(n.current.scrollHeight,"px"):"0px"}));return e.observe(n.current,{childList:!0,subtree:!0}),function(){return e.disconnect()}}),[c.isActive]),Object(a.useLayoutEffect)((function(){n.current.style.height=c.isActive?"".concat(n.current.scrollHeight,"px"):"0px"})),r.a.createElement("div",{ref:n,className:"accordion-wrapper"},r.a.createElement("div",{className:"accordion-content"},t))};var I=function(){return A.map((function(e){return r.a.createElement(M,{key:e.id},r.a.createElement(_,{title:e.title},r.a.createElement(P,null,"+")),r.a.createElement(U,null,r.a.createElement(y,{source:e.content.source,notFound:e.content.notFound,loading:r.a.createElement("p",null,"Cargando...")},(function(t){var n=e.content.formatAs(t);return n?r.a.createElement("p",null,n):null}))))}))},Y=n(29),$=n(30),B=n(33),R=r.a.createContext({uuid:-1});function V(e){var t=e.children,n=new URLSearchParams(window.location.search).get("uuid")||-1;return r.a.createElement(R.Provider,{value:{uuid:n}},t)}function q(e,t){var n=Object(a.useState)(e.fields),r=Object(s.a)(n,2),c=r[0],u=r[1],l=Object(a.useContext)(R).uuid;return Object(a.useEffect)((function(){var e;return j.a.get("/api/students?uuid=".concat(l),{cancelToken:new g.CancelToken((function(t){return e=t}))}).then((function(e){if(!Array.isArray(e.data)||1!==e.data.length)throw new Error;var t=e.data[0];u((function(e){return Object.keys(e).reduce((function(n,a){return n[a]=e[a],n[a].defaultValue="date"===e[a].type?function(e){var t=new Date(e);return[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()].map((function(e){return String(e).padStart(2,"0")})).join("-")}(t[a]):String(t[a]),n}),Object.create(null))}))})).catch((function(e){})),function(){return e()}}),[l,t.submittedCount,t.errorCount]),[c]}var H=function(e,t){var n=Object(a.useState)({submitted:[],issued:0}),r=Object(s.a)(n,2),c=r[0],u=r[1],l=Object(a.useState)({error:null,issued:0}),o=Object(s.a)(l,2),i=o[0],m=o[1],d=function(e){var t=Object(a.useState)(e.fields);return[Object(s.a)(t,1)[0]]}(t),f=Object(s.a)(d,1)[0];return[c.submitted,i.error,f,function(t){t.preventDefault();var n=e.current,a=t.target;j.a.post("/api/students",n).then((function(t){u((function(t){return{submitted:[].concat(Object(B.a)(t.submitted),[{student:e.current,issuedAt:Date.now(),issuedToken:t.issued+1}]),issued:t.issued+1}})),a.reset(),a=null,e.current={}})).catch((function(e){return m((function(t){return{error:{failure:e,issuedAt:Date.now(),issuedToken:t.issued+1},issued:t.issued+1}}))}))}]};var L=function(e,t){var n=Object(a.useContext)(m),r=Object(a.useContext)(R).uuid,c=Object(a.useState)({update:null,issued:0}),u=Object(s.a)(c,1)[0],l=Object(a.useState)({error:null,issued:0}),o=Object(s.a)(l,2),i=o[0],d=o[1],f=q(t,{submittedCount:u.issued,errorCount:i.issued}),p=Object(s.a)(f,1)[0];return[u.update,i.error,p,function(a){a.preventDefault();var c=e.current,u=a.target;j.a.put("/api/students/update?uuid=".concat(r),c).then((function(a){u.reset(),t.reset(),u=null,e.current={},n.setStatus(0)})).catch((function(e){u=null,d((function(t){return{error:{failure:e,issuedAt:Date.now(),issuedToken:t.issued+1},issued:t.issued+1}}))}))}]},J=n(14);var K=function(e){return function(t){var n=t.fields,c=t.renderSubmitted,u=t.renderError,l=function(){var e=Object(a.useRef)({});return[e,function(t){Object.assign(e.current,Object(J.a)({},t.target.name,t.target.value))}]}(),o=Object(s.a)(l,2),i=o[0],m=o[1],d=e(i,n),f=Object(s.a)(d,4),p=f[0],E=f[1],v=f[2],b=f[3];return r.a.createElement("div",{className:"app-register"},r.a.createElement("form",{onSubmit:b},Object.keys(v).map((function(e){return r.a.createElement("label",{key:e},v[e].label,r.a.createElement("input",{type:v[e].type||"text",defaultValue:v[e].defaultValue||"",name:e,onInput:m,required:!0}))})),r.a.createElement("button",{type:"submit",className:"register-btn"},"Subir"),c&&c(p),u&&E&&u(E)))}},Q=K(H),z=K(L),G=function(){function e(t){Object(Y.a)(this,e),this.fields=t}return Object($.a)(e,[{key:"reset",value:function(){for(var e in this.fields)delete this.fields[e].defaultValue}},{key:"add",value:function(e){this.fields=Object(p.a)(Object(p.a)({},this.fields),{},{fields:e})}}]),e}();function W(e){var t=e.setQuery;return r.a.createElement("div",{className:"search-bar"},r.a.createElement("input",{type:"text",onChange:function(e){t(e.target.value||"$")}}))}function X(e){var t=e.query;return r.a.createElement("div",{className:"search-results"},r.a.createElement(y,{source:"/api/students?autocomplete_fullname=".concat(t),notFound:"Aqui se muestran los resultados encontrados..."},(function(e){return r.a.createElement("a",{className:"search-student-link",href:"/student?uuid=".concat(e.uuid)},r.a.createElement("div",{className:"search-student-info"},r.a.createElement("p",null,e.fullname),r.a.createElement("p",null,"Ingres\xf3: ",e.enroll.split("T")[0]),r.a.createElement("p",null,"Paga: $",e.fee,", Pag\xf3 este mes: $",e["pay-current"])))})))}var Z=function(){var e=Object(a.useState)("$"),t=Object(s.a)(e,2),n=t[0],c=t[1];return r.a.createElement("div",{className:"app-search"},r.a.createElement(W,{setQuery:c}),r.a.createElement(X,{query:n}))};function ee(e){var t=e.children,n=e.type;return r.a.createElement("div",{className:"card-".concat(n)},t)}function te(e){var t=e.children,n=e.type,c=e.duration,u=!(c>0),l=Object(a.useState)(u),o=Object(s.a)(l,2),i=o[0],m=o[1];return Object(a.useEffect)((function(){if(!i){var e=setTimeout((function(){return m(!0)}),1e3*c);return function(){clearTimeout(e)}}})),!i&&r.a.createElement(ee,{type:n},t)}var ne=new G({name:{label:"Nombre:"},lastname:{label:"Apellido:"},birth:{label:"Fecha de Nacimiento:",type:"date"},enroll:{label:"Fecha de Ingreso:",type:"date"},level:{label:"Nivel:"},fee:{label:"Cuota:"}}),ae=function(){return r.a.createElement(d,{initialStatus:0,className:"apps-student"},r.a.createElement(v,{className:"apps-choices"},r.a.createElement(b,{caption:"Registrar Alumno",status:1}),r.a.createElement(b,{caption:"Buscar Alumno",status:2})),r.a.createElement(h,null,r.a.createElement(f,{status:[1]},r.a.createElement(Q,{fields:ne,renderSubmitted:function(e){var t=Date.now();return e.map((function(e){var n=2.5-(t-e.issuedAt)/1e3;return n>0?r.a.createElement(te,{type:"success",duration:n,key:e.issuedToken},"Alumno fue registrado correctamente!"):null}))},renderError:function(e){var t=2.5-(Date.now()-e.issuedAt)/1e3;return t>0?r.a.createElement(te,{type:"error",duration:t,key:e.issuedToken},"Hubo un problema para registrar alumno!"):null}})),r.a.createElement(f,{status:[2]},r.a.createElement(Z,null))))};n(57);var re=function(){return r.a.createElement(r.a.Fragment,null," ",r.a.createElement(i,null,r.a.createElement(k,null)),r.a.createElement(r.a.Fragment,null," ",r.a.createElement(D,{className:"title-main",title:"Kumon",subtitle:"Paseo de la Cultura"}),r.a.createElement(I,null),r.a.createElement(ae,null)),r.a.createElement(r.a.Fragment,null," "))};function ce(e){var t=e.initialSource,n=e.filetype,c=e.renderFile,u=Object(a.useContext)(R).uuid,l=Object(a.useState)({src:t,timestamp:Date.now()}),o=Object(s.a)(l,2),i=o[0],m=o[1],d=Object(a.useRef)();return r.a.createElement(r.a.Fragment,null,c&&c(i.src,i.timestamp),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),fetch("/api/students/upload/".concat(n,"?uuid=").concat(u),{method:"POST",body:d.current}).then((function(e){return e.json()})).then((function(e){m({src:e.src,timestamp:Date.now()})}))}},r.a.createElement("input",{type:"file",onInput:function(e){d.current=e.target.files[0]}}),r.a.createElement("button",{type:"submit"}," Subir ")))}function ue(e){var t=e.initialSource;function n(e){e.target.src="./media/students/".concat("photo","/placeholder.jpg")}return r.a.createElement(ce,{initialSource:t,filetype:"photo",renderFile:function(e,t){return r.a.createElement("div",{className:"student-photo"},r.a.createElement("img",{className:"student-avatar",src:e?"/media/students/".concat(e,"?").concat(t):"/media/students/photo/placeholder.jpg?".concat(t),alt:"student-avatar",onError:n}))}})}function le(e){var t=e.initialSource;return r.a.createElement(ce,{initialSource:t,filetype:"report",renderFile:function(e,t){return r.a.createElement("div",{className:"student-download-report ".concat(e?"active":"inactive")},e?r.a.createElement("a",{className:"student-download-content",href:"/media/students/".concat(e),download:"reporte"},"Descargar reporte"):r.a.createElement("p",{className:"student-download-content"},"No has subido reportes"))}})}function oe(e){var t=e.caption,n=Object(a.useContext)(R).uuid;return r.a.createElement(d,{initialStatus:!1},r.a.createElement(v,null,r.a.createElement(b,{caption:t,status:!0})),r.a.createElement(h,null,r.a.createElement(f,{status:[!0]},r.a.createElement(b,{caption:"Cancelar",status:!1}),r.a.createElement("button",{onClick:function(){j.a.delete("/api/students/delete?uuid=".concat(n)).then((function(e){return window.location.href="/"})).catch((function(e){}))}},"Confirmar"))))}function ie(e){var t=e.caption,n=Object(a.useContext)(m);return r.a.createElement("button",{onClick:function(){return n.setStatus(1)}},t)}var se=function(){var e=Object(a.useContext)(R),t=Object(a.useContext)(m),n=function(e){return"".concat(e.getUTCDate()," / ").concat(e.getUTCMonth()+1," / ").concat(e.getUTCFullYear())};return r.a.createElement(y,{source:"/api/students?uuid=".concat(e.uuid),notFound:"No se encontro alumno...",loading:"Cargando...",timestamp:t.timestamp},(function(e){return r.a.createElement("div",{className:"student-data"},r.a.createElement(ue,{initialSource:e["photo-src"]}),r.a.createElement("div",{className:"student-info"},r.a.createElement("p",null,"Nombre: ",e.name),r.a.createElement("p",null,"Apellido: ",e.lastname),r.a.createElement("p",null,"Fecha de Nacimiento: ",n(new Date(e.birth))),r.a.createElement("p",null,"Fecha de Ingreso: ",n(new Date(e.enroll))),r.a.createElement("p",null,"Nivel: ",e.level),r.a.createElement("p",null,"Cuota: ",e.fee),r.a.createElement("p",null,"Pago de Mes Actual: ",e["pay-current"]),r.a.createElement("p",null,"Pago de Mes Anterior: ",e["pay-last"]),r.a.createElement(le,{initialSource:e["report-src"]}),r.a.createElement(oe,{caption:"Dar de Baja"}),r.a.createElement(ie,{caption:"Editar"})))}))};var me=new G({name:{label:"Nombre:"},lastname:{label:"Apellido:"},enroll:{label:"Fecha de Ingreso",type:"date"},birth:{label:"Fecha de Nacimiento",type:"date"},level:{label:"Nivel"},fee:{label:"Cuota"},"pay-current":{label:"Pago de Mes Actual"},"pay-last":{label:"Pago de Mes Anterior"}}),de=function(){return r.a.createElement(d,{initialStatus:0},r.a.createElement(h,null,r.a.createElement(f,{status:[0,1]},r.a.createElement(se,null)),r.a.createElement(f,{status:[1]},r.a.createElement(z,{fields:me,renderError:function(e){var t=2.5-(Date.now()-e.issuedAt)/1e3;return t>0?r.a.createElement(te,{type:"error",duration:t,key:e.issuedToken},"Hubo un problema para actualizar alumno!"):null}}))))};var fe=function(){return r.a.createElement(V,null,r.a.createElement(i,null),r.a.createElement(r.a.Fragment,null," ",r.a.createElement(de,null)))};var pe=function(){return r.a.createElement("h1",null," Not Found ")};var Ee=function(){return r.a.createElement(l.a,null,r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/"},r.a.createElement(re,null)),r.a.createElement(o.a,{exact:!0,path:"/student"},r.a.createElement(fe,null)),r.a.createElement(o.a,{path:"*"},r.a.createElement(pe,null))))};var ve=function(){return r.a.createElement(Ee,null)};u.a.render(r.a.createElement(ve,null),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.6aa6922c.chunk.js.map