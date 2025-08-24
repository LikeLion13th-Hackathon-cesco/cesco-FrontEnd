import { ref, watch, type Ref } from "vue";

export function useDebounce<T>(value: Ref<T>, delay = 500) {
  const debounced = ref(value.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newVal) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debounced.value = newVal;
    }, delay);
  });

  return debounced;
}
