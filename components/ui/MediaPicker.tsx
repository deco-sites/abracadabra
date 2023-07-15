import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export default function MediaPicker() {
  const preview = useSignal<string[]>([]);

  function onFileSelected(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    const { files } = event.currentTarget as HTMLInputElement;

    if (!files || files.length > 5) {
      return;
    }

    const newPreviews: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const previewURL = URL.createObjectURL(files[i]);
      newPreviews.push(previewURL);
    }

    preview.value = newPreviews;
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
        multiple
      />

      {preview.value.length > 0 && (
        <div class="flex items-center justify-center gap-2">
          {preview.value.map((item, index) => (
            <img
              src={item}
              alt={`Imagem ${index}`}
              className="aspect-video w-16 h-16 rounded-md object-cover cursor-pointer"
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
