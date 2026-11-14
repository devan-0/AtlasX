export interface MarsLandmark {
  id: string;
  name: string;
  type: string;
  lat: number;
  lon: number;
  elevationM: number;
  description: string;
  scientificValue: string;
  highlightColor: string;
}

export const MARS_LANDMARKS: MarsLandmark[] = [
  {
    id: 'jezero',
    name: 'Jezero Crater',
    type: 'Ancient Paleolake & River Delta',
    lat: 18.38,
    lon: 77.58,
    elevationM: -2500,
    description: 'Site of NASA Mars 2020 Perseverance rover. Features rich clay smectite minerals and river delta deposits with exceptional biosignature preservation potential.',
    scientificValue: 'Astrobiology & Sample Return Target',
    highlightColor: '#22d3ee',
  },
  {
    id: 'gale',
    name: 'Gale Crater (Mount Sharp)',
    type: 'Layered Sedimentary Mound',
    lat: -4.59,
    lon: 137.44,
    elevationM: -4500,
    description: 'Explored by NASA Curiosity rover. 5 km central mound (Aeolis Mons) exposing layered Martian climate history from wet phyllosilicates to dry sulfates.',
    scientificValue: 'Stratigraphic Climate Evolution',
    highlightColor: '#f59e0b',
  },
  {
    id: 'olympus',
    name: 'Olympus Mons',
    type: 'Shield Volcano (Solar System Peak)',
    lat: 18.65,
    lon: 226.2,
    elevationM: 21287,
    description: 'Largest volcano in the Solar System. Rises 22 km above datum with a 80 km caldera and 6 km basal scarp. Minimal atmospheric pressure at summit (0.7 hPa).',
    scientificValue: 'Planetary Volcanism & Geothermal Vents',
    highlightColor: '#ef4444',
  },
  {
    id: 'valles',
    name: 'Valles Marineris (Coprates)',
    type: 'Grand Tectonic Rift System',
    lat: -14.0,
    lon: 300.0,
    elevationM: -4000,
    description: 'Continental-scale canyon stretching over 4,000 km across the Tharsis rise. Exposes bedrock cross-sections up to 7 km deep with recurring slope lineae (RSL).',
    scientificValue: 'Deep Lithosphere Geology & Hydrology',
    highlightColor: '#ec4899',
  },
  {
    id: 'elysium',
    name: 'Elysium Planitia',
    type: 'Smooth Volcanic Plain & InSight Site',
    lat: 4.5,
    lon: 135.62,
    elevationM: -2600,
    description: 'NASA InSight lander touchdown site. Recorded over 1,300 marsquakes and monitored continuous diurnal weather and micro-meteorology with APSS sensors.',
    scientificValue: 'Core-Mantle Seismology & Heat Flow',
    highlightColor: '#10b981',
  },
  {
    id: 'arcadia',
    name: 'Arcadia Planitia',
    type: 'Subsurface Glacial Ice Sheet',
    lat: 39.3,
    lon: 189.7,
    elevationM: -3500,
    description: 'Vast low-lying northern plain with radar-detected subsurface water ice sheets within 1-2 meters of the surface. Prime candidate for in-situ human base ISRU.',
    scientificValue: 'In-Situ Resource Utilization (ISRU Water)',
    highlightColor: '#38bdf8',
  },
];

export interface OutcropFeed {
  id: string;
  title: string;
  sol: number;
  instrument: string;
  targetFeature: string;
  imageUrl: string;
  description: string;
  sampleStatus: 'cored_sealed' | 'depot_cached' | 'abraded';
}

export const OUTCROP_FEEDS: OutcropFeed[] = [
  {
    id: 'bright-angel',
    title: 'Bright Angel Outcrop (Jezero Margin)',
    sol: 1175,
    instrument: 'Mastcam-Z / SuperCam LIBS',
    targetFeature: 'Abrasive mudstone with calcium sulfate veins',
    imageUrl: 'https://mars.nasa.gov/system/resources/detail_files/26000_PIA25315-Mastcam-Z-Bright-Angel.jpg',
    description: 'Fine-grained sedimentary rocks exhibiting millimetre-scale laminations and chemical signatures consistent with long-duration standing water.',
    sampleStatus: 'cored_sealed',
  },
  {
    id: 'seitah-bedrock',
    title: 'Séítah Formation Bedrock',
    sol: 295,
    instrument: 'PIXL X-Ray Fluorescence',
    targetFeature: 'Olivine-rich cumulate igneous bedrock',
    imageUrl: 'https://mars.nasa.gov/system/resources/detail_files/26003_Mastcam-Z-Seitah-Bedrock.jpg',
    description: 'Coarse-grained ultramafic cumulate rocks formed in a thick subsurface magma chamber or lava lake, providing a primordial radiometric age anchor.',
    sampleStatus: 'depot_cached',
  },
  {
    id: 'kodiak-delta',
    title: 'Kodiak Delta Scarp',
    sol: 75,
    instrument: 'SuperCam Remote Micro-Imager (RMI)',
    targetFeature: 'Bottomset-foreset-topset deltaic bedding',
    imageUrl: 'https://mars.nasa.gov/system/resources/detail_files/26005_Mastcam-Z-Kodiak-Scarp.jpg',
    description: 'Steeply dipping foreset beds capped by horizontal boulder-rich topsets, confirming high-energy flood pulses into an ancient lake.',
    sampleStatus: 'abraded',
  },
];

export const APP_DOWNLOADS = {
  version: '1.0.0',
  releaseDate: 'November 2026',
  installer: {
    fileName: 'AtlasX-Setup.exe',
    fileSizeMb: '92.2 MB',
    type: 'NSIS Installer (Windows 64-bit)',
    downloadUrl: '/downloads/AtlasX-Setup.exe',
    authenticode: 'CN=AtlasX Code Signing (SHA-256)',
  },
  portable: {
    fileName: 'AtlasX 1.0.0.exe',
    fileSizeMb: '92.0 MB',
    type: 'Portable Executable (Standalone zero-install)',
    downloadUrl: '/downloads/AtlasX 1.0.0.exe',
    authenticode: 'CN=AtlasX Code Signing (SHA-256)',
  },
  sourceCode: {
    fileName: 'AtlasX-SourceCode.zip',
    fileSizeMb: '1.09 MB',
    type: 'Source Code Archive (Vite + Electron + Python)',
    downloadUrl: '/downloads/AtlasX-SourceCode.zip',
  },
};
