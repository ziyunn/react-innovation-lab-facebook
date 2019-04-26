import React, {Component} from 'react';

class Subject extends Component{
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
class Item extends Component{
  render(){
    return (
      <li>
        <a 
          onClick={
            function(event){
              event.preventDefault();
              this.props.onChangePage(this.props.id);
            }.bind(this)
          }
          href={this.props.id+'.html'}>
          {this.props.title}
        </a>
      </li>
    );
  }
}


class TOC extends Component{
  render(){
    var tags = [];
    var con = this.props.data;
    var i = 0;
    while(i<con.length){
      tags.push(
        // <li key={con[i].id}>
        //   <a href="/" 
        //      onClick={function(id, event){
        //         event.preventDefault();
        //         this.props.onChangePage(id);
        //      }.bind(this, con[i].id)}>
        //     {con[i].title}
        //   </a>
        // </li>
        <Item 
          onChangePage={
            function(id){
              this.props.onChangePage(id);
            }.bind(this)
          }
          key={con[i].id} 
          id={con[i].id} 
          title={con[i].title}>
        </Item>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ol>
            {tags}
        </ol>
    </nav>
    );
  }
}
class Contents extends Component{
  render(){
    return (
      <article>
            <h2>{this.props.title}</h2>
            {this.props.desc}  
      </article>
    );
  }
}
class App extends Component{
  state = {
    contents : [
      {id:1, title: 'HTML', desc: 'HTML is ...'},
      {id:2, title: 'CSS', desc: 'CSS is ...'},
      {id:3, title: 'JS', desc: 'JS is ...'}
    ],
    mode:'read',
    selected_id: 2
  }
  
  render(){
    var _aTitle, _aDesc = '';
    if(this.state.mode === 'welcome'){
      _aTitle = 'Welcom';
      _aDesc = 'Hello React!!';

    }else if(this.state.mode === 'read'){
      var i = 0;
      var con = this.state.contents;
      while(i < con.length){
        if(con[i].id === this.state.selected_id){
          _aTitle = con[i].title;
          _aDesc = con[i].desc;
          break;
        }
        i = i+1;
      }
      
    }
    return (
      <div className="App">
        <Subject 
          title="WEB" 
          sub="World!" 
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}>
        </Subject>
        {/* <header>
          <h1><a onClick={
            function(_event){
              this.setState({mode:'welcome'});
              _event.preventDefault();
            }.bind(this)
          } href="/">WEB</a></h1>
          World!  
        </header> */}
        <TOC onChangePage={
          function(id){
            this.setState({mode:'read', selected_id:id});
          }.bind(this)
        } data={this.state.contents}></TOC>
        <Contents title={_aTitle} desc={_aDesc}></Contents>
      </div>
    );
  }
}

export default App;



