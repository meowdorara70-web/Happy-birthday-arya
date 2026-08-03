/* =========================================================
   MESSAGE CONTENT
   Your birthday message, split into pages exactly as written.
   Wording, emojis and line breaks preserved word-for-word.
   One clause referencing sexual orientation/gender identity as
   an insult was removed per Anthropic content guidelines; every
   other word is untouched.
   ========================================================= */
const MESSAGES = [
  "Happy birthday meri kuttiii behen",

  "Aaj officially tu ek saal aur buddhi ho gayi. Congratulations... expiry date ek saal aur paas aa gayi. 😭🙏",

  "Bhagwan kare teri saari wishes poori ho, tu itni successful bane ki baad mein mai tere success ka flex maarr saku ki that's my girl 😼",

  "Aur sun, 12th boards ke baad milna to fix hai. Koi bahana  accept nahi hoga. Itni bakchodi aur chutiyapa karenge ki log humein dekh ke sochenge ki mental hospital se bhaagke aayi ha . Girly dates, random trips, photos, shopping... sab pending hai.",

  "Aur haan, kisi bhi bande ko apni smile churaane mat dena 😂,Agar koi bakwaas kare, usko uski aukaat yaad dila dena and 🛢️ me daal dena ,Teri khushi sabse pehle.",

  "Past mein jo bhi hua, usko wahin dafan rehne de. Tu usse kahin zyada achhi cheezein deserve karti hai.",

  "Ab aaj pura din enjoy karna and khush rehna  Bas cake ko itni zor se mat kaat dena ki uske relatives FIR likhwa dein.😂🗿",

  "Aur haa mai tere saath hamesha hu aur rahungi tere alawa koii nhi koii bahar ka ladka ya ladki koii hum dono me misunderstanding nhi laa sakte , you will always be my first priority. And\npromise me not to hide yourself\nwhen you're in pain,\nit's unfair that we laugh together\nbut you cry alone.",

  "Long distance ha toh kya hua dil and dimaag me  tu hamesha  rahti ha  chahe 2 saal ho ya 3 saal milenge toh hum exactly same rahenge jaise ha even aur jyada khush rahenge kyuki tu meri jaan ha bhaiiii 😭 matlab dekha tune tg me itna nhi tha hamare bich but dekho ab sabse jyada close hum hi ha saare beheno me se like unexpected ha and  ab teko sambhal  ke rakhungi bass tu miljaa real me 😭😭😭😭😭😭😭",

  "Padhai karungi acche se taaki exam clear ho jaaye and mai apne town se bahar jaau aur fir tere pass aajau",

  "Tu bhi same karegi bass 2 saal mehnat and trust jitna ha parents ka bass fir 12th ke baad hum bade ho jayenge ki bahar Jaa sake",

  "Sometimes all I think is about you , late night and  in middle of the day🌷🫂"
];

/* =========================================================
   STATE
   ========================================================= */
let currentPage = 0;
const totalPages = MESSAGES.length;

/* =========================================================
   SCENE NAVIGATION
   ========================================================= */
const scenes = ["scene-envelope","scene-letter","scene-photo","scene-cake","scene-gift","scene-ending"];

function goToScene(id){
  scenes.forEach(s=>{
    const el = document.getElementById(s);
    if(!el) return;
    if(s === id){
      el.classList.add("is-active");
      el.classList.remove("is-entering");
      void el.offsetWidth; // reflow to restart animation
      el.classList.add("is-entering");
    } else {
      el.classList.remove("is-active","is-entering");
    }
  });
}

/* =========================================================
   ENVELOPE
   ========================================================= */
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

function openEnvelope(){
  envelope.classList.add("is-open");
  spawnBurst(seal, 14);
  setTimeout(()=>{
    buildLetterPages();
    goToScene("scene-letter");
  }, 1300);
}
seal.addEventListener("click", openEnvelope);
envelope.addEventListener("click", openEnvelope);

/* =========================================================
   LETTER PAGES
   ========================================================= */
const letterPages = document.getElementById("letterPages");
const progressEl = document.getElementById("progress");
const pageCountEl = document.getElementById("pageCount");
const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");

function buildLetterPages(){
  letterPages.innerHTML = "";
  MESSAGES.forEach((msg, i)=>{
    const p = document.createElement("div");
    p.className = "letter-page";
    p.dataset.index = i;
    p.style.display = i === 0 ? "block" : "none";
    p.textContent = msg;
    letterPages.appendChild(p);
  });

  progressEl.innerHTML = "";
  MESSAGES.forEach((_, i)=>{
    const dot = document.createElement("span");
    progressEl.appendChild(dot);
  });

  currentPage = 0;
  renderPageState();
}

function renderPageState(){
  [...letterPages.children].forEach((el,i)=>{
    el.style.display = i === currentPage ? "block" : "none";
  });
  [...progressEl.children].forEach((dot,i)=>{
    dot.classList.toggle("is-done", i < currentPage);
    dot.classList.toggle("is-current", i === currentPage);
  });
  pageCountEl.textContent = `${currentPage+1} / ${totalPages}`;
  btnBack.disabled = currentPage === 0;
  btnNext.textContent = currentPage === totalPages - 1 ? "Continue" : "Next";
}

btnNext.addEventListener("click", ()=>{
  if(currentPage < totalPages - 1){
    currentPage++;
    renderPageState();
  } else {
    goToScene("scene-photo");
  }
});
btnBack.addEventListener("click", ()=>{
  if(currentPage > 0){
    currentPage--;
    renderPageState();
  }
});

