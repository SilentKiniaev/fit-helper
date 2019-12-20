import React from 'react';
import './style.scss';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearchField from '../SearchField';
import {objToArr} from "../../helper";
import Paginator from '../Paginator';
import {loadAllProducts} from "../../ActionCreator";

class Products extends React.Component {
    static propTypes = {
        pageCapacity: PropTypes.number,
        products: PropTypes.array,
        productsLength: PropTypes.number,
        loadAllProducts: PropTypes.func
    };

    componentDidMount() {
        this.props.loadAllProducts();
    }

    render() {
        console.log(this.props.products.length);
        console.log(this.props.products);
        return (
            <React.Fragment>
                <SearchField placeholder={"Название продукта"}/>
                <div>Категории продуктов</div>
                <Paginator pageCapacity={this.props.pageCapacity} arrayLength={this.props.productsLength}/>
                <div className="articles-list">
                    {this.props.products.map((product) => {
                            return <Link to={`/products/${product._id}`} className="articles-list__article"
                                         key={product._id}>
                                <div className="article__more">
                                    <ul className="info-list layout layout_column_around_center color_white">
                                        <li className="info-list__item">В 100г:</li>
                                        <li className="info-list__item" name="protein">
                                            Б.&nbsp;-&nbsp;{product.protein}</li>
                                        <li className="info-list__item" name="fat">
                                            Ж.&nbsp;-&nbsp;{product.fat}</li>
                                        <li className="info-list__item" name="carbohydrates">
                                            У.&nbsp;-&nbsp;{product.carbohydrates}</li>
                                        <li className="info-list__item" name="kcal">
                                            Ккал&nbsp;-&nbsp;{product.kcal}</li>
                                    </ul>
                                    <div className="article__more-title">Подробнее</div>
                                </div>
                                <div className="article__opacity">
                                    <div className="article__img layout layout_around_center">
                                        <img className="img img_medium_v" src={product.img} alt={product.title.rus}/>
                                    </div>
                                    <div className="article__title layout layout_around_center"><h1
                                        className="title title_medium title_uppercase color_white">{product.title.rus}</h1>
                                    </div>
                                </div>
                            </Link>
                        }
                    )
                    }
                </div>
            </React.Fragment>
        );
    };
};

const tempMap = ({products, searchQuery, currentTab}, {pageCapacity}) => ({
    products: !searchQuery ? objToArr(products) :
        objToArr(products).filter((item) => item.title.rus.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
})

const mapStateToProps = ({products, searchQuery, currentTab}, {pageCapacity}) => {
    let prod = !searchQuery ? objToArr(products) :
        objToArr(products).filter((item) => item.title.rus.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    return (
        {
            products: prod.slice((currentTab - 1) * pageCapacity, currentTab * pageCapacity <= prod.length ? currentTab * pageCapacity : prod.length),//Возвращаем кусок масива для выбранной вкладки
            productsLength: prod.length//Возвращаем общую длину отфильтрованного массива
        });
};

export default connect(mapStateToProps, {loadAllProducts})(Products);

