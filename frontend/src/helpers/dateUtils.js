export function createDateAsUTC(date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

export function convertDateToUTC(date) { 
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

export function formatDateToISOString(date) {
  return date.toISOString().slice(0, 10);
}

export function formatDateToJSON(date) {
  return date.toISOString().slice(0, 10) + 'T00:00:00.000Z';
}