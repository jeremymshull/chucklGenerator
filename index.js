import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  try {
    // Fetch a random activity from the Chuck Norris API
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    const result = response.data.value;
    
    // Render the index.ejs file with the random activity
    res.render("index.ejs", { joke: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    
    // Render the index.ejs file with an error message
    res.render("index.ejs", {
      joke: error.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});