//Body Mass Index
import React from 'react';

//Body mass index.js
export default class BMI extends React.Component {
    state = {
        height: "183",
        weight: "85",
        bmiResult: ""
    };

    componentDidMount() {
        this.getResult();
    }

    render() {
        const {height, weight, bmiResult} = this.state;
        return (
            <React.Fragment>
                <div className="content-box">
                    <h1 className="title title_large">Индекс массы тела</h1>
                    <form className="form">
                        <div className="form__item">
                            <div className="form__name">Вес (в кг)</div>
                            <input className="form__field form__field_text" name="weight" type="text" value={weight}
                                   onChange={this.getWeight}/>
                        </div>
                        <div className="form__item">
                            <div className="form__name">Рост (в см)</div>
                            <input className="form__field form__field_text" name="height" type="text" value={height}
                                   onChange={this.getHeight}/>
                        </div>
                        <button className="button button_first" name="result" type="button" onClick={this.getResult}>
                            Рассчитать
                        </button>
                    </form>
                    <div className="layout layout_column_around_center">
                        <div className="info-text">Результат: <b>{bmiResult}</b></div>
                        <div className="info-text"><span className="color_red">*</span>Рассчёты не являются точными, т.к. не учитывается количество жира и мышечной массы в организме, вес костей и т.д.</div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    getWeight = (event) => isNaN(+event.target.value) ? null : this.setState({weight: event.target.value});
    getHeight = (event) => isNaN(+event.target.value) ? null : this.setState({height: event.target.value});
    getResult = () => {
        const {height, weight} = this.state;
        if (!+height || !+weight) {
            alert('Необходимо заполнить все поля с данными');
            return;
        }
        return this.setState({bmiResult: (weight / (Math.pow(height / 100, 2))).toFixed(1)});
    };
};























