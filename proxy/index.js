const { API_AXIOS } = require("./config");

module.exports = {
    getSubjects: async (params) => {
        const { data } = await API_AXIOS().get(
            `elastic?operation=damelotodo_papy&params=${JSON.stringify(params)}`
        );
        return data;
    },
    createTest: async (params) => {
        const { data } = await API_AXIOS().post(
            `elastic?operation=create_test`,
            params
        );
        return data;
    },
};
