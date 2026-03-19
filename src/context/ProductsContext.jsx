import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { loadProducts, saveProduct, clearProducts } from "../data/mockApi";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadProducts());
  }, []);

  const addProduct = ({ name, description, badge, type, price, category }) => {
    // This is my product -> this-is-my-product-873265872365
    const productId =
      name.toLocaleLowerCase().trim().split(" ").join("-") +
      "-" +
      String(Date.now());
    const product = {
      id: productId,
      name: name.trim(),
      description: description.trim(),
      badge: badge.trim(),
      type: type.trim(),
      price: price,
      category: category.trim(),
    };

    saveProduct(product);
    setItems((prev) => {
      return [product, ...prev];
    });
  };

  const removeProduct = (productId) => {
    const updateItems = items.filter((item) => item.id !== productId);

    clearProducts();
    for (const updatedItem of updateItems) saveProduct(updatedItem);
    setItems(updateItems);
  };

  const updateProducts = ({
    id,
    name,
    description,
    badge,
    type,
    price,
    category,
  }) => {
    const updateProduct = items.map((item) => {
      if (item.id !== id) return item;
      return {
        ...item,
        name: name.trim(),
        description: description.trim(),
        badge: badge.trim(),
        type: type.trim(),
        price: price,
        category: category.trim(),
      };
    });

    setItems(updateProduct);

    clearProducts();
    for (const updatedItem of updateProduct) saveProduct(updatedItem);
  };

  const getProductById = useCallback(
    (id) => {
      return items.find((product) => product.id === id) || null;
    },
    [items],
  );

  const getFilteredProducts = useCallback(
    (category, searchQuery = "", priceOrder = "") => {
      const categoryFilteredProducts = items.filter((product) => {
        if (category === "All" || category === "") return true;
        return category === product.category;
      });

      const q = searchQuery.toLowerCase().trim();

      const searchFilteredProducts = categoryFilteredProducts.filter(
        (product) => {
          const name = product.name.toLocaleLowerCase();
          const desc = product.description.toLowerCase();
          const type = product.type.toLowerCase();
          const badge = product.badge.toLocaleLowerCase();
          const category = product.category.toLocaleLowerCase();
          return (
            name.includes(q) ||
            desc.includes(q) ||
            type.includes(q) ||
            badge.includes(q) ||
            category.includes(q)
          );
        },
      );

      if (priceOrder === "") return searchFilteredProducts;

      const priceOrderFilteredProduct = searchFilteredProducts.sort(
        (pro1, pro2) => {
          if (priceOrder === "desc") return pro2.price - pro1.price;
          return pro1.price - pro2.price;
        },
      );

      return priceOrderFilteredProduct;
    },
    [items],
  );

  const value = {
    items,
    addProduct,
    removeProduct,
    updateProducts,
    getProductById,
    getFilteredProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const cntx = useContext(ProductContext);
  if (!cntx) {
    throw new Error("useProduct must be used inside a ProductProvider");
  }
  return cntx;
}
