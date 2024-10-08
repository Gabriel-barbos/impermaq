import { useState, useEffect } from 'react';
import placeholder from '../../assets/img/placeholder1.png';
import '../styles/productAdmin.css';
import { Modal, Card, message } from 'antd';
import EditProductForm from './EditProductForm';

const ProductAdmin = ({ product, onDelete  }) => {
  const [open, setOpen] = useState(false);

  // Acessa o primeiro item do array de imagens, agora usando 'images'
  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

  // Log para verificar o caminho da imagem
  useEffect(() => {
    console.log('Product Image:', productImage);
  }, [productImage]);

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
     
    // Atualiza a lista de produtos após a edição
  };

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
          {/* Verifica se a primeira imagem existe, se não, usa a placeholder */}
          <img src={productImage ? `http://localhost:3000${productImage}` : placeholder} alt="Product" />
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
