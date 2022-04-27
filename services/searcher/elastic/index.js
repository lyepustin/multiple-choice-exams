const { Client } = require("@elastic/elasticsearch");
const config = require("./config");
var _ = require("lodash");

var client = null;
const index = process.env.elasticsearch_index;

exports.initialize = async () => {
    if (!client) {
        client = new Client(config.ClientConfig);
        console.log("Elastic Storage System initialized");
    }
};

exports.get_subjects = async () => {
    try {
        var data = await client.search({
            index: index,
            body: {
                size: 0,
                aggs: {
                    subjects: {
                        terms: {
                            field: "subject.keyword",
                            size: 100
                        },
                        aggs: {
                            topics: {
                                terms: {
                                    field: "topic.keyword",
                                    size: 100
                                }
                            }
                        }
                    }
                }
            }
        });
        var subjects = [];
        var subject_buckets = _.get(data, "body.aggregations.subjects.buckets", []);
        for (var subject_bucket of subject_buckets) {
            var {
                key: subject_key,
                topics: { buckets }
            } = subject_bucket;
            subjects.push({
                subject: subject_key,
                topics: _.map(buckets, "key")
            });
        }
        return subjects;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.create_test = async (request) => {
    try {
        var subjecs = _.keys(request);
        var topics = _.flatMap(_.values(request));
        var data = await client.search({
            index: index,
            body: {
                size: 2000,
                query: {
                    bool: {
                        must: [
                            {
                                terms: {
                                    "subject.keyword": subjecs
                                }
                            },
                            {
                                terms: {
                                    "topic.keyword": topics
                                }
                            }
                        ]
                    }
                }
            }
        });
        questions = _.map(data.body.hits.hits, "_source");
        for (var n in questions) {
            questions[n]["answers"] = _.shuffle(questions[n]["answers"]);
        }
        return questions;
    } catch (error) {
        console.log(error);
        return null;
    }
};
