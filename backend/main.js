const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const body_parser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(body_parser.json());

const PORT = process.env.PORT || 8000;

const filePath = (path_input) => {
  return path.join(__dirname, path_input);
};

app.get("/", (req, res) => {
  let path = filePath("./data.json");
  res.status(200).sendFile(path);
});

app.post("/create_data", (req, res) => {
  const data = req.body;
  try {
    let jsonFile = JSON.parse(fs.readFileSync(filePath("./data.json")));
    jsonFile.push(data);
    fs.writeFileSync(filePath("./data.json"), JSON.stringify(jsonFile));
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error has occured in the server");
  }
});

app.listen(PORT, () => {
  console.log(`Running in here : http://localhost:${PORT}`);
});
