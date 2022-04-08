package com.example.tp2;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;

/**
 * Created by franc on 2019-03-11.
 */

public class DeviceInfoDialogFragment extends DialogFragment {
    static Context mContext;
    static String mDeviceName;
    static String mDeviceInfo;
    static boolean mIsInFavorites;

    public static DeviceInfoDialogFragment newInstance(String deviceName, String deviceInfo, boolean isInFavorites, Context context) {
        mContext = context;
        mDeviceName = deviceName;
        mDeviceInfo = deviceInfo;
        mIsInFavorites = isInFavorites;
        DeviceInfoDialogFragment frag = new DeviceInfoDialogFragment();
        Bundle args = new Bundle();
        args.putString("title", mDeviceName);
        args.putString("info", mDeviceInfo);
        frag.setArguments(args);
        return frag;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // TODO: add-remove favorites -> boolean in constructor
        AlertDialog alertDialog;

        if(mIsInFavorites) {
            alertDialog = new AlertDialog.Builder(mContext)
                    .setTitle("Device " + mDeviceName)
                    .setMessage(mDeviceInfo)
                    .setNegativeButton("Remove from favorites", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            ((MapsActivity)mContext).removeFromFavorites(mDeviceName);
                        }
                    })
                    .setPositiveButton(R.string.ok_string, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int whichButton) {
                            //
                        }
                    })
                    .create();
        }
        else {
            alertDialog = new AlertDialog.Builder(mContext)
                    .setTitle("Device " + mDeviceName)
                    .setMessage(mDeviceInfo)
                    .setNegativeButton("Add to favorites", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            ((MapsActivity)mContext).addToFavorites(mDeviceName);
                        }
                    })
                    .setPositiveButton(R.string.ok_string, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int whichButton) {
                            //
                        }
                    })
                    .create();
        }

        return alertDialog;

    }

    /*
    .setTitle(savedInstanceState.getString("deviceName"))
                .setMessage(savedInstanceState.getString("deviceInfo"))
     */
}
