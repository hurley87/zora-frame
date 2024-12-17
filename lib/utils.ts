import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cultLogo(address: string) {
  const logos: Record<string, string> = {
    '0x27a040f96beb380029ffa15b3e0f0feec2893fb6': 'higher.jpg',
    '0x762a39c8741918216e5c79b31bb7d30d6d912e9b': 'gdupi.jpg',
    '0x2ede573a5f8269fcb8acf648adfcfb1de1cfc879': 'anon.jpg',
    '0xc7a86d22dfe2b63b5f6ef88087598d52d122d41a': 'comicsans.jpg',
  };
  return logos[address.toLowerCase()];
}
