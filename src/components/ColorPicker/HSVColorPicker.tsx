import React from "react";
import { SVPicker } from "./SVPicker";
import { HueSlider } from "./HueSlider";
import {
    colorPicker,
    hueSliderContainer,
    svPickerContainer,
} from "@/components/ColorPicker/HSVColorPicker.css";

interface HSV {
    h: number; // 0-360
    s: number; // 0-100
    v: number; // 0-100
}

interface HSVColorPickerProps {
    color: HSV;
    onChange: (color: HSV) => void;
}

export const HSVColorPicker: React.FC<HSVColorPickerProps> = ({
    color,
    onChange,
}) => {
    const handleSVChange = (s: number, v: number) => {
        onChange({ ...color, s, v });
    };

    const handleHueChange = (h: number) => {
        onChange({ ...color, h });
    };

    return (
        <div className={colorPicker}>
            <div className={svPickerContainer}>
                <SVPicker
                    hue={color.h}
                    saturation={color.s}
                    value={color.v}
                    onChange={handleSVChange}
                />
            </div>
            <div className={hueSliderContainer}>
                <HueSlider hue={color.h} onChange={handleHueChange} />
            </div>
        </div>
    );
};

export default HSVColorPicker;
