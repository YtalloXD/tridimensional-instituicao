import axios from "axios";

const api = axios.create({
  baseURL: "https:1234" // trocar pela URL da API no Neon
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;