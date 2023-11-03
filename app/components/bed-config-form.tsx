import { type FC, useMemo, useRef } from "react";

import type { IPluginConfig } from "~/lib/uploader/interface";
import type { FormInstance } from "~/components/form";
import Form from "~/components/form";
import { Input } from "~/components/ui/input";

interface BedConfigFormProps {
  configData: IPluginConfig[];
}

export const BedConfigForm: FC<BedConfigFormProps> = (props) => {
  const { configData } = props;
  const formRef = useRef<FormInstance>(null);

  const defaultValues = useMemo(() => {
    return configData.reduce((result: Record<string, any>, item) => {
      result[item.name] = item.default;
      return result;
    }, {});
  }, [configData]);

  const renderItem = (item: IPluginConfig) => {
    switch (item.type) {
      case "input":
        return <Input placeholder={item.message} />;
      case "password":
        return <Input type="password" placeholder={item.message} />;
      default:
        break;
    }

    return null;
  };

  return (
    <Form form={formRef} defaultValues={defaultValues}>
      {configData.map((item) => (
        <Form.Item
          key={item.name}
          name={item.name}
          label={item.alias || item.name}
          rules={{ required: item.required && "必填项不能为空" }}
        >
          {renderItem(item)}
        </Form.Item>
      ))}
    </Form>
  );
};
