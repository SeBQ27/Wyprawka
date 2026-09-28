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
