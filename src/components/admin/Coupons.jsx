import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useCoupons } from "../../context/CouponContext.jsx";
import { CouponModal } from "./CouponModal.jsx";
import styles from "./Coupons.module.css";

export function Coupons({
  id,
  code,
  description,
  discountType,
  discount,
  expiryDate,
}) {
  const { removeCoupon } = useCoupons();

  const [isShow, setIsShow] = useState(false);

  const handleDelete = (id) => {
    removeCoupon(id);
  };

  return (
    <div className={styles.couponContainer}>
      <div className={styles.couponInfo}>
        <p className={styles.couponCode}>{code.trim()}</p>
        <p className={styles.couponDescription}>{description.trim()}</p>
        <p className={styles.couponDiscount}>{discount.trim()}</p>
        <p className={styles.couponExpiryDate}>{expiryDate}</p>
      </div>
      <div className={styles.buttons}>
        <Button variant="primary" size="small" onClick={() => setIsShow(true)}>
          Edit
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </Button>
      </div>

      <CouponModal
        isShow={isShow}
        id={id}
        code={code}
        description={description}
        discountType={discountType}
        discount={discount}
        expiryDate={expiryDate}
        onClose={() => {
          setIsShow(false);
        }}
      />
    </div>
  );
}
