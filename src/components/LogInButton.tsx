"use client";

import React from "react";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";

interface LogInButtonProps {}

const LogInButton: React.FC<LogInButtonProps> = ({}) => {
    return (
        <Button className="h-auto px-2 py-1 bg-primary rounded-lg" onClick={() => signIn()}>
            Log In
        </Button>
    );
};

export default LogInButton;
