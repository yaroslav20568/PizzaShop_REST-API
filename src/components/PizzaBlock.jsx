import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { addPizzaToCart } from './../redux/actions/importActions';

const PizzaBlock = ({ id, imageUrl, name, types, sizes, price }) => {
    types = JSON.parse(types);
    sizes = JSON.parse(sizes);
    const dispatch = useDispatch();
    const typesArray = ['Тонкое', 'Традиционное'];
    const sizesArray = [26, 30, 40];
    const [activeType, setActiveType] = useState(
        JSON.parse(sessionStorage.getItem(`activeType=${id}`)) || types[0]
    );
    const [activeSize, setActiveSize] = useState(
        JSON.parse(sessionStorage.getItem(`activeSize=${id}`)) || sizesArray.findIndex(size => size === sizes[0])
    );
    
    const { items } = useSelector(({ cart } )=> ({
        items: cart.items
    }));

    const onSelectType = index => {
        setActiveType(index);
        sessionStorage.setItem(`activeType=${id}`, index);
    };

    const onSelectSize = index => {
        setActiveSize(index);
        sessionStorage.setItem(`activeSize=${id}`, index);
    };

    const onAddPizzaToCart = () => {
        dispatch(addPizzaToCart({
            id,
            imageUrl,
            name,
            type: typesArray[activeType],
            size: sizesArray[activeSize],
            price
        }))
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        typesArray.map((type, index) => 
                        <li 
                            key={`type_${index}`}
                            className={classnames({
                                'active': activeType === index,
                                'disabled': !types.includes(index)
                            })}
                            onClick={() => onSelectType(index)}
                        >
                            {type}
                        </li>)
                    }
                </ul>
                <ul>
                    {
                        sizesArray.map((size, index) => 
                        <li 
                            key={`size_${index}`}
                            className={classnames({
                                'active': activeSize === index,
                                'disabled': !sizes.includes(size)
                            })}
                            onClick={() => onSelectSize(index)}
                        >
                            {size} см.
                        </li>)
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <button className="button button--outline button--add" onClick={onAddPizzaToCart}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{items[id] ? items[id].items.length : 0}</i>
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;
