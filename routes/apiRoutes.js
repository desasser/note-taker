let noteData = require('../db/db.json');
const fs = require('fs');
const { stringify } = require('querystring');

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function(req, res) {
    // recieve new note to save
    const newNote = req.body;
    // add it to the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      
      // parse data from file into an array
      const newArr = JSON.parse(data);
      // add note to array
      newArr.push(newNote);
      // turn data into a string
      const dataWrite = JSON.stringify(newArr);
      // write the new string into the file, overwriting the previous version
      fs.writeFile('./db/db.json', dataWrite, (err) => {
        if (err) throw err;
        console.log('saved succesfully!');
      });
    });

    // return the new note to the client
    return newNote;
  });

  app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
    
    // read notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;

      const newArrDel = JSON.parse(data);
      // for each note, check to see if it matches the ID and delete it
      newArrDel.forEach((element) => {
        if (id = element.id) {
          //delete it
          delete element;
        };
      });
    });
  });
};