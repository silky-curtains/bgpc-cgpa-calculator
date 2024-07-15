import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(input: string): string {
    if (input.length > 20) {
        return input.substring(0, 20) + '...';
    } else {
        return input;
    }
}
