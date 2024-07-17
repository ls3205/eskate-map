import { Marker as MarkerType } from "@prisma/client";
import { defaultIcon } from "@skatemap/icons/icons";
import { Session } from "next-auth";
import React from "react";
import { Marker } from "react-leaflet";

interface CustomMarkerProps {
    marker: MarkerType;
    session?: Session | null;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ marker }) => {
    return (
        <Marker position={[marker.lat, marker.lng]} icon={defaultIcon}></Marker>
    );
};

export default CustomMarker;
