import { TransactionsTable } from '@/components/Table'
import { CartProvider } from '@/contexts/CartContext'
import React, { Fragment } from 'react'

const Home: React.FC = () => {
  return (
    <Fragment>
      <main>
        <h1 className="my-6 text-1xl text-center font-bold text-gray-900 sm:text-1xl md:text-2xl">
          Welcome to Inventory Master Home 🏆
        </h1>
        <CartProvider>
          <TransactionsTable />
        </CartProvider>
      </main>
    </Fragment>
  )
}

export default Home
