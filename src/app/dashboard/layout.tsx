import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
                <SidebarProvider>
                    <Sidebar />
                    <main className="p-4">{children} ini layout dashboard</main>
                </SidebarProvider>
            </div>
        </div >
    );
}
