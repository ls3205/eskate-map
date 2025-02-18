import type { Marker as MarkerType } from "@prisma/client";
import { defaultIcon } from "@skatemap/icons/icons";
import type { Session } from "next-auth";
import React from "react";
import { Marker } from "react-leaflet";
import CustomMarkerPopup from "./CustomMarkerPopup";

interface CustomMarkerProps {
    marker: MarkerType;
    session?: Session | null;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ marker }) => {
    return (
        <Marker position={[marker.lat, marker.lng]} icon={defaultIcon}>
            <CustomMarkerPopup marker={marker} />
        </Marker>
    );
};

export default CustomMarker;
