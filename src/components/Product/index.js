import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import CompositionCalc from '../CompositionCalc';
import SizeList from '../SizeList';
import './style.scss';

class Product extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired
    }

    render() {
        const {product} = this.props;
        return (
            <React.Fragment>
                <div className="layout">
                </div>
                <div className="content-box">
                    <NavLink to="/products" className="back-button" title="Вернуться назад"></NavLink>
                    <div className="layout layout_around_center">
                        <img className="img img_large_v background_white" src={product.img}
                             alt={product.title.rus}/>
                        <div className="layout layout_column_start_center">
                            <h1 className="title title_medium title_uppercase color_orange">{product.title.rus}</h1>
                            <CompositionCalc product={product}/>
                            <hr/>
                            <h1 className="title title_medium">Размер продукта</h1>
                            <ul className="info-list">
                                {
                                    product.sizeList ? <SizeList size = {product.size}/> : (product.size ? product.size.map(item =>
                                        <li>{item.title.rus}: {item.minS} г - {item.maxS} г</li>) : <div className="info-text">Фиксированный размер отсутсвует</div>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

export default connect((state, props) => ({product: state.products[props.id]}))(Product);
