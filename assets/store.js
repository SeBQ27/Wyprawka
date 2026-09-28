// Wspólny magazyn lokalny dla wszystkich modułów Wyprawki.
// Wymaga assets/i18n.js (ageText). Profil dziecka jest współdzielony z modułem Pogoda (klucz "cieplutko.v1").
window.Store = (() => {
  const get = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const now = new Date();
  return {
    kid() {
      const s = get("cieplutko.v1");
      if (!s || s.example) return null;
      return s.kids.find(k => k.id === s.active) || s.kids[0] || null;
    },
    ageMonths(k) {
      const [y, m] = k.birth.split("-").map(Number);
      return Math.max(0, (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m));
    },
    ageText: m => I18N.ageText(m),
    checks: id => get(`wyprawka.checks.${id}`) || {},
    setCheck(id, key, val) { const c = this.checks(id); c[key] = val; set(`wyprawka.checks.${id}`, c); },
  };
})();
