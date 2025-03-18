import { Container, TextField } from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setSelectedColor } from "@/store/themeSlice";
import { COLOR_SYNC_DEBOUNCE } from "@/utils/constants";
import { isValidHexColor } from "@/utils/colorUtils";
import HSVColorPicker from "@/components/ColorPicker/HSVColorPicker";
import useColorState from "@/views/color/useColorState";

function ColorPage() {
    const dispatch = useDispatch();
    const brandAccent = useSelector(
        (state: RootState) => state.theme.colors.brandAccent
    );
    const accentName = useSelector(
        (state: RootState) => state.theme.colors.accentName
    );

    const [inputHex, setInputHex] = useState(brandAccent);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputHex(event.target.value);
    };

    const handleSetSelectedColor = useCallback(
        (hex: string) => {
            if (isValidHexColor(hex)) {
                dispatch(setSelectedColor(hex));
            }
        },
        [dispatch]
    );

    // Debounce changes to inputHex
    useEffect(() => {
        const timer = setTimeout(
            () => handleSetSelectedColor(inputHex),
            COLOR_SYNC_DEBOUNCE
        );

        return () => clearTimeout(timer);
    }, [inputHex, handleSetSelectedColor]);

    const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const categories = [
        { name: "Backgrounds", start: 1, end: 2 },
        { name: "Interactive components", start: 3, end: 5 },
        { name: "Borders and separators", start: 6, end: 7 },
        { name: "Solid colors", start: 8, end: 10 },
        { name: "Accessible text", start: 11, end: 12 },
    ];

    /** Test for HSV color picker **/
    // const [color, setColor] = useState({ h: 180, s: 50, v: 50 });
    const { hsv, updateHsv } = useColorState("#FFFFFF");
    // useEffect(() => {
    //     console.log(`hex: `, hex);
    // }, [hex]);

    return (
        <Container size="4" py="8">
            <TextField.Root
                placeholder="Enter a color..."
                value={inputHex}
                onChange={handleChange}
                type="text"
            />
            <HSVColorPicker color={hsv} onChange={updateHsv} />
            <div style={{ padding: "20px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                    }}
                >
                    {categories.map(category => (
                        <div key={category.name}>{category.name}</div>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}
                >
                    {steps.map(step => (
                        <div
                            key={step}
                            style={{ width: "40px", textAlign: "center" }}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                <div
                    style={{ display: "flex", gap: "4px", marginBottom: "4px" }}
                >
                    {steps.map(step => (
                        <div
                            key={step}
                            style={{
                                backgroundColor: `var(--${accentName}-${step})`,
                                height: "60px",
                                flex: 1,
                                borderRadius: "4px",
                            }}
                        />
                    ))}
                </div>

                <div
                    style={{ display: "flex", gap: "4px", marginBottom: "4px" }}
                >
                    {steps.map(step => (
                        <div
                            key={step}
                            style={{
                                backgroundColor: `var(--${accentName}-a${step})`,
                                height: "60px",
                                flex: 1,
                                borderRadius: "4px",
                            }}
                        />
                    ))}
                </div>

                <div style={{ display: "flex", gap: "4px" }}>
                    {steps.map(step => (
                        <div
                            key={step}
                            style={{
                                backgroundColor: `var(--gray-${step})`,
                                height: "60px",
                                flex: 1,
                                borderRadius: "4px",
                            }}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default ColorPage;
