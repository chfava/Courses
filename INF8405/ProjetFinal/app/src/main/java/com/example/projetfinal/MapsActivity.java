package com.example.projetfinal;

import android.Manifest;
import android.app.Dialog;
import android.arch.persistence.room.Room;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.ColorDrawable;
import android.hardware.Camera;
import android.location.Location;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.text.InputType;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.PendingResult;
import com.google.maps.internal.PolylineEncoding;
import com.google.maps.model.DirectionsResult;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private final Globals GLOBALS = Globals.getInstance();
    private GoogleMap mMap;
    private GeoApiContext geoApiContext = null;
    private FusedLocationProviderClient fusedLocationClient;
    private Button backButton;
    private Button cameraButton;
    private ToggleButton toggleButton;
    private Button refreshButton;
    private Button pairingButton;
    private Button route_button;
    private Button test_route_button;
    private MarkerOptions markerOnFocus = null;

    public static final String TAG = "PolyBlueV2.0";
    private boolean retryChannel = false;
    private final IntentFilter intentFilter = new IntentFilter();

    static final int REQUEST_IMAGE_CAPTURE = 1;
    static final int REQUEST_TAKE_PHOTO = 1;
    static final int MY_PERMISSIONS_REQUEST_CAMERA = 1;

    private ArrayList<MarkerOptions> markerList;
    private ArrayList<Bitmap> tumbnailList;
    private ArrayList<Bitmap> fullSizeImageList;
    private LatLng myPosition;
    String currentPhotoPath;
    String imageFilePath;

    private AppDatabase db;
    private final String DB_NAME = "realtest";

    private String mInputAddress = "";

    /**
     * On creation of the activity
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        setButtons();

        /** Start the listening service (separate thread) **/
        Intent fileListenerService = new Intent(this, FileListenerService.class);
        startService(fileListenerService);
        db = GLOBALS.getDB();

        markerList = new ArrayList<MarkerOptions>();
        tumbnailList = new ArrayList<Bitmap>();
        fullSizeImageList = new ArrayList<Bitmap>();

        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());

        new Thread(new Runnable() {
            public void run() {
                updateMapFromDb();
            }
        }).start();
    }

    /**
     * Sets all buttons in view
     */
    public void setButtons() {
        // Button to go back to main menu
        backButton = findViewById(R.id.back_button);
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickBackButton(v);
            }
        });

        // Button to use camera
        cameraButton = findViewById(R.id.camera_button);
        cameraButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickCameraButton(v);
            }
        });

        // Button to fresh map from info in DB
        refreshButton = findViewById(R.id.refresh_button);
        refreshButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickRefreshButton(v);
                getDeviceLocation();
            }
        });

        // Button to pair and share
        pairingButton = findViewById(R.id.pairing_button);
        pairingButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickPairingButton(v);
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

        test_route_button = findViewById(R.id.test_route_button);
        test_route_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(markerOnFocus != null) {
                    LatLng temp = new LatLng(myPosition.latitude, myPosition.longitude);
                    myPosition = new LatLng(45.4919, -73.6165);
                    calculateDirections(markerOnFocus);
                    myPosition = new LatLng(temp.latitude, temp.longitude) ;
                }
                else{
                    System.out.print("Error markerOnFocus is null");
                }
            }
        });

        cameraButton = findViewById(R.id.camera_button);
        cameraButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickCameraButton(v);
            }
        });

        toggleButton = findViewById(R.id.onOffFlashlight);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            toggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(final CompoundButton compoundButton, final boolean checked) {
                    compoundButton.setEnabled(false);
                    final Handler handler = new Handler();
                    final Runnable updateRunner = new Runnable() {
                        public void run() {
                            compoundButton.setEnabled(true);
                        }
                    };
                    new Thread(new Runnable() {
                        public void run() {
                            Camera camera = Camera.open();
                            Camera.Parameters parameters = camera.getParameters();
                            if (checked) {
                                parameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
                                camera.setParameters(parameters);
                                camera.startPreview();
                            } else {
                                parameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
                                if(parameters.getFlashMode() != null) {
                                    camera.setParameters(parameters);
                                }
                                camera.stopPreview();
                                camera.release();
                            }
                            handler.post(updateRunner);
                        }
                    }).start();
                }
            });
        } else {
            toggleButton.setEnabled(false);
        }

    }

    /**
     * Update the images and markers on the map using the sqLite database
     */
    public void updateMapFromDb() {
        final AppDatabase db = Room.databaseBuilder(getApplicationContext(),
                AppDatabase.class, DB_NAME).build();

        List<Picture> pictures = db.pictureDao().getAll();
        tumbnailList.clear();
        markerList.clear();
        fullSizeImageList.clear();
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mMap.clear();
            }
        });

        for(final Picture pic: pictures) {
            final LatLng latLng = new LatLng(pic.getLatitude(),pic.getLongitude());
            byte[] decodedImage = Base64.decode(pic.getImage(),Base64.DEFAULT);
            Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedImage, 0, decodedImage.length);
            addImageToMapFromDb(decodedByte,latLng);
            fullSizeImageList.add(decodedByte);
        }
    }

    /**
     * Adds an image coming from the database on the map at location latLng
     * @param imageBitmap
     * @param latLng
     */
    public void addImageToMapFromDb(Bitmap imageBitmap, LatLng latLng){
        tumbnailList.add(imageBitmap);

        final InfoWindowData info = new InfoWindowData();
        info.setThumbail(imageBitmap);

        final MarkerOptions newMarker = new MarkerOptions().position(latLng).icon(BitmapDescriptorFactory.defaultMarker( BitmapDescriptorFactory.HUE_BLUE));

        //Check if marker already exists on this location
        //If so, rotate new marker so both are accessible
        int rotationCount = checkIfMarkerOnLocation(newMarker);
        newMarker.rotation(rotationCount * 45);
        newMarker.title(imageBitmap.toString());
        markerList.add(newMarker);

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                markerOnFocus = newMarker;
                Marker marker  = mMap.addMarker(newMarker);
                marker.setTag(info);
                marker.showInfoWindow();
            }
        });
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

        // Add a marker in Sydney and move the camera
        getDeviceLocation();

        mMap.setOnInfoWindowClickListener(new GoogleMap.OnInfoWindowClickListener() {
            @Override
            public void onInfoWindowClick(Marker marker) {
                int index = -1;
                for(int i = 0; i < markerList.size(); i++){
                    if(markerList.get(i).getTitle().equals(marker.getTitle())){
                        index = i;
                    }
                }
                if(index != -1) {
                    showImage(fullSizeImageList.get(index));
                }
            }
        });

        CustomInfoWindowGoogleMap customInfoWindow = new CustomInfoWindowGoogleMap(this);
        mMap.setInfoWindowAdapter(customInfoWindow);

        if(geoApiContext == null){
            geoApiContext = new GeoApiContext.Builder().apiKey("AIzaSyCwxupz7zLM9zWtrbWMgt-rKvEK_SPNfGo").build();
        }

        mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                LatLng pos = new LatLng(marker.getPosition().latitude,marker.getPosition().longitude);
                markerOnFocus = new MarkerOptions().position(pos);
                return false;
            }
        });
    }

    /**
     * Shows an image in full screen
     * @param imageBtm
     */
    public void showImage(Bitmap imageBtm) {
        final Dialog builder = new Dialog(this);
        builder.requestWindowFeature(Window.FEATURE_NO_TITLE);
        builder.getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT));
        builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
            }
        });

        ImageView imageView = new ImageView(this);
        imageView.setImageBitmap(imageBtm);
        builder.addContentView(imageView, new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        Button mClose = new Button(this);
        mClose.setText("CLOSE");
        mClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                builder.dismiss();
            }
        });

        RelativeLayout.LayoutParams lp=new RelativeLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT);

        lp.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        builder.addContentView(mClose,lp);
        builder.show();
    }

    /**
     * Updates the attribute myPosition to the actual gps position of the device
     */
    private void getDeviceLocation() {
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
                                    myPosition = new LatLng(45.516136, -73.656830);
                                }

                                //mMap.addMarker(new MarkerOptions().position(myPosition).title("My Position"));
                                CameraUpdate centerAndZoom = CameraUpdateFactory.newLatLngZoom(myPosition,20);
                                mMap.moveCamera(centerAndZoom);


                            }
                        });
            }
        } catch(SecurityException e)  {
            Log.e("Exception: %s", e.getMessage());
        }
    }

    /**
     * Click function to return to main menu
     * @param view
     */
    public void clickBackButton(View view) {
        Intent intent = new Intent(this, MainActivity.class);
        finish();
        startActivity(intent);
    }

    /**
     * Click function to return to main menu
     * @param view
     */
    public void clickRefreshButton(View view) {
        new Thread(new Runnable() {
            public void run() {
                updateMapFromDb();
            }
        }).start();
    }

    /**
     * Click function to return to main menu
     * @param view
     */
    public void clickPairingButton(View view) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(R.string.input_address_title_string);

        // Set up the input
        final EditText input = new EditText(this);
        input.setHint(GLOBALS.getPairedIpAddress());
        // Specify the type of input expected; this, for example, sets the input as a password, and will mask the text
        input.setInputType(InputType.TYPE_CLASS_TEXT);
        builder.setView(input);

        // Set up the buttons
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if(!input.getText().toString().equals("")) {
                    GLOBALS.setPairedIpAddress(input.getText().toString());
                }
            }
        });
        builder.setNeutralButton("Cancel pairing", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                GLOBALS.setPairedIpAddress(null);
            }
        });
        builder.setNegativeButton("Back", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });

        builder.show();
    }

    /**
     * Registers the BroadcastReceiver with the intent values to be matched
     */
    public void clickCameraButton(View view){
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED) {
            //Initiate camera app call
            Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
                imageFilePath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/picture.jpg";
                File imageFile = new File(imageFilePath);
                Uri imageFileUri = Uri.fromFile(imageFile);
                if(imageFileUri != null) {
                    takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageFileUri);
                    takePictureIntent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO);
                }
            }
        }
        else{
            Toast.makeText(this, "The app doesn't have the camera permissions !",
                    Toast.LENGTH_LONG).show();

            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.CAMERA},
                    MY_PERMISSIONS_REQUEST_CAMERA);
        }
    }

    /**
     * Reads the image from the filepath after returning the camera intent,
     * resize the image, resulting in 2 different sizes : the entire image and the thumnail,
     * the images is resized depending on the camera resolution
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Camera c = Camera.open();
            android.hardware.Camera.Parameters parameters = c.getParameters();
            android.hardware.Camera.Size size = parameters.getPictureSize();


            int height = size.height;
            int width = size.width;
            if (c != null){
                c.release();
                c = null;
            }
            BitmapFactory.Options bmpFactoryOptions = new BitmapFactory.Options();
            bmpFactoryOptions.inJustDecodeBounds = false;

            Bitmap bmp = BitmapFactory.decodeFile(imageFilePath, bmpFactoryOptions);

            //resize full size image if camera resolution too high
            int imageWidth = 2 * (int)((double)bmp.getWidth()/width * 400 * (double)bmp.getWidth()/(double)bmp.getHeight());
            int imageHeight = 2 * (int)((double)bmp.getHeight()/height * 440 * (double)bmp.getHeight()/(double)bmp.getWidth());
            final Bitmap newBmp = ThumbnailUtils.extractThumbnail(bmp, imageWidth, imageHeight);

            fullSizeImageList.add(newBmp);

            int thumbnailWidth = (int)((double)bmp.getWidth()/width * 400 * (double)bmp.getWidth()/(double)bmp.getHeight());
            int thumbnailHeight = (int)((double)bmp.getHeight()/height * 440 * (double)bmp.getHeight()/(double)bmp.getWidth());
            final Bitmap ThumbImage = ThumbnailUtils.extractThumbnail(bmp, thumbnailWidth, thumbnailHeight);
            addImageToMap(ThumbImage);

            new Thread(new Runnable() {
                public void run() {
                    addImageToDb(newBmp);
                }
            }).start();
            //Send the image to peers
            sendToPeer();
        }
    }

    /**
     * Adds an image to the database SQLite
     * @param imageBitmap
     */
    private void addImageToDb(Bitmap imageBitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        imageBitmap.compress(Bitmap.CompressFormat.JPEG, 90, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream .toByteArray();
        String encodedImage = Base64.encodeToString(byteArray, Base64.DEFAULT);

        final Picture picture = new Picture(myPosition.latitude, myPosition.longitude, encodedImage);

        final AppDatabase db = Room.databaseBuilder(getApplicationContext(),
                AppDatabase.class, DB_NAME).build();
        db.pictureDao().insert(picture);
    }

    /**
     * Adds an image on the map and saves it in the thumbnail list
     * @param imageBitmap
     */
    /**
     * Used to send an ImageJson to the paired device through a socket, using the
     * FileTransferService.
     */
    public void sendToPeer() {
        // Transfer the image to all available peers using
        // FileTransferService.
        if (Globals.getPairedIpAddress() != null) {
            LatLng pos = new LatLng(myPosition.latitude,myPosition.longitude);

            try {
                Log.d(MapsActivity.TAG, "Intent ----------- Starting FileTransferService");
                Intent serviceIntent = new Intent(this, FileTransferService.class);
                serviceIntent.setAction(FileTransferService.ACTION_SEND_FILE);
                serviceIntent.putExtra(FileTransferService.EXTRAS_FILE_PATH, imageFilePath);
                serviceIntent.putExtra(FileTransferService.EXTRAS_LAT, myPosition.latitude);
                serviceIntent.putExtra(FileTransferService.EXTRAS_LNG, myPosition.longitude);
                serviceIntent.putExtra(FileTransferService.EXTRAS_DEVICE_ADDRESS,
                        Globals.getPairedIpAddress());
                serviceIntent.putExtra(FileTransferService.EXTRAS_GROUP_OWNER_PORT, 8988);
                startService(serviceIntent);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Adds an image on the map as a thumbnail,
     * if a marker is already on the maps at the same location,
     * the new marker containing the thumbnail is rotated 45 degrees
     * @param imageBitmap
     */
    private void addImageToMap(Bitmap imageBitmap){
        tumbnailList.add(imageBitmap);

        final InfoWindowData info = new InfoWindowData();
        info.setThumbail(imageBitmap);

        LatLng pos = new LatLng(myPosition.latitude,myPosition.longitude);
        final MarkerOptions newMarker = new MarkerOptions().position(pos).icon(BitmapDescriptorFactory.defaultMarker( BitmapDescriptorFactory.HUE_BLUE));

        //Check if marker already exists on this location
        //If so, rotate new marker so both are accessible
        int rotationCount = checkIfMarkerOnLocation(newMarker);
        newMarker.rotation(rotationCount * 45);
        newMarker.title(imageBitmap.toString());
        markerList.add(newMarker);

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                markerOnFocus = newMarker;
                Marker marker  = mMap.addMarker(newMarker);
                marker.setTag(info);
                marker.showInfoWindow();
            }
        });
    }

    /**
     * Checks if marker already exists at the same location,
     * if so, the new marker will be rotated by a factor of counter, the returned value
     * @param newMarker
     * @return
     */
    private int checkIfMarkerOnLocation(MarkerOptions newMarker){
        int counter = 0;
        for (MarkerOptions oldMarker : markerList) {
            if((Math.abs(oldMarker.getPosition().latitude - newMarker.getPosition().latitude) + Math.abs(oldMarker.getPosition().longitude - newMarker.getPosition().longitude)) < 0.000001){
                counter++;
            }
        }
        return counter;
    }

    /**
     * Shows the received route from the request on the map
     * @param route
     */
    private void addRouteToMap(final DirectionsResult route){
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                if(route.routes.length != 0) {
                    List<com.google.maps.model.LatLng> path = PolylineEncoding.decode(route.routes[0].overviewPolyline.getEncodedPath());
                    List<LatLng> transformedPath = new ArrayList<>();

                    for (com.google.maps.model.LatLng coordinate : path) {
                        transformedPath.add(new LatLng(coordinate.lat, coordinate.lng));
                    }
                    Polyline polyline = mMap.addPolyline(new PolylineOptions().addAll(transformedPath));
                }
                else{
                    Context context = getApplicationContext();
                    CharSequence text = "No route found !";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(context, text, duration);
                    toast.show();
                }
            }
        });
    }

    /**
     *Requests a DirectionsApiRequest to google, to know routes from myPosition to the marker
     * @param marker
     */
    private void calculateDirections(MarkerOptions marker) {

        com.google.maps.model.LatLng destinationPoint = new com.google.maps.model.LatLng(marker.getPosition().latitude, marker.getPosition().longitude);
        DirectionsApiRequest route = new DirectionsApiRequest(geoApiContext);
        com.google.maps.model.LatLng myPositionTransformed = new com.google.maps.model.LatLng(myPosition.latitude, myPosition.longitude);
        route.origin(myPositionTransformed);
        route.destination(destinationPoint).setCallback(new PendingResult.Callback<DirectionsResult>() {
            @Override
            public void onResult(DirectionsResult result) {
                addRouteToMap(result);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        CameraUpdate centerAndZoom = CameraUpdateFactory.newLatLngZoom(markerOnFocus.getPosition(),15);
                        mMap.moveCamera(centerAndZoom);
                    }
                });

            }

            @Override
            public void onFailure(Throwable e) {

                System.out.print("error" + e.getMessage());
            }
        });
    }
}







