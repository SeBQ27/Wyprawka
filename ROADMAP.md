# Roadmap

## v0.1 — obecnie
- [x] Pogoda: ubiór wg prognozy, wieku i aktywności, kilkoro dzieci
- [x] Gotowa wyprawka, Pokój i sen, Zabawki (checklisty JSON + postęp)
- [x] PWA: manifest, offline dla list

## v0.2 — retencja (najwyższa dźwignia)
- [ ] Ocena po spacerze („za ciepło / w sam raz / za zimno”) → automatyczna korekta `feel` dziecka
- [ ] Poranne powiadomienie push z rekomendacją na planowaną godzinę spaceru
- [ ] Stabilne `id` pozycji list zamiast indeksów
- [ ] Walidacja progów temperatur z położną/pediatrą, podpis eksperta w aplikacji

## v0.3 — monetyzacja
- [ ] Linki afiliacyjne przy pozycjach list (pole `offers` w JSON: sklep, url, cena, data sprawdzenia)
- [ ] Filtr budżetu: „minimum”, „standard”, „komfort” jako gotowe warianty wyprawki
- [ ] Eksport listy do udostępnienia (partner, dziadkowie, lista prezentów)

## v0.4 — nowe moduły
- [ ] Rozszerzanie diety (kalendarz wprowadzania produktów)
- [ ] Kalendarz szczepień i bilansów (PSO)
- [ ] Skoki rozwojowe i kamienie milowe
- [ ] Wyprawka do żłobka/przedszkola

## Decyzje otwarte
- Konto i synchronizacja między telefonami rodziców (wymaga backendu — np. SQLite + FastAPI na Render lub Supabase)
- Natywna aplikacja (Flutter/Capacitor) dopiero po potwierdzeniu retencji w PWA
