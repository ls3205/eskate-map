"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false },
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false },
);

interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
    const [latLong, setlatLong] = useState<[lat: number, long: number]>([
        40.7, -74,
    ]);

    const [zoom, setZoom] = useState<number>(13)

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
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    );
};

export default Map;
