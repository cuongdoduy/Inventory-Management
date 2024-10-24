import React, { useContext, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
} from '@material-tailwind/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { CartContext } from '@/contexts/CartContext'
import Image from 'next/image'
import EmptyImage from 'public/icons/EmptyState.svg'

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function AddNewOrderModal({
  handleAddNewOrder,
}: {
  // eslint-disable-next-line no-unused-vars
  handleAddNewOrder: (data: {
    items: Array<{
      item: string
      quantity: number
    }>
  }) => Promise<void>
}) {
  const { cartItems, updateItemInCart, removeItem } = useContext(CartContext) || {
    cartItems: [],
    updateItemInCart: () => {},
    removeItem: () => {},
  }

  const [items, setItems] = React.useState<
    Array<{
      id: string
      name: string
      sku: string
      quantity: number
      maxQuantity: number
      location: string
    }>
  >([])

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)

  const handleConfirm = async () => {
    await handleAddNewOrder({
      items: items.map(item => ({
        item: item.id,
        quantity: item.quantity,
      })),
    })
    handleOpen()
  }

  useEffect(() => {
    cartItems && setItems(cartItems)
  }, [cartItems])

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: {
      id: string
      name: string
      sku: string
      quantity: number
      maxQuantity: number
      location: string
    }
  ) => {
    const quantity = +e.target.value

    if (quantity > item.maxQuantity) {
      alert('Quantity must be less than or equal to the max quantity')
    } else {
      updateItemInCart?.({ ...item, quantity })
    }
  }

  return (
    <>
      <Button
        className="flex items-center gap-3"
        size="sm"
        onClick={handleOpen}>
        <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add New Orders
      </Button>
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader>Order Summary</DialogHeader>
        <DialogBody>
          {items.length > 0 ? (
            <div className="mb-4 max-h-[60vh] overflow-y-auto">
              <List>
                {items.map(item => (
                  <ListItem
                    key={item.id}
                    ripple={false}
                    className="py-2 pr-1 pl-4">
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-8">
                        <Typography>
                          Name: {item.name} <br />
                          SKU: {item.sku} <br />
                          Location: {item.location} <br />
                          Remaining Quantity: {item.maxQuantity}
                        </Typography>
                      </div>
                      <Input
                        size="lg"
                        crossOrigin={undefined}
                        placeholder="1"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-[100px] w-fit"
                        labelProps={{
                          className: 'before:content-none after:content-none',
                        }}
                        value={item.quantity}
                        type="number"
                        onChange={e => handleChangeQuantity(e, item)}
                      />
                    </div>

                    <ListItemSuffix>
                      <IconButton variant="text" color="blue-gray" onClick={()=>removeItem(item.id)}>
                        <TrashIcon />
                      </IconButton>
                    </ListItemSuffix>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : (
            <div className="">
              <Image
                width={200}
                height={200}
                alt="Empty State"
                className="mx-auto"
                src={EmptyImage}
              />
              <Typography variant="h5" color="blue-gray" className="my-1 mt-4 text-center">
                Please ticked at least one item to your order.
              </Typography>
            </div>
          )}
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
