import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import MediaPicker from "$store/components/ui/MediaPicker.tsx";
import ChooseRating from "$store/components/ui/ChooseRating.tsx";

export default function WriteRating() {
  const isOpened = useSignal(false);

  return (
    <>
    {!isOpened.value ? (
      <Button
        onClick={() => isOpened.value = true}
        class="max-w-xs bg-gold hover:bg-gold/90 text-white text-xs border-transparent hover:border-transparent rounded-md cursor-pointer"
      >
        Escrever avaliação...
      </Button>
    ) : (
      <form class="flex flex-col w-full gap-3 items-start">
        <div class="flex flex-col items-start w-full">
          <label htmlFor="ratingPreview" class="tracking-tight">Dê uma nota geral para o produto</label>
          <ChooseRating />
        </div>

        <div class="flex flex-col items-start group w-full">
          <div class="flex flex-col w-full">
            <label htmlFor="question" class="tracking-tight">Sua avaliação do produto</label>
            <textarea
              name="question"
              id="question"
              placeholder="Dê detalhes sobre o produto e por que deu a nota acima. Se possível, fale como você usa o produto e dê dicas para outros consumidores."
              class="border border-silver py-1 px-2 rounded-md text-sm w-full h-16 focus:border-blue-hover focus:outline-none"
            />
          </div>

          <div class="hidden group-focus-within:flex flex-col items-start w-full border border-silver shadow-lg">
            <span class="bg-lavender px-3 py-1 border-b border-b-silver w-full">Faça como o Francisca Almeida, detalhe sua experiência para ajudar outros compradores a esclarecerem possíveis dúvidas sobre o produto</span>
            <span class="text-sm p-3 w-full">Os colchões são ótimos, mas ainda não deu pra desfrutar da cama!</span>
          </div>
        </div>

        <div class="flex flex-col items-start">
          <span>Você recomendaria esse produto a um amigo?</span>

          <div class="flex items-center justify-center gap-2">
            <div class="flex items-center justify-center gap-1">
              <input
                type="checkbox"
              />
              <span>Sim</span>
            </div>

            <div class="flex items-center justify-center gap-1">
              <input
                type="checkbox"
              />
              <span>Não</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-start">
          <p class="font-bold">Fotos do produto {' '}
            <span class="font-normal text-silver text-sm">Envie até 5 fotos que você tirou do produto. Elas poderão ser publicadas junto à sua avaliação.</span>
          </p>

          <div className="flex items-center my-1">
            <label
              htmlFor="media"
              className="flex cursor-pointer items-center text-sm py-2 px-3 border border-silver text-silver rounded-md"
            >
              Escolha imagens
            </label>
          </div>

          <MediaPicker />
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

        <Button
          class="max-w-xs bg-gold hover:bg-gold/90 text-white text-xs border-transparent hover:border-transparent rounded-md cursor-pointer"
        >
          Enviar avaliação
        </Button>
      </form>
    )}
    </>
  )
}