import React from 'react';

export default class CheckBoxGroup extends React.Component {
    render(){
        return (
            <div>
                <input type="checkbox" onChange={this.onChecked}/>
            </div>
        );
    }

    onChecked = (event) => console.log(event.target.checked);
}
