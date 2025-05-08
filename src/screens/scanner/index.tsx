import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppFontSize} from '../../const/app-font-size';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const ScannerScreen = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isActive, setIsActive] = useState(true);
  const isProcessing = useRef(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const [scannedValues, setScannedValues] = useState<Set<String>>(new Set());
  const {startValue, endValue} = route.params as {
    startValue: string;
    endValue: string;
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-39'],
    onCodeScanned: codes => {
      if (isProcessing.current || codes.length === 0) return;
      const value = codes[0]?.value ?? 'Không rõ';
      isProcessing.current = true;
      setIsActive(false);

      if (scannedValues.has(value)) {
        Alert.alert('Đã quét', 'Giá trị đã được quét trước đó');
        isProcessing.current = false;
        setIsActive(true);
        return;
      }
      const startValueNum = parseInt(startValue, 10);
      const endValueNum = parseInt(endValue, 10);
      const valueNum = parseInt(value.slice(1), 10);
      if (valueNum < startValueNum || valueNum > endValueNum) {
        Alert.alert(
          'Giá trị không hợp lệ',
          `Giá trị ${value} không nằm trong khoảng ${startValue} - ${endValue}`,
          [
            {
              text: 'OK',
              onPress: () => {
                isProcessing.current = false;
                setIsActive(true);
              },
            },
          ],
        );
        return;
      }
      const newValue = value.slice(1);
      const newSet = scannedValues.add(newValue);
      setScannedValues(newSet);
      Alert.alert('Đã quét', newValue, [
        {
          text: 'OK',
          onPress: () => {
            isProcessing.current = false;
            setIsActive(true);
          },
        },
      ]);
    },
  });

  if (!device || !hasPermission) {
    return (
      <View style={styles.loading}>
        <Text onPress={() => navigation.navigate('ResultScreen')}>
          Đang tải camera...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera */}
      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
        />
        <View style={styles.scanFrame} />
      </View>

      <TouchableOpacity
        style={styles.endScanButton}
        onPress={() => {
          setIsActive(false);
          navigation.navigate('ResultScreen', {
            scannedData: Array.from(scannedValues),
          });
        }}>
        <Text style={styles.endScanText}>Kết thúc quét</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  title: {
    marginTop: 64,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraContainer: {
    width: '90%',
    aspectRatio: 1.5,
    marginTop: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  scanFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: 'orange',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  endScanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 32,
  },
  endScanText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: AppFontSize.s16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
