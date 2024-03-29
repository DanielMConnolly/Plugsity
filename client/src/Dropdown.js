
import { defaultsDeep } from 'lodash';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import './css/dropdown.css'
export default class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    }

  }


  toggleList = () => {
    if (typeof this.props.handleClick === "function") {
      this.props.handleClick();
    }

    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen
    }))
  }


  render() {
    const { isListOpen, headerTitle } = this.state;
    return (
      <div className={"dd-wrapper " + this.props.style}>
        <button
          type="button"
          className={this.props.borderstyle ? "dd-header dd-border" : "dd-header"}
          onClick={this.toggleList}
        >
          <div className="dd-header-title">{headerTitle}</div>
          {isListOpen
            ? <FontAwesome name="angle-up" />
            : <FontAwesome name="angle-down" />}
        </button>
        {isListOpen && (
          <div
            role="list"
            className="dd-list"
          >
            {this.props.list.map((item) => (
              <button
                type="button"
                className="dd-list-item"
                key={item.id}
                onClick={() => item.onClick()}
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