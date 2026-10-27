export type AcquisitionType = 'bond_stock' | 'direct_import' | 'numbered_used';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  engineCc: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid';
  transmission: 'Automatic' | 'Manual' | 'CVT';
  mileageKm: number;
  driveType: '4WD' | 'AWD' | '2WD / FWD';
  color: string;
  acquisitionType: AcquisitionType;
  priceUgx: number;
  originalPriceUgx?: number;
  cifMombasaUsd?: number;
  bondLocation: string;
  bondName: string;
  verifiedYard: boolean;
  auctionGrade?: string;
  plateNumber?: string; // e.g. "UBP 312M" or "Unregistered (U-Series)"
  images: string[];
  features: string[];
  uraTaxEstimatedUgx?: number;
  chassisPrefix: string;
  inspectionPassed: boolean;
}

export interface UraTaxCalculation {
  cifUsd: number;
  exchangeRateUgx: number;
  customsValueUgx: number;
  importDutyRate: number;
  importDutyUgx: number;
  vatRate: number;
  vatUgx: number;
  withholdingTaxRate: number;
  withholdingTaxUgx: number;
  infrastructureLevyRate: number;
  infrastructureLevyUgx: number;
  environmentalLevyRate: number;
  environmentalLevyUgx: number;
  environmentalTierNote: string;
  totalUraTaxesUgx: number;
  portClearanceUgx: number;
  carrierMombasaToKampalaUgx: number;
  registrationPlatesUgx: number;
  grandTotalLandedUgx: number;
  savingsVsBrokerEstimateUgx: number;
}

export interface BondDealer {
  id: string;
  name: string;
  zone: 'Nakawa' | 'Kyambogo' | 'Banda' | 'Pine / Lumumba' | 'Jinja Road';
  address: string;
  verifiedTIN: string;
  bondLicense: string;
  rating: number;
  activeUnitsCount: number;
  phoneWhatsapp: string;
  logo: string;
  featured: boolean;
}

export interface BuyerQuoteRequest {
  id: string;
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
  acquisitionType: AcquisitionType;
  budgetUgx: number;
  preferredColor?: string;
  fuelPreference?: string;
  purchaseTimeline: 'immediate' | 'within_14_days' | 'within_30_days' | 'exploring';
  buyerName: string;
  buyerPhone: string;
  buyerDistrict: string;
  createdAt: string;
  bidsCount: number;
}

export interface DealerBid {
  id: string;
  bondId: string;
  bondName: string;
  bondZone: string;
  offeredPriceUgx: number;
  discountVsAskingUgx: number;
  vehicleMatch: string;
  chassisNumber: string;
  warrantyMonths: number;
  deliveryTimeline: string;
  whatsappDirectUrl: string;
  createdAt: string;
}

export interface TradeInSwapRequest {
  currentCarMake: string;
  currentCarModel: string;
  currentCarYear: number;
  currentCarPlate: string;
  currentCarMileageKm: number;
  currentCarCondition: 'excellent' | 'good' | 'fair';
  desiredCarId?: string;
  desiredCarModel: string;
  estimatedCurrentValueUgx: number;
  estimatedTargetValueUgx: number;
  estimatedCashTopUpUgx: number;
}
