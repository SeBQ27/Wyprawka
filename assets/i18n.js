// Tłumaczenia (PL / EN / UK). Język: zapisany wybór → język przeglądarki → angielski.
// Teksty statyczne: atrybut data-i18n="klucz" (textContent) lub data-i18n-attr="aria-label:klucz;placeholder:klucz".
window.I18N = (() => {
  const LANGS = { pl: { label: "PL", name: "Polski", locale: "pl-PL" }, en: { label: "EN", name: "English", locale: "en-GB" }, uk: { label: "UA", name: "Українська", locale: "uk-UA" } };
  const KEY = "wyprawka.lang";
  let lang = null;
  try { lang = localStorage.getItem(KEY); } catch (e) {}
  if (!LANGS[lang]) {
    const n = (navigator.languages?.[0] || navigator.language || "pl").slice(0, 2).toLowerCase();
    lang = n === "pl" ? "pl" : n === "uk" ? "uk" : "en";
  }
  document.documentElement.lang = lang;
  const D = { pl: {}, en: {}, uk: {} };

  const add = dict => { for (const l in dict) Object.assign(D[l], dict[l]); };
  const t = (k, v) => {
    let s = D[lang][k] ?? D.pl[k] ?? k;
    if (v) s = s.replace(/\{(\w+)\}/g, (_, x) => v[x] ?? "");
    return s;
  };
  const apply = (root = document) => {
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-attr]").forEach(el => el.dataset.i18nAttr.split(";").forEach(p => {
      const [a, k] = p.split(":"); el.setAttribute(a, t(k));
    }));
  };
  const set = l => { try { localStorage.setItem(KEY, l); } catch (e) {} location.reload(); };
  const switcher = () => {
    const top = document.querySelector(".top");
    if (!top || top.querySelector(".lang")) return;
    const g = document.createElement("div");
    g.className = "lang"; g.setAttribute("role", "group"); g.setAttribute("aria-label", t("lang.label"));
    g.innerHTML = Object.entries(LANGS).map(([k, x]) =>
      `<button type="button" lang="${k}" aria-pressed="${k === lang}" title="${x.name}">${x.label}</button>`).join("");
    g.querySelectorAll("button").forEach(b => b.onclick = () => { if (b.lang !== lang) set(b.lang); });
    const brand = top.querySelector(".brand");
    brand ? brand.after(g) : top.prepend(g);
  };

  // Plural: pl/uk mają 3 formy (1 / 2–4 / 5+), en 2.
  const plural = (n, forms) => {
    const f = forms[lang] || forms.pl;
    if (lang === "en") return n === 1 ? f[0] : f[1];
    const m10 = n % 10, m100 = n % 100;
    if (n === 1) return f[0];
    if (lang === "uk" && m10 === 1 && m100 !== 11) return f[0];
    return m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? f[1] : f[2];
  };

  add({
    pl: {
      "lang.label": "Język", "nav.label": "Nawigacja", "nav.home": "Start", "nav.wx": "Pogoda", "nav.bag": "Wyprawka", "nav.sleep": "Sen", "nav.toys": "Zabawki",
      "disclaimer": "Treści mają charakter informacyjny i nie zastępują porady pediatry ani położnej.",
      "age.newborn": "noworodek", "age.months": "{n} mies.", "age.half": " i pół",
    },
    en: {
      "lang.label": "Language", "nav.label": "Navigation", "nav.home": "Home", "nav.wx": "Weather", "nav.bag": "Essentials", "nav.sleep": "Sleep", "nav.toys": "Toys",
      "disclaimer": "Content is for information only and does not replace advice from a paediatrician or midwife.",
      "age.newborn": "newborn", "age.months": "{n} mo", "age.half": "½",
    },
    uk: {
      "lang.label": "Мова", "nav.label": "Навігація", "nav.home": "Головна", "nav.wx": "Погода", "nav.bag": "Посаг", "nav.sleep": "Сон", "nav.toys": "Іграшки",
      "disclaimer": "Матеріали мають інформаційний характер і не замінюють консультації педіатра чи акушерки.",
      "age.newborn": "новонароджений", "age.months": "{n} міс.", "age.half": " з половиною",
    },
  });
  const YEARS = { pl: ["rok", "lata", "lat"], en: ["yr", "yrs"], uk: ["рік", "роки", "років"] };
  const ageText = (m, half) => {
    if (m < 1) return t("age.newborn");
    if (m < 24) return t("age.months", { n: m });
    const y = Math.floor(m / 12), h = half && m % 12 >= 6;
    if (lang === "en") return `${y}${h ? "½" : ""} ${y === 1 && !h ? YEARS.en[0] : YEARS.en[1]}`;
    return `${y} ${plural(y, YEARS)}${h ? t("age.half") : ""}`;
  };

  return {
    get lang() { return lang; }, get locale() { return LANGS[lang].locale; },
    add, t, apply, set, switcher, plural, ageText,
    // katalog z listami: data/*.json (pl), data/en/*.json, data/uk/*.json
    dataPath: (base, id) => `${base}data/${lang === "pl" ? "" : lang + "/"}${id}.json`,
  };
})();
