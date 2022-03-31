import Drawer from '@mui/material/Drawer'

const InfoDrawer = ({ open, setOpen }) => {
  const handle = () => {
    setOpen(false)
  }
  return (
    <Drawer anchor={'bottom'} open={open} onClose={handle}>
      basithdhfghsdl
    </Drawer>
  )
}

export default InfoDrawer
