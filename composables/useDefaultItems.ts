import { computed } from "vue";

export interface MedicationItem {
  name?: string;
  dosage?: string;
  frequency?: string;
  [key: string]: unknown;
}

export function useDefaultItems(passedItems: MedicationItem[]) {
  return computed<MedicationItem[]>(() =>
    Array.isArray(passedItems) && passedItems.length > 0
      ? passedItems
      : Array.from({ length: 3 }, (_, i) => ({
          name: `Medication ${i + 1}`,
          dosage: `${(i + 1) * 5} mg`,
          frequency: `${i + 1} time per day`,
        })),
  );
}
