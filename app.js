const PRODUCTS = [
 {id:1,name:"Air Max Pulse",brand:"Nike",category:"Nike",price:68900,wholesale:59900,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",badge:"POPULAR"},
 {id:2,name:"Ultraboost Light",brand:"Adidas",category:"Adidas",price:74900,wholesale:65900,image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80",badge:"RUNNING"},
 {id:3,name:"Dunk Low Retro",brand:"Nike",category:"Nike",price:62900,wholesale:55900,image:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80",badge:"URBAN"},
 {id:4,name:"Forum Low",brand:"Adidas",category:"Adidas",price:57900,wholesale:49900,image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80",badge:"CLASSIC"},
 {id:5,name:"Air Force 1 Style",brand:"Nike",category:"Nike",price:69900,wholesale:60900,image:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=700&q=80",badge:"BEST SELLER"},
 {id:6,name:"Grand Court",brand:"Adidas",category:"Adidas",price:45900,wholesale:39900,image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80",badge:"EVERYDAY"},
 {id:7,name:"Street Runner",brand:"Urban",category:"Urbano",price:38900,wholesale:32900,image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80",badge:"NEW"},
 {id:8,name:"Retro Court",brand:"Urban",category:"Urbano",price:42900,wholesale:36900,image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80",badge:"LIMITED"}
];
const $ = s => document.querySelector(s);
const money = n => new Intl.NumberFormat("es-CR",{style:"currency",currency:"CRC",maximumFractionDigits:0}).format(n);
let cart = JSON.parse(localStorage.getItem("uk_cart")||"[]");
let user = JSON.parse(localStorage.getItem("uk_user")||"null");
let activeFilter="Todos";
function saveCart(){localStorage.setItem("uk_cart",JSON.stringify(cart));renderCart()}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function renderProducts(){
 let list=PRODUCTS.filter(p=>activeFilter==="Todos"||p.category===activeFilter);
 const sort=$("#sortSelect").value;if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><span class="product-badge">${p.badge}</span><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'"></div><div class="product-info"><span class="product-brand">${p.brand}</span><h3>${p.name}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">+ Agregar</button></div>${user?.role==="mayorista"?`<div class="wholesale-price">Precio mayorista referencial: ${money(p.wholesale)} · desde 6 unidades</div>`:""}</div></article>`).join("");
}
function addToCart(id){const found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({id,qty:1});saveCart();toast("Producto agregado a tu bolsa")}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+PRODUCTS.find(p=>p.id===x.id).price*x.qty,0);
 $("#cartCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#cartSubtotal").textContent=money(total);$("#checkoutTotal").textContent=money(total);
 $("#cartItems").innerHTML=cart.length?cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div class="cart-row"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${money(p.price)} c/u</small><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><button class="remove-item" data-remove="${p.id}">Quitar</button></div>`}).join(""):`<div class="empty-state">Tu bolsa está vacía.<br>Encuentra tu próximo par en el catálogo.</div>`;
}
function openPanel(panel){$("#overlay").classList.add("show");panel.classList.add("open")}
function closePanels(){$("#overlay").classList.remove("show");document.querySelectorAll(".drawer,.modal").forEach(x=>x.classList.remove("open"))}
function accountUI(){
 $("#accountLabel").textContent=user?user.name.split(" ")[0]:"Ingresar";
 if(user){
  $("#accountTitle").textContent="Mi cuenta";
  let admin=user.role==="admin";
  $("#accountContent").innerHTML=`<p><b>Hola, ${user.name}</b></p><p class="account-note">Perfil: ${user.role==="mayorista"?"Cliente mayorista":admin?"Administrador":"Cliente minorista"}</p>${admin?`<div class="admin-list"><h3>Pedidos recibidos en este navegador</h3>${(JSON.parse(localStorage.getItem("uk_orders")||"[]")).map(o=>`<article><b>${o.name}</b> · ${o.date}<br>${o.items} productos · ${money(o.total)}<br>${o.payment} · ${o.delivery}</article>`).join("")||"Todavía no hay pedidos."}<h3>Productos del catálogo</h3><p>Para editar productos, modifica el arreglo PRODUCTS en app.js.</p></div>`:`<p class="account-note">Puedes agregar productos al carrito y enviar tus pedidos desde esta cuenta.</p>`}<button class="btn btn-primary full" id="logoutBtn">Cerrar sesión</button>`;
  $("#logoutBtn").onclick=()=>{user=null;localStorage.removeItem("uk_user");accountUI();closePanels();renderProducts();toast("Sesión cerrada")};
 }else{
  $("#accountTitle").textContent="Accede a tu cuenta";
  $("#accountContent").innerHTML=`<div class="account-tabs"><button class="active" data-tab="login">Ingresar</button><button data-tab="register">Crear cuenta</button></div><form class="account-form" id="accountForm"><div id="registerFields" hidden><label>Nombre completo<input id="regName" placeholder="Tu nombre"></label><label>Tipo de perfil<select id="regRole"><option value="minorista">Cliente minorista</option><option value="mayorista">Cliente mayorista / negocio</option></select></label></div><label>Correo electrónico<input type="email" id="loginEmail" required placeholder="correo@ejemplo.com"></label><label>Contraseña<input type="password" id="loginPassword" required minlength="4" placeholder="Mínimo 4 caracteres"></label><button class="btn btn-primary full" type="submit" id="accountSubmit">Ingresar</button><p class="account-note">Demo local: las cuentas se guardan solo en este navegador. No uses contraseñas reales. El rol administrador requiere configurar el proyecto en app.js.</p></form>`;
  let mode="login";
  document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{mode=b.dataset.tab;document.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));$("#registerFields").hidden=mode!=="register";$("#accountSubmit").textContent=mode==="register"?"Crear cuenta":"Ingresar"});
  $("#accountForm").onsubmit=e=>{e.preventDefault();const email=$("#loginEmail").value.trim().toLowerCase(),pass=$("#loginPassword").value;let accounts=JSON.parse(localStorage.getItem("uk_accounts")||"[]");
   if(mode==="register"){if(accounts.some(a=>a.email===email)){toast("Ese correo ya está registrado");return}const a={name:$("#regName").value.trim()||"Cliente",email,pass,role:$("#regRole").value};accounts.push(a);localStorage.setItem("uk_accounts",JSON.stringify(accounts));user={name:a.name,email:a.email,role:a.role}}
   else{const a=accounts.find(a=>a.email===email&&a.pass===pass);if(!a){toast("Datos incorrectos o cuenta no registrada");return}user={name:a.name,email:a.email,role:a.role}}
   localStorage.setItem("uk_user",JSON.stringify(user));accountUI();renderProducts();closePanels();toast("Sesión iniciada");
  };
 }
}
$("#productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#sortSelect").onchange=renderProducts;
$("#cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty));item.qty+=Number(q.dataset.delta);if(item.qty<1)cart=cart.filter(x=>x!==item);saveCart()}if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));saveCart()}});
$("#cartBtn").onclick=()=>openPanel($("#cartDrawer"));
$("#accountBtn").onclick=()=>{accountUI();openPanel($("#accountModal"))};
$("#overlay").onclick=closePanels;document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closePanels);
$("#checkoutBtn").onclick=()=>{if(!cart.length){toast("Agrega productos antes de continuar");return}if(user){$("#checkoutName").value=user.name;$("#checkoutEmail").value=user.email}closePanels();openPanel($("#checkoutModal"))};
$("#checkoutForm").onsubmit=e=>{e.preventDefault();if(!cart.length)return;const total=cart.reduce((s,x)=>s+PRODUCTS.find(p=>p.id===x.id).price*x.qty,0);const orders=JSON.parse(localStorage.getItem("uk_orders")||"[]");orders.unshift({id:Date.now(),name:$("#checkoutName").value,phone:$("#checkoutPhone").value,email:$("#checkoutEmail").value,address:$("#checkoutAddress").value,delivery:$("#deliveryType").value,payment:$("#paymentMethod").value,total,items:cart.reduce((s,x)=>s+x.qty,0),date:new Date().toLocaleString("es-CR")});localStorage.setItem("uk_orders",JSON.stringify(orders));cart=[];saveCart();closePanels();e.target.reset();toast("Pedido guardado. Contacta al negocio para confirmar.");};
$("#inquiryForm").onsubmit=e=>{e.preventDefault();const req={type:$("#inquiryType").value,name:$("#inquiryName").value,contact:$("#inquiryContact").value,details:$("#inquiryDetails").value,date:new Date().toLocaleString("es-CR")};let arr=JSON.parse(localStorage.getItem("uk_inquiries")||"[]");arr.unshift(req);localStorage.setItem("uk_inquiries",JSON.stringify(arr));e.target.reset();$("#inquiryMessage").textContent="Solicitud guardada en este navegador. Configura un servicio de formularios para recibirla por correo.";toast("Solicitud registrada");};
document.querySelectorAll("[data-inquiry]").forEach(a=>a.addEventListener("click",()=>{const map={mayorista:"Precio mayorista",especial:"Pedido especial",personalizado:"Zapatos personalizados"};$("#inquiryType").value=map[a.dataset.inquiry]}));
$("#menuToggle").onclick=()=>$("#mainNav").classList.toggle("open");
document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"));
renderProducts();renderCart();accountUI();
