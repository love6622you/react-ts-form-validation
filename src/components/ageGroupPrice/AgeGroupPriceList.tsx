import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { getNumberIntervals } from "@/utils/number";

import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const DEFAULT_GROUP_VALUE = {
  ageGroup: ["0", "20"],
  price: "0"
};

const FormSchema = z.object({
  group: z.array(
    z.object({
      ageGroup: z.array(z.string()),
      price: z.string().min(1, {
        message: "不可以為空白"
      })
    })
  )
});

export const AgeGroupPriceList = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      group: [DEFAULT_GROUP_VALUE]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "group"
  });

  const ageGroupList = form.getValues("group").map((item) => {
    return item.ageGroup.map((age) => Number(age));
  });

  // Watch AgeGroup 為基準，檢查是否有重疊的區間
  useEffect(() => {
    const intervals = getNumberIntervals(ageGroupList);
    ageGroupList.forEach((_item, index) => {
      const hasError = form.getFieldState(`group.${index}.ageGroup.0`).error;
      // 有重疊的區間，且沒有錯誤訊息，則 setError
      if (intervals.overlap.length > 0 && !hasError) {
        form.setError(`group.${index}.ageGroup.0`, {
          type: "onChange",
          message: "年齡區間不可重疊"
        });
      }

      // 沒有重疊的區間，且有錯誤訊息，則 clearErrors
      if (intervals.overlap.length === 0 && hasError) {
        form.clearErrors(`group.${index}.ageGroup.0`);
      }
    });
  }, [ageGroupList]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data.group, null, 2)}</code>
        </pre>
      )
    });
  };

  return (
    <Form {...form}>
      <form
        className="max-w-screen-lg w-4/5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ul className="space-y-5 py-10">
          {fields.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === fields.length - 1;

            return (
              <li key={item.id} className="space-y-5">
                <div className="flex justify-between">
                  <h4>價格設定 - {index + 1}</h4>
                  {!isFirst && (
                    <button
                      className="text-orange-400"
                      onClick={() => remove(index)}
                    >
                      ✕ 移除
                    </button>
                  )}
                </div>

                <div className="flex gap-5">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm pb-1.5">年齡</p>
                    <div className="relative grid grid-cols-[1fr_40px_1fr]">
                      <AgeGroupSelect
                        form={form}
                        name={{
                          startAge: `group.${index}.ageGroup.0`,
                          endAge: `group.${index}.ageGroup.1`
                        }}
                        startLimit={form.watch(`group.${index}.ageGroup.0`)}
                        endLimit={form.watch(`group.${index}.ageGroup.1`)}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-400 text-sm pb-1.5">
                      入住費用(每人每晚)
                    </p>
                    <PriceInput form={form} name={`group.${index}.price`} />
                  </div>
                </div>

                {!isLast && <Separator />}
              </li>
            );
          })}
        </ul>

        <div className="flex justify-between">
          <Button
            className={cn("text-teal-400 hover:no-underline")}
            variant="link"
            onClick={() => append(DEFAULT_GROUP_VALUE)}
            type="button"
          >
            ✚ 新增價格設定
          </Button>
          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgeGroupPriceList;
