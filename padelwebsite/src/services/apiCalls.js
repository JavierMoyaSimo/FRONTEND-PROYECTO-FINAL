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

export const bringSportscenters = async () => {    // ESTO ANTES ERA bringMovies
  let res = await axios.get(dataBase + "/sportscenters");

  return res.data;
};

export const searchSportscenters = async (criteria) => {   // ESTO ANTES ERA searchMovies
  let res = await axios.get(dataBase + "/sportscenters/province/" + criteria);

  return res.data;
};

export const bringUsers = async (jwt) => {
  let res = await axios.get(dataBase + "/users/", {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};

export const bringUserBooking = async (notMail,jwt) => {
  let res = await axios.get(dataBase + "/bookings/bookings" + notMail, {   // ESTE HAY QUE REVISARLO
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data;
};
export const eraseUser = async (notMail, jwt) => {
  let res = await axios.delete(dataBase + "/users/deleteUser/" + notMail, {
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
  let res = await axios.get(dataBase + "/bookings/bookings" + user, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.data.resp;
};


export const bringGamesbySportsCenter = async (sportscenter) => {    
  let res = await axios.get(dataBase + "/games" + sportscenter);

  return res.data;
};