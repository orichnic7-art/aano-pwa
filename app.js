const modal=document.getElementById('modal'),serviceType=document.getElementById('serviceType');
function openRequest(service){serviceType.value=service||'Buy For Me';modal.classList.remove('hidden')}
document.getElementById('heroRequest').onclick=()=>openRequest('Buy For Me');
document.querySelectorAll('.service').forEach(b=>b.onclick=()=>openRequest(b.dataset.service));
document.getElementById('close').onclick=()=>modal.classList.add('hidden');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.add('hidden')});
const getOrders=()=>JSON.parse(localStorage.getItem('aano_demo_orders')||'[]');
function renderOrders(){const list=getOrders(),el=document.getElementById('orders');el.innerHTML=list.length?list.map(o=>`<article class="order-card"><span class="status">DEMO REQUEST · SAVED ON THIS DEVICE</span><br><b>${escapeHtml(o.service)}</b><p>${escapeHtml(o.details)}</p><small>${escapeHtml(o.pickup||'Pickup not set')} → ${escapeHtml(o.drop||'Delivery not set')}</small></article>`).join(''):'<div class="empty">▤<strong>Nothing here yet</strong>Your demo requests will appear here.</div>'}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
document.getElementById('requestForm').addEventListener('submit',e=>{e.preventDefault();const o={service:serviceType.value,details:document.getElementById('details').value,pickup:document.getElementById('pickup').value,drop:document.getElementById('drop').value,budget:document.getElementById('budget').value,notes:document.getElementById('notes').value};const arr=getOrders();arr.unshift(o);localStorage.setItem('aano_demo_orders',JSON.stringify(arr));e.target.reset();modal.classList.add('hidden');showTab('activity')});
function showTab(tab){document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelector('main').classList.toggle('hidden',tab!=='home');document.getElementById('activity').classList.toggle('hidden',tab!=='activity');document.getElementById('account').classList.toggle('hidden',tab!=='account');if(tab==='activity')renderOrders()}
document.querySelectorAll('.bottom button').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
document.getElementById('search').addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('.service').forEach(b=>b.classList.toggle('hidden',!b.innerText.toLowerCase().includes(q)))});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
