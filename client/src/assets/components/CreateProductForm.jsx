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
      const images = values.imagens.map((file) => file.url || URL.createObjectURL(file.originFileObj));

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.nome,
          images: images,
          description: values.descricao,
          specifications: values.detalhes,
          accessories: values.acessorios,
          condition: values.condicao
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      message.success('Produto criado com sucesso!');
      form.resetFields();
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
        <Upload listType="picture-card" beforeUpload={() => false}>
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
          Criar Produto
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductForm;
