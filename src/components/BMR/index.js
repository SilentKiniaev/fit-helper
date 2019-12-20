import React from 'react';
import './style.scss';

//Basal Metabolic Rate
export default class BMR extends React.Component {
    state = {
        sex: "female",
        weight: "51",
        height: "165",
        age: "21",
        activity: "2",
        purpose: "1",
        pfc: {},
        bmrResult: "",
    };

    componentDidMount() {
        this.getResult();
    }

    render() {
        const {weight, height, age, bmrResult} = this.state;
        return (
            <React.Fragment>
                <div className="content-box">
                    <h1 className="title title_large">Рассчёт суточной калорийности</h1>
                    <form className="form">
                        <div className="form__item">
                            <p className="form__name" htmlFor="sex-bmr">Пол</p>
                            <div className="form__field form__field_radio">
                                <label className="radio">
                                    <input name="radio-sex"
                                           type="radio" value="male"
                                           className="radio__button"
                                           onChange={this.getSex}/>
                                    <span className="radio__mask"></span>
                                    <span className="radio__title">Муж.</span>
                                </label>
                                <label className="radio">
                                    <input name="radio-sex"
                                           type="radio" value="female"
                                           className="radio__button"
                                           checked
                                           onChange={this.getSex}/>
                                    <span className="radio__mask"></span>
                                    <span className="radio__title">Жен.</span>
                                </label>
                            </div>

                        </div>
                        <div className="form__item">
                            <label className="form__name" htmlFor="weight-bmr">Вес (в кг)</label>
                            <input id="weight-bmr" className="form__field form__field_text" name="weight" type="text"
                                   value={weight}
                                   onChange={this.getWeight} onClick={e => console.log(e)}/>
                        </div>
                        <div className="form__item">
                            <label className="form__name" htmlFor="height-bmr">Рост (в см)</label>
                            <input id="height-bmr" className="form__field form__field_text" name="height" type="text"
                                   value={height}
                                   onChange={this.getHeight}/>
                        </div>
                        <div className="form__item">
                            <label className="form__name" htmlFor="age-bmr">Возраст (в годах)</label>
                            <input id="age-bmr" className="form__field form__field_text" name="age" type="text"
                                   value={age}
                                   onChange={this.getAge}/>
                        </div>
                        <div className="form__item">
                            <label className="form__name" htmlFor="activity-bmr">Уровень активности</label>
                            <select id="activity-bmr" className="form__field form__field_text" name="activity-type"
                                    onChange={this.getActivityType}>
                                <option value="1">Сидячий образ жизни</option>
                                <option selected value="2">Лёгкие физические нагрузки либо занятия 1—3 раз в неделю
                                </option>
                                <option value="3">Занятия 3—5 раз в неделю</option>
                                <option value="4">Интенсивные нагрузки или занятия 6-7 раз в неделю</option>
                                <option value="5">Спортсмен или выполняете похожие нагрузки 6-7 раз в неделю</option>
                            </select>
                        </div>
                        <div className="form__item">
                            <label className="form__name" htmlFor="purpose-bmr">Цель рассчёта калорийности</label>
                            <select id="purpose-bmr" className="form__field form__field_text" name="purpose"
                                    onChange={this.getPurpose}>
                                <option selected value="1">Набор веса</option>
                                <option value="2">Сохранение веса</option>
                                <option value="3">Снижение веса(норма)</option>
                                <option value="4">Снижение веса(экстримальное)</option>
                            </select>
                        </div>
                        <button className="button button_first" name="result" type="button" onClick={this.getResult}>
                            Рассчитать
                        </button>
                    </form>

                    <div className="layout layout_column_around_center">

                        <p className="info-text">Ваша суточная норма калорийности: <b>{bmrResult}&nbsp;ккал</b></p>
                        <p className="info-text">Распредление калорий между белками, жирами и
                            углеводами:</p>
                        <ul className="info-list">
                            <li className="info-list__item">Белки: {this.state.pfc.protein * 100}%
                                - {Math.round(bmrResult * (this.state.pfc.protein))} ккал
                            </li>
                            <li className="info-list__item">Жиры: {this.state.pfc.fat * 100}%
                                - {Math.round(bmrResult * (this.state.pfc.fat))} ккал
                            </li>
                            <li className="info-list__item">Углеводы: {this.state.pfc.carbohydrates * 100}%
                                - {Math.round(bmrResult * (this.state.pfc.carbohydrates))} ккал
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    };

    getSex = (event) => this.setState({sex: event.target.value});//Обработчик события - получение пола пользователя
    getWeight = (event) => isNaN(+event.target.value) ? null : this.setState({weight: event.target.value});//Обработчик события - получение веса тела пользователя
    getHeight = (event) => isNaN(+event.target.value) ? null : this.setState({height: event.target.value});//Обработчик события - получение роста тела пользователя
    getAge = (event) => isNaN(+event.target.value) ? null : this.setState({age: event.target.value})//Обработчик события - получение возраста пользователя
    getActivityType = (event) => this.setState({activity: event.target.value});//Обработчик события - получение уровня активности пользователя
    getPurpose = (event) => this.setState({purpose: event.target.value});//Обработчик события - получение цели рассчёта ккал для пользователя
    getResult = () => {//Обработчик события - рассчёт дневной калорийнсоти
        const {sex, weight, height, age, activity, purpose} = this.state;
        if (!sex || !+weight || !+height || !+age || !activity || !purpose) {//Проверка на не заполненные данные
            alert("Необходимо заполнить все поля с данными");
            return;
        }
        this.setState({bmrResult: Math.round(((this.state.sex === "male" ? this.getMale() : this.getFemale()) * this.getActivityIndex()) * this.getPurposeIndex())});
        this.getPFC();
        return;
    }
    getMale = () => 88.362 + (13.397 * this.state.weight) + (4.799 * this.state.height) - (5.677 * this.state.age);//Рассчёт калорийерсти для мужчин
    getFemale = () => 447.593 + (9.247 * this.state.weight) + (3.098 * this.state.height) - (4.330 * this.state.age);//Рассчёт калорийности для женщин
    getActivityIndex = () => {//Получение индекса активности в зависимости от выбранного уровня активнсоти
        switch (this.state.activity) {
            case "1":
                return 1.2;
                break;
            case "2":
                return 1.375;
                break;
            case "3":
                return 1.55;
                break;
            case "4":
                return 1.725;
                break;
            case "5":
                return 1.9;
                break;
        }
        ;
    };
    getPurposeIndex = () => {//Получение индекса цели рассчёта ккал в зависимости от выбранной цели рассчёта
        switch (this.state.purpose) {
            case "1":
                return 1.2;
                break;
            case "2":
                return 1;
                break;
            case "3":
                return .8;
                break;
            case "4":
                return .6;
                break;
        }
        ;
    }
    getPFC = () => {//Получение соотношения белков, жиров и углеводов в зависимости от цели рассчёта
        const {purpose} = this.state;
        const pfc = {
            protein: (purpose === "1" ? .3 : (purpose === "2" ? .4 : .5)),
            carbohydrates: (purpose === "1" ? .5 : (purpose === "2" ? .4 : .3)),
            fat: .2
        }
        return this.setState({pfc: pfc});
    };
}