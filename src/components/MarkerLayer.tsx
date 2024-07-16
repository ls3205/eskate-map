"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Session } from "next-auth";
import AddMarkerForm from "./AddMarkerForm";
import { useMutation } from "@tanstack/react-query";
import { GetMarkers } from "@skatemap/app/actions";
import { Marker as MarkerType } from "@prisma/client";

interface MarkerLayerProps {
    session?: Session | null;
}

const MarkerLayer: React.FC<MarkerLayerProps> = ({ session }) => {
    const { mutate: GetMarkersInView } = useMutation({
        mutationKey: [
            `GetMarkers`,
        ],
        mutationFn: async (bounds: L.LatLngBounds) => {
            console.log("func");

            const data = await GetMarkers(
                bounds.getNorthEast(),
                bounds.getSouthWest(),
            );

            console.log("func complete");

            return data;
        },
        onError: (err) => {},
        onSuccess: (data) => {
            var tempArr = markerArray;
            console.log(data);
            data.forEach((marker) => {
                if (!markerArray.includes(marker)) {
                    tempArr.push(marker);
                }
            });
            setMarkerArray(tempArr);
        },
    });

    const map = useMapEvents({
        click: (e) => {
            // tempMarkerLatLong ? clearTemp() : null;
            showTempMarker ? setShowTempMarker(false) : null;
        },
        popupclose: (e) => {
            // tempMarkerLatLong ? clearTemp() : null;
            showTempMarker ? setShowTempMarker(false) : null;
        },
        contextmenu: (e) => {
            if (session?.user) {
                setTempMarkerLatLong([e.latlng.lat, e.latlng.lng]);
                setShowTempMarker(true);
                const marker = tempMarkerRef.current;
                // @ts-expect-error
                marker ? marker.openPopup() : null;
            } else {
                map.panTo(e.latlng);
            }
        },
        moveend: (e) => {
            console.log("bruh");
            GetMarkersInView(map.getBounds());
        },
    });

    const [tempMarkerLatLong, setTempMarkerLatLong] = useState<
        [lat: number, lng: number] | null
    >([map.getCenter().lat, map.getCenter().lng]);
    const [showTempMarker, setShowTempMarker] = useState<boolean>(false);
    const tempMarkerRef = useRef(null);

    const [markerArray, setMarkerArray] = useState<MarkerType[]>([]);

    const icon = L.icon({
        iconUrl: "/images/marker-icon.png",
        shadowUrl: "/images/marker-shadow.png",
        popupAnchor: [0.5, -32.5],
        iconAnchor: [12.5, 35],
    });

    const clearTemp = () => {
        setTempMarkerLatLong(null);
    };

    return (
        <>
            {tempMarkerLatLong && session?.user ? (
                <Marker
                    position={tempMarkerLatLong}
                    opacity={showTempMarker ? 100 : 0}
                    ref={tempMarkerRef}
                    icon={icon}
                    interactive={showTempMarker}
                >
                    <Popup>
                        <AddMarkerForm
                            latLng={tempMarkerLatLong}
                            session={session}
                            markerRef={tempMarkerRef.current}
                        />
                    </Popup>
                </Marker>
            ) : (
                ""
            )}
            {markerArray.map((marker) => {
                return (
                    <Marker
                        position={[marker.lat, marker.lng]}
                        icon={icon}
                    ></Marker>
                );
            })}
        </>
    );
};

export default MarkerLayer;
