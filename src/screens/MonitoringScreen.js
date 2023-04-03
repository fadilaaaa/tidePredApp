import React from 'react';
import {
  Center,
  Box,
  VStack,
  Button,
} from 'native-base';
import Icon  from 'react-native-vector-icons/Octicons';

export default function MonitoringSceen({ navigation }) {
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack space={3} mt="5">
          <Button
            onPress={()=>navigation.navigate("HistoriScreen")}
            leftIcon={<Icon name="eye" size={24} color="white" />}
            mt="2"
            colorScheme="indigo">
            Lihat Histori
          </Button>
          <Button
            onPress={()=>navigation.navigate("Login")}
            leftIcon={<Icon name="diff-added" size={24} color="white" />}
            mt="2"
            colorScheme="indigo">
            Tambah Data
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
