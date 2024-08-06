import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import placeholder from '../img/placeholder.png';
import '../styles/product-card.css';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/product/${product.name}`); // Redirecionar pelo nome do produto
  };

  return (
    <>
      <Card
        style={{
          width: 300,
          padding: 10,
        }}
      >
        <div className="product-container">
          <img src={placeholder} alt={product.name} />
          <p className="name">{product.name}</p>
          <button onClick={handleViewMore}>VER MAIS</button>
        </div>
      </Card>
    </>
  );
}

export default ProductCard;
