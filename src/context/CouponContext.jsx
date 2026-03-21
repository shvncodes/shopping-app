import { createContext, useContext, useState, useEffect } from "react";
import {
  loadCoupons,
  saveCoupon,
  updateCoupon,
  deleteCoupon,
} from "../data/mockApi";

const CouponContext = createContext(null);

export function CouponProvider({ children }) {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    setCoupons(loadCoupons());
  }, []);

  const addCoupon = (coupon) => {
    const couponId =
      coupon.code.toLocaleLowerCase().trim().split(" ").join("-") +
      "-" +
      String(Date.now());

    const newCoupon = {
      id: couponId,
      code: coupon.code.trim(),
      description: coupon.description.trim(),
      discountType: coupon.discountType.trim(),
      discount: coupon.discount,
      expiryDate: coupon.expiryDate,
    };

    saveCoupon(newCoupon);

    setCoupons((prev) => {
      return [newCoupon, ...prev];
    });
  };

  const updatedCoupons = (coupon) => {
    const updatedCoupon = {
      id: coupon.id,
      code: coupon.code.trim(),
      description: coupon.description.trim(),
      discountType: coupon.discountType.trim(),
      discount: coupon.discount,
      expiryDate: coupon.expiryDate,
    };

    updateCoupon(updatedCoupon);

    setCoupons((prev) => {
      return prev.map((c) => {
        if (c.id !== coupon.id) return c;
        return {
          ...c,
          ...updatedCoupon,
        };
      });
    });
  };

  const removeCoupon = (id) => {
    deleteCoupon(id);

    setItems((prev) => {
      return prev.filter((c) => {
        if (c.id !== id) return true;
      });
    });
  };

  const value = {
    coupons,
    addCoupon,
    updatedCoupons,
    removeCoupon,
  };

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
}

export function useCoupons() {
  const cntx = useContext(CouponContext);
  if (!cntx) {
    throw new Error("useCoupons must be declared inside the CartProvider");
  }
  return cntx;
}
