import { useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../interface";

export const useGetProducts = () => {
    const [products, setProducts] = useState([] as IProduct[]);
    const {headers } = useGetToken();

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get('http://localhost:3001/product', {
                headers,
            });
            setProducts(fetchedProducts.data.products)
        } catch (err: any) {
            alert("ERROR: Something went wrong.")
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return { products }
}
