import type { Marker as MarkerType } from "@prisma/client";
import { EllipsisVertical, Flag, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Popup } from "react-leaflet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Button, buttonVariants } from "./ui/Button";
import type { Session } from "next-auth";
import { DeleteMarker } from "@skatemap/app/actions";

interface CustomMarkerPopupPros {
    marker: MarkerType;
    session?: Session | null;
}

const CustomMarkerPopup: React.FC<CustomMarkerPopupPros> = ({
    marker,
    session,
}) => {
    return (
        <Popup
            closeButton={false}
            className="relative min-h-24 w-96 rounded-md bg-black md:w-sm lg:w-md"
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="absolute top-3 right-3 p-2"
                    >
                        <EllipsisVertical className="w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {marker.creatorId == session?.user.id ? (
                        <>
                            <DropdownMenuItem>
                                <Pencil />
                                <span>Edit</span>
                                {/* TODO: make edit modal/page  */}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={buttonVariants({
                                    variant: "destructive",
                                })}
                                onClick={() => DeleteMarker(marker)} //TODO: Make this a mutation
                            >
                                <Trash2 />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <DropdownMenuItem>
                            <Flag />
                            <span>Report</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="m-3 mr-16 mb-6 w-full">
                <h2 className="text-xl">{marker.type.replaceAll("_", " ")}</h2>
                <h1 className="text-3xl">{marker.title}</h1>
                <p>Submitted by {marker.creatorId}</p>
            </div>

            <p className="p-4">{marker.description}</p>

            <div>comments</div>
        </Popup>
    );
};

export default CustomMarkerPopup;
