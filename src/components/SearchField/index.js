import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {searchQuery} from '../../ActionCreator';

class SearchField extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        searchQuery: PropTypes.func.isRequired
    };

    state = {
      query: ''
    };

    componentDidMount() {
        this.props.searchQuery();
    }

    render() {
        const style = {
            backgroundImage: 'https://i.ibb.co/ZBxMLSb/search-icon.png'
        }
        return <div className="search-field">
            <input className="search-field__input" type="text" name="search" placeholder={this.props.placeholder} value={this.state.query}
                   onChange={this.setSearchQuery} onKeyPress={this.findOutOnEnter}/>
            <button className="search-field__button button" onClick={this.findOutOnClick} style={style}></button>
        </div>
    }
    setSearchQuery = event => {
        if(!event.target.value) this.props.searchQuery("");//Если в строке поиска пусто, то выводим все продукты
        return this.setState({query:event.target.value});
    };
    findOutOnClick = () => this.props.searchQuery(this.state.query);
    findOutOnEnter = event => event.key === 'Enter'?this.props.searchQuery(this.state.query):null;
}

export default connect(null, {searchQuery})(SearchField);
