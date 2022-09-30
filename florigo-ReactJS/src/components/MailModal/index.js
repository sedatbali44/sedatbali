import { useRef } from 'react';

import { Card, CardContent, Typography, Grid, CardActions, TextField, Divider, blue } from '@components';
import Modal from '@mui/material/Modal';
import { CustomButton } from 'components/CustomButtons';
import { Editor } from '@tinymce/tinymce-react';

import useWindowDimensions from 'hooks/useWindowDimensions';

function MailModal({
  mailModal,
  content = '',
  setContent = () => {},
  to = '',
  setTo = () => {},
  subject = '',
  setSubject = () => {},
  onCancel = () => {},
  sendHandler = () => {},
  children,
}) {
  const windowDimensions = useWindowDimensions();
  const editorRef = useRef(null);

  return (
    <Modal
      open={mailModal}
      onClose={() => {
        onCancel(false);
      }}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card sx={{ maxWidth: 850, minWidth: 360, height: windowDimensions.height - 100, overflow: 'auto' }}>
        <CardContent>
          <Typography variant="h6" color={blue[500]}>
            # Mail To Florist
          </Typography>
        </CardContent>
        {children && <CardContent>{children}</CardContent>}
        <Divider></Divider>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="To"
                fullWidth
                size="small"
                sx={{ borderRadius: 1, marginBottom: 2 }}
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                fullWidth
                size="small"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Editor
                apiKey="z6lefbjka85vylta3k1pwrhyeaf6vzgb2ox9isfsudv1pz8o"
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={content}
                init={{
                  selector: '#tinymce',
                  branding: false,
                  height: 700,
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={(e) => {
                  setContent(e);
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider></Divider>
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 3 }}>
          <CustomButton
            onClick={() => {
              onCancel(false);
            }}
            color="error"
            icon={'icons8:cancel'}
          >
            Cancel
          </CustomButton>
          <CustomButton
            color="primary"
            onClick={() => {
              sendHandler();
            }}
            icon={'carbon:mail-reply'}
          >
            Send
          </CustomButton>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default MailModal;
