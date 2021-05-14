import { state } from "../index.js";
import OptionSelector from "./OptionSelector.js";
import OrderForm from "./OrderForm.js";
import SubOptionSelector from "./SubOptionSelector.js";

export default function ProductPage() {
  const { productName, basePrice } = state;

  return `
    <h2>${productName}</h2>
    <p>${basePrice}원~</p>
    <hr />
    ${OptionSelector()}
    ${SubOptionSelector()}
    <hr />
    ${OrderForm()}
  `;
}
