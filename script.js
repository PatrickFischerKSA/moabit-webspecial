'use strict';
// Redaktionelle Rückmeldungen: ausschliesslich Paraphrasen, keine Figurenzitate.
const feedback = {
 injury: {title:'Plausibel als Befürchtung. Nicht als gesicherte Todesursache.',text:'Ritter schildert den kräftigen Schlag gegen Brucks Hinterkopf und den anschliessenden Sturz. Nach Brucks Tod hofft er sogar auf eine andere Ursache, um die eigene Schuld nicht tragen zu müssen. Der spätere gerichtsmedizinische Bericht klärt die Todesursache jedoch nicht eindeutig.',source:'PDF-Blätter 63–64, 72–75 und 125. Die Textstelle belegt Gewalt und Schuldgefühl; sie beweist keinen tödlichen Kausalverlauf.'},
 murder: {title:'Ein konkretes Indiz. Kein eindeutiger Mordbeweis.',text:'Böhm berichtet Charly von Kissenfasern in Brucks Atemwegen. Der Tote lag mit dem Gesicht im Kissen; die Fasern könnten laut diesem Bericht auch ohne fremde Gewalt dorthin gelangt sein. Eine Erstickung mit dem Kissen bleibt möglich, aber unbewiesen.',source:'PDF-Blatt 125. Verdacht und Befund sind auseinanderzuhalten; ein Täter lässt sich daraus nicht bestimmen.'},
 illness: {title:'Ein neuer Befund. Die letzte Lücke bleibt.',text:'Böhm teilt Charly mit, dass ein fortgeschrittener Gehirntumor gefunden wurde. Im Roman wird eine mögliche Verbindung zum Angriff erwogen. Die Erkrankung eröffnet eine weitere Erklärung und verändert den Blick auf Ritters Schuld; sie legt die unmittelbare Todesursache nicht eindeutig fest.',source:'PDF-Blätter 125 und 128. Die Erklärung einer Romanfigur ist kein unabhängiges medizinisches Gutachten.'}
};
document.querySelectorAll('[data-hypothesis]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-hypothesis]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 const item=feedback[button.dataset.hypothesis],box=document.querySelector('#case-feedback');
 box.replaceChildren(); const title=document.createElement('strong'),p=document.createElement('p'),source=document.createElement('p'),link=document.createElement('a');
 title.textContent=item.title;p.textContent=item.text;source.textContent=item.source;link.href='#q1';link.textContent='Zur Primärquelle [1]';box.append(title,p,source,link);
}));
// Reale Gebäude-Koordinaten; fiktionale Wohn- und Nachtlokale werden nicht verortet.
const mapPlaces = {
 jva: {number:1, name:'JVA Moabit', coordinates:[52.524694444444,13.35475], description:'Alt-Moabit 12a, 10559 Berlin. Markiert ist der Gebäudekomplex, kein Besuchereingang. Historischer Bau und heutiger Standort sind belegt. Quellen [2] und [5].'},
 court: {number:2, name:'Kriminalgericht Moabit', coordinates:[52.526388888889,13.352777777778], description:'Turmstrasse 91, 10559 Berlin. Der reale Gerichtsstandort liegt unmittelbar neben dem Haftkomplex. Die Markierung bezeichnet das Gebäude, keinen gesondert geprüften Zugang. Quelle [5].'}
};
const mapElement=document.querySelector('#geo-map'),mapStatus=document.querySelector('#map-status');
let streetMap=null;
const mapMarkers={};
function showMapPlace(key,move=true){
 const place=mapPlaces[key];
 document.querySelectorAll('[data-map-place]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapPlace===key)));
 const heading=document.createElement('h3'),p=document.createElement('p'),link=document.createElement('a');
 heading.textContent=`${place.number} / ${place.name}`;p.textContent=place.description;link.href='#q5';link.textContent='Standort- und Kartennachweise [5]';
 document.querySelector('#place-feedback').replaceChildren(heading,p,link);
 if(move&&ensureStreetMap()){streetMap.setView(place.coordinates,17,{animate:false});mapMarkers[key].openPopup();}
}
function ensureStreetMap(){
 if(streetMap)return true;
 if(!window.L){mapStatus.textContent='Die interaktive Karte ist nicht verfügbar. Die Standortangaben und der Link zu OpenStreetMap bleiben nutzbar.';return false;}
 mapElement.replaceChildren();
 streetMap=L.map(mapElement,{scrollWheelZoom:false,zoomControl:true,keyboard:true,minZoom:11,maxZoom:19,attributionControl:true}).setView([52.5255,13.354],16);
 streetMap.attributionControl.setPrefix(false);
 L.control.scale({imperial:false}).addTo(streetMap);
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',referrerPolicy:'strict-origin-when-cross-origin'}).addTo(streetMap);
 tiles.on('tileerror',()=>{mapStatus.textContent='Einige Kartenkacheln konnten nicht geladen werden. Standortangaben bleiben verfügbar; die Karte lässt sich auch direkt auf OpenStreetMap öffnen.';});
 streetMap.zoomControl.setPosition('topleft');
 const controls=mapElement.querySelectorAll('.leaflet-control-zoom a');
 controls[0].setAttribute('aria-label','Karte vergrössern');controls[0].title='Karte vergrössern';controls[1].setAttribute('aria-label','Karte verkleinern');controls[1].title='Karte verkleinern';
 Object.entries(mapPlaces).forEach(([key,place])=>{
  const marker=L.marker(place.coordinates,{icon:L.divIcon({className:'geo-marker',html:`<span>${place.number}</span>`,iconSize:[38,38],iconAnchor:[19,19]}),title:place.name,alt:place.name,keyboard:true}).addTo(streetMap);
  marker.getElement().setAttribute('aria-label',place.name);
  const popup=document.createElement('div'),title=document.createElement('strong'),address=document.createElement('p');title.textContent=place.name;address.textContent=key==='jva'?'Alt-Moabit 12a':'Turmstrasse 91';popup.append(title,address);marker.bindPopup(popup);marker.on('click',()=>showMapPlace(key,false));mapMarkers[key]=marker;
 });
 streetMap.fitBounds(Object.values(mapPlaces).map(p=>p.coordinates),{padding:[65,65],maxZoom:16,animate:false});
 return true;
}
document.querySelectorAll('[data-map-place]').forEach(button=>button.addEventListener('click',()=>showMapPlace(button.dataset.mapPlace)));
document.querySelector('#map-reset').addEventListener('click',()=>{if(ensureStreetMap()){streetMap.closePopup();streetMap.fitBounds(Object.values(mapPlaces).map(p=>p.coordinates),{padding:[65,65],maxZoom:16,animate:false});}});
// Erst in der Nähe der Karte Kacheln laden; kein Vorladen oder Offline-Download.
if('IntersectionObserver' in window){const mapObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){ensureStreetMap();mapObserver.disconnect();}},{rootMargin:'150px'});mapObserver.observe(mapElement);}else ensureStreetMap();
const range=document.querySelector('#compare');
function updateComparison(){const value=Number(range.value);document.querySelector('#compare-stage').style.setProperty('--split',`${value}%`);document.querySelector('#compare-value').value=`${value} %`;document.querySelector('.before-date').hidden=value<20;document.querySelector('.after-date').hidden=value>80;document.querySelectorAll('[data-compare]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.compare)===value)));}
range.addEventListener('input',updateComparison);document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>{range.value=b.dataset.compare;updateComparison();}));updateComparison();
const audio=document.querySelector('#audio'),audioButton=document.querySelector('#audio-toggle');audioButton.hidden=false;
audioButton.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();}catch{audioButton.textContent='Audio nicht verfügbar – Transkript öffnen';}}else audio.pause();});
audio.addEventListener('play',()=>audioButton.textContent='Sounddesign pausieren');audio.addEventListener('pause',()=>audioButton.textContent='Sounddesign abspielen');audio.addEventListener('ended',()=>audioButton.textContent='Sounddesign erneut abspielen');
const video=document.querySelector('#hero-video'),videoButton=document.querySelector('#video-toggle');
// Ein eigenes Video aktivieren: data-src="assets/video/berlin-hero.mp4" am video ergänzen.
if(video.dataset.src){video.hidden=false;video.src=video.dataset.src;videoButton.hidden=false;videoButton.addEventListener('click',async()=>{if(video.paused){try{await video.play();}catch{videoButton.textContent='Video nicht verfügbar';}}else video.pause();});video.addEventListener('play',()=>videoButton.textContent='Video pausieren');video.addEventListener('pause',()=>videoButton.textContent='Video abspielen');video.addEventListener('error',()=>{videoButton.textContent='Video fehlt – Poster wird angezeigt';video.hidden=true;video.removeAttribute('src');video.load();},{once:true});}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');reduced.addEventListener('change',e=>{if(e.matches)video.pause();});
if('IntersectionObserver' in window&&!reduced.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.people article,.voices article,.timeline,.editorial-strip,.today-grid article').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el);});}
document.querySelector('#download-note').addEventListener('click',()=>{const note=document.querySelector('#reflection').value.trim(),status=document.querySelector('#note-status');if(!note){status.textContent='Bitte zuerst eine Randnotiz eingeben.';document.querySelector('#reflection').focus();return;}const blob=new Blob(['MOABIT – persönliche Randnotiz\n\n'+note+'\n'],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='moabit-randnotiz.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Die Randnotiz wurde zum Download bereitgestellt.';});
