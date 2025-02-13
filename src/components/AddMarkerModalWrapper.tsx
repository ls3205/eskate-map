import { getServerAuthSession } from "@skatemap/server/auth";
import React from "react";
import AddMarkerForm from "./AddMarkerForm";
import { redirect } from "next/navigation";

interface AddMarkerModalWrapperProps {
    lat: string;
    lng: string;
}

const AddMarkerModalWrapper: React.FC<AddMarkerModalWrapperProps> = async ({
    lat,
    lng,
}) => {
    const session = await getServerAuthSession();

    return session?.user ? (
        <AddMarkerForm latLng={[+lat, +lng]} session={session} />
    ) : (
        redirect("/sign-in")
    );
};

export default AddMarkerModalWrapper;
