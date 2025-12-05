"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface ShippingAddress {
  apartmentName: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartWithProducts, setCartWithProducts] = useState<any[]>([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    apartmentName: "",
    streetName: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login?redirect=/checkout');
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);

        if (userData.address) {
          setShippingAddress({
            apartmentName: userData.address.apartmentName || "",
            streetName: userData.address.streetName || "",
            city: userData.address.city || "",
            state: userData.address.state || "",
            country: userData.address.country || "India",
            pincode: userData.address.pincode || "",
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login?redirect=/checkout');
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!cart || cart.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productPromises = cart.map(async (cartItem: any) => {
          const response = await fetch(`/api/products/product/${cartItem.productId}`);
          if (!response.ok) throw new Error(`Failed to fetch product ${cartItem.productId}`);
          const productData = await response.json();
          return { ...cartItem, product: productData };
        });

        const results = await Promise.all(productPromises);
        setCartWithProducts(results);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cart]);

  const subtotal = cartWithProducts.reduce((sum, item) => {
    if (!item.product) return sum;
    const price = item.product.discountedPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shippingFee + tax;

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};

    if (!shippingAddress.streetName.trim()) {
      newErrors.streetName = "Street name is required";
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!shippingAddress.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!shippingAddress.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const initializeRazorpayPayment = async (orderId: string, razorpayOrderId: string) => {
  if (!razorpayLoaded) {
    alert('Payment system is loading. Please try again.');
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: total * 100,
    currency: "INR",
    name: "Mr.XY Caps",
    description: "Order Payment",
    order_id: razorpayOrderId,
    handler: async function (response: any) {
      try {
        setIsProcessing(true);
        const token = localStorage.getItem('token');

        const verifyResponse = await fetch('/api/orders/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        if (!verifyResponse.ok) {
          throw new Error('Payment verification failed');
        }

        clearCart();
        router.push(`/my-orders?success=true&orderId=${orderId}`);
      } catch (error) {
        console.error('Payment verification error:', error);
        alert('Payment verification failed. Please contact support.');
      } finally {
        setIsProcessing(false);
      }
    },
    prefill: {
      name: user?.name || "",
      email: user?.email || "",
      contact: user?.phone || "",
    },
    theme: { color: "#000000" },
    modal: {
      ondismiss: async function() {
        // Called when user closes the Razorpay modal (no payment completed)
        setIsProcessing(false);
        try {
          const token = localStorage.getItem('token');
          // Try to delete the order created on server
          const resp = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!resp.ok) {
            console.warn('Failed to delete order after modal close', await resp.text());
          } else {
            console.log('Order deleted due to modal dismissal');
          }
        } catch (err) {
          console.error('Error deleting order after modal dismiss:', err);
        } finally {
          alert('Payment cancelled. You can retry when ready.');
        }
      }
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};


  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly');
      return;
    }

    if (cartWithProducts.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const orderItems = cartWithProducts.map(item => ({
        productId: item.productId,
        name: item.product.name,
        unitPrice: item.product.discountedPrice || item.product.price,
        quantity: item.quantity,
        image: item.product.images?.[0] || "",
      }));

      const response:any = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress,
          subTotal: subtotal,
          tax,
          shippingFee,
          totalAmount: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data=await response.json()
      const { orderId, razorpayOrderId } = data;
      
      await initializeRazorpayPayment(orderId, razorpayOrderId);
    } catch (error: any) {
      console.error('Order creation error:', error);
      alert(error.message || 'Failed to create order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h1>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Apartment/House Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.apartmentName}
                      onChange={(e) => handleInputChange('apartmentName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Building/Apartment name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.streetName}
                      onChange={(e) => handleInputChange('streetName', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                        errors.streetName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Street name and number"
                    />
                    {errors.streetName && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.streetName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.city ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.state ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.pincode ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="6-digit pincode"
                        maxLength={6}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.pincode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.country}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Items</h2>
                <div className="space-y-4">
                  {cartWithProducts.map((item) => (
                    <div key={item.productId} className="flex gap-4 pb-4 border-b dark:border-gray-700 last:border-b-0">
                      <img
                        src={item.product.images?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium dark:text-white">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold dark:text-white">
                          ₹{(item.product.discountedPrice || item.product.price).toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm sticky top-8">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
                    <span className="font-semibold dark:text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Tax (GST 18%)</span>
                    <span className="font-semibold dark:text-white">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Shipping</span>
                    <span className="font-semibold dark:text-white">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="dark:text-white">Total</span>
                      <span className="dark:text-white">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !razorpayLoaded}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : !razorpayLoaded ? (
                    'Loading Payment...'
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure payment with Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}