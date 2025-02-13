"use client";

import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "./ui/Button";
import { XIcon } from "lucide-react";

interface ModalProps {
    children: React.ReactNode;
    session?: Session;
}

const Modal: React.FC<ModalProps> = ({ children, session }) => {
    const router = useRouter();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                router.back();
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="absolute top-0 left-0 flex h-dvh w-dvw items-center justify-center bg-black/65">
            <Button
                variant={"ghost"}
                onClick={() => router.back()}
                className="absolute top-5 left-5"
            >
                <XIcon />
            </Button>

            <div className="bg-secondary flex h-fit min-h-96 w-fit min-w-[40%] items-center justify-center rounded-md">
                {children}
            </div>
        </div>
    );
};

export default Modal;
