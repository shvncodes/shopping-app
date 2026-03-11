import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { useProduct } from "../context/ProductsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { ProductItem } from "../components/admin/ProductItem.jsx";
import { ProductModal } from "../components/admin/ProductModal.jsx";

export function StorePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items } = useProduct();

  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (user.email !== "admin@gmail.com") {
      navigate("/");
      return;
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    // TODO: Improve loading state
    return <div>Loading...</div>;
  }

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
              id={item.id}
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

      <ProductModal
        isShow={isShow}
        title="Add New Product"
        buttonText="Save"
        onClose={() => {
          setIsShow(false);
        }}
      />
    </div>
  );
}
