/* Pointer sheen. Pure decoration: nothing else depends on this file. */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var SHEEN = ".card,.hero,.banner,.cat,.pl,.stat,.acard,.list,.top-in,.ide,.chat,.side,.term";
  var lit = [], raf = 0, ev = null;

  function paint() {
    raf = 0;
    var next = [], el = ev.target;
    for (; el && el.nodeType === 1; el = el.parentElement) {
      if (!el.matches(SHEEN)) continue;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (ev.clientX - r.left) + "px");
      el.style.setProperty("--my", (ev.clientY - r.top) + "px");
      next.push(el);
    }
    lit.forEach(function (o) {
      if (next.indexOf(o) < 0) { o.style.removeProperty("--mx"); o.style.removeProperty("--my"); }
    });
    lit = next;
  }
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    ev = e; if (!raf) raf = requestAnimationFrame(paint);
  }, { passive: true });
  document.addEventListener("pointerleave", function () {
    lit.forEach(function (o) { o.style.removeProperty("--mx"); o.style.removeProperty("--my"); }); lit = [];
  });

})();
