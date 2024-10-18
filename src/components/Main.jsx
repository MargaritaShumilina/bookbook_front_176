import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function Main({setCards, setOpenSubject, setOpenSuccess, setOpenSuccessWithError }) {

    const { id } = useParams(); // Получаем ID из URL
    
    React.useEffect(() => {
        const fetchData = async () => {
          try {
            if (id) {
                console.log(`User ID: ${id}`);
                }
            // Запрашиваем данные о мерчантах
            const merchantData = await api.getMerchantData(id);
            const currency = merchantData.data[0].currency;
            // Используем данные о мерчантах для запроса субъектов
            const subjectsData = await api.getSubjectsData(merchantData.data[0].id);
            setCards({ subjectsData, currency }); // Сохраняем данные субъектов
          } catch (error) {
            console.error(error);
          }
        };
        fetchData(); // Вызываем асинхронную функцию
      }, [id]);

    return (
        <>
            <form className="submit__form">
                    <button 
                        type="button"
                        className="main__button"
                        onClick={setOpenSubject}
                    >
                        Добавить субьект записи
                    </button>

                    <button
                        type="button"
                        className="main__button"
                        onClick={setOpenSuccess}
                    >
                        Попап успех
                    </button>

                    <button 
                        type="button"
                        className="main__button"
                        onClick={setOpenSuccessWithError}
                    >
                        Попап провал
                    </button>  
            </form>
        </>
    );
}

export default Main;
