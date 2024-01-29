// Shadcn Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type AgeGroupSelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  startLimit?: string;
  endLimit?: string;
};

const AgeGroupSelect = ({
  form,
  name,
  startLimit,
  endLimit
}: AgeGroupSelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {Array.from({ length: 21 }).map((_, index) => (
                <SelectItem
                  key={index}
                  value={String(index)}
                  disabled={
                    index > Number(endLimit) || index < Number(startLimit)
                  }
                >
                  {String(index)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage
            className={cn("bg-orange-100 py-1.5 px-2.5 rounded-sm")}
          />
        </FormItem>
      )}
    />
  );
};

export default AgeGroupSelect;
