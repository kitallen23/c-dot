import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Theme } from "@radix-ui/themes";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

import Layout from "@/components/Layout/Layout";
import { setSelectedColor } from "@/store/themeSlice";
import { RootState, store } from "@/store";
import useStyleInjection from "@/hooks/useStyleInjection";

function App() {
    const { mode, colors, css } = useSelector(
        (state: RootState) => state.theme
    );
    useStyleInjection(css);

    // This will trigger the middleware to apply the initial colors
    useEffect(() => {
        // Dispatch an action to trigger the middleware
        // This is a bit of a hack, but it ensures the middleware runs on initial load
        store.dispatch(setSelectedColor(colors.selected.hex));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Helmet>
                <title>C.</title>
            </Helmet>
            <Theme
                appearance={mode}
                grayColor="gray"
                scaling="100%"
                accentColor={
                    colors.accentName as React.ComponentPropsWithoutRef<
                        typeof Theme
                    >["accentColor"]
                }
            >
                <Layout>
                    <Outlet />
                </Layout>
            </Theme>
        </>
    );
}

export default App;
