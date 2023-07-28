import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const now = Date.now();
  const newCouponId = uuidv4();

  res.status(200).json({
    ...cart,
    coupons: (cart.coupons ?? []).concat({
      id: newCouponId,
      name: `Coupon ${(Date.now() / 1000).toFixed(0)}`,
      discount: now % 2 === 0 ? 25 : 42,
    }),
  } as Cart);
}
