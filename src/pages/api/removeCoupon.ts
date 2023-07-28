import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;

  const updatedCoupons = cart.coupons ? cart.coupons.slice(0, -1) : [];

  //   console.log(updatedCoupons.length);

  // Return the updatedCard array in the response
  res.status(200).json({
    ...cart,
    coupons: updatedCoupons,
  } as Cart);
}
