import { Box, Card, Container, Grid } from "@radix-ui/themes";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setSelectedColor } from "@/store/themeSlice";
import { COLOR_SYNC_DEBOUNCE } from "@/utils/constants";
import { isValidHexString } from "@/utils/colorUtils";
import { HSV, RGB } from "@/types/color";

import HSVColorPicker from "@/components/ColorPicker/HSVColorPicker";
import HexField from "@/components/ColorPicker/HexField";
import useColorState from "@/views/color/useColorState";
import { colorInput } from "@/views/color/ColorPage.css";
import RGBField from "@/components/ColorPicker/RGBField";

function ColorPage() {
    const dispatch = useDispatch();
    const accentName = useSelector(
        (state: RootState) => state.theme.colors.accentName
    );
    const selectedHex = useSelector(
        (state: RootState) => state.theme.colors.selected.hex
    );

    const { hex, hsv, rgb, updateColor } = useColorState(selectedHex);
    const updateHsv = (value: HSV) => updateColor(value, "hsv");
    const updateRgb = (value: RGB) => {
        if (
            value &&
            value.r === rgb.r &&
            value.g === rgb.g &&
            value.b === rgb.b
        ) {
            return;
        }
        updateColor(value, "rgb");
    };

    const handleSetSelectedColor = useCallback(
        (hex: string) => {
            if (isValidHexString(hex)) {
                dispatch(setSelectedColor(hex));
            }
        },
        [dispatch]
    );

    // Debounce changes to inputHex
    useEffect(() => {
        const timer = setTimeout(
            () => handleSetSelectedColor(hex),
            COLOR_SYNC_DEBOUNCE
        );

        return () => clearTimeout(timer);
    }, [hex, handleSetSelectedColor]);

    const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const categories = [
        { name: "Backgrounds", start: 1, end: 2 },
        { name: "Interactive components", start: 3, end: 5 },
        { name: "Borders and separators", start: 6, end: 7 },
        { name: "Solid colors", start: 8, end: 10 },
        { name: "Accessible text", start: 11, end: 12 },
    ];

    return (
        <Container size="4" py="8">
            <Card>
                <Box p="6">
                    <Grid columns="2" gap="4">
                        <HSVColorPicker color={hsv} onChange={updateHsv} />
                        <div style={{ maxWidth: "12em" }}>
                            <HexField
                                value={hex}
                                onChange={value => updateColor(value, "hex")}
                                className={colorInput}
                                autoSelect={true}
                            />
                            <RGBField
                                value={rgb}
                                onChange={updateRgb}
                                className={colorInput}
                                autoSelect={true}
                            />
                        </div>
                    </Grid>
                </Box>
            </Card>
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
