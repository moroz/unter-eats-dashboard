import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessageWrapper";
import clsx from "clsx";
import styles from "./InputField.module.sass";

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  helperText?: string;
  horizontal?: boolean;
  monospace?: boolean;
  colSpan?: number;
}

const InputField = React.forwardRef(
  (
    {
      name,
      label,
      helperText,
      className,
      horizontal,
      monospace,
      required,
      id = name,
      colSpan,
      ...rest
    }: Props,
    ref: any
  ) => {
    const {
      formState: { errors }
    } = useFormContext();

    const labelTag = label && (
      <label
        className={clsx("label", required && styles.required, styles.label)}
        htmlFor={id}
      >
        {label}{" "}
        {required ? (
          ""
        ) : (
          <span className={styles.optionalText}>(optional)</span>
        )}
      </label>
    );

    const style = {
      "--input-col-span": String(colSpan)
    } as React.CSSProperties;

    return (
      <div
        style={style}
        className={clsx(
          "field input-field",
          styles.root,
          { "has-error": errors[name], "is-horizontal": horizontal },
          className
        )}
      >
        {labelTag}
        <input
          className={clsx(
            "input",
            errors[name] && "is-danger",
            monospace && "is-family-monospace"
          )}
          id={id}
          name={name}
          {...rest}
          ref={ref}
        />
        {helperText ? (
          <span className={clsx("help", styles.help)}>{helperText}</span>
        ) : null}
        <ErrorMessage name={name} errors={errors} />
      </div>
    );
  }
);

export default InputField;
