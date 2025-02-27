import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@radix-ui/themes/styles.css";
import "@/styles/global.css";
import "@/styles/customTheme.css";
import App from "@/App";

import ColorPage from "@/views/color/ColorPage.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <ColorPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </HelmetProvider>
    </StrictMode>
);
