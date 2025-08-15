<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { z } from "zod";

const formSchema = z
  .object({
    rentType: z.enum(["전세", "월세"]),
    deposit_hundred_million: z
      .string()

      .regex(/^[0-9]*$/)
      .refine((val) => Number(val) >= 0 && Number(val) <= 999),
    deposit_ten_million: z
      .string()

      .regex(/^[0-9]?$/)
      .refine((val) => Number(val) >= 0 && Number(val) <= 9),
    deposit_million: z
      .string()

      .regex(/^[0-9]{0,3}$/)
      .refine((val) => Number(val) >= 0 && Number(val) <= 999),
    monthlyRent_hundred: z
      .string()

      .regex(/^[0-9]*$/)
      .refine((val) => Number(val) >= 0),
    monthlyRent_ten_thousand: z
      .string()

      .regex(/^[0-9]{0,2}$/)
      .refine((val) => Number(val) >= 0 && Number(val) <= 99),
    detailed_address_dong: z.string().min(1),
    detailed_address_ho: z.string().min(1),
  })
  .refine((data) => {
    console.log(data);
    if (
      data.deposit_hundred_million.trim().length > 0 &&
      data.deposit_ten_million.trim().length > 0 &&
      data.deposit_million.trim().length > 0
    ) {
      if (data.rentType === "월세") {
        return (
          data.monthlyRent_hundred.trim().length > 0 &&
          data.monthlyRent_ten_thousand.trim().length > 0
        );
      }

      if (data.rentType === "전세") {
        return true;
      }
    }

    return false;
  });

const form = useForm({
  defaultValues: {
    rentType: "전세",
    deposit_hundred_million: "",
    deposit_ten_million: "",
    deposit_million: "",
    monthlyRent_hundred: "",
    monthlyRent_ten_thousand: "",
    detailed_address_dong: "",
    detailed_address_ho: "",
  },
  validators: {
    onChange: formSchema,
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    console.log("Form submitted:", value);

    const totalDeposit =
      (Number(value.deposit_hundred_million) || 0) * 1_0000_0000 +
      (Number(value.deposit_ten_million) || 0) * 1000_0000 +
      (Number(value.deposit_million) || 0) * 100_0000;

    const totalMonthlyRent =
      (Number(value.monthlyRent_hundred) || 0) * 1000000 +
      (Number(value.monthlyRent_ten_thousand) || 0) * 10000;

    alert(
      `제출 완료!\n보증금: ${totalDeposit.toLocaleString()}원\n월세: ${totalMonthlyRent.toLocaleString()}원`
    );
  },
});
</script>

