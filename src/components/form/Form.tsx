import { useImperativeHandle, useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { useMemoizedFn } from "ahooks";
import { noop } from "lodash-es";

import { cn } from "@/lib/utils";
import { FormContext } from "./FormContext";
import type { FormProps } from "./type";

const Form = <V extends FieldValues>(props: FormProps<V>) => {
  const {
    children,
    showValidateMessage = true,
    layout,
    colon,
    style,
    form,
    mode = "onChange",
    onChange = noop,
    className,
    ...formProps
  } = props;
  const memoizeChange = useMemoizedFn(onChange);
  const methods = useForm<V>({ mode, ...formProps });
  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      memoizeChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, memoizeChange]);

  useImperativeHandle(form, () => methods);

  return (
    <FormProvider<V> {...methods}>
      <FormContext.Provider value={{ showValidateMessage, layout, colon }}>
        <div style={style} className={cn("space-y-8", className)}>{children}</div>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default Form;
