import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';

export default function Checkout() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    if (items.length === 0 && !isSuccess) {
        navigate('/gallery');
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías agregar lógica para guardar la orden en Firebase
        clearCart();
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="p-6 text-center max-w-lg mx-auto mt-10 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="text-3xl font-bold text-green-600 mb-4">¡Compra Exitosa!</h2>
                <p className="text-gray-700 mb-6">Tu pedido ha sido procesado correctamente y está en camino.</p>
                <button 
                    onClick={() => navigate('/gallery')}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <section className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Detalles de Envío</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Nombre Completo</label>
                        <input type="text" required className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Dirección</label>
                        <input type="text" required className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Tarjeta de Crédito</label>
                        <input type="text" placeholder="**** **** **** ****" required className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition mt-4">
                        Confirmar Pago
                    </button>
                </form>
            </div>

            <div className="md:w-1/3 bg-gray-50 p-6 shadow-md rounded-lg h-fit">
                <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
                <ul className="divide-y mb-4">
                    {items.map(item => (
                        <li key={item.product.id} className="py-2 flex justify-between text-sm">
                            <span className="truncate pr-2">{item.quantity}x {item.product.title}</span>
                            <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center border-t pt-4 font-bold text-lg">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                </div>
            </div>
        </section>
    );
}
