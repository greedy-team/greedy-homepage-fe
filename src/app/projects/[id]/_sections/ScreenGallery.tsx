import Image from "next/image";

/**
 * 화면 모음. 이미지가 없으면 아무것도 그리지 않아요 (아직 화면이 없는 프로젝트).
 * 네 칸을 넘으면 마지막 칸이 남은 개수를 알리는 +n 칸이 돼요.
 */
export function ScreenGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  const visible = images.length <= 4 ? images : images.slice(0, 3);
  const overflow = images.length - visible.length;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-text">화면</h2>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {visible.map((src) => (
          <li key={src} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
            {/* 실제 이미지 주소가 확정되면 next.config의 images.remotePatterns에 호스트를 추가해요 */}
            <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </li>
        ))}
        {overflow > 0 && (
          <li className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md bg-gray-900 text-white">
            <span className="text-h2">+{overflow}</span>
            <span className="text-body-sm text-gray-300">모두 보기</span>
          </li>
        )}
      </ul>
    </section>
  );
}
