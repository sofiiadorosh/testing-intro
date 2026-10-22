const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products);
    expect(result.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selectedProducts = products.filter(({ id }) => [3, 4, 1].includes(id));
    const result = sortProductsByPrice(selectedProducts, 'asc');
    expect(result.map((p) => p.id)).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((p) => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selectedProducts = [3, 1, 4].map((id) => products.find((product) => product.id === id));
    const result = sortProductsByPrice(selectedProducts, 'desc');
    expect(result.map((p) => p.id)).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selectedProducts = [5, 2, 6].map((id) => products.find((product) => product.id === id));
    const result = sortProductsByPrice(selectedProducts, 'desc');
    expect(result.map((p) => p.id)).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalIds = selectedProducts.map((p) => p.id);

    const result = sortProductsByPrice(selectedProducts, 'asc');
    expect(result).not.toBe(selectedProducts);
    expect(selectedProducts.map((p) => p.id)).toEqual(originalIds);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalIds = selectedProducts.map((p) => p.id);
    const result = sortProductsByPrice(selectedProducts, 'desc');

    expect(result).not.toBe(selectedProducts);
    expect(selectedProducts.map((p) => p.id)).toEqual(originalIds);
  });
  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const selectedProducts = [...products];
    const originalIds = selectedProducts.map((p) => p.id);
    const result = sortProductsByPrice(selectedProducts);

    expect(result).not.toBe(selectedProducts);
    expect(selectedProducts.map((p) => p.id)).toEqual(originalIds);
  });
});
