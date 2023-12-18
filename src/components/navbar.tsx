import { Link } from "react-router-dom";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1>Ecommerce Km</h1>
            </div>
            <div className="navbar-links">
                <Link to={"/"}>
                    Shop
                </Link>
                <Link to={"/purchased-items"}>
                    Purchases
                </Link>
                <Link to={"/checkout"}>
                    <I icon={faShoppingCart} />
                </Link>
            </div>
        </div>
    )
}
