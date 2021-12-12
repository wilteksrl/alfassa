import React, { memo, useRef, useState, useCallback } from 'react';
import Button from '../../../components/CustomButtons/Button';
import Container from '../../../components/Layout/container';
import Header from '../../../components/Layout/header';
import Content from '../../../components/Layout/content';
import Footer from '../../../components/Layout/footer';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, CheckBox } from 'react-native-elements';
import { Divider } from 'react-native-paper'

import {
  Text,
  View,
  StyleSheet,
  Image, Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import InputField from '../../../components/CustomInputs/InputField';

import ClaimTab from '../../../components/Misc/ClaimTabs';
import Typography from '../../../components/Typography/Typography';
import Nav from '../../../components/Headers/header';
import SmallButton from '../../../components/CustomButtons/smallButton';
import BSList from '../../../components/List/BottomSheetList';
import { createClaim, getClaims, createZeroClaim, getClaimsLimit, claimCycle } from '../../../redux/actions/Claims';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
const showCustomer = (props) => {
  let RBSheetCom = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [refresh, setRefresh] = useState(false)
  const [shouldShow, setShouldShow] = useState(true);
  let TravelTotal =
    (props.claimData.END_KM - props.claimData.START_KM > 0
      ? (props.claimData.END_KM - props.claimData.START_KM) *
      props.level.EXP_PER_KM_RATE
      : 0) +
    props.claimData.EXP_TAXI_AUTO +
    props.claimData.EXP_FUEL +
    props.claimData.EXP_PLANE +
    props.claimData.EXP_BUS_TRAIN;

  let TotalDa =
    Number(props.claimData.DA_RATES_LOCAL) +
    Number(props.claimData.DA_RATES_OUTST);

  let TotalAcc = props.claimData.EXP_HOTEL;

  let TotalTel = props.claimData.EXP_MOBILE_INTERNET;

  let TotalMisc =
    props.claimData.EXP_VEH_REPAIR +
    props.claimData.EXP_STATIONARY +
    props.claimData.EXP_MISC;
  const handleClick = () => {
    if (validZero) {
      setSelection(!isSelected)
    }
    else { Alert.alert('Max Zero Claim Submitted') }
  }
  const handleSubmit = () => {
    if (!isSelected) {
      if (TravelTotal + TotalDa + TotalAcc + TotalTel + TotalMisc > 0)
        props
          .createClaim({
            ...props.claimData,
            CLAIM_DATE: date,
            MISC_COMMENTS: comment,
            // EXP_FUEL: props.level.EXP_FUEL,
            EXP_PER_KM_RATE: props.level.EXP_PER_KM_RATE,
            TOTAL_CLAIMED_AMOUNT:
              TravelTotal + TotalDa + TotalAcc + TotalTel + TotalMisc,
          })
          .then((res) => {
            setTimeout(() => {
              Snackbar.show({
                text: 'Claim created succesfully',
                duration: Snackbar.LENGTH_SHORT,
              });
            }, 200);

            props.navigation.goBack();

            props.getClaims(1);
          })
          .catch((err) => {
            setTimeout(() => {
              Snackbar.show({
                text: 'Unable to create claim',
                duration: Snackbar.LENGTH_SHORT,
              });
            }, 200);
          });
      else
        setTimeout(() => {
          Snackbar.show({
            text: 'Total claim amount should be greater than zero',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
    else {
      props
        .createZeroClaim({
          ...props.zeroData,
          CLAIM_DATE: date,
          MISC_COMMENTS: comment,

          // EXP_FUEL: props.level.EXP_FUEL,
        })
        .then((res) => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Zero Claim created succesfully',
              duration: Snackbar.LENGTH_SHORT,
            });
          }, 200);

          props.navigation.goBack();

          props.getClaims(1);
        })
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClaimsLimit()
      claimCycle()
      setComment()
      setSelection(false)
    }, [date])
  );

  const claimCycle = () => {
    props.claimCycle().then(() => {
    }).catch((err) => {
    })
  }

  const getClaimsLimit = () => {
    props.getClaimsLimit().then(() => {
    }).catch((err) => {
    })
  }

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var monthName = months[date.getMonth()];

  let submitted = 0;
  let zero = 0;
  if (props.cycleData.length > 0) {
    for (const x of props.cycleData) {
      cycle = date.getDate() <= 15 ? "H1" : "H2"
      if (cycle == x.CYCLE && monthName == x.MONTH && date.getFullYear() == x.YEAR) {
        submitted = x.SUBMITTED
        zero = x.ZERO
      }
    }
  }
  let total = submitted - zero

  var dt = new Date();
  dt.setDate(dt.getDate() - Number(props.days));

  let validSubmit = total < 13 ? true : false
  let validZero = zero < 2 ? true : false
  let valid = props.claims.findIndex((item) => new Date(item.CLAIM_DATE).toDateString() == date.toDateString()) == -1 ? true : false

  return (
    <Container>
      <Header>
        <Nav
        centerComponent={<View  style={{marginLeft:"-90%",marginTop:8}}>
        <Typography size={19} type={"bold"} color={"textPrimary"}>Add Claim</Typography>
        </View> }
        />
      </Header>
      <Divider style={{ backgroundColor: 'black', height: 1 }} />


      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          open={true}
          minimumDate={dt}
          maximumDate={new Date()}
          mode={'date'}
          onChange={(e, val) => {
            setShowPicker(false);

            val && setDate(val);
          }}
          display="default"
        />
      )}

      <Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 5,
          }}>
          <View style={{ flex: 1 }}>
            
            <View style={{ flexDirection: 'row', flexGrow: 1, marginLeft: 5, marginTop: 8, justifyContent: 'space-between', alignItems: "center" }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon onPress={() => setShowPicker(true)} type="feather" name="calendar" size={18} />
                <Typography
                  size={12}

                  color={'textSecondary'}>
                  {date.toDateString()}
                </Typography>
              </View>
              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Typography size={12} style={styles.addCust} color={"primary"}>Change Date</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: -14, marginTop: -5, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }}>
          <CheckBox
            // style={{backgroundColor:"#F6F6F9",borderTopLeftRadius:10}}
            checked={isSelected}
            // disabled={!validZero}
            onPress={() => handleClick()} />
          <View style={{ marginTop: 15 }}>
            <Typography size={15}>Mark No Claim (Submit Zero Claim)</Typography>
          </View>
        </View>

        {validSubmit ? <View>
          {valid ? <View>

            {!isSelected ? <View style={styles.tabs}>



              <ClaimTab
                iconType="material"
                refreshing={refresh}
                onRefresh={() => getClaimsLimit()}
                iconName="airplanemode-active"
                title="Travel"
                price={'₹ ' + TravelTotal}
                onPress={() => props.navigation.navigate('cl-travel')}
              />
              <ClaimTab
                iconType="material"
                iconName="hotel"
                title="Accomodation"
                price={'₹ ' + TotalAcc}
                onPress={() => props.navigation.navigate('cl-hotel')}
              />

              <ClaimTab
                iconType="material"
                iconName="account-balance-wallet"
                title="Daily Allowance"
                price={'₹ ' + TotalDa}
                onPress={() => props.navigation.navigate('cl-da')}
              />

              <ClaimTab
                iconType="material"
                iconName="local-phone"
                title="Telephone"
                price={'₹ ' + TotalTel}
                onPress={() => props.navigation.navigate('cl-mobile')}
              />
              <ClaimTab
                iconType="entypo"
                iconName="colours"
                title="Miscellaneous"
                price={'₹ ' + TotalMisc}
                onPress={() => props.navigation.navigate('cl-misc')}
              />
              <View>
                <View style={{ marginLeft: 10 }}>
                  <Typography size={15} type={'bold'}>Comments</Typography>

                </View>
                <InputField
                  value={comment}
                  onChangeText={(value) => setComment(value)}
                  placeholder="Enter Comments"
                />
              </View>
            </View> : <View>
              <View style={{ marginLeft: 10 }}>
                <Typography size={15} type={'bold'}>Comments</Typography>

              </View>
              <InputField
                value={comment}
                onChangeText={(value) => setComment(value)}
                placeholder="Enter Comments"
              />
            </View>}</View> : <View>
            {!isSelected ?
              <View style={{ flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center", marginTop: '50%' }}>
                <Typography>

                  Claim for selected date already exist

            </Typography>
              </View> : <View>
                <View style={{ marginLeft: 10 }}>
                  <Typography size={15} type={'bold'}>Comments</Typography>

                </View>
                <InputField
                  value={comment}
                  onChangeText={(value) => setComment(value)}
                  placeholder="Enter Comments"
                />
              </View>}

          </View>
          }</View> :
          <View>
            {!isSelected ? <View style={{ flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center", marginTop: '50%' }}>
              <Typography>

                Max Claim Submitted

      </Typography>
            </View> : <View>
              <View style={{ marginLeft: 10 }}>
                <Typography size={15} type={'bold'}>Comments</Typography>

              </View>
              <InputField
                value={comment}
                onChangeText={(value) => setComment(value)}
                placeholder="Enter Comments"
              />
            </View>}
          </View>}



        <RBSheet
          ref={(ref) => {
            RBSheetCom = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              padding: 24,
              flex: 1,
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
          <BSList
            iconType="material"
            iconName="airplanemode-active"
            title="Travel"
            price="₹450"
          />

          <BSList
            iconType="material"
            iconName="fastfood"
            title="Food"
            price="₹450"
          />

          <BSList
            iconType="material"
            iconName="hotel"
            title="Accomodation"
            price="₹450"
          />

          <BSList
            iconType="material"
            iconName="account-balance-wallet"
            title="Daily Allowance"
            price="₹450"
          />

          <BSList
            iconType="material"
            iconName="local-phone"
            title="Telephone"
            price="₹450"
          />
          <BSList
            iconType="entypo"
            iconName="colours"
            title="Miscellaneous"
            price="₹450"
          />
        </RBSheet>
      </Content>

      <Footer>
        <Button
          style={{ margin: 24 }}
          title="Submit Claim"
          disabled={(!valid || !validSubmit) && !isSelected}
          onPress={() => handleSubmit()}
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  infoChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  border: {
    borderLeftWidth: 2,
    borderColor: '#e2e2e2',
  },

  addCust: {
    lineHeight: 40,
    marginLeft: 70,
  },
  table: {
    margin: 16,
    marginTop: 8,
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    paddingLeft: 12,
  },
  row: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  tabs: {
    marginTop: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    level: state.claims.level,
    claimData: state.claims.newClaim,
    claims: state.claims.claims,
    cycleData: state.claims.cycle,
    zeroData: state.claims.zeroclaim,
    roleData: state.claims.roles,

    days: state.claims.MAX_CLAIM_DAYS_LIMIT,
  };
};
export default connect(mapStateToProps, { createClaim, claimCycle, getClaims, createZeroClaim, getClaimsLimit })(
  memo(showCustomer),
);
