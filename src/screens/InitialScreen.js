import React from 'react';
import {
  Center,
  Box,
  VStack,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/Octicons';


export default function InitialScreen({ navigation }) {
  React.useEffect(()=>{
    fetch('https://74ad-125-167-58-197.ap.ngrok.io/getData?')
  .then(response => response.json())
  .then(commits => console.log(commits))
  },[])
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack space={3} mt="5">
          <Button
            onPress={() => navigation.navigate('Dashboard')}
            leftIcon={<Icon name="telescope" size={24} color="white" />}
            mt="2"
            colorScheme="indigo">
            Predict
          </Button>
          <Button
            onPress={() => navigation.navigate('MonitoringScreen')}
            leftIcon={<Icon name="eye" size={24} color="white" />}
            mt="2"
            colorScheme="indigo">
            Monitoring
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
