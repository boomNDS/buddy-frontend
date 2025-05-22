import { ref } from "vue";
import { fetchDashboard } from "@/services/dashboardService";
import type { IDashboard } from "@/services/dashboardService";

export function useDashboard() {
  const dashboardData = ref<IDashboard[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadDashboard = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      dashboardData.value = await fetchDashboard();
    } catch (err) {
      error.value = "Failed to load dashboard data";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    dashboardData,
    isLoading,
    error,
    loadDashboard,
  };
}
