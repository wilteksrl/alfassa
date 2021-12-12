import React from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import Typography from '../../components/Typography/Typography';
import {Text, View, StyleSheet,ScrollView,Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import Avatar from "../../components/List/Avatar"
import {connect} from "react-redux"
import Listitems from "../../components/List/Listitems"
import { Divider } from 'react-native-paper'

function ContactInfo(props) {


    
    return (
        <Container>
           <Header>
               <Nav
               centerComponent={<View  style={{marginLeft:"-90%",marginTop:8}}>
               <Typography size={19} type={"bold"} color={"textPrimary"}>Contact Info</Typography>
               </View> }
            //    title="Contact Info"/>
            />
           </Header>
           <Divider style={{ backgroundColor: 'black', height: 1 }} />

            <Content>
            <View style={{alignItems:'center'}}>
<Avatar avatar_url={props.details.EMP_IMAGE?"http://apps.insecticidesindia.com:8030/storage/"+props.details.EMP_IMAGE: 'https://www.clearmountainbank.com/wp-content/uploads/2020/04/male-placeholder-image.jpeg'} />
<Typography style={{marginTop:8}} size={18} type="bold">{props.details.EMP_NAME}</Typography>
<Typography style={{marginTop:4}} size={12} >{props.details.EMP_CODE}</Typography>
<Typography style={{marginTop:4}} size={12} >{props.details.EMP_DESIGNATION}</Typography>
</View>
            <View style={styles.info}>
            <View style={styles.row}>
            <Typography size={16} type="bold">Mobile Number : </Typography>
            <Typography size={14}>{props.details.EMP_MOBILE_NO}</Typography>
            </View>
            <View style={styles.row}>
            <Typography size={16} type="bold">E-mail :</Typography>
            <Typography size={14}>{props.details.EMP_EMAIL}</Typography>
            </View>
            <View style={styles.row}>
            <Typography size={16} type="bold">Reporting Manager : </Typography>
            <Typography size={14}>{props.details.REPORTING_MANAGEER_NAME}</Typography>
            </View>
            <View style={styles.row}>
            <Typography size={16} type="bold">Approver Name : </Typography>
            <Typography size={14}>{props.details.APPROVER_NAME}</Typography>
            </View>
            <View style={styles.row}>
            <Typography size={16} type="bold">Area :</Typography>
            <Typography size={14}>{props.details.AREA_NAME}</Typography>
            </View>
            <View style={styles.row}>
            <Typography size={16} type="bold">Plant Allocated : </Typography>
            <Typography size={14}>{props.details.PLANT_NAME}</Typography>
            </View>
            
            <View style={styles.row}>
            <Typography size={16} type="bold">Level : </Typography>
            <Typography size={14}>{props.details.LEVEL_ID}</Typography>
            </View>
            
            <View style={styles.row}>
            <Typography size={16} type="bold">Contract Type : </Typography>
            <Typography size={14}>{props.details.EMP_CONTRACT_TYPE==1?"Contracted":"Permanent"}</Typography>
            </View>
            </View>
            
            </Content>
        </Container>
    )
}
const mapStateToProps=(state)=>{
    return {
        details:state.auth.details
    }
}

export default connect(mapStateToProps,{})(ContactInfo)

const styles = StyleSheet.create({
        info : {
            paddingTop:24,
            borderRadius:5,
            shadowOpacity:10
                },
                row:{
                    flexDirection:"row",
                    padding:10,
                    justifyContent:"space-between",
                    borderBottomWidth:2,
                    borderBottomColor:"#e2e2e2",
                }


})



