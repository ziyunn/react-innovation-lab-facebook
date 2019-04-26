import React, {Component} from 'react';

class Subject extends Component{
    shouldComponentUpdate(prevProps, prevState){
        return false;
    }
    
    render(){
      
      var clickEvent = function(_event){
        _event.preventDefault();
        this.props.onChangePage();
      }.bind(this);
  
      return (
        <header>
          <h1><a onClick={clickEvent} href="/">{this.props.title}</a></h1>
          {this.props.sub}  
        </header>
  
      );
    }
  }
export default Subject;  