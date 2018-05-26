
import { Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';

const { SHORT, LONG } = Toast.durations;

const showToast = ({ message, duration }) => {
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
      duration,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  }
};

export default async (store) => {
  store.subscribe(() => {
    const { message, error } = store.getState();
    if (message) {
      showToast({ message, duration: SHORT });
    }

    if (error) {
      showToast({ message: error, duration: LONG });
    }
  });
};
