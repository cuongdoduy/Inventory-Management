import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Select,
  Option,
} from '@material-tailwind/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export function AddNewProductModal({
  handleAddNewProduct,
  addresses,
}: {
  // eslint-disable-next-line no-unused-vars
  handleAddNewProduct: (product: {
    name: string
    sku: string
    address: string
    quantity: number
  }) => Promise<void>
  addresses: Map<string, string>
}) {
  const [product, setProduct] = React.useState<{
    name: string
    sku: string
    address: string
    quantity: number
  }>({
    name: '',
    sku: '',
    address: '',
    quantity: 0,
  })

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)

  const handleConfirm = async () => {
    await handleAddNewProduct(product)
    handleOpen()
  }

  return (
    <>
      <Button
        className="flex items-center gap-3"
        size="sm"
        onClick={handleOpen}>
        <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add New Product
      </Button>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Product</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Name
            </Typography>
            <Input
              size="lg"
              crossOrigin={false}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={e => setProduct({ ...product, name: e.target.value })}
            />
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              SKU
            </Typography>
            <Input
              size="lg"
              crossOrigin={false}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={e => setProduct({ ...product, sku: e.target.value })}
            />

            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Quantity
            </Typography>
            <Input
              size="lg"
              crossOrigin={false}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type='number'
              onChange={e => setProduct({ ...product, quantity: +e.target.value })}
            />

            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Address
            </Typography>
            <div className="w-72">
              <Select
                label="Select address"
                onChange={value =>
                  setProduct({ ...product, address: value as string })
                }>
                {Array.from(addresses.entries()).map(([key, value]) => (
                  <Option key={key} value={key}>
                    {value}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
