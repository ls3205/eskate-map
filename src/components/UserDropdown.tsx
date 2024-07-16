"use client";

import { Session } from "next-auth";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { User, UserIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";

interface UserDropdownProps {
    session: Session;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ session }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row rounded-full bg-accent p-1 transition-colors duration-200 hover:bg-primary">
                <Avatar className="mr-2 h-7 w-7">
                    <AvatarImage src={session.user.image!} alt="UserImage" />
                    <AvatarFallback>
                        <UserIcon />
                    </AvatarFallback>
                </Avatar>
                <h1 className="mr-2 h-full leading-7">{session.user.name}</h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-3 p-2">
                <div className="flex justify-between space-x-4 bg-secondary p-2 rounded-lg">
                    <Avatar>
                        <AvatarImage
                            src={session.user.image!}
                            alt="UserImage"
                        />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            {session.user.name}
                        </h4>
                        <p className="text-sm">{session.user.email}</p>
                    </div>
                </div>
                <div className="grid grid-rows-2 grid-flow-col gap-2 mt-2">
                    <Button className="grid grid-rows-subgrid row-span-2"></Button>
                    <Button></Button>
                    <Button variant={"destructive"} className="px-0" onClick={() => signOut()}>Sign Out</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
