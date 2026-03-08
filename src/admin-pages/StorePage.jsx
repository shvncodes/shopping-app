import { Button } from "../components/ui/Button.jsx";
import { useState } from "react";
import { useProduct } from "../context/ProductsContext.jsx";
import { ProductItem } from "../components/admin/ProductItem.jsx";
import { ProductModal } from "../components/admin/ProductModal.jsx";

export function StorePage() {
  const { items } = useProduct();
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <div>
        <h1>Store Page</h1>
        <Button
          variant="secondary"
          size="small"
          onClick={() => {
            setIsShow(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div>
        {items.map((item) => {
          return (
            <ProductItem
              key={item.id}
              name={item.name}
              description={item.description}
              badge={item.badge}
              type={item.type}
              price={item.price}
              category={item.category}
            />
          );
        })}
      </div>

      <ProductModal isShow={isShow} title="Add New Product" buttonText="Save" />
    </div>
  );
}
