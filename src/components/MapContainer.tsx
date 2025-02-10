"use client"

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import React from "react";

interface MapContainerProps {
    session?: Session | null;
}

const MapContainer: React.FC<MapContainerProps> = ({ session }) => {
    const Map = dynamic(() => import("../components/Map"), { ssr: false });

    return <Map session={session} /> 
};

export default MapContainer;
