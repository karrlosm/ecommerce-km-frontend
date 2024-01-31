import { useContext } from "react";
import { IProduct } from "../../../interface";
import { formatNumberToPriceBRL } from "../../../utils/formatNumberToPriceBRL";
import { IShopContext, ShopContext } from "../../../context/shop-context";


interface CartItemProps {
    product: IProduct;
}

export const CartItem = ({ product }: CartItemProps) => {

    const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } = useContext<IShopContext>(ShopContext);

    const cartItemCount = getCartItemCount(product._id);

    return (
        <div className="cartItem">
            <img
                key={product._id}
                style={{
                }}
                src={product.imageURL}
                alt={product.productName} />
            <div className="description">
                <h3>{product.productName}</h3>
                <span>Price: R$ {formatNumberToPriceBRL(product.price)}</span>
            </div>
            <div className="count-handler">
                <button onClick={() => removeFromCart(product._id)}> - </button>
                <input type="number" value={cartItemCount} onChange={(e) => updateCartItemCount(Number(e.target.value), product._id)} />
                <button onClick={() => addToCart(product._id)}> + </button>
            </div>
        </div>
    );
}
