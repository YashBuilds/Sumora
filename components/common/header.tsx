import NavLink from './nav-link';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton, SignedOut} from '@clerk/nextjs';
import PlanBadge from './plan-badge';


export default function Header() {

    return (
        <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
            <div className="flex items-center lg:flex-1 gap-2 shrink-0">
                <NavLink href = "/" className = "flex items-center gap-1 lg:gap-2 shrink-0">
                <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
                <span className = "font-extrabold lg:text-xl text-gray-900">Sumora</span>
                </NavLink>
            </div>

            <div className = "flex gap-4 lg:justify-center lg:gap-12 lg:items-center">
                <NavLink href = "/#pricing">Pricing</NavLink>
                <SignedIn> 
                <NavLink href = "/dashboard">Your Summaries</NavLink>
                </SignedIn>
            </div>
            
            <div className = "flex lg:justify-end lg:flex-1">
                <SignedIn>
                    <div className = "flex gap-2 items-center">
                    <NavLink href = "/upload">Upload a PDF</NavLink>
                    <PlanBadge />
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
                </SignedIn>

                <SignedOut>
                    <NavLink href = "/sign-in">Sign In</NavLink>
                </SignedOut>
              
            </div>
        </nav>
    );
}
