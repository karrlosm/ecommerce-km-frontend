import { useContext } from "react";
import { IProduct } from "../../../interface";
import { formatNumberToPriceBRL } from "../../../utils/formatNumberToPriceBRL";
import { IShopContext, ShopContext } from "../../../context/shop-context";

interface ProductProps {
    product: IProduct;
}

export const Product = ({product}: ProductProps) => {

    const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

    const count = getCartItemCount(product._id);

    console.log('count', count);

    return (
        <div className="product">
            <img
                src={product.imageURL}
                alt={product.productName} /> {" "}
            <div className="description">
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <span>R$ {formatNumberToPriceBRL(product.price)}</span>
            </div>
            <button
                onClick={() => addToCart(product._id)}
                className="addToCartBttn">
                Add to cart {count > 0 &&  <>({count})</>}
            </button>
            <div className="stock-quantity">
                {product.stockQuantity === 0 ?
                   <h1>OUT OF STOCK</h1> :
                    <span>{product.stockQuantity} on stock</span>
                }
            </div>
        </div>
    )
};
