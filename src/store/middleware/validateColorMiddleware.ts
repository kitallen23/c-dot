import { Middleware } from "@reduxjs/toolkit";
import { setSelectedColor } from "@/store/themeSlice";
import { isValidHexString, normalizeHexColor } from "@/utils/colorUtils";

export const validateColorMiddleware: Middleware = () => next => action => {
    // Check if this is a setSelectedColor action
    if (setSelectedColor.match(action)) {
        const hexColor = action.payload;

        // Validate the hex color
        if (!isValidHexString(hexColor)) {
            console.warn(`Invalid hex color: ${hexColor}`);
            // Return without calling next(action), which prevents the reducer from running
            return;
        } else {
            return next({
                ...action,
                payload: normalizeHexColor(action.payload),
            });
        }
    }

    // If we get here, either it's not a setSelectedColor action or the hex is valid
    return next(action);
};
