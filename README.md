
# AgriPrice


## Contributors


### Installation
#### iOS
Based on the following articles:
- https://ionicframework.com/docs/developing/ios
- https://capacitorjs.com/docs/getting-started/with-ionic

1. Install XCode 
```bash
xcode-select --install
```
2. Install ios-sim & ios-deploy
```bash
sudo npm install -g ios-sim
```
```bash
brew install ios-deploy
```
3. Install Cocoapods
```bash
sudo gem install cocoapods
```
4. Add ios
```bash
npx cap add ios
```

#### Android
Based on the following articles:
- https://ionicframework.com/docs/developing/android
- https://capacitorjs.com/docs/getting-started/with-ionic

1. Ensure that you have the Android SDK and system configured. 
The following commands can be used to check if the SDK was configured.
```bash
adb devices
```

```bash
echo $ANDROID_SDK_ROOT
```

2. Add Android to Capacitor
```bash
npx cap add android
```
## Plugins used
* https://github.com/capacitor-community/http
