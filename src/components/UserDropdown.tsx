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
import { Button, buttonVariants } from "./ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@skatemap/lib/utils";

interface UserDropdownProps {
    session: Session;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ session }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex flex-row rounded-md p-1",
                )}
            >
                <Avatar className="mr-2 h-7 w-7">
                    <AvatarImage src={session.user.image!} alt="UserImage" />
                    <AvatarFallback>
                        <UserIcon />
                    </AvatarFallback>
                </Avatar>
                <h1 className="mr-2 h-full leading-8">{session.user.name}</h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3 mr-4 p-2">
                <div className="bg-secondary flex justify-between space-x-4 rounded-lg p-2">
                    <Avatar>
                        <AvatarImage
                            src={session.user.image!}
                            alt="UserImage"
                        />
                        {/* <AvatarFallback> // not a single clue why commenting this out fixes the icon issue but oh well
                            <UserIcon />
                        </AvatarFallback> */}
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            {session.user.name}
                        </h4>
                        <p className="text-sm">{session.user.email}</p>
                    </div>
                </div>
                <div className="mt-2 grid grid-flow-col grid-rows-2 gap-2">
                    <Link
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "row-span-2 grid grid-rows-subgrid",
                        )}
                        href={"/myprofile"}
                    >
                        Profile
                    </Link>
                    {/* <Button className="row-span-2 grid grid-rows-subgrid"></Button> */}
                    <Button></Button>
                    <Button
                        variant={"destructive"}
                        className="px-0"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
