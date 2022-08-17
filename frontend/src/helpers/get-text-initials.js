export function getTextInitials (text) {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  let initials = [...text.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  return initials;
}