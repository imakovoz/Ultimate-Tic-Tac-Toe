!function(e){var t={};function r(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(o,a,function(t){return e[t]}.bind(null,a));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=class{constructor(){this.board=[null,null,null,null,null,null,null,null,null]}makeMove(e,t){this.board[t-1]=e}won(){return this.board[0]===this.board[4]===this.board[8]&&null!==this.board[4]||this.board[1]===this.board[4]===this.board[7]&&null!==this.board[4]||this.board[2]===this.board[4]===this.board[6]&&null!==this.board[4]||this.board[3]===this.board[4]===this.board[5]&&null!==this.board[4]?this.board[4]:this.board[6]===this.board[7]===this.board[8]&&null!==this.board[6]||this.board[0]===this.board[3]===this.board[6]&&null!==this.board[6]?this.board[6]:this.board[2]===this.board[5]===this.board[8]&&null!==this.board[0]||this.board[0]===this.board[1]===this.board[2]&&null!==this.board[2]?this.board[0]:!1===this.board.includes(null)&&"draw"}}},function(e,t,r){const o=r(0);e.exports=class{constructor(){this.game=[];let e=null;for(var t=0;t<9;t++)e=new o,this.game.push(e);this.lastMove=null,this.player="X"}availableMoves(){if(null===this.lastMove)return[0,1,2,3,4,5,6,7,8];if(!1===this.game[this.lastMove].won())return[this.lastMove];{let e=[];return this.game.forEach((t,r)=>{!1===t.won()&&e.push(r)}),e}}makeMove(e,t){this.game[e].makeMove(this.player,t),"X"===this.player?this.player="O":this.player="X",this.lastMove=t-1}}},function(e,t,r){const o=r(1);function a(e){const t=$("#game").data("game");let r=e.path[1].id.substring(3)/9,o=e.path[1].id.substring(3)%9;0===o&&(o=9,r-=1),t.makeMove(Math.floor(r),o),document.querySelectorAll(".box").forEach(e=>{var t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}),document.querySelector("#box"+e.path[1].id.substring(3)).className="box-filled","X"===t.player&&(document.querySelector("#box"+e.path[1].id.substring(3)+"> img").src="./assets/O.png"),document.querySelectorAll(".active").forEach((e,t)=>{e.className="board"}),t.availableMoves().forEach(e=>{boardEl=document.querySelector("#board"+(e+1)),boardEl.className="board active";let t=null;for(var r=1;r<10;r++)(t=document.querySelector("#box"+(9*e+r))).addEventListener("click",e=>a(e))})}document.addEventListener("DOMContentLoaded",function(e){const t=document.querySelector("#game");let r=null,n=null,l=null;for(var s=1;s<10;s++){(r=document.createElement("div")).id="board"+s,r.className="board";for(var i=1;i<10;i++)n=document.createElement("div"),l=document.createElement("img"),n.id="box"+(9*(s-1)+i),n.className="box",l.src="./assets/X.png",n.innerHTML+=l.outerHTML,r.innerHTML+=n.outerHTML;t.innerHTML+=r.outerHTML}document.querySelector("#start-button").addEventListener("click",e=>{let t=new o;$("#game").data("game",t);let r="null";t.availableMoves().forEach(e=>{(r=document.querySelector("#board"+(e+1))).className="board active";let t=null;for(var o=1;o<10;o++)(t=document.querySelector("#box"+(9*e+o))).addEventListener("click",e=>a(e))})})})}]);
//# sourceMappingURL=bundle.js.map