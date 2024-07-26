import './admin.css';
import { useState } from 'react';
import { Button, Modal, Form, Input, Radio, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await axios.post('http://localhost:3000/api/produtos', values);
      message.success('Produto criado com sucesso!');
      form.resetFields();
      setOpen(false);
    } catch (error) {
      message.error('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" danger onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Salvar
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            initialValues={{
              condicao: 'Novo', // Valor padrão para "Condição"
            }}
          >
            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Imagens"
              name="imagens"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: 'none',
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

            <Form.Item label="Descrição" name="descricao">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Detalhes" name="detalhes">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Acessórios" name="acessorios">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Condição" name="condicao">
              <Radio.Group>
                <Radio value="Novo">Novo</Radio>
                <Radio value="Usado">Usado</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Admin;
