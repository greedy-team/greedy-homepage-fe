import { Button } from "@/shared/ui/Button";
import { NOT_FOUND } from "./_sections/content";

/**
 * 없는 주소로 왔을 때. 위트 한 마디와 설명, 홈 버튼 하나만 둬요.
 * 404 숫자는 쓰지 않아요. 상태 코드는 개발자의 말이에요.
 */
export default function NotFound() {
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
