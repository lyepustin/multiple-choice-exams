import "tailwindcss/tailwind.css";
import React from "react";
import { useRouter } from "next/router";

import { useTest } from "providers/TestProvider";
import Proxy from "proxy";
import _ from "lodash";

export default function Home() {
    const [subjects, setSubjects] = React.useState([]);
    const [formData, setFormData] = React.useState({});

    const { setQuestions } = useTest();
    const router = useRouter();

    React.useEffect(async () => {
        const data = await Proxy.getSubjects();
        setSubjects(data.subjects);
    }, []);

    const selectTopic = (subject, topic) => {
        if (formData[subject]) {
            var newSubjectTopics = [...formData[subject]];
            if (_.find(newSubjectTopics, (t) => t == topic)) {
                _.remove(newSubjectTopics, (t) => t == topic);
            } else {
                newSubjectTopics.push(topic);
            }
            setFormData({ ...formData, [subject]: newSubjectTopics });
        } else {
            setFormData({ ...formData, [subject]: [topic] });
        }
    };

    const handleFormSubmit = async () => {
        var data = await Proxy.createTest(formData);
        setQuestions(data.form);
        router.push("test");
    };

    return (
        <div className="w-screen flex justify-center items-center py-10">
            <div className="md:rounded md:shadow w-[400px] max-w-80 p-5">
                {_.map(subjects, ({ subject, topics }) => (
                    <div key={subject}>
                        <p className="sm:text-h2 md:text-h4 mb-2">{subject}</p>
                        {_.map(topics, (topic) => (
                            <label key={topic} className="flex items-center cursor-pointer">
                                <input type="checkbox" onClick={() => selectTopic(subject, topic)} />
                                <p className="sm:text-p1 md:text-p3 ml-2 pb-px">{topic}</p>
                            </label>
                        ))}
                    </div>
                ))}
                <div class="flex flex-row justify-center items-center">
                    <button onClick={handleFormSubmit} className="mt-3 rounded shadow py-1 px-2 bg-light-3">
                        <p className="text-white">Create Test</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
