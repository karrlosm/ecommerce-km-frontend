import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../interface";
import { useCookies } from "react-cookie";

export interface IShopContext {
    addToCart: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    updateCartItemCount: (newAmount: number, itemId: string) => void;
    getCartItemCount: (itemId: string) => number;
    getTotalCartAmount: () => number;
    checkout: () => void;
    availableMoney: number;
    purchasedItems: IProduct[];
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const defaultValue: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    updateCartItemCount: () => null,
    getCartItemCount: () => 0,
    getTotalCartAmount: () => 0,
    checkout: () => null,
    purchasedItems: [],
    availableMoney: 0,
    isAuthenticated: false,
    setIsAuthenticated: () => null,
}

export const ShopContext = createContext<IShopContext>(defaultValue)

export const ShopContextProvider = (props) => {
    const [cookies, setCookies] = useCookies(['access_token'])
    const [cartItems, setCartItems] = useState<{string: number} | {}>({})
    const [availableMoney, setAvailableMoney] = useState<number>(0)
    const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(cookies.access_token !== null)

    const { products } = useGetProducts()
    const { headers } = useGetToken()
    const navigate = useNavigate()

    const fetchAvailableMoney = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/user/available-money/${localStorage.getItem('userID')}`, {
                headers,
            })

            console.log('response available money', response.data)

            setAvailableMoney(response.data.availableMoney)
            
        } catch (error) {
            alert('ERROR: Something went wrong')
        }
    }

    const fetchPurchasedItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/product/purchased-items/${localStorage.getItem('userID')}`, {
                headers,
            })

            setPurchasedItems(response.data.purchasedItems)
            
        } catch (error) {
            alert('ERROR: Something went wrong')
        }
    }

    const getCartItemCount = (itemId: string): number => {
        if (itemId in cartItems){
            return cartItems[itemId]
        }

        return 0
    }

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]: 1}))
        } else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId: string) => {
        if (!cartItems[itemId]) return;
        if (cartItems[itemId] === 0) return;

        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
    }

    const updateCartItemCount = (newAmount: number, itemId: string) => {
        if (newAmount < 0) return;
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product._id === item);

                totalAmount += cartItems[item] * itemInfo.price;
            }
        }

        return totalAmount;
    }

    const checkout = async () => {
        const data = {
            customerID: localStorage.getItem('userID'), cartItems
        };

        try {
            await axios.post('http://localhost:3001/product/checkout', data,
                {
                    headers,
                }
            )
            setCartItems({})
            fetchAvailableMoney()
            fetchPurchasedItems()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchAvailableMoney()
            fetchPurchasedItems()
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.clear()
            setCookies('access_token', null)
        }
    }, [isAuthenticated]);

    const contextValue: IShopContext = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
        getTotalCartAmount,
        checkout,
        purchasedItems,
        availableMoney,
        isAuthenticated,
        setIsAuthenticated,
    };


    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
