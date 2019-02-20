/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';

console.disableYellowBox = true;

type Props = {};

type States = {
  modalVisible: boolean,
  scanResult: string,
  deviceWidth: number,
  deviceHeight: number
}

export default class App extends Component<Props, States> {

  state = {
    scannerVisible: false,
    scanResult: '',
    deviceWidth: 0,
    deviceHeight: 0
  }

  onCloseClick = () => {
    Orientation.unlockAllOrientations();
    this.setState({
      scannerVisible: false
    });
  }

  onScanClick = () => {
    const { width, height } = Dimensions.get('window');
    if (width < height) {
      Alert.alert(
        'Notice',
        'You need to rotate your devie to landscape',
        [
          {text: 'OK', onPress: () => {}},
        ],
        {cancelable: false},
      );
    } else {
      Orientation.lockToLandscape();
      this.setState({
        scannerVisible: true,
        scanResult: '',
        deviceWidth: width,
        deviceHeight: height
      });
    }
  }

  onScanSuccess = e => {
    Orientation.unlockAllOrientations();
    this.setState({
      scannerVisible: false,
      scanResult: e.data
    });
  }

  render() {
    const {
      deviceHeight,
      deviceWidth,
      scannerVisible,
      scanResult
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onScanClick}>
          <Icon name="camera" size={50} color="#900" />
        </TouchableOpacity>
        <Text>{scanResult}</Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={scannerVisible}
        >
          <QRCodeScanner
            onRead={this.onScanSuccess}
            cameraStyle={
              {
                width: deviceWidth,
                height: deviceHeight
              }
            }
          />
          <TouchableOpacity style={styles.buttonTouchable} onPress={this.onCloseClick}>
            <Icon name="close" size={50} color="#900" />
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
