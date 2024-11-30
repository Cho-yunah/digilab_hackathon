import { parse } from 'csv/browser/esm/sync';
import Distance from '@turf/distance';
import { platform } from 'os';

type Param = {
  category?: string;
  userType?: string;
  title?: string;
  lat?: string;
  lon?: string;
  radius?: string;
};

export const getLocations = async (p: Param) => {
  const res = await fetch('/data.csv', {});
  const data = await res.blob();
  const csv: any[] = parse(await data.text(), { columns: true });
  let result = csv.slice();
  if (p.lat && p.lon && p.radius) {
    result = result.filter((item) =>
      Distance(
        { type: 'Point', coordinates: [Number(p.lat), Number(p.lon)] },
        { type: 'Point', coordinates: [Number(item.lat), Number(item.lon)] }
      ) <= Number(p.radius || 0)
    );
  }

  if (p.title) {
    result = result.filter((item) => item.title.includes(p.title));
  }

  if (p.category) {
    result = result.filter((item) => p.category?.includes(item.cat))
  }

  if (p.userType) {
    result = result.filter((item) => p.userType?.includes(item.userType))
  }

  return result;
};
