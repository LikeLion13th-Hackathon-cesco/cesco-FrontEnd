<script setup lang="ts">
import { watch } from "vue";
import { useForm } from "@tanstack/vue-form";
import { z } from "zod";
import { useFileStore } from "~/stores/file";
import { useModalStore } from "~/stores/modal";
import PdfSubmitted from "../_modals/PdfSubmitted.vue";

const fileStore = useFileStore();
const modalStore = useModalStore();

const formSchema = z
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

const form = useForm({
  defaultValues: {
    rentType: "전세" as "전세" | "월세",
    deposit_hundred_million: "",
    deposit_ten_million: "",
    deposit_million: "",
    monthlyRent_hundred: "",
    monthlyRent_ten_thousand: "",
    detailed_address_dong: "",
    detailed_address_ho: "",
    selected_file: null as File | null,
    selected_example: "",
  },
  validators: { onChange: formSchema, onSubmit: formSchema },
  onSubmit: async ({ value }) => {
    const totalDeposit =
      (Number(value.deposit_hundred_million) || 0) * 1_0000_0000 +
      (Number(value.deposit_ten_million) || 0) * 1000_0000 +
      (Number(value.deposit_million) || 0) * 100_0000;
    const totalMonthlyRent =
      (Number(value.monthlyRent_hundred) || 0) * 1000000 +
      (Number(value.monthlyRent_ten_thousand) || 0) * 10000;

    modalStore.open("pdf-submitted");
  },
});

watch(
  () => fileStore.hasFile,
  (hasFile) => {
    if (hasFile) {
      if (fileStore.selectedFile) {
        form.setFieldValue("selected_file", fileStore.selectedFile);
        form.setFieldValue("selected_example", "");
      } else {
        form.setFieldValue("selected_file", null);
        form.setFieldValue("selected_example", String(fileStore.selectedExample));
      }
    } else {
      form.setFieldValue("selected_file", null);
      form.setFieldValue("selected_example", "");
    }
    form.validate("change");
  },
  { immediate: true }
);
</script>

<template>
  <form
    class="flex flex-col gap-[40px] py-[20px]"
    @submit="
      (e) => {
        e.preventDefault();
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

    <!-- 4. 상세주소 입력 -->
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
      <template #default="{ isValid, isPristine, isSubmitting }">
        <button
          type="submit"
          :disabled="!isValid || isPristine || isSubmitting"
          class="mt-[100px] w-full rounded-[10px] bg-primary py-[30px] text-[26px] font-[600] text-gray-fe transition-colors disabled:cursor-not-allowed disabled:bg-gray-b4"
        >
          {{ isSubmitting ? "제출 중..." : "제출" }}
        </button>
      </template>
    </form.Subscribe>
  </form>

  <!-- 모달 -->
  <PdfSubmitted />
</template>
