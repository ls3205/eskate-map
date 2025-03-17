import LogInSelection from "@skatemap/components/LogInSelection";
import ThemeDropdown from "@skatemap/components/ThemeDropdown";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="relative flex min-h-dvh flex-col items-center justify-center">
            <LogInSelection />
            <ThemeDropdown className="absolute right-5 bottom-5" />
        </main>
    );
};

export default page;
