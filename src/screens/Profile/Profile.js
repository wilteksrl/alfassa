import React from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
// import SmallBanner from "../../components/Misc/SmallBanner"
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import Typography from '../../components/Typography/Typography';
// import Avatarwithouter from '../../components/List/Avatarwithouter';
// import HollowButton from "../../components/CustomButtons/HollowButton"
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import Avatar from "../../components/List/Avatar"
import Listitems from "../../components/List/Listitems"
import {connect} from "react-redux"
import { Divider } from 'react-native-paper'

 function Profile(props) {
// var ref_ids = []
//     let roleData=props.roleData;

// roleData.forEach(ELE => {
//     ref_ids.push( ELE.REF_ID)
// });

// console.log("hi"+props.roleData,props.roleData.includes("1"));

    return (
      <Container>
          <Header>
              <Nav
              centerComponent={<View  style={{marginLeft:"-110%",marginTop:8}}>
              <Typography size={19} type={"bold"} color={"textPrimary"}>Profile</Typography>
              </View>}
            //   title={"Profile"}
              />
          </Header>
          <Divider style={{ backgroundColor: 'black', height: 1 }} />

<Content>

<View style={{justifyContent:"center",alignContent:'center',alignItems:'center',marginTop:10}}>
<Avatar 
borderRadius= {500 / 2}
borderWidth= {5}
borderColor= {"black"}
avatar_url={props.details.EMP_IMAGE?"http://apps.insecticidesindia.com:8030/storage/"+props.details.EMP_IMAGE: 'https://www.clearmountainbank.com/wp-content/uploads/2020/04/male-placeholder-image.jpeg'} />
<Typography size={18} style={{marginTop:16}} type="bold">{props.details.EMP_NAME}</Typography>
{props.roleData.includes("1")&&<Typography size={15}>Manager</Typography>}
</View>
<View style={{marginTop:24}}>
    
<Listitems onPress={()=>props.navigation.navigate("Contact Info")} icon="contacts" name={"Contact Info"} />
 <Listitems icon="edit" onPress={()=>props.navigation.navigate("UpdateProfile")} name={"Edit Details"} />
    <Listitems onPress={()=>props.navigation.navigate("Change Password")} icon="settings" name={"Change Password"} />
</View>
</Content>
      </Container>
    )
}
const mapStateToProps=(state)=>{
    return {
        details:state.auth.details,
        roleData: state.claims.roles,

    }
}
Profile.defaultProps = {
    roleData : []
}

export default connect(mapStateToProps,{})(Profile)