import * as crypto from 'crypto';

export function timingCompair(str0: string, str1: string): boolean {
  const len0 = str0.length;
  const len1 = str1.length;
  let len = Math.max(len0, len1);
  let diff = 0;
  while (len > -1) {
    if (str0[len] !== str1[len]) {
      diff += 1;
    }
    len -= 1;
  }

  return diff === 0;
}

export function randomHex(len: number = 32): string {
  return crypto.randomBytes(Math.floor(len / 2)).toString('hex');
}
