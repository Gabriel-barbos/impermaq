import { Form, Input, Radio, Upload, Button,  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const EditProductForm = () => {

    const [form] = Form.useForm();
    
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    

const handleSubmit = async () => {

}

    return(
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
        Salvar Alterações
      </Button>
    </Form.Item>
  </Form>
);
}
export default EditProductForm;
