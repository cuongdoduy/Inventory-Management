import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
const Home: React.FC = () => {
  const [orders, setOrders] = useState<
    Array<{
      id: string
      status: string
      createdAt: string
      items: Array<{
        id: string
        quantity: number
        item: string
      }>
    }>
  >([])

  useEffect(() => {
    // Fetch orders from the API (replace with your API endpoint)
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data =>
        setOrders(
          data.items.map((order: any) => {
            return {
              id: order._id,
              status: order.status,
              createdAt: order.createdAt,
              items: order.items.map(({ item, quantity }: any) => {
                return {
                  id: item._id,
                  quantity: quantity,
                  item:
                    item.name + ' - ' + item.sku + ' - ' + item.location.name,
                }
              }),
            }
          })
        )
      )
      .catch(error => console.error('Error fetching orders:', error))
  }, [])

  return (
    <Fragment>
      <main className="bg-gray-100">
        <div className="w-[90vw] mx-auto">
          <h1 className="py-6 text-1xl text-center font-bold text-gray-900 sm:text-1xl md:text-2xl">
            Welcome to Inventory Master Home 🏆
          </h1>
          <Link href="/">
            <Button size="md">
              Back to Home
            </Button>
          </Link>
          <div className="min-h-screen">
            <h1 className="text-3xl font-semibold mb-8 text-center">Orders</h1>
            {orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No orders found.</p>
            )}
          </div>
        </div>
      </main>
    </Fragment>
  )
}

const OrderCard = ({
  order,
}: {
  order: {
    id: string
    status: string
    createdAt: string
    items: Array<{
      id: string
      quantity: number
      item: string
    }>
  }
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Status:</strong> {order.status}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Created At:</strong>{' '}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Items:</h3>
        <ul className="list-disc list-inside space-y-1">
          {order.items.map(item => (
            <li key={item.id} className="text-gray-700">
              Item: {item.item} | Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
