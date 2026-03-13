import { PropTypes } from "prop-types";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useProduct } from "../../context/ProductsContext.jsx";
import { ProductModal } from "./ProductModal.jsx";
import styles from "./ProductItem.module.css";

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
    <div className={styles.productItem}>
      <div className={styles.productInfo}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.productPrice}>₹{price}</p>
        <p className={styles.productCategory}>{category}</p>
        <p className={styles.productDescription}>{description}</p>
        <p className={styles.productBadge}>{badge}</p>
        <p className={styles.productType}>{type}</p>
      </div>
      <div className={styles.productActions}>
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
