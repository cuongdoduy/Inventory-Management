import React, { createContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  sku: string
  quantity: number
  maxQuantity: number
  location: string
}

interface CartContextType {
  cartItems: CartItem[]
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: CartItem) => void
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (item: CartItem) => void
  clearCart: () => void
  getCartTotal: () => number
  totalItems: () => number
  // eslint-disable-next-line no-unused-vars
  removeItem: (id: string) => void
  // eslint-disable-next-line no-unused-vars
  isItemExist: (id: string) => boolean
  getCartItems: () => CartItem[]
  // eslint-disable-next-line no-unused-vars
  updateItemInCart: (item: CartItem) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const updateCart = (item: CartItem) => {
    const newCart = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: item.quantity,
        }
      }
      return cartItem
    })

    setCartItems(newCart)
  }

  const removeCart = (id: string) => {
    const newCart = cartItems.filter(item => item.id !== id)
    setCartItems(newCart)
  }

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingItem) {
      updateCart({
        ...existingItem,
        quantity: existingItem.quantity + 1,
      })
    } else {
      setCartItems([...cartItems, item])
    }
  }

  const removeFromCart = (item: CartItem) => {
    removeCart(item.id)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const totalItems = () => {
    return cartItems.length
  }

  const removeItem = (id: string) => {
    removeCart(id)
  }

  const isItemExist = (id: string) => {
    return cartItems.some(item => item.id === id)
  }

  const getCartItems = () => {
    return cartItems
  }

  const updateItemInCart = (item: CartItem) => {
    const newCart = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: item.quantity,
        }
      }
      return cartItem
    })

    setCartItems(newCart)
  }

  return (
    <CartContext.Provider
      value={{
        updateItemInCart,
        getCartItems,
        isItemExist,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        getCartTotal,
        removeItem,
      }}>
      {children}
    </CartContext.Provider>
  )
}
