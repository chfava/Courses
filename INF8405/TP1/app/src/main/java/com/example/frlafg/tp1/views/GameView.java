package com.example.frlafg.tp1.views;

import android.app.Activity;
import android.app.DialogFragment;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.util.Pair;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.widget.TextView;

import com.example.frlafg.tp1.Car;
import com.example.frlafg.tp1.Game;
import com.example.frlafg.tp1.GameActivity;
import com.example.frlafg.tp1.Globals;
import com.example.frlafg.tp1.Grid;
import com.example.frlafg.tp1.Position;
import com.example.frlafg.tp1.R;
import com.example.frlafg.tp1.SuccessDialogFragment;
import com.example.frlafg.tp1.TeamMembersDialogFragment;

import org.w3c.dom.Attr;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;

public class GameView extends View {
    private Canvas canvasToDraw;
    private int canvasWidth;
    private int canvasHeight;
    private ArrayList<Rect> rectList;
    private Paint mRedPaint;
    private Paint mYellowPaint;
    private Paint mBorderPaint;
    public Grid mPuzzle;
    private int XPreviousLocation;
    private int YPreviousLocation;
    private ArrayList<Car> carList;
    private ArrayList<Pair<Car, Position>> movesHistory;
    private Rect selectedRect;
    private Car selectedCar;
    private int touchSlopLength;
    private int puzzleNumber;
    private Boolean hasMoved;

    public Context context;

    private boolean alertDone = false;

    boolean getAlertDone() {
        return alertDone;
    }

    public GameView(Context context) throws IOException {
        super(context);
        this.context = context;

        init(null);

        final ViewConfiguration VConfig = ViewConfiguration.get(context);
        touchSlopLength = VConfig.getScaledTouchSlop();
    }

    public GameView(Context context, @Nullable AttributeSet attrs) throws IOException {
        super(context, attrs);
        this.context = context;
        init(attrs);
    }

