import React, { Component } from "react";

class AboutBusinessText extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return <div>{this.props.text}</div>;
    }
}

export default AboutBusinessText;
