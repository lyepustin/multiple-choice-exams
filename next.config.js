const path = require("path");

module.exports = {
    wcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    webpack: (config) => {
        config.resolve.alias.services = path.resolve(__dirname, "./services");
        config.resolve.alias.proxy = path.resolve(__dirname, "./proxy");
        config.resolve.alias.providers = path.resolve(__dirname, "./providers");
        return config;
    },
};
