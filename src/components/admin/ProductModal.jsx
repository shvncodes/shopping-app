import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useProduct } from "../../context/ProductsContext.jsx";

export function ProductModal({ id, isShow = false, title, buttonText }) {
  if (!isShow) return null;
  const isEditMode = Boolean(id);
  const { addProduct } = useProduct();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const saveNewProduct = () => {
    addProduct({
      name: name.trim(),
      description: description.trim(),
      badge: badge.trim(),
      type: type.trim(),
      price: Number(price),
      category: category.trim(),
    });
  };

  return (
    <div>
      <div>{title}</div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isEditMode) saveNewProduct();
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Product_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="textarea"
              placeholder="Product_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product_badge"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product_type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <input
              type="number"
              placeholder="Product_price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
};
