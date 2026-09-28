// Sklepy do kafelków „Gdzie kupić”. Tu wpisz swoje identyfikatory partnerskie.
// Kolejność = kolejność kafelków. Linki wyszukiwania działają bez konfiguracji;
// produkty z miniaturkami dopisujesz w data/shop.json (pole products).
window.SHOPS = {
  amazonTag: "",            // Strefa Partnera Amazon.pl, np. "wyprawka-21"
  list: [
    { id: "allegro", name: "Allegro", color: "#FF5A00", ink: "#fff",
      search: q => `https://allegro.pl/listing?string=${encodeURIComponent(q)}` },
    { id: "amazon", name: "Amazon.pl", color: "#232F3E", ink: "#FF9900",
      search: q => `https://www.amazon.pl/s?k=${encodeURIComponent(q)}` },
    { id: "smyk", name: "Smyk", color: "#E4032E", ink: "#fff",
      search: q => `https://www.smyk.com/search?q=${encodeURIComponent(q)}` },
  ],
  // Dokleja identyfikator partnerski do każdego linku (także produktów z shop.json).
  link(id, url) {
    if (id === "amazon" && this.amazonTag) {
      const u = new URL(url); u.searchParams.set("tag", this.amazonTag); return u.toString();
    }
    return url;
  },
};
