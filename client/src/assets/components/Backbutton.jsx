import '../styles/backbutton.css'
import { ArrowLeftToLine } from 'lucide-react';

function BackButton () {
    const handleClick = () => {
        window.history.back();
      };

    return(
        <button className="back-btn">
<ArrowLeftToLine size={30} strokeWidth={1.5} />        
<span className="back-text" onClick={handleClick} >VOLTAR</span>
      </button>
    )
}

export default BackButton;