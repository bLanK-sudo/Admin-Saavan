import axios from "axios";

const devUrl = "https://saavan23dev.onrender.com/";
const url = process.env.PUBLIC_URL || devUrl;

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
