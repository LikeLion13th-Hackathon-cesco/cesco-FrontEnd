export interface MoneyFormValues {
  deposit_hundred_million?: string;
  deposit_ten_million?: string;
  deposit_million?: string;
  monthlyRent_hundred?: string;
  monthlyRent_ten_thousand?: string;
}

// Helper function to calculate total deposit amount
export const calculateDepositAmount = (data: MoneyFormValues): number => {
  const hundredMillion = Number(data.deposit_hundred_million || 0) * 100_000_000;
  const tenMillion = Number(data.deposit_ten_million || 0) * 10_000_000;
  const million = Number(data.deposit_million || 0) * 1_000_000;
  return hundredMillion + tenMillion + million;
};

// Helper function to calculate total monthly rent amount
export const calculateMonthlyRentAmount = (data: MoneyFormValues): number => {
  const hundred = Number(data.monthlyRent_hundred || 0) * 1_000_000;
  const tenThousand = Number(data.monthlyRent_ten_thousand || 0) * 10_000;
  return hundred + tenThousand;
};
