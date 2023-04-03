import React from 'react';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  useToast
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const toast = useToast();

  const setToken = async (jwt)=>{
    try {
      const data = await AsyncStorage.setItem('@token', jwt);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = () => {
    fetch('https://74ad-125-167-58-197.ap.ngrok.io/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.access_token) {
          setToken(json.access_token)
          navigation.navigate('AddTide');
        }
      })
      .catch(error=>{
        console.log(error);
        
        toast.show({
          title:"login gagal"
        })
      });
  };


  React.useEffect(()=>{
    const getToken = async ()=>{
      try {
        const data = await AsyncStorage.getItem('@token');
        return data
      } catch (error) {
        console.log(error);
        return ''
      }
    }
    let token = ''
    try {
      token = getToken()
    } catch (error) {
      console.log(error);
    }
    
    
    if(token!==''){
      console.log(token);
      // navigation.navigate('AddTide');
    }
  },[])

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Login
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input onChangeText={text => setUsername(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text => setPassword(text)} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
