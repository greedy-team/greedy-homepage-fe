"use client";

// Swagger UI를 CDN(unpkg)에서 로드해 docs/openapi.yaml을 보여줘요.
// 개발 전용 문서 뷰어라 번들 의존성을 늘리지 않고 스크립트 주입으로 처리해요.
import { useEffect, useRef } from "react";

const SWAGGER_VERSION = "5.17.14";
const CSS_URL = `https://unpkg.com/swagger-ui-dist@${SWAGGER_VERSION}/swagger-ui.css`;
const JS_URL = `https://unpkg.com/swagger-ui-dist@${SWAGGER_VERSION}/swagger-ui-bundle.js`;

declare global {
  interface Window {
    SwaggerUIBundle?: (options: { url: string; domNode: HTMLElement | null }) => void;
  }
}

export function SwaggerViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CSS_URL;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = JS_URL;
    script.onload = () => {
      window.SwaggerUIBundle?.({ url: "/api-docs/spec", domNode: containerRef.current });
    };
    document.body.appendChild(script);

    return () => {
      link.remove();
      script.remove();
    };
  }, []);

  return <div ref={containerRef} />;
}
