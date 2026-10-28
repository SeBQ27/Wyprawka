# Wyprawka

Aplikacja dla rodziców małych dzieci (0–6 lat). Jeden profil dziecka, kilka modułów:

| Moduł | Ścieżka | Co robi |
|---|---|---|
| **Pogoda** (roboczo „Cieplutko”) | `pogoda/` | GPS lub miasto → prognoza Open-Meteo → ubiór warstwa po warstwie wg wieku, aktywności (wózek, nosidło, spacer, plac zabaw) i czasu wyjścia |
| **Gotowa wyprawka** | `lista.html#wyprawka` | Checklista na pierwsze 3 miesiące + sekcja „Nie kupuj” |
| **Pokój i sen** | `lista.html#sen` | Zasady bezpiecznego snu, łóżeczko, dostawka, materac, meble, oświetlenie, klimat. Kryteria zakupu i normy PN-EN |
| **Polecane zabawki** | `lista.html#zabawki` | Zabawki wg etapu rozwoju, sekcja pasująca do wieku dziecka oznaczona „Teraz” |

## Stack

- Statyczny PWA, bez kroku budowania: HTML + CSS + vanilla JS.
- Treści list w `data/*.json`. Dodanie lub zmiana pozycji to edycja JSON, bez ruszania kodu.
- Stan (profil dziecka, odhaczone pozycje) w `localStorage` na urządzeniu. Brak backendu, brak kont.
- Pogoda: [Open-Meteo](https://open-meteo.com) (bez klucza API). Reverse geocoding: BigDataCloud (darmowy endpoint klienta).
- Offline: `sw.js` cache’uje powłokę i listy; pogoda zawsze z sieci.

## Uruchomienie lokalne

```bash
python3 -m http.server 8080
# http://localhost:8080
```

Otwieranie `index.html` bezpośrednio z pliku nie zadziała (fetch JSON i geolokalizacja wymagają serwera / HTTPS).

## Wdrożenie

**Render (Static Site):** New → Blueprint → wskaż to repo (`render.yaml` gotowy). Albo New → Static Site, build command pusty, publish directory `.`.

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root.

## Języki (PL / EN / UA)

Przełącznik w nagłówku każdej strony, wybór zapamiętany w `localStorage` (`wyprawka.lang`); domyślnie język przeglądarki, a gdy nie jest polski ani ukraiński — angielski.

- Teksty interfejsu: `assets/i18n.js` (wspólne), słowniki na początku `index.html` i `lista.html`, moduł Pogoda w `pogoda/lang.js`.
- Listy: `data/*.json` (PL), `data/en/*.json`, `data/uk/*.json`. **Kolejność sekcji i pozycji musi być identyczna we wszystkich językach** — odhaczenia są zapisywane po indeksach i przenoszą się między językami.

## Kafelki sklepów (Allegro, Amazon.pl, Smyk, AliExpress)

Kafelki pokazują się przy każdej pozycji, która ma wpis w `data/shop.json`. Konfiguracja:

- `assets/shops.js` — sklepy, adresy wyszukiwania, identyfikator partnerski Amazon (`amazonTag`), opcjonalny szablon deep linku AliExpress (`aliDeepLink`) i funkcja `link()` do opakowania linków partnerskich.
- `data/shop.json` — fraza wyszukiwania `q` dla każdej pozycji (klucz `sekcja.pozycja`). Żeby pokazać konkretny produkt z miniaturką zamiast wyszukiwania, dodaj `products: [{"store": "allegro", "title": "…", "url": "…", "img": "…", "price": "…"}]` (`"affiliate": true`, jeśli `url` już jest linkiem partnerskim).
- Wszystkie linki mają `rel="sponsored nofollow"`, a nad listą jest informacja o linkach partnerskich.

### AliExpress (opt-in)

Kafelek AliExpress pojawia się tylko przy pozycjach z polem `ali`:

```json
"1.4": {"q": "pieluszki muślinowe 70x70", "ali": {"q": "muslin swaddle blanket 70x70 cotton", "url": ""}}
```

- `ali.q` — fraza po angielsku (wyszukiwarka AliExpress działa na niej lepiej niż na polskiej).
- `ali.url` — **tu wklej link partnerski** z AliExpress Portals (Link Generator / Product Promotion → `https://s.click.aliexpress.com/e/…`). Pusty = link do wyszukiwania na pl.aliexpress.com (bez prowizji, chyba że ustawisz `aliDeepLink`).
- Celowo **bez** AliExpress: łóżeczko, dostawka, materac, śpiworek, fotelik, wózek, termometr lekarski, aspirator, kosmetyki, pieluchy i zabawki 0–3 lat. To pozycje z normami PN-EN / wyrobem medycznym, gdzie podróbki CE z marketplace'ów są realnym ryzykiem — i reputacyjnym, i prawnym (odpowiedzialność za polecenie).
## Model danych listy (`data/*.json`)

```jsonc
{
  "id": "sen", "title": "…", "intro": "…",
  "sections": [{
    "title": "Materac", "tip": "…", "ageFrom": 0, "ageTo": 6,
    "items": [{
      "name": "…", "qty": "1", "level": "must | nice | situational",
      "kind": "rule",            // opcjonalnie: zasada, bez checkboxa
      "why": "…", "criteria": ["…"], "norm": "PN-EN 16890"
    }]
  }],
  "avoid": {"title": "Nie kupuj", "items": [{"name": "…", "why": "…"}]}
}
```

Klucze odhaczeń to indeksy `sekcja.pozycja`. **Nie zmieniaj kolejności istniejących pozycji** po publikacji, dopisuj na końcu sekcji — inaczej użytkownikom przesuną się ptaszki (do poprawy w v2: stabilne `id` pozycji).

## Zastrzeżenia

Progi temperatur w module Pogoda to heurystyka do walidacji z pediatrą/położną. Treści mają charakter informacyjny.
