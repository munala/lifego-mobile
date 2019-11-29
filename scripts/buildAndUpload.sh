#!/bin/bash

cd android && rm -rf app/src/main/res/drawable-xhdpi-v4* && ./gradlew clean && ./gradlew assembleRelease && ./gradlew bundleRelease && cd .. && dbxcli rm lifego/app-release.apk && dbxcli put ./android/app/build/outputs/apk/release/app-release.apk lifego/app-release.apk
