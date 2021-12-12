import React, { memo ,useEffect,useState} from 'react';

import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import { Input } from 'react-native-elements';
import Footer from "../../components/Layout/footer";
import { StyleSheet,Image,View, Text ,TouchableOpacity } from 'react-native';
import Typography from "../../components/Typography/Typography"
import { Icon } from 'react-native-elements';
import axios from "axios"
import Nav from "../../components/Headers/header"
import moment  from "moment"
const { parse } = require('rss-to-json');





const LoginScreen = ({ navigation }) => {
  const [posts,setPosts]=useState({})

  useEffect(()=>{
     axios.get("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.alfassa.online%2Ffeed%2F&api_key=seiqgntrg6mizkewrtzr50fi3zu2aekihjznaroe").then(rss=>{
        setPosts(rss.data);
     })

    

  },[])

  let allItems=[]

  if(posts?.items?.length){
      
   posts.items.map(i=>{
       
        if(i?.categories?.length&&(i?.categories.includes("Eventi")||i?.categories.includes("Newsletter")||i?.categories.includes("Formazione"))){
            allItems.push(i)
        }
    })
  }

  
    return (
        <Container>
            {/* <Header >
                <Nav
 style={{backgroundColor:'white'}}
                    leftComponent={
                        <Icon
                            onPress={() => navigation.toggleDrawer()}
                            name={"menu"}
                            type={"feather"}
                            size={30}
                            style={{ marginLeft: 25 }}
                        />}

                    centerComponent={
                        <View style={{justifyContent: 'center',alignItems: 'center',width:"100%",marginLeft:25}}>
                        <Image
                           source={require('../../assets/images/logo.png')}
                            style={{height:32 }}
                            resizeMode={"contain"}
                        />
                    
                        </View>
                    }
                />

            </Header> */}

            <Content  >

            <View style={{justifyContent: 'center',alignItems: 'center',width:"100%",marginTop:60,marginBottom:24}}>
                        <Image
                           source={require('../../assets/images/logo.png')}
                            style={{height:60 }}
                            resizeMode={"contain"}
                        />
                    
                        </View>

                <Input leftIcon={<Icon name="search" />} placeholder={"Search"} inputContainerStyle={{marginTop:24 ,borderWidth:1,borderRadius:40,paddingLeft:16}} onSubmitEditing={(obj)=>navigation.navigate("WebView1",{url:`https://www.alfassa.org/web/search?q=${obj.nativeEvent.text}`})} returnKeyLabel={"next"} />
            <View style={{flexDirection: 'row',alignItems: 'center',width:"100%",marginTop:8}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView",{url:"https://www.alfassa.net"})}>
            <Image
                           source={require('../../assets/images/ALFASSA.png')}
                            style={{height:64 ,width:"auto"}}
                            resizeMode={"contain"}
                           
                        />
                         <View style={{alignItems: 'center',marginTop:8}}><Text>ALFASSA</Text></View>
                        
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView1",{url:"https://www.alfassa.org"})}>
                        <Image
                           source={require('../../assets/images/ALFASearch.png')}
                            style={{height:64 ,width:"auto"}}
                            resizeMode={"contain"}
                           
                        />
                           <View style={{alignItems: 'center',marginTop:8}}><Text>ALFA Search</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView2",{url:"https://www.alfassa.online"})}>
                        <Image
                           source={require('../../assets/images/ALFAPublishing.png')}
                            style={{height:64 ,width:"auto"}}
                            resizeMode={"contain"}
                           
                        />
                           <View style={{alignItems: 'center',marginTop:8}}><Text>ALFA Publishing</Text></View>
                        </TouchableOpacity>

            </View>
            
            <View style={{flexDirection: 'row',alignItems: 'center',width:"100%" ,marginTop:16}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView3",{url:"https://www.alfassasocial.it"})}>
            <Image
                           source={require('../../assets/images/ALFASocial.png')}
                            style={{height:64 ,width:"auto"}}
                            resizeMode={"contain"}
                           
                        />
                           <View style={{alignItems: 'center',marginTop:8}}><Text>ALFA Social</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView4",{url:"https://www.alfassatube.com"})}>
                        <Image
                           source={require('../../assets/images/ALFATUBE.png')}
                            style={{height:64 ,width:"auto"}}
                            resizeMode={"contain"}
                           
                        />
                           <View style={{alignItems: 'center',marginTop:8}}><Text>ALFA Tube</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView5",{url:"https://www.alfassa.cloud"})}>
                        <Image
                           source={require('../../assets/images/ALFATOKEN.png')}
                            style={{height:64 ,width:"auto"}}
                            resizeMode={"contain"}
                           
                        />
                           <View style={{alignItems: 'center',marginTop:8}}><Text>ALFA Token</Text></View>
                        </TouchableOpacity>

            </View>

            
            <Typography style={{marginTop:24,}} size={16} >Posts</Typography>

             {allItems.map(i=>{
                return(
                    <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("WebView2",{url:i.link})}>
                    <View style={{flexDirection:"row",flex:1,paddingTop:16,paddingBottom:16,borderBottomWidth:1,borderBottomColor:"#f0f0f0"}}>
                    <View style={{flex:2 ,paddingTop:8,justifyContent:"space-between",flexDirection:"column"}}>
                        <Typography size={16} fontFamily="semiBold" bold >{i?.title}</Typography>
                        <Typography size={12} fontFamily="semiBold"  >{i?.description.length>80?i?.description.substring(0,80)+"...":i.description}</Typography>
                        <Typography size={10} fontFamily="semiBold" style={{marginTop:12}}  >{moment(i.pubDate).format("MMM dd, yyyy")}</Typography>
                    </View>
                    <View style={{flex:1}}>
                    <Image
                                  source={{uri:i?.thumbnail}}
                                   style={{height:80 ,width:"auto"}}
                                   resizeMode={"contain"}
                                  
                               />
                    </View>
                </View>
                </TouchableOpacity>
                )
            })}
          
    

            
            </Content>
            <Footer>
                <View style={{alignItems: 'center',justifyContent: 'center'}}>
                <Text>


 © 2012 - 2021 Copyright ALFASSA. All rights reserved</Text>
 </View>
            </Footer>
           
        </Container>
    )
};

const styles = StyleSheet.create({
    inputView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    paging: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,

    },
    header: {
        lineHeight: 40,
        marginLeft: 10,
        // textTransform: "capitalize"
    }
    ,
    main: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottomButton: {
        width: "100%",
        paddingBottom: 20,
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 10,
        alignItems: "flex-end"
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    buttonCard: {

        flexDirection: "column",
        alignItems: "center"
    },
    recentProducts: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 45,
        marginLeft: 5
    },
    recent: {
        marginBottom: 10
    },
    banner: {
        marginTop: 16,
    }

});
const mapStateToProps = (state) => {

    return {
        name: state.auth.details.EMP_NAME,
        type: state.auth.details.EMP_CONTRACT_TYPE,
        roleData: state.claims.roles,
        todaysale:state.dashboard.sales,
        quatersale:state.dashboard.quartersale,
        monthsale:state.dashboard.monthsale,
        chart:state.dashboard.chart
        }
}


LoginScreen.defaultProps={
    roleData: [],
    quatersale:[],
    monthsale:[],
    todaysale:[]
}
export default (LoginScreen)
