"use strict";(self.webpackChunk_soomy_soomy_electronic_auctions_web_site=self.webpackChunk_soomy_soomy_electronic_auctions_web_site||[]).push([[957],{49335:function(n,t,e){var i=e(70885),r=e(72791),a=e(43504),o=e(5346),c=e(59434),l=e(8977),d=e(74569),s=e.n(d),u=e(80184);t.Z=function(n){var t,e,d,A,v,p,m,f,g,h,j,x,N,b,R,J,Z,D,M,Q,k,E,y,T,U,S,C,w=(0,r.useState)(0),L=(0,i.Z)(w,2),B=L[0],G=L[1];(0,r.useEffect)((function(){var t;s().get("/participations/getNumberOfParticipations/".concat(null===(t=n.product)||void 0===t?void 0:t._id)).then((function(n){return G(n.data)}))}),[n]);var V=(0,c.v9)((function(n){return n.participation})).userParticipationList;return(0,u.jsx)("div",{class:"card card-class ".concat("home"===n.variant?"home-card":"auction"===n.variant?"auction-card":"bookmark-card"),children:(0,u.jsxs)(a.rU,{to:"".concat("premium"===(null===(t=n.product)||void 0===t?void 0:t.roomCategory)?"/premiumProduct/"+(null===(e=n.product)||void 0===e?void 0:e._id.toString()):"/product/"+(null===n||void 0===n||null===(d=n.product)||void 0===d?void 0:d._id.toString())),children:[(0,u.jsxs)("div",{className:"date-container",children:[" ",(0,u.jsxs)("p",{children:[(0,u.jsx)("i",{className:"fi fi-rr-time-fast icon"})," Pr\xe9vue le"," ",(0,u.jsxs)("b",{className:"date",children:[(0,l.Z)(new Date(null===n||void 0===n||null===(A=n.product)||void 0===A?void 0:A.startDate),"dd")," ",(0,o.p)(new Date(null===n||void 0===n||null===(v=n.product)||void 0===v?void 0:v.startDate))]})," ","\xe0"," ",(0,u.jsxs)("b",{className:"time",children:[(0,l.Z)(new Date(null===n||void 0===n||null===(p=n.product)||void 0===p?void 0:p.startDate),"HH:mm:00")," "]})]})]}),(0,u.jsxs)("div",{className:"img-container",children:[(0,u.jsx)("img",{className:"brand-img",src:null===n||void 0===n||null===(m=n.product)||void 0===m||null===(f=m.product)||void 0===f||null===(g=f.brand)||void 0===g||null===(h=g.logo)||void 0===h?void 0:h.imageURL}),(0,u.jsx)("img",{src:null===n||void 0===n||null===(j=n.product)||void 0===j||null===(x=j.product)||void 0===x||null===(N=x.image)||void 0===N?void 0:N.imageURL,className:"img-produit",alt:"product"}),(0,u.jsx)("h3",{children:null===n||void 0===n||null===(b=n.product)||void 0===b||null===(R=b.product)||void 0===R?void 0:R.title})]}),(0,u.jsxs)("div",{class:"text-container pb-2",children:[(0,u.jsxs)("p",{children:[(0,u.jsx)("span",{className:"bold-price",children:null===n||void 0===n||null===(J=n.product)||void 0===J||null===(Z=J.product)||void 0===Z?void 0:Z.prix}),"DT",null!==n&&void 0!==n&&null!==(D=n.product)&&void 0!==D&&null!==(M=D.product)&&void 0!==M&&M.partner?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{className:"bold-price",children:"chez"}),(0,u.jsx)("img",{src:null===n||void 0===n||null===(Q=n.product)||void 0===Q||null===(k=Q.product)||void 0===k||null===(E=k.partner)||void 0===E||null===(y=E.image)||void 0===y?void 0:y.imageURL,alt:"partner",className:"partner-logo"})]}):null]}),(0,u.jsx)("label",{for:"participation",children:"Salle d'ench\xe8re remplie \xe0 :"}),(0,u.jsx)("div",{className:"progress",id:"participation",children:(0,u.jsxs)("div",{className:"progress-bar",role:"progressbar",style:{width:"".concat(Math.floor(B/(null===n||void 0===n||null===(T=n.product)||void 0===T?void 0:T.capacity)*100),"%"),ariaValuenow:"".concat(Math.floor(B/(null===n||void 0===n||null===(U=n.product)||void 0===U?void 0:U.capacity)*100)),ariaValuemin:"0",ariaValuemax:"100"},children:[Math.floor(B/(null===n||void 0===n||null===(S=n.product)||void 0===S?void 0:S.capacity)*100),"%"]})}),null!==V&&void 0!==V&&V.find((function(t){var e,i;return(null===(e=t.room)||void 0===e?void 0:e._id)===(null===(i=n.product)||void 0===i?void 0:i._id)}))?(0,u.jsx)("button",{children:(0,u.jsx)("p",{children:"Voir D\xe9tails"})}):(0,u.jsx)("button",{children:(0,u.jsxs)("p",{children:[" Participer \xe0 ",null===n||void 0===n||null===(C=n.product)||void 0===C?void 0:C.participationPrice," DT "]})})]})]})})}},5346:function(n,t,e){e.d(t,{d:function(){return i},p:function(){return r}});var i=function(n){switch(null===n||void 0===n?void 0:n.getMonth()){case 0:return"JAN";case 1:return"FEV";case 2:return"MAR";case 3:return"AVR";case 4:return"MAI";case 5:return"JUI";case 6:return"JUL";case 7:return"AOU";case 8:return"SEP";case 9:return"OCT";case 10:return"NOV";case 11:return"DEC";default:return"NAN"}},r=function(n){switch(null===n||void 0===n?void 0:n.getMonth()){case 0:return"Janvier";case 1:return"F\xe9vrier";case 2:return"Mars";case 3:return"Avril";case 4:return"Mai";case 5:return"Juin";case 6:return"Juillet";case 7:return"Aout";case 8:return"Septembre";case 9:return"Octobre";case 10:return"Novembre";case 11:return"D\xe9cembre";default:return"NAN"}}},17957:function(n,t,e){e.r(t);var i=e(70885),r=e(72791),a=e(82056),o=e(35054),c=e(74569),l=e.n(c),d=e(49335),s=e(16871),u=e(57496),A=e(59434),v=e(47022),p=e(24849),m=e(80184);t.default=function(){var n=(0,r.useState)(),t=(0,i.Z)(n,2),e=t[0],c=t[1],f=(0,r.useState)(),g=(0,i.Z)(f,2),h=g[0],j=g[1],x=(0,r.useState)(),N=(0,i.Z)(x,2),b=N[0],R=N[1],J=(0,r.useState)(!1),Z=(0,i.Z)(J,2),D=Z[0],M=Z[1],Q=(0,r.useState)(!1),k=(0,i.Z)(Q,2),E=k[0],y=k[1],T=(0,s.UO)().id,U=(0,A.I0)();return(0,r.useEffect)((function(){U((0,u.PR)())}),[]),(0,r.useEffect)((function(){T&&(M(!0),l().get("/categories/getCategoryByName/".concat(T)).then((function(n){var t;return j(n.data.name),R(n.data._id),l().get("/rooms/getAuctionsByCategory/".concat(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t._id))})).then((function(n){var t;0===(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.length)?y(!0):c(n.data),M(!1)})).catch((function(n){return y(!0)}),M(!1)))}),[T,b]),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("main",{className:"container pt-2 px-lg-0 pb-1",children:[(0,m.jsx)("section",{className:"page-title page-title-auction mb-4",children:h?(0,m.jsx)("h1",{children:h}):null}),D?(0,m.jsx)(v.Z,{fluid:!0,className:"d-flex justify-content-center align-items-center",children:(0,m.jsx)(p.Z,{animation:"border",className:"mx-auto color-pink my-6"})}):E?(0,m.jsxs)("div",{className:"card-etapes w-75 mt-5",children:[(0,m.jsx)("img",{src:o}),(0,m.jsx)("h2",{className:"my-2",children:"Pas d'ench\xe8res disponibles pour cette cat\xe9gorie !"})]}):(0,m.jsx)("section",{className:"mt-3 d-flex justify-content-start flex-wrap align-items-center w-100 mx-auto px-lg-1",children:null===e||void 0===e?void 0:e.map((function(n){return(0,m.jsx)(d.Z,{product:n,variant:"auction"},null===n||void 0===n?void 0:n._id)}))})]}),(0,m.jsx)(a.Z,{})]})}},24849:function(n,t,e){var i=e(1413),r=e(45987),a=e(81694),o=e.n(a),c=e(72791),l=e(10162),d=e(80184),s=["bsPrefix","variant","animation","size","as","className"],u=c.forwardRef((function(n,t){var e=n.bsPrefix,a=n.variant,c=n.animation,u=n.size,A=n.as,v=void 0===A?"div":A,p=n.className,m=(0,r.Z)(n,s);e=(0,l.vE)(e,"spinner");var f="".concat(e,"-").concat(c);return(0,d.jsx)(v,(0,i.Z)((0,i.Z)({ref:t},m),{},{className:o()(p,f,u&&"".concat(f,"-").concat(u),a&&"text-".concat(a))}))}));u.displayName="Spinner",t.Z=u},35054:function(n){n.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=957.91432527.chunk.js.map