import axios from "axios";

const api = axios.create({
  baseURL: "https://club-recruitment.onrender.com"
});

export default api;