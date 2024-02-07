import { Link } from "react-router-dom";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { formatNumberToPriceBRL } from "../utils/formatNumberToPriceBRL";

export const Navbar = () => {
    const { availableMoney, isAuthenticated, setIsAuthenticated } = useContext<IShopContext>(ShopContext);

    const logout = () => {
        setIsAuthenticated(false)
    }
    
    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1>Ecommerce Km</h1>
            </div>
            <div className="navbar-links">
                {isAuthenticated &&
                    <>
                        <Link to={"/"}>
                            Shop
                        </Link>
                        <Link to={"/purchased-items"}>
                            Purchases
                        </Link>
                        <Link to={"/checkout"}>
                            <I icon={faShoppingCart} />
                        </Link>
                        <Link to={"/auth"} onClick={logout}>
                            Logout
                        </Link>
                        7
                    </>
                }
            </div>
        </div>
    )
}
