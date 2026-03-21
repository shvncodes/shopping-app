import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useCoupons } from "../../context/CouponContext.jsx";
import styles from "./CouponModal.module.css";

export function CouponModal({
  isShow,
  id = "",
  code = "",
  description = "",
  discountType = "percentage",
  discount = 0,
  expiryDate = "",
  onClose,
}) {
  if (!isShow) return null;

  const isEdit = Boolean(id);

  const { addCoupon, updatedCoupons } = useCoupons();

  const [couponCode, setCouponCode] = useState(code);
  const [couponDescription, setCouponDescription] = useState(description);
  const [couponDiscountType, setCouponDiscountType] = useState(discountType);
  const [couponDiscount, setCouponDiscount] = useState(discount);
  const [couponExpiryDate, setCouponExpiryDate] = useState(expiryDate);
  const [errorMessage, setErrorMessage] = useState({
    code: "",
    description: "",
    discountType: "",
    discount: "",
    expiryDate: "",
  });

  const validateCouponDetails = () => {
    if (!couponCode) {
      setErrorMessage({ ...errorMessage, code: "Please enter coupon code" });
      return false;
    }
    if (!couponDescription) {
      setErrorMessage({
        ...errorMessage,
        description: "Please enter coupon description",
      });
      return false;
    }
    if (!couponDiscountType) {
      setErrorMessage({
        ...errorMessage,
        discountType: "Please select discount type",
      });
      return false;
    }
    if (!couponDiscount || couponDiscount < 0) {
      setErrorMessage({
        ...errorMessage,
        discount: "Please enter coupon discount",
      });
      return false;
    }
    if (
      couponDiscountType === "percentage" &&
      (couponDiscount < 0 || couponDiscount > 100)
    ) {
      setErrorMessage({
        ...errorMessage,
        discount: "Please enter a valid discount percentage",
      });
      return false;
    }
    if (!couponExpiryDate) {
      setErrorMessage({
        ...errorMessage,
        expiryDate: "Please enter coupon expiry date",
      });
      return false;
    }

    return true;
  };

  const saveCoupon = () => {
    const coupon = {
      code: couponCode.trim(),
      description: couponDescription.trim(),
      discountType: couponDiscountType.trim(),
      discount: couponDiscount,
      expiryDate: couponExpiryDate,
    };
    addCoupon(coupon);
  };

  const updateCoupon = () => {
    const coupon = {
      id,
      code: couponCode.trim(),
      description: couponDescription.trim(),
      discountType: couponDiscountType.trim(),
      discount: couponDiscount,
      expiryDate: couponExpiryDate,
    };
    updatedCoupons(coupon);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isEdit ? "Edit" : "Add"} Coupon
          </h2>
          <Button variant="danger" size="small" onClick={onClose}>
            X
          </Button>
        </div>
        <div className={styles.modalBody}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const isValid = validateCouponDetails();
              if (!isValid) return;
              if (!isEdit) saveCoupon();
              else updateCoupon();
              onClose();
            }}
            ß
          >
            <label htmlFor="code" className={styles.codeLabel}>
              Code
              <input
                type="text"
                id="code"
                name="code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setErrorMessage({ ...errorMessage, code: "" });
                }}
              />
            </label>
            <label htmlFor="description" className={styles.descriptionLabel}>
              Description
              <input
                type="text"
                id="description"
                name="description"
                value={couponDescription}
                onChange={(e) => {
                  setCouponDescription(e.target.value);
                  setErrorMessage({ ...errorMessage, description: "" });
                }}
              />
            </label>
            <label htmlFor="discountType" className={styles.discountTypeLabel}>
              Discount Type
              <select
                id="discountType"
                name="discountType"
                value={couponDiscountType}
                onChange={(e) => {
                  setCouponDiscountType(e.target.value);
                  setErrorMessage({ ...errorMessage, discountType: "" });
                }}
              >
                <option
                  value="percentage"
                  checked={couponDiscountType === "percentage"}
                >
                  Percentage
                </option>
                <option value="fixed" checked={couponDiscountType === "fixed"}>
                  Fixed
                </option>
              </select>
            </label>
            {couponDiscountType === "percentage" ? (
              <label
                htmlFor="percentageDiscount"
                className={styles.percentageDiscountLabel}
              >
                Discount
                <input
                  type="number"
                  id="percentageDiscount"
                  name="percentageDiscount"
                  value={couponDiscount}
                  onChange={(e) => {
                    setCouponDiscount(e.target.value);
                    setErrorMessage({ ...errorMessage, discount: "" });
                  }}
                />
              </label>
            ) : (
              <label
                htmlFor="fixedDiscount"
                className={styles.fixedDiscountLabel}
              >
                Discount
                <input
                  type="number"
                  id="fixedDiscount"
                  name="fixedDiscount"
                  value={couponDiscount}
                  onChange={(e) => {
                    setCouponDiscount(e.target.value);
                    setErrorMessage({ ...errorMessage, discount: "" });
                  }}
                />
              </label>
            )}
            <label htmlFor="expiryDate" className={styles.expiryDateLabel}>
              Expiry Date
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={couponExpiryDate}
                onChange={(e) => {
                  setCouponExpiryDate(e.target.value);
                  setErrorMessage({ ...errorMessage, expiryDate: "" });
                }}
              />
            </label>
            <Button type="submit" fullWidth={true}>
              {isEdit ? "Update" : "Add"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
