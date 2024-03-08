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
  response.render("index");
});

// Maak een POST route voor de index
app.post("/", function (request, response) {
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, "/");
});

// Maak een GET route voor een detailpagina met een request parameter id
app.get("/favourites", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson("https://fdnd-agency.directus.app/items/f_houses/" + request.params.id).then(
    (apiData) => {
      console.log(apiData);
      // Render favourites.ejs uit de views map en geef de opgehaalde data mee
      response.render("favourites", apiData);
    },
  );
});

// Post route voor likes
app.post("/:id/detail", function (request, response) {
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

