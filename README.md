# Elokuvasovellus

Oulun ammattikorkeakoulun web-ohjelmoinnin sovellusprojektina teimme nettisivun, jossa voi selata ja arvostella elokuvia, luoda oman käyttäjätilin ja etsiä elokuvia. Projektin tekijät ovat tieto- ja viestintätekniikan 2. vuoden opiskelijat Mauri Olli, Sasha Olli, Terhi Repo, Jasper Kari ja Jyri Rosle-Krekilä. Roolijakoa eri tehtävien teossa jaoimme Kanban-taulun avulla, jonne pilkoimme sovelluksen eri toimintoja, joista kukin pystyi ottamaan omia tehtäviä. Mauri, Olli ja Jasper vastasivat suunnittelupuolesta ollessaan ryhmän alkuperäisjäseniä, ja Jyri ja Terhi tulivat projektiryhmään myöhemmässä vaiheessa mukaan.

Nettisivun serveri rakennettiin Node Expressillä, tietokantana käytettiin PostgreSQL:ää ja frontend tehtiin Reactilla. Kielinä olivat JSX, CSS, JavaScript ja SQL. Tietokanta ja valmis sovellus ovat Render-ympäristössä ja käyttää The Movie Database -sivuston rajapintoja.

Sivuston etusivulla (kuva 1) on navigaatiopalkki ylhäällä, josta voi valita käyttäjäasetukset, etsiä elokuvia (kuva 2 ja 3), luoda käyttäjätunnuksen tai kirjautua sisään. Sinne oli tarkoitus tulla myös ryhmät, mitä ominaisuutta ei saatu valmiiksi frontendin osalta. Etusivulla on kuvakaruselli, josta voi valita elokuvan, lukea esittelytekstin, tehdä arvioinnin ja merkitä suosikiksi.

![frontpage](https://github.com/TVT22-25/elokuvasovellus/assets/127750359/84805ff7-533b-4907-886b-c9e8862be4e6)
_Kuva 1: etusivu_

Kuvassa 3 näkyy hakutuloksia. Haku on toteutettu sivun yläreunassa olevan hakupalkin kautta. Siihen annetun inputin jälkeen enter-näppäintä painamalla avautuu uusi ikkuna, jossa hakua voidaan suodattaa erikseen vielä pudotusvalikkojen avulla, julkaisuvuoden, -vuosikymmenen tai arvostelukeskiarvon perusteella. Hakutulokset tulevat näkyviin ruudukkomuodossa, jossa näkyy elokuvan kuva, nimi, julkaisupäivämäärä ja arvostelutulos.

![login](https://github.com/TVT22-25/elokuvasovellus/assets/127750359/6cf7857c-7ea9-4a60-92df-8fb21d972d26)
_Kuva 2: sisäänkirjautumisikkuna_

![search](https://github.com/TVT22-25/elokuvasovellus/assets/127750359/b2ecda5b-00a4-4502-84f6-1f922870bfd1)
_Kuva 3: suodatetun haun tuloksia_

Alkuperäistä ER-kaaviota (kuva 4). Varsinaiseen sovellukseen tuli myös tietokanta näkymien piilottamiselle/esiintuonnille.
<img width="606" alt="database" src="https://github.com/TVT22-25/elokuvasovellus/assets/127750359/7fc6fb8b-4a8a-4148-bbcf-96c72a9b3e30">
_Kuva 4: ER-kaavio_

![uiwireframe](https://github.com/TVT22-25/elokuvasovellus/assets/127750359/fc39f02d-ade6-4b09-8500-d4998c4831a4)
_Kuva 5: UI-wireframe_

## Käyttöönotto

Ensimmäiseksi lataa projekti tietokoneellesi. Tähän tarvitset Git-sovelluksen. Jos sitä ei ole, käy asentamassa se. Jos et tiedä onko sinulla Git-sovellusta, voit kirjoittaa Git-version terminaaliin. Seuraavaksi avaa kansio, johon haluat ladata projektin ja kirjoita git clone https://github.com/TVT22-25/elokuvasovellus. Tämä lisää kansion elokuvasovellus, jossa projekti on.

Nettisivun saa aloitettua avaamalla terminaalin client-kansiossa. Terminaaliin pitää kirjoittaa npm install --legacy-peer-deps, mikä asentaa tarvittavat kirjastot. Komennon käyttö voi antaa monta varoitusta, mikä on normaalia. Seuraavaksi kirjoita npm start, mikä käynnistää nettisivun (kuva 4). Nettisivun pitäisi automaattisesti aueta selaimessa. Jos se ei aukea automaattisesti niin mene osoitteeseen http://localhost:3000 ja nettisivun pitäisi olla siellä. Terminaali täytyy pitää auki sivun käytön ajan.

![startingclient](https://github.com/TVT22-25/elokuvasovellus/assets/127750359/64ea44e2-f079-4b8a-96d2-09fc68bdedcb)
_Kuva 6: client-puolen käynnistys_

Serverin, jota nettisivun käyttöön tarvitsee, voi aukaista avaamalla terminaalin server-kansioon. Terminaaliin pitää kirjoittaa npm install, mikä asentaa tarvittavat kirjastot. Seuraavaksi terminaaliin kirjoitetaan npm start, mikä aukaisee serverin. Terminaali täytyy pitää auki serverin käytön ajan (kuva 5).

![startingserver](https://github.com/TVT22-25/elokuvasovellus/assets/127750359/fdf05a98-f249-4c6b-bd59-2a2cef5ceba7)
_Kuva 7: server-puolen käynnistys_

Sovellus on myös löydettävissä osoitteessa <https://elokuvasovellus-dmk8.onrender.com/>.

