import { Input, Typography } from '@mui/material'
import React from 'react'

function SupplierDashboard() {
  return (
    <>
      <Box>
        <Box>
          <Input type={text} placeholder='Search for supplier...'/>
          <Box>
            {/* Map supplier card for all suppliers */}
          </Box>
        </Box>
      </Box>
      <Box>

      </Box>
    </>
  )
}

function SupplierCard(name){
  return (
    <Box>
      <Typography variant='h4'>Company Name</Typography>
    </Box>
  )
}

export default SupplierDashboard
