"use client"

import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface CustomZoomProps {}

const CustomZoom: React.FC<CustomZoomProps> = ({}) => {
    const [zoomInControl, setZoomInControl] = useState<HTMLAnchorElement | undefined>(undefined)
    const [zoomOutControl, setZoomOutControl] = useState<HTMLAnchorElement | undefined>(undefined)

    useEffect(() => {
        const zoomInArray = document.getElementsByClassName("leaflet-control-zoom-in") as HTMLCollectionOf<HTMLAnchorElement>;
        const zoomOutArray = document.getElementsByClassName("leaflet-control-zoom-out") as HTMLCollectionOf<HTMLAnchorElement>;
        
        if (zoomInArray[0] === undefined || zoomOutArray[0] === undefined) {
            console.log("uhoh");
        }

        console.log(zoomInArray[0]);
        console.log(zoomOutArray[0]);

        setZoomInControl(zoomInArray[0]);
        setZoomOutControl(zoomOutArray[0]);
    }, [])

    return (
        <div className="absolute bottom-12 right-4 w-10 h-16 flex flex-col space-y-1">
            <Button variant={"ghost"} className="bg-background rounded-full" onClick={() => zoomInControl?.click()}>
                <PlusIcon className="" />
            </Button>
            <Button variant={"ghost"} className="bg-background rounded-full" onClick={() => zoomOutControl?.click()}>
                <MinusIcon />
            </Button>
        </div>
    );
};

export default CustomZoom;
