'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const features = [
  {name:'AI 咨询与专业助手',title:'让专业信息，成为便捷的咨询服务。',description:'围绕不同人群和服务目标组织健康问答，支持持续追问与需求澄清，将 AI 助手放进品牌自己的服务场景。',bullets:['健康科普与多轮咨询','专业服务入口与 AI 助手'],image:'children-chat.webp',status:'养苗工程 · 应用示例',caption:'儿童青少年营养咨询场景'},
  {name:'多模态营养识别',title:'从一张照片，理解真实饮食。',description:'结合餐食图片与补充描述，整理食物、份量和营养参考，为专业团队开展膳食评估提供信息依据。',bullets:['餐食识别与营养估算','膳食记录与结构化信息'],image:'recognition.webp',status:'善搭膳 · 应用示例',caption:'食物营养识别与评估参考'},
  {name:'个性化方案辅助',title:'把健康需求，转化为具体安排。',description:'结合服务人群、饮食偏好与餐次要求，辅助准备营养方案与食谱，再由专业人员核对、调整并交付。',bullets:['食谱推荐、定制与菜品做法','方案审核与便捷分享'],image:'recipe.webp',status:'善搭膳 · 应用示例',caption:'七天食谱与方案分享场景'},
  {name:'健康记录与跟进',title:'连接每日记录与持续服务。',description:'围绕体重、饮食和生活方式组织日常记录，让服务团队回顾阶段变化，开展后续沟通与健康管理。',bullets:['日常记录与方案执行回顾','健康管理与阶段跟进'],image:'weight.webp',status:'瘦吧 · 应用示例',caption:'体重管理与生活方式记录'},
  {name:'专业知识与内容生成',title:'把专业知识，转化为服务能力。',description:'围绕知识学习、模拟沟通和图文视频创作，帮助团队准备服务内容与表达素材，支持培训与日常运营。',bullets:['在线培训与咨询模拟对练','AIGC 图文、海报与视频'],visual:'content',status:'能力流程示意 / 视频为生成实例',video:true,caption:'知识学习 → 场景练习 → 内容创作 → 审核分享'},
  {name:'产品集成与应用交付',title:'让 AI 能力，融入你的业务。',description:'根据服务场景组合小程序、管理端与相关业务系统，让专业团队、品牌和用户通过清晰的入口连接起来。',bullets:['小程序与专业服务入口','管理端与业务应用整合'],visual:'integration',status:'应用架构示意',caption:'服务入口 → AI 能力 → 专业团队与业务系统'},
];
const cases = [
  {id:'shandashan',name:'善搭膳',category:'nutrition',categoryName:'营养服务',label:'AI 营养服务',description:'从日常问答到识图、食谱与专业名片，连接用户和营养师。',image:'recipe.webp',detail:'以日常营养问题为入口，把食物营养识别、个性食谱与分享、营养师名片整合到使用流程中。',points:['AI 营养问答与餐食识别','食谱推荐、定制、做法与分享','专业名片与 AI 助手入口'],experience:true},
  {id:'seed',name:'养苗工程',category:'nutrition',categoryName:'营养服务',label:'儿童青少年营养',description:'连接儿童青少年营养科普内容与 AI 营养问答。',image:'children.webp',detail:'围绕儿童青少年营养知识与日常饮食问题，提供科普学习与 AI 营养问答相结合的服务场景。',points:['营养科普与学习内容','日常饮食问题交流','围绕儿童青少年需求组织内容']},
  {id:'shouba',name:'瘦吧',category:'weight',categoryName:'体重管理',label:'日常记录与持续服务',description:'围绕体重管理、日常记录与健康好物，让服务持续发生。',image:'shouba.webp',detail:'把体重管理场景中的饮食、生活方式与阶段变化连接起来，并通过日常健康好物等入口延伸服务。',points:['饮食与生活方式记录','体重与阶段变化回顾','健康好物与商城场景']},
  {id:'angel',name:'天使医生',category:'hospital',categoryName:'医院健康服务',label:'孕产健康管理',description:'面向孕产健康管理，连接专业信息与日常健康需求。',image:'angel-official-scene.jpg',imageMode:'brand',logo:'angel-official-logo.png',source:'https://www.angeldoctor.com/',detail:'以医院健康服务为应用场景，关注专业信息怎样被更清楚地理解，以及日常记录怎样为后续沟通提供参考。配图取自天使医生官方网站，用于品牌场景展示。',points:['健康科普与信息整理','日常健康管理服务场景','服务沟通与后续跟进']},
  {id:'yiyou',name:'医佑',category:'hospital',categoryName:'医院健康服务',label:'AI 健康管理场景',description:'围绕健康科普、日常管理与服务跟进，探索 AI 的具体应用。',image:'yiyou-scene.png',imageMode:'brand',detail:'结合专业团队的服务分工，把健康科普、信息整理和后续跟进放入清晰的工作流程中。配图沿用原 PPT，为 AI 生成的医院健康服务场景示意。',points:['面向专业团队的健康服务场景','专业信息与日常问题连接','持续沟通与服务入口']},
];
let selectedFeature = 0;
let caseFilter = 'hospital';
let lastFocus = null;
let brief = '';
const tabs = $('#feature-tabs');
features.forEach((feature,index) => {
  const tab = document.createElement('button');
  tab.type='button';tab.className='feature-tab';tab.role='tab';tab.id=`feature-tab-${index}`;
  tab.setAttribute('aria-controls','feature-detail');
  tab.dataset.feature=String(index);
  tab.innerHTML=`<span class="feature-index">${String(index+1).padStart(2,'0')}</span><span>${feature.name}</span>`;
  tabs.append(tab);
});
function showFeature(index, focus=false) {
  selectedFeature=index;
  const feature=features[index];
  $$('.feature-tab').forEach((tab,i) => {tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  const panel=$('#feature-detail');panel.setAttribute('aria-labelledby',`feature-tab-${index}`);
  panel.innerHTML=`<h3>${feature.title}</h3><p>${feature.description}</p><ul>${feature.bullets.map(x=>`<li>${x}</li>`).join('')}</ul>${feature.video?'<button class="text-button" data-open="video">观看 15 秒生成示例 <span aria-hidden="true">↗</span></button>':''}`;
  const visual=$('#capability-visual');
  visual.classList.toggle('content-capability',feature.visual==='content');
  visual.innerHTML=feature.visual==='integration'?`<div class="integration-diagram"><span class="diagram-kicker">CONNECTED HEALTH SERVICES</span><h3>属于你的品牌，<br>适合你的服务流程。</h3><div class="integration-entry"><span>小程序 / 用户端</span><span>专业工作台</span></div><div class="diagram-connector" aria-hidden="true">↓</div><div class="integration-core"><span>元概念 AI 能力</span><strong>咨询 · 识别 · 方案 · 跟进</strong></div><div class="diagram-connector" aria-hidden="true">↓</div><div class="integration-entry"><span>专业服务团队</span><span>相关业务系统</span></div><p>按场景组合，围绕业务交付。</p></div>`:feature.visual==='content'?`<div class="content-flow"><div class="flow-heading"><span class="flow-mark">AI</span><div><strong>知识与内容工作流</strong><small>面向专业团队与品牌运营</small></div></div><div class="flow-stages"><span>知识学习</span><b>→</b><span>模拟对练</span><b>→</b><span>素材创作</span></div><div class="content-video-preview"><img src="assets/video-poster.png" alt="代餐粉 AI 视频生成实例封面" width="900" height="1600"><div><small>AIGC 实例</small><strong>从原始素材<br>到一条短视频</strong><p>图文 · 海报 · 视频</p><button class="button button-small" data-open="video">播放实例 ↗</button></div></div><div class="flow-review"><span>专业人员审核</span><span>→</span><span>用于科普与服务</span></div></div>`:`<div class="product-phone"><img id="feature-image" src="assets/${feature.image}" alt="${feature.status}：${feature.name}" width="900" height="1800" loading="lazy"></div>`;
  $('#showcase-label').textContent=feature.name;$('#showcase-status').textContent=feature.status;$('#showcase-caption').textContent=feature.caption;
  if(focus)$(`#feature-tab-${index}`).focus();
}
tabs.addEventListener('click',event=>{const tab=event.target.closest('[data-feature]');if(tab)showFeature(Number(tab.dataset.feature));});
tabs.addEventListener('keydown',event=>{let index=selectedFeature;if(event.key==='ArrowRight'||event.key==='ArrowDown')index=(index+1)%features.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')index=(index+features.length-1)%features.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=features.length-1;else return;event.preventDefault();showFeature(index,true);});
showFeature(0);
const solutionStories = {
  hospital:{title:'把专业服务，延续到院外日常。',description:'围绕健康信息收集、膳食记录和随访沟通，为医院专业团队提供日常服务支持。',steps:['了解需求与建立档案','记录信息与辅助评估','专业审核与方案交付','院外随访与持续沟通']},
  nutrition:{title:'从一次咨询，到一份可执行的食谱。',description:'把营养咨询、餐食识别、食谱准备与分享衔接起来，由营养师结合实际情况审核与跟进。',steps:['接收咨询与了解饮食','识别餐食与整理信息','准备食谱与专业审核','分享交付与后续跟进']},
  weight:{title:'让每日行动，成为持续服务的依据。',description:'连接健康目标、饮食与生活方式记录，让用户与服务团队共同回顾执行情况与阶段变化。',steps:['了解目标与日常习惯','记录饮食与生活方式','执行方案与阶段回顾','专业沟通与服务调整']},
  all:{title:'不同场景，同样关注服务的连续性。',description:'医院、营养与健康管理领域的客户，将 AI 能力用于各自的产品与服务流程。',steps:['了解业务需求','组合产品能力','专业服务与方案交付','持续记录与沟通']}
};
function renderCases(filter='hospital') {
  caseFilter=filter;
  const story=solutionStories[filter]||solutionStories.hospital;
  $('#solution-context').innerHTML=`<div><h3>${story.title}</h3><p>${story.description}</p></div><ol>${story.steps.map((step,i)=>`<li><span>0${i+1}</span>${step}</li>`).join('')}</ol>`;
  const chosen=cases.filter(item=>filter==='all'||item.category===filter);
  $('#case-grid').innerHTML=chosen.map(item=>`<article class="case-item ${item.image?'':'case-hospital'}"><div class="case-visual ${item.imageMode==='brand'?'brand-visual':''}">${item.imageMode==='brand'?`<img class="case-brand-scene" src="assets/${item.image}" alt="${item.name}健康服务场景配图" width="2560" height="1800" loading="lazy"><div class="case-brand-logo">${item.logo?`<img src="assets/${item.logo}" alt="${item.name}官方标识" width="6667" height="1725">`:`<strong class="scene-wordmark">${item.name}</strong>`}</div><span class="official-image-note">${item.source?"官网品牌配图":"AI 场景示意"}</span>`:item.image?`<img src="assets/${item.image}" alt="${item.name}应用界面" width="900" height="1800" loading="lazy">`:`<span class="hospital-symbol" aria-hidden="true">＋</span><span class="case-wordmark">${item.name}</span><small>医院健康服务场景</small>`}</div><div class="case-topline"><span>${item.categoryName}</span><span>${item.label}</span></div><h3>${item.name}</h3><p>${item.description}</p><button class="case-open" data-case="${item.id}" aria-label="查看${item.name}应用场景">查看应用场景 <span aria-hidden="true">↗</span></button></article>`).join('');
  $$('.filter').forEach(button=>{const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  $('#case-grid').classList.toggle('single-case',chosen.length===1);
  $('#case-count').textContent=`${chosen.length} 个项目场景`;
}
renderCases('hospital');
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>renderCases(button.dataset.filter)));
$$('[data-case-filter]').forEach(link=>link.addEventListener('click',()=>renderCases(link.dataset.caseFilter)));
function showCase(id) {
  const item=cases.find(entry=>entry.id===id);if(!item)return;
  $('#case-dialog-content').innerHTML=`<p class="eyebrow">${item.categoryName} / APPLICATION SCENARIO</p><h2>${item.name}</h2><p>${item.description}</p><div class="case-detail-layout"><div><p>${item.detail}</p><ul>${item.points.map(p=>`<li>${p}</li>`).join('')}</ul>${item.experience?'<button class="text-button" data-switch="experience">扫码体验善搭膳 ↗</button>':'<a class="text-button" href="#cooperation" data-case-cooperate>讨论类似场景 ↗</a>'}<p class="case-project-note">具体功能范围按对应项目实际开放内容为准。</p></div>${item.imageMode==='brand'?`<figure class="official-visual">${item.logo?`<img src="assets/${item.logo}" alt="${item.name}官方标识">`:`<strong class="scene-wordmark">${item.name}</strong>`}<img src="assets/${item.image}" alt="${item.name}健康服务场景配图"><figcaption>${item.source?`<a href="${item.source}" target="_blank" rel="noopener noreferrer">图片来源：${item.name}官网 ↗</a>`:"沿用原 PPT 配图 · AI 场景示意"}</figcaption></figure>`:item.image?`<img src="assets/${item.image}" alt="${item.name}界面展示" width="900" height="1800">`:'<div class="case-visual case-hospital"><span class="case-wordmark">'+item.name+'</span></div>'}</div>`;
  openDialog('case');
}
function openDialog(name) {
  const dialog=$(`#${name}-dialog`);if(!dialog)return;
  lastFocus=document.activeElement;
  if(!dialog.open)dialog.showModal();
  document.body.style.overflow='hidden';
}
function closeDialog(dialog) {
  if(dialog.id==='video-dialog')$('video',dialog).pause();
  dialog.close();
}
$$('dialog').forEach(dialog=>{
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});
  dialog.addEventListener('close',()=>{if(!$$('dialog[open]').length)document.body.style.overflow='';if(dialog.id==='video-dialog')$('video',dialog).pause();if(lastFocus&&lastFocus.isConnected)lastFocus.focus();});
});
document.addEventListener('click',event=>{
  const open=event.target.closest('[data-open]');if(open)openDialog(open.dataset.open);
  const close=event.target.closest('[data-close]');if(close)closeDialog(close.closest('dialog'));
  const caseButton=event.target.closest('[data-case]');if(caseButton)showCase(caseButton.dataset.case);
  const switchButton=event.target.closest('[data-switch]');if(switchButton){closeDialog(switchButton.closest('dialog'));openDialog(switchButton.dataset.switch);}
  if(event.target.closest('[data-case-cooperate]'))closeDialog($('#case-dialog'));
});
const menu=$('.menu-toggle');
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));menu.setAttribute('aria-label',expanded?'打开导航':'关闭导航');$('#main-nav').classList.toggle('open',!expanded);});
$$('#main-nav a,#main-nav button').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开导航');$('#main-nav').classList.remove('open');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#main-nav').classList.remove('open');menu.setAttribute('aria-expanded','false');}});
$('#brief-form').addEventListener('submit',event=>{
  event.preventDefault();const form=new FormData(event.target);const need=String(form.get('need')||'').trim();if(!need){$('textarea',event.target).focus();return;}
  brief=`元概念 · 健康服务合作需求\n\n服务场景：${form.get('industry')}\n优先了解：${form.get('capability')}\n\n希望解决的问题：\n${need}\n\n下一步：结合服务对象、当前流程、所需功能与交付方式，讨论适用方案。`;
  $('#brief-text').textContent=brief;$('#brief-result').hidden=false;$('#brief-status').textContent='摘要已在本机生成，未向服务器提交。';$('#brief-result').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
$('#copy-brief').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(brief);$('#brief-status').textContent='已复制需求摘要。';}
  catch{const selection=getSelection();const range=document.createRange();range.selectNodeContents($('#brief-text'));selection.removeAllRanges();selection.addRange(range);$('#brief-status').textContent='文字已选中，可按 Ctrl+C 复制，或使用“下载文本”。';}
});
$('#download-brief').addEventListener('click',()=>{if(!brief)return;const url=URL.createObjectURL(new Blob(['\ufeff'+brief],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='元概念-健康服务合作需求.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);$('#brief-status').textContent='需求摘要已下载。';});
