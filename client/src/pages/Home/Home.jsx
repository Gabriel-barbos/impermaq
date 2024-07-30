import './home.css'
import Navbar from '../../assets/components/navbar';

import main from '../../assets/img/main.png'

// icons
import romi_logo from '../../assets/img/romi_logo.png'
import schneider_logo from '../../assets/img/schneider_logo.png'
import siemens_logo from '../../assets/img/siemens_logo.png'
import weg_logo from '../../assets/img/weg_logo.png'
import book_icon from '../../assets/img/icons/book.svg'
import check_icon from '../../assets/img/icons/checklist.svg'
import key_icon from  '../../assets/img/icons/tool.svg'
import logo_placeholder from '../../assets/img/logo_placeholder.jpeg'
import money_icon from  '../../assets/img/icons/coin.svg'
import phone_icon from '../../assets/img/icons/phone.svg'
import card_icon from '../../assets/img/icons/card.svg'
import checkitem_icon from '../../assets/img/icons/check.svg'
import mail from '../../assets/img/icons/mail.svg'
import wpp from '../../assets/img/icons/wpp.svg'
//components
import { ArrowUpRight } from 'lucide-react';

import { fetchProducts } from '../../api';
import  { useEffect, useState } from 'react';
import ProductCard from '../../assets/components/product-card';



function Home(){

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  

const EmailClick = () => {
  const url = `mailto:yurialberto@corinthians.com?subject=}&body=`;
  window.open(url, '_blank');
};

  return (
    <>
      <Navbar />
      {/* Home */}
      <div className="main-menu">
        <div className="main-menu__content">
          <img src={main} className="main-image" />
          <h1 className="menu-title">
            Seu Parceiro em Máquinas Industriais de Confiança
          </h1>
        </div>
      </div>

      {/* Brands */}

      <section className="brands">
        <h2>Trabalhamos com as principais marcas do mercado</h2>

        <ul className="brands_list">
          <li className="brands_item">
            <img className="brand_logo" src={romi_logo} />
          </li>

          <li className="brands_item">
            <img className="brand_logo" src={schneider_logo} />
          </li>

          <li className="brands_item">
            <img className="brand_logo_big" src={siemens_logo} />
          </li>

          <li className="brands_item">
            <img className="brand_logo_small" src={weg_logo} />
          </li>
        </ul>
      </section>

      {/* Maquinas */}

      <section className="machines-container">
        <h1>Máquinas</h1>
        
        <div className="space-align-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>




        <button className="see-all-btn">
          <span className="button-text">VER MAIS</span>
          <ArrowUpRight className="icon" />
        </button>
      </section>

      <section className="services">
        <h1>Serviços</h1>
        <div className="services-list">
          <div className="service-card">
            <div className="service-container">
              <div className="icon-container">
                <img src={check_icon} className="service-image" />
              </div>
              <h3 className="service-title">Manutenção Preventiva</h3>
              <button >Entre em contato</button>
            </div>
          </div>

          <div className="service-card">
            <div className="service-container">
              <div className="icon-container">
                <img src={key_icon} className="service-image" />
              </div>
              <h3 className="service-title">Manutenção Corretiva</h3>
              <button  >Entre em contato</button>
            </div>
          </div>

          <div className="service-card">
            <div className="service-container">
              <div className="icon-container">
                <img src={book_icon} className="service-image" />
              </div>
              <h3 className="service-title">Consultoria</h3>
              <button >Entre em contato</button>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className='about'>
        <h1>Sobre nós</h1>
        <div className='about-container'>
          <div className='about-text'>
            <p>
            t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
            </p>
          </div>
            <img src= {logo_placeholder} alt="Logo" className="logo" />
        </div>
        
        
        <div className='skills-container'>

         <div className='skill-card'>
          <img src={money_icon} />
          <h3>Preço justo</h3>
         </div>
          
         <div className='skill-card'>
          <img src={card_icon} />
          <h3>Melhores Condições</h3>
         </div>

         <div className='skill-card'>
          <img src={checkitem_icon} />
          <h3>Garantia Estendida</h3>
         </div>

         <div className='skill-card'>
          <img src={phone_icon} />
          <h3>Suporte Rápido</h3>
         </div>

            </div>
      </section>

{/* CONTATO */}
<section className='contact'>

<h1>Contato</h1>

<div className='contact-container'>

<div className='contact-card'>
  <h2>Fale com nosso time via E-mail</h2>
  <img src={mail} />
  <div className='button-email'>
  <button onClick={EmailClick}>yuri.alberto@corinthians.com.br</button>
  </div></div>

<div className='contact-container'>
<div className='contact-card'>
  <h2>Fale com nosso time WhatsApp</h2>
  <img src={wpp} />
  
  <div className='button-wpp'>
  <button >Clique Aqui</button>
  </div>
</div>
</div>
</div>
</section>

<footer>
  <div className='footer-container'>
    <div className='footer-left'>
   <p> 
  Contatos <br/>
  cel. 55 11 994407006<br/>

Email <br/>
yuri.alberto@corinthians.com
</p>
    </div>
    <div className='footer-middle'>
        <img src={logo_placeholder}></img>
        <h4>© 2024. Site desenvolvido por Gabriel Barbosa Da Silva</h4>
        </div>
    <div className='footer-right'>
 <p> 
  Hórario de funcionamento<br/>
  Seg - Sex / 9:00 - 18:00 Hs.
    </p>
    </div>
  </div>
</footer>
    </>
  );
}
export default Home;