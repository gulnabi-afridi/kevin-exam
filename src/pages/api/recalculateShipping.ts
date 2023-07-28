import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;

  const productsPriceTotal =
    cart.products?.reduce((total, p) => total + p.price, 0) ?? 0;
  const updatedShippingPrice = (productsPriceTotal * 0.5).toFixed(3);

  const updatedShippingPriceNumber: number = parseFloat(updatedShippingPrice);

  res.status(200).json({
    ...cart,
    shippingPrice: updatedShippingPriceNumber,
  } as Cart);
}
