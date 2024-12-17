import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cultLogo(address: string) {
  const logos: Record<string, string> = {
    '0x6b5e56ba879bd0ca182b723357971e039603f6c4': 'higher.jpg',
  };
  return logos[address.toLowerCase()];
}
