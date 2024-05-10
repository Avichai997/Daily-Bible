import { Delete, PhotoCamera } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';

export interface IUploadFiles {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLLabelElement> | undefined;
  onClickRemove?: React.MouseEventHandler<HTMLElement> | undefined;
}
const UploadFile = ({
  onChange,
  disabled = false,
  onClick = undefined,
  onClickRemove = undefined,
}: IUploadFiles) => {
  const uploadImgButton = (
    <IconButton
      disabled={disabled}
      sx={{ color: '#424242' }}
      key={1}
      component='label'
      onClick={onClick}
    >
      <input hidden accept='image/*' type='file' onChange={onChange} />
      <Tooltip title='העלה תמונה' placement='right'>
        <PhotoCamera />
      </Tooltip>
    </IconButton>
  );

  const deleteImgButton = (
    <IconButton key={2} color='primary' onClick={onClickRemove}>
      <Tooltip title='הסר תמונה' placement='left'>
        <Delete color='error' />
      </Tooltip>
    </IconButton>
  );

  return (
    <Badge
      sx={{
        display: 'flex',
        margin: '10px',
      }}
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      badgeContent={
        <span style={{ display: 'flex', flexDirection: 'row' }}>
          {[uploadImgButton, deleteImgButton]}
        </span>
      }
    />
  );
};
export default UploadFile;
