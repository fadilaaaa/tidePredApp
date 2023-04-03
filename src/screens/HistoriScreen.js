import React from 'react';
import {Text, Input, Center, useToast} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import parseDate from '../hooks/parseDate';
import DateRangePicker from '../components/DateRangePicker';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';

export default function HistoriScreen({navigation}) {
  const [param, setParam] = React.useState({});
  const [data, setData] = React.useState([]);
  const handleConfirm = (start, end) => {
    setParam({
      start: start,
      end: end,
    });
  };
  const toast = useToast();
  React.useEffect(() => {
    const now = new Date(Date.now());
    const end =
      Object.keys(param).length === 0
        ? parseDate(new Date(Date.now()))
        : parseDate(new Date(param.end));
    const start =
      Object.keys(param).length === 0
        ? parseDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        : parseDate(new Date(param.start));
    console.log(start, end);
    fetch(
      'https://74ad-125-167-58-197.ap.ngrok.io/getData?' +
        new URLSearchParams({
          start: start,
          end: end,
        }),
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        prepData = [];
        // Object.values(json.result['data']).forEach(item =>
        //   prepData.push([item.date, item.tide]),
        // );
        let cleaned_data = json.result;
        cleaned_data = json.data.map(item => {
          console.log(item['date']);
          return {
            date: parseDate(new Date(item['date'])),
            tide: item['high'].toFixed(2),
          };
        });
        setData(cleaned_data);
      })
      .catch(error =>
        // toast.show({
        //   color: 'red',
        //   borderColor: 'red',
        //   title: 'Data tidak ada',
        // }),
        console.log(error),
      );
  }, [param]);

  return (
    <Center w="100%" style={{paddingTop: 50}}>
      <DateRangePicker
        init={{
          end: parseDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
          start: parseDate(new Date(Date.now())),
        }}
        onConfirm={handleConfirm}
        style={{marginTop: 25}}
      />
      <DataTable
        data={data} // list of objects
        colNames={['date', 'tide']} //List of Strings
        noOfPages={1} //number
        backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
        headerLabelStyle={{color: 'grey', fontSize: 12}} //Text Style Works
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
