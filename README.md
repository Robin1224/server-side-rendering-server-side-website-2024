> _Fork_ deze leertaak en ga aan de slag. Onderstaande outline ga je gedurende deze taak in jouw eigen GitHub omgeving uitwerken. De instructie vind je in: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)

# Titel
Funda Opgeslagen Huizen - Serverside rendering

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
De opgeslagen huizen pagina van Funda. Gebruikt Node, EJS en Directus om een database van opgeslagen huizen aan een gebruiker te kunnen tonen.

![image](https://github.com/Robin1224/server-side-rendering-server-side-website-2024/assets/81151231/4fbd8f27-906a-4b67-aa84-da03da9ff970)
De website is gehost via cyclic.sh:
https://exuberant-pig-parka.cyclic.app/favorieten

## Gebruik
De gebruiker kan zijn opgeslagen huizen overichtelijk op deze pagina zien. In toekomstige sprints komt er functionaliteit om deze huizen ook een rating te geven, en om verschillende lijsten van huizen te kunnen bekijken

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met Javascript gedaan en hoe? Misschien heb je een framwork of library gebruikt? -->

Gebruikte technologieën:
* Node
* EJS
* Directus
* Cyclic

De server logica staat in `server.js`. Dit rendert een pagina uit de `/views` directory, en deze gebruiken components uit `/view/partials`

## Installatie
1. Clone de repo naar je eigen werkomgeving
2. Run `npm install` om alle dependencies te installeren
3. Start een lokale dev server met `npm start`


## Bronnen
* MDN
* StackOverflow
* Directus docs
* EJS docs

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
