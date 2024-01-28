// Shadcn Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-lg w-4/5 space-y-6"
      >
        <ul className="space-y-8">
          {fields.map((item, index) => {
            return (
              <li key={index} className="flex gap-5">
                {index !== 0 && (
                  <button className='first:hidden' onClick={() => remove(index)}>Delete {index + 1}</button>
                )}

                <div className="flex-1">
                  <p className="text-gray-400 text-sm pb-1.5">年齡</p>
                  <div className="flex">
                    <AgeGroupSelect
                      form={form}
                      name={`group.${index}.startAge`}
                    />
                    <div className="w-10 text-center self-center bg-gray-200 leading-10">
                      ～
                    </div>
                    <AgeGroupSelect
                      form={form}
                      name={`group.${index}.endAge`}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-gray-400 text-sm pb-1.5">
                    入住費用(每人每晚)
                  </p>
                  <PriceInput form={form} name={`group.${index}.price`} />
                </div>
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
