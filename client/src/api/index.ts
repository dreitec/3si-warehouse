import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000/v0";

// TODO: authentication

// export const apiPing = () => getJSON(`${baseUrl}/ping`);
// export const getProviders = () => getJSON(`${baseUrl}/providers`);
// export const getOneChild = () => getJSON(`${baseUrl}/children/test`);
export const getOneYearChildData = async () => {
  const data = await axios.get(`${baseUrl}/children/year`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
