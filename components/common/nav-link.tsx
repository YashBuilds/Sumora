"use client"

import Link from "next/link";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string,
}) {

  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));  
  return (
    <Link
      href={href}
      className={cn(
      "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500" ,// ✅ Fixed hover: text
      className,
      isActive && 'text-rose-500'
      )}
    >
      {children}
    </Link>
  );
}
