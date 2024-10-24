import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from '@material-tailwind/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export function AddNewLocationModal({
  handleAddNewLocation,
}: {
  // eslint-disable-next-line no-unused-vars
  handleAddNewLocation: (address: {
    name: string
    district: string
    address: string
    city: string
    country: string
  }) => Promise<void>
}) {
  const [location, setLocation] = React.useState<{
    name: string
    district: string
    address: string
    city: string
    country: string
  }>({
    name: '',
    district: '',
    address: '',
    city: '',
    country: '',
  })

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)

  const handleConfirm = async () => {
    await handleAddNewLocation(location)
    handleOpen()
  }

  return (
    <>
      <Button
        className="flex items-center gap-3"
        size="sm"
        onClick={handleOpen}>
        <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add New Location
      </Button>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Location</DialogHeader>
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
              onChange={e => setLocation({ ...location, name: e.target.value })}
            />
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Address
            </Typography>
            <Input
              size="lg"
              crossOrigin={undefined}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={e =>
                setLocation({ ...location, address: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              District
            </Typography>
            <Input
              size="lg"
              crossOrigin={undefined}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={e =>
                setLocation({ ...location, district: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              City
            </Typography>
            <Input
              size="lg"
              crossOrigin={undefined}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={e => setLocation({ ...location, city: e.target.value })}
            />

            <Typography variant="h6" color="blue-gray" className="my-1 mt-4">
              Country
            </Typography>
            <Input
              size="lg"
              crossOrigin={undefined}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              onChange={e =>
                setLocation({ ...location, country: e.target.value })
              }
            />
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
