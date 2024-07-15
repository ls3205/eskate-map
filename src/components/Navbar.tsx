import React from "react";
import ThemeDropdown from "./ThemeDropdown";
import UserDropdown from "./UserDropdown";
import UserLogin from "./UserLogin";
import { Separator } from "./ui/separator";

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
