import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useProduct } from "../../context/ProductsContext.jsx";

export function ProductModal({
  id,
  isShow = false,
  title,
  buttonText,
  name = "",
  description = "",
  badge = "",
  type = "",
  price = 0,
  category = "",
  onClose,
}) {
  if (!isShow) return null;
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
    if (!productName || !productPrice || !productCategory) return false;
    return true;
  };

  return (
    <div>
      <div>{title}</div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Validate product details
            const isValid = validateProductDetails();
            if (!isValid) {
              return;
            }
            if (!isEditMode) saveNewProduct();
            else updateProduct();
            onClose();
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Product_name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="textarea"
              placeholder="Product_description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product_badge"
              value={productBadge}
              onChange={(e) => setProductBadge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product_type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
            <input
              type="number"
              placeholder="Product_price"
              value={productPrice}
              required
              onChange={(e) => handlePrice(e.target.value)}
            />
            <select
              name="category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="skincare">Skincare</option>
              <option value="makeup">Makeup</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <Button variant="primary" type="submit">
            {buttonText}
          </Button>
        </form>
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
