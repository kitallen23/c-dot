import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    hueSlider,
    hueThumb,
    sliderWidth,
} from "@/components/ColorPicker/HueSlider.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";

interface HueSliderProps {
    hue: number; // 0-360
    width?:
        | `${number}${"px" | "em" | "rem" | "%" | "vh" | "vw"}`
        | "auto"
        | "inherit"
        | "initial";
    onChange: (hue: number) => void;
}

export const HueSlider: React.FC<HueSliderProps> = ({
    hue,
    width,
    onChange,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate thumb position based on hue (0-360)
    const thumbStyle = {
        top: `calc(${(hue / 360) * 100}%)`,
    };

    const handleInteraction = useCallback(
        (clientY: number) => {
            const slider = sliderRef.current;
            if (!slider) return;

            const rect = slider.getBoundingClientRect();

            // Calculate hue based on position (0 at top, 360 at bottom)
            let percentage = (clientY - rect.top) / rect.height;
            percentage = Math.max(0, Math.min(1, percentage));

            const newHue = Math.round(percentage * 360);
            onChange(newHue);
        },
        [onChange]
    );

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleInteraction(e.clientY);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        handleInteraction(touch.clientY);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                handleInteraction(e.clientY);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging && e.touches[0]) {
                handleInteraction(e.touches[0].clientY);
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleEnd);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, handleInteraction]);

    // Convert hue to RGB for the background color
    const hueColor = `hsl(${hue}, 100%, 50%)`;

    return (
        <div
            className={hueSlider}
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={assignInlineVars({
                [sliderWidth]: width,
            })}
        >
            <div
                className={classNames(hueThumb, { isDragging })}
                style={thumbStyle}
            >
                <div />
                <div style={{ backgroundColor: hueColor }} />
            </div>
        </div>
    );
};

export default HueSlider;
