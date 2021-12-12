import React from 'react';
import {Button, ThemeProvider} from 'react-native-elements';
import Typography from '../Typography/Typography';
import {ListItem, Icon, Avatar, Divider} from 'react-native-elements';
import {StyleSheet, Text, View} from 'react-native';
import Badge from '../Misc/Badge';
import NumberInput from '../NumberInput';
import SmallButton from '../CustomButtons/smallButton';
import {addCartProduct, updateCartProduct} from '../../redux/actions/Order';
import {connect} from 'react-redux';
import {theme} from '../../config/theme';
const CustomButton = (props) => {
  let {
    name,
    icon,
    bottomDivider,
    onPress,
    subtitle,
    date,
    desc,
    Plant,
    amount,
    discount,
    avatar_url,
    stock,
    numProps,
    onPressButton,
    onUpdate,
    itemData,
    num,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <ListItem
        onPress={onPress}
        bottomDivider={bottomDivider}
        containerStyle={{
          backgroundColor: 'white',
          borderBottomWidth: bottomDivider ? 1 : 0,
          borderColor: '#e2e2e2',
          padding: 5,
          paddingBottom: 15,
          paddingTop: 15,
        }}>
        <ListItem.Content style={{marginLeft: 0}}>
          <ListItem.Title style={styles.titleStyle}>
            <Text>{name && name}</Text>
          </ListItem.Title>
        </ListItem.Content>

        <View>
        {  amount&&<Typography size={16} color={'green'} type={'bold'}>
            {amount && amount}
          </Typography>
          
          }
         
          {stock && 
            <Typography size={16} color={'textSecondary'} type={'bold'}>
              {'Stock ' + stock}
            </Typography>
          }
          <View style={{marginTop: 10}}>
            {num && numProps.value ? (
              <NumberInput
                rounded
                totalHeight={40}
                initValue={numProps.value}
                step={1}
                onChange={(val) => onUpdate(val)}
                minValue={0}
                maxValue={50}
              />
            ) : (
              num && (
                <SmallButton
                  title="Add"
                  style={{width: 100}}
                  onPress={onPressButton}
                  type="outline"
                />
              )
            )}
          </View>
        </View>
      </ListItem>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'NunitoMedium',

    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 0,
    paddingBottom: 0,
    lineHeight: 24,
  },
  subtitleStyle: {
    marginTop: 0,
    paddingTop: 5,
    lineHeight: 14,
    fontFamily: 'NunitoLight',
    fontSize: 12,
  },
  subtitleStyle2: {
    marginTop: 0,
    paddingTop: 10,
    lineHeight: 14,
    color: theme.colors.textPrimary,
    fontSize: 14,
  },
  avatarStyle: {
    color: theme.colors.textPrimary,
    fontSize: 24,
  },
  banner: {
    width: 100,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#e2e2e2',
  },
  chevron: {
    color: theme.colors.textPrimary,
    fontSize: 24,
  },
});

CustomButton.defaultProps = {
  onPress: null,
};

export default CustomButton;