    public GameView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) throws IOException {
        super(context, attrs, defStyleAttr);
        this.context = context;

        init(attrs);
    }

    public GameView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) throws IOException {
        super(context, attrs, defStyleAttr, defStyleRes);
        this.context = context;
        init(attrs);
    }

    private void init(@Nullable AttributeSet set) throws IOException {
        // Initialisation de la couleur des autos
        mRedPaint = new Paint();
        mRedPaint.setStyle(Paint.Style.FILL);
        mRedPaint.setColor(Color.RED);
        mYellowPaint = new Paint();
        mYellowPaint.setStyle(Paint.Style.FILL);
        mYellowPaint.setColor(Color.YELLOW);

        mBorderPaint = new Paint();
        mBorderPaint.setStyle(Paint.Style.STROKE);
        mBorderPaint.setColor(Color.BLACK);
        mBorderPaint.setStrokeWidth(8);

        puzzleNumber = Globals.getPuzzleNumber();
        Game game = new Game(puzzleNumber, context);
        mPuzzle = game.getPuzzle(puzzleNumber);
        Globals.setLastRecord(mPuzzle.lastRecord);
        rectList = new ArrayList<>();

        carList = mPuzzle.getCarList();
        movesHistory = new ArrayList<>();

        for (int i = 0; i < 8; i++) {
            Rect newRect = new Rect();
            rectList.add(newRect);
            carList.get(i).setID(System.identityHashCode(newRect) );
        }
        selectedRect = null;
        selectedCar = null;

        hasMoved = false;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvasToDraw = canvas;
        canvas.drawColor(Color.rgb(134,101,24));
        canvasWidth = canvas.getWidth();
        canvasHeight = canvas.getHeight();

        drawRectangles(canvas);
    }

    //Appeler cette méthode à l'initialisation du puzzle et chaque fois qu'un déplacement est fait.
    private void drawRectangles(Canvas canvas) {
        //On parcoure la liste de voitures et on ajoute les rectangles correspondants au canvas.
        for (int i = 0; i < carList.size(); i++) {
            rectList.get(i).left = carList.get(i).getStartPosition().x * (canvasWidth/6);
            rectList.get(i).top = carList.get(i).getStartPosition().y * (canvasHeight/6);

            //Voiture a l'horizontal, on set le right du rectangle selon la longueur de la voiture.
            if (carList.get(i).getOrientationIsHorizontal()) {
                rectList.get(i).right = rectList.get(i).left + carList.get(i).getLength() * (canvasWidth/6);
                rectList.get(i).bottom = rectList.get(i).top + (canvasHeight/6);
            }
            //Voiture a la verticale, on set le bottom du rectangle selon la longueur de la voiture.
            else {
                rectList.get(i).right = rectList.get(i).left + (canvasWidth/6);
                rectList.get(i).bottom = rectList.get(i).top + carList.get(i).getLength() * (canvasHeight/6);
            }
            //Voiture rouge
            if (carList.get(i).getIsRed()) {
                //fill
                canvas.drawRect(rectList.get(i), mRedPaint);
                //border
                canvas.drawRect(rectList.get(i), mBorderPaint);
            }
            //Voiture jaune
            else {
                //fill
                canvas.drawRect(rectList.get(i), mYellowPaint);
                //border
                canvas.drawRect(rectList.get(i), mBorderPaint);
            }
        }
    }

    /** Fonction pour vérifier l'action de l'utilisateur **/
    public boolean onTouchEvent(MotionEvent touchEvent)
    {
        Boolean noMovementMade = false;

        int X = (int)touchEvent.getX();
        int Y = (int)touchEvent.getY();

        switch(touchEvent.getAction())
        {
            case MotionEvent.ACTION_DOWN:
                selectedRect = locateRect(X, Y);
                selectedCar = getCarwithID(System.identityHashCode(selectedRect));
                XPreviousLocation = X;
                YPreviousLocation = Y;

                if(selectedRect != null && selectedCar != null) {
                    //Add action to undo stack
                    Position lastPosition = new Position(selectedCar.getStartPosition().x,selectedCar.getStartPosition().y);
                    Pair<Car, Position> lastMove = new Pair(selectedCar,lastPosition);
                    movesHistory.add(lastMove);
                }
                break;
            case MotionEvent.ACTION_MOVE:
                // Déplacements des autos selon le "drag"
                if(selectedRect != null && selectedCar != null) {
                    if(selectedCar.getOrientationIsHorizontal()){
                        int distanceX = (X - XPreviousLocation)/100;
                        if(Math.abs(distanceX) > touchSlopLength && Math.abs(distanceX) < 2) {
                            Position newPosition = new Position(selectedCar.getStartPosition().x + distanceX, selectedCar.getStartPosition().y);
                            boolean isOrientationRight = distanceX > 0;
                            if(checkCollision(selectedCar,selectedCar.getOrientationIsHorizontal(),isOrientationRight)) {
                                mPuzzle.move(selectedCar, newPosition);
                                drawRectangles(canvasToDraw);
                                postInvalidate();

                            }
                            XPreviousLocation = X;

                        }
                    }
                    else{
                        int distanceY = (Y - YPreviousLocation)/100;
                        if(Math.abs(distanceY) > touchSlopLength && Math.abs(distanceY) < 2) {
                            Position newPosition = new Position(selectedCar.getStartPosition().x, selectedCar.getStartPosition().y + distanceY);
                            boolean isOrientationUp = distanceY < 0;
                            if(checkCollision(selectedCar,selectedCar.getOrientationIsHorizontal(),isOrientationUp)) {
                                mPuzzle.move(selectedCar, newPosition);
                                drawRectangles(canvasToDraw);
                                postInvalidate();


                            }
                            YPreviousLocation = Y;
                        }
                    }
                    hasMoved = true;
                    //End of game
                }
                break;
            case MotionEvent.ACTION_UP:
                final GameActivity gameActivity = (GameActivity) getContext();
                int selectedCarIndex = mPuzzle.carList.indexOf(selectedCar);

                //Remove action from undo stack if no move was made.
                if (selectedRect != null && selectedCar != null && !hasMoved) {
                    movesHistory.remove(movesHistory.size() - 1);
                }
                else if (hasMoved && movesHistory.get(movesHistory.size() - 1).second.x == mPuzzle.carList.get(selectedCarIndex).getStartPosition().x &&
                        movesHistory.get(movesHistory.size() - 1).second.y == mPuzzle.carList.get(selectedCarIndex).getStartPosition().y) {
                    movesHistory.remove(movesHistory.size() - 1);
                }
                else if (hasMoved) {
                    Globals.setNbMoves(Globals.getNbMoves() + 1);
                    TextView moveCounter = ((Activity)context).findViewById(R.id.number_moves_text);
                    moveCounter.setText(String.format("%d",Globals.getNbMoves()));
                }
                selectedCar = null;
                selectedRect = null;
                hasMoved = false;

                // Vérification pour la désactivation des boutons Undo/Refresh
                if(Globals.getNbMoves() > 0) {
                    gameActivity.enableRefreshButton();
                    gameActivity.enableUndoButton();
                }
                else {
                    gameActivity.disableRefreshButton();
                    gameActivity.disableUndoButton();
                }

                // Vérification pour la finalité du puzzle
                if(mPuzzle.isRedCarOut()) {
                    if(Globals.getNbMoves() < mPuzzle.lastRecord || mPuzzle.lastRecord == 0){
                        mPuzzle.writeRecord(context,mPuzzle.nameGrid ,String.valueOf(Globals.getNbMoves()));
                    }
                    final DialogFragment newFragment = SuccessDialogFragment.newInstance(
                            R.string.success_title_string);
                    final Activity activity = (Activity) context;

                    // Affichage de la fenêtre de succès
                    newFragment.show(activity.getFragmentManager(), "dialog");

                    // Thread pour l'animation fadeout de la fenêtre de succès
                    new Handler().postDelayed(new Runnable() {

                        public void run() {
                            newFragment.dismiss();
                        }
                    }, 3000);

                    // Thread pour la transition automatique des puzzles 1->2 et 2->3
                    new Handler().postDelayed(new Runnable() {

                        public void run() {
                            if(Globals.getPuzzleNumber() < 3) {
                                try {
                                    gameActivity.clickNextPuzzleButton(getRootView());
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }, 5000);
                }
                break;
        }

        // Vérifier où mettre l'increase, et comment dealer avec le fait qu'un joueur peut revenir
        // au même point de départ -> NB_MOVES ne doit donc pas augmenter

        //Globals.increaseNbMoves();
        //numberMovesTextView.setText(String.format("%d",Globals.getNbMoves()));

        return true;
    }

    /** Fonction pour localiser une auto selon son ID **/
    Rect locateRect(int x, int y){
        for (int i = 0; i < rectList.size(); i++){
            if(rectList.get(i).contains(x,y))
                return rectList.get(i);
        }

        return null;
    }

    /** Fonction pour reécupérer une auto selon son ID **/
    Car getCarwithID(int ID){
        for (int i = 0; i < carList.size(); i++){
            if(carList.get(i).getID() == ID)
                return carList.get(i);
        }
        return null;
    }

    /** Fonction pour respecter la logique des collisions **/
    boolean checkCollision(Car car, boolean isHorizontal, boolean isRightUp){
        if(isHorizontal){
            if(isRightUp){
                Position newPosition = new Position(car.getStartPosition().x + 1,car.getStartPosition().y);
                return mPuzzle.checkHorizontalCondition(car,newPosition);
            }
            else{
                Position newPosition = new Position(car.getStartPosition().x - 1,car.getStartPosition().y);
                return mPuzzle.checkHorizontalCondition(car,newPosition);
            }
        }
        else{
            if(isRightUp){
                Position newPosition = new Position(car.getStartPosition().x,car.getStartPosition().y - 1);
                return mPuzzle.checkVerticalCondition(car,newPosition);
            }
            else{
                Position newPosition = new Position(car.getStartPosition().x,car.getStartPosition().y + 1);
                return mPuzzle.checkVerticalCondition(car,newPosition);
            }
        }
    }

    /** Fonction pour annuler une action **/
    public void undoAction() {
        GameActivity gameActivity = (GameActivity) context;
        if (!movesHistory.isEmpty()) {
            Car carToMove = movesHistory.get(movesHistory.size()-1).first;
            Position position = movesHistory.get(movesHistory.size()-1).second;
            mPuzzle.move(carToMove,position);
            movesHistory.remove(movesHistory.size() - 1);

            drawRectangles(canvasToDraw);

            postInvalidate();
            //Decrement moves counter.
            Globals.setNbMoves(Globals.getNbMoves() - 1);
            TextView moveCounter = ((Activity)context).findViewById(R.id.number_moves_text);
            moveCounter.setText(String.format("%d",Globals.getNbMoves()));
        }
        // Vérification pour la désactivation des boutons Undo/Refresh
        if(Globals.getNbMoves() > 0) {
            gameActivity.enableRefreshButton();
            gameActivity.enableUndoButton();
        }
        else {
            gameActivity.disableRefreshButton();
            gameActivity.disableUndoButton();
        }
    }
}
