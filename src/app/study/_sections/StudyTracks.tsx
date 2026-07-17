"use client";

import { useState } from "react";
import { Tabs } from "@/shared/ui/Tabs";
import { Curriculum } from "./Curriculum";
import { TrackIntro } from "./TrackIntro";
import { WeekRhythm } from "./WeekRhythm";
import { TRACKS } from "./content";

/** 트랙 탭과, 탭을 따라 함께 바뀌는 구획들. 한 주의 리듬은 두 트랙이 같아서 고정이에요 */
export function StudyTracks() {
  const [value, setValue] = useState(TRACKS[0].value);
  const track = TRACKS.find((item) => item.value === value) ?? TRACKS[0];

  return (
    <>
      <Tabs
        items={TRACKS.map((item) => ({ label: item.label, value: item.value }))}
        value={value}
        onChange={setValue}
      />
      <TrackIntro track={track} />
      <WeekRhythm />
      <Curriculum phases={track.curriculum} />
    </>
  );
}
