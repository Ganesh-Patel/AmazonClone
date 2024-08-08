export async function convertToINR(amount, currency) {
  const apiEndpoint = `https://api.exchangerate-api.com/v4/latest/${currency}`;
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const conversionRate = data.rates.INR;
    const convertedAmount = amount * conversionRate;
    return convertedAmount.toFixed(2); 
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return amount.toFixed(2);
  }
}

export const formatCurrency = async (amount) => {
  try {
    const inrAmount = await convertToINR(amount, 'USD'); 
    return `${inrAmount}`;
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `${amount.toFixed(2)}`; 
  }
};
