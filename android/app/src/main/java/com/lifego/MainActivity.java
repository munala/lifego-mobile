package com.lifego;
import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;
import com.calendarevents.CalendarEventsPackage;

public class MainActivity extends ReactActivity implements OnImagePickerPermissionsCallback  {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    private PermissionListener listener;

    @Override
    protected String getMainComponentName() {
        return "LifeGo";
    }
    @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
    @Override
    public void setPermissionListener(PermissionListener listener)
    {
      this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
      CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
      if (listener != null)
      {
        listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
      }
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
