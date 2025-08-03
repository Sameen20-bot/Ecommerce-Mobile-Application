export async function getProducts(product) {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
}

export async function getUsers(product) {
  const response = await fetch('https://fakestoreapi.com/users');
  const data = await response.json();
  return data;
}
