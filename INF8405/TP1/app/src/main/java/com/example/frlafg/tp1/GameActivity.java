package com.example.frlafg.tp1;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.widget.ImageButton;
import android.widget.TextView;

import com.example.frlafg.tp1.views.GameView;

import java.io.IOException;

/**
 * Created by frlafg on 2019-01-14.
 */

public class GameActivity extends AppCompatActivity {
    private final Globals GLOBALS = Globals.getInstance();
    private ImageButton pauseButton;
    private ImageButton refreshButton;
    private ImageButton previousPuzzleButton;
    private ImageButton nextPuzzleButton;
    private ImageButton undoButton;
    private TextView numberMovesTextView;
    private TextView puzzleTextView;
    private TextView puzzleNumberTextView;
    private TextView recordMinimumTextView;
    private TextView recordNumberTextView;

    private static final int INIT_NB_MOVES = 0;

    GameView mGameView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);

        mGameView = (GameView) findViewById(R.id.gameView);

        //Pause button
        pauseButton = findViewById(R.id.pause_button);
        pauseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickPauseButton(v);
            }
        });

        //Refresh button
        refreshButton = findViewById(R.id.refresh_button);
        refreshButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickRefreshButton(v);
            }
        });
        refreshButton.setEnabled(false);

        //Next puzzle button
        nextPuzzleButton = findViewById(R.id.next_puzzle_button);
        nextPuzzleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    clickNextPuzzleButton(v);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        float deg_nextButton = nextPuzzleButton.getRotation() + 90F;
        nextPuzzleButton.animate().rotation(deg_nextButton).setInterpolator(new AccelerateDecelerateInterpolator());
        if(GLOBALS.getPuzzleNumber() < 3) {
            nextPuzzleButton.setVisibility(View.VISIBLE);
        }
        else {
            nextPuzzleButton.setVisibility(View.INVISIBLE);
        }

        //Previous puzzle button
        previousPuzzleButton = findViewById(R.id.previous_puzzle_button);
        previousPuzzleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    clickPreviousPuzzleButton(v);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        float deg_previousButton = previousPuzzleButton.getRotation() + 90F;
        previousPuzzleButton.animate().rotation(deg_previousButton).setInterpolator(new AccelerateDecelerateInterpolator());
        if(GLOBALS.getPuzzleNumber() > 1) {
            previousPuzzleButton.setVisibility(View.VISIBLE);
        }
        else {
            previousPuzzleButton.setVisibility(View.INVISIBLE);
        }

        //Undo action button
        undoButton = findViewById(R.id.undo_button);
        undoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickUndoButton(v);
            }
        });
        undoButton.setEnabled(false);

        //Puzzle number
        puzzleTextView = findViewById(R.id.puzzle_text);
        puzzleNumberTextView = findViewById(R.id.puzzle_number_text);
        puzzleNumberTextView.setText(String.format("%d",GLOBALS.getPuzzleNumber()));

        String lastRecord_ = null;
        try {
            lastRecord_ = mGameView.mPuzzle.readRecord(mGameView.context,"Grid" + String.valueOf(GLOBALS.getPuzzleNumber()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(lastRecord_ != null) {
            int value = Integer.parseInt(lastRecord_);
            GLOBALS.setLastRecord(value);
        }


        recordNumberTextView = findViewById(R.id.record_number_text);
        if(GLOBALS.getLastRecord() == 0)
            recordNumberTextView.setText("--");
        else
            recordNumberTextView.setText(String.format("%d",GLOBALS.getLastRecord()));

        int puzzleNumber = GLOBALS.getPuzzleNumber();

        //Number of moves made
        numberMovesTextView = findViewById(R.id.number_moves_text);
        Globals.initNbMoves();
        numberMovesTextView.setText(String.format("%d",Globals.getNbMoves()));

        //Record for current puzzle
        recordMinimumTextView = findViewById(R.id.record_minimum_text);
        switch (puzzleNumber) {
            case 1: recordMinimumTextView.setText(R.string.record_puzzle1_string); break;
            case 2: recordMinimumTextView.setText(R.string.record_puzzle2_string); break;
            case 3: recordMinimumTextView.setText(R.string.record_puzzle3_string); break;
        }
    }

    /** Called when Pause button is pressed **/
    public void clickPauseButton(View view) {
        Intent intent = new Intent(this, MainActivity.class);
        finish();
        startActivity(intent);
    }

    /** Called when Refresh button is pressed **/
    public void clickRefreshButton(View view) {
        Intent intent = new Intent(this, GameActivity.class);
        finish();
        startActivity(intent);
    }

    /** Called when NextPuzzle button is pressed **/
    public void clickNextPuzzleButton(View view) throws IOException {
        GLOBALS.setPuzzleNumber(GLOBALS.getPuzzleNumber() + 1);
        Intent intent = new Intent(this, GameActivity.class);
        finish();
        startActivity(intent);

    }

    /** Called when PreviousPuzzle button is pressed **/
    public void clickPreviousPuzzleButton(View view) throws IOException {
        GLOBALS.setPuzzleNumber(GLOBALS.getPuzzleNumber() - 1);
        Intent intent = new Intent(this, GameActivity.class);
        finish();
        startActivity(intent);
    }

    /** Called when Undo action button is pressed **/
    public void clickUndoButton(View view) {
        mGameView.undoAction();
    }

    /** Enable Refresh button **/
    public void enableRefreshButton() {
        refreshButton.setEnabled(true);
    }

    /** Disable Refresh button **/
    public void disableRefreshButton() {
        refreshButton.setEnabled(false);
    }

    /** Enable Undo button **/
    public void enableUndoButton() {
        undoButton.setEnabled(true);
    }

    /** Disable Undo button **/
    public void disableUndoButton() {
        undoButton.setEnabled(false);
    }
}
