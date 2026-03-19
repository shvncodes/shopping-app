User Case:

- Make a shopping app with no backend. For a basic minimum set of product types.
- Make components folder structure without write any code in it.
- Make a file in which we use local storage to store all data and users account (basically this will work as a backend db for our app, and we will have methods to support all type of actions)
- Make a sign in and sign up page for user to log in and create new account.
- Create a Product page, where we show all the types of products and its cetegories then Show all the product list in which it show all information related to product.
- Add features for users to add product items in wishlist and add to cart to save that product and also add feature to remove the product item from wishlist and add to cart.
- And have feature to buy that item from Buy now.
- On buy product item(s) calculate the total price and give different payment options and after choose one of these options place order.

---

Admin Case:

- Only Admins can do CRUD operations on the products
- Make an Admin UI (Store UI) - /admin/store
  - If normal user goes to /admin route, redirect them to landing page of the app
- Make a page where Admin can manage all the users - /admin/users
- Make a page where Admin can create coupons (with title, description, expiry, % or fixed value discount)

---

Fixes and some features:

- Enhance the UI and UX of the Header and its buttons
- Enhance the landing page of the app, it looks empty (Ask ChatGPT for an sample UI, and implement that)
  - Add a feature to show Popular products on the landing page
  - Also show New Arrivals products on the landing page
  - Also show Upcoming products on the landing page
- Enhance the UI and UX of the Increase/Decrease Qty (use - and +)
- Add random images from internet for products
- Enhance Payment page UI and UX, add capabilty of applying coupons
- Add a feature to allow users to add rating and reviews to products that they have purchased
- Enhance Product details page (check flipkart product details page)
  - Show reviews of each product on the product detail page
  - Show ratings
- Add a new page for user, where they can see
  - their profile information and can also Edit their profile information (like name, email, phone, address)
  - their order history
  - their reviews
