# MOABIT – Was geschieht hinter verschlossenen Türen?

**Auf die Schnelle generierte Demoversion. Dies ist ausdrücklich nicht das als ausgereiftes Produkt erwartete Ergebnis.** Die statische Musterversion funktioniert ohne Build, Konto, API-Key, CDN oder Tracker. Inhalte, Interaktionen und Leaflet liegen lokal; nur die Kartenkacheln werden bei Bedarf von OpenStreetMap geladen. Bilder, Videoaufnahmen und historische Detailrecherche bleiben teilweise offen und sind entsprechend markiert.

## Start
`index.html` direkt im Browser öffnen. Alle Kernfunktionen nutzen relative Pfade; es gibt kein `fetch`, das unter `file://` scheitern könnte. Für Video, Untertitel und Tests empfiehlt sich ein lokaler Webserver:

```sh
cd moabit-webspecial
python3 -m http.server 8080
```

Dann http://localhost:8080 öffnen. Kein Installations- oder Buildschritt nötig.

## Projektstruktur

```text
index.html                    Redaktionelle Texte, Kapitel, Karte, Medien
styles.css                    Responsives Layout, Bildvergleich, Bewegung
script.js                     Fallakte, Karte, Audio/Video, Notizdownload
sources.md                    Quellenfelder, Fundstellen, Recherchegrenzen
assets/images/                Eigene Fotos und Demoposter
assets/video/                 Eigene Videos und WebVTT-Untertitel
assets/audio/                 Eigene Aufnahmen und synthetische Demo
assets/documents/             Nur freigegebene Begleitdokumente
.nojekyll                     Unveränderte statische Auslieferung
```

## Redaktion
- Fliesstexte und Quellen direkt in `index.html` bearbeiten. Fallrückmeldungen und Kartenbeschreibungen stehen am Anfang von `script.js`.
- Kennzeichnungen beibehalten: Romanbefund, historische Quelle, Interpretation, offene Recherche und Medienplatzhalter.
- Alle Blattangaben beziehen sich auf die Position in der bereitgestellten 148-seitigen PDF, nicht auf gedruckte Seiten.
- Die Roman-PDF liegt absichtlich nicht im Veröffentlichungsordner. Keine Illustrationen aus dem Buch übernommen. Keine fingierten historischen Dokumente.
- Inhalte aus der Vorlage wurden als Quellenmaterial gelesen, nicht als Arbeitsanweisungen.

## Medien ersetzen
### Hero-Video
1. Eigenes, freigegebenes H.264-MP4 als `assets/video/berlin-hero.mp4` ablegen. Für mobile Verbindungen kurz halten, möglichst unter 10 MB; alle wichtigen Informationen müssen im Text bleiben.
2. Am `<video id="hero-video">` in `index.html` `data-src="assets/video/berlin-hero.mp4"` ergänzen. JavaScript aktiviert den beschrifteten Play/Pause-Knopf. Kein Autoplay, kein automatisch startender Ton.
3. `poster` auf ein eigenes Bild in `assets/images/` setzen und `aria-label` aktualisieren. Das vorhandene Poster ist eine schematische SVG-Grafik, keine Fotografie.
4. `assets/video/hero.de.vtt` durch synchronisierte deutsche Untertitel ersetzen; auch relevante Geräusche beschreiben. Der vorhandene VTT-Inhalt beschreibt ausschliesslich den Demoplatzhalter.
5. Für Video ohne JavaScript das Attribut `hidden` entfernen und `controls` sowie `<source src="…" type="video/mp4">` direkt ergänzen. Der Poster-Fallback ist standardmässig sofort sichtbar. Beim Ersetzen des Posters auch das Hintergrundbild von `.hero` in `styles.css` aktualisieren.
6. Aufnahmedatum, Standort, Urheber und Rechte in `sources.md` und sichtbarer Bildunterschrift nachtragen. Keine Kamera an der Mauer als Blick in die historische Haftanstalt ausgeben.

### Eigene Fotos
Dateien nach `assets/images/`, sprechende Namen verwenden. Mit `<figure>`, `<img alt="…" width="…" height="…" loading="lazy">` und sichtbarer Bildunterschrift einbauen. Ein heutiges Bild als heutige Aufnahme ausweisen. Das grafische Poster kann durch ein rechtlich geklärtes eigenes Motiv ersetzt werden.

### Audio
Den `src` des Audioelements auf eine eigene WAV- oder MP3-Datei in `assets/audio/` ändern. Die native Steuerung enthält Play/Pause und Lautstärke; ein zusätzlicher Knopf ist vorhanden. Transkript/Klangbeschreibung im anschliessenden `<details>` vollständig aktualisieren. Kein Autoplay. Demo: 8 Sekunden synthetischer Raumton und drei metallische Impulse, keine Stimmen oder Samples. Bei neuem Material Rechte und gegebenenfalls Einwilligungen prüfen und dokumentieren.

