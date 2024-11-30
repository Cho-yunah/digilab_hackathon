import { parse } from 'csv/browser/esm/sync';

export const getLocations = async () => {
  const res = await fetch('/data.csv', {});
  const data = await res.blob();
  const csv = parse(await data.text(), { columns: true });
  return csv;
};
