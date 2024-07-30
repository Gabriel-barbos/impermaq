import './admin.css';
import { Button, Modal,} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import  { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
import ProductAdmin from '../../assets/components/product-admin';
import CreateProductForm from '../../assets/components/CreateProductForm';


const Admin = () => {
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //read prod
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  //effect do list de prod
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  const showModal = () => {
    setOpen(true);
  };

//modal c
  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
      <div className="admin-page">
        <h1>Gestão de Produtos</h1>
        <Button type="primary" shape="primary" onClick={showModal} icon={<PlusOutlined />} size={24}>
          Adicionar Novo
        </Button>
        <Modal
          open={open}
          title="Adicionar Produto"
          
          onCancel={handleCancel}
          footer={[
            <Button key="back" danger onClick={handleCancel}>
              Cancelar
            </Button>,
           
          ]}
        >
          <CreateProductForm/>
        </Modal>
      </div>



      <div className="space-align-container">
      {products.map((product) => (
        <ProductAdmin key={product._id} product={product} />
      ))}
    </div>

    </>
  );
};

export default Admin;