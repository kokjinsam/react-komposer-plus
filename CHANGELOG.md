# ChangeLog

## v2.0.2
07-June-2016

* Added the ability to pass props into loading component. (PR by clayne11, see [here](https://github.com/kadirahq/react-komposer/pull/47))

## v2.0.0
04-June-2016

* Separated all functions into modules. So now we can import individual function like this:
  ```
  import composeAll from 'react-komposer-plus/lib/composeAll';
  ```
* Added `composeWithRedux`. Deprecated `react-komposer-redux`.

## v1.8.0
09-April-2016

* Added support to React 15.x.x

## v1.7.2
30-March-2016

* Added disableMode support for composeAll.

## v1.7.1
30-March-2016

* Removed react-native from peerDependencies.

### v1.7.0
30-March-2016

* Removed default loading and error components in ReactNative. User always needs to provide them.
* Earlier we conditionally require react-native and use it. But, it's not going to work with Webpack as it needs RN to be available inside the project.

### v1.6.0
30-March-2016

* Added a way to disable the functionality of React Komposer. See [more](https://github.com/kadirahq/react-komposer#disable-functionality).

### v1.5.0
30-March-2016

* Added loading components for ReactNative. See: [PR64](https://github.com/kadirahq/react-komposer/pull/64)

### v1.4.1
16-March-2016

* Removed browser flag completely where it might give us errors in Meteor.

### v1.4.0
16-March-2016

* Added support for React Native. See: [PR53](https://github.com/kadirahq/react-komposer/pull/53)

### v1.3.3

* Fixed some issue with Meteor's Tracker integration. See [PR49](https://github.com/kadirahq/react-komposer/pull/49)

### v1.3.2

* Updated `_mounted` internal state when unmounting. See: [PR39](https://github.com/kadirahq/react-komposer/pull/39)

### v1.3.1
* Fix a small typo. See: [#28](https://github.com/kadirahq/react-komposer/pull/28)

### v1.3.0
* Implemented purity in containers. See: [#19](https://github.com/kadirahq/react-komposer/issues/19).

### v1.2.1

* Stop wrapping the UI component with a div. See: [#15](https://github.com/kadirahq/react-komposer/issues/15)

### v1.2.0

* Added custom loading and error components to all composers. See: [#12](https://github.com/kadirahq/react-komposer/pull/12)

### v1.1.0

* Added `composeAll` utility.
* Allow to pass custom error component and loading component as options. See: [#7](https://github.com/kadirahq/react-komposer/issues/7)
* Allow to return a cleanup function from the tracker composerFunction as well. See: [#8](https://github.com/kadirahq/react-komposer/issues/8)

### v1.0.0

* Initial Release