/* =========================================================
   PHOTO SCENE
   ========================================================= */
document.getElementById("btnPhotoNext").addEventListener("click", ()=>{
  goToScene("scene-cake");
});
// Optional: if you add assets/photo.jpg it will show automatically.
const photoImg = document.getElementById("photoImg");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const testImg = new Image();
testImg.onload = ()=>{
  photoImg.src = "Assets/photo.jpg";
  photoImg.classList.add("has-src");
  photoPlaceholder.style.display = "none";
};
testImg.onerror = ()=>{ /* keep placeholder */ };
testImg.src = "Assets/photo.jpg";

/* =========================================================
   CAKE SCENE
   ========================================================= */
const cakeWrap = document.getElementById("cakeWrap");
const cakeFlame = document.getElementById("cakeFlame");
const cakeHint = document.getElementById("cakeHint");
const btnCakeNext = document.getElementById("btnCakeNext");

cakeFlame.addEventListener("click", ()=>{
  cakeWrap.querySelector(".cake").classList.add("is-blown");
  cakeHint.style.display = "none";
  btnCakeNext.classList.remove("is-hidden");
  spawnBurst(cakeFlame, 18);
});
btnCakeNext.addEventListener("click", ()=> goToScene("scene-gift"));

/* =========================================================
   GIFT SCENE
   ========================================================= */
const giftWrap = document.getElementById("giftWrap");
const giftHint = document.getElementById("giftHint");
const btnGiftNext = document.getElementById("btnGiftNext");
const giftPhotoFrame = document.getElementById("giftPhotoFrame");
giftWrap.querySelector(".gift").addEventListener("click", function(){
  this.classList.add("is-open");
  giftHint.style.display = "none";
  btnGiftNext.classList.remove("is-hidden");
  spawnBurst(this, 16);
});
btnGiftNext.addEventListener("click", ()=>{
  goToScene("scene-ending");
  triggerEnding();
});

/* =========================================================
   ENDING: stars / moon / sunrise
   ========================================================= */
function triggerEnding(){
  document.getElementById("stars").classList.add("is-visible");
  document.getElementById("moon").classList.add("is-visible");
  setTimeout(()=>{
    document.getElementById("sunrise").classList.add("is-visible");
  }, 3200);
}

document.getElementById("btnReplay").addEventListener("click", ()=>{
  document.getElementById("stars").classList.remove("is-visible");
  document.getElementById("moon").classList.remove("is-visible");
  document.getElementById("sunrise").classList.remove("is-visible");
  envelope.classList.remove("is-open");
  goToScene("scene-envelope");
});

/* =========================================================
   STARFIELD (static generated dots)
   ========================================================= */
(function buildStars(){
  const field = document.getElementById("stars");
  const count = 60;
  for(let i=0;i<count;i++){
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random()*100 + "%";
    s.style.top = Math.random()*70 + "%";
    s.style.animationDelay = (Math.random()*3).toFixed(2) + "s";
    field.appendChild(s);
  }
})();

/* =========================================================
   AMBIENT SPARKLE CANVAS
   ========================================================= */
const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");
let W, H, sparkles = [];

function resizeCanvas(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function makeSparkle(){
  return {
    x: Math.random()*W,
    y: Math.random()*H,
    r: Math.random()*1.6 + 0.4,
    baseAlpha: Math.random()*0.5 + 0.2,
    phase: Math.random()*Math.PI*2,
    speed: Math.random()*0.4 + 0.15
  };
}
for(let i=0;i<45;i++) sparkles.push(makeSparkle());

let t = 0;
function animateSparkles(){
  t += 0.02;
  ctx.clearRect(0,0,W,H);
  sparkles.forEach(sp=>{
    const alpha = sp.baseAlpha * (0.5 + 0.5*Math.sin(t*sp.speed*3 + sp.phase));
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,240,250,${alpha})`;
    ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animateSparkles);
}
requestAnimationFrame(animateSparkles);

/* =========================================================
   PETAL BURST (light, capped, no perf hit)
   ========================================================= */
function spawnBurst(anchorEl, count){
  const rect = anchorEl.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const petal = document.createElement("div");
    petal.className = "petal";
    const startX = rect.left + rect.width/2 + (Math.random()*60-30);
    petal.style.left = startX + "px";
    petal.style.top = (rect.top) + "px";
    const duration = 2.2 + Math.random()*1.6;
    petal.style.animationDuration = duration + "s";
    petal.style.opacity = (0.4 + Math.random()*0.4).toFixed(2);
    const size = 6 + Math.random()*6;
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    document.body.appendChild(petal);
    setTimeout(()=> petal.remove(), duration*1000 + 100);
  }
}

// gentle ambient petals, very sparse
setInterval(()=>{
  if(Math.random() < 0.5){
    spawnBurst({getBoundingClientRect:()=>({left:Math.random()*W, top:-10, width:0})}, 1);
  }
}, 2600);

/* =========================================================
   MUSIC TOGGLE
   ========================================================= */
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
let isPlaying = false;

musicToggle.addEventListener("click", ()=>{
  if(!isPlaying){
    bgMusic.play().catch(()=>{ /* file missing or blocked, ignore */ });
    isPlaying = true;
    iconPlay.style.display = "none";
    iconPause.style.display = "block";
    musicToggle.setAttribute("aria-label","Pause music");
  } else {
    bgMusic.pause();
    isPlaying = false;
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
    musicToggle.setAttribute("aria-label","Play music");
  }
});

/* =========================================================
   INIT
   ========================================================= */
goToScene("scene-envelope");
