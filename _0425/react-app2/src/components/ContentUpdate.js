import React, {Component} from 'react';

class ContentUpdate extends Component{
  state = {
    id : this.props.data.id,
    title : this.props.data.title,
    desc : this.props.data.desc
  }
  inputFormHandler = this.inputFormHandler.bind(this);

  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }
  render(){
     console.log(this.state);
      return(
        <article>
          <h2>Update</h2>
          <form action="/" method="post" onSubmit={
              function(event){
                  event.preventDefault();
                  this.props.onSubmitUpdate(
                    this.state.id,
                    this.state.title,
                    this.state.desc  
                    );
              }.bind(this)
          }>
            <input type="hidden" name="id" value={this.state.id}></input>
            <p>
              <input name="title" type="title" placeholder="title" value={this.state.title} onChange={this.inputFormHandler}></input>
            </p>
            <p>
              <textarea name="desc" placeholder="description" value={this.state.desc} onChange={this.inputFormHandler}></textarea>
            </p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
  }

  export default ContentUpdate;