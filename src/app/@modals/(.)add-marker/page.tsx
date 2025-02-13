import AddMarkerModalWrapper from "@skatemap/components/AddMarkerModalWrapper";
import Modal from "@skatemap/components/Modal";
import React from "react";

interface pageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page: React.FC<pageProps> = async ({ searchParams }) => {
    const queryParams = await searchParams;

    const lat = queryParams.lat;
    const lng = queryParams.lng;

    return (
        <Modal>
            <AddMarkerModalWrapper lat={lat!} lng={lng!} />
        </Modal>
    );
};

export default page;
