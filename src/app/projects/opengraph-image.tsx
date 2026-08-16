import { ogImage } from "../_og/image";
import { OG_SIZE } from "../_og/OgCard";
import { PAGE } from "./_sections/content";

export const alt = `${PAGE.title} - 그리디`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: PAGE.title, sub: PAGE.subtitle });
}
