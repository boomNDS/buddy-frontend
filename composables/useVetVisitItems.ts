import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { computed } from "vue";
dayjs.extend(relativeTime);

export interface VetVisitItem {
  imageSrc?: string;
  hospitalName?: string;
  appointmentDate: string; // ISO date string
  status?: "pending" | "completed" | "cancelled";
  statusLabel?: string;
  [key: string]: unknown;
}

export function useVetVisitItems(passedItems: VetVisitItem[]) {
  return computed<VetVisitItem[]>(() => {
    const source =
      Array.isArray(passedItems) && passedItems.length > 0
        ? passedItems
        : Array.from({ length: 3 }, (_, i) => ({
            imageSrc: "/images/thonglor.png",
            hospitalName: `Thonglor Pet Hospital ${i + 1}`,
            appointmentDate: dayjs()
              .add(i + 1, "day")
              .toISOString(),
            status: "pending" as const,
          }));

    return source.map((item) => {
      const appt = dayjs(item.appointmentDate);
      let label: string;

      if (item.status === "completed") {
        label = "Completed";
      } else if (item.status === "cancelled") {
        label = "Cancelled";
      } else {
        const now = dayjs();
        const diffDays = appt.diff(now, "day");

        if (diffDays > 0) {
          label = `In ${diffDays} day${diffDays > 1 ? "s" : ""}`;
        } else if (diffDays === 0) {
          label = "Today";
        } else {
          const pastDays = Math.abs(diffDays);
          label = `${pastDays} day${pastDays > 1 ? "s" : ""} ago`;
        }
      }

      return {
        ...item,
        statusLabel: label,
      };
    });
  });
}
