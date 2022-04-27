const axios = require("axios").default;

const API_HOST = "/api/";

var AXIOS_CONFIG = {
    baseURL: API_HOST,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
    },
};

const API_AXIOS = () => {
    return axios.create(AXIOS_CONFIG);
};

module.exports = {
    API_HOST,
    API_AXIOS,
};
