import z from "zod";

export const formSchema = z
  .object({
    rentType: z.literal("전세").or(z.literal("월세")),
    deposit_hundred_million: z
      .string()
      .regex(/^[0-9]*$/)
      .refine((val) => Number(val) <= 999),
    deposit_ten_million: z
      .string()
      .regex(/^[0-9]?$/)
      .refine((val) => Number(val) <= 9),
    deposit_million: z
      .string()
      .regex(/^[0-9]{0,3}$/)
      .refine((val) => Number(val) <= 999),
    monthlyRent_hundred: z.string().regex(/^[0-9]*$/),
    monthlyRent_ten_thousand: z
      .string()
      .regex(/^[0-9]{0,2}$/)
      .refine((val) => Number(val) <= 99),
    detailed_address_dong: z.string().min(1),
    detailed_address_ho: z.string().min(1),
    selected_file: z.union([z.instanceof(File), z.null()]),
    selected_example: z.string(),
  })
  .refine((data) => {
    const hasFile = data.selected_file;
    const hasExample = data.selected_example.length > 0;
    return hasFile || hasExample;
  })
  .refine((data) => {
    if (
      data.deposit_hundred_million?.length &&
      data.deposit_ten_million?.length &&
      data.deposit_million?.length
    ) {
      return (
        data.rentType === "전세" ||
        (data.monthlyRent_hundred?.length && data.monthlyRent_ten_thousand?.length)
      );
    }
    return false;
  });
