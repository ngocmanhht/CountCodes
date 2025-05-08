import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppColor} from '../../const/app-color';
import {useNavigation, useRoute} from '@react-navigation/native';

export const ResultScreen = () => {
  const route = useRoute();
  const params = route.params as {
    scannedData?: string[];
  };
  const scannedData = params?.scannedData;
  const navigation = useNavigation();
  const handleNewData = () => {
    // Handle navigation to input screen or other action
    console.log('Navigate to input new data');
    navigation.navigate('InputScreen' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.table}>
          {scannedData?.map(rowIndex => (
            <View
              key={`cell-${rowIndex}`}
              style={[
                styles.cell,
                {
                  borderWidth: 1,
                  backgroundColor: AppColor.white,
                  borderRadius: 8,
                  borderColor: AppColor.gray,
                },
              ]}>
              <Text style={styles.cellText}>{'cell123111'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.newDataButton} onPress={handleNewData}>
        <Text style={styles.newDataButtonText}>Nhập dữ liệu mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.primary,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  table: {
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 16,
    color: '#333',
  },
  newDataButton: {
    backgroundColor: AppColor.white,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  newDataButtonText: {
    color: AppColor.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
