import NavLink from './nav-link';
import { FileText, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs';
import PlanBadge from './plan-badge';
import { MotionDiv } from "@/components/common/motion-wrapper";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container flex items-center justify-between py-4 lg:px-8 px-4 mx-auto">
        {/* Logo - Left side */}
        <div className="flex items-center gap-2 shrink-0 lg:w-1/4">
          <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
            <MotionDiv
              whileHover={{ rotate: 12 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900" />
            </MotionDiv>
            <span className="font-extrabold lg:text-xl text-gray-900">Sumora</span>
          </NavLink>
        </div>

        {/* Centered Navigation - Desktop only */}
        <div className="hidden lg:flex items-center justify-center gap-8 lg:w-2/4">
          <NavLink href="/#pricing">Pricing</NavLink>
          <SignedIn>
            <NavLink href="/dashboard">Your Summaries</NavLink>
          </SignedIn>
        </div>

        {/* Right side - Auth & Plan */}
        <div className="flex items-center justify-end gap-4 lg:w-1/4">
          <SignedIn>
            {/* Show on all screens */}
            <PlanBadge className="text-sm px-2 py-1 lg:px-3 lg:py-1.5" />
            
            {/* Desktop-only elements */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink href="/upload">Upload PDF</NavLink>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <NavLink href="/sign-in" className="hidden lg:block">Sign In</NavLink>
          </SignedOut>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
}