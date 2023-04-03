import React from 'react';
import {Text, Input, Center, useToast} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import parseDate from '../hooks/parseDate';
export default function AddTide({navigation}) {
  const [tide, setHight] = React.useState('');
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDateConfirm = dates => {
    setDate(dates);
    hideDatePicker();
  };
  const toast = useToast();
  const handleConfirm = () => {
    console.log(tide);
    fetch('https://74ad-125-167-58-197.ap.ngrok.io/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: parseDate(date),
        high: tide,
      }),
    })
      .then(response => response.json())
      .then(json => {
        toast.show({
          title:"Data Berhasil Ditambah"
        })
        setHight('')
        // navigation.navigate('MonitoringScreen')
      }).catch(err=>console.log(err));
  };
  return (
    <Center w="100%">
      <Input
        mx="3"
        placeholder="Tinggi Gelombang"
        w="75%"
        value={tide}
        onChangeText={text => setHight(text)}
      />
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.dateText}>{parseDate(date) || 'Start Date'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleConfirm}>
        <Text style={styles.dateText}>{'Tambah'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </Center>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    margin: 10,
  },
});
