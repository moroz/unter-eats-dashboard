import { ASSET_HOST } from "@/config";
import { Product } from "@api/interfaces";
import React from "react";
import styles from "./ProductImage.module.sass";

interface Props {
  product: Product;
}

const ProductImage: React.FC<Props> = ({ product }) => {
  const uuid = product.imageUuid;
  const base_dir = uuid && `${ASSET_HOST}/images/${uuid.slice(0, 2)}/${uuid}`;

  return (
    <picture className={styles.root}>
      {uuid ? (
        <>
          <source
            type="image/webp"
            media="(min-width: 59.25rem)"
            srcSet={`${base_dir}/thumb.webp 1x, ${base_dir}/thumb_retina.webp 2x`}
          />
          <source
            type="image/webp"
            media="(max-width: 59.1875rem)"
            srcSet={`${base_dir}/thumb_mobile.webp 1x, ${base_dir}/thumb_mobile_retina.webp 2x`}
          />
          <img src={`${base_dir}/thumb_mobile.webp`} alt="" />
        </>
      ) : null}
    </picture>
  );
};

export default ProductImage;
