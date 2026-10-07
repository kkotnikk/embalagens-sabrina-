'use strict';
const categories={
 embalagens:{index:'01 / 05',photo:9,kicker:'PRATICIDADE QUE ACOMPANHA VOCÊ',title:'Uma boa ideia<br>merece uma boa embalagem.',description:'Recipientes, marmitas, copos e descartáveis para servir, transportar e organizar. Soluções para o seu negócio e para o dia a dia.',tags:['Marmitas','Copos','Recipientes','Descartáveis'],name:'embalagens e descartáveis',alt:'Estoque de recipientes e embalagens descartáveis'},
 festas:{index:'02 / 05',photo:12,kicker:'CADA DETALHE ENTRA NA FESTA',title:'A sua próxima festa<br>começa por aqui.',description:'Artigos para festas, decoração e acessórios para deixar cada comemoração com a sua cara. Explore os temas e consulte as opções disponíveis.',tags:['Decoração','Temas','Acessórios','Festas'],name:'artigos para festas',alt:'Prateleira com artigos coloridos e temáticos para festas'},
 confeitaria:{index:'03 / 05',photo:10,kicker:'DA RECEITA AO TOQUE FINAL',title:'Para quem cria<br>coisas deliciosas.',description:'Ingredientes e acessórios de confeitaria para preparar receitas, finalizar doces e caprichar na apresentação. Conte com a loja para encontrar o que precisa.',tags:['Ingredientes','Confeitaria','Recheios','Acessórios'],name:'produtos de confeitaria',alt:'Prateleiras de ingredientes e produtos de confeitaria'},
 papeis:{index:'04 / 05',photo:8,kicker:'ORGANIZE. PROTEJA. TRANSFORME.',title:'Mais possibilidades<br>em cada material.',description:'Papéis, materiais em rolo e sacos para os usos do dia a dia. Fale com a equipe para escolher o material, o tamanho e a quantidade adequados.',tags:['Materiais em rolo','Papéis','Sacos','Organização'],name:'papéis, materiais em rolo e sacos',alt:'Materiais em rolo de diferentes cores na loja'},
 paes:{index:'05 / 05',photo:14,kicker:'O SEU LANCHE COMEÇA AQUI',title:'O começo de<br>um bom lanche.',description:'Pães para hambúrguer e hot dog para o seu negócio, evento ou receita em casa. Consulte marcas, tamanhos e disponibilidade com a loja.',tags:['Hambúrguer','Hot dog','Lanches'],name:'pães para hambúrguer e hot dog',alt:'Pães embalados para preparar lanches'}
};
const imageWidths={"1": 1280, "2": 1280, "3": 680, "4": 1280, "5": 1101, "6": 1280, "7": 785, "8": 706, "9": 1280, "10": 1280, "11": 1280, "12": 1280, "13": 1280, "14": 664, "15": 1160};
const photos=[
 {id:1,title:"Doces para compartilhar",description:"Potes de doces e paçocas para complementar a mesa da festa.",label:'Ingredientes para confeitaria',category:'confeitaria'},
 {id:2,title:"A mesa também celebra",description:"Pratos, copos e talheres em diferentes cores e estampas.",label:'Pratos e acessórios para festas',category:'festas'},
 {id:3,title:"O tema ganha vida",description:"Acessórios temáticos para combinar os detalhes da comemoração.",label:'Detalhes para a sua festa',category:'festas'},
 {id:4,title:"Praticidade em cada copo",description:"Copos e recipientes descartáveis para servir suas bebidas.",label:'Copos e descartáveis',category:'embalagens'},
 {id:5,title:"Uma festa de arrepiar",description:"Decoração de Halloween para transformar o ambiente.",label:'Decoração para Halloween',category:'festas'},
 {id:6,title:"Pronto para servir",description:"Descartáveis e acessórios para organizar festas e o dia a dia.",label:'Opções para servir e preparar',category:'embalagens'},
 {id:7,title:"Organização sem complicação",description:"Sacos em diferentes capacidades para as necessidades da rotina.",label:'Sacos para o dia a dia',category:'papeis'},
 {id:8,title:"Cor para suas ideias",description:"Materiais em rolo para embalar, decorar e criar composições.",label:'Cores e materiais em rolo',category:'papeis'},
 {id:9,title:"Cada preparo, uma embalagem",description:"Marmitas e bandejas para acomodar e transportar alimentos.",label:'Recipientes e embalagens',category:'embalagens'},
 {id:10,title:"O sabor do detalhe",description:"Cremes, chocolates e complementos para receitas e sobremesas.",label:'Recheios e ingredientes',category:'confeitaria'},
 {id:11,title:"Confeitaria em todas as etapas",description:"Chocolates, coberturas e ingredientes para preparar e finalizar.",label:'Um corredor de possibilidades',category:'confeitaria'},
 {id:12,title:"A comemoração começa aqui",description:"Artigos de festas para escolher o tema e combinar acessórios.",label:'Temas e artigos para festas',category:'festas'},
 {id:13,title:"Proteção sob medida",description:"Sacos plásticos em diferentes formatos para embalar e organizar.",label:'Embalagens de diferentes tamanhos',category:'embalagens'},
 {id:14,title:"O começo de um bom hot dog",description:"Pães embalados para preparar lanches em casa ou no seu negócio.",label:'Pães para lanches',category:'paes'},
 {id:15,title:"Seu hambúrguer começa aqui",description:"Pães para hambúrguer para completar a receita do seu lanche.",label:'Pães para hambúrguer',category:'paes'}
];
const categoryLabels={embalagens:'Embalagens',festas:'Festas',confeitaria:'Confeitaria',papeis:'Papéis & sacos',paes:'Pães'};
const imagePath=id=>`assets/photo-${String(id).padStart(2,'0')}.webp?rev=2`;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,reducedMotion?0:ms));
const imageLoads=new Map();
function loadImage(src){
 if(imageLoads.has(src))return imageLoads.get(src);
 const image=new Image();image.decoding='async';image.src=src;
 const promise=image.decode().then(()=>image).catch(error=>{imageLoads.delete(src);throw error;});
 imageLoads.set(src,promise);return promise;
}
const responsiveLoads=new Map();
function prepareCategoryImage(id){
 const key=id+'-'+Math.ceil(innerWidth*devicePixelRatio/640);
 if(responsiveLoads.has(key))return responsiveLoads.get(key);
 const image=new Image();image.decoding='async';image.fetchPriority='low';
 image.sizes='(max-width:760px) calc(100vw - 44px), 86vw';
 image.srcset=`${imagePath(id).replace('.webp','-small.webp')} 640w, ${imagePath(id)} ${imageWidths[id]}w`;
 image.src=imagePath(id).replace('.webp','-small.webp');
 const promise=image.decode().then(()=>image).catch(error=>{responsiveLoads.delete(key);throw error;});
 responsiveLoads.set(key,promise);return promise;
}
function animateElement(element,frames,duration=650){
 if(reducedMotion||typeof element.animate!=='function')return null;
 return element.animate(frames,{duration,easing:'cubic-bezier(.22,1,.36,1)'});
}
let categoryRequest=0,activeCategory='embalagens',categoryEffects=[];
const categoryButtons=[...document.querySelectorAll('[data-category]')];
function selectCategoryButton(key){categoryButtons.forEach(button=>{const active=button.dataset.category===key;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
categoryButtons.forEach(button=>button.addEventListener('click',async()=>{
 if(button.classList.contains('active'))return;
 const request=++categoryRequest,key=button.dataset.category,data=categories[key],stage=document.getElementById('universe-stage');
 selectCategoryButton(key);stage.setAttribute('aria-busy','true');
 let prepared;try{prepared=await prepareCategoryImage(data.photo);}catch{if(request===categoryRequest){selectCategoryButton(activeCategory);stage.removeAttribute('aria-busy');}return;}
 if(request!==categoryRequest)return;
 categoryEffects.forEach(animation=>animation?.cancel());categoryEffects=[];
 document.querySelectorAll('.category-outgoing').forEach(image=>image.remove());
 const image=document.getElementById('category-image'),previous=image.cloneNode(false);
 previous.removeAttribute('id');previous.alt='';previous.setAttribute('aria-hidden','true');previous.className='category-outgoing';image.parentElement.append(previous);
 image.srcset=prepared.srcset;image.sizes=prepared.sizes;image.src=prepared.src;image.alt=data.alt;
 document.getElementById('category-number').textContent=data.index;
 document.getElementById('category-kicker').textContent=data.kicker;
 document.getElementById('category-title').innerHTML=data.title;
 document.getElementById('category-description').textContent=data.description;
 const outgoing=animateElement(previous,[{opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX(-18px)'}]);
 categoryEffects.push(outgoing,animateElement(image,[{opacity:0,transform:'translateX(18px) scale(1.025)'},{opacity:1,transform:'translateX(0) scale(1)'}]),animateElement(document.querySelector('.image-caption'),[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],550),animateElement(document.querySelector('.universe-detail'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],550));
 if(outgoing)outgoing.finished.catch(()=>{}).finally(()=>previous.remove());else previous.remove();
 activeCategory=key;stage.removeAttribute('aria-busy');
}));
const preloadCategories=()=>Object.values(categories).forEach(data=>prepareCategoryImage(data.photo).catch(()=>{}));
if('IntersectionObserver' in window){const preloadObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){preloadCategories();preloadObserver.disconnect();}},{rootMargin:'250px'});preloadObserver.observe(document.querySelector('.universe-main'));}
let visiblePhotos=photos.slice(),currentPhoto=0,galleryRequest=0;
const gallery=document.getElementById('gallery');
function renderGallery(){gallery.replaceChildren(...visiblePhotos.map((photo,i)=>{
 const button=document.createElement('button');button.type='button';button.className='gallery-item';button.style.animationDelay=`${Math.min(i,5)*45}ms`;button.setAttribute('aria-label',`Ampliar foto: ${photo.label}`);
 const figure=document.createElement('span'),image=document.createElement('img'),label=document.createElement('span'),title=document.createElement('span'),category=document.createElement('small');
 figure.className='gallery-picture';image.loading='lazy';image.decoding='async';image.sizes='(max-width:560px) calc(100vw - 44px), (max-width:980px) 43vw, 28vw';image.srcset=`${imagePath(photo.id).replace('.webp','-small.webp')} 640w, ${imagePath(photo.id)} ${imageWidths[photo.id]}w`;image.src=imagePath(photo.id).replace('.webp','-small.webp');image.alt=photo.label;image.width=900;image.height=675;
 category.className='gallery-badge';category.textContent=categoryLabels[photo.category];
 const number=document.createElement('span');number.className='gallery-number';number.textContent=String(photo.id).padStart(2,'0');number.setAttribute('aria-hidden','true');figure.append(image,category,number);
 label.className='gallery-label';title.className='gallery-title';title.textContent=photo.title;
 const description=document.createElement('span');description.className='gallery-description';description.textContent=photo.description;
 const action=document.createElement('span'),actionText=document.createElement('span');action.className='gallery-action';actionText.textContent='Ver de perto';action.append(actionText);
 label.append(title,description,action);button.append(figure,label);
 button.addEventListener('pointerenter',()=>loadImage(imagePath(photo.id)).catch(()=>{}),{once:true});button.addEventListener('focus',()=>loadImage(imagePath(photo.id)).catch(()=>{}),{once:true});button.addEventListener('click',()=>{currentPhoto=i;updateLightbox(0,true);document.getElementById('lightbox').showModal();document.body.classList.add('modal-open');});return button;
}));}
renderGallery();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',async()=>{
 if(button.classList.contains('active'))return;
 const request=++galleryRequest;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 gallery.classList.add('changing');await wait(220);if(request!==galleryRequest)return;
 visiblePhotos=photos.filter(p=>button.dataset.filter==='all'||p.category===button.dataset.filter);renderGallery();gallery.classList.remove('changing');
}));
const lightbox=document.getElementById('lightbox');
let lightboxRequest=0,lightboxEffects=[];
function describeLightbox(photo){
 const image=document.getElementById('lightbox-image');image.alt=photo.label;image.style.clipPath=photo.id===3?'inset(0 0 14% 0)':photo.id===5?'inset(0 2% 0 0)':'none';
 document.getElementById('lightbox-caption').textContent=photo.label;document.getElementById('lightbox-count').textContent=`${currentPhoto+1} / ${visiblePhotos.length}`;
}
async function updateLightbox(direction=0,opening=false){
 const request=++lightboxRequest,photo=visiblePhotos[currentPhoto],image=document.getElementById('lightbox-image');
 lightbox.setAttribute('aria-busy','true');
 if(opening){image.src=imagePath(photo.id).replace('.webp','-small.webp');describeLightbox(photo);}
 try{await loadImage(imagePath(photo.id));}catch{if(request===lightboxRequest)lightbox.removeAttribute('aria-busy');return;}
 if(request!==lightboxRequest||!lightbox.open)return;
 lightboxEffects.forEach(animation=>animation?.cancel());lightboxEffects=[];
 lightbox.querySelectorAll('.lightbox-outgoing').forEach(previous=>previous.remove());
 const previous=image.cloneNode(false);previous.removeAttribute('id');previous.alt='';previous.setAttribute('aria-hidden','true');previous.className='lightbox-outgoing';image.parentElement.append(previous);
 image.src=imagePath(photo.id);describeLightbox(photo);
 const distance=direction===0?0:direction*24;
 const outgoing=animateElement(previous,[{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-distance}px)`}],500);
 lightboxEffects.push(outgoing,animateElement(image,[{opacity:0,transform:`translateX(${distance}px) scale(1.015)`},{opacity:1,transform:'translateX(0) scale(1)'}],600),animateElement(document.getElementById('lightbox-caption'),[{opacity:0},{opacity:1}],400));
 if(outgoing)outgoing.finished.catch(()=>{}).finally(()=>previous.remove());else previous.remove();
 lightbox.removeAttribute('aria-busy');
 for(const step of [-1,1]){const neighbor=visiblePhotos[(currentPhoto+step+visiblePhotos.length)%visiblePhotos.length];loadImage(imagePath(neighbor.id)).catch(()=>{});}
}
function stepPhoto(step){currentPhoto=(currentPhoto+step+visiblePhotos.length)%visiblePhotos.length;updateLightbox(step);}
document.getElementById('previous-photo').addEventListener('click',()=>stepPhoto(-1));document.getElementById('next-photo').addEventListener('click',()=>stepPhoto(1));document.getElementById('close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('close',()=>{lightboxRequest++;lightboxEffects.forEach(animation=>animation?.cancel());lightbox.querySelectorAll('.lightbox-outgoing').forEach(image=>image.remove());lightbox.removeAttribute('aria-busy');document.body.classList.remove('modal-open');});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();stepPhoto(-1);}if(e.key==='ArrowRight'){e.preventDefault();stepPhoto(1);}});
lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();}});
const menu=document.querySelector('.menu-toggle'),navigation=document.getElementById('navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
const header=document.querySelector('.site-header');addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
if(!reducedMotion&&matchMedia('(hover: hover)').matches){const hero=document.querySelector('.hero'),floats=[...document.querySelectorAll('.floating-photo')];let frame=0;hero.addEventListener('pointermove',event=>{if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;floats.forEach((el,i)=>{const strength=i%2?14:-14;el.style.transform=`translate(${x*strength}px,${y*strength}px) rotate(var(--rotation))`;});});});hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);floats.forEach(el=>el.style.transform='rotate(var(--rotation))');});}
document.getElementById('year').textContent=String(new Date().getFullYear());

const reserveArea=document.getElementById('reserva');
if(reserveArea&&!reducedMotion&&matchMedia('(hover: hover) and (pointer: fine)').matches){
 let reserveFrame=0;
 reserveArea.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse')return;
  cancelAnimationFrame(reserveFrame);
  const pointerX=event.clientX,pointerY=event.clientY;
  reserveFrame=requestAnimationFrame(()=>{
   const bounds=reserveArea.getBoundingClientRect();
   const x=Math.max(-.5,Math.min(.5,(pointerX-bounds.left)/bounds.width-.5));
   const y=Math.max(-.5,Math.min(.5,(pointerY-bounds.top)/bounds.height-.5));
   reserveArea.style.setProperty('--reserve-x',`${x*16}px`);
   reserveArea.style.setProperty('--reserve-y',`${y*12}px`);
   reserveArea.style.setProperty('--reserve-turn',`${x*5}deg`);
  });
 });
 reserveArea.addEventListener('pointerleave',()=>{
  cancelAnimationFrame(reserveFrame);
  ['--reserve-x','--reserve-y','--reserve-turn'].forEach(property=>reserveArea.style.removeProperty(property));
 });
}
