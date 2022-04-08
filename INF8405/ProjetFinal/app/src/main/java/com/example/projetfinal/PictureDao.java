package com.example.projetfinal;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

import java.util.List;

@Dao
public interface PictureDao {
    @Query("SELECT * FROM picture")
    List<Picture> getAll();

    @Query("SELECT * FROM picture WHERE uid LIKE :uid LIMIT 1")
    Picture get(int uid);

    @Query("SELECT * FROM picture WHERE latitude LIKE :latitude AND longitude LIKE :longitude LIMIT 1")
    Picture findByPosition(double latitude, double longitude);

    @Insert
    void insert(Picture picture);

    @Delete
    void delete(Picture picture);

    @Delete
    void deleteAll(List<Picture> pictures);
}
