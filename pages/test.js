import "tailwindcss/tailwind.css";
import React from "react";
import _ from "lodash";

import { useTest } from "providers/TestProvider";
import { useRouter } from "next/router";

export default function Test() {
    const [result, setResult] = React.useState({});
    const [checkMode, setCheckMode] = React.useState(false);
    const { testData } = useTest();
    const router = useRouter();

    React.useEffect(() => {
        if (!testData || _.values(testData).length == 0) {
            router.push("/");
        }
    }, [testData]);
    React.useEffect(() => {
        if (testData) {
            result = _.fromPairs(_.map(testData, (question) => [question.question, ""]));
        }
    }, [testData]);

    const answerQuestion = (answer, question) => {
        setResult({ ...result, [answer]: question });
    };

    const checkTest = () => {
        if (checkMode == false) {
            alert(
                `Has acertado ${
                    _.filter(testData, ({ question, correct_answer }) => result[question] == correct_answer).length
                } preguntas`
            );
        }
        setCheckMode(!checkMode);
    };

    const goBack = () => {
        router.push("/");
    };
    return (
        <div className="w-screen flex justify-center items-center py-10">
            <div className="md:rounded md:shadow w-[1000px] max-w-80 p-5 flex flex-col">
                <p className="hover:underline text-h3 cursor-pointer ml-auto text-light-3" onClick={goBack}>
                    Volver al menú
                </p>
                {_.map(testData, ({ question, answers, correct_answer }) => (
                    <div key={question} className="mb-5">
                        <p className="sm:text-h2 md:text-h4 mb-2">{question}</p>
                        {_.map(answers, (answer) => (
                            <label key={answer} className="flex items-center cursor-pointer">
                                <input type="radio" name={question} onClick={() => answerQuestion(question, answer)} />
                                <p
                                    className="sm:text-p1 md:text-p3 ml-2 pb-px"
                                    style={{
                                        color: checkMode && answer == correct_answer ? "green" : checkMode ? "red" : ""
                                    }}
                                >
                                    {answer}
                                </p>
                            </label>
                        ))}
                    </div>
                ))}
                <button onClick={checkTest} className="mt-3 rounded shadow py-1 px-2 bg-light-3">
                    <p className="text-white">Corregir Test</p>
                </button>
            </div>
        </div>
    );
}
