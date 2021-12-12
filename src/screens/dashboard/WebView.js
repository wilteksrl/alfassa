import React, { Component } from 'react';
import { StyleSheet, Text, View,BackHandler ,Alert,ActivityIndicator} from 'react-native';
import { WebView  } from 'react-native-webview';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
// ...
class MyWebComponent extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    state={
        canGoBack:false,
        loading:false,
    }
    

    backAction = () => {
     if(this.state.canGoBack){
         console.log(this.state.canGoBack)
        this.myRef.current.goBack();
        return true;
     }
     else return false;
        
      };
    
      componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
      }

      componentWillUnmount() {
        this.backHandler.remove();
      }
    
  render() {
      console.log(this.props.route.params.url)
    return (<Container >
        <Content style={{padding:0}}>
           { this.state.loading?<View style={{position:"absolute",top:0,height:"100%",width:"100%",justifyContent:"center",alignItems:"center",zIndex:1000,backgroundColor:"#fff"}} >
            <ActivityIndicator size="large"/>
            </View>:null}
             <WebView allowsFullscreenVideo
allowsInlineMediaPlayback  onShouldStartLoadWithRequest={(request) => {
  // Only allow navigating within this website
  return true;
}} onLoadStart={()=>this.setState({loading: true})} onLoadEnd={(syntheticEvent)=>this.setState({loading: false})} cacheEnabled={false} allowsBackForwardNavigationGestures ref={this.myRef} source={{ uri:this.props.route.params.url }}   onNavigationStateChange={(navState) => {
    // Keep track of going back navigation within component
    console.log(navState)
    this.setState({ canGoBack:navState.canGoBack})
  }}/>
   
    </Content>
    </Container>)
  }
}
export default MyWebComponent