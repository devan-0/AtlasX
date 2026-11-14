/**
 * Implementation of Allison & McEwen (2000) NASA GISS Mars24 timing algorithm.
 */

export interface MarsClockState {
  utcDate: string;
  utcTime: string;
  utcFull: string;
  millis: number;
  jdUt: number;
  jdTt: number;
  deltaJ2000: number;
  msd: number;
  msdFormatted: string;
  mtc: number;
  mtcFormatted: string;
  lmstFormatted: string;
  lmstHours: number;
  ls: number;
  lsFormatted: string;
  season: string;
  marsYear: number;
  marsYearFormatted: string;
  distanceAu: number;
  irradianceWm2: number;
}

function pad2(n: number): string {
  return Math.floor(n).toString().padStart(2, '0');
}

export function formatHoursToHms(h: number): string {
  const norm = ((h % 24) + 24) % 24;
  const hours = Math.floor(norm);
  const remMin = (norm - hours) * 60;
  const minutes = Math.floor(remMin);
  const seconds = Math.floor((remMin - minutes) * 60);
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

export function calculateMarsClock(date: Date = new Date(), longitudeDeg: number = 0): MarsClockState {
  const millis = date.getTime();
  const jdUt = 2440587.5 + millis / 86400000;
  const jdTt = jdUt + 69.184 / 86400;
  const deltaJ2000 = jdTt - 2451545.0;

  // Mars Sol Date (MSD)
  const msd = (deltaJ2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;
  const mtc = (24 * msd) % 24;

  // Local Mean Solar Time (LMST)
  const lmst = (mtc + (longitudeDeg * 24) / 360) % 24;

  // Mean anomaly M and heliocentric longitude
  const M = (19.3870 + 0.52402075 * deltaJ2000) % 360;
  const Mrad = (M * Math.PI) / 180;

  // True anomaly and areocentric solar longitude (Ls)
  const alphaLs = 270.3863 + 0.52403840 * deltaJ2000;
  const eqCenter =
    (10.691 + 3.0e-7 * deltaJ2000) * Math.sin(Mrad) +
    0.623 * Math.sin(2 * Mrad) +
    0.05 * Math.sin(3 * Mrad);
  const ls = ((alphaLs + eqCenter) % 360 + 360) % 360;

  // Mars-Sun distance (AU)
  const e = 0.09341233;
  const a = 1.52366231;
  const distanceAu = (a * (1 - e * e)) / (1 + e * Math.cos(Mrad + (eqCenter * Math.PI) / 180));
  const irradianceWm2 = 1361 / (distanceAu * distanceAu);

  // Mars Year calculation
  const marsYear = Math.floor((msd - 44796) / 668.6) + 24;

  // Mars Season
  let season = 'Northern Spring / Southern Autumn';
  if (ls >= 90 && ls < 180) season = 'Northern Summer / Southern Winter';
  else if (ls >= 180 && ls < 270) season = 'Northern Autumn / Southern Spring';
  else if (ls >= 270) season = 'Northern Winter / Southern Summer';

  const utcDate = date.toISOString().slice(0, 10);
  const utcTime = date.toISOString().slice(11, 19);

  return {
    utcDate,
    utcTime,
    utcFull: date.toUTCString(),
    millis,
    jdUt,
    jdTt,
    deltaJ2000,
    msd,
    msdFormatted: `Sol ${Math.floor(msd).toLocaleString()}`,
    mtc,
    mtcFormatted: formatHoursToHms(mtc),
    lmstFormatted: formatHoursToHms(lmst),
    lmstHours: lmst,
    ls,
    lsFormatted: `${ls.toFixed(1)}°`,
    season,
    marsYear,
    marsYearFormatted: `MY ${marsYear}`,
    distanceAu,
    irradianceWm2,
  };
}
