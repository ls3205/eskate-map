import Map from "@skatemap/components/Map";
import Navbar from "@skatemap/components/Navbar";

export default function HomePage() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center">
            <Map />
            <Navbar />
        </main>
    );
}
