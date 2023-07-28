This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/addProduct](http://localhost:3000/api/addProduct). This endpoint can be edited in `pages/api/addProduct.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Exam

First, fix any build errors
Next, fix any bugs or runtime/console errors that you find
Please update the code so that shipping is calculated whenever a product or coupon are added
Please update the code so that taxes are recalculated whenever a product or coupon are added, but only _after_ the shipping is calculated
Please update the code so that the total cannot go below half the total cost of the products and show a message to the user
Please make any refactors or changes to the code that you think increase the clarity or usability of the code
Please add the ability to remove products and coupons
Please limit coupons to no more than two on the cart
Answer any comments starting with "QUESTION" if you have the time

## Bonus

Make the cart persistent between refreshes
Add some mock products that the user can add. Adding a product should then navigate to the cart page
Add mock coupon codes and handle invalid coupons
Add a user login page (functionality can be mocked)
Add a database to store the information (this can be hosted in the cloud, as well)

## Super bonus

Deploy to a web hosting service

## Questions

When you refresh the cart page, the cart disappears, why is this?
What is the difference between a default and a non-default export?
Could you give a broad overview of how Redux works?
When is a React component re-rendered?
When is a React component function called? Is this the same as when it's re-rendered?
