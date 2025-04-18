import { globalStyle, style } from "@vanilla-extract/css";
import { topbarHeightVar } from "@/styles/global.css";

export const layoutWrapper = style({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
});

export const header = style({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: topbarHeightVar,
    background: "var(--gray-2)",
});

export const headerContent = style({
    height: "100%",
});
globalStyle(`${headerContent} .rt-ContainerInner`, {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
});

export const right = style({
    display: "flex",
    gap: "1em",
    alignItems: "center",
    justifyContent: "flex-end",
});

export const logoLink = style({
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
});

export const pageContent = style({
    marginTop: topbarHeightVar,
});
