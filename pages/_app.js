import "tailwindcss/tailwind.css";

import Head from "next/head";
import React from "react";

import { TestProvider } from "providers/TestProvider";

const Main = ({ Component, pageProps }) => {
    const [initialized, setInitialized] = React.useState(false);

    const initializeApp = async () => {
        setInitialized(true);
    };

    React.useEffect(() => {
        initializeApp();
    }, []);

    return (
        initialized && (
            <div className="max-w-screen w-screen relative">
                <Head>
                    <title>Test Maker</title>
                    <script src="https://unpkg.com/react/umd/react.production.min.js" />
                </Head>
                <TestProvider>
                    <Component {...pageProps} />
                </TestProvider>
            </div>
        )
    );
};

export default Main;
