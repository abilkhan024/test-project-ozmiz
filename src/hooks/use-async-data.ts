import { ref } from "vue";

export function useAsyncData<T>(cb: () => Promise<T>) {
  const pending = ref(false);
  const data = ref<T>();
  const refresh = () => {
    pending.value = true;
    const promise = cb();
    promise
      .then((response) => {
        data.value = response;
      })
      .finally(() => {
        pending.value = false;
      });
  };
  refresh();
  return { pending, data, refresh };
}
