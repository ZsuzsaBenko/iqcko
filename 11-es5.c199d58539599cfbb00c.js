function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{GU7q:function(e,t,n){"use strict";n.r(t),n.d(t,"AdminModule",(function(){return B}));var i,o=n("tyNb"),c=n("lGQG"),a=n("fXoL"),r=((i=function(){function e(t){_classCallCheck(this,e),this.router=t}return _createClass(e,[{key:"canActivate",value:function(e,t){var n;return(n=null!=localStorage.getItem("token")&&c.a.isAdmin())||this.router.navigate([""]).then(),n}}]),e}()).\u0275fac=function(e){return new(e||i)(a.ac(o.c))},i.\u0275prov=a.Jb({token:i,factory:i.\u0275fac,providedIn:"root"}),i),l=n("Cd6q"),s=n("yKSu"),u=n("oVMc"),p=n("ofXK"),b=n("hVay");function d(e,t){if(1&e){var n=a.Tb();a.Sb(0,"div",5),a.Sb(1,"app-puzzle-item",6),a.ec("puzzleDeleted",(function(e){return a.uc(n),a.gc().refreshPuzzles(e)})),a.Rb(),a.Rb()}if(2&e){var i=t.$implicit;a.Ab(1),a.mc("puzzle",i)}}var z,g=((z=function(){function e(t){_classCallCheck(this,e),this.puzzleService=t}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.puzzleService.getAllPuzzles().subscribe((function(t){e.puzzles=t}))}},{key:"refreshPuzzles",value:function(e){this.puzzles=this.puzzles.filter((function(t){return t!==e}))}},{key:"onSort",value:function(e){this.puzzles=e}}]),e}()).\u0275fac=function(e){return new(e||z)(a.Nb(l.a))},z.\u0275cmp=a.Hb({type:z,selectors:[["app-admin-puzzles"]],decls:8,vars:2,consts:[[1,"container-fluid","admin-container"],[1,"row"],[1,"col-12","col-sm-8","offset-sm-2","puzzles-container"],[3,"category","puzzlesSorted"],["class","puzzleDiv",4,"ngFor","ngForOf"],[1,"puzzleDiv"],[3,"puzzle","puzzleDeleted"]],template:function(e,t){1&e&&(a.Ob(0,"app-navbar"),a.Sb(1,"div",0),a.Sb(2,"div",1),a.Sb(3,"div",2),a.Sb(4,"h1"),a.Dc(5,"Rejtv\xe9nyek"),a.Rb(),a.Sb(6,"app-puzzle-sort",3),a.ec("puzzlesSorted",(function(e){return t.onSort(e)})),a.Rb(),a.Bc(7,d,2,1,"div",4),a.Rb(),a.Rb(),a.Rb()),2&e&&(a.Ab(6),a.mc("category",null),a.Ab(1),a.mc("ngForOf",t.puzzles))},directives:[s.a,u.a,p.k,b.a],styles:[".admin-container[_ngcontent-%COMP%]{margin-top:50px;height:calc(100% - 50px);padding:0}.puzzles-container[_ngcontent-%COMP%]{margin:50px auto;padding:25px;border-radius:10px;background-color:#333}h1[_ngcontent-%COMP%]{text-align:center;margin:30px auto 50px;color:#00b300}.puzzleDiv[_ngcontent-%COMP%]:first-child{margin-top:50px}@media only screen and (max-width:700px){.puzzleDiv[_ngcontent-%COMP%]   .modification[_ngcontent-%COMP%]{width:80px;height:50px;margin:0 auto;position:static}.modification[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:20px}}"]}),z),m=n("XPT/"),f=n("IBXX"),h=n("wHSu"),v=n("6NWb"),C=function(e){return["/admin/members/edit",e]};function M(e,t){if(1&e){var n=a.Tb();a.Sb(0,"div",4),a.Sb(1,"h3"),a.Dc(2),a.Rb(),a.Sb(3,"p"),a.Sb(4,"span"),a.Dc(5,"Email: "),a.Rb(),a.Dc(6),a.Rb(),a.Sb(7,"p"),a.Sb(8,"span"),a.Dc(9,"Regisztr\xe1ci\xf3: "),a.Rb(),a.Dc(10),a.hc(11,"date"),a.Rb(),a.Sb(12,"p"),a.Sb(13,"span"),a.Dc(14,"Pontsz\xe1m: "),a.Rb(),a.Dc(15),a.Rb(),a.Sb(16,"div",5),a.Sb(17,"fa-icon",6),a.ec("click",(function(){a.uc(n);var e=t.$implicit;return a.gc().deleteMember(e.id)})),a.Rb(),a.Sb(18,"a",7),a.Ob(19,"fa-icon",8),a.Rb(),a.Rb(),a.Rb()}if(2&e){var i=t.$implicit,o=a.gc();a.Ab(2),a.Ec(i.username),a.Ab(4),a.Ec(i.email),a.Ab(4),a.Fc(" ",a.jc(11,8,i.registration,"yyyy. MM. dd."),""),a.Ab(5),a.Ec(i.score),a.Ab(2),a.mc("icon",o.faTrash),a.Ab(1),a.mc("routerLink",a.pc(11,C,i.id))("state",i),a.Ab(1),a.mc("icon",o.faEdit)}}var P,x=((P=function(){function e(t){_classCallCheck(this,e),this.memberService=t,this.faTrash=f.faTrash,this.faEdit=h.a}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.memberService.getAllMembers().subscribe((function(t){e.members=t}))}},{key:"deleteMember",value:function(e){confirm("Biztosan t\xf6r\xf6lni akarod ezt a felhaszn\xe1l\xf3t?")&&(this.memberService.deleteMember(e).subscribe(),this.members=this.members.filter((function(t){return t.id!==e})))}}]),e}()).\u0275fac=function(e){return new(e||P)(a.Nb(m.a))},P.\u0275cmp=a.Hb({type:P,selectors:[["app-admin-members"]],decls:7,vars:1,consts:[[1,"container-fluid","admin-container"],[1,"row"],[1,"col-12","col-sm-8","offset-sm-2","members-container"],["class","memberDiv",4,"ngFor","ngForOf"],[1,"memberDiv"],[1,"modification"],[1,"fas",3,"icon","click"],[3,"routerLink","state"],[1,"fas",3,"icon"]],template:function(e,t){1&e&&(a.Ob(0,"app-navbar"),a.Sb(1,"div",0),a.Sb(2,"div",1),a.Sb(3,"div",2),a.Sb(4,"h1"),a.Dc(5,"Felhaszn\xe1l\xf3k"),a.Rb(),a.Bc(6,M,20,13,"div",3),a.Rb(),a.Rb(),a.Rb()),2&e&&(a.Ab(6),a.mc("ngForOf",t.members))},directives:[s.a,p.k,v.a,o.e],pipes:[p.d],styles:[".admin-container[_ngcontent-%COMP%]{margin-top:50px;height:calc(100% - 50px);padding:0}.members-container[_ngcontent-%COMP%]{margin:50px auto;padding:25px;border-radius:10px;background-color:#333}h1[_ngcontent-%COMP%]{text-align:center;margin:30px auto;color:#00b300}.memberDiv[_ngcontent-%COMP%]{border-radius:10px;background-color:#444;border:2px solid #00b300;padding:15px;margin:20px;color:#f0fff0;position:relative}.memberDiv[_ngcontent-%COMP%]:first-child{margin-top:50px}.memberDiv[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding-top:15px;padding-bottom:20px;color:#f0fff0}.memberDiv[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:700;color:#00b300}.memberDiv[_ngcontent-%COMP%]   .modification[_ngcontent-%COMP%]{display:flex;width:120px;height:100%;position:absolute;top:0;right:0;align-items:center;justify-content:center}.fas[_ngcontent-%COMP%]{font-size:30px;color:#00b300;vertical-align:middle;transition:color 1s}.fas[_ngcontent-%COMP%]:hover{cursor:pointer;color:#f0fff0}.modification[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:10px}@media only screen and (max-width:700px){.memberDiv[_ngcontent-%COMP%]   .modification[_ngcontent-%COMP%]{width:80px;height:50px;margin:0 auto;position:static}.modification[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:20px}}"]}),P),S=n("28vI"),_=n("YxAp"),O=n("3Pt+");function y(e,t){1&e&&(a.Sb(0,"label",19),a.Dc(1,"Feladv\xe1ny:"),a.Rb())}function R(e,t){if(1&e){var n=a.Tb();a.Sb(0,"textarea",20),a.ec("ngModelChange",(function(e){return a.uc(n),a.gc().puzzle.puzzleItem=e})),a.Dc(1,"        "),a.Rb()}if(2&e){var i=a.gc();a.mc("ngModel",i.puzzle.puzzleItem)("disabled",i.isCipher)}}function k(e,t){if(1&e&&a.Ob(0,"img",21),2&e){var n=a.gc();a.oc("src","https://firebasestorage.googleapis.com/v0/b/puzzles-a6dd7.appspot.com/o/",n.puzzle.puzzleItem,"",a.wc)}}var w,D,A,I=((w=function(){function e(t,n,i){_classCallCheck(this,e),this.puzzleService=t,this.activatedRoute=n,this.router=i,this.puzzle=new S.a}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.puzzleService.getPuzzleByIdForAdmin(this.activatedRoute.snapshot.params.id).subscribe((function(t){e.puzzle=t,e.isPicturePuzzle=_.a.PICTURE_PUZZLE===t.category,e.isCipher=_.a.CIPHER===t.category}))}},{key:"onSubmit",value:function(){var e=this;this.puzzleService.updatePuzzle(this.puzzle.id,this.puzzle).subscribe((function(){e.router.navigate(["puzzles/"+e.puzzle.id])}))}}]),e}()).\u0275fac=function(e){return new(e||w)(a.Nb(l.a),a.Nb(o.a),a.Nb(o.c))},w.\u0275cmp=a.Hb({type:w,selectors:[["app-update-puzzle"]],decls:29,vars:11,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","form-container"],[3,"ngSubmit"],["f","ngForm"],["for","puzzle-edit-title"],["type","text","id","puzzle-edit-title","name","puzzle-edit-title",3,"ngModel","ngModelChange"],["for","puzzle-edit-category"],["type","text","id","puzzle-edit-category","disabled","",3,"value"],["for","puzzle-edit-instruction"],["id","puzzle-edit-instruction","name","puzzle-edit-instruction",3,"ngModel","disabled","ngModelChange"],["for","puzzle-edit-item",4,"ngIf"],["id","puzzle-edit-item","name","puzzle-edit-item",3,"ngModel","disabled","ngModelChange",4,"ngIf"],["alt","puzzle",3,"src",4,"ngIf"],["for","puzzle-edit-answer"],["type","text","id","puzzle-edit-answer","name","puzzle-edit-answer",3,"ngModel","disabled","ngModelChange"],["for","puzzle-edit-level"],["type","text","id","puzzle-edit-level","disabled","",3,"value"],["type","submit",3,"disabled"],["for","puzzle-edit-item"],["id","puzzle-edit-item","name","puzzle-edit-item",3,"ngModel","disabled","ngModelChange"],["alt","puzzle",3,"src"]],template:function(e,t){if(1&e&&(a.Ob(0,"app-navbar"),a.Sb(1,"div",0),a.Sb(2,"div",1),a.Sb(3,"div",2),a.Sb(4,"h2"),a.Dc(5,"Rejtv\xe9ny szerkeszt\xe9se"),a.Rb(),a.Sb(6,"form",3,4),a.ec("ngSubmit",(function(){return t.onSubmit()})),a.Sb(8,"label",5),a.Dc(9,"C\xedm:"),a.Rb(),a.Sb(10,"input",6),a.ec("ngModelChange",(function(e){return t.puzzle.title=e})),a.Rb(),a.Sb(11,"label",7),a.Dc(12,"Kateg\xf3ria:"),a.Rb(),a.Ob(13,"input",8),a.Sb(14,"label",9),a.Dc(15,"Instrukci\xf3:"),a.Rb(),a.Sb(16,"textarea",10),a.ec("ngModelChange",(function(e){return t.puzzle.instruction=e})),a.Dc(17,"        "),a.Rb(),a.Bc(18,y,2,0,"label",11),a.Bc(19,R,2,2,"textarea",12),a.Bc(20,k,1,1,"img",13),a.Sb(21,"label",14),a.Dc(22,"Helyes v\xe1lasz:"),a.Rb(),a.Sb(23,"input",15),a.ec("ngModelChange",(function(e){return t.puzzle.answer=e})),a.Rb(),a.Sb(24,"label",16),a.Dc(25,"Neh\xe9zs\xe9g:"),a.Rb(),a.Ob(26,"input",17),a.Sb(27,"button",18),a.Dc(28,"K\xfcld\xe9s"),a.Rb(),a.Rb(),a.Rb(),a.Rb(),a.Rb()),2&e){var n=a.tc(7);a.Ab(10),a.mc("ngModel",t.puzzle.title),a.Ab(3),a.nc("value",t.puzzleService.translateCategory(t.puzzle.category)),a.Ab(3),a.mc("ngModel",t.puzzle.instruction)("disabled",t.isCipher),a.Ab(2),a.mc("ngIf",!t.isPicturePuzzle),a.Ab(1),a.mc("ngIf",!t.isPicturePuzzle),a.Ab(1),a.mc("ngIf",t.isPicturePuzzle),a.Ab(3),a.mc("ngModel",t.puzzle.answer)("disabled",t.isCipher),a.Ab(3),a.nc("value",t.puzzleService.translateLevel(t.puzzle.level)),a.Ab(1),a.mc("disabled",n.invalid)}},directives:[s.a,O.p,O.i,O.j,O.c,O.h,O.k,p.l],styles:[".form-container[_ngcontent-%COMP%]{margin-top:100px;margin-bottom:50px;border-radius:10px;background-color:#333;padding:20px 40px;color:#00b300;font-size:18px}h2[_ngcontent-%COMP%]{margin:20px 0 40px}h2[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{text-align:center}label[_ngcontent-%COMP%]{color:#00b300;margin-top:25px}input[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]{margin:10px auto;width:60%;font-size:17px;text-align:left}input[disabled][_ngcontent-%COMP%]:hover{background-color:#333;border-radius:0;color:#f0fff0;cursor:default}textarea[_ngcontent-%COMP%]{display:block;width:60%;height:150px;margin:0 auto}button[_ngcontent-%COMP%]{margin:30px auto}button[_ngcontent-%COMP%], img[_ngcontent-%COMP%]{display:block}img[_ngcontent-%COMP%]{margin:20px auto}"]}),w),F=[{path:"",children:[{path:"members",canActivate:[r],component:x},{path:"puzzles",canActivate:[r],component:g},{path:"members/edit/:id",canActivate:[r],component:n("neMb").a},{path:"puzzles/edit/:id",canActivate:[r],component:I}]}],E=((D=function e(){_classCallCheck(this,e)}).\u0275mod=a.Lb({type:D}),D.\u0275inj=a.Kb({factory:function(e){return new(e||D)},imports:[[o.f.forChild(F)],o.f]}),D),T=n("GdK9"),j=n("ovet"),B=((A=function e(){_classCallCheck(this,e)}).\u0275mod=a.Lb({type:A}),A.\u0275inj=a.Kb({factory:function(e){return new(e||A)},imports:[[E,T.ProfileModule,j.a]]}),A)}}]);