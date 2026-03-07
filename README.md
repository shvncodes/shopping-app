User Case:
- Make a shopping app with no backend. For a basic minimum set of product types.
- Make components folder structure without write any code in it.
- Make a file in which we use local storage to store all data and users account (basically this will work as a backend db for our app, and we will have methods to support all type of actions)
- Make a sign in and sign up page for user to log in and create new account.
- Create a Product page, where we show all the types of products and its cetegories then Show all the product list in which it show all information related to product.
- Add features for users to add product items in wishlist and add to cart to save that product and also add feature to remove the product item from wishlist and add to cart.
- And have feature to buy that item from Buy now.
- On buy product item(s) calculate the total price and give different payment options and after choose one of these options place order.

--------

Admin Case:
- Remove the hardcoded Products, and Add support for adding new Products and only Admins can do CRUD operations on the products
- Make an Admin UI (Store UI) - /admin/store


------------
Fixes and some features:
- On click of product card, it should redirect to the product details page
- When applying filter, it should persist in the url, so on reload we can see the same page
    - We can do this with the help of store filter in the url in query params
- Add search capabilities in Products page (search based on name, category, type, badge, and description)
    - Make sure we persist this as well like other filters (in url)
- Add capabilty of sorting based on price (Low to High and High to Low)
- Enhance the UI and UX of the Header and its buttons
- Enhance the landing page of the app, it looks empty (Ask ChatGPT for an sample UI, and implement that)
- Enhance the UI and UX of the Increase/Decrease Qty (use - and +)
- Add random images from internet for products

