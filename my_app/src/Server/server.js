const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const TEST_SERVER_BASE_URL = 'http://20.244.56.144/test';
const productCache = {};

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, minPrice, maxPrice, sort = 'price', order = 'asc' } = req.query;
    const companies = ["AHZ", "ELP", "SP", "KY", "AZO"];
    const limit = Math.min(n, 10);
    const offset = (page - 1) * limit;

    try {
        const productPromises = companies.map(company => 
            axios.get(`${TEST_SERVER_BASE_URL}/companies/${company}/categories/${categoryname}/products/top-${n}?minPrice=${minPrice}&maxPrice=${maxPrice}`)
        );
        const results = await Promise.all(productPromises);
        let products = results.flatMap(result => result.data);

        products = products.map(product => {
            const productId = uuidv4();
            productCache[productId] = { ...product, productId };
            return { ...product, productId };
        });

        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        });

        const paginatedProducts = products.slice(offset, offset + limit);
        res.json(paginatedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
});

app.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { productid } = req.params;
    const product = productCache[productid];
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
