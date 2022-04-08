package com.example.projetfinal;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;


@Entity
public class Picture {
    @PrimaryKey(autoGenerate = true)
    public int uid;

    @ColumnInfo(name = "latitude")
    public double latitude;

    @ColumnInfo(name = "longitude")
    public double longitude;

    @ColumnInfo(name = "image")
    public String image;

    /**
     * Picture default constructor
     */
    public Picture(){

    }

    /**
     * Picture constructor
     * @param lat
     * @param longi
     * @param imageIn
     */
    public Picture(double lat, double longi, String imageIn){
        latitude = lat;
        longitude = longi;
        image = imageIn;
    }

    /**
     * returns Uid
     * @return
     */
    public int getUid() {
        return uid;
    }

    /**
     * set the Uid
     * @param id
     */
    public void setUid(int id) {
        uid = id;
    }

    /**
     * get the lattitude
     * @return
     */
    public double getLatitude() {
        return latitude;
    }

    /**
     * set the lattitude
     * @param lat
     */
    public void setLatitude(double lat) {
        latitude = lat;
    }

    /**
     * get the lattitude
     * @return
     */
    public double getLongitude() {
        return longitude;
    }

    /**
     * set the lattitude
     * @param lng
     */
    public void setLongitude(double lng) {
        longitude = lng;
    }

    /**
     * get the image
     * @return
     */
    public String getImage() {
        return image;
    }

    /**
     * set the image
     * @param img
     */
    public void setImage(String img) {
        image = img;
    }
}
