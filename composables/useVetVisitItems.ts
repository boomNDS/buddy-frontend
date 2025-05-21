import { computed } from "vue";

export interface vetVisitItem {
	imageSrc?: string;
	hospitalName?: string;
	appointmentDate?: Date;
	status?: "pending" | "completed" | "cancelled";
	statusLabel?: string;
	[key: string]: unknown;
}

export function useVetVisitItems(passedItems: vetVisitItem[]) {
	return computed<vetVisitItem[]>(() =>
		Array.isArray(passedItems) && passedItems.length > 0
			? passedItems
			: Array.from({ length: 3 }, (_, i) => ({
					imageSrc: "thonglor.png",
					hospitalName: `Thonglor Pet Hospital ${i + 1}`,
					appointmentDate: new Date().toISOString(),
					status: "pending",
				})),
	);
}
