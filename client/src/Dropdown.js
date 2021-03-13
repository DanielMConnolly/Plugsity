
import React, { Component } from 'react';
export default class Dropdown extends Component {

    constructor(){
        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;
    }


    toggleList = () => {
        this.setState(prevState => ({
          isListOpen: !prevState.isListOpen
       }))
     }


    render() {
        return (
            <div className="dd-wrapper">
            <button
              type="button"
              className="dd-header"
              onClick={this.toggleList}
            >
              <div className="dd-header-title">{headerTitle}</div>
              {this.state.isListOpen
                ? <FontAwesome name="angle-up" size="2x" />
                : <FontAwesome name="angle-down" size="2x" />}
            </button>
            {this.stateisListOpen && (
              <div
                role="list"
                className="dd-list"
              >
                {list.map((item) => (
                  <button
                    type="button"
                    className="dd-list-item"
                    key={item.id}
                    onClick={() => this.selectItem(item)}
                  >
                    {item.title}
                    {' '}
                    {item.selected && <FontAwesome name="check" />}
                  </button>
                ))}
              </div>
            )}
          </div>
      )
    }
}