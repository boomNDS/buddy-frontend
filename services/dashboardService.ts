import { useApi } from "@/composables/useApi";
import type { IVetVisitResponse } from "./clinicService";

export interface IDashboard {
  pet: IPet;
  diet: IDiet[];
  medications: IMedication[];
  visits: IVetVisitResponse[];
}

export interface IPet {
  id: number;
  name: string;
  sex: string;
  birthDate: string;
  breed: string;
  weight: number;
  microchip: string;
  color: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDiet {
  id: number;
  petId: number;
  brand: string;
  line: string;
  amount: string;
  unit: "oz" | "ml" | "g" | "kg";
  schedule: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMedication {
  id: number;
  petId: number;
  name: string;
  dosage: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchDashboard(): Promise<IDashboard[]> {
  const { get } = useApi();

  try {
    return await get<IDashboard[]>("/dashboard");
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return [];
  }
}
