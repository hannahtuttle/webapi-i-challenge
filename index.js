// implement your API here
const express = require('express');

const Data = require('./data/db.js')

const server = express();

server.use(express.json())

server.post('/api/users', (req, res) => {

    const dbInfo = req.body;

    Data.add(dbInfo)
    .then(result => {
        if(result){
            res.status(201).json(result)
        }else{
            res.status(404).json({errorMessage: "Please provide name and bio for the user."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error while saving the user to the database" })
    })
})

server.get('/api/users', (req, res) => {
    Data.find()
    .then(result => {
        res.status(200).json(Data)
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {

    const dataID = req.params.id;

    Data.findById(dataID)
    .then(result => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.delete()

const port = 8000;

server.listen(port, () => console.log('port 8000 listening'))