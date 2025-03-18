'use client' ; 

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
    const { user , isLoaded } = useUser();
    return (
        <>
        <h2 className="text-white text-2xl font-bold lg:text-3xl">
            Welcome Back{isLoaded ? ", " : " "}{user?.firstName}!
        </h2>
        <p className="text-sm lg:text-base text-[#d0e0f9]">Manage your budget and track your expenses with ease.</p>
        </>
    );
};
