// pages/statistics.js
import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react'

export default function StatisticsPage() {
  const [inventoryData, setInventoryData] = useState<
    Array<{
      _id: string
      totalQuantity: number
      items: Array<{
        name: string
        sku: string
        quantity: number
      }>
    }>
  >([])
  const [lowStockItems, setLowStockItems] = useState<
    Array<{
      _id: string
      totalQuantity: number
      items: Array<{
        name: string
        sku: string
        quantity: number
      }>
    }>
  >([])

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/api/items/statistics')
      const data = await res.json()
      setInventoryData(data)

      // Filter low stock items (below 10 units)
      const lowStock = data.filter(
        (item: {
          _id: string
          totalQuantity: number
          items: Array<{
            name: string
            sku: string
            quantity: number
          }>
        }) => item.totalQuantity < 10
      )
      setLowStockItems(lowStock)
    }

    fetchData()
  }, [])

  const data = [
    {
      label: 'Total Inventory Items',
      value: 'total_inventory_items',
    },
    {
      label: 'Low Stock Items',
      value: 'low_stock_items',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-[90vw] mx-auto">
        <h1 className="py-6 text-1xl text-center font-bold text-gray-900 sm:text-1xl md:text-2xl">
          Welcome to Inventory Master Home 🏆
        </h1>
        <Link href="/">
          <Button size="md">Back to Home</Button>
        </Link>
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Inventory Statistics
        </h1>
        <Tabs value="total_inventory_items">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value }) => (
              <TabPanel key={value} value={value}>
                {value === 'total_inventory_items' ? (
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">
                          SKU
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Product Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Total Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.map(item => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            {item._id}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.items[0].name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {item.totalQuantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : lowStockItems.length > 0 ? (
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-red-200">
                        <th className="border border-gray-300 px-4 py-2">
                          SKU
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Product Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Total Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockItems.map(item => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            {item._id}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.items[0].name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {item.totalQuantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No low-stock items found.</p>
                )}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  )
}
