import {
  productForm,
  productGroup,
  productSelect,
  productTemplate,
} from "./selectors";
import { v4 as uuidv4 } from "uuid";
import { products } from "./states";

//action

const createProduct = (id, name, price) => {
  const product = productTemplate.content.cloneNode(true);
  const newProductName = product.querySelector(".new-product-name");
  const newProductPrice = product.querySelector(".new-product-price");
  const productCard = product.querySelector(".product-card");

  newProductName.innerText = name;
  newProductPrice.innerText = price;
  productCard.id = id;
  productCard.setAttribute("product-id", id)

  return product;
};

const addProduct = () => {
  const createId = "product" + uuidv4();
  const formData = new FormData(productForm);
  productGroup.append(
    createProduct(
      createId,
      formData.get("product_name"),
      formData.get("product_price")
    )
  );

  productSelect.append(
    new Option(
      `${formData.get("product_name")} - ${formData.get("product_price")}`,
      createId
    )
  );

  products.push({
    id: createId,
    name: formData.get("product_name"),
    price: formData.get("product_price"),
  });

  console.log(products);

  productForm.reset();
};

export const productRender = () => {
  products.forEach(({ id, name, price }) => {
    productGroup.append(createProduct(id, name, price));
    productSelect.append(new Option(`${name} - ${price}`, id));
  });
};

//handlers



export const productFormHandler = (e) => {
  e.preventDefault();
  addProduct();
};


export const manageInventoryBtnHandler = () => {
  manageInventorySidebar.classList.add("duration-500");
  manageInventorySidebar.classList.remove("-translate-y-full");
};

export const closeSidebarBtnHandler = () => {
  manageInventorySidebar.classList.add("-translate-y-full");
    
}


