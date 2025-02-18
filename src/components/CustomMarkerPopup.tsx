import { Marker as MarkerType } from "@prisma/client";
import React from "react";
import { Popup } from "react-leaflet";

interface CustomMarkerPopupPros {
    marker: MarkerType;
}

const CustomMarkerPopup: React.FC<CustomMarkerPopupPros> = ({ marker }) => {
    return <Popup closeButton={false}>{"popup for marker " + marker.id}</Popup>;
};

export default CustomMarkerPopup;
