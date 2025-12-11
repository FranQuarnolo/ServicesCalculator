import { useCallback } from 'react';

export interface CalculationInputs {
    billAmount: number;
    totalConsumptionOrReading: number;
    internalConsumptionOrReading: number;
}

export const useCalculator = () => {
    const calculateSplit = useCallback((
        billAmount: number,
        totalConsumption: number,
        backConsumption: number
    ) => {
        if (totalConsumption <= 0) {
            return {
                frontPay: 0,
                backPay: 0,
                frontCons: 0,
                frontPayRounded: 0,
                backPayRounded: 0
            };
        }

        // Ensure back consumption doesn't exceed total (sanity check)
        const effectiveBackCons = Math.min(backConsumption, totalConsumption);
        const frontCons = totalConsumption - effectiveBackCons;

        const backShare = effectiveBackCons / totalConsumption;
        const backPay = billAmount * backShare;
        const frontPay = billAmount - backPay;

        return {
            frontPay,
            backPay,
            frontCons,
            // Rounding to 2 decimals
            frontPayRounded: Math.round(frontPay * 100) / 100,
            backPayRounded: Math.round(backPay * 100) / 100,
        };
    }, []);

    return { calculateSplit };
};
