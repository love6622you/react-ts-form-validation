// Shadcn Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { getNumberIntervals } from "@/utils/number";

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
      group: [
        {
          ageGroup: ["0", "20"],
          price: "0"
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "group"
  });

  const ageGroupList = form.getValues("group").map((item) => {
    return item.ageGroup.map((age) => Number(age));
  });

  const checkedOverlap = () => {
    console.log("trigger?");
    const intervals = getNumberIntervals(ageGroupList);
    if (intervals.overlap.length > 0) {
      ageGroupList.forEach((_item, index) => {
        form.setError(`group.${index}.ageGroup.0`, {
          type: "onChange",
          message: "年齡區間不可重疊"
        });
      });
    } else {
      form.trigger();
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="max-w-screen-lg w-4/5"
        onChange={() => {
          checkedOverlap();
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ul className="space-y-5 py-10">
          {fields.map((_item, index) => {
            const isFirst = index === 0;
            const isLast = index === fields.length - 1;

            return (
              <li key={`group_${index}`} className="space-y-5">
                <div className="flex justify-between">
                  <h4>價格設定 - {index + 1}</h4>
                  {!isFirst && (
                    <button
                      className="text-orange-400"
                      onClick={() => {
                        remove(index);
                        form.trigger();
                      }}
                    >
                      ✕ 移除
                    </button>
                  )}
                </div>

                <div className="flex gap-5">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm pb-1.5">年齡</p>
                    <div className="grid grid-cols-[1fr_40px_1fr]">
                      <AgeGroupSelect
                        form={form}
                        name={`group.${index}.ageGroup.0`}
                        endLimit={form.watch(`group.${index}.ageGroup.1`)}
                      />
                      <div className="w-10 text-center h-min bg-gray-200 leading-10">
                        ～
                      </div>
                      <AgeGroupSelect
                        form={form}
                        name={`group.${index}.ageGroup.1`}
                        startLimit={form.watch(`group.${index}.ageGroup.0`)}
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

        <Button type="submit">Submit</Button>
        <Button
          className={cn("text-teal-400 hover:no-underline")}
          variant="link"
          onClick={() => {
            append({ ageGroup: ["0", "20"], price: "0" });
            form.trigger();
          }}
          type="button"
        >
          ✚ 新增價格設定
        </Button>
      </form>
    </Form>
  );
};

export default AgeGroupPriceList;
