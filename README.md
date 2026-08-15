# Insta Sticker Generator

Kleines lokales Tool, um personalisierte Instagram-Sticker als **einfarbige, plotter-fertige SVG** zu erzeugen: Instagram-Kamera-Glyph + eigener Text in einer Zeile, mit Live-Preview.

## Starten

```bash
npm install
npm run dev
```

Dann [http://localhost:5178](http://localhost:5178) öffnen.

## Bedienung (Kundenansicht)

- Text (max. 30 Zeichen – Instagram-Handle-Limit), Schriftart (10 Fonts), Farbe
  (Schwarz / Rot / Weiß) sowie Schrift-, Logo- und Gesamtgröße einstellen.
- **Gesamtbreite** in cm wählen (10–30 cm, inkl. Logo); die **Höhe** ergibt sich
  automatisch aus dem Seitenverhältnis und wird read-only angezeigt.
- Rechts die Live-Vorschau auf grauem Hintergrund.
- **Link zum Teilen kopieren** legt einen Link mit dem kompletten Design in die
  Zwischenablage – diesen im Chat teilen, um die Bestellung aufzugeben.

## Warum Text-zu-Pfad?

Beim Export wird der Text via [opentype.js](https://github.com/opentypejs/opentype.js) in gefüllte Vektor-Pfade umgewandelt. Dadurch ist die SVG voll selbstständig (keine Schriftart nötig) und der Sticker-Plotter bekommt saubere Schnittpfade.

## Stack

Vite + Svelte 5 (rein clientseitig), opentype.js. Fonts liegen lokal unter `src/assets/fonts/`.

## Fonts / Lizenz

Poppins, Montserrat, Bebas Neue, Pacifico und Caveat stehen unter der
[SIL Open Font License 1.1](https://openfontlicense.org/) (Quelle: [google/fonts](https://github.com/google/fonts)).
