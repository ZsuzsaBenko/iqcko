(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{gCuI:function(e,t,n){"use strict";n.r(t),n.d(t,"PuzzleModule",(function(){return oe}));var i=n("tyNb"),o=n("MKys"),c=n("28vI"),s=n("YxAp"),a=n("Cd6q"),r=n("fXoL"),l=n("BAab"),b=n("yKSu"),g=n("3Pt+"),p=n("ofXK");function d(e,t){1&e&&(r.Sb(0,"div"),r.Sb(1,"div"),r.Sb(2,"label",15),r.Dc(3,"\xcdrj pontos instrukci\xf3t! Milyen form\xe1ban v\xe1rod a v\xe1laszt?"),r.Rb(),r.Sb(4,"textarea",16),r.Dc(5,"            "),r.Rb(),r.Rb(),r.Sb(6,"div"),r.Sb(7,"label",17),r.Dc(8,"Ide \xedrd mag\xe1t a rejtv\xe9nyt!"),r.Rb(),r.Sb(9,"textarea",18),r.Dc(10,"            "),r.Rb(),r.Rb(),r.Rb())}function m(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div"),r.Sb(1,"div"),r.Sb(2,"label",19),r.Dc(3,"\xcdrj pontos instrukci\xf3t! Milyen form\xe1ban v\xe1rod a v\xe1laszt?"),r.Rb(),r.Sb(4,"textarea",20),r.Dc(5,">"),r.Rb(),r.Rb(),r.Sb(6,"div"),r.Sb(7,"label",21),r.Dc(8,"T\xf6ltsd fel a k\xe9pet!"),r.Rb(),r.Sb(9,"input",22),r.ec("change",(function(t){return r.uc(e),r.gc().onUploadImage(t)})),r.Rb(),r.Rb(),r.Rb()}}function u(e,t){1&e&&(r.Sb(0,"div"),r.Sb(1,"p"),r.Dc(2,"A titkos\xedr\xe1ssal \xedrt rejtv\xe9nyt \xe9s a hozz\xe1 tartoz\xf3 instrukci\xf3t a sz\xe1m\xedt\xf3g\xe9p gener\xe1lja a megadott helyes v\xe1laszb\xf3l."),r.Rb(),r.Rb())}function z(e,t){if(1&e&&(r.Sb(0,"div",32),r.Sb(1,"p"),r.Dc(2),r.Rb(),r.Rb()),2&e){const e=r.gc(2);r.Ab(2),r.Fc("",e.errorMessage," A rejtv\xe9ny felt\xf6lt\xe9se nem siker\xfclt.")}}function f(e,t){if(1&e&&(r.Sb(0,"div"),r.Sb(1,"div"),r.Sb(2,"label",23),r.Dc(3,"Ide \xedrd a helyes v\xe1laszt!"),r.Rb(),r.Ob(4,"textarea",24),r.Rb(),r.Sb(5,"div"),r.Sb(6,"label",25),r.Dc(7,"Milyen neh\xe9zs\xe9g\u0171nek \xedt\xe9led a feladv\xe1nyt?"),r.Rb(),r.Sb(8,"select",26),r.Sb(9,"option",27),r.Dc(10,"K\xf6nny\u0171"),r.Rb(),r.Sb(11,"option",28),r.Dc(12,"K\xf6zepes"),r.Rb(),r.Sb(13,"option",29),r.Dc(14,"Neh\xe9z"),r.Rb(),r.Rb(),r.Rb(),r.Bc(15,z,3,1,"div",30),r.Sb(16,"button",31),r.Dc(17,"K\xfcld\xe9s"),r.Rb(),r.Rb()),2&e){const e=r.gc(),t=r.tc(7);r.Ab(15),r.mc("ngIf",""!==e.errorMessage),r.Ab(1),r.mc("disabled",t.invalid)}}let h=(()=>{class e{constructor(e,t,n){this.puzzleService=e,this.storage=t,this.router=n,this.puzzle=new c.a,this.isNormalPuzzle=!1,this.isPicturePuzzle=!1,this.isCipher=!1,this.image=null,this.errorMessage=""}ngOnInit(){}onChangeCategory(e){"PICTURE_PUZZLE"===e.value.category?(this.isNormalPuzzle=!1,this.isPicturePuzzle=!0,this.isCipher=!1):"CIPHER"===e.value.category?(this.isNormalPuzzle=!1,this.isPicturePuzzle=!1,this.isCipher=!0):(this.isNormalPuzzle=!0,this.isPicturePuzzle=!1,this.isCipher=!1)}onUploadImage(e){this.image=e.target.files[0]}onSubmit(e){this.puzzle.title=e.value.title,this.puzzle.category=e.value.category,this.puzzle.level=e.value.level,this.puzzle.answer=e.value.answer,"CIPHER"!==e.value.category&&"PICTURE_PUZZLE"!==e.value.category&&(this.puzzle.instruction=e.value.instruction,this.puzzle.puzzleItem=e.value["puzzle-item"]),this.addNewPuzzle(e)}addNewPuzzle(e){this.puzzle.category!==s.a.PICTURE_PUZZLE.toString()?this.sendPuzzleData(e):this.uploadPicturePuzzle(e)}sendPuzzleData(e){this.puzzleService.addNewPuzzle(this.puzzle).subscribe(t=>{e.reset(),this.router.navigate(["/puzzles/"+t.id]).then()})}uploadPicturePuzzle(e){const t=this.storage.ref(this.image.name);t.put(this.image).then(()=>{t.getDownloadURL().subscribe(t=>{const n=t.toString(),i=n.indexOf(".com/o/");this.puzzle.puzzleItem=n.substring(i+7),this.puzzle.instruction=e.value["instruction-picture"],this.sendPuzzleData(e)})}).catch(()=>this.errorMessage="A k\xe9p m\xe9rete legfeljebb 2 MB lehet.")}}return e.\u0275fac=function(t){return new(t||e)(r.Nb(a.a),r.Nb(l.a),r.Nb(i.c))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-add-puzzle"]],decls:30,vars:4,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","form-container"],["enctype","multipart/form-data",3,"ngSubmit"],["f","ngForm"],["for","title"],["type","text","id","title","name","title","ngModel","","required",""],["for","category"],["name","category","id","category","ngModel","","required","",3,"change"],["value","RIDDLE"],["value","MATH_PUZZLE"],["value","PICTURE_PUZZLE"],["value","WORD_PUZZLE"],["value","CIPHER"],[4,"ngIf"],["for","instruction-normal"],["id","instruction-normal","name","instruction","ngModel","","required","","placeholder","P\xe9ld\xe1ul: Hogy folytat\xf3dik a sz\xe1msor? A megold\xe1s h\xe1rom sz\xe1m vessz\u0151vel, sz\xf3k\xf6zzel elv\xe1lasztva. Ha sz\xfcks\xe9ges, haszn\xe1lj tizedespontot!"],["for","puzzle-item-normal"],["id","puzzle-item-normal","name","puzzle-item","ngModel","","required","","placeholder","P\xe9ld\xe1ul: 2, 3.5, 5, 6.5, 8, ?, ?, ?"],["for","instruction-picture"],["id","instruction-picture","name","instruction-picture","ngModel","","required","","placeholder","P\xe9ld\xe1ul: A megold\xe1s h\xe1rom sz\xe1m egy-egy sz\xf3k\xf6zzel elv\xe1lasztva. Amennyiben sz\xfcks\xe9ges, tizedesvessz\u0151 haszn\xe1lhat\xf3."],["for","upload"],["type","file","accept","image/*","id","upload",3,"change"],["for","answer"],["id","answer","name","answer","ngModel","","required","","placeholder","P\xe9ld\xe1ul: 9.5, 11, 12.5 - figyelj, hogy a v\xe1lasz \xe9s az intrukci\xf3ban megadott form\xe1tum egyezzen!"],["for","level"],["name","level","id","level","ngModel","","required",""],["value","EASY"],["value","MEDIUM"],["value","DIFFICULT"],["id","submit-error","class","error",4,"ngIf"],["type","submit",3,"disabled"],["id","submit-error",1,"error"]],template:function(e,t){if(1&e){const e=r.Tb();r.Ob(0,"app-navbar"),r.Sb(1,"div",0),r.Sb(2,"div",1),r.Sb(3,"div",2),r.Sb(4,"h2"),r.Dc(5,"K\xfcldd el a saj\xe1t rejtv\xe9nyed!"),r.Rb(),r.Sb(6,"form",3,4),r.ec("ngSubmit",(function(){r.uc(e);const n=r.tc(7);return t.onSubmit(n)})),r.Sb(8,"div"),r.Sb(9,"label",5),r.Dc(10,"Adj egy tal\xe1l\xf3 c\xedmet a rejtv\xe9nyednek!"),r.Rb(),r.Ob(11,"input",6),r.Rb(),r.Sb(12,"div"),r.Sb(13,"label",7),r.Dc(14,"Milyen kateg\xf3ri\xe1hoz tartozik?"),r.Rb(),r.Sb(15,"select",8),r.ec("change",(function(){r.uc(e);const n=r.tc(7);return t.onChangeCategory(n)})),r.Sb(16,"option",9),r.Dc(17,"Fejt\xf6r\u0151, tal\xe1l\xf3s k\xe9rd\xe9s"),r.Rb(),r.Sb(18,"option",10),r.Dc(19,"Matematikai feladv\xe1ny"),r.Rb(),r.Sb(20,"option",11),r.Dc(21,"K\xe9prejtv\xe9ny"),r.Rb(),r.Sb(22,"option",12),r.Dc(23,"Nyelvi j\xe1t\xe9k"),r.Rb(),r.Sb(24,"option",13),r.Dc(25,"Titkos\xedr\xe1s"),r.Rb(),r.Rb(),r.Rb(),r.Bc(26,d,11,0,"div",14),r.Bc(27,m,10,0,"div",14),r.Bc(28,u,3,0,"div",14),r.Bc(29,f,18,2,"div",14),r.Rb(),r.Rb(),r.Rb(),r.Rb()}2&e&&(r.Ab(26),r.mc("ngIf",t.isNormalPuzzle),r.Ab(1),r.mc("ngIf",t.isPicturePuzzle),r.Ab(1),r.mc("ngIf",t.isCipher),r.Ab(1),r.mc("ngIf",t.isNormalPuzzle||t.isPicturePuzzle||t.isCipher))},directives:[b.a,g.p,g.i,g.j,g.c,g.h,g.k,g.m,g.n,g.l,g.o,p.l],styles:[".form-container[_ngcontent-%COMP%]{margin-top:100px;margin-bottom:50px;border-radius:10px;background-color:#333;padding:20px 40px;color:#00b300;font-size:18px}h2[_ngcontent-%COMP%]{margin:20px 0 40px}h2[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{text-align:center}label[_ngcontent-%COMP%]{display:block;color:#00b300;margin-top:25px}input[_ngcontent-%COMP%]{margin:10px auto;font-size:17px;text-align:left}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{display:block;width:60%}select[_ngcontent-%COMP%]{margin:20px auto 10px}textarea[_ngcontent-%COMP%]{display:block;width:60%;height:150px;margin:0 auto}button[_ngcontent-%COMP%]{display:block;margin:30px auto}p[_ngcontent-%COMP%]{text-align:center;margin-top:20px}#submit-comment-error[_ngcontent-%COMP%]{margin:20px auto;width:80%}"]}),e})();var v=n("mxDV"),P=n("UZWx"),S=n("XPT/"),M=n("FsBl");let C=(()=>{class e{constructor(e){this.commentService=e}ngOnInit(){}onSubmit(e){if(!e.value.agreement)return;const t=e.value.message,n=new c.a;n.id=this.puzzleId;const i=new M.a;i.message=t,i.puzzle=n,this.commentService.addNewComment(i).subscribe(t=>{e.reset(),this.comments.push(t)})}}return e.\u0275fac=function(t){return new(t||e)(r.Nb(v.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-add-comment"]],inputs:{comments:"comments",puzzleId:"puzzleId"},decls:11,vars:1,consts:[[3,"ngSubmit"],["f","ngForm"],["for","message"],["name","message","id","message","ngModel","","required",""],["id","agreement"],["for","agreement"],["type","checkbox","name","agreement","ngModel","","required",""],["type","submit",3,"disabled"]],template:function(e,t){if(1&e){const e=r.Tb();r.Sb(0,"form",0,1),r.ec("ngSubmit",(function(){r.uc(e);const n=r.tc(1);return t.onSubmit(n)})),r.Sb(2,"label",2),r.Dc(3,"Sz\xf3lj hozz\xe1!"),r.Rb(),r.Ob(4,"textarea",3),r.Sb(5,"div",4),r.Sb(6,"label",5),r.Ob(7,"input",6),r.Dc(8," A hozz\xe1sz\xf3l\xe1s nem tartalmazza a rejtv\xe9ny megold\xe1s\xe1t vagy a helyes megold\xe1sra t\xf6rt\xe9n\u0151 b\xe1rmilyen utal\xe1st, sem semmilyen s\xe9rt\u0151 megjegyz\xe9st."),r.Rb(),r.Rb(),r.Sb(9,"button",7),r.Dc(10,"Hozz\xe1sz\xf3l\xe1s k\xfcld\xe9se"),r.Rb(),r.Rb()}if(2&e){const e=r.tc(1);r.Ab(9),r.mc("disabled",e.invalid||!e.value.agreement)}},directives:[g.p,g.i,g.j,g.c,g.h,g.k,g.m,g.a,g.b],styles:["button[_ngcontent-%COMP%], label[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{display:block}label[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px;font-size:20px}textarea[_ngcontent-%COMP%]{width:70%;height:150px;margin:0 auto}button[_ngcontent-%COMP%]{margin:20px auto;padding:10px}#agreement[_ngcontent-%COMP%]{width:70%;margin:10px auto;padding:10px;text-align:center}#agreement[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:15px}@media only screen and (max-width:600px){textarea[_ngcontent-%COMP%]{width:90%}}"]}),e})();var O=n("Pv/Z"),R=n("xJv6"),x=n("6NWb");function y(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div",3),r.Sb(1,"fa-icon",4),r.ec("click",(function(){return r.uc(e),r.gc().toggleEditable()})),r.Rb(),r.Rb()}if(2&e){const e=r.gc();r.Ab(1),r.mc("icon",e.faEdit)}}const _=function(e){return{inEditMode:e}};let I=(()=>{class e extends O.a{constructor(e){super(e),this.commentService=e,this.faEdit=R.faEdit}ngOnInit(){this.isOwnComment=this.comment.member.id===this.loggedInMember.id}}return e.\u0275fac=function(t){return new(t||e)(r.Nb(v.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-simple-comment-item"]],inputs:{comment:"comment",loggedInMember:"loggedInMember"},features:[r.xb],decls:11,vars:14,consts:[[1,"simple-comment"],[3,"contentEditable","ngClass","keydown.enter"],["class","modification",4,"ngIf"],[1,"modification"],[1,"fas",3,"icon","click"]],template:function(e,t){1&e&&(r.Sb(0,"div",0),r.Sb(1,"p"),r.Sb(2,"span"),r.Dc(3),r.Rb(),r.Sb(4,"span"),r.Dc(5),r.hc(6,"date"),r.Rb(),r.Rb(),r.Sb(7,"p"),r.Sb(8,"span",1),r.ec("keydown.enter",(function(){return t.editComment(t.comment.id)})),r.Dc(9),r.Rb(),r.Rb(),r.Bc(10,y,2,1,"div",2),r.Rb()),2&e&&(r.Ab(3),r.Ec(t.comment.member.username),r.Ab(2),r.Ec(r.jc(6,9,t.comment.submissionTime,"yyyy. MM. dd.")),r.Ab(3),r.Db("messageText",t.comment.id,""),r.mc("contentEditable",t.isEditable)("ngClass",r.pc(12,_,t.isEditable)),r.Ab(1),r.Fc(" ",t.comment.message,""),r.Ab(1),r.mc("ngIf",t.isOwnComment))},directives:[p.j,p.l,x.a],pipes:[p.d],styles:["a[_ngcontent-%COMP%]{text-decoration:none}.modification[_ngcontent-%COMP%]{display:flex;width:120px;height:100%;position:absolute;top:0;right:0;align-items:center;justify-content:center}.fas[_ngcontent-%COMP%]{font-size:30px;color:#00b300;vertical-align:middle;transition:color 1s}.fas[_ngcontent-%COMP%]:hover{cursor:pointer;color:#f0fff0}.modification[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:10px}.simple-comment[_ngcontent-%COMP%]{width:80%;margin:10px auto;background-color:#444;border:2px solid #00b300;border-radius:10px;padding:10px;font-size:17px;position:relative}.simple-comment[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#00b300}.simple-comment[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{color:#f0fff0}.simple-comment[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){float:right}.simple-comment[_ngcontent-%COMP%]   .modification[_ngcontent-%COMP%]{align-items:flex-end;justify-content:flex-end}.simple-comment[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] > span.inEditMode[_ngcontent-%COMP%]{color:#b22222;background-color:#f0fff0}@media only screen and (max-width:600px){p[_ngcontent-%COMP%]{margin:10px 0}.modification[_ngcontent-%COMP%]{width:80px;height:50px;margin:0 auto;position:static}.modification[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{margin-right:20px}}"]}),e})();function w(e,t){1&e&&(r.Sb(0,"div",3),r.Sb(1,"div",4),r.Sb(2,"div",5),r.Sb(3,"span",6),r.Dc(4,"Loading..."),r.Rb(),r.Rb(),r.Rb(),r.Rb())}function k(e,t){if(1&e&&(r.Sb(0,"li"),r.Ob(1,"app-simple-comment-item",14),r.Rb()),2&e){const e=t.$implicit,n=r.gc(3);r.Ab(1),r.mc("comment",e)("loggedInMember",n.loggedInMember)}}function A(e,t){if(1&e&&(r.Sb(0,"div",12),r.Sb(1,"h2"),r.Dc(2),r.Rb(),r.Sb(3,"ul"),r.Bc(4,k,2,2,"li",13),r.Rb(),r.Rb()),2&e){const e=r.gc(2);r.Ab(2),r.Fc(" ",e.comments[0].puzzle.title,""),r.Ab(2),r.mc("ngForOf",e.comments)}}function D(e,t){1&e&&(r.Sb(0,"div",15),r.Sb(1,"p"),r.Dc(2,"Ehhez a rejtv\xe9nyhez m\xe9g nem \xedrt hozz\xe1sz\xf3l\xe1st senki sem."),r.Rb(),r.Rb())}function E(e,t){if(1&e&&(r.Sb(0,"div",7),r.Bc(1,A,5,2,"div",8),r.Bc(2,D,3,0,"div",9),r.Sb(3,"div",10),r.Ob(4,"app-add-comment",11),r.Rb(),r.Rb()),2&e){const e=r.gc();r.Ab(1),r.mc("ngIf",e.comments.length>0),r.Ab(1),r.mc("ngIf",0==e.comments.length),r.Ab(2),r.mc("puzzleId",e.puzzleId)("comments",e.comments)}}let j=(()=>{class e{constructor(e,t,n){this.commentService=e,this.memberService=t,this.activatedRoute=n,this.loggedInMember=new P.a,this.isFetching=!0}ngOnInit(){const e=this.activatedRoute.snapshot.url.toString(),t=e.indexOf(","),n=e.substring(0,t);this.puzzleId=+n,this.commentService.getAllCommentsByPuzzle(this.puzzleId).subscribe(e=>{this.comments=e,this.isFetching=!1}),this.memberService.getLoggedInMemberProfile().subscribe(e=>this.loggedInMember=e)}}return e.\u0275fac=function(t){return new(t||e)(r.Nb(v.a),r.Nb(S.a),r.Nb(i.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-comment"]],decls:4,vars:2,consts:[[1,"container-fluid"],["class","row","id","comment-spinner-row",4,"ngIf"],["class","row",4,"ngIf"],["id","comment-spinner-row",1,"row"],[1,"col-12"],["role","status",1,"spinner-border","spinner"],[1,"sr-only"],[1,"row"],["class","col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 comment-column",4,"ngIf"],["class","col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 no-comments",4,"ngIf"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","add-comment"],[3,"puzzleId","comments"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","comment-column"],[4,"ngFor","ngForOf"],[3,"comment","loggedInMember"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","no-comments"]],template:function(e,t){1&e&&(r.Ob(0,"app-navbar"),r.Sb(1,"div",0),r.Bc(2,w,5,0,"div",1),r.Bc(3,E,5,4,"div",2),r.Rb()),2&e&&(r.Ab(2),r.mc("ngIf",t.isFetching),r.Ab(1),r.mc("ngIf",!t.isFetching))},directives:[b.a,p.l,C,p.k,I],styles:["#comment-spinner-row[_ngcontent-%COMP%]{margin-top:100px}.add-comment[_ngcontent-%COMP%], .comment-column[_ngcontent-%COMP%], .no-comments[_ngcontent-%COMP%]{margin-top:100px;border-radius:10px;background-color:#333;padding:30px 40px;color:#00b300;position:relative}.comment-column[_ngcontent-%COMP%]{padding-bottom:50px}.add-comment[_ngcontent-%COMP%]{margin-bottom:50px}.no-comments[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;padding:0;line-height:34px;font-size:17px;color:#00b300;text-align:center}.add-comment[_ngcontent-%COMP%]{margin-top:20px}h2[_ngcontent-%COMP%]{color:#f0fff0;text-align:center;margin-bottom:30px}ul[_ngcontent-%COMP%]{margin:0;padding:0}li[_ngcontent-%COMP%]{list-style-type:none}"]}),e})();var B=n("6mos"),F=n("oVMc"),N=n("hVay");function Z(e,t){1&e&&(r.Sb(0,"div",5),r.Sb(1,"div",6),r.Sb(2,"span",7),r.Dc(3,"Loading..."),r.Rb(),r.Rb(),r.Rb())}function T(e,t){if(1&e&&(r.Sb(0,"li"),r.Ob(1,"app-puzzle-item",11),r.Rb()),2&e){const e=t.$implicit;r.Ab(1),r.mc("puzzle",e)}}function L(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div",8),r.Sb(1,"h1"),r.Dc(2),r.Rb(),r.Sb(3,"app-puzzle-sort",9),r.ec("puzzlesSorted",(function(t){return r.uc(e),r.gc().onSort(t)})),r.Rb(),r.Sb(4,"ul"),r.Bc(5,T,2,1,"li",10),r.Rb(),r.Rb()}if(2&e){const e=r.gc();r.Ab(2),r.Ec(e.title),r.Ab(1),r.mc("category",e.category),r.Ab(2),r.mc("ngForOf",e.puzzles)}}let U=(()=>{class e{constructor(e,t,n){this.puzzleService=e,this.solutionService=t,this.activatedRoute=n,this.title="",this.category=null,this.isFetching=!0}ngOnInit(){const e=this.activatedRoute.snapshot.url.toString();e.endsWith("all")?this.puzzleService.getAllPuzzles().subscribe(e=>{this.puzzles=e,this.title="\xd6sszes rejtv\xe9ny",this.isFetching=!1,this.markSolvedPuzzles()}):e.endsWith("riddles")?this.puzzleService.getPuzzlesByCategory(s.a.RIDDLE).subscribe(e=>{this.onSuccess(e,s.a.RIDDLE,"Fejt\xf6r\u0151k, tal\xe1l\xf3s k\xe9rd\xe9sek")}):e.endsWith("math-puzzles")?this.puzzleService.getPuzzlesByCategory(s.a.MATH_PUZZLE).subscribe(e=>{this.onSuccess(e,s.a.MATH_PUZZLE,"Matematikai feladv\xe1nyok")}):e.endsWith("picture-puzzles")?this.puzzleService.getPuzzlesByCategory(s.a.PICTURE_PUZZLE).subscribe(e=>{this.onSuccess(e,s.a.PICTURE_PUZZLE,"K\xe9prejtv\xe9nyek")}):e.endsWith("word-puzzles")?this.puzzleService.getPuzzlesByCategory(s.a.WORD_PUZZLE).subscribe(e=>{this.onSuccess(e,s.a.WORD_PUZZLE,"Nyelvi j\xe1t\xe9kok")}):e.endsWith("ciphers")&&this.puzzleService.getPuzzlesByCategory(s.a.CIPHER).subscribe(e=>{this.onSuccess(e,s.a.CIPHER,"Titkos\xedr\xe1s")})}onSort(e){this.puzzles=e,this.markSolvedPuzzles()}markSolvedPuzzles(){this.solutionService.getAllSolutionsByLoggedInMember().subscribe(e=>{this.findSolved(e)})}findSolved(e){for(const t of this.puzzles)for(const n of e)if(n.puzzle.id===t.id){t.solved=!0;break}}onSuccess(e,t,n){this.puzzles=e,this.category=t,this.title=n,this.isFetching=!1,this.markSolvedPuzzles()}}return e.\u0275fac=function(t){return new(t||e)(r.Nb(a.a),r.Nb(B.a),r.Nb(i.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-puzzles"]],decls:7,vars:2,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12"],["class","col-12","id","puzzle-spinner",4,"ngIf"],["class","col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 puzzle-container",4,"ngIf"],["id","puzzle-spinner",1,"col-12"],["role","status",1,"spinner-border","spinner"],[1,"sr-only"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","puzzle-container"],[3,"category","puzzlesSorted"],[4,"ngFor","ngForOf"],[3,"puzzle"]],template:function(e,t){1&e&&(r.Ob(0,"app-navbar"),r.Sb(1,"div",0),r.Sb(2,"div",1),r.Sb(3,"div",2),r.Sb(4,"div",1),r.Bc(5,Z,4,0,"div",3),r.Bc(6,L,6,3,"div",4),r.Rb(),r.Rb(),r.Rb(),r.Rb()),2&e&&(r.Ab(5),r.mc("ngIf",t.isFetching),r.Ab(1),r.mc("ngIf",!t.isFetching))},directives:[b.a,p.l,F.a,p.k,N.a],styles:["#puzzle-spinner[_ngcontent-%COMP%]{margin-top:100px}.puzzle-container[_ngcontent-%COMP%]{margin-top:100px;border-radius:10px;background-color:#333;padding:20px}.puzzle-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#00b300;padding:10px 0 30px;text-align:center}.puzzle-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0}.puzzle-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style-type:none}"]}),e})();class H{}var K=n("vGip"),W=n("1kSV");function q(e,t){1&e&&(r.Sb(0,"div",5),r.Sb(1,"div",6),r.Sb(2,"span",7),r.Dc(3,"Loading..."),r.Rb(),r.Rb(),r.Rb())}function V(e,t){if(1&e&&(r.Sb(0,"p",10),r.Dc(1,"Bek\xfcld\u0151: "),r.Sb(2,"span"),r.Dc(3),r.Rb(),r.Sb(4,"span",19),r.Dc(5),r.hc(6,"date"),r.Rb(),r.Rb()),2&e){const e=r.gc(2);r.Ab(3),r.Ec(e.puzzle.member.username),r.Ab(2),r.Fc(" ",r.jc(6,2,e.puzzle.submissionTime,"yyyy. MM. dd."),"")}}function J(e,t){if(1&e&&(r.Sb(0,"p",11),r.Dc(1),r.Rb()),2&e){const e=r.gc(2);r.Ab(1),r.Ec(e.puzzle.puzzleItem)}}function X(e,t){if(1&e&&r.Ob(0,"img",20),2&e){const e=r.gc(2);r.oc("src","https://firebasestorage.googleapis.com/v0/b/puzzles-a6dd7.appspot.com/o/",e.puzzle.puzzleItem,"",r.wc)}}function Y(e,t){1&e&&(r.Sb(0,"p",30),r.Dc(1,"Nem ez a helyes megold\xe1s. Pr\xf3b\xe1lkozz tov\xe1bb!"),r.Rb())}function $(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div",21),r.Sb(1,"form",22,23),r.ec("ngSubmit",(function(){r.uc(e);const t=r.tc(2);return r.gc(2).onCheckAnswer(t)})),r.Sb(3,"label",24),r.Dc(4,"V\xe1lasz: "),r.Rb(),r.Ob(5,"input",25),r.Sb(6,"div",26),r.Sb(7,"button",27),r.ec("click",(function(){return r.uc(e),r.gc(2).onCancel()})),r.Dc(8,"M\xe9gse"),r.Rb(),r.Sb(9,"button",28),r.Dc(10,"Helyes?"),r.Rb(),r.Rb(),r.Rb(),r.Bc(11,Y,2,0,"p",29),r.Rb()}if(2&e){const e=r.gc(2);r.Ab(11),r.mc("ngIf",e.isIncorrect)}}function G(e,t){1&e&&(r.Sb(0,"span",35),r.Dc(1,"\u2605"),r.Rb()),2&e&&r.Fb("filled",100===t.fill)}function Q(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div",31),r.Sb(1,"h3"),r.Dc(2,"Kiv\xe1l\xf3 megfejt\xe9s!"),r.Rb(),r.Sb(3,"p"),r.Dc(4,"\xc9rt\xe9keld a rejtv\xe9nyt, \xe9s k\xfcldd be a megold\xe1sod!"),r.Rb(),r.Sb(5,"div",32),r.Sb(6,"ngb-rating",33),r.ec("rateChange",(function(t){return r.uc(e),r.gc(2).rating=t})),r.Bc(7,G,2,2,"ng-template"),r.Rb(),r.Rb(),r.Sb(8,"button",34),r.ec("click",(function(){return r.uc(e),r.gc(2).onSendSolution()})),r.Dc(9,"K\xfcld\xe9s"),r.Rb(),r.Rb()}if(2&e){const e=r.gc(2);r.Ab(6),r.mc("rate",e.rating)}}function ee(e,t){if(1&e&&(r.Sb(0,"div",8),r.Bc(1,V,7,5,"p",9),r.Sb(2,"h1"),r.Dc(3),r.Rb(),r.Sb(4,"p",10),r.Dc(5,"Instrukci\xf3: "),r.Sb(6,"span",11),r.Dc(7),r.Rb(),r.Rb(),r.Sb(8,"div",12),r.Bc(9,J,2,1,"p",13),r.Bc(10,X,1,1,"img",14),r.Rb(),r.Sb(11,"p",15),r.Ob(12,"app-stars",16),r.Rb(),r.Bc(13,$,12,1,"div",17),r.Bc(14,Q,10,1,"div",18),r.Rb()),2&e){const e=r.gc();r.Ab(1),r.mc("ngIf",null!==e.puzzle.member),r.Ab(2),r.Ec(e.puzzle.title),r.Ab(4),r.Ec(e.puzzle.instruction),r.Ab(2),r.mc("ngIf","PICTURE_PUZZLE"!==e.puzzle.category.toString()),r.Ab(1),r.mc("ngIf","PICTURE_PUZZLE"===e.puzzle.category.toString()),r.Ab(2),r.mc("puzzle",e.puzzle),r.Ab(1),r.mc("ngIf",!e.isSolved),r.Ab(1),r.mc("ngIf",e.isSolved)}}const te=[{path:"",children:[{path:"riddles",canActivate:[o.a],component:U},{path:"math-puzzles",canActivate:[o.a],component:U},{path:"picture-puzzles",canActivate:[o.a],component:U},{path:"word-puzzles",canActivate:[o.a],component:U},{path:"ciphers",canActivate:[o.a],component:U},{path:"all",canActivate:[o.a],component:U},{path:"add",canActivate:[o.a],component:h,pathMatch:"full"},{path:":id",canActivate:[o.a],component:(()=>{class e{constructor(e,t,n,i){this.puzzleService=e,this.solutionService=t,this.activatedRoute=n,this.location=i,this.puzzle=new c.a,this.rating=5,this.isFetching=!0,this.isSolved=!1,this.isIncorrect=!1}ngOnInit(){this.start=new Date,this.puzzleService.getPuzzleById(this.activatedRoute.snapshot.params.id).subscribe(e=>{this.puzzle=e,this.isFetching=!1})}onCancel(){this.location.back()}onCheckAnswer(e){let t=e.value.answer;t=t.trim().toLowerCase(),e.reset(),this.puzzleService.checkAnswer(this.puzzle.id,t).subscribe(e=>{e?this.isSolved=!0:(this.isIncorrect=!0,setTimeout(()=>this.isIncorrect=!1,3e3))})}onSendSolution(){const e=new Date,t=Math.round((e.getTime()-this.start.getTime())/1e3),n=new H;n.puzzle=this.puzzle,n.seconds=t,n.rating=this.rating,this.solutionService.saveSolution(n).subscribe(()=>{this.location.back()})}}return e.\u0275fac=function(t){return new(t||e)(r.Nb(a.a),r.Nb(B.a),r.Nb(i.a),r.Nb(p.h))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-puzzle-game"]],decls:7,vars:2,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12"],["class","col-12","id","game-spinner",4,"ngIf"],["class","col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 puzzle-container",4,"ngIf"],["id","game-spinner",1,"col-12"],["role","status",1,"spinner-border","spinner"],[1,"sr-only"],[1,"col-12","col-md-10","offset-md-1","col-lg-8","offset-lg-2","puzzle-container"],["class","puzzle-info",4,"ngIf"],[1,"puzzle-info"],[1,"preserve-newline"],[1,"puzzle-item"],["class","preserve-newline",4,"ngIf"],["alt","puzzle",3,"src",4,"ngIf"],[1,"rating"],[3,"puzzle"],["class","answer-form",4,"ngIf"],["class","rating-box",4,"ngIf"],["id","date"],["alt","puzzle",3,"src"],[1,"answer-form"],[3,"ngSubmit"],["f","ngForm"],["for","answer"],["type","text","id","answer","name","answer","ngModel",""],[1,"answer-btn-div"],["id","cancel-button","type","button",3,"click"],["id","check-button","type","submit"],["id","incorrect-message",4,"ngIf"],["id","incorrect-message"],[1,"rating-box"],[1,"rating-stars"],["max","5",3,"rate","rateChange"],["type","button",3,"click"],[1,"star"]],template:function(e,t){1&e&&(r.Ob(0,"app-navbar"),r.Sb(1,"div",0),r.Sb(2,"div",1),r.Sb(3,"div",2),r.Sb(4,"div",1),r.Bc(5,q,4,0,"div",3),r.Bc(6,ee,15,8,"div",4),r.Rb(),r.Rb(),r.Rb(),r.Rb()),2&e&&(r.Ab(5),r.mc("ngIf",t.isFetching),r.Ab(1),r.mc("ngIf",!t.isFetching))},directives:[b.a,p.l,K.a,g.p,g.i,g.j,g.c,g.h,g.k,W.a],pipes:[p.d],styles:["#game-spinner[_ngcontent-%COMP%]{margin-top:100px}.puzzle-container[_ngcontent-%COMP%]{margin-top:100px;margin-bottom:50px;border-radius:10px;background-color:#333;padding:20px 40px}.puzzle-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#00b300;padding:10px 0 30px;text-align:center}.puzzle[_ngcontent-%COMP%]{width:80%;display:block;margin:20px auto;padding:20px;background-color:#444;color:#f0fff0;border:2px solid #00b300;border-radius:10px;font-size:17px}.puzzle[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding-bottom:20px}#date[_ngcontent-%COMP%]{float:right}#no-rating[_ngcontent-%COMP%], .puzzle-info[_ngcontent-%COMP%]{color:#00b300}.puzzle-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .puzzle-item[_ngcontent-%COMP%]{color:#f0fff0}.puzzle-item[_ngcontent-%COMP%]{padding:20px;margin:20px auto;background-color:#444;border:2px solid #00b300;border-radius:10px;font-size:18px}.puzzle-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50%;height:auto;display:block;margin:10px auto}button[_ngcontent-%COMP%]{float:right}#cancel-button[_ngcontent-%COMP%]:hover{background-color:#b22222;color:#f0fff0}.answer-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#f0fff0;margin-right:20px}.answer-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:inline-block;width:300px;text-align:left}.answer-btn-div[_ngcontent-%COMP%]{display:inline}#incorrect-message[_ngcontent-%COMP%]{margin-top:20px;padding:10px;color:#f0fff0;background-color:#b22222;border-radius:10px}#check-button[_ngcontent-%COMP%]{margin-right:10px}.rating-box[_ngcontent-%COMP%]{color:#f0fff0}.rating-box[_ngcontent-%COMP%], .rating-stars[_ngcontent-%COMP%]{text-align:center}.rating-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{float:none;margin:30px auto 20px}.preserve-newline[_ngcontent-%COMP%]{white-space:pre-wrap}#solution-error[_ngcontent-%COMP%]{margin:20px auto;width:80%}@media only screen and (max-width:1024px){.puzzle-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:65%}}@media only screen and (max-width:600px){.puzzle-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80%}.answer-btn-div[_ngcontent-%COMP%]{padding:20px 0;display:block}#incorrect-message[_ngcontent-%COMP%]{margin-top:30px}}@media only screen and (max-width:300px){.puzzle-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:95%}}.star[_ngcontent-%COMP%]{font-size:1.5rem;color:#f0fff0}.filled[_ngcontent-%COMP%]{color:#00b300}"]}),e})(),pathMatch:"full"},{path:":id/comments",canActivate:[o.a],component:j}]}];let ne=(()=>{class e{}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(t){return new(t||e)},imports:[[i.f.forChild(te)],i.f]}),e})();var ie=n("ovet");let oe=(()=>{class e{}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(t){return new(t||e)},imports:[[ie.a,ne]]}),e})()}}]);