
"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
                    className="block space-y-1 rounded-md p-2 hover:bg-accent transition-colors"
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



export function Navbar() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const LogoComponent = () => (
        <Image
            src={resolvedTheme === "light" ? "/logo-text-dark.svg" : "/logo-text-light.svg"}
            alt="Logo"
            className="h-12 w-auto"
            width={120}
            height={48}
            priority
        />
    );

    const ThemeToggle = () => (
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
    );

    if (!mounted) {
        return null;
    }

    return (
        <div className="py-4 border-b">
            {/* Desktop Menu */}
            <div className="hidden justify-between lg:flex">
                <Link href="/" className="flex items-center">
                    <LogoComponent />
                </Link>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/blog">Blog</Link>
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
                                <ThemeToggle />
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <LogoComponent />
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link href="/" className="flex items-center">
                                            <LogoComponent />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {/* Home */}
                                        <Link href="/" className="text-md font-semibold py-2 block">
                                            Home
                                        </Link>
                                        {/* Blog */}
                                        <Link href="/blog" className="text-md font-semibold py-2 block">
                                            Blog
                                        </Link>

                                        {/* Menu Accordion */}
                                        <AccordionItem value="Menu" className="border-b-0">
                                            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                                                Menu
                                            </AccordionTrigger>
                                            <AccordionContent className="mt-2">
                                                <div className="flex flex-col gap-1">
                                                    <Link href="/docs" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Introduction</div>
                                                            <p className="text-muted-foreground text-sm leading-snug mt-1">Re-usable components built using Radix UI and Tailwind CSS.</p>
                                                        </div>
                                                    </Link>
                                                    <Link href="/docs/installation" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Installation</div>
                                                            <p className="text-muted-foreground text-sm leading-snug mt-1">How to install dependencies and structure your app.</p>
                                                        </div>
                                                    </Link>
                                                    <Link href="/docs/primitives/typography" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Typography</div>
                                                            <p className="text-muted-foreground text-sm leading-snug mt-1">Styles for headings, paragraphs, lists...etc</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* With Icon Accordion */}
                                        <AccordionItem value="With Icon" className="border-b-0">
                                            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                                                With Icon
                                            </AccordionTrigger>
                                            <AccordionContent className="mt-2">
                                                <div className="flex flex-col gap-1">
                                                    <Link href="#" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="text-muted-foreground">
                                                            <CircleHelpIcon className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Backlog</div>
                                                        </div>
                                                    </Link>
                                                    <Link href="#" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="text-muted-foreground">
                                                            <CircleIcon className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">To Do</div>
                                                        </div>
                                                    </Link>
                                                    <Link href="#" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="text-muted-foreground">
                                                            <CircleCheckIcon className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Done</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* List Accordion */}
                                        <AccordionItem value="List" className="border-b-0">
                                            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                                                List
                                            </AccordionTrigger>
                                            <AccordionContent className="mt-2">
                                                <div className="flex flex-col gap-1">
                                                    <Link href="#" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Components</div>
                                                            <p className="text-muted-foreground text-sm leading-snug mt-1">Browse all components in the library.</p>
                                                        </div>
                                                    </Link>
                                                    <Link href="#" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Documentation</div>
                                                            <p className="text-muted-foreground text-sm leading-snug mt-1">Learn how to use the library.</p>
                                                        </div>
                                                    </Link>
                                                    <Link href="#" className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold">Blog</div>
                                                            <p className="text-muted-foreground text-sm leading-snug mt-1">Read our latest blog posts.</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* About Me */}
                                        <Link href="/about" className="text-md font-semibold py-2 block">
                                            About Me
                                        </Link>

                                        {/* Portfolio */}
                                        <Link href="/portfolio" className="text-md font-semibold py-2 block">
                                            Portfolio
                                        </Link>

                                        {/* Dashboard */}
                                        <Link href="/dashboard" className="text-md font-semibold py-2 block">
                                            Dashboard
                                        </Link>
                                    </Accordion>
                                    <div className="flex flex-col gap-3">
                                        <Button asChild variant="outline">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/signup">Sign up</Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
}