
import { Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';

export default (store) => {
  store.subscribe(() => {
    const { message, error } = store.getState();
    if (message) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50,
        );
      } else {
        Toast.show(message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
    }
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50,
        );
      } else {
        Toast.show(error, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
    }
  });
};
