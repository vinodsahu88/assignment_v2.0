import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Background from '../componet/Comman/Background';
import Loading from '../componet/Comman/Loading';
import InvoiceListItem from '../componet/Dashboard/InvoiceListItem';
import LogoutButton from '../componet/Dashboard/LogoutButton';
import ThemeChange from '../componet/Dashboard/ThemeChange';
import UserInfoCard from '../componet/Dashboard/UserInfoCard';
import {Invoice} from '../modals/Invoice';
import {switchMode} from '../redux/ThemeAction';
import {Mode} from '../Redux/ThemeReducer';
import {getInvoice} from '../services/Services';

const SPACING = 20;
const ITEM_SIZE = 80 + SPACING;

const Dashboard = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Invoice[] | null>();

  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  useEffect(() => {
    setIsLoading(true);
    getInvoice().then(json => {
      console.log(json);
      setIsLoading(false);
      setData(json);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LogoutButton
          profileCallback={() => {
            navigation.goBack();
          }}
        />
      ),
      headerLeft: () => (
        <ThemeChange
          profileCallback={() => {
            dispatch(switchMode(theme === 'light' ? 'dark' : 'light'));
          }}
        />
      ),
      headerBackVisible: false,
    });
  });

  return (
    <Background>
      <Loading loading={isLoading} />
      <UserInfoCard />
      <FlatList
        data={data}
        contentContainerStyle={{padding: 8}}
        renderItem={({item}: {item: Invoice; index: number}) => {
          return <InvoiceListItem invoice={item} />;
        }}
      />
    </Background>
  );
};

export default Dashboard;
