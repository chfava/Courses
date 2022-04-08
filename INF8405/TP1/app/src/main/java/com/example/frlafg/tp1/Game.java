package com.example.frlafg.tp1;

import android.content.Context;

import java.io.IOException;

public class Game {
    Grid Puzzle1;
    Grid Puzzle2;
    Grid Puzzle3;
    Context contextGame;

    public Game(int puzzleNumber, Context context) throws IOException {
        contextGame = context;
        switch (puzzleNumber) {
            case 1: initialiseGrid1(); break;
            case 2: initialiseGrid2(); break;
            case 3: initialiseGrid3(); break;
        }
    }
/*
    void initialiseGrids(){
        initialiseGrid1();
        initialiseGrid2();
        initialiseGrid2();
    }
*/
    void initialiseGrid1() throws IOException {
        Puzzle1 = new Grid("Grid1");

        Car car1 = new Car();
        car1.setPosition(new Position(0,0));
        car1.setLenght(3);
        Puzzle1.addCar(car1);

        Car car2 = new Car();
        car2.setPosition(new Position(0,2));
        car2.setLenght(2);
        car2.setRed();
        Puzzle1.addCar(car2);

        Car car3 = new Car();
        car3.setPosition(new Position(0,5));
        car3.setLenght(3);
        Puzzle1.addCar(car3);

        Car car4 = new Car();
        car4.setPosition(new Position(0,3));
        car4.setLenght(2);
        car4.setOrientation(false);
        Puzzle1.addCar(car4);

        Car car5 = new Car();
        car5.setPosition(new Position(2,1));
        car5.setLenght(3);
        car5.setOrientation(false);
        Puzzle1.addCar(car5);

        Car car6 = new Car();
        car6.setPosition(new Position(5,0));
        car6.setLenght(3);
        car6.setOrientation(false);
        Puzzle1.addCar(car6);

        Car car7 = new Car();
        car7.setPosition(new Position(4,4));
        car7.setLenght(2);
        car7.setOrientation(false);
        Puzzle1.addCar(car7);

        Car car8 = new Car();
        car8.setPosition(new Position(4,3));
        car8.setLenght(2);
        Puzzle1.addCar(car8);

        Puzzle1.minimumNumberOfMovements = 15;

        String record = Puzzle1.readRecord(contextGame,"Grid1");
        if(record == null){
            Puzzle1.lastRecord = 0;
        }
        else{
            Puzzle1.lastRecord = Integer.parseInt(record);
        }


    }

    void initialiseGrid2(){
        Puzzle2 = new Grid("Grid2");

        Car car1 = new Car();
        car1.setPosition(new Position(0,3));
        car1.setLenght(2);
        Puzzle2.addCar(car1);

        Car car2 = new Car();
        car2.setPosition(new Position(0,2));
        car2.setLenght(2);
        car2.setRed();
        Puzzle2.addCar(car2);

        Car car3 = new Car();
        car3.setPosition(new Position(1,4));
        car3.setLenght(2);
        car3.setOrientation(false);
        Puzzle2.addCar(car3);

        Car car4 = new Car();
        car4.setPosition(new Position(2,1));
        car4.setLenght(2);
        car4.setOrientation(false);
        Puzzle2.addCar(car4);

        Car car5 = new Car();
        car5.setPosition(new Position(2,3));
        car5.setLenght(2);
        car5.setOrientation(false);
        Puzzle2.addCar(car5);

        Car car6 = new Car();
        car6.setPosition(new Position(2,5));
        car6.setLenght(2);
        Puzzle2.addCar(car6);

        Car car7 = new Car();
        car7.setPosition(new Position(3,1));
        car7.setLenght(3);
        car7.setOrientation(false);
        Puzzle2.addCar(car7);

        Car car8 = new Car();
        car8.setPosition(new Position(4,1));
        car8.setLenght(3);
        car8.setOrientation(false);
        Puzzle2.addCar(car8);

        Puzzle2.minimumNumberOfMovements = 17;
    }

    void initialiseGrid3(){
        Puzzle3 = new Grid("Grid3");


        Car car1 = new Car();
        car1.setPosition(new Position(0,0));
        car1.setLenght(2);
        car1.setOrientation(false);
        Puzzle3.addCar(car1);

        Car car2 = new Car();
        car2.setPosition(new Position(0,2));
        car2.setLenght(2);
        car2.setRed();
        Puzzle3.addCar(car2);

        Car car3 = new Car();
        car3.setPosition(new Position(0,4));
        car3.setLenght(3);
        Puzzle3.addCar(car3);

        Car car4 = new Car();
        car4.setPosition(new Position(1,0));
        car4.setLenght(2);
        Puzzle3.addCar(car4);

        Car car5 = new Car();
        car5.setPosition(new Position(2,1));
        car5.setLenght(2);
        car5.setOrientation(false);
        Puzzle3.addCar(car5);

        Car car6 = new Car();
        car6.setPosition(new Position(3,0));
        car6.setLenght(2);
        Puzzle3.addCar(car6);

        Car car7 = new Car();
        car7.setPosition(new Position(3,2));
        car7.setLenght(3);
        car7.setOrientation(false);
        Puzzle3.addCar(car7);

        Car car8 = new Car();
        car8.setPosition(new Position(4,2));
        car8.setLenght(3);
        car8.setOrientation(false);
        Puzzle3.addCar(car8);

        Puzzle3.minimumNumberOfMovements = 15;
    }

    public Grid getPuzzle1() {
        return Puzzle1;
    }

    public Grid getPuzzle2() {
        return Puzzle2;
    }

    public Grid getPuzzle3() {
        return Puzzle3;
    }

    public Grid getPuzzle(int puzzle_number) {
        Grid puzzle = getPuzzle1(); // default value
        switch (puzzle_number) {
            case 1: puzzle = getPuzzle1(); break;
            case 2: puzzle = getPuzzle2(); break;
            case 3: puzzle = getPuzzle3(); break;
        }
        return puzzle;
    }
}