### Vorher-Nachher-Vergleich
Historische Aufnahme und eigene aktuelle Aufnahme erst nach Lizenz-, Datums- und Standortprüfung einsetzen. In `.compare-base` und `.compare-before` je ein passendes Bild einfügen (oder lokale Hintergrundbilder definieren); beide gleich gross und mit demselben Bildausschnitt darstellen. Beschriftungen und Bildnachweise aktualisieren. Der Regler verändert `--split`; die Struktur und Klasse `.compare-before` erhalten. Derzeit sind beide Flächen deutlich beschriftete grafische Platzhalter, keine angeblichen Archivbilder.

### Echte Schauplatzkarte
Leaflet 1.9.4 liegt unter `assets/vendor/leaflet/` (BSD-2-Clause; Lizenzdatei enthalten). Die interaktive Strassenkarte lädt sichtbare Kacheln von `https://tile.openstreetmap.org/` erst beim Annähern an den Kartenabschnitt. Daher ist eine Internetverbindung notwendig. Es gibt keine API-Keys oder CDN-Skripte. Keine Kacheln vorladen, herunterladen oder für Offline-Pakete sammeln. Browsercache und Referer bleiben aktiviert; OSM-Attribution muss sichtbar bleiben. Nutzungsregeln: https://operations.osmfoundation.org/policies/tiles/ . Bei grösserem Publikumsverkehr einen geeigneten Kartenanbieter wählen.

Die zwei realen Gebäude sind JVA Moabit und Kriminalgericht Moabit. Koordinaten und Beschreibungen stehen in `mapPlaces` in `script.js`. Adressen und Koordinatenquellen sind unter [5] in sources.md dokumentiert. Marker sind Gebäude-Markierungen, keine Eingänge. Fiktionale Orte ohne gesicherte Adresse bleiben in einer separaten Textnotiz und bekommen keine erfundenen Geokoordinaten. Die Kartengrundlage zeigt heutige Strassen, nicht den historischen Stadtplan von 1927.

Bedienung: ziehen / Touch zum Verschieben, + und − zum Zoomen; per Tastatur Pfeile sowie +/−. Das Mausrad scrollt weiterhin die Seite. Markerschaltflächen und Standortliste funktionieren per Tastatur. „Beide Orte anzeigen“ setzt den Ausschnitt zurück. Ohne JavaScript oder bei Kachelausfall bleiben Standortangaben und ein Link zur OSM-Karte verfügbar. Beim lokalen Test HTTP-Server statt `file://` verwenden, damit Kartenanfragen einen gültigen Referer senden.

## GitHub Pages
1. Den **Inhalt dieses Ordners** in das Wurzelverzeichnis eines neuen GitHub-Repositories laden. Die Roman-PDF und private Originalaufnahmen nicht hochladen.
2. In GitHub unter **Settings → Pages → Build and deployment → Deploy from a branch** den Veröffentlichungsbranch (gewöhnlich `main`) und `/ (root)` wählen und speichern.
3. Nach abgeschlossenem Pages-Lauf die in GitHub angezeigte URL öffnen, typischerweise `https://BENUTZERNAME.github.io/REPOSITORY/`.
4. Alle Pfade sind relativ, daher funktioniert der Repository-Unterpfad. Gross-/Kleinschreibung auch bei Medien beachten.
5. Navigation, Mediendateien, VTT und Download nach der Veröffentlichung erneut testen.

Repository: https://github.com/PatrickFischerKSA/moabit-webspecial

GitHub Pages: https://patrickfischerksa.github.io/moabit-webspecial/

Veröffentlichung aus dem Branch `main`, Verzeichnis `/ (root)`. Für eine öffentliche Endfassung redaktionelle Verantwortlichkeit und gegebenenfalls erforderliche Anbieterangaben ergänzen.

