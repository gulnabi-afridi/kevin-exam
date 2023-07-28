import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;

  // Create a new array with all elements except the last one
  const updatedCard = cart.products ? cart.products.slice(0, -1) : [];

  //   console.log(updatedCard.length);

  // Return the updatedCard array in the response
  res.status(200).json({
    ...cart,
    products: updatedCard,
  } as Cart);
}
