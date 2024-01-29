import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

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

type AgeGroupSelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: { startAge: string; endAge: string };
  startLimit: string;
  endLimit: string;
};

const AgeGroupSelect = ({
  form,
  name,
  startLimit,
  endLimit
}: AgeGroupSelectProps) => {
  const checkedDisabled = (value: string, index: number) => {
    const { startAge, endAge } = name;
    if (startAge === value && index > Number(endLimit)) {
      return true;
    }
    if (endAge === value && index < Number(startLimit)) {
      return true;
    }
    return false;
  };

  const renderAgeSelect = (
    field: ControllerRenderProps<FieldValues, string>
  ) => (
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
            disabled={checkedDisabled(field.name, index)}
          >
            {String(index)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <>
      <FormField
        control={form.control}
        name={name.startAge}
        render={({ field }) => (
          <FormItem>
            {renderAgeSelect(field)}
            <FormMessage
              className={cn(
                "absolute w-full bg-orange-100 py-1.5 px-2.5 rounded-sm"
              )}
            />
          </FormItem>
        )}
      />

      <div className="w-10 text-center h-min bg-gray-200 leading-10 text-sm">
        ～
      </div>

      <FormField
        control={form.control}
        name={name.endAge}
        render={({ field }) => <FormItem>{renderAgeSelect(field)}</FormItem>}
      />
    </>
  );
};

export default AgeGroupSelect;
