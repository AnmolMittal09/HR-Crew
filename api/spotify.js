export default async function handler(req, res) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(500).json({ error: "Failed to fetch Spotify token", details: tokenData });
    }

    res.status(200).json(tokenData);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
