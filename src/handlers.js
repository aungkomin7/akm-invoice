export const themeSwitchHandler = () => {
  document.querySelector("html").classList.toggle("dark");
  document.querySelector("body").classList.toggle("custom-container-light");
  document.querySelector("body").classList.toggle("custom-container-dark");
};

export const printBtnHandler = () => {
  print();
};
