import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import parseDate from '../hooks/parseDate';
const DateRangePicker = ({onConfirm, init}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);

  const handleStartDateConfirm = date => {
    setStartDate(date.toISOString().split('T')[0]);
    hideStartDatePicker();
  };

  const handleEndDateConfirm = date => {
    setEndDate(date.toISOString().split('T')[0]);
    hideEndDatePicker();
  };
  const handleConfirm = () => {
    onConfirm(startDate, endDate);
  };
  React.useEffect(() => {
    if (init) {
      setStartDate(init.start);
      setEndDate(init.end);
    }
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showStartDatePicker}>
        <Text style={styles.dateText}>{startDate || 'Start Date'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showEndDatePicker}>
        <Text style={styles.dateText}>{endDate || 'End Date'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleConfirm}>
        <Text style={styles.confirmButton}>Confirm</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  dateText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  confirmButton: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#2ecc71',
    color: '#fff',
  },
});

export default DateRangePicker;
