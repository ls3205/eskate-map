"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Marker, Popup, ZoomControl } from "react-leaflet";
import Navbar from "./Navbar";
import MarkerLayer from "./MarkerLayer";
import { Session } from "next-auth";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false },
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false },
);

interface MapProps {
    session?: Session | null;
}

const Map: React.FC<MapProps> = ({ session }) => {
    const [latLong, setlatLong] = useState<[lat: number, long: number]>([
        40.7, -74,
    ]);

    const [zoom, setZoom] = useState<number>(13);

    const setLatLongHelper = (pos: GeolocationPosition) => {
        console.log(pos);
        return setlatLong([pos.coords.latitude, pos.coords.longitude]);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLatLongHelper);
        } else {
            setlatLong([40.7, -74]);
        }
    }, []);

    return (
        <MapContainer
            center={latLong}
            zoom={zoom}
            style={{ height: "100vh", width: "100vw" }}
            zoomControl={false}
            // whenReady={() => {}}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MarkerLayer session={session} />
            <ZoomControl position="bottomright" />
        </MapContainer>
    );
};

export default Map;
