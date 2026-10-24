const express = require("express")
const fetchData = require("./fetchData.js")
const fs = require("node:fs")
let app = express()

app.use(express.json())

let port = 3000

app.get("/fetch_all_data", async (req, res) => {
    let data = await fetchData()
    res.json({ "mesagge": "data fetched successefully", data })
})

app.post("/add_data", async (req, res) => {
    let data = await fetchData()
    data.push(req.body)
    fs.writeFile("./taskdatabase.json", JSON.stringify(data,null,2), err => {
        if (err) {
            res.json({ "mesagge": err })

        } else {
            res.json({ "mesagge": "data writen successefully", data })
        }
    })
})

app.post("/updet_data/:id", async (req, res) => {
    let id = req.params.id
    let { task } = req.body
    let data = await fetchData()

    let taskItem = data.find(item => item.id == id)
    if (taskItem) {
        taskItem.task = task
        fs.writeFile("./taskdatabase.json", JSON.stringify(data, null, 2), err => {
            if (err) {
                res.json({ "mesagge": "error updating data" })
            } else {
                res.json({ "mesagge": "data updated successefully", data })
            }
        })
    } else {
        res.json({ "mesagge": "task not found" })
    }
})

app.post("/delete_data/:id", async (req, res) => {
    let id = req.params.id
    let data = await fetchData()

    let taskExists = data.find(item => item.id == id)
    if (taskExists) {
        let taskItem = data.filter(item => item.id != id)
        fs.writeFile("./taskdatabase.json", JSON.stringify(taskItem, null, 2), err => {
            if (err) {
                res.json({ "mesagge": "error updating data" })
            } else {
                res.json({ "mesagge": "data delete successefully", taskItem })
            }
        })
    } else {
        res.json({ "mesagge": "task not found" })
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})