export type AreaUnit = "m2" | "acres" | "hectares";

export const CONVERSION_RATES = {
  m2: 1,
  acres: 4046.86,
  hectares: 10000,
};

export function convertToSqMeters(value: number, unit: AreaUnit): number {
  return value * CONVERSION_RATES[unit];
}

export function calculateBiomassDensity(biomass_g: number, area_sqm: number): number {
  if (area_sqm <= 0) return 0;
  return biomass_g / area_sqm; // g per m2
}

export function extrapolateTotalBiomass(density_g_m2: number, total_area_sqm: number): number {
  return density_g_m2 * total_area_sqm; // total g
}

export function formatMass(grams: number): string {
  if (grams < 1000) {
    return `${grams.toFixed(1)} g`;
  }
  
  const kg = grams / 1000;
  if (kg < 1000) {
    return `${kg.toFixed(2)} kg`;
  }
  
  const tons = kg / 1000;
  return `${tons.toFixed(3)} tons`;
}
