import { InputGroup, InputField, Textarea } from "@components/forms";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {}

const FormFields: React.FC<Props> = () => {
  const { register } = useFormContext();

  return (
    <>
      <InputGroup columns={2}>
        <InputField
          autoFocus
          label="Name in Polish:"
          {...register("namePl", { required: true })}
          required
        />
        <InputField label="Name in English:" {...register("nameEn")} />
      </InputGroup>
      <InputGroup columns={2}>
        <InputField
          label="Slug (URL name):"
          {...register("slug")}
          monospace
          helperText="Friendly URL used on the store website. This will be set automatically."
        />
        <InputField
          type="number"
          label="Price in PLN:"
          {...register("price", { required: true })}
          required
        />
      </InputGroup>
      <Textarea label="Description in Polish:" {...register("descriptionPl")} />
      <Textarea
        label="Description in English:"
        {...register("descriptionEn")}
      />
    </>
  );
};

export default FormFields;
