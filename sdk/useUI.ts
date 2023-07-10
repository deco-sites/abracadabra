/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

interface Route {
  protocol: string;
  host: string;
  url: string;
  pathname: string;
}

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchbar = signal(false);
const route = signal<Route | null>(null);
const isMobile = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchbar,
  route,
  isMobile,
};

export const useUI = () => state;
