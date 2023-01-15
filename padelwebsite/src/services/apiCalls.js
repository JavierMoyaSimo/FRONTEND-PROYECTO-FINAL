import axios from "axios";

const dataBase = "http://localhost:3001";

export const loginUser = async (user) => {
  let res = await axios.post(dataBase + "/auth/login", user);
  return res;
};

export const registerUser = async (user) => {
  let res = await axios.post(dataBase + "/auth/register", user);
  return res;
};

export const bringSportscenters = async () => {
  let res = await axios.get(dataBase + "/sportscenters");

  return res.data;
};

export const searchSportscenters = async (criteria) => {
  let res = await axios.get(dataBase + "/sportscenters/province/" + criteria);

  return res.data;
};

export const bringUsers = async (jwt) => {
  let res = await axios.get(dataBase + "/users/", {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};

export const bringUserBooking = async (jwt) => {
  let res = await axios.get(dataBase + "/bookings/", {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};
export const eraseUser = async (notEmail, jwt) => {
  let res = await axios.delete(dataBase + "/users/deleteUser/" + notEmail, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};

export const rentGame = async (body, jwt) => {
  let res = await axios.post(dataBase + "/bookings/newBooking", body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res;
};

export const bringBookings = async (user, jwt) => {
  let res = await axios.get(dataBase + "/bookings/bookings/" + user, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data.resp;
};


export const bringGamesbySportsCenter = async (details, jwt) => {
  let res = await axios.get(dataBase + "/games/games/" + details,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

  return res.data;
};

export const bringGames = async (jwt) => {
  let res = await axios.get(dataBase + "/games", {
    headers: { Authorization: `Bearer ${jwt}` },
  });


  return res.data;
};


export const eraseGame = async (notGame, jwt) => {
  let res = await axios.delete(dataBase + "/games/deleteGame/" + notGame, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};

export const createGame = async (body, jwt) => {
  let res = await axios.post(dataBase + "/games/newGame", body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });


  return res.data;
};