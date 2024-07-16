import Map from "@skatemap/components/Map";
import Navbar from "@skatemap/components/Navbar";
import { getServerAuthSession } from "@skatemap/server/auth";

export default async function HomePage() {
    const session = await getServerAuthSession();

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center">
            <Map session={session} />
            <Navbar />
        </main>
    );
}
