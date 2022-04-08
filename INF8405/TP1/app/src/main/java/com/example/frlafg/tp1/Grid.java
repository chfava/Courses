package com.example.frlafg.tp1;

import android.content.Context;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;

public class Grid {
    Car[][] grid;
    public ArrayList<Car> carList;
    Position sortie;
    int minimumNumberOfMovements;
    public int movementMade;
    public int lastRecord;
    public String nameGrid;

    Grid(String name){
        grid = new Car[6][6];
        carList = new ArrayList<>();
        sortie = new Position(6, 3);
        minimumNumberOfMovements = 0;
        movementMade = 0;
        lastRecord = 0;
        nameGrid = name;
    }

    public Car[][] getGrid() {
        return grid;
    }

    public ArrayList<Car> getCarList() {
        return carList;
    }

    public Position getSortie() {
        return sortie;
    }

    public int getMinimumNumberOfMovements() {
        return minimumNumberOfMovements;
    }

    public int getLastRecord() {
        return lastRecord;
    }

    public int getMovementMade() {
        return movementMade;
    }

    void addCar(Car car){
        carList.add(car);
        placeCarOnGrid(car);
    }

    void setMinimumNumberOfMovements(int number){
        minimumNumberOfMovements = number;
    }

    void placeCarOnGrid(Car car){
        int x = car.StartPosition.x;
        int y = car.StartPosition.y;
        if(car.orientationIsHorizontal) {
            for (int i = 0; i < car.length; i++) {
                grid[y][x + i] = car;
            }
        }else{
            for (int i = 0; i < car.length; i++) {
                grid[y + i][x] = car;
            }
        }
    }

    public Boolean move(Car car, Position newPosition){
        //Remove car from grid
        removeCarFromGrid(car);

        //Change Car start position
        car.setPosition(newPosition);

        //Add car with new position to grid
        placeCarOnGrid(car);

        movementMade++;
        return true;
    }

    public Boolean checkHorizontalCondition(Car car, Position newPosition){
        //Erreur : changements necessaires

        //check if movement is in line with car
        if(newPosition.y - car.StartPosition.y != 0)
            return false;

        //check if out of borders
        if(newPosition.x < 0 || newPosition.x > 5)
            return false;

        //check if the are obstacles to the movement
        int distance = newPosition.x - car.StartPosition.x;
        if(distance > 0) {
            for (int i = 0; i < distance; i++) {
                if(car.StartPosition.x + car.length + i > 5)
                    return false;
                if (grid[car.StartPosition.y][car.StartPosition.x + car.length + i] != null)
                    return false;

            }
        }
        else if(distance < 0){
            distance = Math.abs(distance);
            for (int i = 1; i < distance + 1; i++) {
                if (grid[car.StartPosition.y][car.StartPosition.x - i] != null)
                    return false;
            }
        }
        else{
            //Distance = 0
            System.out.print("Error : Distance = 0");
            return false;
        }

        return true;
    }


    public Boolean checkVerticalCondition(Car car, Position newPosition){
        //Erreur : changements necessaires

        //check if movement is in line with car
        if(newPosition.x - car.StartPosition.x != 0)
            return false;

        //check if out of borders
        if(newPosition.y < 0 || newPosition.y > 5)
            return false;

        //check if the are obstacles to the movement
        int distance = newPosition.y - car.StartPosition.y;


        if(distance > 0) {
            for (int i = 0; i < distance; i++) {
                if(car.StartPosition.y + car.length + i > 5)
                    return false;
                if (grid[car.StartPosition.y + car.length + i][car.StartPosition.x] != null)
                    return false;
            }
        }
        else if(distance < 0){
            distance = Math.abs(distance);
            for (int i = 1; i < distance + 1; i++) {
                if (grid[car.StartPosition.y - i][car.StartPosition.x] != null)
                    return false;
            }
        }
        else{
            //Distance = 0
            System.out.print("Error : Distance = 0");
            return false;
        }
        return true;
    }

    public Boolean isRedCarOut(){
        if (grid != null && sortie != null && grid[sortie.y - 1][sortie.x - 1] != null) {
            if (grid[sortie.y - 1][sortie.x - 1].isRed)
                return true;
        }
        return false;
    }

    void removeCarFromGrid(Car car){
        int x = car.StartPosition.x;
        int y = car.StartPosition.y;
        if(car.orientationIsHorizontal) {
            for (int i = 0; i < car.length; i++) {
                grid[y][x + i] = null;
            }
        }
        else{
            for (int i = 0; i < car.length; i++) {
                grid[y + i][x] = null;
            }
        }
    }

    public boolean writeRecord(Context context, String gridName, String score){
        File pathToScore = context.getFilesDir();
        File fileToRead = new File(pathToScore, gridName + ".txt");

        try {
            FileOutputStream stream = new FileOutputStream(fileToRead);
            stream.write(score.getBytes());
            stream.close();
        }
        catch (IOException e) {
            System.out.print("Error write failed: " + e.toString());
            return false;
        }
        return true;
    }

    public String readRecord(Context context, String gridName) throws IOException {
        File pathToScore = context.getFilesDir();
        File fileToRead = context.getFileStreamPath(gridName + ".txt");
        if(fileToRead == null || !fileToRead.exists())
            return null;
        int lengthToRead = (int) fileToRead.length();

        byte[] bytes = new byte[lengthToRead];

        FileInputStream read = new FileInputStream(fileToRead);
        try {
            read.read(bytes);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            read.close();
        }

        return new String(bytes);
    }
}
