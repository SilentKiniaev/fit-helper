import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class CompositionCalc extends React.Component {
    static propTypes = {
        product: PropTypes.object.isRequired
    }
    state = {
        weight: "100"
    };

    render() {
        const {weight} = this.state;
        const {product} = this.props;
        return (
            <div className="layout layout_column_center_center">
                <form className="form">
                    <div className="form__item">
                        <label className="form__name">Вес продукта(в граммах):</label>
                        <input className="form__field form__field_text" name="weight" type="text"
                               value={weight}
                               onChange={this.getWeight}/>
                    </div>
                </form>

                <ul className="info-list">
                    <li className="info-list__item">Белок:&nbsp;{((+weight / 100) * product.protein).toFixed(1)}</li>
                    <li className="info-list__item">Жиры:&nbsp;{((+weight / 100) * product.fat).toFixed(1)}</li>
                    <li className="info-list__item">
                        Углеводы:&nbsp;{((+weight / 100) * product.carbohydrates).toFixed(1)}</li>
                    <li className="info-list__item">Ккал:&nbsp;{((+weight / 100) * product.kcal).toFixed(1)}</li>
                    <li className="info-list__item" hidden={!product.cellulose}>Пищевые волокна (целлюлоза):&nbsp;{((+weight / 100) * product.cellulose).toFixed(1)}</li>
                </ul>
            </div>
        )
    }

    getWeight = (event) => isNaN(+event.target.value) ? null : this.setState({weight: event.target.value});
}