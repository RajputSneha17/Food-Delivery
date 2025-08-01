import React, { useContext } from 'react';  // <-- Import useContext here
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext); // Access food_list from context

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    if (category === 'All' || category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                price={item.price} 
                                description={item.description} 
                                image={item.image} 
                            />
                        );
                    } 
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
