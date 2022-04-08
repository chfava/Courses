package com.example.tp2;

import android.Manifest;
import android.app.Activity;
import android.app.DialogFragment;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.location.LocationManager;
import android.os.Handler;
import android.os.Looper;
import android.os.AsyncTask;
import android.os.PersistableBundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.content.ContextCompat;
import android.content.pm.PackageManager;
import android.util.Log;
import android.view.View;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.maps.GeoApiContext;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.PendingResult;
import com.google.maps.internal.PolylineEncoding;
import com.google.maps.model.DirectionsResult;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Arrays;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback{

    private GoogleMap mMap;
    private FusedLocationProviderClient fusedLocationClient;
    private BluetoothAdapter mBluetoothAdapter;
    private BroadcastReceiver mReceiver;
    private LatLng myPosition;
    private GeoApiContext geoApiContext = null;
    private MarkerOptions markerOnFocus = null;
    private MarkerOptions newMarker = null;

    private static boolean THEME_CHOICE_LIGHT = true; // 0 = light, 1 = dark

    private final int REQUEST_PERMISSION_FINE_LOCATION=1;
    private final int N = 2;
    private final int MEASUREDPOWER = -69;

    private ListView devicesListLV;
    private ArrayList<String> devicesArray;
    private ArrayList<String> favoritesArray;
    private ArrayAdapter deviceAdapter;
    private ArrayList<MarkerOptions> markerList;
    private boolean isShowingFavorites;

    private Button switch_theme_button;
    private Button scan_button;
    private Button route_button;
    private Button share_button;
    public  Button favorites_button;
    private Button hide_info_button;

    private static int POSITION_NUMBER = 0;
    private ArrayList<ArrayList<String>> positionsDeviceList;
    private int deviceNumber = 1;

    //Liste des devices trouvees, c'est cette liste qu'on va feeder a la vue pour la section du devices listing.
    //Ex : avec device.getName et device.getAddress
    private ArrayList<BluetoothDevice> devices;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(getThemeChoice() ? R.style.AppTheme : R.style.AppThemeDark);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        markerList = new ArrayList<MarkerOptions>();
        positionsDeviceList = new ArrayList<ArrayList<String>>();
        devicesArray = new ArrayList<String>();
        deviceAdapter = new ArrayAdapter<String>(this,
                R.layout.activity_list_view, devicesArray);
        devicesListLV = findViewById(R.id.device_list);
        devicesListLV.setAdapter(deviceAdapter);

        isShowingFavorites = false;
        favoritesArray = new ArrayList<String>();

        switch_theme_button = findViewById(R.id.switch_theme_button);
        switch_theme_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // decide which theme to use DAY or NIGHT and save it
                setThemeChoice(!getThemeChoice());
                recreateActivity();
            }
        });

        scan_button = findViewById(R.id.scan_button);
        scan_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                scan();
            }
        });

        favorites_button = findViewById(R.id.favorites_button);
        favorites_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showFavorites();
            }
        });

        hide_info_button = findViewById(R.id.hide_info_button);
        hide_info_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                hideInfo();
            }
        });

        route_button = findViewById(R.id.route_button);
        route_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(markerOnFocus != null) {
                    calculateDirections(markerOnFocus);
                }
                else{
                    System.out.print("Error markerOnFocus is null");
                }
            }
        });

        share_button = findViewById(R.id.share_button);
        share_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/plain");
                Double latitudeMarker = markerOnFocus.getPosition().latitude;
                Double longitudeMarker = markerOnFocus.getPosition().longitude;
                String link = "http://maps.google.com/maps?saddr=" + latitudeMarker + "," + longitudeMarker;
                intent.putExtra(android.content.Intent.EXTRA_TEXT, link);
                startActivity(Intent.createChooser(intent, "Share"));
            }
        });
    }
