<script setup lang="ts">
import { watch } from "vue";
import { useForm } from "@tanstack/vue-form";
import { useFileStore } from "~/stores/file";
import { formSchema } from "../_utils/formSchema";
import type z from "zod";
import HelpCircle from "~/assets/icon/help-circle.svg";

const fileStore = useFileStore();

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
  onSubmit: (data) => {
    emit("submit", data.value);
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
        // 예시 파일 선택 시
        form.setFieldValue("selected_file", null);
        form.setFieldValue("selected_example", String(fileStore.selectedExample));

        const exampleNo = String(fileStore.selectedExample).match(/\d+/)?.[0];
        switch (exampleNo) {
          case "1":
            form.setFieldValue("detailed_address_dong", "1");
            form.setFieldValue("detailed_address_ho", "914");
            break;
          case "2":
            form.setFieldValue("detailed_address_dong", "");
            form.setFieldValue("detailed_address_ho", "202");
            break;
          case "3":
            form.setFieldValue("detailed_address_dong", "가");
            form.setFieldValue("detailed_address_ho", "204");
            break;
          default:
            break;
        }
      }
    } else {
      form.setFieldValue("selected_file", null);
      form.setFieldValue("selected_example", "");
    }
    form.validate("change");
  },
  { immediate: true }
);

const emit = defineEmits<{
  submit: [data: z.infer<typeof formSchema>];
}>();
</script>

<template>
  <form
    class="flex flex-col gap-[40px] pt-[20px]"
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
                'rounded-[10px] border border-primary px-[100px] py-[24px] text-center text-[26px] font-[400] text-primary transition-colors',
                field.state.value === '전세' ? 'border-2 bg-secondary font-[600]' : 'border-1',
              ]"
              @click="field.handleChange('전세')"
            >
              전세
            </button>
            <button
              type="button"
              :class="[
                'rounded-[10px] border border-primary px-[100px] py-[24px] text-center text-[26px] font-[400] text-primary transition-colors',
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
      <span class="inline-flex items-center gap-2 text-[26px] font-[400] text-foreground">
        2. 보증금 입력
        <Tooltip
          content="보증금은 안전지수 분석에 활용되므로, 해당 매물의 실제 금액을 정확히 입력해 주세요."
          position="top"
        >
          <HelpCircle
            class="h-[16px] w-[16px] cursor-help text-primary"
            :font-controlled="false"
            filled="false"
          />
        </Tooltip>
      </span>
      <div class="mt-4 flex items-center justify-between gap-[15px]">
        <form.Field name="deposit_hundred_million">
          <template #default="{ field }">
            <div class="flex flex-col items-center">
              <input
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                placeholder="0"
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
                placeholder="0"
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
                placeholder="0"
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
                    placeholder="0"
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
                    placeholder="0"
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
</template>
