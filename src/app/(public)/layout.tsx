import Footer from "@/components/public/footer"
import { Navbar } from "@/components/public/navbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar selalu di atas */}
            <header className=" bg-background px-5">
                <Navbar />
            </header>

            {/* Konten di bawah navbar */}
            <main className="flex-1 p-5 overflow-y-auto">
                {children}
            </main>

            {/* (Opsional) Footer */}
            <footer className="p-4 text-center text-sm text-muted-foreground">
                <Footer />
            </footer>
        </div>
    )
}
