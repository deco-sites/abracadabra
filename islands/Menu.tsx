import { useState } from "preact/hooks";

export interface NavSubItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export interface Props {
  items: NavSubItem[];
}

function MenuItem(
  { item, onItemClick }: {
    item: NavSubItem;
    onItemClick: (subitem: NavSubItem) => void;
  },
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    if (item.children && item.children.length > 0) {
      setIsOpen(!isOpen);
      onItemClick(item);
    }

    return;
  };

  return (
    <div class={`relative ${isOpen && "w-full"}`}>
      <div
        class="py-2 px-4 cursor-pointer flex justify-between"
        onClick={handleItemClick}
      >
        <a
          href={item.href}
          class={`${
            item.label === "Espaço Casa" && "text-red-base font-bold" ||
            item.label === "OFF" && "font-bold"
          }`}
        >
          {item.label}
        </a>
        {item.children && item.children.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  const [selectedSubitem, setSelectedSubitem] = useState<NavSubItem | null>(
    null,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleItemClick = (subitem: NavSubItem) => {
    setIsTransitioning(true);
    setSelectedSubitem(subitem);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSubitem(null);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <>
      <div class="flex items-center justify-start px-4 pt-1 pb-5 gap-2">
        <button
          title="Fazer Login"
          class="bg-yellow-base items-center justify-center py-2 px-3 flex uppercase text-white text-sm font-normal w-full"
        >
          Faça o seu login
        </button>

        <button
          title="Cadastrar-se"
          class="bg-yellow-base items-center justify-center py-2 px-3 flex uppercase text-white text-sm font-normal w-full"
        >
          Cadastre-se
        </button>
      </div>

      <ul class="px-4 flex-grow flex flex-col">
        {items.map((item) => (
          <li>
            <MenuItem item={item} onItemClick={handleItemClick} />
          </li>
        ))}
      </ul>

      {selectedSubitem && (
        <div
          class={`fixed w-[500px] h-full bg-white transition-transform duration-300 ${
            isTransitioning
              ? "transform translate-x-full"
              : "transform translate-x-0"
          }`}
        >
          <div class="flex flex-col h-full overflow-y-auto">
            <button
              onClick={handleBackClick}
              class="flex items-center justify-start px-4 py-2 bg-white"
            >
              <div class="flex text-sm hover:text-yellow-base transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <a
                class={`py-2 px-4 hover:text-yellow-base transition-colors ${
                  !selectedSubitem.children
                    ? "text-black"
                    : "text-yellow-base font-bold"
                }`}
              >
                {selectedSubitem.label}
              </a>
            </button>
            <a
              class="py-2 px-4 font-bold"
              href={selectedSubitem.href}
            >
              Ver tudo
            </a>
            {selectedSubitem.children?.map((subitem) => (
              <MenuItem item={subitem} onItemClick={handleItemClick} />
            ))}
          </div>
        </div>
      )}

      <ul class="flex flex-col py-3 bg-gray-base text-white px-8 gap-4">
        <li>
          <a
            class="hover:text-yellow-base transition-colors"
            href="/wishlist"
          >
            <span class="text-base">Meus pedidos</span>
          </a>
        </li>
        <li>
          <a
            class="hover:text-yellow-base transition-colors"
            href="/wishlist"
          >
            <span class="text-base">Acompanhe o seu pedido</span>
          </a>
        </li>
        <li>
          <a
            class="hover:text-yellow-base transition-colors"
            href="/institucional/nossas-lojas"
          >
            <span class="text-base">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="hover:text-yellow-base transition-colors"
            href="https://www.deco.cx"
          >
            <span class="text-base">Atendimento</span>
          </a>
        </li>
        <li>
          <a
            class="hover:text-yellow-base transition-colors"
            href="https://www.deco.cx"
          >
            <span class="text-base">Dúvidas e Ajuda</span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default Menu;
