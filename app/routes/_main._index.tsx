import { Plus } from "lucide-react";
import { useRef } from "react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/form";
import { CheckboxGroup } from "~/components/ui/checkbox";
import type { FormInstance } from "~/components/form";
import type { OptionItem } from "~/components/ui/checkbox";
import { DatePickerWithRange } from "~/components/ui/date-picker";
import { AlbumArtwork } from "~/components/album-artwork";
import { Pagination } from "~/components/ui/pagination";
// import { EmptyPlaceholder } from "~/components/empty-placeholder";
import type { FileInfo } from "~/interface";

export const madeForYouAlbums: Partial<FileInfo>[] = [
  {
    name: "Thinking Components",
    url: "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    url: "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    url: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    url: "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    url: "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    url: "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];

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
      <Form.Item name="beds" label="上传时间">
        <DatePickerWithRange />
      </Form.Item>
    </Form>
  );
};

const Main = () => {
  return (
    <div className="py-6 h-full flex flex-col">
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
      <div className="flex mt-4 gap-8 flex-1">
        <div className="basis-1/5 space-y-4">
          <div className="py-2">
            <PhotoFilterForm />
          </div>
          <Button className="w-full">Confirm changes</Button>
          <Button className="w-full" variant="link">
            Reset to defaults
          </Button>
        </div>
        <div className="basis-4/5 relative flex flex-col justify-between">
          {/* <EmptyPlaceholder /> */}
          <div className="flex space-x-4 pb-4">
            {madeForYouAlbums.map((item, index) => (
              <AlbumArtwork key={index} album={item as FileInfo} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Main;
