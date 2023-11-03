import { useMemo, useState } from "react";
import { get } from "lodash-es";

import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import uploader from "~/lib/uploader";
import { Label } from "~/components/ui/label";
import { BedConfigForm } from "~/components/bed-config-form";

const Beds = () => {
  const bedList = useMemo(() => uploader.getPluginConfigList(), []);
  const [activeKey, setActiveKey] = useState<string>(() =>
    get(bedList, [0, "id"])
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Beds</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <Tabs value={activeKey} onValueChange={setActiveKey}>
        <div className="space-y-2">
          <Label>Bed</Label>
          <div>
            <TabsList>
              {bedList.map((bed) => (
                <TabsTrigger value={bed.id} key={bed.id}>
                  {bed.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {bedList.map((bed) => (
          <TabsContent key={bed.id} value={bed.id}>
            <BedConfigForm configData={bed.config} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Beds;
