package com.example.projetfinal;

import android.graphics.Bitmap;

public class InfoWindowData {
    private String image;
    private Bitmap thumbnail;

    /**
     * get the image
     * @return
     */
    public String getImage() {
        return image;
    }

    /**
     * set the image
     * @param image
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * get the thumbnail
     * @return
     */
    public Bitmap getThumbnail() {
        return thumbnail;
    }

    /**
     * set the thumbnail
     * @param image
     */
    public void setThumbail (Bitmap image) {
        this.thumbnail = image;
    }
}