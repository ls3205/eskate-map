import MapContainer from "@skatemap/components/MapContainer";
import Navbar from "@skatemap/components/Navbar";
import { getServerAuthSession } from "@skatemap/server/auth";

export default async function HomePage() {
    const session = await getServerAuthSession();

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center">
            <MapContainer session={session} />
            <Navbar />
        </main>
    );
}
