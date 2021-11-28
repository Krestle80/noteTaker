const express = require('express');
const path = require('path');


const app = express()
const PORT = 3001

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

//get aved notes 

app.get('/api/notes')
app.listen(PORT, (req,res) => {
    console.log(`App now listening at localhost:${PORT}`)
})