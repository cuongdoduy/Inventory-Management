import { PencilIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Checkbox,
} from '@material-tailwind/react'
import { useContext, useEffect, useState } from 'react'
import { AddNewLocationModal } from './AddNewLocationModal'
import { AddNewProductModal } from './AddNewProduct'
import { CartContext } from '@/contexts/CartContext'
import { AddNewOrderModal } from './AddNewOrder'
import Link from 'next/link'

const TABLE_HEAD = ['', 'Name', 'SKU', 'Quantity', 'Location', 'Account', '']

const TABLE_ROWS = [
  {
    img: 'https://docs.material-tailwind.com/img/logos/logo-spotify.svg',
    name: 'Spotify',
    amount: '$2,500',
    date: 'Wed 3:00pm',
    status: 'paid',
    account: 'visa',
    accountNumber: '1234',
    expiry: '06/2026',
  },
  {
    img: 'https://docs.material-tailwind.com/img/logos/logo-amazon.svg',
    name: 'Amazon',
    amount: '$5,000',
    date: 'Wed 1:00pm',
    status: 'paid',
    account: 'master-card',
    accountNumber: '1234',
    expiry: '06/2026',
  },
  {
    img: 'https://docs.material-tailwind.com/img/logos/logo-pinterest.svg',
    name: 'Pinterest',
    amount: '$3,400',
    date: 'Mon 7:40pm',
    status: 'pending',
    account: 'master-card',
    accountNumber: '1234',
    expiry: '06/2026',
  },
  {
    img: 'https://docs.material-tailwind.com/img/logos/logo-google.svg',
    name: 'Google',
    amount: '$1,000',
    date: 'Wed 5:00pm',
    status: 'paid',
    account: 'visa',
    accountNumber: '1234',
    expiry: '06/2026',
  },
  {
    img: 'https://docs.material-tailwind.com/img/logos/logo-netflix.svg',
    name: 'netflix',
    amount: '$14,000',
    date: 'Wed 3:30am',
    status: 'cancelled',
    account: 'visa',
    accountNumber: '1234',
    expiry: '06/2026',
  },
]

