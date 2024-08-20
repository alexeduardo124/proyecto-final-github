import axios from "axios";

export const githubCloneApi = axios.create({
  baseURL: "https://github-clone-api-p0bi.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

// // Interceptor para agregar encabezados de CORS
// githubCloneApi.interceptors.request.use(
//   (config) => {
//     config.headers["Access-Control-Allow-Origin"] = "*";
//     config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
//     config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
