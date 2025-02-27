import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import Layout from "@/components/Layout/Layout";
import { Theme } from "@radix-ui/themes";

function App() {
    return (
        <>
            <Helmet>
                <title>C.</title>
            </Helmet>
            <Theme appearance="dark" scaling="100%" accentColor="gray">
                <Layout>
                    <Outlet />
                </Layout>
            </Theme>
        </>
    );
}

export default App;
