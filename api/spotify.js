export default async function handler(req, res) {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  // Get Spotify Access Token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const tokenData = await tokenResponse.json();
  const access_token = tokenData.access_token;

  // Example: fetch artist data
  const { artistId } = req.query;
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const data = await response.json();
  res.status(200).json(data);
}
