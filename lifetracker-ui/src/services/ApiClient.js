import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
  }
  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  async request({ endpoint, method = "GET", data = {} }) {

    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = { "Content-Type": "application/json" }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({
        url,
        method,
        data,
        headers,
      });
      return { data: res.data, error: null };
    } catch (error) {
      console.log("error:", error);
      return { data: null, error };
    }
  }


  async loginUser(credentials) {
    return await this.request({
      endpoint: "auth/login",
      method: "POST",
      data: credentials,
    });
  }
  async registerUser(credentials) {
    console.log("credentials", credentials);
    return await this.request({
      endpoint: "auth/register",
      method: "POST",
      data: credentials,
    });
  }

  fetchUserFromToken = async () => {
    return await this.request({
      endpoint: "auth/me",
      method: "GET",
    });
  }
}

export default new ApiClient("https://lifetracker-server-deployed.onrender.com");