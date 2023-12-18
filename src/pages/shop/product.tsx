import { IProduct } from "../../interface";

interface ProductProps {
    product: IProduct;
}

export const Product = ({product}: ProductProps) => {
    return (
        <div>
            {product.productName}
            {product.price}
        </div>
    )
};
