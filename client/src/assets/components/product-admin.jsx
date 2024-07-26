
import  { useState } from 'react';
import placeholder from '../img/placeholder.png'
import '../styles/productAdmin.css'
import { Button, Modal, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Radio,
  Upload,
} from 'antd';


const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductAdmin = () => {
  
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
          <p className="name">Torno mecânico VM4133</p>

          <button className="edit-btn" onClick={showModal}>
            EDITAR
          </button>
          <Modal
            open={open}
            title="Editar Produto"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" danger onClick={handleCancel}>
                Cancelar
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
              >
                Salvar
              </Button>,
            ]}
          >
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item label="Nome:">
                <Input />
              </Form.Item>

          
              <Form.Item
                label="Imagem Principal"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Adicionar Imagens
                    </div>
                  </button>
                </Upload>
              </Form.Item>

           
              <Form.Item
                label="Imagens"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Adicionar Imagens
                    </div>
                  </button>
                </Upload>
              </Form.Item>

              <Form.Item label="Descrição">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Detalhes">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Acessorios">
                <TextArea rows={4} />
              </Form.Item>


              <Form.Item label="Condição">
                <Radio.Group>
                  <Radio value="apple"> Novo </Radio>
                  <Radio value="pear"> Usado </Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
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
                    <OkBtn />
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