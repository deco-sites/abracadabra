import { FunctionalComponent, h } from "preact";
import { asset } from "$fresh/runtime.ts";

interface LoginProps {
  name: string;
}

const Login: FunctionalComponent<LoginProps> = (props) => {
  const { name } = props;
  console.log(name);
  return (
    <div class="group relative mr-16 group-hover:opacity-100 group-hover:visible">
      <a
        class="btn btn-square btn-ghost bg-transparent hover:bg-transparent w-full"
        href="/login"
        aria-label="Log in"
      >
        <img
          class="object-cover mr-2"
          src={asset("/icon-user.png")}
          width={20}
          height={23}
        />
        <div class="flex justify-center items-center">
          <strong class="font-normal leading-5 truncate max-w-xs overflow-hidden text-sm text-gray-base normal-case arrow-down">
            Entre ou Cadastre-se
          </strong>
        </div>
      </a>

      <div class="absolute top-45 left-0 w-48 py-5 bg-white w z-10 border-t-2 border-gray-400 opacity-0 invisible -translate-y-30 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:animate-dropdown animate-dropdown-reverse">
        <div class="before-absolute"></div>
        <ul>
          <li class="block w-full py-0 px-5 transition-all duration-200 ease-linear hover:bg-gray-lighter">
            <a
              class="h-9 bg-yellow-base flex justify-center items-center text-base text-white font-bold text-center mb-2"
              href="/account"
            >
              ENTRAR
            </a>
          </li>
          <li class="block w-full py-0 px-5 transition-all duration-200 ease-linear hover:bg-gray-lighter">
            <a
              class="h-7 flex text-gray-base text-sm font-normal"
              href="/account"
            >
              Minha Conta
            </a>
          </li>
          <li class="block w-full py-0 px-5 transition-all duration-200 ease-linear hover:bg-gray-lighter">
            <a
              class="h-7 flex text-gray-base text-sm font-normal"
              href="/account/orders"
            >
              Meus Pedidos
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
