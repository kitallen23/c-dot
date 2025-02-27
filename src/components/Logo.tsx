function Logo({ size = 128, color = "#FFFFFF" }) {
    const scale = size / 128;
    const center = 64 * scale;
    const outerRadius = 60 * scale;
    const innerRadius = 30 * scale;
    const outer1 = 106.6 * scale;
    const outer2 = 85.3 * scale;
    const outer3 = 94 * scale;
    const outer4 = 21.4 * scale;
    const outer5 = 42.7 * scale;
    const outer6 = 34 * scale;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <g transform={`rotate(22.5, ${size / 2}, ${size / 2})`}>
                <path
                    d={`M${center} ${4 * scale} 
                   A${outerRadius} ${outerRadius} 0 0 1 ${outer1} ${outer4}
                   L${outer2} ${outer5}
                   A${innerRadius} ${innerRadius} 0 0 0 ${center} ${34 * scale}Z`}
                    fill={`${color}54`}
                />
                <path
                    d={`M${outer1} ${outer4}
                   A${outerRadius} ${outerRadius} 0 0 1 ${124 * scale} ${center}
                   L${outer3} ${center}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer2} ${outer5}Z`}
                    fill={`${color}26`}
                />
                <path
                    d={`M${124 * scale} ${center}
                   A${outerRadius} ${outerRadius} 0 0 1 ${outer1} ${outer1}
                   L${outer2} ${outer2}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer3} ${center}Z`}
                    fill={`${color}54`}
                />
                <path
                    d={`M${outer1} ${outer1}
                   A${outerRadius} ${outerRadius} 0 0 1 ${center} ${124 * scale}
                   L${center} ${outer3}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer2} ${outer2}Z`}
                    fill={`${color}A8`}
                />

                {/* Separate full-opacity segments - not needed, keeping for historical purposes */}
                {/* <path
                    d={`M${center} ${124 * scale}
                   A${outerRadius} ${outerRadius} 0 0 1 ${outer4} ${outer1}
                   L${outer5} ${outer2}
                   A${innerRadius} ${innerRadius} 0 0 0 ${center} ${outer3}Z`}
                    fill={color}
                />
                <path
                    d={`M${outer4} ${outer1}
                   A${outerRadius} ${outerRadius} 0 0 1 ${4 * scale} ${center}
                   L${outer6} ${center}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer5} ${outer2}Z`}
                    fill={color}
                />
                <path
                    d={`M${4 * scale} ${center}
                   A${outerRadius} ${outerRadius} 0 0 1 ${outer4} ${outer4}
                   L${outer5} ${outer5}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer6} ${center}Z`}
                    fill={color}
                /> */}

                {/* Combined full-opacity segments */}
                <path
                    d={`M${center} ${124 * scale}
                   A${outerRadius} ${outerRadius} 0 0 1 ${outer4} ${outer1}
                   A${outerRadius} ${outerRadius} 0 0 1 ${4 * scale} ${center}
                   A${outerRadius} ${outerRadius} 0 0 1 ${outer4} ${outer4}
                   L${outer5} ${outer5}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer6} ${center}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer5} ${outer2}
                   A${innerRadius} ${innerRadius} 0 0 0 ${center} ${outer3}Z`}
                    fill={color}
                />
                <path
                    d={`M${outer4} ${outer4}
                   A${outerRadius} ${outerRadius} 0 0 1 ${center} ${4 * scale}
                   L${center} ${outer6}
                   A${innerRadius} ${innerRadius} 0 0 0 ${outer5} ${outer5}Z`}
                    fill={`${color}A8`}
                />
            </g>
        </svg>
    );
}

export default Logo;
