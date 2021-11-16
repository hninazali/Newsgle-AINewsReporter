import React, { Component } from 'react';

// const SplitText = () => {
class SplitText extends Component {
  render(){
    return(
      <span aria-label={this.props.copy} role={this.props.role}>
          {this.props.copy.split("").map(function(char, index){
            let style = {"animationDelay": (0.5 + index / 10) + "s"}
            return <span
              aria-hidden="true"
              key={index}
              style={style}>
              {char}
            </span>;
          })}
        </span>
    );
  }
}

// const NewsgleTitle = () => {
class NewsgleTitle extends Component {
    render() {
      return(
        <h1><SplitText copy="Newsgle" role="heading" /></h1>
      );
    }
}


export default NewsgleTitle