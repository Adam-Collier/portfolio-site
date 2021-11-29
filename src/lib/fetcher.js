export const fetcher = async (...args) => {
  const response = await fetch(...args);
  return response.json();
};