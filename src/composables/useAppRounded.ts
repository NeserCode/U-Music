import { useStorage } from "@vueuse/core";
import { watch, type Ref } from "vue";
import { useWindow } from "./useWindow";

export function useAppRounded(element?: Ref<HTMLDivElement | undefined>) {
  const isRounded = useStorage("app-rounded", false);
  const listeningRounded = (e = element) =>
    watch(
      isRounded,
      async (flag) => {
        const { $window } = useWindow();
        if (!e) throw Error("Element is not defined");
        if (flag) e.value?.classList.add("rounded-style");
        else e.value?.classList.remove("rounded-style");

        await $window.setShadow(flag);
      },
      { immediate: true }
    );

  return {
    isRounded,
    listeningRounded,
  };
}
