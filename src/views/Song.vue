<script lang="ts" setup>
import Back from "@/frameworks/Back.vue";
import Scrollable from "@/frameworks/Scrollable.vue";
import { useStorage, watchOnce } from "@vueuse/core";

import type { MittSongStateParams } from "@/shared/mitt";
import { onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { useLyric } from "@/composables/useLyric";

const playingSong = useStorage<MittSongStateParams>("u-playing-song", {
  id: -1,
  title: "当前未播放",
  artist: "--",
  image: "",
});

onMounted(() => {
  if (playingSong.value.lyric == undefined) {
    const { getSongLyric } = useApi();
    const { data, execute } = getSongLyric({
      id: playingSong.value.id,
    });

    execute();
    watchOnce(data, () => {
      if (data.value?.code) {
        const rawLyric = data.value.lrc.lyric.split("\n");
        console.log(rawLyric, useLyric(rawLyric));
      }
    });
  }
});
</script>

<template>
  <div class="view-song">
    <div class="song-info">
      <div class="profile">
        <img :src="playingSong.image" alt="Song cover" class="cover" />
        <span class="title">
          <span class="name">{{ playingSong.title }} </span>
          <span class="artist">{{ playingSong.artist }}</span>
        </span>
      </div>

      <div id="lyric" v-if="!playingSong.lyric?.length">Lyrics Loading</div>
      <div id="lyric" v-else>
        <Scrollable el="#lyric">
          <p class="line" v-for="lyric of playingSong.lyric">{{ lyric }}</p>
        </Scrollable>
      </div>
    </div>
    <div class="song-controllers"></div>
    <Back />
  </div>
</template>

<style lang="postcss" scoped>
.song-info {
  @apply w-full flex flex-row justify-center p-12 gap-4
  select-none;
}

.song-info .profile {
  @apply inline-flex flex-col;
}

.profile .cover {
  @apply w-36 h-36 inline-block
  rounded pointer-events-none shadow;
}
.profile .title {
  @apply max-w-36 inline-flex flex-col mt-4;
}
.title .name {
  @apply inline-block 
  text-lg font-medium leading-6;
}
.title .artist {
  @apply text-sm opacity-75;
}

#lyric {
  @apply w-1/2 max-h-72;
}
</style>
