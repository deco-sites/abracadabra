import { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  /**
   * @title Text
   */
  text?: HTML;
}

export default function Partnerships({ text = "Por favor, insira o seu texto aqui" }: Props) {
  return (
    <div class="flex items-center justify-center w-full h-full py-8 px-2">
      <div class="flex items-center justify-center text-center max-w-[1180px]">
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}
