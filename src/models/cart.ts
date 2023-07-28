import { Product } from "./product";
import { Coupon } from "./coupon";

export interface Cart {
  id: string;
  // QUESTION: What does the `?` do? Is it different than using | undefined in the type?
  // ANSWER =======================> 👇👇
  //In TypeScript, the ? symbol is used to denote optional properties in an interface. When a property is marked as optional with ?, it means that the property may or may not exist on an object of that interface type.
  // ANSWER END HERE ===================>
  products?: Product[];
  coupons?: Coupon[];
  shippingPrice?: number;
  taxes?: number;
}
