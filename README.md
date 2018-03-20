# react-native-loader-overlay
This package using the react-native-loader and show the loading on the modal

![Demo](https://raw.githubusercontent.com/duyluonglc/react-native-loader-overlay/master/loading.gif)

# Usage
## Installation
Install it via npm:

```
npm i -S react-native-loader-overlay
```

### Android
For Android, it works out of the box.

### iOS
For iOS, add `ART.xcodeproj` from `node_modules/react-native/Libraries/ART` to your Libraries then link `libART.a`.

## How to use
```js
import Loading from 'react-native-loader-overlay';

// ...
this.loading = Loading.show({
  color: '#FFFFFF',
  size: 20,
  overlayColor: 'rgba(0,0,0,0.5)',
  closeOnTouch: false,
  loadingType: 'Bars', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
})
...
Loading.hide(this.loading)

```
