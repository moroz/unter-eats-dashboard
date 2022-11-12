import { useGetProductQuery } from "@api/queries/productQueries";
import {
  FormWrapper,
  InputField,
  InputGroup,
  Textarea
} from "@components/forms";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styles from "./EditProduct.module.sass";

interface Props {}

const EditProduct: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetProductQuery(id!);
  const methods = useForm();
  const { register, reset } = methods;

  useEffect(() => {
    if (data?.product) {
      reset(data.product);
    }
  }, [data]);

  if (loading && !data) return <LayoutLoader />;
  const product = data?.product;
  if (!product) return <NotFound />;

  const title = `Product: ${product.namePl}`;

  return (
    <Layout title={title}>
      <div className={styles.columns}>
        <FormWrapper {...methods}>
          <InputGroup columns={2}>
            <InputField
              label="Name in Polish:"
              {...register("namePl")}
              required
            />
            <InputField label="Name in English:" {...register("nameEn")} />
          </InputGroup>
          <InputGroup columns={2}>
            <InputField
              label="Slug (URL name):"
              {...register("slug")}
              monospace
              required
            />
            <InputField
              type="number"
              label="Price in PLN:"
              {...register("price")}
              required
            />
          </InputGroup>
          <Textarea
            label="Description in Polish:"
            {...register("descriptionPl")}
          />
          <Textarea
            label="Description in English:"
            {...register("descriptionEn")}
          />
        </FormWrapper>
      </div>
    </Layout>
  );
};

export default EditProduct;
