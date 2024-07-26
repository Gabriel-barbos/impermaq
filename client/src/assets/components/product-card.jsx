import { Card } from "antd"
import placeholder from '../img/placeholder.png'
import '../styles/product-card.css'

function ProductCard(){
return(
    <>
    <Card
    style={{
      width: 300,
      padding: 10,
    }}>
    <div className="product-container">
    <img src={placeholder}/>
    <p className="name">Torno mecânico VM4133</p>
    <p className="price">R$ 46.580,06</p>
        <button>VER MAIS</button>
    </div>
  </Card>
    </>
)
}

export default ProductCard