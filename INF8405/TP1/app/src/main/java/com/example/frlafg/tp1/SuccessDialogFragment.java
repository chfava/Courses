package com.example.frlafg.tp1;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;

/**
 * Created by franc on 2019-02-05.
 *
 * Show Success dialogFragment when puzzle is finished
 */

public class SuccessDialogFragment extends DialogFragment {

    public static SuccessDialogFragment newInstance(int title) {
        SuccessDialogFragment frag = new SuccessDialogFragment();
        Bundle args = new Bundle();
        args.putInt("title", title);
        frag.setArguments(args);
        return frag;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        return new AlertDialog.Builder(getActivity())
                .setTitle(R.string.success_title_string)
                .setMessage(R.string.success_message_string)
                .create();

    }

    @Override
    public void onStart() {
        super.onStart();
        getDialog().getWindow().setWindowAnimations(
                R.style.fadeout_animation);
    }

    @Override
    public int getTheme() {
        return R.anim.fadeout_dalog;
    }
}
