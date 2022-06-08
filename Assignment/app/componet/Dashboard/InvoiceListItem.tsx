import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import translate from '../../localization/i18n';
import {Invoice} from '../../modals/Invoice';
import {Mode} from '../../Redux/ThemeReducer';
import {AppColors_Light, AppColors_Dark} from '../../utils/AppColors';

const InvoiceListItem = ({invoice}: {invoice: Invoice}) => {
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  return (
    <View
      style={{
        ...style.container,
        ...{
          backgroundColor:
            theme === 'light'
              ? AppColors_Light.invoiceCardBackground
              : AppColors_Dark.invoiceCardBackground,
        },
      }}>
      <Image
        source={require('../../resources/icons/invoices.png')}
        style={{
          ...style.invoice_icon,
          ...{
            tintColor:
              theme === 'light'
                ? AppColors_Light.invoiceCardText
                : AppColors_Dark.invoiceCardText,
          },
        }}></Image>
      <View style={{flex: 1, marginStart: 10}}>
        <View style={style.invoice_container}>
          <Text
            style={{
              ...style.heading,
              ...{
                color:
                  theme === 'light'
                    ? AppColors_Light.invoiceCardText
                    : AppColors_Dark.invoiceCardText,
              },
            }}>
            {translate('invoice_number') + ' ' + invoice.invoiceNumber}
          </Text>
          <Text
            style={{
              ...style.heading,
              ...{
                color:
                  theme === 'light'
                    ? AppColors_Light.invoiceCardText
                    : AppColors_Dark.invoiceCardText,
              },
            }}>
            {invoice.date}
          </Text>
        </View>
        <Text
          style={{
            ...style.heading,
            ...{
              color:
                theme === 'light'
                  ? AppColors_Light.invoiceCardText
                  : AppColors_Dark.invoiceCardText,
            },
          }}>
          {translate('name') + ' ' + invoice.custumerName}
        </Text>
        <Text
          style={{
            ...style.heading,
            ...{
              color:
                theme === 'light'
                  ? AppColors_Light.invoiceCardText
                  : AppColors_Dark.invoiceCardText,
            },
          }}>
          {translate('amount') +
            ' ' +
            invoice.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    shadowColor: 'rgba(255,255,255,05)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    //transform: [{scale}],
    borderRadius: 8,
    padding: 6,
  },
  invoice_container: {flexDirection: 'row', justifyContent: 'space-between'},
  invoice_icon: {
    marginStart: 8,
    width: 45,
    height: 45,
  },
  heading: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
});

export default InvoiceListItem;
