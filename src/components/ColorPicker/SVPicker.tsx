import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    svBlackGradient,
    svPicker,
    svPointer,
    svWhiteGradient,
} from "@/components/ColorPicker/SVPicker.css";
import { hsvToHsl } from "@/utils/colorUtils";

interface SVPickerProps {
    hue: number;
    saturation: number;
    value: number;
    onChange: (saturation: number, value: number) => void;
}

export const SVPicker: React.FC<SVPickerProps> = ({
    hue,
    saturation,
    value,
    onChange,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // const [tempSaturation, setTempSaturation] = useState(saturation);
    // const [tempValue, setTempValue] = useState(value);

    // Convert HSV values to position percentages
    const pointerStyle = {
        left: `${saturation}%`,
        bottom: `${value}%`,
    };

    // Handle mouse/touch interactions
    const handleInteraction = useCallback(
        (clientX: number, clientY: number) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();

            // Calculate saturation (x-axis) and value (y-axis) as percentages
            let newSaturation = ((clientX - rect.left) / rect.width) * 100;
            let newValue = ((rect.bottom - clientY) / rect.height) * 100;

            // Clamp values between 0-100
            newSaturation = Math.max(0, Math.min(100, newSaturation));
            newValue = Math.max(0, Math.min(100, newValue));

            onChange(newSaturation, newValue);
        },
        [onChange]
    );

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
    };

    // Add window event listeners for drag interactions
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                handleInteraction(e.clientX, e.clientY);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging && e.touches[0]) {
                handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
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
    }, [isDragging, onChange, handleInteraction]);

    // Convert hue to RGB for the background color
    const hueColor = `hsl(${hue}, 100%, 50%)`;

    const hsl = hsvToHsl(hue, saturation, value);

    return (
        <div
            className={svPicker}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ backgroundColor: hueColor }}
        >
            <div className={svWhiteGradient} />
            <div className={svBlackGradient} />
            <div className={svPointer} style={pointerStyle}>
                <div />
                <div />
                <div
                    style={{
                        backgroundColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
                    }}
                />
            </div>
        </div>
    );
};

export default SVPicker;
