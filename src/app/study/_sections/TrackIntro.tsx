import { Badge } from "@/shared/ui/Badge";
import type { Track } from "./content";

/** 트랙 소개. 무엇을 만드는 트랙인지와 다루는 기술을 보여줘요 */
export function TrackIntro({ track }: { track: Track }) {
  return (
    <section className="mt-10">
      <h2 className="text-h2 text-text">{track.title}</h2>
      <p className="mt-3 max-w-lg text-body text-text-subtle">{track.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {track.skills.map((skill) => (
          <li key={skill}>
            <Badge variant="outline">{skill}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
