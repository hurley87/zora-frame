import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cultLogo(address: string) {
  const logos: Record<string, string> = {
    '0x27a040f96beb380029ffa15b3e0f0feec2893fb6': 'higher.jpg',
    '0xfffd4da1d89c17b337178d645278a7cc3d9ee811': 'gdupi.jpg',
    '0x4cb84bdf6f81d338d5cccc9fdaa2aa549d427676': 'anon.jpg',
    '0x83f3494acef796737424479b976401d4e2c1b07a': 'comicsans.jpg',
    '0x733bf0a23c57875b2be6b4d33983f17fe0bf1366': 'clanker.jpg',
  };
  return logos[address.toLowerCase()];
}

export function ticker(address: string) {
  const logos: Record<string, string> = {
    '0x27a040f96beb380029ffa15b3e0f0feec2893fb6': '$HIGHER',
    '0xfffd4da1d89c17b337178d645278a7cc3d9ee811': '$GDUP',
    '0x4cb84bdf6f81d338d5cccc9fdaa2aa549d427676': '$ANON',
    '0x83f3494acef796737424479b976401d4e2c1b07a': '$COMICSANS',
    '0x733bf0a23c57875b2be6b4d33983f17fe0bf1366': '$CLANKER',
  };
  return logos[address.toLowerCase()];
}
