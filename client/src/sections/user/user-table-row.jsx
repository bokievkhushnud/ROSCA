import { format, formatDistanceToNow, isBefore, subDays } from 'date-fns'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import Iconify from 'src/components/iconify'
import Label from 'src/components/label'

// ----------------------------------------------------------------------

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()

  if (isBefore(subDays(now, 3), date)) {
    return `${formatDistanceToNow(date)}`
  }
  return format(date, 'MMM d, yyyy')
}

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  email,
  online,
  role,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
        <TableCell padding='checkbox'>
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant='subtitle2' noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align='center'>{formatDate(online)}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>
            {status}
          </Label>
        </TableCell>

        <TableCell align='right'>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  )
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  online: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
}
