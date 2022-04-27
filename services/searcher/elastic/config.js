exports.ClientConfig = {
    node: process.env.elasticsearch_node,
    auth: {
        username: process.env.elasticsearch_user,
        password: process.env.elasticsearch_password
    },
    ssl: {
        rejectUnauthorized: false
    }
};
