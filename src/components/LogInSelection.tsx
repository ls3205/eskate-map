"use client";

import React from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface LogInSelectionProps {}

const LogInSelection: React.FC<LogInSelectionProps> = ({}) => {
    const loginWithGoogle = async () => {
        try {
            await signIn("google");
        } catch (err) {
            console.log(err);
        } finally {
        }
    };

    return (
        <div>
            <Button variant={"ghost"} onClick={loginWithGoogle}>
                <Image
                    src={
                        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    }
                    alt="GoogleSVG"
                    width={25}
                    height={25}
                    className="mr-2"
                />
                Log In With Google
            </Button>
        </div>
    );
};

export default LogInSelection;
