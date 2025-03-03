import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";

import {
    header,
    headerContent,
    layoutWrapper,
    logoLink,
    pageContent,
    right,
} from "./layout.css";
import { RootState } from "@/store";

import Logo from "@/components/Logo";
import { HOMEPAGE } from "@/utils/constants";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { setThemeMode } from "@/store/themeSlice";

const Header = () => {
    const dispatch = useDispatch();

    const brandAccent = useSelector(
        (state: RootState) => state.theme.colors.brandAccent
    );
    const mode = useSelector((state: RootState) => state.theme.mode);

    const toggleMode = () =>
        dispatch(setThemeMode(mode === "dark" ? "light" : "dark"));

    return (
        <div className={header}>
            <Container size="4" className={headerContent} px="4">
                <Link
                    to={HOMEPAGE}
                    className={logoLink}
                    aria-label="Go to homepage"
                >
                    <Logo size={32} color={brandAccent} />
                </Link>
                <div className={right}>
                    <Button color="gray" variant="ghost" onClick={toggleMode}>
                        {mode === "dark" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </div>
            </Container>
        </div>
    );
};

const PageContent = ({ children }: PropsWithChildren) => {
    return (
        <Box id="page-content" className={pageContent} px="4">
            {children}
        </Box>
    );
};

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className={layoutWrapper}>
            <Header />
            <PageContent>{children}</PageContent>
        </div>
    );
};

export default Layout;
