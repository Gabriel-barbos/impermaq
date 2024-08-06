import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from "../../assets/components/Backbutton";
import './product.css';
import placeholder from '../../assets/img/placeholder.png';
import logo_placeholder from '../../assets/img/logo_placeholder.jpeg';

function ProductPage() {
  const { name } = useParams(); // Obtém o nome do produto dos parâmetros da URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Buscando produto com nome: ${name}`); // Log para verificar o nome
        const response = await fetch(`/api/products/name/${name}`);
        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }
        const data = await response.json();
        console.log('Produto encontrado:', data); // Log do produto encontrado
        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setProduct(null); // Garantir que o estado do produto seja null em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [name]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <BackButton />
      <div className="product-page">
        <div className="product-top">
          <div className="img-container">
            <img src={product.images && product.images.length > 0 ? `/${product.images[0]}` : placeholder} className="main-img-p" alt="Produto" />
            <div className="mini-img-container">
              {product.images && product.images.length > 1 ? (
                product.images.slice(1).map((image, index) => (
                  <img key={index} src={`/${image}`} alt="Produto" />
                ))
              ) : (
                <>
                  <img src={placeholder} alt="placeholder" />
                  <img src={placeholder} alt="placeholder" />
                  <img src={placeholder} alt="placeholder" />
                  <img src={placeholder} alt="placeholder" />
                </>
              )}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <span>{product.condition}</span> {/* Substitua por lógica de badge */}
            <button className="buy-now">Solicitar Orçamento</button>
            <h3>Descrição</h3>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="product-bottom">
          <div className="product-bottom-left">
            <h3>Especificações</h3>
            <p>{product.specifications}</p>
          </div>

          <div className="product-bottom-right">
            <h3>Acessórios</h3>
            <p>{product.accessories}</p>
          </div>
        </div>

        <h1 className="duvidas">Dúvidas?</h1>
        <div className='button-duvidas'>
          <button>Fale com nosso time</button>
        </div>
      </div>

      <footer>
        <div className='footer-container'>
          <div className='footer-left'>
            <p>
              Contatos <br />
              cel. 55 11 994407006<br />
              Email <br />
              yuri.alberto@corinthians.com
            </p>
          </div>
          <div className='footer-middle'>
            <img src={logo_placeholder} alt="Logo" />
            <h4>© 2024. Site desenvolvido por Gabriel Barbosa Da Silva</h4>
          </div>
          <div className='footer-right'>
            <p>
              Horário de funcionamento<br />
              Seg - Sex / 9:00 - 18:00 Hs.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ProductPage;
