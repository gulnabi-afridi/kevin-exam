import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default function handler(
  req: NextApiRequest,
  // QUESTION: Why might we prefer unknown here instead of any?
  // ANSWER: =========================> 👇👇
  // Using unknown as the type for the NextApiResponse parameter is preferred over using any because unknown provides better type safety. When a value has the type unknown, TypeScript restricts the use of that value until its type is narrowed to a more specific type. This forces developers to perform type checking before using the value, preventing unintended type-related bugs. On the other hand, any provides no type safety and allows any operations on the value without any type checking, which defeats the purpose of using TypeScript.
  // ANSWER END HERE ======================>
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const now = Date.now();

  // Generate a unique ID for the new product
  const newProductId = uuidv4();

  res.status(200).json({
    // QUESTION: What does the '...' operator do?
    // ANSWER:====================> 👇👇
    // The ... operator is called the spread operator in JavaScript and is used to spread the properties of an object or the elements of an array. In this context, the spread operator is used to create a new object that includes all the properties of the cart object. It effectively clones the cart object and ensures that the original object is not mutated.
    //  ANSWER END HERE =============================>
    ...cart,
    // QUESTION: What does the '??' operator do?
    //           What values of cart.products would cause '[]` to be used for the concat call?
    // ANSWER: =======================>  👇👇
    // The ?? operator is the nullish coalescing operator in JavaScript, and it is used to provide a default value for a variable if the variable is null or undefined. In this context, the expression cart.products ?? [] means that if cart.products is null or undefined, then an empty array [] will be used as a default value. Values of cart.products that would cause [] to be used for the concat call are null, undefined, or any falsy value. For example, if cart.products is null, the expression cart.products ?? [] will evaluate to [], and the resulting object will have an empty array for the products property. This ensures that the concat operation will always work, even if cart.products is not provided or is not an array.
    //  ANSWER END HERE ======================>

    products: (cart.products ?? []).concat({
      id: newProductId,
      name: `Product ${(Date.now() / 1000).toFixed(0)}`,
      price: now % 2 === 0 ? 56 : 65,
    }),
  } as Cart);
}
