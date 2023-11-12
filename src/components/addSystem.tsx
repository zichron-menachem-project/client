import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import systemStore from '../store/SystemStore';
import swal from 'sweetalert';

interface props {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddSystem: React.FC<props> = ({ setOpenAdd }: props) => {

  const inputTopic = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();
  const inputUrl = useRef<HTMLInputElement>();
  const inputObjectName = useRef<HTMLInputElement>();
  const inputDescription = useRef<HTMLInputElement>();
  const inputEmail = useRef<HTMLInputElement>();
  const inputPhone = useRef<HTMLInputElement>();

  const allFieldsAreFilled = () => {
    if (!inputTopic.current?.value || !inputName.current?.value || !inputUrl.current?.value ||
      !inputObjectName.current?.value || !inputDescription.current?.value) {
      swal("Fill Fields!",
        "All the fields that marked with * is required!",
        "error");
      return false;
    }
    if (!inputEmail.current?.value && !inputPhone.current?.value) {
      swal("Fill Fields!",
        "we are must your communication details give as your email or phone!",
        "error");
      return false;
    }
    return true;
  }

  const handleCloseAndSave = async () => {
    if (allFieldsAreFilled()) {
      const systemToSave = {
        topic: inputTopic.current?.value || '',
        urlName: inputName.current?.value || '',
        urlImg: inputUrl.current?.value || '',
        objectName: inputObjectName.current?.value || '',
        adminUid: "",
        description: inputDescription.current?.value || '',
        communicationDetails: {
          email: inputEmail.current?.value || '',
          phone: inputPhone.current?.value || '',
        }
      }
      await systemStore.addSystem(systemToSave);
      close();
      swal({
        title: "Saved!",
        text: "your system created successfully!",
        icon: "success",
        button: "ok!",
      } as any);
    }
  };

  const close = () => setOpenAdd(false);

  return (
    <Dialog
      open={true}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Add your system details"}
      </DialogTitle>
      <DialogContent >
        <DialogContentText id="alert-dialog-description" />
        <TextField id="outlined-basic"
          inputRef={inputTopic}
          label="Topic"
          variant="outlined"
          sx={{ margin: '3%' }}
          required={true} />
        <TextField id="outlined-basic"
          inputRef={inputName}
          label="Name"
          variant="outlined"
          sx={{ margin: '3%' }}
          required={true} />
        <TextField id="outlined-basic"
          inputRef={inputUrl}
          label="Url image"
          variant="outlined"
          sx={{ margin: '3%' }}
          required={true} />
        <TextField id="outlined-basic"
          inputRef={inputObjectName}
          label="Object name"
          variant="outlined"
          sx={{ margin: '3%' }}
          required={true} />
        <TextField id="outlined-basic"
          inputRef={inputDescription}
          label="Description"
          variant="outlined"
          sx={{ margin: '3%' }}
          required={true} />
        <TextField id="outlined-basic"
          inputRef={inputEmail}
          label="Email system"
          variant="outlined"
          sx={{ margin: '3%' }} />
        <TextField id="outlined-basic"
          inputRef={inputPhone}
          label="Phone system"
          variant="outlined"
          sx={{ margin: '3%' }} />
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={close}>Cancel</Button>
        <Button color='error' onClick={handleCloseAndSave} autoFocus>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

