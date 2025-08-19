"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

// Lucide Icons
import {
    Frame,
    LifeBuoy,
    SquareTerminal,
    ChevronRight,
    Folder as FolderIcon,
    MoreHorizontal,
    Share,
    Trash2,
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    Home,
    Newspaper as NewspaperIcon,
    UserCircle,
    EllipsisVertical,
} from "lucide-react"

// Tabler Icons
import { IconDashboard, IconMail, IconUsers } from "@tabler/icons-react"

// UI Components
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "../ui/badge"

// Types
interface NavItem {
    title: string
    url: string
    icon: React.ComponentType<any>
    items?: { title: string; url: string, badge?: { title: string; variant: BadgeVariant } }[]
}
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface Project {
    name: string
    url: string
    icon: React.ComponentType<any>
}

interface User {
    name: string
    email: string
    avatar: string
}

// ------------------ DATA ------------------
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    } as User,
    navMain: [
        { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
        { title: "Projects", url: "/dashboard/project", icon: FolderIcon },
        { title: "Blog", url: "/dashboard/blog", icon: NewspaperIcon },
        { title: "Team", url: "/dashboard/team", icon: IconUsers },
        { title: "Contact", url: "/dashboard/contact", icon: IconMail },
        {
            title: "Playground",
            url: "/dashboard/playground",
            icon: SquareTerminal,
            items: [
                { title: "Crud Array", url: "/dashboard/playground/crud-array", badge: { title: "Soon", variant: "outline" } },
                { title: "Crud Prisma ", url: "/dashboard/playground/crud-prisma-postgresql", badge: { title: "PostgreSql", variant: "default" } },
                { title: "Crud Prisma", url: "/dashboard/playground/crud-prisma", badge: { title: "New", variant: "secondary" } },
                { title: "Crud MongoDB", url: "/dashboard/playground/crud-mongodb" },
                { title: "Crud MySQL", url: "/dashboard/playground/crud-mysql", badge: { title: "Soon", variant: "outline" } },
                { title: "Crud SQLite", url: "/dashboard/playground/crud-sqlite" },
                { title: "Crud Supabase", url: "/dashboard/playground/crud-supabase", badge: { title: "Hot", variant: "destructive" } },
                { title: "Crud PlanetScale", url: "/dashboard/playground/crud-planetscale" },
                { title: "Crud Postgres", url: "/dashboard/playground/crud-postgres" },
                { title: "Crud Firebase", url: "/dashboard/playground/crud-firebase" },
            ],
        },
    ] as NavItem[],
    projects: [
        {
            name: "Design Engineering",
            url: "/dashboard/project/design-engineering",
            icon: Frame,
        },
    ] as Project[],
    navSecondary: [
        { title: "Support", url: "/dashboard/support", icon: LifeBuoy },
        { title: "Homepage", url: "/", icon: Home },
    ] as NavItem[],
} as const

// ------------------ HELPERS ------------------
function isRouteActive(pathname: string, url: string): boolean {
    if (!url || url === "#") return false
    // hanya root dashboard yg strict
    if (url === "/dashboard") {
        return pathname === "/dashboard"
    }
    return pathname === url || pathname.startsWith(url + "/")
}

// ------------------ SUB COMPONENTS ------------------
const NavMain: React.FC = () => {
    const { isMobile } = useSidebar()
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {data.navMain.map((item) => {
                    const active = isRouteActive(pathname, item.url)
                    const anyChildActive =
                        item.items?.some((x) => isRouteActive(pathname, x.url)) ?? false
                    const defaultOpen = active || anyChildActive

                    return (
                        <Collapsible key={item.title} asChild defaultOpen={defaultOpen}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    data-active={active || undefined}
                                >
                                    <Link href={item.url}>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>

                                {item.items?.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                <ChevronRight className="h-4 w-4" />
                                                <span className="sr-only">Toggle</span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((sub) => {
                                                    const subActive = isRouteActive(pathname, sub.url)
                                                    return (
                                                        <SidebarMenuSubItem key={sub.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                data-active={subActive || undefined}
                                                            >
                                                                <Link href={sub.url} className="flex justify-between items-center">
                                                                    <span>{sub.title}</span>
                                                                    {sub.badge && (
                                                                        <Badge variant={sub.badge.variant} className="px-2 py-0.5 text-xs">
                                                                            {sub.badge.title}
                                                                        </Badge>
                                                                    )}
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ) : null}
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>

            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {data.projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <FolderIcon className="h-4 w-4 text-muted-foreground mr-2" />
                                    <span>View Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Share className="h-4 w-4 text-muted-foreground mr-2" />
                                    <span>Share Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    <span>Delete Project</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

const NavSecondary: React.FC = () => {
    const pathname = usePathname()

    return (
        <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.navSecondary.map((item) => {
                        const active = isRouteActive(pathname, item.url)
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    size="sm"
                                    data-active={active || undefined}
                                >
                                    <Link href={item.url}>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

const NavUser: React.FC = () => {
    const { isMobile } = useSidebar()
    const user = data.user

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">
                                    {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <EllipsisVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UserCircle className="h-4 w-4 mr-2" />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell className="h-4 w-4 mr-2" />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="h-4 w-4 mr-2" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

const LogoComponent: React.FC = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="h-7 w-7 rounded bg-muted animate-pulse" />
        )
    }

    const src = resolvedTheme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"

    return (
        <Image
            src={src}
            alt="Logo"
            width={28}
            height={28}
            className="inline-block"
            priority
            onError={(e) => {
                // Fallback jika gambar tidak ditemukan
                e.currentTarget.style.display = 'none'
            }}
        />
    )
}

// ------------------ EXPORT KOMPONEN UTAMA ------------------
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex items-center gap-3">
                                    <LogoComponent />
                                    <div className="grid text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Faizal Anwar</span>
                                        <span className="truncate text-xs">Portfolio</span>
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain />
                <NavSecondary />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar