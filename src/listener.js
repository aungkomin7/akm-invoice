import { printBtnHandler, themeSwitchHandler } from "./handlers";
import {
  closeSidebarBtnHandler,
  manageInventoryBtnHandler,
  productFormHandler,
} from "./inventory";
import { recordFormHandler, recordGroupHandler } from "./record";
import {
  closeSidebarBtn,
  manageInventoryBtn,
  printBtn,
  productForm,
  recordGroup,
  themeSwitch,
} from "./selectors";

const listener = () => {
  themeSwitch.addEventListener("click", themeSwitchHandler);
  manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
  closeSidebarBtn.addEventListener("click", closeSidebarBtnHandler);
  productForm.addEventListener("submit", productFormHandler);
  recordForm.addEventListener("submit", recordFormHandler);
  recordGroup.addEventListener("click", recordGroupHandler);
  printBtn.addEventListener("click", printBtnHandler);
};

export default listener;
