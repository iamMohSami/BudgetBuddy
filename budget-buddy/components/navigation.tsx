'use client'; // required because we use hooks
import { usePathname, useRouter} from 'next/navigation';
import NavButton from './nav-button';

// for mobile view
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {useMedia} from "react-use"; 
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

// define all the routes you want in Navigation
const routes = [
  { href: '/', label: 'Overview' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/categories', label: 'Categories' },
  { href: '/settings', label: 'Settings' },
];

export const Navigation = () => {
  // define if our Drawer IS OPEN or not for our mobile view using useState
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px) , false");
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const pathname = usePathname();


  if(isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button variant="ghost" size="icon" 
            className="font-normal bg-white/10 text-white hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0focus-visible:ring-transparent outline-none focus:bg-white/30 transition"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
         <nav className="flex flex-col gap-y-2 pt-12">
            {routes.map((route) => (
              <Button
              key={route.href}
              variant={route.href === pathname ? 'secondary' : 'ghost'}
              onClick={() => onClick(route.href)}
              className='w-full justify-start'
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }


  return (
    <nav className="hidden lg:flex items-center gap-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
}

export default Navigation;
