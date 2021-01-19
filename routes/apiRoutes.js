let noteData = require('../db/db.json');
const fs = require('fs');
const { stringify } = require('querystring');

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  //TODO: syntax for read/write file, returning newNote?
  app.post("/api/notes", function(req, res) {
    // recieve new note to save
    const newNote = req.body;
    // add it to the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      
      // console.log('im a new note', newNote);
      // console.log('this is data', JSON.parse(data));
      const newArr = JSON.parse(data);
      newArr.push(newNote);
      // console.log(newArr);
      const dataWrite = JSON.stringify(newArr);
      // console.log('new array', newArr);
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
    const newArr = fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
    });
    // for each note, check to see if it matches the ID and delete it
    newArr.forEach((element) => {
      if (id = element.id) {
        //delete it
        delete element;
      };
    });
  });
};