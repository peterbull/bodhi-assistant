export function getCurrentDate() {
  const date = new Date();
  const estDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/New_York',
  }).format(date);

  const [month, day, year] = estDate.split('/');
  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
}
