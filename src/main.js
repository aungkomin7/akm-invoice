import "../node_modules/preline/dist/preline.js";
import Invoice from "./Invoice.js";
import { copyright, loader } from "./selectors.js";

const invoice = new Invoice();
invoice.init();

const loadFun = () => {
  loader.classList.add("hidden");
  app.classList.remove("hidden");
  app.classList.add("flex","flex-col");
};

setTimeout(loadFun, 0);

const date = new Date();
copyright.innerText = date.getFullYear();
