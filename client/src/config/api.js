import axios from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });

client.interceptors.response.use(
  (res) => {
    console.log("Response:", res);
    return res;
  },
  async (error) => {
    console.log("Error:", error);
    const { response } = error;
    const originalRequest = error.config;

    if (
      error.status === 401 &&
      response.data.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      await client.get("/refresh", {
        withCredentials: true,
      });

      return client(originalRequest);
    }

    if (error.status === 401) {
      await client.get("/logout", {
        withCredentials: true,
      });
    }
    return Promise.reject(error);
  },
);

export default client;
