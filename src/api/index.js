const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || "3000";
const app = express();

app.use(bodyParser.json());
// const lines = req.params.lines;
// const url = `http://poetrydb.org/linecount/${lines}:abs`;

app.get("/linecount/:lines", cors(), async (req, res) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/`);
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.listen(port, () => {
  //eslint-disable-next-line
  console.log(`Server listening on port ${port} for api requests...`);
});
