// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// Maak een GET route voor de index
app.get("/", function (request, response) {
  // Haal alle personen uit de WHOIS API op
  fetchJson("https://fdnd.directus.app/items/person").then((apiData) => {
    apiData.data.forEach((person) => {
      try {
        person.custom = JSON.parse(person.custom);
      } catch (error) {
        person.custom = {};
      }
    });

    // apiData bevat gegevens van alle personen uit alle squads
    // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
    if (request.query.squad) {
      apiData.data = apiData.data.filter(
        (person) => person.squad_id == request.query.squad,
      );
    }

    // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
    response.render("index", { persons: apiData.data, squads: squadData.data });
  });
});

// Maak een POST route voor de index
app.post("/", function (request, response) {
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, "/");
});

// Maak een GET route voor een detailpagina met een request parameter id
app.get("/detail/:id", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson("https://fdnd.directus.app/items/person/" + request.params.id).then(
    (apiData) => {
      // Render detail.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
      response.render("detail", {
        person: apiData.data,
        squads: squadData.data,
      });
    },
  );
});

// Post route voor likes
app.post("/detail/:id/like", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson("https://fdnd.directus.app/items/person/" + request.params.id).then(
    (apiData) => {
      try {
        apiData.data.custom = JSON.parse(apiData.data.custom);
      } catch (error) {
        apiData.data.custom = {};
      }

      if (apiData.data.custom.fmlikes) {
        apiData.data.custom.fmlikes = apiData.data.custom.fmlikes + 1;
      } else {
        apiData.data.custom.fmlikes = 1;
      }

      fetchJson("https://fdnd.directus.app/items/person/" + request.params.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          custom: JSON.stringify(apiData.data.custom),
        }),
      }).then(() => {
        response.redirect(303, "/");
      });
    },
  );
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

