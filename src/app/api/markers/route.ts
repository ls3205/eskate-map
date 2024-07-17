import { db } from "@skatemap/server/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const neLat = req.nextUrl.searchParams.get("neLat")
        const neLng = req.nextUrl.searchParams.get("neLng")

        const swLat = req.nextUrl.searchParams.get("swLat")
        const swLng = req.nextUrl.searchParams.get("swLng")

        const dbMarkers = await db.marker.findMany(({
            where: {
                lat: { lte: Number(neLat), gte: Number(swLat) },
                lng: { lte: Number(neLng), gte: Number(swLng) }
            }
        }))

        return NextResponse.json(dbMarkers, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}