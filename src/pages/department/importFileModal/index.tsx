/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFileOutlined } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import {
  loadExcelData,
  parceSubheaderFile,
  parseExcelFile,
} from '../../../utils/parseFile';
import ExcelTable from '../../../components/excelTable';
import * as xlsx from 'xlsx';

interface ImportFileModalProps {
  isShowModal?: boolean;
  onUpload?: (data: any) => void;
  onClose?: () => void;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '400px',
  minHeight: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
};

const ImportFileModal = ({
  isShowModal = false,
  onUpload,
  onClose,
}: ImportFileModalProps) => {
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState<any>([]);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);

      const parsedData: any = await loadExcelData(file);
      setFileData(parsedData);
    } else {
      setFileName('');
      setFileData([]);
    }
  };

  const handleUploadFile = () => {
    onUpload && onUpload(fileData);
    handleClose();
  };

  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h5' gutterBottom>
          Import data
        </Typography>
        <Box sx={{ my: 2 }}>
          <Box sx={{ my: 1 }}>
            <Button
              disabled={!fileData.length}
              onClick={handleUploadFile}
              variant='contained'
              sx={{ mr: 1 }}
            >
              Upload
            </Button>

            <Button variant='outlined' component='label'>
              <UploadFileOutlined /> Import
              <input
                type='file'
                hidden // Hide the actual file input
                accept='.xlsx, .csv'
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
          {fileData.length > 0 && (
            <Typography variant='body2' sx={{ color: '#666' }}>
              File imported: {fileName}
            </Typography>
          )}
        </Box>

        {!(fileData.length > 0) ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #ccc',
              width: '100%',
              height: '100%',
              borderRadius: '5px',
            }}
          >
            <Typography variant='h4' sx={{ color: '#ccc' }}>
              No data
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              height: '400px',
              maxWidth: '1000px',
              width: '100%',
              overflow: 'scroll',
            }}
          >
            <ExcelTable data={fileData} />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ImportFileModal;
