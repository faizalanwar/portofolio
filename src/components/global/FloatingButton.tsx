import Link from "next/link";
import { Button } from "../ui/button";

export default function FloatingButton() {
    return (
        <>
            <Button
                asChild
                variant="default"
                className="fixed bottom-6 left-6 rounded-full shadow-lg"
            >
                {/* layout.tsx itu server component, jadi jika diubah pake useclient , semua child akan jadi client componen dan itu ngaruh ke performa  */}
                {/* ini tombol global. jadi bisa dipake di semua halaman */}
                {/* pake asChild supaya bisa pake link */}
                {/* asChild itu artinya, tombol ini akan menjadi child dari link */}
                {/* jadi tombol ini akan menjadi link */}
                <Link href="/">Back to homepage</Link>
            </Button>
        </>
    )
}
