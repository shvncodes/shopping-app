import { PropTypes } from "prop-types";
import { Button } from "../ui/Button.jsx";
import { useProduct } from "../../context/ProductsContext.jsx";

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
        <Button variant="secondary" size="small">
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </div>
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
