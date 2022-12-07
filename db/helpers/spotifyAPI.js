const axios = require("axios");

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const client_code = Buffer.from(
  `${spotify_client_id}:${spotify_client_secret}`
).toString("base64");

//returns access token
const getAuth = async () => {
  try {
    const token_url = "https://accounts.spotify.com/api/token";
    const response = await axios.post(
      token_url,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${client_code}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

//gets a list of 100 albums
const getAlbumList = async () => {
  try {
    //request token using getAuth() function
    const access_token = await getAuth();

    const albumIds = [];
    let url = "https://api.spotify.com/v1/browse/new-releases?limit=50";
    //get first 50 albums
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    response.data.albums.items.forEach((album) => albumIds.push(album.id));
    //get next 50 albums
    url += "&offset=50";
    const resOffset = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    resOffset.data.albums.items.forEach((album) => albumIds.push(album.id));

    return albumIds;
  } catch (error) {
    console.error(error);
  }
};

//get the list of albums information
const getAlbumData = async () => {
  try {
    const access_token = await getAuth();
    const albumIds = await getAlbumList();
    const uniqueAlbumIds = albumIds.filter(
      (id, index, arr) => arr.indexOf(id) === index
    );

    let artists = [];
    let albums = [];

    //get actual albums 20 at a time
    for (let i = 0; i < Math.ceil(uniqueAlbumIds.length / 20); i++) {
      //get 20 ids at a time and put it on the url
      let setOfAlbumIds = uniqueAlbumIds.slice(i * 20, 20 + i * 20).join(",");
      //request album data from server
      let albumsResponse = await axios.get(
        `https://api.spotify.com/v1/albums?ids=${setOfAlbumIds}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      //get artists
      let setOfArtistIds = albumsResponse.data.albums.map(
        (album) => album.artists[0].id
      );

      let artistsResponse = await axios.get(
        `https://api.spotify.com/v1/artists?ids=${setOfArtistIds}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      //add the albums to an array
      albums = [...albums, ...albumsResponse.data.albums];
      artists = [...artists, ...artistsResponse.data.artists];
    }
    return [albums, artists];
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAlbumData };
