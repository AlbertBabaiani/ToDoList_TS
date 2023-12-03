var O=Object.defineProperty;var D=(m,e,s)=>e in m?O(m,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):m[e]=s;var g=(m,e,s)=>(D(m,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();class N{constructor(e="",s="",c=!1){this.id=e,this.item=s,this.checked=c}}const S=class S{constructor(e=document.querySelector(".clear-completed")){this.btn=e}some(e){e.list.some(s=>s.checked)?this.btn.classList.add("shown-button"):this.btn.classList.remove("shown-button")}show(){this.btn.classList.add("shown-button")}hide(){this.btn.classList.remove("shown-button")}count(e){let s=0;return e.list.forEach(c=>{c.checked&&s++}),s}};g(S,"instance",new S);let L=S;const E=class E{constructor(e=[]){this._list=e}get list(){return this._list}load(){const e=localStorage.getItem("list_TS");if(typeof e!="string")return;JSON.parse(e).forEach(c=>{const t=new N(c.id,c.item,c.checked);E.instance.addItem(t)})}save(){localStorage.setItem("list_TS",JSON.stringify(this._list))}clearList(){this._list=[],this.save(),L.instance.hide()}addItem(e){this._list.push(e),this.save()}removeItem(e){this._list=this._list.filter(s=>s.id!==e),this.save()}updateItem(e,s){this._list.forEach(c=>{c.id===e&&(c.item=s,this.save())})}};g(E,"instance",new E);let w=E;const f=class f{constructor(e=document.getElementById("ToDo-List")){this.ul=e}clear(){this.ul.innerHTML=""}render(e){this.clear();const s=L.instance,c=document.getElementById("items-quantity");c.textContent=e.list.filter(n=>n.checked!==!0).length.toString();const t=document.querySelector(".delete-all");e.list.length?t.style.display="block":t.style.display="none",e.list.forEach(n=>{const r=document.createElement("li");r.className="task";const y=document.createElement("div"),h=document.createElement("div");y.className="task-block",h.className="task-block";const p=document.createElement("input");p.type="checkbox",p.id=n.id,p.checked=n.checked,p.addEventListener("click",()=>{n.checked=!n.checked,e.save(),n.checked&&s.show(),s.some(e),this.render(e)});const a=document.createElement("label");a.htmlFor=n.id,a.className="task-name",a.textContent=n.item,a.addEventListener("click",o=>{o.preventDefault(),a.classList.toggle("expanded")});function b(o,I,v){if(!o.value.length){e.removeItem(v),f.instance.render(e);return}I.forEach(u=>{var k,T,x;((k=u.querySelector("input"))==null?void 0:k.id.toString())===v&&(u.querySelector("label").style.display="block",(x=(T=u.querySelectorAll(".task-block")[0])==null?void 0:T.querySelector('input[type="text"]'))==null||x.remove(),u.classList.remove("selected"),e.updateItem(v,o.value),f.instance.render(e))})}a.addEventListener("dblclick",()=>{const o=document.createElement("input");o.type="text",o.value=n.item,o.classList.add("update-task"),o.textContent=n.item,r.classList.add("selected");const v=[...f.instance.ul.children];v.forEach(u=>{var k;((k=u.querySelector("input"))==null?void 0:k.id.toString())===n.id&&(u.querySelector("label").style.display="none",u.querySelectorAll(".task-block")[0].append(o),o.focus())}),o.addEventListener("blur",()=>{b(o,v,n.id)}),o.addEventListener("keyup",function(u){u.key==="Enter"&&b(o,v,n.id)})}),y.append(p,a);const i=document.createElement("button"),l=document.createElement("button"),d=document.querySelector(".clipBoard");i.type="button",l.type="button",i.title="Copy",l.title="Delete",i.innerHTML='<i class="fa-regular fa-copy"></i>',l.innerHTML='<i class="fa-solid fa-trash"></i>',i.addEventListener("click",()=>{navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(n.item),document.execCommand(n.item),d.classList.add("active-clipBoard"),setTimeout(function(){d.classList.remove("active-clipBoard")},1200)}),l.addEventListener("click",()=>{window.confirm("Do you want to delete this task?")&&(e.removeItem(n.id),r.classList.add("deleted-task"),setTimeout(function(){r.classList.remove("deleted-task"),f.instance.render(e)},500))}),h.append(i,l),r.append(y,h),this.ul.append(r),s.some(e)})}};g(f,"instance",new f);let q=f;function B(){const m=document.querySelector(".loader");m.style.display="none";const e=w.instance,s=q.instance,c=document.querySelector('[name="form"]'),t=c.querySelector("#new_task"),n=c.querySelector("#reset"),r=c.querySelector("#btn_add"),y=c.querySelector('[for="new_task"]'),h=L.instance;h.btn.addEventListener("click",function(){let i=h.count(e);window.confirm(`Do you want to delete ${i===1?"this item":"these items ("+i.toString()+")"}?`)&&([...s.ul.children].forEach(d=>{d.querySelector("input").checked&&(d.classList.add("deleted-task"),setTimeout(function(){d.classList.remove("deleted-task")},500))}),e.list.forEach(d=>{d.checked&&e.removeItem(d.id)}),setTimeout(()=>{s.render(e)},500)),h.some(e),h.btn.blur()});const p=document.querySelector(".delete-all");p.addEventListener("click",function(){window.confirm("Do you want to delete all items?")&&[...s.ul.children].forEach(l=>{l.classList.add("deleted-task"),setTimeout(function(){l.classList.remove("deleted-task"),e.clearList(),s.render(e)},500)}),p.blur()}),t.value="";function a(){t.value.trim().length?(t.classList.add("active-input"),y.classList.add("active-label")):(t.classList.remove("active-input"),y.classList.remove("active-label"))}t.addEventListener("change",a),t.addEventListener("input",a),t.addEventListener("blur",a),n.addEventListener("click",()=>{t.focus(),a()});function b(){r.blur();const i=t.value.trim();if(!i.length)return;const l=e.list.length?parseInt(e.list[e.list.length-1].id)+1:1,d=new N(l.toString(),i);e.addItem(d),s.render(e),t.value=""}c.addEventListener("submit",i=>{i.preventDefault(),b()}),r.addEventListener("click",b),e.load(),s.render(e)}document.addEventListener("DOMContentLoaded",B);