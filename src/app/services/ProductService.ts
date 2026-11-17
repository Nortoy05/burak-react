import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";


class ProductService {
    private  readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getProducts(input: ProductInquiry): Promise<Product[]> {
        try {
            let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
            if (input.productCollection)
                url += `&productCollection=${input.productCollection}`;
            if (input.search) url += `&search=${input.search}`;

            const result = await axios.get(url);
            const products = result.data;

            // Support APIs that return either a raw array or a wrapped list.
            if (Array.isArray(products)) return products;
            if (Array.isArray(products?.data)) return products.data;
            if (Array.isArray(products?.products)) return products.products;
            return [];
        } catch(err) {
            console.log("Error, getProduct:", err);
            throw err;
        }
    }

}

export default ProductService;
