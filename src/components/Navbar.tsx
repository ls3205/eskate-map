import React from "react";
import ThemeDropdown from "./ThemeDropdown";
import UserLogin from "./UserLogin";
import { Separator } from "./ui/Separator";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <div className="bg-background absolute top-5 right-5 flex flex-row space-x-2 rounded-md p-2">
            <UserLogin />
            <Separator orientation="vertical" className="h-auto" />
            <ThemeDropdown />
        </div>
    );
};

export default Navbar;
