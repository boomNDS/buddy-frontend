import { useApi } from "@/composables/useApi";

export interface IClinic {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IVetVisit {
  petId: number;
  clinicId: number;
  date: string;
  time: string;
  notes?: string;
}

export interface IVetVisitResponse {
  id: number;
  petId: number;
  clinicId: number;
  date: string;
  time: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  clinicName: string;
}

export async function fetchClinics(): Promise<IClinic[]> {
  const { get } = useApi();

  try {
    return await get<IClinic[]>("/clinics");
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return [];
  }
}

export async function addVetVisit(
  visitData: IVetVisit,
): Promise<IVetVisitResponse | null> {
  const { post } = useApi();

  try {
    return await post<IVetVisitResponse>("/vet-visits", visitData);
  } catch (error) {
    console.error("Error adding vet visit:", error);
    return null;
  }
}

export async function mockFetchClinics(): Promise<IClinic[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      id: 1,
      name: "Bangna Pet Hospital",
      createdAt: "2025-05-19T03:19:45.000Z",
      updatedAt: "2025-05-19T03:19:45.000Z",
    },
    {
      id: 2,
      name: "PetMD Veterinary Clinic",
      createdAt: "2025-05-19T03:19:45.000Z",
      updatedAt: "2025-05-19T03:19:45.000Z",
    },
    {
      id: 3,
      name: "Siam Pet Care",
      createdAt: "2025-05-19T03:19:45.000Z",
      updatedAt: "2025-05-19T03:19:45.000Z",
    },
    {
      id: 4,
      name: "Happy Paws Animal Hospital",
      createdAt: "2025-05-19T03:19:45.000Z",
      updatedAt: "2025-05-19T03:19:45.000Z",
    },
  ];
}

export async function mockAddVetVisit(
  visitData: IVetVisit,
): Promise<IVetVisitResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id: Math.floor(Math.random() * 1000),
    ...visitData,
    notes: visitData.notes || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    clinicName:
      visitData.clinicId === 1
        ? "Bangna Pet Hospital"
        : visitData.clinicId === 2
          ? "PetMD Veterinary Clinic"
          : visitData.clinicId === 3
            ? "Siam Pet Care"
            : "Happy Paws Animal Hospital",
  };
}
