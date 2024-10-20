import { TransactionsTable } from '@/components/Table'
import React, { Fragment } from 'react'

const Home: React.FC = () => {
  return (
    <Fragment>
      <main>
        <h1 className="my-6 text-1xl text-center font-bold text-gray-900 sm:text-1xl md:text-2xl">
          Welcome to Inventory Master Home 🏆
        </h1>
        <TransactionsTable />
      </main>
    </Fragment>
  )
}

export default Home
