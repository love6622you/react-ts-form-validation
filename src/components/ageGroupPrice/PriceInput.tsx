import { cn } from "@/lib/utils";
import { addComma } from "@/utils/formatter";

// Shadcn Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PriceInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
};

const PriceInput = ({ form, name }: PriceInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex bg-gray-200 rounded-md">
              <span className="self-center px-2 text-sm">TWD</span>
              <Input
                {...field}
                className="bg-white"
                placeholder="請輸入費用"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  let value = event.target.value;

                  // 過濾非數字的字元
                  value = value.replace(/[^\d.]/g, "");
                  value = addComma(value);

                  field.onChange(value);
                }}
              />
            </div>
          </FormControl>

          <FormMessage
            className={cn("bg-orange-100 py-1.5 px-2.5 rounded-sm")}
          />
          <FormDescription className={cn("text-gray-400 text-right")}>
            輸入０表示免費
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default PriceInput;
