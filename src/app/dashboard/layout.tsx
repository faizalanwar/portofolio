import { NavbarComponent } from "@/components/dashboard/navbar";
import { AppSidebar } from "@/components/dashboard/sidebar"; // ✅ ini panggil sidebar
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavbarComponent />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
