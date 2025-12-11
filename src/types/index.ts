export type ServiceType = 'GAS' | 'ELECTRICITY';

export interface Reading {
    date: string;
    value: number;
}

export interface BillRecord {
    id: string;
    type: ServiceType;
    date: string; // ISO string for the record creation
    periodLabel: string; // e.g. "Ene-Feb 2024"
    billAmount: number;

    // Consumption details
    totalConsumption: number; // From external meter (or calculated)
    backHouseConsumption: number; // From internal meter
    frontHouseConsumption: number; // total - back

    // Readings (optional storage for reference)
    // Made required now for DB consistency based on new logic
    streetReadingPrev?: number;
    streetReadingCurr?: number;
    internalReadingPrev?: number;
    internalReadingCurr?: number;

    // Split results
    frontHousePay: number;
    backHousePay: number;

    // Status
    isPaid: boolean;

    // File Attachment
    fileUrl?: string;
}
