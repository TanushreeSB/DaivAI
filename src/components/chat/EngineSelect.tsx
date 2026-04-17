import { Cpu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ENGINES } from "@/lib/chat-types";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function EngineSelect({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-[200px] gap-2">
        <Cpu className="h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder="Select engine" />
      </SelectTrigger>
      <SelectContent>
        {ENGINES.map((e) => (
          <SelectItem key={e} value={e}>
            {e}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
