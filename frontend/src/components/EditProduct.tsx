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
  Tooltip,
  IconButton,
} from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/solid'
2
export function EditProductModal({
  handleEditProduct,
  addresses,
  productInit,
}: {
  // eslint-disable-next-line no-unused-vars
  handleEditProduct: (product: {
    id: string
    name: string
    sku: string
    location: string
    quantity: number
  }) => Promise<void>
  addresses: Map<string, string>
  productInit: {
    id: string
    name: string
    sku: string
    address: string
    quantity: number
  }
}) {
  const [product, setProduct] = React.useState<{
    id: string
    name: string
    sku: string
    address: string
    quantity: number
  }>(productInit)

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)

  const handleConfirm = async () => {
    await handleEditProduct({
      id: product.id,
      name: product.name,
      sku: product.sku,
      location: product.address,
      quantity: product.quantity,
    })
    handleOpen()
  }

  return (
    <>
      <div  onClick={handleOpen}>
        <Tooltip content="Edit Product">
          <IconButton variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Product</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Name
            </Typography>
            <Input
              size="lg"
              crossOrigin={undefined}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              value={product.name}
              onChange={e => setProduct({ ...product, name: e.target.value })}
            />
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              SKU
            </Typography>
            <Input
              size="lg"
              crossOrigin={undefined}
              value={product.sku}
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
              crossOrigin={undefined}
              value={product.quantity}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="number"
              onChange={e =>
                setProduct({ ...product, quantity: +e.target.value })
              }
            />

            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Address
            </Typography>
            <div className="w-full">
              <Select
                label="Select address"
                value={product.address}
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
