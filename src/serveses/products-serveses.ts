const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllproducts() {
  const respons = await fetch(`${API_URL}/products`);
  const data = await respons.json();
  return data;
}
export async function getproductsdetails(id: string) {
  const respons = await fetch(`${API_URL}/products/${id}`);
  const data = await respons.json();
  return data;
}
export async function GetSpecificBrand(id: string) {
  const respons = await fetch(`${API_URL}/products?brand=${id}`);
  const data = await respons.json();
  return data;
}
export async function GetSpecificCategory(id: string) {
  const respons = await fetch(`${API_URL}/products?category=${id}`);
  const data = await respons.json();

  return data;
}
