const express = require('express');
const uniqid = require('uniqid');
const path = require('path');
const {
    readFromFile,
    readAndAppend,
    deleteFromDb,
  } = require('./helpers/fsUtils');
  const uuid = require('./helpers/uuid');

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'))

//serving up html pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//get api notes 

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) =>res.json(JSON.parse(data)))

})

app.post('/api/notes', (req, res) => {
    console.log(req.body, "line 37");
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uniqid()
    };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully, Nice!`);
    } else {
      res.json('Error in adding Note');
    }
  });

app.delete('/api/notes/:id', (req,res) => {
  readFromFile('./db/db.json').then((data) =>deleteFromDb("./db/db.json", JSON.parse(data), req.params.id ))
})

app.listen(PORT, (req,res) => {
    console.log(`App now listening at localhost:${PORT}`) 
})