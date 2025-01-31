import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";
import {
  StyledAreaEmployee2,
  StyledAreaInfo,
  StyledImageDocument,
  StyledAreaEmployee,
  ImageDocument,
  BoxImage,
  StyledModal,
} from "./style";
import {
  Snackbar,
  Alert,
  Modal,
  Box,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";
import { IEmployee, IUser } from "../../interfaces";
import { getFilesEmployee, handleUpload, uploadEmployeeFile } from "./methods";
import { Document, Page, pdfjs } from 'react-pdf';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ImageDocumento from "../../assets/images/document.jpg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface EmployeeListInterface {
  employeeIndex: number;
  employee: IEmployee;
  groupedEmployees: { [key: string]: IEmployee[] };
  client: boolean;
  handleOpenImage: () => void;
  openSnackbar: (severity: string, message: string) => void;
  group: any;
}

export default function EmployeeItemList(props: EmployeeListInterface) {
  const { state, dispatch } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = React.useState<File[] | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [openImage, setOpenImage] = React.useState(false);
  const [openPdf, setOpenPdf] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);
  const handleOpenPdf = () => setOpenPdf(true);
  const handleClosePdf = () => setOpenPdf(false);
  const [files, setFiles] = React.useState<IEmployee[]>([]);
  const [rg, setRg] = React.useState("");
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [selectedImageUrl, setSelectedImageUrl] = React.useState<string | null>(null);
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [openPdfModal, setOpenPdfModal] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState<string>('')

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleOpenPdfModal = () => {
    setOpenPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setOpenPdfModal(false);
  };

  const handlePdfClick = (file: File) => {
    setSelectedFile([file]);
    handleOpenPdfModal();
  };

  const increasePage = () => {
    setPageNumber(pageNumber + 1)
  }

  const decreasePage = () => {
    setPageNumber(pageNumber - 1)
  }

  React.useEffect(() => {
    const fetchRg = () => {
      if (props.groupedEmployees[props.group]) {
        const employee =
          props.groupedEmployees[props.group][props.employeeIndex];

        if (employee) {
          // Supondo que a propriedade 'rg' existe no objeto IEmployee
          const { rg } = employee;

          setRg(rg);

          // Faça o que você precisa com o valor de 'rg' aqui
          // Por exemplo, você pode atribuí-lo a uma variável ou usá-lo de alguma outra forma
        } else {
          // Lidere com o caso em que o índice do funcionário é inválido
        }
      } else {
        // Lidere com o caso em que o grupo não existe
      }
    };

    fetchRg();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleCloseFileModal = () => {
    setSelectedFile(null);
  };

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFilesEmployee();
        if (response) {
          setFiles([...files, response]);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários", error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const modifiedFilesArray = Array.from(files).map((file, index) => {
        // Substitute 'company', 'rg', and 'group' with the desired values.
        const company = props.employee.company;
        const rg = props.employee.rg;
        const group = props.employee.group;
        const extension = file.name.split('.').pop(); // Get the file extension

        const newFileName = `${company}_${rg}_${group}_${index}.${extension}`; // Append the extension to the new file name

        const modifiedFile = new File([file], newFileName, { type: file.type });

        const imageUrl = URL.createObjectURL(modifiedFile);

        setImageUrls((prevImageUrls) => [...(prevImageUrls || []), imageUrl]);
        console.log(modifiedFile, 'modifiedFile')
        return modifiedFile;
      });

      // Now, modifiedFilesArray will contain the files with modified names.
      setSelectedFile((prevSelectedFile: any) => [
        ...(prevSelectedFile || []),
        ...modifiedFilesArray,
      ]);
    }
  };

  const handleCustomButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleCloseImageModal = () => {
    setSelectedImageUrl(null);
  };

  const uploadFile = async () => {
    try {
      if (selectedFile) {
        const response = await handleUpload(selectedFile).then(() =>
          props.openSnackbar("success", "Arquivo(s) enviados")
        );
        console.log(response, 'response')
        return response;
      }
    } catch (error) {
      props.openSnackbar("error", `Erro ao enviar lista`);
      console.log(error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  // Use valores preestabelecidos para criar um novo componente
  return (
    <>
      <StyledAreaEmployee>
        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Nome Da Mãe:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.mother}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Nome do Pai:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.father}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Rg:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.rg}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Data de Nascimento:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.birthdate}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Carro:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.modelo}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Placa:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.placa}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Endereço:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.neighborhood}
          </Typography>
        </StyledAreaInfo>

        <StyledAreaInfo>
          <Typography fontSize={14} fontWeight={600} color={"black"}>
            Condição:
          </Typography>

          <Typography fontSize={14} fontWeight={400} color={"grey"}>
            {props.employee.condition}
          </Typography>
        </StyledAreaInfo>
      </StyledAreaEmployee>

      <StyledAreaEmployee2>
        {!props.client && (
          <>
            <Button
              variant="outlined"
              style={{ marginTop: 20 }}
              onClick={handleCustomButtonClick}
            >
              <input
                type="file"
                accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              POLÍCIA J.
            </Button>

            <Button
              variant="outlined"
              style={{ marginTop: 20 }}
              onClick={handleCustomButtonClick}
            >
              <input
                type="file"
                accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              PODER J.
            </Button>

            <div
              style={{ width: "100%", flexDirection: "row", display: "flex" }}
            >
              {imageUrls.map((item) => (
                <ImageDocument src={item} />
              ))}
            </div>

            <Button
              onClick={() => uploadFile()}
              variant="contained"
              style={{ marginTop: 20 }}
            >
              Enviar
            </Button>
          </>
        )}

        {props.client && (
          <Button
            onClick={() => handleOpenImage()}
            variant="contained"
            style={{ marginTop: 20 }}
          >
            Vizualizar imagem
          </Button>
        )}

        {props.client && (
          <Button
            onClick={() => handleOpenPdf()}
            variant="contained"
            style={{ marginTop: 20 }}
          >
            Vizualizar pdf
          </Button>
        )}
      </StyledAreaEmployee2>

      {/*IMAGENS*/}

      <StyledModal
        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        color="paper"
      >
        <BoxImage onContextMenu={handleContextMenu}>
          {files.flatMap((file) => {
            // Create a new Set to track unique file URLs
            const uniqueUrls = new Set();
            return file.data.map((fileUrl: string, index: number) => {
              const start = fileUrl.indexOf('_') + 1;
              const end = fileUrl.indexOf('_', start);
              const extractedValue = fileUrl.substring(start, end);

              if (extractedValue === rg && !uniqueUrls.has(fileUrl)) {
                // Add the URL to the Set to track it as seen
                uniqueUrls.add(fileUrl);
                const currentData = fileUrl.toString();
                const lastDot = currentData.lastIndexOf('.');
                const extension = currentData.substring(lastDot + 1);

                if (['png', 'jpg', 'jpeg'].includes(extension)) {
                  return (
                    <React.Fragment key={index}>
                      <StyledImageDocument
                        src={currentData}
                        alt="Imagem do documento"
                        onClick={() => handleImageClick(currentData)}
                      />
                    </React.Fragment>
                  );
                }
              }
              return null;
            });
          }).filter(component => component !== null)} {/* Filter out null and duplicate values */}
        </BoxImage>
      </StyledModal>

      {/*PDF*/}

      <StyledModal
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        color="paper"
      >
        <BoxImage onContextMenu={handleContextMenu}>
          {files.flatMap((file) => {
            // Create a new Set to track unique file URLs
            const uniqueUrls = new Set();
            return file.data.map((fileUrl: string, index: number) => {
              const start = fileUrl.indexOf('_') + 1;
              const end = fileUrl.indexOf('_', start);
              const extractedValue = fileUrl.substring(start, end);

              if (extractedValue === rg && !uniqueUrls.has(fileUrl)) {
                // Add the URL to the Set to track it as seen
                uniqueUrls.add(fileUrl);
                const currentData = fileUrl.toString();
                const lastDot = currentData.lastIndexOf('.');
                const extension = currentData.substring(lastDot + 1);

                if (extension === 'pdf') {
                  return (
                    <div key={index}>
                    <Document
                      file={currentData}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page renderTextLayer={false}  pageNumber={pageNumber} />
                    </Document>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        onClick={decreasePage}
                        disabled={pageNumber <= 1}
                        aria-label="página anterior"
                      >
                        <ChevronLeftIcon />
                      </IconButton>
                      <p>Página {pageNumber} de {numPages}</p>
                      <IconButton
                        onClick={increasePage}
                        disabled={pageNumber >= numPages}
                        aria-label="next page"
                      >
                        <ChevronRightIcon  />
                      </IconButton>
                    </div>
                  </div>
                  );
                }
                return null;
              }
            });
          }).filter(component => component !== null)} {/* Filter out null and duplicate values */}
        </BoxImage>
      </StyledModal>

      <StyledModal
        open={!!selectedImageUrl} // Open modal if there is a selected image URL
        onClose={handleCloseImageModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        color="paper"
      >
        <BoxImage>
          <img
            src={selectedImageUrl ?? ''}
            alt="Selected document"
            style={{ width: '100%', height: 'auto' }}
          />
        </BoxImage>
      </StyledModal>
    </>
  );
}
