import { nanoid } from "nanoid";
import { useEffect } from "react";

/**
 * Hook to inject CSS styles into the document head
 * @param styles CSS string to inject
 * @param id Optional unique identifier for the style element
 * @returns Cleanup function that can be called manually if needed
 */
function useStyleInjection(styles?: string | null, id?: string): () => void {
    useEffect(() => {
        if (!styles) {
            return;
        }

        const styleId = id || nanoid(6);

        // Remove existing style with the same ID if it exists
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }

        // Create and append the style element
        const styleElement = document.createElement("style");
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // Cleanup to remove the style when component unmounts
        return () => {
            document.getElementById(styleId)?.remove();
        };
    }, [styles, id]);

    // Return the cleanup function for manual removal if needed
    return () => {
        if (id) {
            document.getElementById(id)?.remove();
        }
    };
}

export default useStyleInjection;
