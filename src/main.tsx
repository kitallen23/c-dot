import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@radix-ui/themes/styles.css";
import "@/styles/global.css";
import App from "@/App";

import ColorPage from "@/views/color/ColorPage.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";

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
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
