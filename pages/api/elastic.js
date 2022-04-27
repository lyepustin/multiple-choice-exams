const services = require("services");

export default async (req, res) => {
    try {
        await services.initialize();
        const { operation } = req.query;
        const params = req.body;
        switch (operation) {
            case "damelotodo_papy":
                const subjects = await services.searcher().get_subjects();
                res.send({ subjects });
                break;
            case "create_test":
                const form = await services.searcher().create_test(params);
                res.send({ form });
        }
    } catch (error) {
        console.log(error);
        res.send("joputa");
    }
};
