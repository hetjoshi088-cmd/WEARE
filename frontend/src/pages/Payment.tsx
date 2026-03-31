import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { createOrder, resetOrder } from '../store/orderSlice';
import type { RootState, AppDispatch } from '../store/store';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { items, totalPrice } = useSelector((state: RootState) => state.cart);
    const { isSuccess, isError, message, isLoading } = useSelector((state: RootState) => state.order);

    // Redirect if no shipping address
    useEffect(() => {
        if (!location.state?.shippingAddress) {
            navigate('/checkout');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearCart());
            dispatch(resetOrder());
            navigate('/order-success');
        }
        if (isError) {
            alert(message);
            dispatch(resetOrder());
        }
    }, [isSuccess, isError, message, navigate, dispatch]);

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = {
            orderItems: items.map((item: any) => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price,
                product: item._id || item.id,
            })),
            shippingAddress: location.state.shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: totalPrice,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: totalPrice,
        };

        dispatch(createOrder(orderData));
    };

    if (!location.state?.shippingAddress) return null;

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Payment</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                        <div className="flex gap-4 mb-6">
                            <div
                                onClick={() => setPaymentMethod('Credit Card')}
                                className={`border-2 rounded-lg p-4 flex items-center justify-center w-full cursor-pointer ${paymentMethod === 'Credit Card' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                            >
                                <span className="font-semibold">Credit Card</span>
                            </div>
                            <div
                                onClick={() => setPaymentMethod('PayPal')}
                                className={`border-2 rounded-lg p-4 flex items-center justify-center w-full cursor-pointer ${paymentMethod === 'PayPal' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                            >
                                <span className="font-semibold">PayPal</span>
                            </div>
                        </div>

                        <form onSubmit={handlePlaceOrder} className="space-y-4">
                            {paymentMethod === 'Credit Card' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={19}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                                value={expiry}
                                                onChange={(e) => setExpiry(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                maxLength={3}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;