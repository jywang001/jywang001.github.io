/* Progressive enhancements; content and navigation also work without JavaScript. */
(function () {
  "use strict";
  var printButton = document.querySelector("[data-print]");
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener("click", function () { window.print(); });
  }
  if (!document.body.classList.contains("home-page") || !("IntersectionObserver" in window)) return;
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
  var visible = new Set();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    var current = links.find(function (link) { return visible.has(link.dataset.section); });
    links.forEach(function (link) {
      if (link === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-15% 0px -45% 0px", threshold: 0 });
  links.forEach(function (link) {
    var section = document.getElementById(link.dataset.section);
    if (section) observer.observe(section);
  });
}());
