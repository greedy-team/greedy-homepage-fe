"use client";

import { useEffect } from "react";

/**
 * global-not-found는 App Router 트리 밖에서 바로 응답돼요.
 * 이 화면의 내부 Link는 클라이언트 라우팅 대신 새 문서로 이동해야 해요.
 */
export function GlobalNotFoundNavigation() {
  useEffect(() => {
    function navigateWithDocument(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      window.location.assign(url.href);
    }

    document.addEventListener("click", navigateWithDocument, true);
    return () => document.removeEventListener("click", navigateWithDocument, true);
  }, []);

  return null;
}
