const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const header=$("#header"), progress=$(".progress"), topBtn=$("#topBtn"), menu=$(".menu-toggle"), nav=$(".nav-links"), modal=$("#workshopModal"), modalTitle=$("#modalTitle"), selected=$("#selectedWorkshop"), toast=$("#toast");
$("#year").textContent=new Date().getFullYear();

menu.addEventListener("click",()=>nav.classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",scrollY>20);
  topBtn.classList.toggle("show",scrollY>600);
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/h*100)+"%";
  let current="home";
  $$("main section[id]").forEach(s=>{if(scrollY>=s.offsetTop-150)current=s.id});
  $$(" .nav-links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});

document.addEventListener("mousemove",e=>{
  const g=$(".cursor-glow"); g.style.left=e.clientX+"px"; g.style.top=e.clientY+"px";
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}});
},{threshold:.12});
$$(".reveal").forEach(e=>observer.observe(e));

const counters=$$(".counter");
const countObs=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(e.isIntersecting){
   const el=e.target,target=+el.dataset.target; let n=0; const step=Math.max(1,Math.ceil(target/55));
   const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n;if(n>=target)clearInterval(timer)},20);
   countObs.unobserve(el);
  }
 })
},{threshold:.7});
counters.forEach(e=>countObs.observe(e));

$$(".filter").forEach(btn=>btn.onclick=()=>{
 $$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 $$(".workshop-card").forEach(c=>{c.style.display=f==="all"||c.dataset.category===f?"flex":"none"});
});

function openModal(name){
 modalTitle.textContent="Register: "+name; selected.value=name; modal.classList.add("open");modal.setAttribute("aria-hidden","false");
}
$$(".register-btn,.details-btn").forEach(b=>b.onclick=()=>openModal(b.dataset.workshop));
$$("[data-close]").forEach(b=>b.onclick=()=>modal.classList.remove("open"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});

function success(msg="✓ Submitted successfully!"){
 toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3000);
}
$("#registrationForm").addEventListener("submit",e=>{e.preventDefault();modal.classList.remove("open");e.target.reset();success("✓ Registration submitted successfully!");});
$("#contactForm").addEventListener("submit",e=>{e.preventDefault();e.target.reset();success("✓ Enquiry sent successfully!");});

const testimonials=[
 ["Aarav Kumar","B.Tech Student • AI Workshop","The workshop made the technology easy to understand. I liked that we actually built something instead of only listening to theory."],
 ["Sneha Reddy","CSE Student • Web Workshop","The practical approach was the best part. I left the session with a website I could actually show to others."],
 ["Rahul Varma","Engineering Student • Python Workshop","The mentor explained everything step by step and the mini project made the concepts much easier to remember."]
];
let ti=0;
function showTestimonial(i){$("#quoteName").textContent=testimonials[i][0];$("#quoteRole").textContent=testimonials[i][1];$("#quoteText").textContent=testimonials[i][2];}
$(".next").onclick=()=>{ti=(ti+1)%testimonials.length;showTestimonial(ti)};
$(".prev").onclick=()=>{ti=(ti-1+testimonials.length)%testimonials.length;showTestimonial(ti)};
setInterval(()=>{$(".next").click()},6500);

if(matchMedia("(prefers-reduced-motion: reduce)").matches){
 document.documentElement.style.scrollBehavior="auto";
}


/* Hero depth interaction */
(() => {
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".hero-title");
  const visual = document.querySelector(".hero-visual");
  if (!hero || !title || !visual || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let raf = null;
  hero.addEventListener("mousemove", (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      title.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0)`;
      visual.style.transform = `translate3d(${x * -9}px, ${y * -6}px, 0)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    title.style.transform = "";
    visual.style.transform = "";
  });
})();


/* ==========================================================
   TRUE TYPEWRITER HERO
   ========================================================== */
(() => {
  const target = document.getElementById("typedHero");
  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phrases = [
    "Where Creativity Meets Technology",
    "Learn. Practice. Build.",
    "Turn Ideas Into Skills"
  ];

  if (reduced) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(type, 1900);
        return;
      }
      setTimeout(type, 72);
    } else {
      charIndex--;
      target.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 420);
        return;
      }
      setTimeout(type, 38);
    }
  };

  target.textContent = "";
  setTimeout(type, 450);
})();

/* Reference hero typewriter: orange second line */
(() => {
  const target = document.getElementById("typedOrange");
  if (!target) return;

  const phrases = ["Meets Innovation", "Meets Technology", "Meets Creativity"];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    target.textContent = phrases[0];
    return;
  }

  let phrase = 0, i = 0, deleting = false;

  function tick(){
    const text = phrases[phrase];

    if(!deleting){
      i++;
      target.textContent = text.slice(0,i);
      if(i >= text.length){
        deleting = true;
        setTimeout(tick, 1700);
        return;
      }
      setTimeout(tick, 75);
    }else{
      i--;
      target.textContent = text.slice(0,i);
      if(i <= 0){
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        setTimeout(tick, 350);
        return;
      }
      setTimeout(tick, 40);
    }
  }

  target.textContent = "";
  setTimeout(tick, 500);
})();


/* ===== Gallery lightbox ===== */
(() => {
  const lightbox = $("#galleryLightbox");
  const lightboxImage = $("#lightboxImage");
  const caption = $("#lightboxCaption");
  if (!lightbox) return;

  $$(".gallery-card").forEach(card => {
    card.addEventListener("click", () => {
      const image = card.dataset.image;
      lightboxImage.src = image;
      lightboxImage.alt = card.querySelector("img")?.alt || "Gallery image";
      caption.textContent = card.dataset.caption || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    });
  });

  const closeGallery = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden","true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  $$("[data-gallery-close]").forEach(el => el.addEventListener("click", closeGallery));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeGallery();
  });
})();
