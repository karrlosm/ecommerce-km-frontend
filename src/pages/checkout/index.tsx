import { useContext } from "react"
import { useGetProducts } from "../../hooks/useGetProducts"
import { IShopContext, ShopContext } from "../../context/shop-context"
import { formatNumberToPriceBRL } from "../../utils/formatNumberToPriceBRL"
import { CartItem } from "./components/cart-item"

import './styles.css'
import { useNavigate } from "react-router-dom"

export const CheckoutPage = () => {

    const { products } = useGetProducts();
    const { getCartItemCount, getTotalCartAmount } = useContext<IShopContext>(ShopContext);
    const navigate = useNavigate()

    const totalAmount = getTotalCartAmount();
    return (
        <div className="cart">
            {" "}
            <div>
                {" "}
                <h1>Your cart Items</h1>
            </div>

            <div className="cart">
                {products.map((product) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return (
                            <CartItem product={product} />
                        )
                    }
                })}
            </div>

            {totalAmount > 0 ?
                <div className="checkout">
                    <p>Subtotal: R$ {formatNumberToPriceBRL(Number(totalAmount.toFixed(2)))} </p>
                    <button onClick={() => navigate('/')}>Continue Shopping</button>
                    <button onClick={() => navigate('/')}>Checkout</button>
                </div> :
                (
                    <h1>
                        Your Shopping Cart is Empty
                    </h1>
                )
            
            }
        </div>
    )
}