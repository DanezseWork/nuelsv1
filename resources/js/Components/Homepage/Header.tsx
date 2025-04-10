"use client";

import { Button } from "@/Components/ui/Button";
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
} from "@/Components/ui/NavigationMenu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export const Header1 = () => {

    const [isAtTop, setIsAtTop] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const handleRedirect = () => {
        const booking = document.getElementById('bookingSection');
        if (booking) {
            booking.scrollIntoView({ behavior: 'smooth' });
        } else if (window.location.pathname !== '/') {
            window.location.href = '/#bookingSection';
        }
    };
    const navigationItems = [
        {
        title: "Home",
        href: "/",
        description: "",
        },  
    ];

    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#bookingSection') {
            const bookingSection = document.getElementById('bookingSection');
            if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
          setIsAtTop(window.scrollY === 0);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
return (
    //  <header id="header" className={`w-full z-40 fixed top-0 left-0 bg-secondary border-b-2 border-yellow-500 shadow-[0_0_10px_#facc15] px-10 ${isAtTop ? 'bg-transparent' : 'bg-secondary'}`}>
    <header
      id="header"
      className={`w-full z-40 fixed top-0 left-0 px-10 transition-all duration-300 ${
        isAtTop
          ? "bg-transparent border-none shadow-none"
          : "bg-secondary border-b-2 border-yellow-500 shadow-[0_0_10px_#facc15]"
      }`}
    >
        <div className="container relative mx-auto min-h-20 flex gap-4">
            <div className="flex justify-between w-full">
            <p className="gwendolyn-bold font-thin text-[#fbe37b] text-[50px] [text-shadow:0_0_20px_rgb(250,204,21)]" onClick={() => {
                window.location.href = '/';
            }}>Nuel's</p>
            </div>
            <div className="flex justify-end w-full gap-4 py-5">
                {/* <Button variant="ghost" className="text-white text-md hover:text-primary hover:bg-transparent hidden md:inline [text-shadow:0_0_10px_rgb(255,255,255)]" onClick={handleRedirect}>
                    Book Now
                </Button> */}
                <Link href="/booking">
                    <Button variant="ghost" className="text-md text-white bg-transparent hover:bg-transparent hover:text-primary [text-shadow:0_0_10px_rgb(255,255,255)] hidden md:inline">
                        Book Now
                    </Button>
                </Link>
            <div className=" hidden md:inline shadow-[0_0_10px_#facc15]"></div>
                <Button variant="ghost" className="text-md text-white bg-transparent hover:bg-transparent hover:text-primary [text-shadow:0_0_10px_rgb(255,255,255)] hidden md:inline" onClick={() => {
                    window.location.href = '/login';
                }}>Sign in</Button>
                </div>
                <div className="flex w-12 shrink md:hidden items-center justify-end">
                <Button variant="ghost" className="text-[#fbe37b] hover:text-yellow-500 hover:bg-transparent" onClick={() => setOpen(!isOpen)}>
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                {isOpen && (
                    <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
                    {navigationItems.map((item) => (
                        <div key={item.title}>
                        {/* <div className="flex flex-col gap-2">
                            {item.href ? (
                            <Link
                                href={item.href}
                                className="flex justify-between items-center"
                            >
                                <span className="text-lg">{item.title}</span>
                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                            </Link>
                            ) : (
                            <p className="text-lg">{item.title}</p>
                            )}
                            {item.items &&
                            item.items.map((subItem) => (
                                <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="flex justify-between items-center"
                                >
                                <span className="text-muted-foreground">
                                    {subItem.title}
                                </span>
                                <MoveRight className="w-4 h-4 stroke-1" />
                                </Link>
                            ))}
                        </div> */}
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    </header>
);
};