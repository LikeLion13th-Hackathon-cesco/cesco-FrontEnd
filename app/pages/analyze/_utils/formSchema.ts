import z from "zod";
import { calculateDepositAmount, calculateMonthlyRentAmount } from "./calculations";

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
    monthlyRent_hundred: z
      .string()
      .regex(/^[0-9]*$/)
      .refine((val) => Number(val) <= 999),
    monthlyRent_ten_thousand: z
      .string()
      .regex(/^[0-9]{0,2}$/)
      .refine((val) => Number(val) <= 99),
    detailed_address_dong: z.string(),
    detailed_address_ho: z.string(),
    selected_file: z.union([z.instanceof(File), z.null()]),
    selected_example: z.string(),
  })
  .refine((data) => {
    const hasFile = data.selected_file;
    const hasExample = data.selected_example.length > 0;
    return hasFile || hasExample;
  })
  .refine((data) => {
    const totalDeposit = calculateDepositAmount(data);
    const totalMonthlyRent = calculateMonthlyRentAmount(data);

    // Deposit must always be greater than 0
    if (totalDeposit <= 0) {
      return false;
    }

    // If rent type is "월세", monthly rent must also be greater than 0
    if (data.rentType === "월세" && totalMonthlyRent <= 0) {
      return false;
    }

    return true;
  });
