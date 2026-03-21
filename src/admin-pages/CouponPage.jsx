import { useState } from "react";
import { Button } from "../components/ui/Button.jsx";
import { useCoupons } from "../context/CouponContext.jsx";
import { Coupons } from "../components/admin/Coupons.jsx";
import { CouponModal } from "../components/admin/CouponModal.jsx";
import styles from "./CouponPage.module.css";

export function CouponPage() {
  const { coupons } = useCoupons();

  const [isShow, setIsShow] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Coupons</h1>
          <Button
            variant="primary"
            onClick={() => {
              setIsShow(true);
            }}
          >
            Add New Coupon
          </Button>
        </div>
        <div className={styles.coupons}>
          {coupons.map((coupon) => {
            return (
              <Coupons
                key={coupon.id}
                id={coupon.id}
                code={coupon.code}
                description={coupon.description}
                discountType={coupon.discountType}
                discount={coupon.discount}
                expiryDate={coupon.expiryDate}
              />
            );
          })}
        </div>
      </div>

      <CouponModal
        isShow={isShow}
        onClose={() => {
          setIsShow(false);
        }}
      />
    </div>
  );
}
