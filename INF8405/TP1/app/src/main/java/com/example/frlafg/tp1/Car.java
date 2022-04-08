package com.example.frlafg.tp1;

import java.util.ArrayList;

public class Car {

    int length;
    Boolean isRed;
    Position StartPosition;
    Boolean orientationIsHorizontal;
    int id;

    Car(){
        isRed = false;
        length = 0;
        StartPosition = new Position();
        orientationIsHorizontal = true;
    }

    public Car(Car car) {
        this.length = car.length;
        this.isRed = car.isRed;
        this.StartPosition = car.StartPosition;
        this.orientationIsHorizontal = car.orientationIsHorizontal;
        this.id = car.id;
    }

    public int getLength() {
        return length;
    }

    public void setLenght(int value){
        length = value;
    }

    public Boolean getIsRed() {
        return isRed;
    }

    public void setRed(){
        isRed = true;
    }

    public Boolean getOrientationIsHorizontal() {
        return orientationIsHorizontal;
    }

    public void setOrientation(Boolean value){
        orientationIsHorizontal = value;
    }

    public Position getStartPosition() {
        return StartPosition;
    }

    public void setPosition(Position positionValue){
        StartPosition = positionValue;
    }

    public void setID(int ID){
        id = ID;
    }
    public int getID(){
        return id;
    }
}
