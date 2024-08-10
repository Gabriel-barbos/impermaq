import { Form, Input, Radio, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const CreateProductForm = () => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);  // Ajustado para 'name'
      formData.append('description', values.description);  // Ajustado para 'description'
      formData.append('specifications', values.specifications);  // Ajustado para 'specifications'
      formData.append('accessories', values.accessories);  // Ajustado para 'accessories'
      formData.append('condition', values.condition);  // Ajustado para 'condition'

      if (values.images) {
        values.images.forEach((file) => {
          formData.append('images', file.originFileObj);
        });
      }

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to create product');
      }

      message.success('Produto criado com sucesso!');
      form.resetFields();
      window.location.reload();
      
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
        condition: 'Novo',  // Ajustado para 'condition'
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Nome"
        name="name"  // Ajustado para 'name'
        rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Imagens"
        name="images"  // Ajustado para 'images'
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card" beforeUpload={() => false} multiple>
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

      <Form.Item label="Descrição" name="description">  
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Detalhes" name="specifications">  
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Acessórios" name="accessories">  
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Condição" name="condition">  
        <Radio.Group>
          <Radio value="Novo">Novo</Radio>
          <Radio value="Usado">Usado</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Criar Produto
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductForm;
