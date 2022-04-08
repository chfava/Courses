package com.example.frlafg.tp1;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;

/**
 * Created by frlafg on 2019-01-10.
 *
 * Show TeamMembers in dialogFragment when About button is pressed
 */

// https://developer.android.com/reference/android/app/DialogFragment
public class TeamMembersDialogFragment extends DialogFragment {

    public static TeamMembersDialogFragment newInstance(int title) {
        TeamMembersDialogFragment frag = new TeamMembersDialogFragment();
        Bundle args = new Bundle();
        args.putInt("title", title);
        frag.setArguments(args);
        return frag;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        return new AlertDialog.Builder(getActivity())
                .setTitle(R.string.team_members_string)
                .setMessage(R.string.members_string)
                .setNegativeButton(R.string.ok_string,
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int whichButton) {
                                //
                            }
                        }
                )
                .create();

    }
}
