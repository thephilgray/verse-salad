const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || "3000";
const app = express();

app.use(bodyParser.json());

app.get("/linecount/:lines", cors(), async (req, res) => {
  const lines = req.params.lines;
  try {
    const { data } = await axios.get(
      `http://poetrydb.org/linecount/${lines}:abs`
    );
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

app.listen(port, () => {
  //eslint-disable-next-line
  console.log(`Server listening on port ${port} for api requests...`);
});
