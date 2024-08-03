import { useState } from 'react';
import placeholder from '../img/placeholder.png';
import '../styles/productAdmin.css';
import { Modal, Card, message } from 'antd';
import EditProductForm from './EditProductForm';

const ProductAdmin = ({ product, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);

  // Função para mostrar o modal de edição
  const showModal = () => {
    setOpen(true);
  };

  // Função para fechar o modal de edição
  const handleCancel = () => {
    setOpen(false);
  };

  
  const handleEditSuccess = () => {
    setOpen(false);
    onEdit(); 
    // Atualiza a lista de produtos após a edição
  };


  // Função para deletar o produto
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${product._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      message.success('Produto excluído com sucesso!');
      onDelete(product._id);
    } catch (error) {
      message.error(error.message);
    }
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
          <img src={placeholder} alt="Product" />
          <p className="name">{product.name}</p>

          <button className="edit-btn" onClick={showModal}>
            EDITAR
          </button>
          <Modal
            open={open}
            title="Editar Produto"
            onCancel={handleCancel}
            footer={[]}
          >
            <EditProductForm product={product} onSuccess={handleEditSuccess} />
          </Modal>
          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            EXCLUIR
          </button>
        </div>
      </Card>
    </>
  );
};

export default ProductAdmin;
