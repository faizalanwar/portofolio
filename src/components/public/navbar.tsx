"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block space-y-1 rounded-md p-2 hover:bg-accent"
                >
                    <span className="text-sm font-medium leading-none">{title}</span>
                    <span className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </span>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

import { useEffect, useState } from "react"
export function Navbar() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // sementara kosong biar nggak flicker/mismatch
        return <div className="h-12 w-32 bg-transparent" />
    }

    return (
        <div className="flex items-center justify-between px-4">
            {/* Logo di kiri */}
            <div className="flex items-center space-x-2">
                <img
                    src={resolvedTheme === "light" ? "/logo-text-dark.svg" : "/logo-text-light.svg"}
                    alt="Logo"
                    className="h-12 w-auto"
                />
            </div>
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    {/* Home */}

                    {/* About */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="/"
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline select-none outline-hidden focus:shadow-md"
                                        >
                                            <span className="mt-4 mb-2 text-lg font-medium">shadcn/ui</span>
                                            <span className="text-muted-foreground text-sm leading-tight">
                                                Beautifully designed components built with Tailwind CSS.
                                            </span>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Typography">
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>


                    {/* With Ico */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#" className="flex-row items-center gap-2">
                                            <CircleHelpIcon />
                                            Backlog
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#" className="flex-row items-center gap-2">
                                            <CircleIcon />
                                            To Do
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#" className="flex-row items-center gap-2">
                                            <CircleCheckIcon />
                                            Done
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* List */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>List</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Components</div>
                                            <div className="text-muted-foreground">
                                                Browse all components in the library.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Documentation</div>
                                            <div className="text-muted-foreground">
                                                Learn how to use the library.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">Blog</div>
                                            <div className="text-muted-foreground">
                                                Read our latest blog posts.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>



                    {/* About */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/about">About Me</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                    {/* Portofolio */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/portofolio">Portofolio</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Docs */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/dashboard">Dashboard</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem className="mr-4">
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

