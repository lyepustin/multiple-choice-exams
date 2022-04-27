const config = require("./config");

let searcher = null;

const initializeSearcher = async () => {
    switch (config.SEARCHER_SYSTEM) {
        case "ELASTIC":
            searcher = require("./searcher/elastic");
            await searcher.initialize();
            break;
    }
    return searcher;
};

const getService = (service, serviceName) => {
    if (!service) {
        throw new Error(`${serviceName} is not initialized`);
    }
    return service;
};

module.exports = {
    initialize: async () => {
        searcher = await initializeSearcher();
    },
    searcher: () => {
        return getService(searcher, "Searcher");
    },
};
