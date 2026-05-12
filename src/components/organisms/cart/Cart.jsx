import React from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';

export default function Cart() {
    const { items, removeItem, getTotalPrice } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                <Link to="/gallery" className="text-blue-600 hover:underline">
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <section className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Carrito de Compras</h2>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.product.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={item.product.image} 
                                    alt={item.product.title} 
                                    className="w-16 h-16 object-contain"
                                />
                                <div>
                                    <h3 className="font-semibold">{item.product.title}</h3>
                                    <p className="text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="font-bold text-lg">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                                <button 
                                    onClick={() => removeItem(item.product.id)}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                >
                                    X
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
                    <div className="text-xl font-bold">
                        Total: ${getTotalPrice().toFixed(2)}
                    </div>
                    <Link 
                        to="/checkout" 
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Proceder al Pago
                    </Link>
                </div>
            </div>
        </section>
    );
}
