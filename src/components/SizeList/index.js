//Отображение списка размеров продукта по регионам

import React from 'react';
import PropTypes from 'prop-types';

export default class SizeList extends React.Component {
    static propTypes = {
        size: PropTypes.array
    }

    state = {
        currentItem: 0
    }

    render() {
        return (
            <div>
                <form className="form">
                    <div className="form__item">
                        <label className="form__name">
                            Регион
                        </label>
                        <select className="form__field form__field_text" onChange={this.setCurrentItem}>
                            {
                                this.props.size.map((item, i) => <option key={i} value={i}>{item.region.rus}</option>)
                            }
                        </select>
                    </div>
                </form>
                <ul className="info-list">
                    {
                        this.props.size[+this.state.currentItem].size.map((item, i) =>
                            <li key={i}>{item.title.rus}:&nbsp;
                                {item.minS ? (item.minS === -1 ? 'менее':item.minS.toFixed(1)+' г') : null}&nbsp;
                                {(item.minS && item.maxS) && (item.minS !== -1 && item.maxS !== -2 ? ' - ' : null)}
                                {item.maxS ? (item.maxS === -2 ? 'и более': item.maxS.toFixed(1)+' г') : null}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }

    setCurrentItem = (event) => this.setState({currentItem: event.target.value});
};