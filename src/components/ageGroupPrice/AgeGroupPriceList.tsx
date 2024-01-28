// Shadcn Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { getNumberIntervals } from "@/utils/number";

const FormSchema = z.object({
  group: z.array(
    z.object({
      startAge: z.string(),
      endAge: z.string(),
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
          startAge: "0",
          endAge: "20",
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
    return [+item.startAge, +item.endAge];
  });

  // useEffect(() => {
  //   if (ageGroupList.length > 1) {
  //     const intervals = getNumberIntervals(ageGroupList);
  //     if (intervals.overlap.length > 0) {
  //       console.log("trigger");
  //       form.setError("group", {
  //         type: "manual",
  //         message: "年齡區間不可重疊"
  //       });
  //     }
  //   }
  // }, [ageGroupList]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);

    // if (ageGroupList.length > 1) {
    //   const intervals = getNumberIntervals(ageGroupList);
    //   if (intervals.overlap.length > 0) {
    //     console.log("trigger");
    //     form.setError("group.0.startAge", {
    //       type: "manual",
    //       message: "年齡區間不可重疊"
    //     });
    //   }
    // }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-lg w-4/5"
      >
        <ul className="space-y-8">
          {fields.map((_item, index) => {
            const isFirst = index === 0;
            const isLast = index === fields.length - 1;

            return (
              // TODO: 這裡的 key 要把 index 換掉
              <li key={index} className="space-y-5">
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
                    <div className="flex">
                      <AgeGroupSelect
                        form={form}
                        name={`group.${index}.startAge`}
                        endLimit={form.watch(`group.${index}.endAge`)}
                      />
                      <div className="w-10 text-center self-center bg-gray-200 leading-10">
                        ～
                      </div>
                      <AgeGroupSelect
                        form={form}
                        name={`group.${index}.endAge`}
                        startLimit={form.watch(`group.${index}.startAge`)}
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
            append({ startAge: "0", endAge: "20", price: "0" });
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
