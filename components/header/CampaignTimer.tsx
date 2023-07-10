import { useId } from "preact/hooks";
import { HTML, Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  image?: LiveImage;
  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt?: string;

  labels?: {
    /**
     * @title Text to show when expired
     */
    expired?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };

  /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
  text?: HTML;
}

const snippet = (expiresAt: string, rootId: string) => {
  const expirationDate = new Date(expiresAt).getTime();

  const getDelta = () => {
    const delta = expirationDate - new Date().getTime();

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const setValue = (id: string, value: number) => {
    const elem = document.getElementById(id);

    if (!elem) return;

    elem.style.setProperty("--value", value.toString());
  };

  setInterval(() => {
    const { days, hours, minutes, seconds } = getDelta();
    const isExpired = hours + minutes + seconds < 0;

    if (isExpired) {
      const expired = document.getElementById(`${rootId}::expired`);
      const counter = document.getElementById(`${rootId}::counter`);

      expired?.classList.remove("hidden");
      counter?.classList.add("hidden");
    } else {
      setValue(`${rootId}::days`, days);
      setValue(`${rootId}::hours`, hours);
      setValue(`${rootId}::minutes`, minutes);
      setValue(`${rootId}::seconds`, seconds);
    }
  }, 1000);
};

function CampaignTimer({
  image,
  expiresAt = `${new Date()}`,
  labels,
  text = "Time left for a campaign to end wth a link",
}: Props) {
  const id = useId();

  return (
    <>
      <div class="bg-gainsboro text-cyan-dark w-full h-full justify-center items-center text-center flex">
        <div class="flex sm:grid sm:grid-cols-3 sm:gap-4 divide-x divide-white sm:grid-flow-col text-center sm:auto-cols-max items-center justify-between sm:justify-center lg:container px-4 lg:px-16 w-full">
          <div class="flex justify-center">
            <picture>
              <img src={image} class="w-[80%] md:w-full h-full" />
            </picture>
          </div>
          <div class="flex flex-1 text-center px-1 sm:px-6 md:px-8">
            <div class="text-[10px] sm:text-sm xl:text-xl leading-tight tracking-tighter">
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          </div>
          <div class="flex items-center justify-center h-20">
            <div class="flex flex-col items-center justify-center text-center sm:gap-1 min-w-full">
              {/* <h1 class="text-sm md:text-xl font-bold">Termina em:</h1> */}

              <div id={`${id}::expired`} class="hidden h-full text-center">
                <span class="flex items-center text-sm sm:text-2xl h-full">
                  {labels?.expired || "Expired!"}
                </span>
              </div>

              <div id={`${id}::counter`}>
                <div class="flex sm:grid sm:grid-flow-col gap-2 text-center sm:auto-cols-max items-center font-bold uppercase px-2 sm:px-0">
                  <div class="flex flex-col items-center justify-center text-center">
                    <span class="countdown text-[10px] sm:text-xl md:text-3xl">
                      <span id={`${id}::days`} />
                    </span>
                    <span class="text-[8px] sm:text-[10px]">
                      {labels?.days || "Dias"}
                    </span>
                  </div>
                  :
                  <div class="flex flex-col items-center justify-center text-center">
                    <span class="countdown text-[10px] sm:text-xl md:text-3xl">
                      <span id={`${id}::hours`} />
                    </span>
                    <span class="text-[8px] sm:text-[10px]">
                      {labels?.hours || "Horas"}
                    </span>
                  </div>
                  <div>
                    :
                  </div>
                  <div class="flex flex-col items-center justify-center text-center">
                    <span class="countdown text-[10px] sm:text-xl md:text-3xl">
                      <span id={`${id}::minutes`} />
                    </span>
                    <span class="text-[8px] sm:text-[10px]">
                      {labels?.minutes || "Min"}
                    </span>
                  </div>
                  <div>
                    :
                  </div>
                  <div class="flex flex-col items-center justify-center text-center">
                    <span class="countdown text-[10px] sm:text-xl md:text-3xl">
                      <span id={`${id}::seconds`} />
                    </span>
                    <span class="text-[8px] sm:text-[10px]">
                      {labels?.seconds || "Seg"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(${snippet})("${expiresAt}", "${id}");`,
        }}
      />
    </>
  );
}

export default CampaignTimer;
