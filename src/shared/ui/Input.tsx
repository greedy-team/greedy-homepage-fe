import { useId } from "react";
import { cn, focusRing } from "@/shared/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** 입력창 위에 붙는 이름 */
  label?: string;
  /** 아래 회색 도움말. error가 있으면 error가 우선 */
  helper?: string;
  /** 값이 잘못됐을 때의 이유. 있으면 테두리가 danger로 바뀌어요 */
  error?: string;
};

export function Input({ label, helper, error, id, className, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const message = error ?? helper;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={inputId} className="text-body-sm font-semibold text-text">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          "h-10 rounded-sm border border-border bg-bg px-3 text-body-sm text-text transition-colors",
          "placeholder:text-text-subtle focus:border-brand",
          "disabled:bg-gray-100 disabled:text-disabled",
          error && "border-danger",
          focusRing,
        )}
        {...props}
      />
      {message && (
        <p id={messageId} className={cn("text-caption", error ? "text-danger" : "text-text-subtle")}>
          {message}
        </p>
      )}
    </div>
  );
}
