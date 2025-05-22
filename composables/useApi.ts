import { ofetch } from "ofetch";
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

export function useApi() {
	const config = useRuntimeConfig();
	const API_BASE_URL = config.public.apiBase || "";

	const isLoading = ref(false);
	const error = ref<unknown>(null);

	const fetchData = async <T>(
		endpoint: string,
		options: any = {},
	): Promise<T> => {
		isLoading.value = true;
		error.value = null;

		try {
			console.log("API_BASE_URL ", API_BASE_URL);
			const response = await ofetch<T>(`${API_BASE_URL}${endpoint}`, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...options?.headers,
				},
			});
			console.log(response);

			return response;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const get = <T>(endpoint: string, params = {}) => {
		return fetchData<T>(endpoint, { method: "GET", params });
	};

	const post = <T>(endpoint: string, data = {}) => {
		return fetchData<T>(endpoint, {
			method: "POST",
			body: data,
		});
	};

	const put = <T>(endpoint: string, data = {}) => {
		return fetchData<T>(endpoint, {
			method: "PUT",
			body: data,
		});
	};

	const del = <T>(endpoint: string) => {
		return fetchData<T>(endpoint, { method: "DELETE" });
	};

	return {
		isLoading,
		error,
		get,
		post,
		put,
		del,
	};
}
