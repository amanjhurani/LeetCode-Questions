
const express = require('express')
const app = express()
const port = 4000
const reader = require('xlsx')
app.use(express.json());

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
    let data = [];
    const file = reader.readFile('./files/leetcode.xlsx')
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]])
    temp.forEach((row) => {
        if (difficulty != "" && row.Difficulty == difficulty) {
            row.url = `https://leetcode.com/problems/${row.titleSlug}`
            data.push(row)
        }
    })
    res.send({
        status: 200,
        data: data
    })
    
})

app.post('/get-random-question', (req, res) => {
    const {
        difficulty
    } = req.body;
    let data = [];
    const file = reader.readFile('./files/leetcode.xlsx')
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]])
    temp.forEach((row) => {
        if (difficulty != "" && row.Difficulty == difficulty) {
            row.url = `https://leetcode.com/problems/${row.titleSlug}`
            data.push(row)
        }
    })
    const rand = getRandomInt(data.length)
    res.send({
        status: 200,
        data: [data[rand]]
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
