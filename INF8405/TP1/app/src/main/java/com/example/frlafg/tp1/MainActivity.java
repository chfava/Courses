package com.example.frlafg.tp1;

import android.app.DialogFragment;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    static int PUZZLE_NUMBER = 1;
    Button aboutButton;
    Button exitButton;
    Button playButton;
    private final Globals GLOBALS = Globals.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Boutton pour afficher les membres de l'équipe
        aboutButton = findViewById(R.id.about_button);
        aboutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickAboutButton(v);
            }
        });

        // Boutton pour quitter
        exitButton = findViewById(R.id.exit_button);
        exitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickExitButton(v);
            }
        });

        // Boutton pour passer au premier puzzle
        playButton = findViewById(R.id.play_button);
        playButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickPlayButton(v);
            }
        });
    }

    /** Called when About button is pressed **/
    public void clickAboutButton(View view) {
        DialogFragment newFragment = TeamMembersDialogFragment.newInstance(
                R.string.team_members_string);
        newFragment.show(getFragmentManager(), "dialog");
    }

    /** Called when Exit button is pressed **/
    public void clickExitButton(View view) {
        finish();
    }

    /** Called when Play button is pressed **/
    public void clickPlayButton(View view) {
        GLOBALS.setPuzzleNumber(PUZZLE_NUMBER);
        Intent intent = new Intent(this, GameActivity.class);
        finish();
        startActivity(intent);
    }
}
