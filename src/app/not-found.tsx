import { NotFoundView } from "./_sections/NotFoundView";

/**
 * 라우트 안에서 notFound()를 부를 때 보여요 (예: 없는 활동 id).
 * 공통 레이아웃(GNB·푸터) 안에 뜨니 본문만 그려요.
 * 주소 자체가 어떤 라우트와도 안 맞는 경우는 global-not-found.tsx가 맡아요.
 */
export default function NotFound() {
  return <NotFoundView />;
}
