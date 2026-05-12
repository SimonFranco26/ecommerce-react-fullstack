export const getProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data.map(product => ({
            id: String(product.id),
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rate: product.rating?.rate || 0,
            count: product.rating?.count || 0
        }));
    } catch (error) {
        console.error("Error fetching products from FakeStore API:", error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        if (data && typeof data === 'object') {
            return {
                id: String(data.id),
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                rate: data.rating?.rate || 0,
                count: data.rating?.count || 0
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching product by id from FakeStore API:", error);
        return null;
    }
};