export function TransactionsTable() {
  const [items, setItems] = useState<
    Array<{
      _id: string
      name: string
      sku: string
      quantity: number
      location: string
    }>
  >([])

  const { addToCart, removeItem, isItemExist, clearCart } =
    useContext(CartContext) || {}

  const [locations, setLocations] = useState<Map<string, string>>(new Map())

  const [pagination, setPagination] = useState<{
    currentPage: number
    totalPages: number
    totalItems: number
  }>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  })

  const handleAddNewLocation = async (address: {
    name: string
    district: string
    address: string
    city: string
    country: string
  }) => {
    const response = await fetch('http://localhost:5000/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...address }),
    })
    const data = await response.json()

    const newLocations = new Map(locations)
    newLocations.set(
      data._id,
      `${data.name} - ${data.address}, ${data.district}, ${data.city}, ${data.country}`
    )
    setLocations(newLocations)
  }

  const handleAddNewProduct = async (product: {
    name: string
    sku: string
    address: string
    quantity: number
  }) => {
    const response = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        location: product.address,
      }),
    })
    await response.json()
    const fetchData = async () => {
      const currentPage = 1
      const response = await fetch(
        'http://localhost:5000/api/items?page=' + currentPage + '&limit=' + 5
      )
      const data = await response.json()
      const items = data.items.map(
        (item: {
          _id: string
          name: string
          sku: string
          quantity: number
          location: string
        }) => {
          return {
            _id: item._id,
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
            location: locations.get(item.location) || '',
          }
        }
      )
      setItems(items)
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(data.count / 2),
        totalItems: data.count,
      })
    }
    fetchData()
  }

  const handlePagination = async (page: number) => {
    const response = await fetch(
      'http://localhost:5000/api/items?page=' + page + '&limit=5'
    )
    const data = await response.json()
    const items = data.items.map(
      (item: {
        _id: string
        name: string
        sku: string
        quantity: number
        location: string
      }) => {
        return {
          _id: item._id,
          name: item.name,
          sku: item.sku,
          quantity: item.quantity,
          location: locations.get(item.location) || '',
        }
      }
    )
    setItems(items)
    setPagination({ ...pagination, currentPage: page })
  }

  useEffect(() => {
    const MAX_ITEMS_PER_PAGE = 5

    // This is where you can add your API call
    const fetchData = async () => {
      const currentPage = 1
      const response = await fetch(
        'http://localhost:5000/api/items?page=' +
          currentPage +
          '&limit=' +
          MAX_ITEMS_PER_PAGE
      )
      const data = await response.json()
      return data
    }
    const fetchInventoryAddress = async () => {
      const response = await fetch('http://localhost:5000/api/locations')
      const data = await response.json()
      return data.items
    }
    const fetchAllData = async () => {
      const [data, addresses] = await Promise.all([
        fetchData(),
        fetchInventoryAddress(),
      ])

      const map = new Map()
      addresses.forEach(
        (address: {
          _id: string
          name: string
          district: string
          address: string
          city: string
          country: string
        }) => {
          const addressTransform = `${address.name} - ${address.address}, ${address.district}, ${address.city}, ${address.country}`
          map.set(address._id, addressTransform)
        }
      )

      setLocations(map)

      const items = data.items.map(
        (item: {
          _id: string
          name: string
          sku: string
          quantity: number
          location: string
        }) => {
          return {
            _id: item._id,
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
            location: map.get(item.location),
          }
        }
      )
      setItems(items)

      const totalPages = Math.ceil(data.count / MAX_ITEMS_PER_PAGE)
      setPagination({
        currentPage: 1,
        totalPages,
        totalItems: data.count,
      })
    }
    fetchAllData()
  }, [])

  const handleTickItem = (id: string) => {
    const item = items.find(item => item._id === id)
    if (item) {
      const addItem = {
        id: item._id,
        name: item.name,
        sku: item.sku,
        quantity: 1,
        location: item.location,
        maxQuantity: item.quantity,
      }
      addToCart?.(addItem)
    }
  }

  const handleUntickItem = (id: string) => {
    const item = items.find(item => item._id === id)
    if (item) {
      removeItem?.(item._id)
    }
  }

  const handleChangeTick = (id: string) => {
    const item = items.find(item => item._id === id)
    if (item) {
      if (isItemExist?.(id)) {
        handleUntickItem(id)
      } else {
        handleTickItem(id)
      }
    }
  }

  const isItemInCart = (id: string) => {
    return isItemExist?.(id)
  }

  const handleAddNewOrder = async (data: {
    items: Array<{
      item: string
      quantity: number
    }>
  }) => {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    await response.json()

    // update the remaining quantity of the item
    const map = new Map()
    data.items.forEach(item => {
      map.set(item.item, item.quantity)
    })

    const newItems = items.map(item => {
      if (map.has(item._id)) {
        return {
          ...item,
          quantity: item.quantity - map.get(item._id),
        }
      }
      return item
    })

    clearCart?.()
    setItems(newItems)
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Inventory
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your inventory
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <AddNewProductModal
              handleAddNewProduct={handleAddNewProduct}
              addresses={locations}
            />
            <AddNewLocationModal handleAddNewLocation={handleAddNewLocation} />

            <AddNewOrderModal handleAddNewOrder={handleAddNewOrder} />
            <Link href="/orders">
              <Button size="md">View all orders</Button>
            </Link>
            <Link href="/statistics">
              <Button size="md">View Statistics</Button>
            </Link>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                crossOrigin={undefined}
                type="text"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(({ name, sku, quantity, location, _id }, index) => {
              const isLast = index === TABLE_ROWS.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        crossOrigin={undefined}
                        checked={isItemInCart(_id)}
                        onChange={() => handleChangeTick(_id)}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold">
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {sku}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {location}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Product">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {new Array(pagination.totalPages).fill(0).map((_, index) => (
            <IconButton
              key={index}
              variant={
                pagination.currentPage === index + 1 ? 'outlined' : 'text'
              }
              size="sm"
              onClick={() => handlePagination(index + 1)}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}
