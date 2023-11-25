import type { PropsWithChildren } from "react";
import React, { useMemo } from "react";
import { isNil, isUndefined } from "lodash-es";
import { useController, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import type { FormItemProps } from "./type";

const FormItem: React.FC<PropsWithChildren<FormItemProps>> = (props) => {
  const {
    name,
    children,
    defaultValue,
    rules,
    shouldUnregister,
    required,
    label,
    style,
    className,
    labelSuffix,
    noStyle,
    description,
    subTitle,
  } = props;

  // required 为 true，且 rules 为空时赋予 rules 默认值
  const lastRules = useMemo<FormItemProps["rules"]>(() => {
    return !!required && isNil(rules) ? { required: `请填写${label}` } : rules;
  }, [required, rules, label]);

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
    rules: lastRules,
    shouldUnregister,
  });

  const isRequired = !isUndefined(required)
    ? required
    : rules && !!rules?.required;

  const errorMessage = fieldState.error?.message;

  const renderChildren = () => {
    if (!React.isValidElement(children)) return children;

    // 判断是不是原生组件
    const isNative = typeof children.type === "string";
    const error = !!errorMessage;
    const restProps = error
      ? { error: isNative ? error.toString() : error }
      : null;

    return React.cloneElement(children, {
      ...restProps,
      ...children.props,
      ...field,
    });
  };

  if (noStyle) return <div>{renderChildren()}</div>;

  return (
    <div className={cn("space-y-2", className)} style={style}>
      <Label
        className={cn({
          "after:content-['*'] after:ml-0.5 after:text-red-500": isRequired,
        })}
      >
        {label}
        {labelSuffix && (
          <span className="form-label-description">{labelSuffix}</span>
        )}
      </Label>
      {subTitle && (
        <p className="text-[0.8rem] text-muted-foreground">{subTitle}</p>
      )}
      {renderChildren()}
      {description && (
        <p className="text-[0.8rem] text-muted-foreground">{description}</p>
      )}
      {errorMessage && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormItem;
