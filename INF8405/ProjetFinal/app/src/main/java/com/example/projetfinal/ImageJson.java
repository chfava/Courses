package com.example.projetfinal;

import android.graphics.Bitmap;
import android.os.Parcel;
import android.os.Parcelable;

import com.google.android.gms.maps.model.LatLng;

public class ImageJson {
    private Bitmap image;
    private double lat;
    private double lng;

    /**
     * Sets the image
     * @param image
     */
    public void setImage(Bitmap image) {
        this.image = image;
    }

    /**
     * sets the image
     * @return
     */
    public Bitmap getImage() {
        return this.image;
    }

    /**
     * set the lattitude
     * @param lat
     */
    public void setLat(double lat) {
        this.lat = lat;
    }

    /**
     * get the lattitude
     * @return
     */
    public double getLat() {
        return this.lat;
    }

    /**
     * set the longitude
     * @param lng
     */
    public void setLng(double lng) {
        this.lng = lng;
    }

    /**
     * get the longitude
     * @return
     */
    public double getLng() {
        return this.lng;
    }

    /**
     * Image Json constructor
     * @param image
     * @param lat
     * @param lng
     */
    public ImageJson(Bitmap image, double lat, double lng) {
        this.image = image;
        this.lat = lat;
        this.lng = lng;
    }
}
