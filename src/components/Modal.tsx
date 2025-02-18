"use client";

import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import { XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const router = useRouter();

    // const modalRef = useRef<any>(null);
    //
    // useEffect(() => {
    //     const handleEsc = (e: KeyboardEvent) => {
    //         if (e.key === "Escape") {
    //             router.back();
    //         }
    //     };
    //
    //     document.addEventListener("keydown", handleEsc);
    //
    //     return () => document.removeEventListener("keydown", handleEsc);
    // }, []);
    //
    // useEffect(() => {
    //     const handler = (e: MouseEvent) => {
    //         if (modalRef.current && !modalRef.current.contains(e.target)) {
    //             router.back();
    //         }
    //     };
    //
    //     window.addEventListener("click", handler);
    //
    //     return () => window.removeEventListener("click", handler);
    // });
    //
    // return (
    //     <div className="absolute top-0 left-0 flex h-dvh w-dvw items-center justify-center bg-black/80">
    //         <div
    //             className="bg-secondary relative flex h-fit min-h-96 w-fit min-w-[40%] items-center justify-center rounded-md"
    //             ref={modalRef}
    //         >
    //             <Button
    //                 variant={"ghost"}
    //                 onClick={() => router.back()}
    //                 className="absolute top-3 left-3 cursor-pointer"
    //             >
    //                 <XIcon />
    //             </Button>
    //             {children}
    //         </div>
    //     </div>
    // );

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="z-[600]">
                <DialogTitle>Add Marker</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
