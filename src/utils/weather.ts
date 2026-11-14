/**
 * Koschmieder optical visibility attenuation & Martian EVA Hazard Assessment.
 */

export interface WeatherInput {
  tau: number;           // Dust optical depth (0.2 clear to 4.0 global dust storm)
  windSpeedMps: number;  // Ambient wind (0 to 35 m/s)
  temperatureC: number;  // Diurnal surface temperature (-120°C to 0°C)
  uvIndex: number;       // Solar UV index
}

export interface WeatherAssessment {
  visibilityKm: number;
  thermalHeatingPenaltyWatts: number;
  dustHazardSeverity: 'nominal' | 'elevated' | 'severe' | 'extreme';
  evaStatus: 'GO' | 'CAUTION' | 'NO-GO';
  statusReason: string;
}

export function assessWeather(input: WeatherInput): WeatherAssessment {
  const { tau, windSpeedMps, temperatureC } = input;

  // Koschmieder law calibrated for Martian dust scattering:
  // V ≈ 4.0 / (tau^1.85) clamped between 0.15 km (severe dust storm) and 25.0 km (crystal clear)
  const visibilityKm = parseFloat(
    Math.max(0.15, Math.min(25.0, 4.0 / Math.pow(Math.max(0.2, tau), 1.85))).toFixed(2)
  );

  // Thermal heating penalty: Below -60°C, PLSS heating draws significant electrical load
  let thermalHeatingPenaltyWatts = 0;
  if (temperatureC < -60) {
    thermalHeatingPenaltyWatts = Math.round(Math.abs(temperatureC + 60) * 4.2);
  }

  // Dust severity
  let dustHazardSeverity: 'nominal' | 'elevated' | 'severe' | 'extreme' = 'nominal';
  if (tau >= 2.5) dustHazardSeverity = 'extreme';
  else if (tau >= 1.5) dustHazardSeverity = 'severe';
  else if (tau >= 0.8) dustHazardSeverity = 'elevated';

  // EVA Matrix
  let evaStatus: 'GO' | 'CAUTION' | 'NO-GO' = 'GO';
  let statusReason = 'Atmospheric conditions nominal for surface traverse.';

  if (tau >= 2.2 || windSpeedMps >= 24 || visibilityKm < 0.8 || temperatureC < -100) {
    evaStatus = 'NO-GO';
    statusReason = 'CRITICAL HAZARD: Dense dust obscuration or extreme cryogenic chill exceeds safe suit margins.';
  } else if (tau >= 1.0 || windSpeedMps >= 15 || visibilityKm < 3.0 || temperatureC < -80) {
    evaStatus = 'CAUTION';
    statusReason = 'CAUTION: Moderate dust opacity or elevated wind gusts. Keep within optical tether range.';
  }

  return {
    visibilityKm,
    thermalHeatingPenaltyWatts,
    dustHazardSeverity,
    evaStatus,
    statusReason,
  };
}
