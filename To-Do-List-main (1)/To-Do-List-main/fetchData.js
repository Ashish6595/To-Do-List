const fs = require("fs").promises;
async function fetchData() {

    let FetchedData = await fs.readFile("./taskdatabase.json", "utf-8")

    return JSON.parse(FetchedData)

}
module.exports = fetchData