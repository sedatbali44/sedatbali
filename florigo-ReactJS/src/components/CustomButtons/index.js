import PropTypes from 'prop-types';

import { IconButton, Tooltip, Button } from '@mui/material';

import Iconify from 'components/Iconify';

const CustomSearchButton = ({ isLoading, onClick, title }) => (
  <Tooltip title="Search">
    <span>
      <Button
        aria-label="search"
        disabled={isLoading}
        onClick={() => {
          onClick();
        }}
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="gridicons:create" />}
        sx={{ borderRadius: 0, padding: 1 }}
      >
        {title}
      </Button>
    </span>
  </Tooltip>
);

const CustomCreateButton = ({ isLoading, onClick, title }) => (
  <Tooltip title="Create">
    <span>
      <Button
        aria-label="create"
        disabled={isLoading}
        onClick={() => {
          onClick();
        }}
        color="primary"
        variant="outlined"
        startIcon={<Iconify icon="gridicons:create" />}
        sx={{ borderRadius: 0, padding: 1 }}
      >
        {title}
      </Button>
    </span>
  </Tooltip>
);

CustomCreateButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

const CustomButton = ({ onClick, children, icon, color, disabled, ...other }) => (
  <Button
    aria-label="create"
    onClick={() => {
      onClick();
    }}
    color={color}
    variant="outlined"
    startIcon={<Iconify icon={icon} />}
    sx={{ borderRadius: 0, padding: 1 }}
    disabled={disabled}
    {...other}
  >
    {children}
  </Button>
);

const CustomDeleteButton = ({ isLoading, onClick }) => (
  <Tooltip title="Delete">
    <span>
      <IconButton
        aria-label="delete"
        disabled={isLoading}
        onClick={() => {
          onClick();
        }}
        color="error"
      >
        <Iconify icon="ant-design:delete-filled" size={18} />
      </IconButton>
    </span>
  </Tooltip>
);

CustomDeleteButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

const CustomUpdateButton = ({ isLoading, onClick }) => (
  <Tooltip title="Update">
    <span>
      <IconButton
        disabled={isLoading}
        onClick={() => {
          onClick();
        }}
      >
        <Iconify icon="clarity:edit-solid" size={18} />
      </IconButton>
    </span>
  </Tooltip>
);

CustomUpdateButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

const CustomSaveEventButton = ({ isLoading, onClick, other }) => (
  <Tooltip title="Save">
    <span>
      <Button
        aria-label="save"
        disabled={isLoading}
        onClick={() => {
          onClick();
        }}
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="fluent:save-arrow-right-24-regular" />}
        sx={{ borderRadius: 0, padding: 1 }}
        {...other}
      >
        Save
      </Button>
    </span>
  </Tooltip>
);

CustomSaveEventButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

const CustomUpdateEventButton = ({ isLoading, onClick, other }) => (
  <Tooltip title="Update">
    <span>
      <Button
        aria-label="update"
        disabled={isLoading}
        onClick={() => {
          onClick();
        }}
        color="warning"
        variant="outlined"
        {...other}
        startIcon={<Iconify icon="ic:outline-update" />}
        sx={{ borderRadius: 0, padding: 1 }}
      >
        Update
      </Button>
    </span>
  </Tooltip>
);

CustomUpdateEventButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

const CustomCancelEventButton = ({ onClick, other }) => (
  <Tooltip title="Cancel">
    <span>
      <Button
        onClick={() => {
          onClick();
        }}
        color="error"
        variant="contained"
        startIcon={<Iconify icon="icons8:cancel" />}
        {...other}
        sx={{ borderRadius: 0, padding: 1, marginX: 1 }}
      >
        Cancel
      </Button>
    </span>
  </Tooltip>
);

CustomCancelEventButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  other: PropTypes.object,
};
const CustomUpdateSubmitButton = ({ isLoading, other, type, title = 'update' }) => (
  <Tooltip title="Update">
    <span>
      <Button
        type={type}
        disabled={isLoading}
        color="warning"
        variant="outlined"
        {...other}
        startIcon={<Iconify icon="ic:outline-update" />}
        sx={{ borderRadius: 0, padding: 1 }}
      >
        {title}
      </Button>
    </span>
  </Tooltip>
);
CustomUpdateEventButton.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};
const CustomCreateSubmitButton = ({ isLoading, other, type }) => (
  <Tooltip title="Save">
    <span>
      <Button
        type={type}
        disabled={isLoading}
        color="success"
        variant="outlined"
        {...other}
        startIcon={<Iconify icon="ic:outline-save" />}
        sx={{ borderRadius: 0, padding: 1 }}
      >
        Save
      </Button>
    </span>
  </Tooltip>
);
CustomUpdateEventButton.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

export {
  CustomDeleteButton,
  CustomCreateButton,
  CustomUpdateButton,
  CustomSaveEventButton,
  CustomUpdateEventButton,
  CustomCancelEventButton,
  CustomUpdateSubmitButton,
  CustomCreateSubmitButton,
  CustomSearchButton,
  CustomButton,
};