<template>
  <form
    class="flex flex-col gap-[40px] py-[20px]"
    @submit="
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }
    "
  >
    <!-- 1. 전/월세 선택 -->
    <div>
      <form.Field name="rentType">
        <template #default="{ field }">
          <label :for="field.name" class="text-[26px] font-[400] text-foreground">
            1. 전/월세 선택
          </label>

          <div class="mt-4 flex items-center gap-[30px]">
            <button
              type="button"
              :class="[
                'rounded-[10px] border border-primary px-[100px] py-[30px] text-center text-[26px] font-[400] text-primary transition-colors',
                field.state.value === '전세' ? 'border-2 bg-secondary font-[600]' : 'border-1',
              ]"
              @click="field.handleChange('전세')"
            >
              전세
            </button>
            <button
              type="button"
              :class="[
                'rounded-[10px] border border-primary px-[100px] py-[30px] text-center text-[26px] font-[400] text-primary transition-colors',
                field.state.value === '월세' ? 'border-2 bg-secondary font-[600]' : 'border-1',
              ]"
              @click="field.handleChange('월세')"
            >
              월세
            </button>
          </div>
        </template>
      </form.Field>
    </div>

    <!-- 2. 보증금 입력 -->
    <div>
      <span class="text-[26px] font-[400] text-foreground">2. 보증금 입력</span>
      <div class="mt-4 flex items-center justify-between gap-[15px]">
        <form.Field name="deposit_hundred_million">
          <template #default="{ field }">
            <div class="flex flex-col items-center">
              <input
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                type="text"
                autocomplete="off"
                :class="[
                  'w-[100px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                  'border-gray-b4',
                ]"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                @blur="field.handleBlur"
              />
            </div>
          </template>
        </form.Field>
        <span class="mt-2 text-[26px] font-[400] text-gray-b4">억</span>

        <form.Field name="deposit_ten_million">
          <template #default="{ field }">
            <div class="flex flex-col items-center">
              <input
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                type="text"
                autocomplete="off"
                :class="[
                  'w-[100px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                  'border-gray-b4',
                ]"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                @blur="field.handleBlur"
              />
            </div>
          </template>
        </form.Field>
        <span class="mt-2 text-[26px] font-[400] text-gray-b4">천</span>

        <form.Field name="deposit_million">
          <template #default="{ field }">
            <div class="flex flex-col items-center">
              <input
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                type="text"
                autocomplete="off"
                :class="[
                  'w-[100px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                  'border-gray-b4',
                ]"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                @blur="field.handleBlur"
              />
            </div>
          </template>
        </form.Field>
        <span class="mt-2 text-[26px] font-[400] text-gray-b4">백만원</span>
      </div>
    </div>

    <!-- 3. 월세 입력 - Only show when 월세 is selected -->
    <form.Subscribe>
      <template #default="{ values }">
        <div v-if="values.rentType === '월세'">
          <span class="text-[26px] font-[400] text-foreground">3. 월세 입력</span>
          <div class="mt-4 flex items-center justify-between gap-[15px]">
            <form.Field name="monthlyRent_hundred">
              <template #default="{ field }">
                <div class="flex flex-col items-center">
                  <input
                    :id="field.name"
                    :name="field.name"
                    :value="field.state.value"
                    type="text"
                    autocomplete="off"
                    :class="[
                      'w-[200px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                      'border-gray-b4',
                    ]"
                    @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                    @blur="field.handleBlur"
                  />
                </div>
              </template>
            </form.Field>
            <span class="mt-2 text-[26px] font-[400] text-gray-b4">백</span>

            <form.Field name="monthlyRent_ten_thousand">
              <template #default="{ field }">
                <div class="flex flex-col items-center">
                  <input
                    :id="field.name"
                    :name="field.name"
                    :value="field.state.value"
                    type="text"
                    autocomplete="off"
                    :class="[
                      'w-[200px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                      'border-gray-b4',
                    ]"
                    @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                    @blur="field.handleBlur"
                  />
                </div>
              </template>
            </form.Field>
            <span class="mt-2 text-[26px] font-[400] text-gray-b4">만원</span>
          </div>
        </div>
      </template>
    </form.Subscribe>

    <!-- 4. 상세주소 입력 - Position changes based on rentType -->
    <form.Subscribe>
      <template #default="{ values }">
        <div>
          <span class="text-[26px] font-[400] text-foreground">
            {{ values.rentType === "전세" ? "3" : "4" }}. 상세주소 입력
          </span>
          <div class="mt-4 flex items-center justify-between gap-[15px]">
            <form.Field name="detailed_address_dong">
              <template #default="{ field }">
                <div class="flex flex-col items-center">
                  <input
                    :id="field.name"
                    :name="field.name"
                    :value="field.state.value"
                    type="text"
                    autocomplete="off"
                    :class="[
                      'w-[200px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                      'border-gray-b4',
                    ]"
                    @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                    @blur="field.handleBlur"
                  />
                </div>
              </template>
            </form.Field>
            <span class="mt-2 text-[26px] font-[400] text-gray-b4">동</span>

            <form.Field name="detailed_address_ho">
              <template #default="{ field }">
                <div class="flex flex-col items-center">
                  <input
                    :id="field.name"
                    :name="field.name"
                    :value="field.state.value"
                    type="text"
                    autocomplete="off"
                    :class="[
                      'w-[200px] border-b text-center text-[26px] font-[600] text-foreground outline-none',
                      'border-gray-b4',
                    ]"
                    @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                    @blur="field.handleBlur"
                  />
                </div>
              </template>
            </form.Field>
            <span class="mt-2 text-[26px] font-[400] text-gray-b4">호</span>
          </div>
        </div>
      </template>
    </form.Subscribe>

    <!-- Submit button -->
    <form.Subscribe>
      <template #default="{ canSubmit, isSubmitting }">
        <button
          type="submit"
          :disabled="!canSubmit"
          class="mt-[100px] w-full cursor-pointer rounded-[10px] bg-primary py-[30px] text-center text-[26px] font-[600] text-gray-fe transition-colors disabled:cursor-not-allowed disabled:bg-gray-b4"
        >
          {{ isSubmitting ? "제출 중..." : "제출" }}
        </button>
      </template>
    </form.Subscribe>
  </form>
</template>
