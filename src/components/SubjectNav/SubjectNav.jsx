import React from "react";
import Card from "../Card/Card.jsx";
import { config } from "../../utils/utils.js";

const SubjectNav = React.memo((props) => {
    const { cards, setCloseSubjectRent, setOpenRent, 
          setCurrentSubject, setTotalPrice, currency="EUR" } = props;
    const cardsToRender = cards ? cards.map((item) => {
      
        return (
          <Card
            cards={item}
            currency={currency}
            setCloseSubjectRent={setCloseSubjectRent}
            setOpenRent={setOpenRent}
            setCurrentSubject={setCurrentSubject}
            setTotalPrice={setTotalPrice}
            key={item.id}
          />
        );
    }) : [];

  return (
    <div className="subject-nav">
        <h2 className="subject-nav__title">{config.title}</h2>
        <div className="cards__container">
        <section className="cards" aria-label="Галерея субьектов записи"> 
          {cardsToRender}
        </section>
      </div>
    </div>
  );
});

export default SubjectNav;
