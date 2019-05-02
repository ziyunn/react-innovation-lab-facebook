import React, {Component} from 'react';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ContentCreate from './components/ContentCreate';
import ContentUpdate from './components/ContentUpdate';
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
  
  getReadContent(){
    var i = 0;
    var con = '';
    while(i < this.state.contents.length){
      con = this.state.contents[i];
      if(con.id === this.state.selected_id){
        return con;
      }
      i = i+1;
    }
  }
  getContent(){
    var _aTitle, _aDesc, _data = '';
    var _content = null;
    if(this.state.mode === 'welcome'){
      _aTitle = 'Welcom';
      _aDesc = 'Hello React!!';
      _content = <ContentRead title={_aTitle} desc={_aDesc}></ContentRead>

    }else if(this.state.mode === 'read'){
      _data = this.getReadContent();
      _content = <ContentRead title={_data.title} desc={_data.desc}></ContentRead>
    }else if(this.state.mode === 'create'){
      _content = <ContentCreate onSubmitCreate={
        function(_title, _desc){
          this.max_id = this.max_id +1; 
          //.concat 개념 이해하기!
          var _contents = this.state.contents.concat({
            id:this.max_id,
            title:_title,
            desc :_desc
          })
          this.setState({
            contents:_contents,
            mode:'read'   
          });
        }.bind(this)
      }></ContentCreate>
    }else if(this.state.mode === 'update'){
      _data = this.getReadContent(); 
      _content =  <ContentUpdate data={_data} onSubmitUpdate={
        function(_id, _title, _desc){ 
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i =  i+1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)
      }></ContentUpdate>
    }
    return _content;
  }
  render(){
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
              if(_mode === 'delete'){
                if(window.confirm('정말 삭제 하시겠습니까?')){
                  var _contents = Array.from(this.state.contents);
                  var i = 0;
                  while(i < _contents.length){
                    if(_contents[i].id === this.state.selected_id){
                      _contents.splice(i,1);
                      break;
                    }
                    i = i + 1;
                  }
                  this.setState({
                    mode:'welcome',
                    contents:_contents
                  });
                  alert('삭제되었습니다.');
                }
              }else{
                this.setState({mode:_mode});
              }
            }.bind(this)
        }></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;



