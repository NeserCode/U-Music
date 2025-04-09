import { LyricMetaData, LyricParsedData } from "@/shared";
import { useStorage } from "@vueuse/core";

export const useLyric = (raw: string[]) => {
  const lyric: LyricParsedData[] = [];
  raw.map((line) => {
    if (line.trim().length === 0) return;

    const jsoned: LyricMetaData | string =
      line[0] != "[" ? JSON.parse(line) : line;
    const parsed: LyricParsedData = {
      text: "",
      timestamp: -1,
    };
    if (typeof jsoned === "string") {
      let firstIndex = jsoned.slice(1).indexOf("]");
      const split = [
        jsoned.slice(1).slice(0, firstIndex),
        jsoned.slice(1).slice(firstIndex + 1),
      ];
      split[0].split(":").forEach((sn, i, arr) => {
        parsed.timestamp += Math.floor(
          parseFloat(sn) * Math.pow(60, arr.length - i - 1) * 1000
        );
      });
      parsed.text = split[1];                                                                                                                                                                                        
    } else {
      parsed.timestamp = parseInt(jsoned.t);
      let temp = [];
      for (let i = 0; i < jsoned.c.length; i++) temp.push(jsoned.c[i].tx);
      parsed.text = temp.join("");
    }
    lyric.push(parsed);
  });

  return lyric;
};

export const lyricMap = useStorage("u-lyric-map", new Map());
