(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{CUZD:function(t,n,e){"use strict";e.r(n),e.d(n,"HomeModule",(function(){return w}));var o=e("tyNb"),c=e("MKys"),r=e("fXoL"),i=e("yKSu"),s=e("28vI"),a=e("Cd6q"),l=e("IRq2"),b=e("muhD"),d=e("ofXK"),g=e("6NWb"),u=e("vGip");function p(t,n){1&t&&(r.Sb(0,"div",4),r.Sb(1,"div",5),r.Sb(2,"span",6),r.Dc(3,"Loading..."),r.Rb(),r.Rb(),r.Rb())}const f=function(t){return{"disabled-chevron":t}};function h(t,n){if(1&t){const t=r.Tb();r.Sb(0,"div",7),r.Sb(1,"h1"),r.Dc(2,"Aj\xe1nl\xf3"),r.Rb(),r.Sb(3,"div"),r.Sb(4,"fa-icon",8),r.ec("click",(function(){return r.uc(t),r.gc().stepLeft()})),r.Rb(),r.Sb(5,"div",9),r.Sb(6,"h3"),r.Dc(7),r.Rb(),r.Sb(8,"p",10),r.Dc(9,"Kateg\xf3ria:"),r.Rb(),r.Sb(10,"p"),r.Dc(11),r.hc(12,"uppercase"),r.Rb(),r.Sb(13,"p",10),r.Dc(14,"Neh\xe9zs\xe9g:"),r.Rb(),r.Sb(15,"p"),r.Dc(16),r.hc(17,"uppercase"),r.Rb(),r.Sb(18,"p",11),r.Ob(19,"app-stars",12),r.Rb(),r.Sb(20,"button",13),r.Dc(21,"Megoldom!"),r.Rb(),r.Rb(),r.Sb(22,"fa-icon",14),r.ec("click",(function(){return r.uc(t),r.gc().stepRight()})),r.Rb(),r.Rb(),r.Rb()}if(2&t){const t=r.gc();r.Ab(4),r.mc("icon",t.faChevronLeft)("ngClass",r.pc(13,f,!t.isPrevious)),r.Ab(3),r.Ec(t.currentPuzzle.title),r.Ab(4),r.Fc("",r.ic(12,9,t.puzzleService.translateCategory(t.currentPuzzle.category))," "),r.Ab(5),r.Ec(r.ic(17,11,t.puzzleService.translateLevel(t.currentPuzzle.level))),r.Ab(3),r.mc("puzzle",t.currentPuzzle),r.Ab(1),r.oc("routerLink","/puzzles/",t.currentPuzzle.id,""),r.Ab(2),r.mc("icon",t.faChevronRight)("ngClass",r.pc(15,f,!t.isNext))}}let m=(()=>{class t{constructor(t){this.puzzleService=t,this.currentPuzzle=new s.a,this.isPrevious=!1,this.isNext=!0,this.isFetching=!0,this.faChevronLeft=l.faChevronLeft,this.faChevronRight=b.faChevronRight}ngOnInit(){this.puzzleService.getRandomPuzzles().subscribe(t=>{this.puzzles=t,this.currentPuzzle=t[0],this.isFetching=!1})}stepRight(){if(!this.isNext)return;const t=this.puzzles.indexOf(this.currentPuzzle);t<this.puzzles.length-1&&(this.currentPuzzle=this.puzzles[t+1],this.isPrevious=!0),t===this.puzzles.length-1&&(this.isNext=!1)}stepLeft(){if(!this.isPrevious)return;const t=this.puzzles.indexOf(this.currentPuzzle);t>0&&(this.currentPuzzle=this.puzzles[t-1],this.isNext=!0),0===t&&(this.isPrevious=!1)}}return t.\u0275fac=function(n){return new(n||t)(r.Nb(a.a))},t.\u0275cmp=r.Hb({type:t,selectors:[["app-random-puzzles"]],decls:4,vars:2,consts:[[1,"random-puzzle-container"],[1,"row"],["class","col-12",4,"ngIf"],["class","col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 random-puzzles",4,"ngIf"],[1,"col-12"],["role","status",1,"spinner-border","spinner"],[1,"sr-only"],[1,"col-12","col-sm-10","offset-sm-1","col-md-8","offset-md-2","random-puzzles"],[1,"fas","fa-chevron-left",3,"icon","ngClass","click"],[1,"random-puzzle"],[1,"puzzle-info"],[1,"rating"],[3,"puzzle"],["type","button",3,"routerLink"],[1,"fas","fa-chevron-right",3,"icon","ngClass","click"]],template:function(t,n){1&t&&(r.Sb(0,"div",0),r.Sb(1,"div",1),r.Bc(2,p,4,0,"div",2),r.Bc(3,h,23,17,"div",3),r.Rb(),r.Rb()),2&t&&(r.Ab(2),r.mc("ngIf",n.isFetching),r.Ab(1),r.mc("ngIf",!n.isFetching))},directives:[d.l,g.a,d.j,u.a,o.d],pipes:[d.r],styles:[".random-puzzle-container[_ngcontent-%COMP%]{margin-top:50px}.random-puzzle-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#00b300;padding:10px 0 30px;text-align:center}.random-puzzles[_ngcontent-%COMP%]{background-color:#333;padding:20px 20px 40px;position:relative;border-radius:10px}.random-puzzles[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%]{font-size:50px;color:#f0fff0;vertical-align:center;position:absolute;cursor:pointer}.fas.fa-chevron-left[_ngcontent-%COMP%]{top:50%;left:10%}.fas.fa-chevron-right[_ngcontent-%COMP%]{top:50%;right:10%}.random-puzzles[_ngcontent-%COMP%]   .fas.disabled-chevron[_ngcontent-%COMP%]{opacity:.3;cursor:default}.random-puzzle[_ngcontent-%COMP%]{width:50%;display:block;margin:0 auto;padding:20px;background-color:#444;color:#f0fff0;border:2px solid #00b300;border-radius:10px;text-align:center;font-size:17px}.puzzle-info[_ngcontent-%COMP%]{margin-top:25px;margin-bottom:5px;padding:0;color:#00b300}button[_ngcontent-%COMP%]{margin:20px auto 10px;padding:10px;background-color:#00b300;color:#333;font-weight:700;border-radius:10px;border:none;transition:background-color 1s}button[_ngcontent-%COMP%]:hover{background-color:#f0fff0}"]}),t})();var z=e("UZWx"),M=e("XPT/");const P=function(t){return{"logged-in-member":t}};function v(t,n){if(1&t&&(r.Sb(0,"tr",5),r.Sb(1,"td"),r.Dc(2),r.Rb(),r.Sb(3,"td"),r.Dc(4),r.Rb(),r.Sb(5,"td"),r.Dc(6),r.Rb(),r.Rb()),2&t){const t=n.$implicit,e=n.index,o=r.gc();r.mc("ngClass",r.pc(4,P,t.id===o.loggedInMember.id)),r.Ab(2),r.Fc("",e+1,"."),r.Ab(2),r.Ec(t.username),r.Ab(2),r.Fc("",t.score," pont")}}function C(t,n){if(1&t){const t=r.Tb();r.Sb(0,"button",6),r.ec("click",(function(){return r.uc(t),r.gc().toggleLeaderBoard()})),r.Dc(1,"Mutatsd mind!"),r.Rb()}}function O(t,n){if(1&t){const t=r.Tb();r.Sb(0,"button",6),r.ec("click",(function(){return r.uc(t),r.gc().toggleLeaderBoard()})),r.Dc(1,"Mutatsd a top 10-et!"),r.Rb()}}let S=(()=>{class t{constructor(t){this.memberService=t,this.areAllMembersShown=!1,this.loggedInMember=new z.a}ngOnInit(){this.memberService.getTopLeaderBoard().subscribe(t=>{this.membersToShow=t}),this.memberService.getLoggedInMemberProfile().subscribe(t=>{this.loggedInMember=t})}toggleLeaderBoard(){this.allMembers?(this.membersToShow=this.areAllMembersShown?this.allMembers.slice(0,10):this.allMembers,this.areAllMembersShown=!this.areAllMembersShown):this.loadFullLeaderBoard()}loadFullLeaderBoard(){this.memberService.getFullLeaderBoard().subscribe(t=>{this.allMembers=t,this.membersToShow=this.allMembers,this.areAllMembersShown=!0})}}return t.\u0275fac=function(n){return new(n||t)(r.Nb(M.a))},t.\u0275cmp=r.Hb({type:t,selectors:[["app-leaderboard"]],decls:18,vars:3,consts:[[1,"leaderboard-container"],[1,"row"],[1,"col-12","col-sm-10","offset-sm-1","col-md-8","offset-md-2","table-container"],[3,"ngClass",4,"ngFor","ngForOf"],["type","button",3,"click",4,"ngIf"],[3,"ngClass"],["type","button",3,"click"]],template:function(t,n){1&t&&(r.Sb(0,"div",0),r.Sb(1,"div",1),r.Sb(2,"div",2),r.Sb(3,"h2"),r.Dc(4,"Ranglista"),r.Rb(),r.Sb(5,"table"),r.Sb(6,"thead"),r.Sb(7,"tr"),r.Sb(8,"th"),r.Dc(9,"Rang"),r.Rb(),r.Sb(10,"th"),r.Dc(11,"Felhaszn\xe1l\xf3n\xe9v"),r.Rb(),r.Sb(12,"th"),r.Dc(13,"Pont"),r.Rb(),r.Rb(),r.Rb(),r.Sb(14,"tbody"),r.Bc(15,v,7,6,"tr",3),r.Rb(),r.Rb(),r.Bc(16,C,2,0,"button",4),r.Bc(17,O,2,0,"button",4),r.Rb(),r.Rb(),r.Rb()),2&t&&(r.Ab(15),r.mc("ngForOf",n.membersToShow),r.Ab(1),r.mc("ngIf",!n.areAllMembersShown),r.Ab(1),r.mc("ngIf",n.areAllMembersShown))},directives:[d.k,d.l,d.j],styles:['.table-container[_ngcontent-%COMP%]{margin:50px auto;padding:30px;background-color:#333;color:#00b300;font-size:17px;border-radius:10px}h2[_ngcontent-%COMP%]{text-align:center;margin:0 0 20px}table[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{width:100%;margin:0;padding:0}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{margin-bottom:20px}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:first-child{border-bottom:1px solid #00b300;color:#f0fff0}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]:before{content:"-";line-height:20px;display:block;color:transparent}.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:first-child{display:inline-block;width:20%;border-radius:10px 0 0 10px}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(2){display:inline-block;width:50%}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:inline-block;width:30%;border-radius:0 10px 10px 0;text-align:right}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd)   td[_ngcontent-%COMP%]{background-color:#444}.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.logged-in-member[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#f0fff0;color:#333}button[_ngcontent-%COMP%]{margin:20px auto 10px;padding:10px;background-color:#00b300;color:#333;font-weight:700;border-radius:10px;border:none;transition:background-color 1s}button[_ngcontent-%COMP%]:hover{background-color:#f0fff0}']}),t})();const _=[{path:"",canActivate:[c.a],component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Hb({type:t,selectors:[["app-home"]],decls:6,vars:0,consts:[[1,"container-fluid","home-container"],[1,"row"],[1,"col-12"]],template:function(t,n){1&t&&(r.Ob(0,"app-navbar"),r.Sb(1,"div",0),r.Sb(2,"div",1),r.Sb(3,"div",2),r.Ob(4,"app-random-puzzles"),r.Ob(5,"app-leaderboard"),r.Rb(),r.Rb(),r.Rb())},directives:[i.a,m,S],styles:[".home-container[_ngcontent-%COMP%]{margin-top:50px;height:calc(100% - 50px);padding:0}"]}),t})()}];let x=(()=>{class t{}return t.\u0275mod=r.Lb({type:t}),t.\u0275inj=r.Kb({factory:function(n){return new(n||t)},imports:[[o.f.forChild(_)],o.f]}),t})();var R=e("ovet");let w=(()=>{class t{}return t.\u0275mod=r.Lb({type:t}),t.\u0275inj=r.Kb({factory:function(n){return new(n||t)},imports:[[x,R.a]]}),t})()},IRq2:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=[],c="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z";n.definition={prefix:"fas",iconName:"chevron-left",icon:[320,512,o,"f053",c]},n.faChevronLeft=n.definition,n.prefix="fas",n.iconName="chevron-left",n.width=320,n.height=512,n.ligatures=o,n.unicode="f053",n.svgPathData=c},muhD:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=[],c="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z";n.definition={prefix:"fas",iconName:"chevron-right",icon:[320,512,o,"f054",c]},n.faChevronRight=n.definition,n.prefix="fas",n.iconName="chevron-right",n.width=320,n.height=512,n.ligatures=o,n.unicode="f054",n.svgPathData=c}}]);