let noteData = require('../db/db.json');
const fs = require('fs');

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function(req, res) {
    
  });

  app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
  });
}