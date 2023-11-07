import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react"

const Main = () => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Gallery
          </h2>
          <p className="text-sm text-muted-foreground">
            1-12 of 241 photos
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input placeholder="Search..." />
          <Button className="whitespace-nowrap">
            <Plus className="mr-1" size={18} />Add Photo
          </Button>
        </div>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="basis-1/4 space-y-4">
          <div className="py-2">
            <h2 className="mb-2 text-lg font-semibold tracking-tight">图床</h2>
          </div>
          <Button className="w-full">Confirm changes</Button>
          <Button className="w-full" variant="link">Reset to defaults</Button>
        </div>
        <div className="basis-3/4"></div>
      </div>
    </div>
  )
};

export default Main;
