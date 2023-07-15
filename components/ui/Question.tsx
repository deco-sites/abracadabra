import { asset } from "$fresh/runtime.ts";

export interface QuestionProps {
  username: string;
  question: string;
}

export default function Question({ username, question }: QuestionProps) {
  return (
    <div class="flex flex-col md:flex-row items-start justify-start w-full h-full py-6 pl-8 gap-6 border-t border-[#e5e5e5]">
      <div class="flex items-center justify-start h-full gap-2">
        <img
          class="object-cover"
          src={asset("/happy-icon.png")}
          width={50}
          height={50}
        />
      </div>

      <div class="flex flex-1 flex-col gap-2 items-start justify-between w-full">
        <div class="flex items-center justify-between w-full">
          <span class="font-bold text-gray-base">{username}</span>
          <span class="text-silver text-sm">12/07/2023</span>
        </div>

        <div class="flex w-full">
          <span class="text-justify leading-tight text-sm ">{question}</span>
        </div>
      </div>
    </div>
  );
}
