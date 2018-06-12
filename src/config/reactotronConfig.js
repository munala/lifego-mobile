/* eslint-disable no-console */
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

Reactotron
  .configure({
    name: 'Lifego',
  })
  .useReactNative()
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .use(reactotronRedux())
  .connect();
