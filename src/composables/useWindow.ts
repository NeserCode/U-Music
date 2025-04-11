import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useDebounceFn, useStorage } from "@vueuse/core";

const appWindow = getCurrentWebviewWindow();

const setTopDebounce = useDebounceFn(async (flag: boolean) => {
  await appWindow.setAlwaysOnTop(flag);
}, 200);

export const useWindow = () => {
  return {
    $window: appWindow,
    appAlwaysOnTop: useStorage<boolean>(
      "app-always-on-top",
      false,
      localStorage,
      {
        serializer: {
          read: (value) => JSON.parse(value),
          write: (value) => {
            setTopDebounce(value);
            return JSON.stringify(value);
          },
        },
      }
    ),
    nextTickToShow: () => {
      setTimeout(async () => {
        await appWindow.show();
      }, 0);
    },
    nextTickToHide: () => {
      setTimeout(async () => {
        await appWindow.hide();
      }, 0);
    },
  };
};
