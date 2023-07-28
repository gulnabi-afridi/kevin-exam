import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;

  const productsPriceTotal =
    cart.products?.reduce((total, p) => total + p.price, 0) ?? 0;
  const updatedTaxes = (
    (cart?.shippingPrice ?? 0) +
    productsPriceTotal * 0.06
  ).toFixed(2);

  const updatedTaxesNumber: number = parseFloat(updatedTaxes);

  res.status(200).json({
    ...cart,
    taxes: updatedTaxesNumber,
  } as Cart);
}
