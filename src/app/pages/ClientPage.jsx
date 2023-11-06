import React, { useEffect } from 'react';
import { Row, Col, Button} from 'antd';
import Swal from 'sweetalert2';

import { useClientStore, useUiStore } from '../../hooks';
import { LoadingPage } from '../components/common/LoadingPage';
import { TableConfigClient } from '../components/Client/TableConfigClient';
import { AddClientModal } from '../components/Client/AddClientModal';


export const ClientPage = () => {
    const { isLoadingClients, startLoadClients, errorMessage, clearErrorMessage } = useClientStore();
    const { openModal } = useUiStore();
    
    useEffect(() => {
      startLoadClients();
    },[]);

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire({
          title: 'Error', 
          text: errorMessage, 
          icon: 'error',
        }).then((result) => {
          clearErrorMessage();
        });
      }
    }, [errorMessage])

    return (
        <>
        {
          ( isLoadingClients )
            ? <LoadingPage />
            : (
              <>
              <Row>
                <Col span={ 24 } style={{ marginBottom: 15, textAlign: 'end'}}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: '#FFA500',
                      borderColor: 'white',
                    }}
                    onClick={ () => openModal()  }
                  >
                      Agregar Cliente
                  </Button>
                </Col>
              </Row>
              <TableConfigClient />
              <AddClientModal />
            </>
             
            )
           
        }
         </>
      )
}
