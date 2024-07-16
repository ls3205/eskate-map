import React from "react";
import ThemeDropdown from "./ThemeDropdown";
import UserLogin from "./UserLogin";
import { Separator } from "./ui/Separator";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <div className="absolute right-5 top-5 flex flex-row space-x-2 rounded-full bg-background p-3">
            <UserLogin />
            <Separator orientation="vertical" className="h-auto" />
            <ThemeDropdown />
        </div>
    );
};

export default Navbar;
