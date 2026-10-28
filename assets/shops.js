// Sklepy do kafelków „Gdzie kupić”. Tu wpisz swoje identyfikatory partnerskie.
// Kolejność = kolejność kafelków. Linki wyszukiwania działają bez konfiguracji;
// produkty z miniaturkami dopisujesz w data/shop.json (pole products).
//
// AliExpress jest opt-in: kafelek pojawia się tylko przy pozycjach, które mają
// w data/shop.json pole "ali": {"q": "fraza po angielsku", "url": ""}.
// W "url" wklej link partnerski z AliExpress Portals (s.click.aliexpress.com/e/…).
// Pusty "url" = link do wyszukiwania (opakowany przez aliDeepLink, jeśli ustawiony).
// Pozycji krytycznych dla bezpieczeństwa (fotelik, materac, łóżeczko, śpiworek,
// termometr, kosmetyki, zabawki 0–3) celowo NIE ma na AliExpress.
window.SHOPS = {
  amazonTag: "",            // Strefa Partnera Amazon.pl, np. "wyprawka-21"
  // Opcjonalny szablon deep linku AliExpress Portals dla linków wyszukiwania.
  // {url} zostanie zastąpione zakodowanym adresem docelowym, np.
  // "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=TWOJ_KLUCZ&dl_target_url={url}"
  // Przed publikacją sprawdź w panelu Portals, że taki link nalicza prowizję.
  aliDeepLink: "",
  list: [
    { id: "allegro", name: "Allegro", color: "#FF5A00", ink: "#fff",
      search: q => `https://allegro.pl/listing?string=${encodeURIComponent(q)}` },
    { id: "amazon", name: "Amazon.pl", color: "#232F3E", ink: "#FF9900",
      search: q => `https://www.amazon.pl/s?k=${encodeURIComponent(q)}` },
    { id: "smyk", name: "Smyk", color: "#E4032E", ink: "#fff",
      search: q => `https://www.smyk.com/search?q=${encodeURIComponent(q)}` },
    { id: "aliexpress", name: "AliExpress", color: "#E43225", ink: "#fff", optIn: "ali",
      search: q => `https://pl.aliexpress.com/w/wholesale-${encodeURIComponent(q.trim().replace(/\s+/g, "-"))}.html?SearchText=${encodeURIComponent(q)}` },
  ],
  // Dokleja identyfikator partnerski do każdego linku (także produktów z shop.json).
  // affiliate=true oznacza, że url już jest linkiem partnerskim — nie ruszamy go.
  link(id, url, affiliate) {
    if (affiliate) return url;
    if (id === "amazon" && this.amazonTag) {
      const u = new URL(url); u.searchParams.set("tag", this.amazonTag); return u.toString();
    }
    if (id === "aliexpress" && this.aliDeepLink) {
      return this.aliDeepLink.replace("{url}", encodeURIComponent(url));
    }
    return url;
  },
};
