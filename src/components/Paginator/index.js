import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {connect} from 'react-redux';
import {setCurrentTab} from "../../ActionCreator";

const setTabQuantity = (length, capacity) => Math.ceil(length / capacity);

class Paginator extends React.Component {
    static propTypes = {
        pageCapacity: PropTypes.number,//Вместимость элементов на одной странице
        arrayLength: PropTypes.number,//Размер передаваемого набора данных
        currentTab: PropTypes.number,//Текущая вкладка
        setCurrentTab: PropTypes.func//Смена вкладки
    };

    tabRange = 5;//Диапазон вывода вкладок

    componentWillMount() {
        // if(this.props.currentTab !== 1)
        //     this.props.setCurrentTab();
    }

    render() {
        const {currentTab: current} = this.props;
        const num = Math.ceil(this.props.arrayLength / this.props.pageCapacity);
        return (
            <div className="paginator">
                <div className={`paginator__item ${current <= 1 ? 'paginator__item_passive':''}`} onClick={current > 1 ? this.getCurrentTab(1) : null}><div>&laquo;</div></div>
                <div className={`paginator__item ${current <= 1 ? 'paginator__item_passive':''}`} onClick={current > 1 ? this.getCurrentTab(current === 1 ? 1 : current - 1)  : null}><div>&lsaquo;</div></div>
                {this.showTabs()}
                <div className={`paginator__item ${current >= num ? 'paginator__item_passive':''}`}  onClick={current < num ? this.getCurrentTab(current === num ? num : current + 1): null}><div>&rsaquo;</div></div>
                <div className={`paginator__item ${current >= num ? 'paginator__item_passive':''}`} onClick={current < num ? this.getCurrentTab(num) : null}>&raquo;</div>
            </div>
        )
    };

    showTabs = () => {
        const {currentTab: current} = this.props;
        const num = Math.ceil(this.props.arrayLength / this.props.pageCapacity);
        const radius = Math.trunc(this.tabRange / 2);//Количество вкладок перед текущей вклдок и после неё
        let arr = [];
        const start = () => {//Начальная вклдка диапазона
            //Проверка, сколько нужно выводить вкладок перед текущей вкладкой, точнее с какой нужно начинать вкладки выводить, то есть её номер
            if (current - radius > 0) {//Если количество вкладок перед текущей вкладкой больше либо равно установленному радиусу, то (1)
                if ( current + radius > num) {//Если после текущей вкладки количество вкладок меньше заданного радиуса, то есть превышает общее количество вкладок, то (2)
                    let temp = (current - (this.tabRange - 1) + (num - current));//Чтоб компенсировать количество недостающих вкладок после текущей вкладки, добавляем двойной радиус, учитывая количество оставшихся вкладок после текущей вкладки
                    if(temp <= 0)//Если компенсация вкладок выходит за диапазон первой вкладки, то начинаем с первой вклдки (3)
                        return 1;
                    else return temp;//Если же компенсация не выходит за пределы первой вкладки, то компенсируем (3)
                } else return current - radius;//Выводим количество вкладок равные радиусу (2)
            } else return 1;//Если количество вкладок перед текущей вкладкой меньше установленного радиуса, то начинаем с первой (1)

        }
        const end = () => {//Конечная вкладка диапазоны
            //То же самое, что и с начальной вклдакой
            if(current + radius <= num) {
                if(current - radius <= 0) {
                    let temp = (current + (this.tabRange - 1) - (current - 1));
                    if(temp > num)
                        return num;
                    else return temp;
                } else return (current + radius);
            } else return num;
        }
        // const a = (current - radius > 0) ? current - radius : 1;
        // const b = (current + radius <= num) ? (current + radius) : num;
        for (let i = start() ; i <= end() ; i++)
        arr.push(<div onClick={this.getCurrentTab(i)} className={`paginator__item ${i === current ? "paginator__item_active" : ""}`}><div>{i}</div></div>)

        return arr;
    }

    getCurrentTab = (current) => () => this.props.setCurrentTab(current);

}

export default connect(({currentTab}) => ({currentTab}), {setCurrentTab})(Paginator);