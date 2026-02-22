import axios from "axios";

export const apiKeycloak = axios.create({ baseURL: "http://localhost:8080" });
