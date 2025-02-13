import AddMarkerForm from "@skatemap/components/AddMarkerForm";
import ThemeDropdown from "@skatemap/components/ThemeDropdown";
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
        <div className="bg-secondary absolute top-0 left-0 flex h-dvh w-dvw items-center justify-center">
            <div className="bg-secondary flex h-fit min-h-96 w-fit min-w-[40%] items-center justify-center rounded-md">
                <AddMarkerForm latLng={[+lat!, +lng!]} session={session} />
            </div>
            <ThemeDropdown className="absolute right-5 bottom-5" />
        </div>
    ) : (
        redirect("/sign-in")
    );
};

export default page;
