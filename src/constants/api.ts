import axios from "axios";

export const api = axios.create({
  baseURL: "http://SEU_IP_LOCAL:3000",
  timeout: 10000,
});
