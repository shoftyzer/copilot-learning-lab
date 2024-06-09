//Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//Load the comments.json file
let comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Read the comments.json file
app.get('/comments', (req, res) => {
    res.send(comments);
});

//Add new comment
app.post('/comments', (req, res) => {
    let newComment = req.body;
    let newId = comments.length + 1;
    newComment.id = newId;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send(newComment);
});

//Update comment
app.put('/comments/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let updatedComment = req.body;
    let index = comments.findIndex(comment => comment.id === id);
    comments[index] = updatedComment;
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send(updatedComment);
});

//Delete comment
app.delete('/comments/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send(comments);
});

//Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});