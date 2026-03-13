import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useProduct } from "../../context/ProductsContext.jsx";
import styles from "./ProductModal.module.css";

export function ProductModal({
  id,
  isShow = false,
  title,
  buttonText,
  name = "",
  description = "",
  badge = "New",
  type = "New Arrival",
  price = 0,
  category = "All",
  onClose,
}) {
  if (!isShow) return null;

  const productBadges = [
    "New",
    "Best Seller",
    "Trending",
    "Popular",
    "Sale",
    "20% OFF",
    "Limited Stock",
    "Only Few Left",
    "Free Shipping",
    "Recommended",
    "Top Rated",
    "Exclusive",
    "Premium",
    "Eco Friendly",
    "Bundle Deal",
  ];

  const productTypes = [
    "New Arrival",
    "Best Seller",
    "Trending",
    "Popular",
    "Featured",
    "Recommended",
    "Limited Stock",
    "Sale",
    "Exclusive",
    "Top Rated",
  ];

  const productCategories = [
    "All",
    "Accessories",
    "Makeup",
    "Skincare",
    "Clothing",
    "Footwear",
  ];

  const isEditMode = Boolean(id);
  const { addProduct, updateProducts } = useProduct();

  const [productName, setProductName] = useState(name);
  const [productDescription, setProductDescription] = useState(description);
  const [productBadge, setProductBadge] = useState(badge);
  const [productType, setProductType] = useState(type);
  const [productPrice, setProductPrice] = useState(price);
  const [productCategory, setProductCategory] = useState(category);

  const saveNewProduct = () => {
    addProduct({
      name: productName.trim(),
      description: productDescription.trim(),
      badge: productBadge.trim(),
      type: productType.trim(),
      price: Number(productPrice),
      category: productCategory.trim(),
    });
    setProductName("");
    setProductDescription("");
    setProductBadge("");
    setProductType("");
    setProductPrice(0);
    setProductCategory("");
  };

  const updateProduct = () => {
    updateProducts({
      id,
      name: productName.trim(),
      description: productDescription.trim(),
      badge: productBadge.trim(),
      type: productType.trim(),
      price: Number(productPrice),
      category: productCategory.trim(),
    });
  };

  const handlePrice = (value) => {
    value < 0 ? setProductPrice(0) : setProductPrice(Number(value));
  };

  const validateProductDetails = () => {
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategory ||
      !productBadge ||
      !productType
    ) {
      alert("Please fill in all fields.");
      return false;
    }

    return true;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const isValid = validateProductDetails();
              if (!isValid) {
                return;
              }
              if (!isEditMode) saveNewProduct();
              else updateProduct();
              onClose();
            }}
          >
            <label htmlFor="name" className={styles.nameLabel}>
              Name
              <input
                className={styles.name}
                id="name"
                label="Name"
                type="text"
                placeholder="Product_name"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>
            <label htmlFor="description" className={styles.descriptionLabel}>
              Description
              <input
                className={styles.description}
                id="description"
                label="Description"
                type="textarea"
                placeholder="Product_description"
                required
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </label>
            <label htmlFor="badge" className={styles.badgeLabel}>
              Badge
              <select
                className={styles.badge}
                id="badge"
                label="Badge"
                name="badge"
                required
                value={productBadge}
                onChange={(e) => setProductBadge(e.target.value)}
              >
                {productBadges.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="type" className={styles.typeLabel}>
              Type
              <select
                className={styles.type}
                id="type"
                label="Type"
                name="type"
                required
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="price" className={styles.priceLabel}>
              Price
              <input
                className={styles.price}
                id="price"
                label="Price"
                type="number"
                placeholder="Product_price"
                value={productPrice}
                required
                onChange={(e) => handlePrice(e.target.value)}
              />
            </label>
            <label htmlFor="category" className={styles.categoryLabel}>
              Category
              <select
                className={styles.category}
                id="category"
                label="Category"
                name="category"
                value={productCategory}
                required
                onChange={(e) => setProductCategory(e.target.value)}
              >
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" fullWidth={true}>
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  isNewProduct: PropTypes.bool,
  isEdit: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  onClose: PropTypes.func,
};
