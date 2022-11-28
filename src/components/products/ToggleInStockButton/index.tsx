import { Product } from "@api/interfaces";
import { useToggleProductAvailabilityMutation } from "@api/mutations";
import { BoxesStackedButton, PikachuFaceButton } from "@components/buttons";
import React from "react";

interface Props {
  product: Product;
}

const ToggleInStockButton: React.FC<Props> = ({ product }) => {
  const [toggleAvailability, mutating] = useToggleProductAvailabilityMutation(
    product.id
  );

  if (!product.inStock) {
    return (
      <BoxesStackedButton onClick={toggleAvailability} disabled={mutating}>
        Mark as in stock
      </BoxesStackedButton>
    );
  }

  return (
    <PikachuFaceButton onClick={toggleAvailability} disabled={mutating}>
      Sold out
    </PikachuFaceButton>
  );
};

export default ToggleInStockButton;
