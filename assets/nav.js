// Dolna nawigacja i przełącznik języka, wspólne dla wszystkich stron.
// Użycie: <script src=".../assets/nav.js" data-base="../"></script> (po assets/i18n.js)
(() => {
  const base = document.currentScript?.dataset.base || "./";
  const t = window.I18N ? I18N.t : k => k;
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    wx: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    bag: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    toy: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/><circle cx="16.5" cy="7.5" r="3.5"/><path d="M4 20l3.5-6 3.5 6z"/>',
  };
  const T = [
    ["home", "nav.home", ""], ["wx", "nav.wx", "pogoda/"], ["bag", "nav.bag", "lista.html#wyprawka"],
    ["moon", "nav.sleep", "lista.html#sen"], ["toy", "nav.toys", "lista.html#zabawki"],
  ];
  const nav = document.createElement("nav");
  nav.className = "tabbar"; nav.setAttribute("aria-label", t("nav.label"));
  nav.innerHTML = T.map(([i, n, h]) => `<a href="${base}${h}" data-h="${h}"><svg viewBox="0 0 24 24" aria-hidden="true">${I[i]}</svg>${t(n)}</a>`).join("");
  document.body.appendChild(nav);
  const mark = () => {
    const p = location.pathname, hash = location.hash || "#wyprawka";
    const cur = /\/pogoda\/?/.test(p) ? "pogoda/" : /lista\.html$/.test(p) ? "lista.html" + hash : "";
    nav.querySelectorAll("a").forEach(a => a.dataset.h === cur ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  };
  mark(); addEventListener("hashchange", mark);
  if (window.I18N) { I18N.switcher(); I18N.apply(); }
})();
