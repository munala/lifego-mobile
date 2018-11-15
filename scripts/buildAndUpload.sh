#!/bin/bash

cd android && ./gradlew assembleRelease && cd .. && dbxcli rm lifego/app-release.apk && dbxcli put ./android/app/build/outputs/apk/release/app-release.apk lifego/app-release.apk
