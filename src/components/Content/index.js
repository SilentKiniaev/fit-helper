import React from 'react';
import {Route} from 'react-router-dom';
import Products from '../Products/index';
import Product from '../Product/index';
import BMR from '../BMR';
import BMI from '../BMI';
import HomePage from '../HomePage';
import FoodBasket from '../FoodBasket';
import Articles from '../Articles';
import Calculators from '../Calculators';
import './style.scss';


export default class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="top-button"></div>
                <Route path ="/" component={HomePage} exact />
                <Route path="/products" render={() => <Products pageCapacity = {5}/>} exact/>
                <Route path="/products/:id" render={ ({match}) => <Product id={match.params.id} key={match.params.id}/> }/>
                <Route path="/calculators" component={Calculators} exact/>
                <Route path="/calculators/bmi" component={BMI}/>
                <Route path="/calculators/bmr" component={BMR}/>
                <Route path="/calculators/food-basket" component={FoodBasket}/>
                <Route path="/articles" component={Articles}/>
            </div>
        );
    }
}