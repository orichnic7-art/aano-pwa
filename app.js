const services=[
 {id:"buy",name:"Buy For Me",bn:"আমার হয়ে কিনুন",desc:"দোকান থেকে কেনাকাটা",icon:"🛍️"},
 {id:"pickup",name:"Pick & Drop",bn:"পিকআপ ও ড্রপ",desc:"এক জায়গা থেকে অন্য জায়গায়",icon:"📦"},
 {id:"errand",name:"Personal Errands",bn:"ব্যক্তিগত কাজ",desc:"দৈনন্দিন ছোটখাটো কাজ",icon:"✦"},
 {id:"docs",name:"Documents",bn:"ডকুমেন্ট",desc:"কাগজপত্র পৌঁছে দিন",icon:"📄"},
 {id:"express",name:"Express Delivery",bn:"এক্সপ্রেস ডেলিভারি",desc:"জরুরি ডেলিভারি",icon:"⚡"},
 {id:"custom",name:"Custom Request",bn:"নিজের মতো রিকোয়েস্ট",desc:"আপনার প্রয়োজন লিখুন",icon:"＋"}
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let orders=JSON.parse(localStorage.getItem("aano_orders")||"[]");
let saved=JSON.parse(localStorage.getItem("aano_saved")||"[]");
let activeFilter="all";
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function save(){localStorage.setItem("aano_orders",JSON.stringify(orders));localStorage.setItem("aano_saved",JSON.stringify(saved))}
function serviceCard(s){return `<article class="service-card"><button class="heart ${saved.includes(s.id)?"saved":""}" data-save="${s.id}" aria-label="পছন্দে রাখুন">${saved.includes(s.id)?"♥":"♡"}</button><div class="service-icon">${s.icon}</div><b>${s.bn}</b><small>${s.desc}</small><button class="card-hit" data-service="${s.id}" aria-label="${s.bn}"></button></article>`}
function renderServices(){ $("#serviceGrid").innerHTML=services.map(serviceCard).join(""); $("#savedList").innerHTML=services.filter(s=>saved.includes(s.id)).map(serviceCard).join("")||'<div class="empty" style="grid-column:1/-1">এখনো কোনো সার্ভিস পছন্দের তালিকায় নেই।</div>'; }
function renderOrders(target,filter="all"){let list=filter==="all"?orders:orders.filter(o=>filter==="done"?o.status==="done":o.status!=="done");$(target).innerHTML=list.length?list.slice().reverse().map(o=>`<div class="order-card"><div class="order-symbol">${services.find(s=>s.id===o.service)?.icon||"✦"}</div><div class="order-info"><b>${o.serviceName}</b><small>${o.id} · ${o.date}</small><small>${o.details.slice(0,48)}</small></div><span class="status ${o.status==="done"?"done":""}">${o.status==="done"?"সম্পন্ন":"রিভিউ"}</span></div>`).join(""):'<div class="empty">এখনো কোনো রিকোয়েস্ট নেই। নতুন রিকোয়েস্ট দিতে + বাটনে চাপ দিন।</div>'}
function renderAll(){renderServices();renderOrders("#homeOrders");renderOrders("#allOrders",activeFilter)}
function openModal(id){$("#modalBackdrop").classList.remove("hidden");$("#serviceSelect").innerHTML=services.map(s=>`<option value="${s.id}">${s.bn}</option>`).join("");if(id)$("#serviceSelect").value=id}
function closeModal(){$("#modalBackdrop").classList.add("hidden")}
function tab(name){$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));["app","activityPage","savedPage","accountPage"].forEach((id,i)=>$("#"+id).classList.toggle("hidden",["home","activity","saved","account"][i]!==name));window.scrollTo({top:0,behavior:"smooth"})}
document.addEventListener("click",e=>{
 const saveBtn=e.target.closest("[data-save]");if(saveBtn){let id=saveBtn.dataset.save;saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];save();renderServices();toast(saved.includes(id)?"পছন্দের তালিকায় যোগ হয়েছে":"পছন্দের তালিকা থেকে সরানো হয়েছে");return}
 const svc=e.target.closest("[data-service]");if(svc){openModal(svc.dataset.service);return}
 const action=e.target.closest("[data-action]")?.dataset.action;if(action==="new-order"){openModal();return}if(action==="all-services"){toast("সব সার্ভিস এখানে দেখানো হয়েছে");return}
 const t=e.target.closest("[data-tab]")?.dataset.tab;if(t)tab(t);
 const f=e.target.closest("[data-filter]");if(f){activeFilter=f.dataset.filter;$$(".filter").forEach(x=>x.classList.toggle("active",x===f));renderOrders("#allOrders",activeFilter)}
});
$("#closeModal").onclick=closeModal;$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
$("#requestForm").addEventListener("submit",e=>{e.preventDefault();let id="AN-"+String(Date.now()).slice(-6),service=services.find(s=>s.id===$("#serviceSelect").value);orders.push({id,service:service.id,serviceName:service.bn,details:$("#detailsInput").value,pickup:$("#pickupInput").value,drop:$("#dropInput").value,name:$("#nameInput").value,phone:$("#phoneInput").value,date:new Date().toLocaleDateString("bn-BD"),status:"pending"});save();renderAll();e.target.reset();closeModal();toast("রিকোয়েস্টটি এই ডিভাইসে সেভ হয়েছে");tab("activity")});
$("#searchInput").addEventListener("input",e=>{let q=e.target.value.trim().toLowerCase(),box=$("#searchResults");if(!q){box.classList.add("hidden");return}let matches=services.filter(s=>(s.bn+s.name+s.desc).toLowerCase().includes(q));box.innerHTML=matches.length?matches.map(s=>`<div class="search-result" data-service="${s.id}">${s.icon} &nbsp;${s.bn} — ${s.desc}</div>`).join(""):'<div class="search-result">মিল পাওয়া যায়নি। নিজের মতো রিকোয়েস্ট দিন।</div>';box.classList.remove("hidden")});
$("#clearSearch").onclick=()=>{$("#searchInput").value="";$("#searchResults").classList.add("hidden")};
$("#locationBtn").onclick=()=>toast("লোকেশন নির্বাচন পরবর্তী সংস্করণে যুক্ত হবে");
$("#editProfile").onclick=()=>toast("প্রোফাইল সেটআপের জন্য লগইন সংযোগ প্রয়োজন");
$("#languageBtn").onclick=()=>toast("বাংলা বর্তমানে নির্বাচিত");
let notif=true;$("#notifBtn").onclick=()=>{notif=!notif;$("#notifStatus").textContent=notif?"চালু":"বন্ধ";toast(notif?"নোটিফিকেশন চালু":"নোটিফিকেশন বন্ধ")};
$("#helpBtn").onclick=()=>toast("সাপোর্ট চ্যানেল এখনো সংযুক্ত নয়");
$("#aboutBtn").onclick=()=>toast("AANO Preview v2.0 · আপনার দরকার, আমাদের দায়িত্ব।");
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
renderAll();
