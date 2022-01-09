
const express = require('express')
const app = express()
const port = 4000
const reader = require('xlsx')
app.use(express.json());
const fs = require('fs')

var cors = require('cors');
        app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend Working')
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  

app.post('/get-question', (req, res) => {
    const {
        difficulty
    } = req.body;
    const file = fs.readFileSync('./files/data.json', 'utf8')
    const data = JSON.parse(file);
    const ObjectData = Object.keys(data);
    let result = [];
    ObjectData.forEach((id) => {
        if (difficulty != "" && data[id].Difficulty == difficulty) {
            data[id].url = `https://leetcode.com/problems/${data[id].titleSlug}`
            result.push(data[id])
        }
    })
    res.send({
        status: 200,
        data: result
    })
    
})

app.post('/get-random-question', (req, res) => {
    const {
        difficulty
    } = req.body;
    const file = fs.readFileSync('./files/data.json', 'utf8')
    const data = JSON.parse(file);
    const ObjectData = Object.keys(data);
    let result = [];
    ObjectData.forEach((id) => {
        if (difficulty != "" && data[id].Difficulty == difficulty) {
            data[id].url = `https://leetcode.com/problems/${data[id].titleSlug}`
            result.push(data[id])
        }
    })
    const rand = getRandomInt(result.length)
    res.send({
        status: 200,
        data: [result[rand]]
    })
})

app.post('/set-status', (req, res) => {
    const {
        id,
        status
    } = req.body;
    const file = fs.readFileSync('./files/data.json', 'utf8')
    const data = JSON.parse(file);
    data[`${id}`].Done = status;
    fs.writeFileSync('./files/data.json', JSON.stringify(data));
    res.send({
        status: 200,
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
