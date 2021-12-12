import { Divider } from 'react-native-paper'

import React, { memo, useEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import Timeline from 'react-native-timeline-flatlist'
import Container from './../components/Layout/container';
import Header from './../components/Layout/header';
import Content from './../components/Layout/content';
import Footer from './../components/Layout/footer';
import { Icon } from 'react-native-elements';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
import ClaimList from './../components/List/offerList';
import AvatarWithMore from './../components/List/AvatarWithMore';
import Search from './../components/CustomInputs/SearchField';
import Typography from './../components/Typography/Typography';
import Nav from "./../components/Headers/header"
import { getAnnouncments } from "./../redux/actions/Utils"
import { connect } from "react-redux"
import { theme } from "../config/theme"
import Avatar from "../components/List/Image"

function AnnouncmentDetail(props) {


    let data = props.route.params
    const data2 = [
        { time: '', title: "Valid From", description: new Date(data.VALID_FROM).toDateString(), descriptionStyle: { color: theme.colors.textPrimary, fontFamily: "Nunito" }, titleStyle: { color: theme.colors.textPrimary, fontFamily: "Nunito", fontWeight: "bold" } },
        {
            time: '', title: "Valid To", description: new Date(data.VALID_TILL).toDateString(),
        },


    ]




    return (
        <Container>
            <Header>
                <Nav
                    leftComponent={<View style={{ marginTop: 8,flexDirection:'row',marginRight:'-100%'}}><Icon onPress={() => { props.navigation.goBack();
                    }}
                        name="chevron-left" type={"feather"} size={30} style={{ marginLeft: 10 }} />
                        <View style={{marginTop:3,marginLeft:2}}>
                <Typography size={19} type={"bold"} color={"textPrimary"}>{data.TITLE}</Typography>
                </View>
                    </View>}

                // centerComponent={<View  style={{marginTop:8}}>
                // <Typography size={19} type={"bold"} color={"textPrimary"}>{data.TITLE}</Typography>
                // </View> }
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />

            <Content>
                <View>
                    {/* <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>{data.TITLE}</Typography> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: 5 }}>
                            <Icon
                                type="ionicon"
                                name="location-outline"
                                size={22}
                            />
                            <Typography size={18} type={"regular"} color={"textPrimary"}>{data.REGION_NAME}</Typography>

                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            {/* <Typography  size={15} type={"bold"}>Valid From </Typography>
                <Typography>{new Date(data.VALID_FROM).toDateString()}</Typography> */}
                            <Typography size={15} type={"bold"}>Valid Till </Typography>
                            <Typography>{new Date(data.VALID_TILL).toDateString()}</Typography>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar avatar_url={data.IMAGE ? "http://apps.insecticidesindia.com:8030/storage/" + data.IMAGE : 'https://image.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg'} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.table}>
                        <View style={styles.header2}>

                            <Typography size={17} color={"textPrimary"} type="bold" >Details</Typography>
                        </View>
                        <View style={styles.bottom}>
                            <Typography size={15} color={"textSecondary"}>{data.DESCRIPTION}</Typography>
                        </View>
                    </View>

                </View>



            </Content>

        </Container>
    )
}


const styles = StyleSheet.create({
    header: {
        lineHeight: 40,
        marginLeft: 5,

    },
    addCust: {
        lineHeight: 40,
        marginLeft: 70
    },

    table: {
        marginTop: '10%',
        marginBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden"
    },
    header2: {
        backgroundColor: "#E0E0E0",
        padding: 8,
        paddingLeft: 12,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    bottom: {
        backgroundColor: "#F2F2F2",
        flexDirection: "row",
        padding: 12,
        height: 120,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e2e2",
    }

})
const mapStateToProps = (state) => {
    return {
        announcment: state.utils.offers
    }
}
export default connect(mapStateToProps, { getAnnouncments })(AnnouncmentDetail);