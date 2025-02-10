"use client";

import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@skatemap/components/ui/DropdownMenu";
import { SunMoonIcon } from "lucide-react";
import { cn } from "@skatemap/lib/utils";
import { buttonVariants } from "./ui/Button";

interface ThemeDropdownProps {
    className?: string;
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ className }) => {
    const [theme, setTheme] = useState("system"); //TODO: fix this from always resetting (zustand??)

    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        if (theme === "system") {
            localStorage.removeItem("theme");
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            }
        }

        if (theme === "dark") {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }

        if (theme === "light") {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "px-2",
                    className,
                )}
            >
                <SunMoonIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative mt-3 mr-2">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">
                        Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                        Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                        System
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeDropdown;
