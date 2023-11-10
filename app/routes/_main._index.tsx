import { Plus } from "lucide-react";
import { useRef } from "react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/form";
import { CheckboxGroup } from "~/components/ui/checkbox";
import type { FormInstance } from "~/components/form";
import type { OptionItem } from "~/components/ui/checkbox";

const options: OptionItem[] = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
];

const PhotoFilterForm = () => {
  const formRef = useRef<FormInstance>(null);

  return (
    <Form form={formRef}>
      <Form.Item name="beds" label="图床">
        <CheckboxGroup options={options} />
      </Form.Item>
    </Form>
  );
};

const Main = () => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Gallery</h2>
          <p className="text-sm text-muted-foreground">1-12 of 241 photos</p>
        </div>
        <div className="flex items-center gap-4">
          <Input placeholder="Search..." />
          <Button className="whitespace-nowrap">
            <Plus className="mr-1" size={18} />
            Add Photo
          </Button>
        </div>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="basis-1/4 space-y-4">
          <div className="py-2">
            <PhotoFilterForm />
          </div>
          <Button className="w-full">Confirm changes</Button>
          <Button className="w-full" variant="link">
            Reset to defaults
          </Button>
        </div>
        <div className="basis-3/4"></div>
      </div>
    </div>
  );
};

export default Main;
