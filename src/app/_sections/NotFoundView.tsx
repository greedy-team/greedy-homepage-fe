import { Button } from "@/shared/ui/Button";
import { NOT_FOUND } from "./content";

/**
 * 없는 주소로 왔을 때의 본문. 위트 한 마디와 설명, 홈 버튼 하나만 둬요.
 * not-found(라우트 안에서 notFound() 호출)와 global-not-found(주소 자체가 없음) 둘 다 이걸 써요.
 */
export function NotFoundView() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-32 text-center md:px-20 md:py-44">
      <h1 className="text-h1 text-text">{NOT_FOUND.title}</h1>
      <p className="text-body text-text-subtle">{NOT_FOUND.description}</p>
      <div className="mt-3">
        <Button variant="primary" size="lg" href="/">
          {NOT_FOUND.cta}
        </Button>
      </div>
    </div>
  );
}