/*
    @Override
    protected final void onRestoreInstanceState(final Bundle savedInstanceState) {
        devicesArray = savedInstanceState.getStringArrayList("devicesArray");
    }

    @Override
    protected final void onSaveInstanceState(final Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putStringArrayList("devicesArray", devicesArray);
    }
*/
    public void recreateActivity() {
        this.recreate();
    }

    public static boolean getThemeChoice() {
        return THEME_CHOICE_LIGHT;
    }

    public static void setThemeChoice(boolean themeChoice) {
        THEME_CHOICE_LIGHT = themeChoice;
    }

    private void requestPermission(String permissionName, int permissionRequestCode) {
        ActivityCompat.requestPermissions(this,
                new String[]{permissionName}, permissionRequestCode);
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            requestPermission(Manifest.permission.ACCESS_FINE_LOCATION,REQUEST_PERMISSION_FINE_LOCATION);
        }

        if(geoApiContext == null){
            geoApiContext = new GeoApiContext.Builder().apiKey("AIzaSyCwxupz7zLM9zWtrbWMgt-rKvEK_SPNfGo").build();
        }
        getDeviceLocation(false);
        initiateCameraOnLocation();

        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        devices = new ArrayList<>();

        mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                LatLng pos = new LatLng(marker.getPosition().latitude,marker.getPosition().longitude);
                markerOnFocus = new MarkerOptions().position(pos);
                return false;
            }
        });

        try {
            readFiles();
            readFavorites();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void scan() {
        reinitializeDevices();
        getDeviceLocation(true);
        findBluetoothDevices();
        scan_button.setEnabled(false);
        scan_button.setText(getResources().getString(R.string.scanning_string));

        Thread scanner_thread = new Thread(){
            @Override
            public void run() {
                synchronized (this) {
                    try {
                        wait(5000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                mBluetoothAdapter.cancelDiscovery();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        scan_button.setEnabled(true);
                        scan_button.setText(getResources().getString(R.string.scan_string));
                    }
                });
                savePositionDevicesList();
            }
        };
        scanner_thread.start();
    }

    private void savePositionDevicesList() {
        ArrayList<String> temp = new ArrayList<>(devicesArray);
        MarkerOptions markerTemp = verifyIfMarkerAlreadyExists(newMarker);
        if(markerTemp == null) {
            positionsDeviceList.add(temp);
            markerList.add(newMarker);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mMap.addMarker(newMarker);
                }
            });

            POSITION_NUMBER++;

            try {
                writeFiles(newMarker,devicesArray);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        else{
            //Check if a device to remove is in the favorites
            int index = markerList.indexOf(markerTemp);

            ArrayList<String> difference = new ArrayList<String>(positionsDeviceList.get(index));
            ArrayList<String> newList = new ArrayList<String>(temp);

            for(int i = 0; i < difference.size(); i++){
                difference.set(i, difference.get(i).split(": ")[1]);
            }
            for(int i = 0; i < newList.size(); i++){
                newList.set(i, newList.get(i).split(": ")[1]);
            }

            difference.removeAll(newList);
            for (String device : difference){
                for (Iterator<String> iterator = favoritesArray.iterator(); iterator.hasNext(); ) {
                    String favoriteDevice = iterator.next();
                    if (!favoriteDevice.equals("") && device.contains(favoriteDevice)) {
                        DialogFragment newFragment = FavoritesWarningDialogFragment.newInstance(favoriteDevice, this);
                        newFragment.show(getFragmentManager(), "dialog");
                        iterator.remove();
                    }
                }
            }

            try {
                writeFavorites();
            } catch (IOException e) {
                e.printStackTrace();
            }

            positionsDeviceList.set(index, temp);

            try {
                writeFiles(markerTemp,temp);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                updateListView(temp);
            }
        });
    }

    private MarkerOptions verifyIfMarkerAlreadyExists(MarkerOptions newMarker){
        double oneMeterToLatitude = ((double)1 / (double)1113.20);
        for(MarkerOptions marker : markerList){
            double oneMeterToLongitude = ((double)1000000 / (double)40075 * Math.cos((double)marker.getPosition().latitude ) / (double)360);
            double distanceLatitude = (double)marker.getPosition().latitude - (double)newMarker.getPosition().latitude;
            double distanceLongitude =(double) marker.getPosition().longitude - (double)newMarker.getPosition().longitude;
            if( distanceLatitude < 100 * oneMeterToLatitude  &&  distanceLongitude < 100 * oneMeterToLongitude){
                return marker;
            }
        }
        return null;
    }

    private void showPositionDeviceList(int positionNumber) {
        isShowingFavorites = false;
        updateListView(positionsDeviceList.get(positionNumber));
        //favorites_button.setEnabled(true);
        //hide_info_button.setEnabled(true);
    }

    private void showFavorites() {
        isShowingFavorites = true;
        updateListView(favoritesArray);
        //favorites_button.setEnabled(false);
        //hide_info_button.setEnabled(true);
    }

    public void addToFavorites(String device) {
        if(!favoritesArray.contains(device))
            favoritesArray.add(device);
        try {
            writeFavorites();
        } catch (IOException e) {
            e.printStackTrace();
        }
        showFavorites();
    }

    public void removeFromFavorites(String device) {
        favoritesArray.remove(device);
        showFavorites();
        try {
            writeFavorites();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void updateListView(ArrayList<String> arrayList) {
        final Context context = this;
        deviceAdapter = new ArrayAdapter<String>(this,
                R.layout.activity_list_view, arrayList);
        devicesListLV.setAdapter(deviceAdapter);
        devicesListLV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String deviceAddress;
                if(isShowingFavorites)
                    deviceAddress = favoritesArray.get((int)id);
                else
                    deviceAddress = arrayList.get((int)id).split(": ")[1];
                ArrayList<MarkerOptions> deviceList = findDeviceKnownLocation(deviceAddress);
                String deviceInfo = new String();
                for(MarkerOptions marker : deviceList) {
                    deviceInfo += marker.getTitle().toString() + "  " + marker.getPosition().toString() + "\n";
                }

                DialogFragment newFragment = DeviceInfoDialogFragment.newInstance(deviceAddress, deviceInfo, favoritesArray.contains(deviceAddress), context);
                newFragment.show(getFragmentManager(), "dialog");


            }
        });
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                deviceAdapter.notifyDataSetChanged();
            }
        });
    }

    private ArrayList<MarkerOptions> findDeviceKnownLocation(String deviceMACAddr){
        ArrayList<MarkerOptions> listPositionMarkers = new ArrayList<MarkerOptions>();
        for(int i = 0; i < positionsDeviceList.size(); i++){
            for(String deviceName : positionsDeviceList.get(i)){
                if(deviceName.contains(deviceMACAddr)){
                    listPositionMarkers.add(markerList.get(i));
                }
            }
        }
        return listPositionMarkers;
    }

    private void reinitializeDevices() {
        deviceNumber = 1;
        devices.clear();
        devicesArray.clear();
        updateListView(devicesArray);
    }

    private void hideInfo() {
        ArrayList<String> temp = new ArrayList<>();
        updateListView(temp);
        //favorites_button.setEnabled(true);
        //hide_info_button.setEnabled(false);
    }

    private void initiateCameraOnLocation() {
        try {
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                fusedLocationClient.getLastLocation()
                        .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                            @Override
                            public void onSuccess(Location location) {
                                // Got last known location. In some rare situations this can be null.
                                LatLng pos;
                                if (location != null) {
                                    pos = new LatLng(location.getLatitude(), location.getLongitude());
                                    myPosition = pos;
                                }
                                else {
                                    pos = new LatLng(45.516136, -73.656830);
                                }

                                //Zoom et location initiale de la map
                                CameraUpdate centerAndZoom = CameraUpdateFactory.newLatLngZoom(pos,20);

                                mMap.moveCamera(centerAndZoom);
                            }
                        });
            }
        } catch(SecurityException e)  {
            Log.e("Exception: %s", e.getMessage());
        }
    }

    private void getDeviceLocation(boolean isScanning) {
        /*
         * Get the best and most recent location of the device, which may be null in rare
         * cases when a location is not available.
         */
        try {
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                fusedLocationClient.getLastLocation()
                        .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                            @Override
                            public void onSuccess(Location location) {
                                // Got last known location. In some rare situations this can be null.
                                LatLng pos;
                                if (location != null) {
                                    pos = new LatLng(location.getLatitude(), location.getLongitude());
                                    myPosition = pos;
                                }
                                else {
                                    pos = new LatLng(45.516136, -73.656830);
                                }

                                //Zoom et location initiale de la map
                                CameraUpdate centerAndZoom = CameraUpdateFactory.newLatLngZoom(pos,20);

                                mMap.moveCamera(centerAndZoom);

                                mMap.setOnInfoWindowClickListener(new GoogleMap.OnInfoWindowClickListener() {
                                    @Override
                                    public void onInfoWindowClick(Marker marker) {
                                        if(marker.getTitle().equals("My Location")){

                                        }
                                        else {
                                            showPositionDeviceList(Integer.parseInt(marker.getTitle().split(" ")[1]));
                                        }
                                    }
                                });

                                if (isScanning == true) {

                                    newMarker = new MarkerOptions().position(pos).title("Position " + POSITION_NUMBER);
                                    //Ajoute un marker a la position actuelle
                                }
                                else{
                                    newMarker = new MarkerOptions().position(pos).title("My Location");
                                    newMarker.rotation(45);
                                    mMap.addMarker(newMarker);
                                }
                            }
                        });
            }
        } catch(SecurityException e)  {
            Log.e("Exception: %s", e.getMessage());
        }
    }

    //Trouve les autres machines dont le Bluetooth est actif et les ajoute a la liste
    private void findBluetoothDevices() {
        if(mBluetoothAdapter != null) {
            mBluetoothAdapter.startDiscovery();
            mReceiver = new BroadcastReceiver() {
                public void onReceive(Context context, Intent intent) {
                    String action = intent.getAction();

                    //Finding devices
                    if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                        // Get the BluetoothDevice object from the Intent
                        BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                        // Add device to array
                        if (!devices.contains(device)) {
                            devices.add(device);
                            int rssi = intent.getShortExtra(BluetoothDevice.EXTRA_RSSI,Short.MIN_VALUE);
                            double distance =  Math.pow(10, (int)((MEASUREDPOWER - (int)rssi)/(10 * N)));

                            devicesArray.add("Device " + deviceNumber + ": " + device.toString());
                            deviceNumber++;
                            deviceAdapter.notifyDataSetChanged();

                        }
                    }
                }
            };

            IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
            registerReceiver(mReceiver, filter);
        }

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            unregisterReceiver(mReceiver);
        } catch(IllegalArgumentException e) {
            e.printStackTrace();
        }
    }

    private void calculateDirections(MarkerOptions marker){
        com.google.maps.model.LatLng destinationPoint = new com.google.maps.model.LatLng(marker.getPosition().latitude, marker.getPosition().longitude);
        DirectionsApiRequest route = new DirectionsApiRequest(geoApiContext);
        com.google.maps.model.LatLng myPositionTransformed = new com.google.maps.model.LatLng(myPosition.latitude, myPosition.longitude);
        route.origin(myPositionTransformed);
        route.destination(destinationPoint).setCallback(new PendingResult.Callback<DirectionsResult>() {
            @Override
            public void onResult(DirectionsResult result) {
                addRouteToMap(result);
            }

            @Override
            public void onFailure(Throwable e) {
                System.out.print("error" + e.getMessage());
            }
        });
    }

    private void addRouteToMap(final DirectionsResult route){
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                List<com.google.maps.model.LatLng> path = PolylineEncoding.decode(route.routes[0].overviewPolyline.getEncodedPath());
                List<LatLng> transformedPath = new ArrayList<>();

                for (com.google.maps.model.LatLng coordinate: path){
                    transformedPath.add(new LatLng(coordinate.lat, coordinate.lng));
                }
                Polyline polyline = mMap.addPolyline(new PolylineOptions().addAll(transformedPath));
            }
        });
    }

    private void readFiles() throws IOException {
        Context context = this;
        File pathOfContext = context.getFilesDir();
        File directory = new File(pathOfContext, "ListDevices");
        directory.mkdirs();
        File[] files = directory.listFiles();
        for (File fileToRead : files) {
            int lengthFile = (int) fileToRead.length();

            byte[] bytes = new byte[lengthFile];

            FileInputStream stream = new FileInputStream(fileToRead);
            try {
                stream.read(bytes);
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                stream.close();
            }

            String inputRead = new String(bytes);
            String[] listDevices = inputRead.split("\n");
            LatLng pos = new LatLng(new Double(listDevices[0]), new Double(listDevices[1]));
            MarkerOptions markerTemp = new MarkerOptions().position(pos).title(fileToRead.getName());
            markerList.add(markerTemp);
            mMap.addMarker(markerTemp);
            listDevices = Arrays.copyOfRange(listDevices, 2, listDevices.length);
            positionsDeviceList.add(new ArrayList<String>(Arrays.asList(listDevices)));
            POSITION_NUMBER++;
        }
    }

    private void writeFiles(MarkerOptions marker, ArrayList<String> devices) throws IOException {
        Context context = this;
        File pathOfContext = context.getFilesDir();
        File directory = new File(pathOfContext, "ListDevices");
        directory.mkdirs();
        File file = new File(directory, marker.getTitle());
        FileOutputStream streamToWrite = new FileOutputStream(file);
        try {
            streamToWrite.write((marker.getPosition().latitude + "\n" + marker.getPosition().longitude + "\n").getBytes());
            for (String device : devices) {
                streamToWrite.write((device + "\n").getBytes());
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            streamToWrite.close();
        }
    }

    private void readFavorites() throws IOException {
        Context context = this;
        File pathOfContext = context.getFilesDir();
        File directory = new File(pathOfContext, "Favorites");
        directory.mkdirs();
        File[] files = directory.listFiles();
        for (File fileToRead : files) {
            int lengthFile = (int) fileToRead.length();

            byte[] bytes = new byte[lengthFile];

            FileInputStream stream = new FileInputStream(fileToRead);
            try {
                stream.read(bytes);
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                stream.close();
            }

            String inputRead = new String(bytes);
            String[] listDevices = inputRead.split("\n");
            for (String device :listDevices) {
                if(!device.equals("") && device != null)
                    favoritesArray.add(device);
            }
        }
    }

    private void writeFavorites() throws IOException {
        Context context = this;
        File pathOfContext = context.getFilesDir();
        File directory = new File(pathOfContext, "Favorites");
        directory.mkdirs();
        File file = new File(directory,"favorites");
        FileOutputStream streamToWrite = new FileOutputStream(file);
        try {
            for (String device : favoritesArray) {
                streamToWrite.write((device + "\n").getBytes());
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            streamToWrite.close();
        }
    }


}
