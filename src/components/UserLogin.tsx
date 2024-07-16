import { getServerAuthSession } from "@skatemap/server/auth";
import React from "react";
import UserDropdown from "./UserDropdown";
import LogInButton from "./LogInButton";

interface UserLoginProps {}

const UserLogin: React.FC<UserLoginProps> = async ({}) => {
    const session = await getServerAuthSession();

    return session?.user ? <UserDropdown session={session} /> : <LogInButton />;
};

export default UserLogin;
