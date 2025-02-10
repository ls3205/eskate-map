"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Session } from "next-auth";
import AddMarkerForm from "./AddMarkerForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetDBMarkers } from "@skatemap/app/actions";
import { Marker as MarkerType } from "@prisma/client";
import axios from "axios";
import CustomMarker from "./CustomMarker";
import { defaultIcon } from "@skatemap/icons/icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface MarkerLayerProps {
    session?: Session | null;
}

const MarkerLayer: React.FC<MarkerLayerProps> = ({ session }) => {
    let moveTimer: ReturnType<typeof setTimeout>;

    const { mutate: GetMarkersInView } = useMutation({
        mutationKey: [`GetMarkers`],
        mutationFn: async (bounds: L.LatLngBounds) => {
            const { data }: { data: MarkerType[] } = await axios.get(
                `/api/markers?neLat=${bounds.getNorthEast().lat}&neLng=${bounds.getNorthEast().lng}&swLat=${bounds.getSouthWest().lat}&swLng=${bounds.getSouthWest().lng}`,
            );

            return data;
        },
        onError: (err) => {
            console.log(err);
        },
        onSuccess: (data) => {
            const tempArr = markerArray;
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
                setTempPopoverPos(e.layerPoint);
                setShowTempMarker(true);
                const marker = tempMarkerRef.current;
                // @ts-expect-error: i'm probably doing something stupid in the next line
                marker ? marker.openPopup() : null;

                map.panTo(e.latlng);
            } else {
                map.panTo(e.latlng);
            }
        },
        moveend: (e) => {
            if (moveTimer) {
                clearTimeout(moveTimer);
            }

            moveTimer = setTimeout(() => {
                GetMarkersInView(map.getBounds());
            }, 1000);
        },
    });

    useEffect(() => {
        GetMarkersInView(map.getBounds());
    }, []);

    const [tempMarkerLatLong, setTempMarkerLatLong] = useState<
        [lat: number, lng: number] | null
    >([map.getCenter().lat, map.getCenter().lng]);
    const [showTempMarker, setShowTempMarker] = useState<boolean>(false);
    const tempMarkerRef = useRef(null);

    const [tempPopoverPos, setTempPopoverPos] = useState<L.Point | null>(null);

    const [markerArray, setMarkerArray] = useState<MarkerType[]>([]);

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
                    icon={defaultIcon}
                    interactive={showTempMarker}
                >
                    <Popup closeOnEscapeKey>
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
            {markerArray.map((marker, key) => {
                return (
                    <CustomMarker marker={marker} session={session} key={key} />
                );
            })}
        </>
    );
};

export default MarkerLayer;
