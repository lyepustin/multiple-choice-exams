import React, { createContext, useContext } from "react";
import _ from "lodash";

const TestContext = createContext();

const TEST_SIZE = 10;

const TestProvider = ({ children }) => {
    const [testData, setTestData] = React.useState(null);

    const setQuestions = (questions) => {
        setTestData(_.sampleSize(questions, TEST_SIZE));
    };

    return (
        <TestContext.Provider
            value={{
                testData,
                setQuestions
            }}
        >
            {children}
        </TestContext.Provider>
    );
};

const useTest = () => {
    const test = useContext(TestContext);
    if (test) {
        return test;
    } else {
        console.error("You called useTest outside of the TestContext context");
    }
};

export { TestProvider, useTest };
