/**
 * Pandolf-Margaria Martian suited walking model at 0.38g.
 */

export interface BiometricsInput {
  massKg: number;        // Total suited mass (e.g. 195 kg)
  speedMps: number;      // Walking velocity (e.g. 1.1 m/s)
  slopePercent: number;  // Incline slope (e.g. 4%)
  terrainFactor: number; // 1.0 = hard bedrock, 1.2 = firm regolith, 1.5 = loose sand, 2.1 = sand dunes
  oxygenSupplyL: number; // Total tank O2 capacity (e.g. 1200 L)
}

export interface BiometricsResult {
  metabolicPowerWatts: number;
  vo2LPerMin: number;
  o2DepletionRateLph: number;
  maxTraverseHours: number;
  turnaroundTimeHours: number; // PNR with mandatory 30-min buffer
  maxDistanceKm: number;
  safeRadiusKm: number;
  fatigueIndex: 'low' | 'moderate' | 'high' | 'critical';
}

export function computeBiometrics(input: BiometricsInput): BiometricsResult {
  const { massKg, speedMps, slopePercent, terrainFactor, oxygenSupplyL } = input;

  // Pandolf formula modified for Martian reduced gravity (g_mars / g_earth = 0.38):
  // Earth baseline: M = 1.5 * W + 2.0 * (W + L) * (L/W)^2 + eta * (W + L) * [1.5 * V^2 + 0.35 * V * G]
  // On Mars, gravitational acceleration scales work done by ~0.38, while internal suit pressurization
  // adds a ~45W joint resistance overhead.
  const suitedGravityFactor = 0.38;
  const suitJointResistanceWatts = 48.0;

  const v = speedMps;
  const G = slopePercent;
  const eta = terrainFactor;

  // Kinetic energy and grade metabolic expenditure:
  const baseMetabolicRate = 1.5 * massKg * suitedGravityFactor;
  const locomotionRate = eta * massKg * suitedGravityFactor * (1.5 * v * v + 0.35 * v * G);
  const metabolicPowerWatts = Math.max(120, Math.round(baseMetabolicRate + locomotionRate + suitJointResistanceWatts));

  // VO2 oxygen consumption: 1 Watt ≈ 0.0142 Liters O2 per hour (standard metabolic conversion)
  const o2DepletionRateLph = Math.round(metabolicPowerWatts * 0.208); // L/hour of suited O2
  const vo2LPerMin = parseFloat((o2DepletionRateLph / 60).toFixed(2));

  // Tank duration
  const totalSafeO2 = Math.max(0, oxygenSupplyL);
  const maxTraverseHours = totalSafeO2 / (o2DepletionRateLph || 1);

  // Mandatory 30-min emergency buffer (0.5 hrs)
  const usableHours = Math.max(0, maxTraverseHours - 0.5);
  const turnaroundTimeHours = parseFloat((usableHours / 2).toFixed(2));

  // Safe radius and distance
  const maxDistanceKm = parseFloat(((speedMps * 3.6) * usableHours).toFixed(2));
  const safeRadiusKm = parseFloat((maxDistanceKm / 2).toFixed(2));

  let fatigueIndex: 'low' | 'moderate' | 'high' | 'critical' = 'low';
  if (metabolicPowerWatts > 450) fatigueIndex = 'critical';
  else if (metabolicPowerWatts > 340) fatigueIndex = 'high';
  else if (metabolicPowerWatts > 240) fatigueIndex = 'moderate';

  return {
    metabolicPowerWatts,
    vo2LPerMin,
    o2DepletionRateLph,
    maxTraverseHours: parseFloat(maxTraverseHours.toFixed(2)),
    turnaroundTimeHours,
    maxDistanceKm,
    safeRadiusKm,
    fatigueIndex,
  };
}
