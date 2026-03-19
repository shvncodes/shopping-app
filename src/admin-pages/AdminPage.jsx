import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";

export function AdminPage() {
  const navigate = useNavigate();

  const handleStoreClick = () => {
    navigate("/admin/store");
  };

  const handleUserClick = () => {
    navigate("/admin/users");
  };

  const handleCouponClick = () => {
    navigate("/admin/coupons");
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleStoreClick}>
          Go to Store Page
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={handleUserClick}>
          Go to User Page
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={handleCouponClick}>
          Go to Coupon Page
        </Button>
      </div>
    </div>
  );
}
