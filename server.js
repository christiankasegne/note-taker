const fs = require(`fs`);
const express = require(`express`);
const path = require(`path`);
const notes = require(`./db/db.json`);
const uuid = require('uuid');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

app.get(`/notes`, (req, res) => {
    res.sendFile(path.join(__dirname, `/db/db.json`))
});

//add note to db file
app.post(`/api/notes`, (req, res) => {
    const notes =JSON.parse(fs.readFileSync(`./db/db.json`));
    const newNotes= req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileAsync(`/db/db.json`, JSON.stringify(notes));
    res.json(notes);
});
//delete Notes from db file
app.delete(`/api/notes/:id`, (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`./db/db.json`));
    const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync(`./db/db.json`, JSON.stringify(deleteNote));
    res.json(deleteNote);
})


app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `public/index.html`))
  });
app.get(`/notes`, (req, res) => {
  res.sendFile(path.join(__dirname, `public/notes.html`))
});



app.listen(PORT, () =>
  console.log(`App listening on PORT` + PORT)
);