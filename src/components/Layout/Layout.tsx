import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Box, Container } from "@radix-ui/themes";
import { useSelector } from "react-redux";

import {
    header,
    headerContent,
    layoutWrapper,
    logoLink,
    pageContent,
} from "./layout.css";
import { RootState } from "@/store";

// import { useTheme } from "@/utils/theme-provider";
import Logo from "@/components/Logo";
import { HOMEPAGE } from "@/utils/constants";

const Header = () => {
    const brandAccent = useSelector(
        (state: RootState) => state.theme.colors.brandAccent
    );

    return (
        <div className={header}>
            <Container size="4" className={headerContent}>
                <Link
                    to={HOMEPAGE}
                    className={logoLink}
                    aria-label="Go to homepage"
                >
                    <Logo size={36} color={brandAccent} />
                </Link>
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
