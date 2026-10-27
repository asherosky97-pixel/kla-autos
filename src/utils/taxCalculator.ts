import { UraTaxCalculation } from '../types';

export const CURRENT_USD_UGX_RATE = 3750;

/**
 * Calculates official Uganda Revenue Authority (URA) import taxes and landed clearing costs.
 *
 * @param cifUsd CIF Mombasa value in US Dollars
 * @param manufactureYear Year of vehicle manufacture (used for Environmental Levy tiers)
 * @param engineCc Engine displacement in cubic centimeters (cc)
 * @param exchangeRate USD to UGX exchange rate (defaults to 3,750)
 */
export function calculateUraLandedCost(
  cifUsd: number,
  manufactureYear: number,
  engineCc: number = 2000,
  exchangeRate: number = CURRENT_USD_UGX_RATE
): UraTaxCalculation {
  const currentYear = new Date().getFullYear();
  const vehicleAge = Math.max(0, currentYear - manufactureYear);

  // 1. Customs Value in UGX
  const customsValueUgx = Math.round(cifUsd * exchangeRate);

  // 2. Import Duty: 25%
  const importDutyRate = 0.25;
  const importDutyUgx = Math.round(customsValueUgx * importDutyRate);

  // 3. VAT: 18% applied on (Customs Value + Import Duty)
  const vatRate = 0.18;
  const vatUgx = Math.round((customsValueUgx + importDutyUgx) * vatRate);

  // 4. Withholding Tax: 6% of Customs Value
  const withholdingTaxRate = 0.06;
  const withholdingTaxUgx = Math.round(customsValueUgx * withholdingTaxRate);

  // 5. Infrastructure Levy: 1.5% of Customs Value
  const infrastructureLevyRate = 0.015;
  const infrastructureLevyUgx = Math.round(customsValueUgx * infrastructureLevyRate);

  // 6. Environmental Levy based on URA Age Thresholds
  let environmentalLevyRate = 0;
  let environmentalTierNote = 'Exempt (Under 9 Years Old)';

  if (vehicleAge >= 15) {
    environmentalLevyRate = 0.50;
    environmentalTierNote = '50% Surcharge (15+ Years Old / High Emission)';
  } else if (vehicleAge >= 9) {
    environmentalLevyRate = 0.35;
    environmentalTierNote = '35% Levy (9 to 14 Years Old)';
  }

  const environmentalLevyUgx = Math.round(customsValueUgx * environmentalLevyRate);

  // Total URA Taxes
  const totalUraTaxesUgx =
    importDutyUgx +
    vatUgx +
    withholdingTaxUgx +
    infrastructureLevyUgx +
    environmentalLevyUgx;

  // Logistics & Registration (Fixed or Standardized costs in Uganda)
  // Mombasa Port Wharfage & CFS Handling: ~$450 USD
  const portClearanceUgx = Math.round(450 * exchangeRate);
  
  // Carrier Car-Carrier Truck Mombasa to Kampala Bond: ~$650 USD
  const carrierMombasaToKampalaUgx = Math.round(650 * exchangeRate);

  // URA Digital Number Plates & Logbook Registration: UGX 1,450,000
  const registrationPlatesUgx = 1450000;

  // Grand Total Landed Cost (CIF + URA Taxes + Port + Freight + Plates)
  const grandTotalLandedUgx =
    customsValueUgx +
    totalUraTaxesUgx +
    portClearanceUgx +
    carrierMombasaToKampalaUgx +
    registrationPlatesUgx;

  // Typical Street Broker Markup in Kampala without price transparency is 8-12%
  const savingsVsBrokerEstimateUgx = Math.round(grandTotalLandedUgx * 0.095);

  return {
    cifUsd,
    exchangeRateUgx: exchangeRate,
    customsValueUgx,
    importDutyRate,
    importDutyUgx,
    vatRate,
    vatUgx,
    withholdingTaxRate,
    withholdingTaxUgx,
    infrastructureLevyRate,
    infrastructureLevyUgx,
    environmentalLevyRate,
    environmentalLevyUgx,
    environmentalTierNote,
    totalUraTaxesUgx,
    portClearanceUgx,
    carrierMombasaToKampalaUgx,
    registrationPlatesUgx,
    grandTotalLandedUgx,
    savingsVsBrokerEstimateUgx,
  };
}

export function formatUgx(amount: number): string {
  return 'UGX ' + amount.toLocaleString('en-US');
}

export function formatShortUgx(amount: number): string {
  if (amount >= 1000000000) {
    return `UGX ${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `UGX ${(amount / 1000000).toFixed(1)}M`;
  }
  return formatUgx(amount);
}
