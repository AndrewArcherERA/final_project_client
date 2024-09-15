import { Box, Input } from '@mui/material'
import React from 'react'
import SupplierCard from '../../components/supplierPage/SupplierCard'

function Suppliers() {
  return (
    <>
      <Box>
        <Box>
          <Input type={'text'} placeholder='Search for supplier...'/>
          <Box>
            {/* Map supplier card for all suppliers */}
            <SupplierCard />
          </Box>
        </Box>
      </Box>
      <Box>

      </Box>
    </>
  )
}

export default Suppliers
