import { Card } from "antd"
import placeholder from '../img/placeholder.png'
import '../styles/product-card.css'

function ProductCard({ product }){
return(
    <>
    <Card
    style={{
      width: 300,
      padding: 10,
    }}>
    <div className="product-container">
    <img src={placeholder}/>
    <p className="name">{product.name}</p>
        <button>VER MAIS</button>
    </div>
  </Card>
    </>
)
}

export default ProductCard