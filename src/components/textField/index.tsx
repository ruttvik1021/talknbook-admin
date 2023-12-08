"use client";
import { Formik, Field, ErrorMessage } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const textAreaMax = 255;

interface ITextField {
  type: fieldTypeEnums;
  required?: boolean;
  label?: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
}

export enum fieldTypeEnums {
  TEXT = "text",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  NUMBER = "number",
}

const TextField = ({
  type,
  required,
  label,
  name,
  placeholder,
  disabled,
  maxLength,
  autoFocus,
}: ITextField) => {
  return (
    <>
      {type !== "textarea" ? (
        <>
          {label && <Label htmlFor={type}>{label}</Label>}
          {required && label && <span className="text-red-600 ml-1">*</span>}
          <Field name={name}>
            {({ field, meta }: any) => (
              <div>
                <Input
                  type={type}
                  {...field}
                  disabled={disabled}
                  maxLength={maxLength}
                  autoFocus={autoFocus}
                  autoComplete="false"
                  placeholder={placeholder}
                />
                {meta.touched && meta.error && (
                  <div className="text-sm text-red-600">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </>
      ) : (
        <>
          {label && <Label htmlFor={type}>{label}</Label>}
          {required && label && <span className="text-red-600 ml-1">*</span>}
          <Field name={name}>
            {({ field, meta }: any) => (
              <div>
                <textarea
                  {...field}
                  disabled={disabled}
                  maxLength={textAreaMax}
                  rows={5}
                  autoComplete="false"
                  placeholder={placeholder}
                />
                <p className="text-gray-400">{`${field.value?.length}/${textAreaMax}`}</p>
              </div>
            )}
          </Field>
        </>
      )}
    </>
  );
};

export default TextField;
