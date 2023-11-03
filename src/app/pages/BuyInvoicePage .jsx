import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigInvoice } from '../components/buyInvoice/TableConfigInvoice';
import { AddInvoiceModal } from '../components/buyInvoice/AddInvoiceModal';
import { useBuyInvoiceStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';
import { LoadingPage } from '../components/common/LoadingPage';
import Swal from 'sweetalert2';

export const BuyInvoicePage = () => {
  const { openModal } = useUiStore();
  const { startLoadingBuyInvoices, isLoadingBuyInvoices, activeProductType, errorMessage, clearErrorMessage } = useBuyInvoiceStore();

  useEffect(() => {
    startLoadingBuyInvoices(activeProductType);
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
  }, [errorMessage]);

  return (
    <>
    {
      (isLoadingBuyInvoices)
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
                Agregar Compra
            </Button>
          </Col>
        </Row>
        <TableConfigInvoice />
        <AddInvoiceModal />
        </>
      )
    }
    </>
)
}
