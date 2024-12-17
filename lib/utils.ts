import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cultLogo(address: string) {
  const logos: Record<string, string> = {
    '0x27a040f96bEB380029Ffa15b3E0F0Feec2893Fb6': 'higher.jpg',
    '0x762a39c8741918216e5c79B31Bb7D30d6d912e9b': 'gdupi.jpg',
    '0x2EdE573A5F8269FCb8acf648AdfcFb1dE1Cfc879': 'anon.jpg',
    '0xc7a86D22DFe2B63B5F6ef88087598D52D122d41A': 'comicsans.jpg',
  };
  return logos[address.toLowerCase()];
}
