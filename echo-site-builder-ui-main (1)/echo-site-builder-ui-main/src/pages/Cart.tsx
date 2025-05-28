
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../store/CartContext';
import Banner from '../components/Banner';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ORGANICK10') {
      const discount = getCartTotal() * 0.1;
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setDiscountAmount(0);
      alert('Invalid coupon code');
    }
  };

  const finalTotal = getCartTotal() - discountAmount;
  const shippingCost = finalTotal > 0 ? 5.00 : 0;
  const orderTotal = finalTotal + shippingCost;

  return (
    <>
      <Banner title="Shopping Cart" backgroundImage="https://images.unsplash.com/photo-1579113800032-c38bd7635818" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {items.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-light">
                        <tr>
                          <th className="py-4 px-6 text-left">Product</th>
                          <th className="py-4 px-6 text-center">Price</th>
                          <th className="py-4 px-6 text-center">Quantity</th>
                          <th className="py-4 px-6 text-center">Total</th>
                          <th className="py-4 px-6 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {items.map(item => (
                          <tr key={item.id}>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-4">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <span className="font-medium text-primary">{item.title}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center">
                                <button 
                                  className="p-1 rounded-full bg-light text-primary hover:bg-secondary hover:text-white transition-colors"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="mx-3 w-8 text-center">{item.quantity}</span>
                                <button 
                                  className="p-1 rounded-full bg-light text-primary hover:bg-secondary hover:text-white transition-colors"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button 
                                className="text-red-500 hover:text-red-700 transition-colors"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
                  <Link to="/shop" className="btn-secondary">
                    Continue Shopping
                  </Link>
                  <button onClick={clearCart} className="px-6 py-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                    Clear Cart
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-light rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">${shippingCost.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-primary">Total:</span>
                        <span className="text-lg font-bold text-primary">${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="block text-primary font-medium mb-2">Coupon Code</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-grow px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        className="bg-secondary text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-green-600 text-sm mt-2">Coupon applied successfully!</p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">Try code: ORGANICK10 for 10% off</p>
                  </div>
                  
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    <ShoppingBag size={20} />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-light rounded-lg">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag size={20} />
                <span>Start Shopping</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
