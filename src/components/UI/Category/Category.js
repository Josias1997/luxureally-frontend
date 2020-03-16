import React from 'react';
import Food from './../Food/Food';
import { baseURL } from './../../../config';

const Category = ({category}) => {
    return (
        <div id={category._id} className="menu-category">
            <div className="menu-category-title collapse-toggle" role="tab" data-target={`#menu${category._id}Content`} data-toggle="collapse" aria-expanded="true">
                <div className="bg-image">
                    <img src={baseURL + category.image} alt=""/>
                </div>
                <h2 className="title">{category.title}</h2>
            </div>
            <div id={`menu${category._id}Content`} className="menu-category-content padded collapse show">
                <div className="row gutters-sm">
                {
                    category.foods.map(food => <Food key={food._id} food={food} />)
                }
                </div>
            </div>
        </div>
    )
};

export default Category;