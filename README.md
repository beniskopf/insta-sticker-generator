# Insta Sticker Generator

Kleines lokales Tool, um personalisierte Instagram-Sticker als **einfarbige, plotter-fertige SVG** zu erzeugen: Instagram-Kamera-Glyph + eigener Text in einer Zeile, mit Live-Preview.

## Starten

```bash
npm install
npm run dev
```

Dann [http://localhost:5178](http://localhost:5178) öffnen.

## Bedienung

- Text eingeben, Schriftart (5 Fonts), Größen, Abstand und Farben einstellen.
- Rechts die Live-Vorschau (auf Transparenz-Karo).
- **SVG kopieren** legt den SVG-Code in die Zwischenablage (den kannst du weitergeben – er rendert überall gleich, weil der Text als Vektor-Pfad eingebettet ist).
- **SVG herunterladen** speichert die Datei.

## Warum Text-zu-Pfad?

Beim Export wird der Text via [opentype.js](https://github.com/opentypejs/opentype.js) in gefüllte Vektor-Pfade umgewandelt. Dadurch ist die SVG voll selbstständig (keine Schriftart nötig) und der Sticker-Plotter bekommt saubere Schnittpfade.

## Stack

Vite + Svelte 5 (rein clientseitig), opentype.js. Fonts liegen lokal unter `src/assets/fonts/`.

## Fonts / Lizenz

Poppins, Montserrat, Bebas Neue, Pacifico und Caveat stehen unter der
[SIL Open Font License 1.1](https://openfontlicense.org/) (Quelle: [google/fonts](https://github.com/google/fonts)).
