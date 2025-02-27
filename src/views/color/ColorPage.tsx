import { Container, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setSelectedColor } from "@/store/themeSlice";
import { COLOR_SYNC_DEBOUNCE } from "@/utils/constants";

function ColorPage() {
    const dispatch = useDispatch();
    const brandAccent = useSelector(
        (state: RootState) => state.theme.colors.brandAccent
    );

    const [inputHex, setInputHex] = useState(brandAccent);

    // Debounce changes to inputHex
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSelectedColor(inputHex));
        }, COLOR_SYNC_DEBOUNCE);

        return () => clearTimeout(timer);
    }, [inputHex, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputHex(event.target.value);
    };

    return (
        <Container size="4">
            <TextField.Root
                placeholder="Enter a color..."
                value={inputHex}
                onChange={handleChange}
            />
        </Container>
    );
}

export default ColorPage;
