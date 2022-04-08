package com.example.projetfinal;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.Marker;

public class CustomInfoWindowGoogleMap implements GoogleMap.InfoWindowAdapter {

    private Context context;


    public CustomInfoWindowGoogleMap(Context ctx){
        context = ctx;
    }

    /**
     *
     * @param marker
     * @return
     */
    @Override
    public View getInfoWindow(Marker marker) {
        return null;
    }

    /**
     *Initiate custom InfoWindow with thumbnail for markers on map
     * @param marker
     * @return
     */
    @Override
    public View getInfoContents(Marker marker) {
        View view = ((Activity)context).getLayoutInflater()
                .inflate(R.layout.activity_info_window, null);

        TextView name_tv = view.findViewById(R.id.name);
        ImageView img = view.findViewById(R.id.pic);


        InfoWindowData infoWindowData = (InfoWindowData) marker.getTag();

        img.setImageBitmap(infoWindowData.getThumbnail());

        return view;
    }
}
