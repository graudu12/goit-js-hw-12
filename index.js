import{a as C,i as n,S as m}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&f(p)}).observe(document,{childList:!0,subtree:!0});function l(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function f(e){if(e.ep)return;e.ep=!0;const a=l(e);fetch(e.href,a)}})();const g=async(o,t)=>{const l={params:{key:"48346866-c058c3d0a9dd0baa6305ede4b",q:o,page:t,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}};return C.get("https://pixabay.com/api/",l)},u=o=>`<li class="gallery-item">
  <a href="${o.largeImageURL}" class="gallery-link"><img src="${o.webformatURL}" alt="${o.tags}" width="360" class="gallery-img" loading="lazy"/></a>
  <ul class="gallery-info-list">
    <li>
      <h3>Likes</h3>
      <p>${o.likes}</p>
    </li>
    <li>
      <h3>Views</h3>
      <p>${o.views}</p>
    </li>
    <li>
      <h3>Comments</h3>
      <p>${o.comments}</p>
    </li>
    <li>
      <h3>Downloads</h3>
      <p>${o.downloads}</p>
    </li>
  </ul>
</li>`,L=document.querySelector(".search-form"),c=document.querySelector(".gallery");let h;const r=document.querySelector(".load-btn"),s=document.querySelector(".loader-container"),b=document.querySelector(".loader");let d="",i=1;r.style.display="none";s.style.display="none";const w=()=>{const{height:o}=h.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})},k=async o=>{if(b.classList.remove("bottom-loader"),s.style.display="block",r.style.display="none",c.innerHTML="",o.preventDefault(),d=o.currentTarget.elements.query.value.trim(),d===""){s.style.display="none",n.error({title:"",message:"Please complete the form",messageColor:"#fafafb",icon:"fas fa-keyboard",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"});return}try{i=1;const{data:t}=await g(d,i);if(console.log(t),t.total===0){c.innerHTML="",n.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fafafb",icon:"far fa-file-image",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"}),s.style.display="none",o.target.reset();return}const l=t.hits.map(e=>u(e)).join("");c.innerHTML=l,t.totalHits>0&i*15<t.totalHits&&(r.style.display="block",r.addEventListener("click",y)),new m(".gallery a",{captionsData:"alt",captions:!0,captionDelay:250}).refresh()}catch{n.error({message:"Something wrong",messageColor:"#fafafb",icon:"fas fa-exclamation-triangle",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"})}finally{s.style.display="none"}o.target.reset()},y=async o=>{s.style.display="flex",b.classList.add("bottom-loader"),r.style.display="none",r.removeEventListener("click",y);try{i++;const{data:t}=await g(d,i),l=t.hits.map(e=>u(e)).join("");c.insertAdjacentHTML("beforeend",l),h=c.firstChild,w(),new m(".gallery a",{captionsData:"alt",captions:!0,captionDelay:250}).refresh(),i*15>=t.totalHits?(r.style.display="none",r.removeEventListener("click",y),n.info({title:"",message:"We're sorry, but you've reached the end of search results.",messageColor:"#fafafb",icon:"fas fa-flag-checkered",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"})):r.style.display="block",r.addEventListener("click",y)}catch{n.error({message:"Something wrong",messageColor:"#fafafb",icon:"fas fa-exclamation-triangle",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"})}finally{s.style.display="none"}};L.addEventListener("submit",k);
//# sourceMappingURL=index.js.map
