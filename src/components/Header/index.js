import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleOpen from '../../decorators/toggleOpen';
import './style.scss';

class Header extends React.Component {
    static propTypes = {
        toggleOpen: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired
    };

    render() {
        return (
            <header className="header">
                <nav className="nav-bar">
                    <div className="logo"><span className="logo__icon">FH</span>FitHelper</div>
                    <img src="https://i.ibb.co/GWfrTzz/menu-icon.png" alt="menu-icon" className="menu-icon" onClick={this.toggleMenu}/>
                    <div className={`menu ${this.props.isOpen?'active':''}`}>
                        <div className="menu__item">
                            <NavLink className="menu__item-link" to="/" activeClassName="menu__item-link_active"
                                     exact>Главная</NavLink>
                        </div>
                        <div className="menu__item">
                            <NavLink className="menu__item-link" to="/products" activeClassName="menu__item-link_active">БЖУ и
                                калорийность продуктов</NavLink>
                        </div>
                        <div className="menu__item">
                            <NavLink className="menu__item-link" to="/calculators" activeClassName="menu__item-link_active">Калькуляторы</NavLink>
                            <div className="submenu">
                                <div className="submenu__item">
                                    <NavLink className="submenu__item-link" to="/calculators/bmr" activeClassName="submenu__item-link_active">Рассчёт суточной
                                        калорийности</NavLink>
                                </div>
                                <div className="submenu__item">
                                    <NavLink className="submenu__item-link" to="/calculators/food-basket" activeClassName="submenu__item-link_active">Калорийность
                                        продуктовой корзины</NavLink>
                                </div>
                                <div className="submenu__item">
                                    <NavLink className="submenu__item-link" to="/calculators/bmi" activeClassName="submenu__item-link_active">Индекс массы
                                        тела</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="menu__item">
                            <NavLink className="menu__item-link" to="/articles"
                                     activeClassName="menu__item-link_active">Статьи</NavLink>
                        </div>
                    </div>
                </nav>
            </header>

        );
    };
    toggleMenu = () => this.props.toggleOpen();
};

export default ToggleOpen(Header);