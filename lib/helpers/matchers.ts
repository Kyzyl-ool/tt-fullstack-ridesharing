export function isMobileMatchMedia() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
}

export function isPadMatchMedia() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 769px) and (max-width: 1200px)').matches;
}

export function isLaptopMatchMedia() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 1201px)').matches;
}
