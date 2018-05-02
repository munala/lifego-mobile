#!/bin/bash

cd android && ./gradlew assembleRelease && cd .. && /Users/olivermunala/bin/dbxcli rm app-release.apk && /Users/olivermunala/bin/dbxcli put /Users/olivermunala/dev/bucketlist-react-native/BucketListNative/android/app/build/outputs/apk/app-release.apk app-release.apk
