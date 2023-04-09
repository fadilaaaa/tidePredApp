import React from 'react';
import {
  Center,
} from 'native-base';
import Lottie from 'lottie-react-native';
import {StackActions} from '@react-navigation/native';

export default function SplashScreen({navigation}) {


  React.useEffect(() => {
    setTimeout(()=>{
      navigation.dispatch(StackActions.replace('InitialScreen'))
    },3000)
  }, []);

  return (
    <Center w="100%">
      <Center w="100%" h="100%">
        <Lottie
          source={require('../assets/splashAnimation.json')}
          autoPlay
          loop
        />
      </Center>
    </Center>
  );
}
