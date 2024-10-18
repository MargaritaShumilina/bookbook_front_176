import { config } from "../../utils/utils";

function Card(props) {
    const { cards, setCloseSubjectRent, setOpenRent, 
            setCurrentSubject, setTotalPrice, currency } = props;
    const isLoading = false; //const [isLoading, setIsLoading] = useState(false);

    const handleClickButton = (item) => {
        setCurrentSubject(item);
        setTotalPrice(item.booking_price);
        setCloseSubjectRent();
        setOpenRent();
      };

    return (
        <article className="card" key={cards.id}>
            <figure className="card__figure">
                <img className="card__image" alt={ cards.description } src={ cards.main_image }/>
                <figcaption className="card__figcaption">{cards.title}</figcaption>
            </figure>
            <p className="card__price">{config.priceFrom}&ensp;<span className="card__price-number">{cards.booking_price} { currency }</span>/{config.priceDay}</p>  
            <button 
                type="button"
                onClick={() => handleClickButton(cards)}
                key={cards.id}
                className="card__book">
                    {isLoading ? "Loading..." : config.book}
            </button>
        </article> 
    );
}

export default Card;
