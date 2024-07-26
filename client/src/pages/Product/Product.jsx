import BackButton from "../../assets/components/Backbutton";
import './product.css'
import placeholder from '../../assets/img/placeholder.png'
import logo_placeholder from '../../assets/img/logo_placeholder.jpeg'

function ProductPage () {
    const WppClick = () => {
        window.open('https://wa.me/5511999999999?text=Olá,')
      }

    return(
        <>
<BackButton />
<div className="product-page">
    <div className="product-top">
        <div className="img-container">
            <img src={placeholder} className="main-img-p"/>
                <div className="mini-img-container">
                    <img src={placeholder} alt="placeholder"/>
                    <img src={placeholder} alt="placeholder"/>
                    <img src={placeholder} alt="placeholder"/>
                    <img src={placeholder} alt="placeholder"/>
                </div>
        </div>

        <div className="product-info">  
            <h1>Furadeira Fresadora de Alto Desempenho Manrod modelo MR-235</h1>
            USADO {/*  substituir por logica de badge */}
            <button className="buy-now" onClick={window.open()}>Solicitar Orçamento</button>
            <h3>Descrição</h3>
            <p>
            Máquina com estrutura em ferro fundido, coluna e mesa de coordenadas com guias prismáticas que tornam este modelo extremamente robusto e preciso.Fornecido com motor BRUSHLESS (sem escovas) que garante ao equipamento maior torque, resistência e baixo consumo de energia.
            </p>
          

        </div>
    </div>

    <div className="product-bottom">
     <p className="product-bottom-left">
     <h3>Especificações</h3>
        Máquina com estrutura em ferro fundido, coluna e mesa de coordenadas com guias prismáticas que tornam este modelo extremamente robusto e preciso.Fornecido com motor BRUSHLESS (sem escovas) que garante ao equipamento maior torque, resistência e baixo consumo de energia.
        Marca ManrodModelo MR-235Capacidade máxima de furação: 25 mmCapacidade máxima de rosquear: M12 (*)Capacidade máxima de fresar de topo: 16 mmCapacidade máxima de facear: 50 mmEncaixe do eixo-árvore: CM3
    </p>

     <p className="product-bottom-right">
     <h3>Acessorios</h3>
     1 – Mandril com chave de 1 a 13 mm, encaixe B161 – Saca bucha1 – Almotolia1 – Chave de pino3 – Chaves fixas de: 8×10 mm, 14×17 mm, 17×19 mm4 – Chaves allen de: 3, 4, 5 e 6 mm1 – Chave allen com cabo de 8 mm2 – Porcas tipo “T” 12 mm4 – Pés c/regulagemNão acompanha a bancada.
    </p>
    </div>
            <h1 className="duvidas">Duvidas?</h1>
            <div className='button-duvidas'>
             <button onClick={WppClick}>Fale com nosso time</button>
             </div>
</div>

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
    )
}
export default ProductPage;