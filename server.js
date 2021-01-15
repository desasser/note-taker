// Require express
var express = require("express");
// Initialize app as the server
var app = express();
// Initialize PORT
var PORT = process.env.PORT || 8080;

// Require middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes location
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Route: /notes, returns notes.html
// Route: *, returns the index.html file

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
