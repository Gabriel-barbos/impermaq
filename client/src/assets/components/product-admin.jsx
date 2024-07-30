
import  { useState } from 'react';
import placeholder from '../img/placeholder.png'
import '../styles/productAdmin.css'
import {  Modal, Card } from 'antd';
import EditProductForm from './EditProductForm';




const ProductAdmin = ({ product }) => {
  
  //modal config
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
 
  const handleCancel = () => {
    setOpen(false);
  };
  

  return (
    <>
      <Card
        style={{
          width: 300,
          padding: 10,
        }}
      >
        <div className="Aproduct-container">
          <img src={placeholder} />
          <p className="name">{product.name}</p>

          <button className="edit-btn" onClick={showModal}>
            EDITAR
          </button>
          <Modal
          open={open}
          title="Editar Produto"
          
          onCancel={handleCancel}
          footer={[
            
          ]}>

            <EditProductForm/> 
          </Modal>
          <button
            className="delete-btn"
            onClick={() => {
              Modal.confirm({
                title: "Deleter um produto",
                content: "Você tem certeza que deseja deletar esse produto ",
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn onClick={} />
                  </>
                ),
              });
            }}
          >
            EXCLUIR
          </button>
        </div>
      </Card>
    </>
  );
};
export default ProductAdmin;