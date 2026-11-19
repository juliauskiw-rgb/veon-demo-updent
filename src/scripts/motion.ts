// UP Dent motion (concept §8 «Движение»): panorama reveal, route steps, mobile call bar.
// Only transform / opacity / clip-path; everything is in place with prefers-reduced-motion or without scripting.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Panorama under the first-screen plate: starts right away, the plate and H1 are not delayed.
const pano = document.querySelector<HTMLElement>("[data-pano]");
if (pano) requestAnimationFrame(() => pano.classList.add("is-open"));

// 2. Route steps in «Як нас знайти»: play once when the plate enters the screen.
const steps = document.querySelectorAll<HTMLElement>("[data-steps]");
if (reduce || !("IntersectionObserver" in window)) {
  steps.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }, { threshold: 0.3 });
  steps.forEach((el) => io.observe(el));
}

// 3. Phone call bar: shown after the first screen has scrolled away.
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const hero = document.getElementById("top");
if (bar && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => bar.classList.toggle("is-shown", !e.isIntersecting), { threshold: 0 }).observe(hero.querySelector(".hero__plate") ?? hero);
} else if (bar) {
  bar.classList.add("is-shown");
}

// 4. FutureLink notes on touch: toggle on tap, close on a second tap, a tap elsewhere or Escape.
const futures = Array.from(document.querySelectorAll<HTMLElement>(".future-link"));
const closeAll = (except?: HTMLElement) => futures.forEach((f) => { if (f !== except) f.classList.remove("is-open"); });
futures.forEach((f) => {
  f.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAll(f);
    f.classList.toggle("is-open");
  });
  f.addEventListener("blur", () => f.classList.remove("is-open"));
});
document.addEventListener("click", () => closeAll());
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
