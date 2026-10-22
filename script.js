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
const places={
 jva:['1 / Untersuchungshaftanstalt','Historischer Ort. Bau 1877–1881; belegt seit 1881. Die hier gezeigte Position ist schematisch. Quelle: JVA Moabit [2].'],
 home:['2 / Familie Ritter','Fiktionaler Wohnort im Roman am Rand der Gefängnismauer. Keine dokumentierte Wohnung einer historischen Familie und keine behauptete Hausadresse. Quelle: PDF-Blatt 102 [1].'],
 night:['3 / Charlys Nachtleben','Literarischer Handlungsraum: Chausseepalast und später Moka Efti werden im Roman genannt. Der Marker bündelt diese Orte nur schematisch. Historische Standorte und zeitliche Passung sind offen zu recherchieren. Quelle: PDF-Blätter 99–106 [1].']
};
document.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-place]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 const data=places[button.dataset.place],box=document.querySelector('#place-feedback'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=data[0];p.textContent=data[1];box.replaceChildren(h,p);
}));
const range=document.querySelector('#compare');range.addEventListener('input',()=>{document.querySelector('#compare-stage').style.setProperty('--split',`${range.value}%`);document.querySelector('#compare-value').value=`${range.value} %`;});
const audio=document.querySelector('#audio'),audioButton=document.querySelector('#audio-toggle');audioButton.hidden=false;
audioButton.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();}catch{audioButton.textContent='Audio nicht verfügbar – Transkript öffnen';}}else audio.pause();});
audio.addEventListener('play',()=>audioButton.textContent='Sounddesign pausieren');audio.addEventListener('pause',()=>audioButton.textContent='Sounddesign abspielen');audio.addEventListener('ended',()=>audioButton.textContent='Sounddesign erneut abspielen');
const video=document.querySelector('#hero-video'),videoButton=document.querySelector('#video-toggle');
// Ein eigenes Video aktivieren: data-src="assets/video/berlin-hero.mp4" am video ergänzen.
if(video.dataset.src){video.hidden=false;video.src=video.dataset.src;videoButton.hidden=false;videoButton.addEventListener('click',async()=>{if(video.paused){try{await video.play();}catch{videoButton.textContent='Video nicht verfügbar';}}else video.pause();});video.addEventListener('play',()=>videoButton.textContent='Video pausieren');video.addEventListener('pause',()=>videoButton.textContent='Video abspielen');video.addEventListener('error',()=>{videoButton.textContent='Video fehlt – Poster wird angezeigt';video.hidden=true;video.removeAttribute('src');video.load();},{once:true});}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');reduced.addEventListener('change',e=>{if(e.matches)video.pause();});
if('IntersectionObserver' in window&&!reduced.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.people article,.voices article,.timeline,.editorial-strip,.today-grid article').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el);});}
document.querySelector('#download-note').addEventListener('click',()=>{const note=document.querySelector('#reflection').value.trim(),status=document.querySelector('#note-status');if(!note){status.textContent='Bitte zuerst eine Randnotiz eingeben.';document.querySelector('#reflection').focus();return;}const blob=new Blob(['MOABIT – persönliche Randnotiz\n\n'+note+'\n'],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='moabit-randnotiz.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Die Randnotiz wurde zum Download bereitgestellt.';});
