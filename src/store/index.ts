import { configureStore } from "@reduxjs/toolkit";
import { radixColorMiddleware } from "@/store/middleware/radixColorMiddleware";

import themeReducer from "@/store/themeSlice";
import { validateColorMiddleware } from "@/store/middleware/validateColorMiddleware";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(validateColorMiddleware)
            .concat(radixColorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
