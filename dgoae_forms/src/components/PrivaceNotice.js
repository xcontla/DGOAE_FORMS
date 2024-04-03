import { Box, Button, Modal, Typography } from '@material-ui/core'
import React from 'react'

const PrivaceNotice = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  return (
    <div>
        <Button onClick={handleOpen} style={{color: 'white' , border : " 1px solid #fff"}}>Aviso de Privacidad</Button >
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" >
                  Aviso de Privacidad Simplificado de la Dirección de Apoyo
                  Técnico de la Dirección General de Orientación y Atención
                  Educativa de la UNAM
                </Typography>
                <br></br>
                <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                  La Dirección General de Orientación y Atención Educativa (en
                  adelante DGOAE) de la Universidad Nacional Autónoma de México,
                  por conducto de la Dirección de Apoyo Técnico, recaba datos
                  personales para el registro y administración de solicitudes de
                  servicios y programas administrados por la DGOAE. Se
                  realizarán transferencias de datos personales de conformidad
                  con las finalidades establecidas por cada programa y servicios
                  administrados por estas áreas universitarias. Podrá ejercer
                  sus derechos ARCO en la Unidad de Transparencia de la UNAM, o
                  a través de la Plataforma Nacional de Transparencia
                  (http://www.plataformadetransparencia.org.mx/). El aviso de
                  privacidad integral se puede consultar en la sección Aviso de
                  Privacidad de nuestro sitio web http://www.dgoae.unam.mx/
                </Typography>
              </Box>
            </Modal>
    </div>
  )
}

export default PrivaceNotice

/*
import { Box, Button, Modal, Typography } from '@material-ui/core'
import React from 'react'

const PrivaceNotice = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  return (
    <div>
        <Button onClick={handleOpen} style={{color: 'white' , border : " 1px solid #fff"}}>Aviso de Privacidad</Button >
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" >
                  Aviso de Privacidad Simplificado de la Dirección de Apoyo
                  Técnico de la Dirección General de Orientación y Atención
                  Educativa de la UNAM
                </Typography>
                <br></br>
                <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                  La Dirección General de Orientación y Atención Educativa (en
                  adelante DGOAE) de la Universidad Nacional Autónoma de México,
                  por conducto de la Dirección de Apoyo Técnico, recaba datos
                  personales para el registro y administración de solicitudes de
                  servicios y programas administrados por la DGOAE. Se
                  realizarán transferencias de datos personales de conformidad
                  con las finalidades establecidas por cada programa y servicios
                  administrados por estas áreas universitarias. Podrá ejercer
                  sus derechos ARCO en la Unidad de Transparencia de la UNAM, o
                  a través de la Plataforma Nacional de Transparencia
                  (http://www.plataformadetransparencia.org.mx/). El aviso de
                  privacidad integral se puede consultar en la sección Aviso de
                  Privacidad de nuestro sitio web http://www.dgoae.unam.mx/
                </Typography>
              </Box>
            </Modal>
    </div>
  )
}

export default PrivaceNotice;
*/
