import { atom } from "recoil";

export const categories = atom({
  key: "categories",
  default: [],
});
export const products = atom({
  key: "products",
  default: [],
});
export const users = atom({
  key: "users",
  default: [],
});
export const subCategories = atom({
  key: "subCategories",
  default: [],
});
