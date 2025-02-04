import React from 'react';
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

function Input({
  label,
  errors,
  register,
  placeholder,
  defaultValue,
  extraProperties = {},
  classNameOverride,
  type = 'text',
  pattern,
}: {
  label: string;
  errors?: FieldError | Merge<FieldErrors, FieldErrorsImpl<any>> | null;
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
  extraProperties?: { [key: string]: string | boolean };
  defaultValue?: string;
  classNameOverride?: string;
  type?: string;
  pattern?: string;
}) {
  return (
    <div className="w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        pattern={pattern}
        type={type}
        {...extraProperties}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={
          classNameOverride != null
            ? classNameOverride
            : `w-full input input-bordered input-lg ${
              errors ? 'input-error' : ''
            }`
        }
        {...register}
      />
      {errors && (
      <label className="label label-text-alt text-error">
        {errors?.message as string}
      </label>
      )}
    </div>
  );
}

export default Input;
