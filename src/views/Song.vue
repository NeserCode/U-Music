<script lang="ts" setup>
import Back from "@/frameworks/Back.vue";
import Scrollable from "@/frameworks/Scrollable.vue";
import { useStorage, watchOnce } from "@vueuse/core";

import type { MittSongStateParams } from "@/shared/mitt";
import { onMounted, ref, watch } from "vue";
import { useApi } from "@/composables/useApi";
import { useLyric, lyricMap } from "@/composables/useLyric";
import { $bus } from "@/composables/useMitt";

const playingSong = useStorage<MittSongStateParams>("u-playing-song", {
  id: -1,
  title: "当前未播放",
  artist: "--",
  image: "",
});
const activeLyricIndex = ref(0);

onMounted(() => {
  if (
    playingSong.value.lyric == undefined ||
    !lyricMap.value.get(playingSong.value.id)
  ) {
    const { getSongLyric } = useApi();
    const { data, execute } = getSongLyric({
      id: playingSong.value.id,
    });

    execute();
    watchOnce(data, () => {
      if (data.value?.code) {
        const rawLyric = data.value.lrc.lyric.split("\n");
        console.log(rawLyric);

        lyricMap.value.set(playingSong.value.id, useLyric(rawLyric));

        playingSong.value.lyric = lyricMap.value.get(playingSong.value.id);
      }
    });
  }

  // Lyric active
  $bus.on("audio:time-update", (times) => {
    const now = Math.floor(times.current * 1000);
    const lyric = playingSong.value.lyric;
    let activeIndex = 0;

    if (!lyric || lyric.length <= 0 || !lyric[activeIndex]) return;
    while (lyric[activeIndex].timestamp < now) activeIndex++;

    $bus.emit("song-lyric-active", activeIndex - 1);
  });
  $bus.on("song-lyric-active", (i) => {
    activeLyricIndex.value = i;
  });

  watch(activeLyricIndex, (i) => {
    const content = document.querySelector("#lyric .view-scrollable");
    const children = content?.querySelectorAll("p.line");

    if (!children || !children.length) return;
    children[i]?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
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
          <p
            class="line"
            :class="{ active: activeLyricIndex == index }"
            v-for="(lyric, index) of playingSong.lyric"
          >
            {{ lyric.text }}
          </p>
        </Scrollable>
      </div>
      <Back />
    </div>
    <div class="song-controllers"></div>
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
  @apply inline-block break-words
  text-lg font-medium leading-6;
}
.title .artist {
  @apply text-sm opacity-75;
}

#lyric {
  @apply w-2/3 h-96;
}
#lyric .line {
  @apply snap-center
  transition-all ease-in-out duration-200;
}
.line.active {
  @apply text-xl text-green-400;
}
</style>
