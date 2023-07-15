import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

import Button from "$store/components/ui/Button.tsx";
import Question from "$store/components/ui/Question.tsx";

const createQuestion = Runtime.create(
  "deco-sites/abracadabra/actions/question.ts"
);

export default function QuestionsAndAnswers() {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)?.value;
      const question = (e.currentTarget.elements.namedItem("question") as RadioNodeList)?.value;

      await createQuestion({ email, name, question });
    } finally {
      loading.value = false;
    }
  };

  return (
    <>
    <div class="my-4 sm:my-12 px-4">
      <h1 class={"border-b border-[#e5e5e5] mb-8 py-3 text-2xl"}>
        Perguntas & respostas
      </h1>

      <form
        class="flex flex-col items-start w-full h-full gap-2"
        onSubmit={handleSubmit}
      >
        <div class="flex flex-col gap-1 pb-3 w-full">
          <div class="flex flex-col gap-2 md:w-1/2">
            <div class="flex flex-col items-start w-full">
              <label htmlFor="question" class="text-[13px] tracking-tight">Tem alguma dúvida sobre este produto? Pergunte ao lojista e a outros compradores!</label>
              <textarea
                name="question"
                id="question"
                placeholder="Pergunte sobre o produto, como utilizá-lo ou peça alguma dica."
                class="border border-silver py-1 px-2 rounded-md text-sm w-full h-16 focus:border-blue-hover focus:outline-none"
              />
            </div>

            <div class="flex flex-col md:flex-row items-start md:items-end gap-1 mt-6 w-full">
              <div class="flex flex-col items-start w-full md:w-auto">
                <label htmlFor="name" class="tracking-tight">Seus dados</label>
                <input
                  name="name"
                  id="name"
                  placeholder="Nome ou apelido"
                  class="w-full md:w-auto border border-silver p-2 rounded-md text-sm focus:border-blue-hover focus:outline-none"
                />
              </div>

              <div class="w-full md:w-auto">
                <input
                  name="email"
                  id="email"
                  placeholder="Email"
                  class="w-full md:w-auto border border-silver p-2 rounded-md text-sm focus:border-blue-hover focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          class="max-w-xs bg-gold hover:bg-gold/90 text-white text-xs border-transparent hover:border-transparent rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-gold/40"
          disabled={loading}
        >
          Enviar pergunta
        </Button>
      </form>
    </div>

    <Question username="teste" question="teste" />
    </>
  )
}
