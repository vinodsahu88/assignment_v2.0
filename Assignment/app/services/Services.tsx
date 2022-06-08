const Base_URL = 'https://assignment-vinod-sahu.herokuapp.com/';
const Invoice = Base_URL + 'invoice';

export const getInvoice = async () => {
  try {
    const response = await fetch(Invoice);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
