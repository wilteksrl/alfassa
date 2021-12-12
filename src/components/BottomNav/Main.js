import React from "react";
import { Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux"

import Typography from "../Typography/Typography";
import IconButton from "../CustomButtons/IconButton";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { theme } from "../../config/theme";
const CustomButton = (props) => {
  let { sourceImage } = props;
  const navigation = useNavigation();
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
      {props.roleData.includes("5") &&<View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            iconColor={"black"}
            backgroundColor={"#F6F6F9"}
            text={"Customer"}
            iconName="users"
            onPress={() =>navigation.navigate("showCustomer")}
            padding={0}
            iconSize={20}
          />
        </View>}

        {props.roleData.includes("3") &&<View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            iconName="trending-up"
            iconType="feather"
            iconColor={"black"}
            backgroundColor={"#F6F6F9"}
            onPress={() =>navigation.navigate("Support Ticket")}
            text={"Tickets"}
            padding={0}
            iconSize={20}
          />
        </View>}
       {props.roleData.includes("1") && <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <IconButton
            iconName="plus-circle"
            iconType="feather"
            iconColor={"black"}
            backgroundColor={"#F6F6F9"}
            iconColor={"black"}
          onPress={() =>navigation.navigate("Checkout")}
          text={"Create Order"}
            padding={0}
            iconSize={25}
          />
        </View>}
        {props.roleData.includes("2") && <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <IconButton
            iconName="plus-circle"
            iconType="feather"
            iconColor={"black"}
            backgroundColor={"#F6F6F9"}
            iconColor={"black"}
          onPress={() =>navigation.navigate("Add Claims")}
          text={"Create Claim"}
            padding={0}
            iconSize={25}
          />
        </View>}
        {props.roleData.includes("6") &&<View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            iconColor={"black"}
            backgroundColor={"#F6F6F9"}
            text={"Stocklist"}
            padding={0}
            onPress={() =>navigation.navigate("Stocks")}
            iconName={"clipboard"}
            iconSize={20}
          />
        </View>}
        
        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            iconColor={"black"}
            backgroundColor={"#F6F6F9"}
            iconName={"user"}
            onPress={() =>navigation.navigate("Profile")}
            text={"Profile"}
            padding={0}
            iconSize={20}
          />
        </View>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 18,
    paddingTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 15,
    backgroundColor: "#F6F6F9",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  ButtonStyle: {
    flex: 1,
  },
});

CustomButton.defaultProps = {
  sourceImage: null,
};

const mapStateToProps = (state) => {
  return {
    details: state.auth.details,
    roleData: state.claims.roles,

  }
}

CustomButton.defaultProps = {
  roleData: []
}

export default connect(mapStateToProps,)(CustomButton);
