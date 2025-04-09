<script lang="ts" setup>
import Back from "@/frameworks/Back.vue";
import Scrollable from "@/frameworks/Scrollable.vue";
import Ranger from "@/presets/Ranger.vue";
import { useStorage, watchOnce } from "@vueuse/core";

import type { MittSongStateParams } from "@/shared/mitt";
import { onMounted, ref, watch } from "vue";
import { useApi } from "@/composables/useApi";
import { useLyric, lyricMap } from "@/composables/useLyric";
import { $bus } from "@/composables/useMitt";

const songRuntime = useStorage("song-runtime", {
  url: undefined,
  duration: 0,
  current: 0,
  playing: false,
  volume: 1.0,
  mute: false,
});
const playingSong = useStorage<MittSongStateParams>("u-playing-song", {
  id: -1,
  title: "当前未播放",
  artist: "--",
  image: "",
});
const activeLyricIndex = ref(0);

const jumpToLyric = (index: number) => {
  if (!lyricMap.value.get(playingSong.value.id)) return;
  const shouldJumpTo = lyricMap.value.get(playingSong.value.id)[index];
  console.log(shouldJumpTo);

  if (shouldJumpTo === undefined) return;
  else $bus.emit("song-change-time", shouldJumpTo.timestamp / 1000);
};

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
        // console.log(rawLyric);
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

    if (!lyric || lyric.length <= 0) return;
    while (lyric[activeIndex].timestamp < now)
      if (!lyric[activeIndex + 1]) return;
      else activeIndex++;

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

        <Back />
      </div>

      <div id="lyric" v-if="!playingSong.lyric?.length">Lyrics Loading</div>
      <div id="lyric" v-else>
        <Scrollable el="#lyric">
          <p
            class="line"
            @dblclick="jumpToLyric(index)"
            :class="{ active: activeLyricIndex == index }"
            v-for="(lyric, index) of playingSong.lyric"
          >
            {{ lyric.text }}
          </p>
        </Scrollable>
      </div>
    </div>
    <div class="song-controllers">
      <Ranger :total="songRuntime.duration" :current="songRuntime.current" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.song-info {
  @apply w-full flex flex-row justify-between p-12 gap-4
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
  @apply w-2/3 h-96 flex flex-col items-center
  text-center 
  transition-all duration-100;
}
#lyric .line {
  @apply w-96 snap-center select-none cursor-pointer
  transition-all ease-linear duration-100;
}
.line.active {
  @apply my-0.5 text-green-400
  scale-110;
}
.line.active + .line {
  @apply opacity-100;
}
.line:not(.active) {
  @apply opacity-70;
}

.song-controllers {
  @apply absolute bottom-0 w-full h-fit;
}
</style>
