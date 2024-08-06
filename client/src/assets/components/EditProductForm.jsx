import { useEffect } from 'react';
import { Form, Input, Radio, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const EditProductForm = ({ product, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nome: product.name,
      descricao: product.description,
      detalhes: product.specifications,
      acessorios: product.accessories,
      condicao: product.condition,
      imagens: product.images.map((url, index) => ({
        uid: index,
        name: `image-${index}`,
        status: 'done',
        url: url
      }))
    });
  }, [product, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.nome);
      formData.append('description', values.descricao);
      formData.append('specifications', values.detalhes);
      formData.append('accessories', values.acessorios);
      formData.append('condition', values.condicao);

      if (values.imagens) {
        values.imagens.forEach((file) => {
          if (file.originFileObj) {
            formData.append('images', file.originFileObj);
          }
        });
      }

      const response = await fetch(`http://localhost:3000/api/products/${product.name}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      message.success('Produto atualizado com sucesso!');
      window.location.reload();
      onSuccess();
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      initialValues={{
        condicao: 'Novo',
      }}
      onFinish={handleSubmit}
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
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={5}
        >
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Salvar Alterações
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
