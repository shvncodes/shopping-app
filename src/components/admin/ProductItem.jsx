import { PropTypes } from "prop-types";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useProduct } from "../../context/ProductsContext.jsx";
import { ProductModal } from "./ProductModal.jsx";

export function ProductItem({
  id,
  name,
  description,
  badge,
  type,
  price,
  category,
}) {
  const { removeProduct } = useProduct();
  const [isShow, setIsShow] = useState(false);

  const handleDelete = (id) => {
    removeProduct(id);
  };

  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{badge}</p>
        <p>{type}</p>
        <p>{price}</p>
        <p>{category}</p>
      </div>
      <div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => {
            setIsShow(true);
          }}
        >
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </div>

      <ProductModal
        isShow={isShow}
        title="Edit Product"
        buttonText="Update"
        id={id}
        name={name}
        description={description}
        badge={badge}
        type={type}
        price={price}
        category={category}
        onClose={() => {
          setIsShow(false);
        }}
      />
    </div>
  );
}

ProductItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
};
