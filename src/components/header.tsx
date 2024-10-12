import Link from 'next/link'
import { Bike } from 'lucide-react';

export function Header() {
    return (
        (<header key="1" className="flex h-10 w-full items-center px-4 md:px-6">
            <Link className="flex items-center justify-center" href="#">
                <Bike/>
                <span className="ml-2 text-2xl font-semibold">Riedu</span>
            </Link>
        </header>)
    );
}