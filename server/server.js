import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const CLIENT_ID = "33fc6b516be0430c970b12b848cf291f";
const CLIENT_SECRET = "4893f4c8a9dc48149aa0414f38514eab";

app.get("/spotify-token", async (req, res) => {
  try {
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
