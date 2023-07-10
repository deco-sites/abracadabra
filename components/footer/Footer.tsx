import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import Banner from "$store/islands/FooterBanner.tsx";
import Stamps from "$store/islands/Stamps.tsx";
import SocialMedias, {
  type SocialMediaProps,
} from "$store/components/footer/SocialMedias.tsx";
import type { ComponentChildren } from "preact";
import type { FooterBanner } from "./FooterBanner.tsx";
import type { Stamp } from "./Stamps.tsx";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

export type Contact = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span>
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a class="text-sm" href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`sm:py-12 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  contacts?: Contact[];
  socialMedias?: SocialMediaProps[];
  banner?: FooterBanner[];
  stamp?: Stamp[];
}

function Footer(
  { sections = [], contacts = [], socialMedias = [], banner = [], stamp = [] }:
    Props,
) {
  return (
    <footer class="w-full flex flex-col items-center divide-y divide-primary-content">
      <div class="hidden sm:flex justify-center max-w-[1180px]">
        <FooterContainer>
          <Banner banner={banner} />
        </FooterContainer>
      </div>

      <div class="w-full bg-gray-light">
        <div class="container w-full flex flex-col divide-y divide-primary-content">
          <FooterContainer>
            {/* Desktop view */}
            <div class="flex flex-col lg:flex-none items-center justify-center w-full gap-12 lg:gap-0">
              <ul class="hidden sm:flex flex-col lg:flex-row justify-between gap-20">
                <div class="flex flex-row justify-between gap-20">
                  {sections.map((section) => (
                    <li>
                      <div>
                        <span class="font-medium text-lg text-red-medium">
                          {section.label}
                        </span>

                        <ul
                          class={`flex ${
                            isIcon(section.children[0])
                              ? "flex-row"
                              : "flex-col"
                          } gap-2 pt-2 flex-wrap`}
                        >
                          {section.children.map((item) => (
                            <li>
                              <SectionItem item={item} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}

                  {contacts && (
                    <ul class="hidden sm:flex flex-col gap-2">
                      {contacts?.map((contact) => (
                        <li>
                          <div>
                            <span class="font-medium text-lg text-red-medium">
                              {contact.label}
                            </span>

                            <ul class="flex flex-col gap-2 pt-2 flex-wrap">
                              {contact.children.map((item) => (
                                <li>
                                  <SectionItem item={item} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div class="flex flex-col gap-12 lg:items-end lg:border-l lg:border-l-dark-gray lg:pl-12 h-full">
                  <Newsletter />
                  <SocialMedias socialMedias={socialMedias} />
                </div>
              </ul>

              <div class="hidden sm:flex mt-[30px] xl:w-full xl:max-w-6xl">
                <Stamps stamps={stamp} />
              </div>
            </div>

            {/* Mobile view */}
            <div class="flex flex-col sm:hidden items-center justify-center py-6 w-full">
              <div class="border-b border-b-dark-gray w-[95%] pb-8 px-6">
                <SocialMedias socialMedias={socialMedias} />
              </div>
              <div class="py-12 px-6">
                <Newsletter />
              </div>
              <ul class="flex flex-col items-center justify-center sm:hidden gap-4 w-full">
                {sections.map((section) => (
                  <li class="border-t border-t-dark-gray w-full flex items-center justify-center pt-6 pb-6 first:pb-0">
                    <span class="text-black w-full">
                      <details class="w-full">
                        <summary class="text-sm flex items-center justify-center text-center cursor-pointer w-full">
                          <span class="flex items-center justify-center flex-1">
                            {section.label}
                          </span>
                          <figure id="figure" class="pr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 w-4 ml-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </figure>
                        </summary>

                        <ul class="flex flex-col gap-2 px-2 mt-6 bg-white w-full transition-transform duration-300 transform">
                          {section.children.map((item) => (
                            <li class="p-2 border-b border-b-gainsboro w-[95%]">
                              <SectionItem item={item} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </span>
                  </li>
                ))}
              </ul>
              <ul class="flex flex-col items-center justify-center sm:hidden gap-4 w-full">
                {contacts.map((contact) => (
                  <li class="border-t border-t-dark-gray w-full flex items-center justify-center pt-6 pb-6 first:pb-0">
                    <span class="text-black w-full">
                      <details class="w-full">
                        <summary class="text-sm flex items-center justify-center text-center cursor-pointer w-full">
                          <span class="flex items-center justify-center flex-1">
                            {contact.label}
                          </span>
                          <figure class="pr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 w-4 ml-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </figure>
                        </summary>

                        <ul class="absolute flex flex-col gap-2 px-2 mt-4 bg-white w-full transition-transform duration-300 transform">
                          {contact.children.map((item) => (
                            <li class="p-2 border-b border-b-gainsboro w-[95%]">
                              <SectionItem item={item} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </span>
                  </li>
                ))}
              </ul>
              <div class="flex justify-center w-full">
                <FooterContainer>
                  <Banner banner={banner} />
                </FooterContainer>
              </div>
              <div class="flex mt-[30px]">
                <Stamps stamps={stamp} />
              </div>
            </div>
          </FooterContainer>

          <div class="flex items-center justify-center w-full">
            <div class="flex items-center justify-center border-t border-dark-gray pb-2 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl">
              <span class="text-center text-[10px] py-4 lg:py-10">
                Preços exclusivos para compras através da loja virtual. Entrega
                do pedido condicionada a disponibilidade em nosso estoque. Todos
                os direitos reservados 1996-2020 Ginga Comércio de Móveis e
                Decorações LTDA - CNPJ: 14.747.549/0001-59 - Insc. est:
                87.290.778 - Avenida Henrique Valadares, 23 Sala 1204 - Parte -
                Centro, Rio de Janeiro - RJ 20231-030
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
