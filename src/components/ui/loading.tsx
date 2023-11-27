import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"

export const Loading = (props: React.ComponentProps<typeof Loader2>) => (
  <Loader2 {...props} className={cn("animate-spin", props.className)} />
);
