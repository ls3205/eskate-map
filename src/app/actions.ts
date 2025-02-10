"use server"

import { db } from "@skatemap/server/db"
import type { formSchema } from "@skatemap/components/AddMarkerForm"
import type { z } from "zod"

export const AddMarker = async (data: z.infer<typeof formSchema>, creatorId: string) => {
    const dbMarker = await db.marker.create({
        data: {
            creatorId: creatorId,
            lat: data.lat,
            lng: data.lng,
            type: data.type,
            title: data.title,
            description: data.description
        }
    })

    return dbMarker
}

export const GetDBMarkers = async (neBound: { lat: number, lng: number }, swBound: { lat: number, lng: number }) => {
    console.log('get start');

    const dbMarkers = await db.marker.findMany(({
        where: {
            lat: { lte: neBound.lat, gte: swBound.lat },
            lng: { lte: neBound.lng, gte: swBound.lng }
        }
    }))

    console.log('get end');

    console.log(dbMarkers);

    return dbMarkers
}
