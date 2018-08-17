#!/bin/bash

cd android && ./gradlew assembleRelease && cd .. && /Users/olivermunala1/bin/dbxcli rm lifego/app-release.apk && /Users/olivermunala1/bin/dbxcli put /Users/olivermunala1/dev/bucketlist-react-native/BucketListNative/android/app/build/outputs/apk/release/app-release.apk lifego/app-release.apk
