import { addVetVisit, fetchClinics } from "@/services/clinicService";
import type { Clinic } from "@/services/clinicService";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useDayjs } from "#imports";

const schema = z.object({
  clinic: z.string().min(1, "Please select a vet clinic"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
});

export function useVetVisitForm() {
  const router = useRouter();
  const dayjs = useDayjs();

  const clinics = ref<Clinic[]>([]);
  const isLoading = ref(false);
  const isSubmitting = ref(false);
  const error = ref<string | null>(null);
  const errors = reactive({ clinic: "", date: "", time: "" });

  const formData = reactive({
    clinic: "",
    date: dayjs().add(1, "day").format("YYYY-MM-DD"),
    time: "10:00",
    notes: "",
  });

  const loadClinics = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      clinics.value = await fetchClinics();
    } catch (err) {
      error.value = "Failed to load clinics";
    } finally {
      isLoading.value = false;
    }
  };

  const validateForm = () => {
    errors.clinic = "";
    errors.date = "";
    errors.time = "";

    try {
      schema.parse(formData);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        for (const error of err.errors) {
          const field = error.path[0];
          if (field && field in errors) {
            errors[field as keyof typeof errors] = error.message;
          }
        }
      }
      return false;
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    isSubmitting.value = true;
    error.value = null;

    try {
      const formattedTime = `${formData.date} ${formData.time}:00`;
      const data = {
        petId: 1,
        clinicId: Number(formData.clinic),
        date: formData.date,
        time: formattedTime,
        notes: formData.notes || "",
      };
      console.log("Submitting visit data:", data);
      const result = await addVetVisit(data);
      if (result) router.push("/");
    } catch (err: any) {
      error.value = err.message || "Submission failed";
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    clinics,
    isLoading,
    isSubmitting,
    error,
    errors,
    formData,
    loadClinics,
    onSubmit,
  };
}
