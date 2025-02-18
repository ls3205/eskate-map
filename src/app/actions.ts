"use server";

import { db } from "@skatemap/server/db";
import type { formSchema } from "@skatemap/components/AddMarkerForm";
import type { z } from "zod";
import { getServerAuthSession } from "@skatemap/server/auth";

export const AddMarker = async (data: z.infer<typeof formSchema>) => {
    try {
        const session = await getServerAuthSession();

        if (session?.user) {
            const dbMarker = await db.marker.create({
                data: {
                    creatorId: session.user.id,
                    lat: data.lat,
                    lng: data.lng,
                    type: data.type,
                    title: data.title,
                    description: data.description,
                },
            });

            return dbMarker;
        } else {
            throw new Error("You need to be logged in to execute this");
        }
    } catch (err) {
        console.log(err);
        throw new Error("An Error Occurred");
    }
};

export const GetDBMarkers = async (
    neBound: { lat: number; lng: number },
    swBound: { lat: number; lng: number },
) => {
    console.log("get start");

    const dbMarkers = await db.marker.findMany({
        where: {
            lat: { lte: neBound.lat, gte: swBound.lat },
            lng: { lte: neBound.lng, gte: swBound.lng },
        },
    });

    console.log("get end");

    console.log(dbMarkers);

    return dbMarkers;
};
