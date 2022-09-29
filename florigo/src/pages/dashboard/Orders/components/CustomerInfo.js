import { Box, IconButton, Tooltip } from '@mui/material';

import { SectionStyle, SectionHeader } from './SectionDetail';

import CustomerInfoSectionFields from './CustomerInfoSectionFields';
import Iconify from 'components/Iconify';

const CustomerInfo = ({ customer }) => (
  <Box sx={SectionStyle}>
    <SectionHeader>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        CUSTOMER INFO
        <Box>
          <Tooltip title="Check Fraud" placement={'top'}>
            <div>
              <IconButton color={'primary'}>
                <Iconify sx={{ fontSize: 28 }} icon="carbon:security"></Iconify>
              </IconButton>
            </div>
          </Tooltip>
        </Box>
      </Box>
    </SectionHeader>
    <CustomerInfoSectionFields customer={customer}></CustomerInfoSectionFields>
  </Box>
);

export default CustomerInfo;
