import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter() {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col items-center gap-4 sm:gap-4">
      <span class="font-medium text-xl text-red-base">
        Cadastre-se e receba novidades exclusivas
      </span>
      <form
        class="w-full form-control"
        onSubmit={handleSubmit}
      >
        <div class="input-group rounded-none">
          <input
            name="email"
            class="flex-grow input rounded-none"
            placeholder="Seu e-mail"
          />
          <button class="btn bg-yellow-base border-0 text-white disabled:loading" disabled={loading}>
            CADASTRAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
