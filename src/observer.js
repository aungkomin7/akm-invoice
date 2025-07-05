import { recordGroup } from "./selectors";
import { calculateTax, calculateTotal } from "./record";

const observer = () => {
  const calculate = () => {
    const total = calculateTotal();
    const tax = calculateTax(total);

    recordTotal.innerText = total;
    recordTax.innerText = tax;
    recordNetTotal.innerText = total + tax;
  };

  const config = {
  childList: true,
  subtree: true,
  };

  const observer = new MutationObserver(calculate);
  observer.observe(recordGroup, config);
};

export default observer;
