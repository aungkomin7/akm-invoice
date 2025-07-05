//action

import { recordForm, recordGroup, recordTemplate } from "./selectors";
import { products } from "./states";
import Swal from "sweetalert2";

//business Logic
export const calculateTotal = () => {
  const recordCosts = recordGroup.querySelectorAll(".record-cost");
  let total = 0;
  recordCosts.forEach((recordcost) => {
    total += parseFloat(recordcost.innerText);
  });
  return total;
};

export const calculateTax = (amount, percentage = 5) => {
  return amount * (percentage / 100);
};

const updateQuantity = (rowid, quantityvalue) => {
  const currentRecordRow = recordGroup.querySelector(`#${rowid}`);
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordPrice = currentRecordRow.querySelector(".record-price");
  const recordCost = currentRecordRow.querySelector(".record-cost");
  const currentRecordQuantity = parseInt(recordQuantity.innerText);
  if (currentRecordQuantity > 1 || quantityvalue > 0) {
    recordQuantity.innerText =
      parseInt(recordQuantity.innerText) + quantityvalue;
    recordCost.innerText =
      parseFloat(recordPrice.innerText) * parseInt(recordQuantity.innerText);
  }
};

//app logic
const createRecord = ({ id, name, price }, quantity) => {
  const record = recordTemplate.content.cloneNode(true);
  const recordName = record.querySelector(".record-name");
  const recordPrice = record.querySelector(".record-price");
  const recordQuantity = record.querySelector(".record-quantity");
  const recordCost = record.querySelector(".record-cost");
  const recordRow = record.querySelector(".record-row");

  recordName.innerText = name;
  recordPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = parseFloat(price) * parseFloat(quantity);
  recordRow.id = id;
  recordRow.setAttribute("product-id", id);

  return record;
};

const addRecord = () => {
  const formData = new FormData(recordForm);
  const currentRecord = products.find(({ id }) => {
    return id == formData.get("record_select");
  });

  const existedRecordRow = recordGroup.querySelector(
    `[product-id = ${formData.get("record_select")}]`
  );

  if (existedRecordRow === null) {
    recordGroup.append(
      createRecord(currentRecord, formData.get("record_quantity"))
    );
  } else {
    Swal.fire({
      title: "Are you sure?",
      text: `Is quantity  ${formData.get("record_quantity")} add to current quantity!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateQuantity(
          currentRecord.id,
          parseInt(formData.get("record_quantity"))
        );
      }
    });
  }

  recordForm.reset();
};

const removeRecordRow = (rowid) => {
  const currentRecordRow = recordGroup.querySelector(`#${rowid}`);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      currentRecordRow.classList.add("animate__animated", "animate__fadeOut");
      currentRecordRow.addEventListener("animationend", () => {
        currentRecordRow.remove();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Delect successfully",
        });
      });
    }
  });
};

//handlers
export const recordFormHandler = (e) => {
  e.preventDefault();
  addRecord();
};

export const recordGroupHandler = (e) => {
  const currentRecordRow = e.target.closest(".record-row");
  if (e.target.classList.contains("record-row-remove-btn")) {
    removeRecordRow(currentRecordRow.id);
  } else if (e.target.classList.contains("quantity-increase-btn")) {
    updateQuantity(currentRecordRow.id, 1);
  } else if (e.target.classList.contains("quantity-decrease-btn")) {
    updateQuantity(currentRecordRow.id, -1);
  }
};
