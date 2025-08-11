import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileName(url: string): string {
  const fileName = url.split('/').pop() || '';
  return fileName
    .replace(/\.[^/.]+$/, '') // Remove file extension
    .replace(/[-_]/g, ' ')    // Replace - and _ with space
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
