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

public class FavoritesWarningDialogFragment extends DialogFragment {
    static Context mContext;
    static String mTitle;
    public static FavoritesWarningDialogFragment newInstance(String deviceName, Context context) {
        mContext = context;
        mTitle = deviceName;
        FavoritesWarningDialogFragment frag = new FavoritesWarningDialogFragment();
        return frag;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        return new AlertDialog.Builder(mContext)
                .setTitle(mTitle)
                .setMessage(R.string.favorites_warning_string)
                .setPositiveButton(R.string.ok_string, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int whichButton) {
                        //
                    }
                })
                .create();

    }
}
