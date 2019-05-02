import React, {Component} from 'react';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ContentCreate from './components/ContentCreate';
import ContentRead from './components/ContentRead';
import Control from './components/Control';


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
  max_id = this.state.contents.length;
  
  render(){
    var _aTitle, _aDesc = '';
    var _content = null;
    if(this.state.mode === 'welcome'){
      _aTitle = 'Welcom';
      _aDesc = 'Hello React!!';
      _content = <ContentRead title={_aTitle} desc={_aDesc}></ContentRead>

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
      _content = <ContentRead title={_aTitle} desc={_aDesc}></ContentRead>
    }else if(this.state.mode === 'create'){
      _content = <ContentCreate onSubmitCreate={
        function(_title, _desc){
          console.log(_title, _desc);
          this.max_id = this.max_id +1; 
          //.concat 개념 이해하기!
          var _contents = this.state.contents.concat({
            id:this.max_id,
            title:_title,
            desc :_desc
          })
          this.setState({contents:_contents});
        }.bind(this)
      }></ContentCreate>
    }else if(this.state.mode === 'update'){
      _content = null;
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
        <TOC onChangePage={
          function(id){
            this.setState({mode:'read', selected_id:id});
          }.bind(this)
        } data={this.state.contents}></TOC>
        <Control onChangeMode={
            function(_mode){
              this.setState({mode:_mode});
            }.bind(this)
        }></Control>
        {_content}
      </div>
    );
  }
}

export default App;



