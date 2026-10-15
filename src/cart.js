function addToCart(cart, product, quantity) {
  const { id, name, price, stock } = product;
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным числом');
  }
  if (quantity > stock) {
    throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе');
  }
  const addedProduct = cart.find(item => item.id === id);
  if (addedProduct) {
    return cart.map(item => item.id === id ? { ...item, quantity: item.quantity + quantity } : item);
  }
  return [...cart, { id, name, price, stock, quantity }];
}

function changeQuantity(cart, id, updatedQuantity) {
  if (updatedQuantity <= 0) {
    throw new RangeError('Количество должно быть положительным числом');
  }
  const addedProduct = cart.find(item => item.id === id);
  if (addedProduct) {
    if (updatedQuantity > addedProduct.stock) {
      throw new RangeError('Нельзя указать количество больше остатка');
    }
    return cart.map(item => item.id === id ? { ...item, quantity: updatedQuantity } : item);
  }
  return cart;
}

function removeFromCart(cart, id) {
  return cart.filter(item => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateOrderTotal(cart, promocode) {
  const DELIVERY = 30000;
  const FREE_DELIVERY_THRESHOLD = 50000;
  const PROMOCODE_THRESHOLD = 20000;
  const DISCOUNT = 10;

  const subtotal = calculateCartSubtotal(cart);

  const isPromoApplied = promocode === 'SAVE10' && subtotal > PROMOCODE_THRESHOLD;
  const discount = isPromoApplied ? Math.round(subtotal * (DISCOUNT / 100)) : 0;

  const delivery = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
