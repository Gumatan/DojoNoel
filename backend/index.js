const connection = require("./conf");
const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/api/liste_noel/enfants", (req, res) => {
  connection.query("select * from enfants", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/api/liste_noel/enfants", (req, res) => {
  const formData = req.body;
  console.log(formData);
  connection.query("insert into enfants SET ?", formData, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Succesfully added a child");
    }
  });
});

app.get("/api/liste_noel", (req, res) => {
  connection.query(
    "select * from enfants join cadeaux on cadeaux.enfants_id = enfants.id",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.delete("/api/liste_noel/enfants/:id", (req, res) => {
  const idEnfant = req.params.id;
  connection.query("DELETE FROM enfants WHERE id = ?", idEnfant, err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting a child");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  } else {
    console.log("server running on port " + port);
  }
});
