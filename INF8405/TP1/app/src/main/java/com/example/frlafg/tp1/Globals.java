package com.example.frlafg.tp1;

/**
 * Created by franc on 2019-01-31.
 */

public final class Globals {
    // Singleton to declare global variables and access them from anywhere
    private static Globals instance;

    // Global variables
    private static int PUZZLE_NUMBER = 1;
    private static int NB_MOVES = 0;
    private static int LAST_RECORD = 0;

    // Restrict the constructor from being instantiated
    private Globals(){};

    static synchronized Globals getInstance(){
        if(instance==null){
            instance=new Globals();
        }
        return instance;
    }

    public static int getPuzzleNumber() {
        return PUZZLE_NUMBER;
    }

    public static int getLastRecord(){
        return LAST_RECORD;
    }

    public static void setLastRecord(int lastRecord) {
        LAST_RECORD = lastRecord;
    }

    static void setPuzzleNumber(int puzzleNumber) {
        PUZZLE_NUMBER = puzzleNumber;
    }

    public static int getNbMoves() {
        return NB_MOVES;
    }

    static void initNbMoves() {
        NB_MOVES = 0;
    }

    public static void setNbMoves(int nbMoves) {
        NB_MOVES = nbMoves;
    }

}
