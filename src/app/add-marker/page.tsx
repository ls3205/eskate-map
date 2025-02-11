import AddMarkerForm from "@skatemap/components/AddMarkerForm";
import { getServerAuthSession } from "@skatemap/server/auth";
import { redirect } from "next/navigation";
import React from "react";

interface pageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page: React.FC<pageProps> = async ({ searchParams }) => {
    const session = await getServerAuthSession();

    const queryParams = await searchParams;

    const lat = queryParams.lat;
    const lng = queryParams.lng;

    // const searchParams = useSearchParams();
    //
    // const lat = searchParams.get("lat");
    // const lng = searchParams.get("lng");

    return session?.user ? (
        <div>
            <AddMarkerForm latLng={[+lat!, +lng!]} session={session} />
        </div>
    ) : (
        redirect("/sign-in")
    );
};

export default page;
