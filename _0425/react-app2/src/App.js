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
class TOC extends Component{
  render(){
    var tags = [];
    var con = this.props.data;
    var i = 0;
    while(i<con.length){
      tags.push(<li key={con[i].id}><a href="">{con[i].title}</a></li>);
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
      {id:2, title: 'CSS', desc: 'CSS is ...'}
    ],
    mode: 'read'
  }
  
  render(){
    var _aTitle, _aDesc = '';
    if(this.state.mode === 'welcome'){
      _aTitle = 'Welcom';
      _aDesc = 'Hello React!!';

    }else if(this.state.mode === 'read'){
      _aTitle = this.state.contents[0].title;
      _aDesc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        <Subject title="WEB" sub="World!" onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}></Subject>
        {/* <header>
          <h1><a onClick={
            function(_event){
              this.setState({mode:'welcome'});
              _event.preventDefault();
            }.bind(this)
          } href="/">WEB</a></h1>
          World!  
        </header> */}
        <TOC data={this.state.contents}></TOC>
        <Contents title={_aTitle} desc={_aDesc}></Contents>
      </div>
    );
  }
}

export default App;