## Lokale Testschritte
1. Desktop bei 1440 px, Tablet bei 768 px und Mobil bei 390/320 px öffnen. Kein horizontaler Scrollbalken; Fliesstext und Navigation müssen lesbar bleiben. Bei 200 % Browserzoom prüfen.
2. Jeden Navigationslink und jede Quellenreferenz anklicken. Alle Ziele müssen existieren.
3. Mit Tab ab Seitenanfang navigieren: Sprunglink erscheint, sichtbarer Fokus, keine Tastaturfalle. Enter/Leertaste auf Hypothesen und Kartenmarkern ausprobieren.
4. Alle drei Fallhypothesen anwählen: gedrückter Zustand und Rückmeldung ändern sich; keine definitive Todesursache wird behauptet.
5. Alle drei Kartenmarker anwählen: Quelle und Fiktionsstatus kontrollieren.
6. Bildregler fokussieren und mit Pfeiltasten 0–100 % durchlaufen. Prozentangabe und Trennlinie müssen folgen.
7. Audio per Knopf und nativen Controls starten/pausieren, bis zum Ende hören; Transkript öffnen. Beim Seitenaufruf darf kein Ton starten.
8. Notizfeld leer herunterladen: verständliche Meldung. Danach Text eingeben und herunterladen. Inhalt der TXT-Datei vergleichen; es wird nichts gespeichert oder gesendet.
9. Betriebssystemoption „Bewegung reduzieren“ aktivieren: keine Scrollanimationen. JavaScript deaktivieren: alle Texte, Quellen, Vergleichsbilder und native Audiosteuerung bleiben sichtbar; JS-Interaktionen sind dann nicht verfügbar.
10. Nach Einfügen eines Videos: Play/Pause, defekte Datei, Poster-Fallback und echte Untertitel testen. Aktuell ist kein echtes Video enthalten.
11. Netzwerkpanel: Kartenkacheln werden im Kartenabschnitt von OpenStreetMap geladen. Weitere externe Quellen öffnen erst nach Klick. Auf GitHub Pages selbst kann der Hostinganbieter technische Zugriffe protokollieren.

## Bekannte Grenzen
Keine vollständige WCAG-Zertifizierung oder Screenreader-Prüfung. Geografische Strassenkarte mit zwei realen Gebäude-Markierungen; keine historische Karte von 1927. Kein historisches Archivbild, zwei lizenzierte Berlin-Luftbilder von 2024; weitere eigene Berlin-Aufnahmen fehlen. Kein eindeutiger Todesnachweis im Roman. Die Demo ist eine redaktionelle Auswahl, keine vollständige wissenschaftliche Interpretation.

## Durchgeführte Prüfung am 22.10.2026
- JavaScript-Syntaxprüfung mit `node --check`: bestanden.
- HTML-Prüfung auf doppelte IDs, interne Anker und vorhandene lokale Verweisziele: bestanden.
- Browser: alle drei Hypothesen und Kartenmarker geprüft; Enter und Leertaste auf den Hypothesen, Enter auf einem Kartenmarker funktionieren.
- Bildregler per Pfeiltaste, Home und End geprüft: 51 %, 0 % und 100 %; Anzeige aktualisiert sich.
- Audiowiedergabe und Pause sowie leere und ausgefüllte Randnotiz mit Download-Auslösung geprüft.
- Sprunglink per Tab erreichbar. Quellenanker ohne fehlende Ziele.
- Desktop- und Mobilansichten in lokalen Test-Iframes mit 1440, 390 und 320 px geprüft. Tatsächliche Inhaltsbreiten nach Browser-Scrollleiste: 1425, 375, 305 px. Dokumentbreite jeweils identisch; keine horizontal überstehenden Elemente nach Korrektur von Titel, Karte und Zeitachse.
- Nicht durchgeführt: vollständiger Screenreader-Test, reales Mobilgerät, Betriebssystemwechsel auf reduzierte Bewegung, Test eines echten Videos oder eines öffentlichen GitHub-Pages-Deployments. Die entsprechenden Regeln und Einbaupunkte sind vorhanden; manuelle Nachprüfung bleibt nötig.

## Ergänzung: Fotos der heutigen Haftanstalt
Zwei Luftaufnahmen von A.Savin vom 29.07.2024 sind im Stadtabschnitt integriert. Beide liegen lokal, werden bei Bedarf nachgeladen und haben Alternativtexte sowie sichtbare Bildnachweise. Sie sind unter der Lizenz Freie Kunst 1.3 veröffentlicht; vollständige Angaben stehen unter [4] in sources.md. Die Dateien wurden ausschliesslich verkleinert und komprimiert. Beim Austausch oder Weitergeben Bildnachweise, Quellen und Lizenzlinks erhalten. Die Aufnahmen ersetzen kein standortgleiches historisches Vergleichspaar.

## Kartenupdate
Das ursprüngliche Schauplatzschema wurde durch eine echte Leaflet-/OpenStreetMap-Strassenkarte ersetzt. Frühere Testnotizen zu drei schematischen Markern beschreiben die Vorversion. Aktuell gibt es zwei geografisch verortete Gebäude und eine separate Notiz zu fiktionalen Orten.

Kartenprüfung: echte OSM-Kacheln lokal im Browser geladen; Standortwechsel per Enter, Zoom und Rücksetzen geprüft.
