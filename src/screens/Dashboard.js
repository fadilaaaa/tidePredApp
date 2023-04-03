import React from 'react';
import {View, Radio, Center} from 'native-base';
import {Dimensions} from 'react-native';
import DateRangePicker from '../components/DateRangePicker';
import parseDate from '../hooks/parseDate';
import DataTable from 'react-native-datatable-component';

import {LineChart} from 'react-native-chart-kit';

prepareURL = '';
export default function Dashboard({navigation}) {
  const [dataq, setData] = React.useState([]);
  const [dataChart, setDataChart] = React.useState([]);
  const [isChart, setIsChart] = React.useState(false);
  const [param, setParam] = React.useState({});

  const handleConfirm = (start, end) => {
    setParam({
      start: start,
      end: end,
    });
  };

  React.useEffect(() => {
    const now = new Date(Date.now());
    const start =
      Object.keys(param).length === 0
        ? parseDate(now)
        : parseDate(new Date(param.start));
    const end =
      Object.keys(param).length === 0
        ? parseDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
        : parseDate(new Date(param.end));

    const log = async () => {
      console.log(dataq);
    };

    fetch(
      'https://74ad-125-167-58-197.ap.ngrok.io/' +
        'forecast?' +
        new URLSearchParams({
          start: start,
          end: end,
        }),
    )
      .then(response => response.json())
      .then(json => {
        console.log(json.result);

        let cleaned_data = json.result;
        cleaned_data = json.result.map(item => {
          console.log(item['date']);
          return {
            date: parseDate(new Date(item['date'])),
            tide: item['tide'].toFixed(2),
          };
        });
        console.log(cleaned_data);
        setData(cleaned_data);
        log();
      })
      .catch(error => console.log(error));
  }, [param]);
  return (
    <View style={{backgroundColor: 'white'}}>
      <Center style={{paddingTop: 50}} w="100%">
        <DateRangePicker
          style={{marginTop: 25}}
          init={{
            start: parseDate(new Date(Date.now())),
            end: parseDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
          }}
          onConfirm={handleConfirm}
        />
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={isChart}
          onChange={nextIsChart => {
            // setIsChart(!isChart);
            setIsChart(nextIsChart);
          }}>
          <Radio value={true} my={1}>
            Chart
          </Radio>
          <Radio value={false} my={1}>
            Table
          </Radio>
        </Radio.Group>
        {isChart ? (
          Object.keys(dataq).length !== 0 && (
            <LineChart
              data={{
                //labels: dataq.map(item => new Date(item.date)),

                datasets: [
                  {
                    data: dataq.map(item => {
                      return item.tide;
                    }),
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              // yAxisInterval={}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `black`,
                labelColor: (opacity = 1) => `black`,
              }}
              verticalLabelRotation={30}
            />
            // <LineChart
            //   data={{
            //     labels: [
            //       'January',
            //       'February',
            //       'March',
            //       'April',
            //       'May',
            //       'June',
            //     ],
            //     datasets: [
            //       {
            //         data: [
            //           Math.random() * 100,
            //           Math.random() * 100,
            //           Math.random() * 100,
            //           Math.random() * 100,
            //           Math.random() * 100,
            //           Math.random() * 100,
            //         ],
            //       },
            //     ],
            //   }}
            //   width={Dimensions.get('window').width} // from react-native
            //   height={220}
            //   yAxisInterval={1} // optional, defaults to 1
            //   chartConfig={{
            //     backgroundColor: '#e26a00',
            //     backgroundGradientFrom: '#fb8c00',
            //     backgroundGradientTo: '#ffa726',
            //     decimalPlaces: 2, // optional, defaults to 2dp
            //     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            //     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            //     style: {
            //       borderRadius: 16,
            //     },
            //     propsForDots: {
            //       r: '6',
            //       strokeWidth: '2',
            //       stroke: '#ffa726',
            //     },
            //   }}
            //   bezier
            //   style={{
            //     marginVertical: 8,
            //     borderRadius: 16,
            //   }}
            // />
          )
        ) : (
          <DataTable
            data={dataq} // list of objects
            colNames={['date', 'tide']} //List of Strings
            noOfPages={1} //number
            backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
            headerLabelStyle={{color: 'grey', fontSize: 12}} //Text Style Works
          />
        )}
      </Center>
    </View>
  );
}
