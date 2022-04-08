/** SOURCE : https://github.com/Miserlou/Android-SDK-Samples/blob/master/WiFiDirectDemo/src/com/example/android/wifidirect/FileTransferService.java **/

package com.example.projetfinal;

import android.app.IntentService;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Parcelable;
import android.util.Base64;
import android.util.Log;

import com.google.android.gms.maps.model.LatLng;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;

/**
 * A service that process each file transfer request i.e Intent by opening a
 * socket connection with the WiFi Direct Group Owner and writing the file
 */
public class FileTransferService extends IntentService {

    private static final int SOCKET_TIMEOUT = 5000;
    public static final String ACTION_SEND_FILE = "send_file";
    public static final String EXTRAS_LAT = "lat";
    public static final String EXTRAS_LNG = "lng";
    public static final String EXTRAS_FILE_PATH = "file_path";
    public static final String EXTRAS_DEVICE_ADDRESS = "go_host";
    public static final String EXTRAS_GROUP_OWNER_PORT = "go_port";

    /**
     *
     * @param name
     */
    public FileTransferService(String name) {
        super(name);
    }

    /**
     *
     */
    public FileTransferService() {
        super("FileTransferService");
    }

    /**
     * Log service startup on service startup
     * @param intent
     * @param flags
     * @param startId
     * @return
     */
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, startId, startId);
        Log.i(MapsActivity.TAG, "INTENT SERVICE STARTED");
        return START_STICKY;
    }

    /**
     * Receive and decode image files,
     * when socket receives cotent
     * @param intent
     */
    @Override
    protected void onHandleIntent(Intent intent) {

        if (intent.getAction().equals(ACTION_SEND_FILE)) {
            Bundle extras = intent.getExtras();
            String imagePath = extras.getString(EXTRAS_FILE_PATH);

            BitmapFactory.Options bmpFactoryOptions = new BitmapFactory.Options();
            bmpFactoryOptions.inJustDecodeBounds = false;

            Bitmap bmp = BitmapFactory.decodeFile(imagePath, bmpFactoryOptions);
            Bitmap resizedBmp = resizeBitmap(bmp);

            //Create JSON object to send
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("image", getStringFromBitmap(resizedBmp));
                jsonObject.put("lat", extras.getDouble(EXTRAS_LAT));
                jsonObject.put("lng", extras.getDouble(EXTRAS_LNG));
            }
            catch (JSONException e) {
                e.printStackTrace();
            }
            String host = extras.getString(EXTRAS_DEVICE_ADDRESS);
            Socket socket = new Socket();
            int port = extras.getInt(EXTRAS_GROUP_OWNER_PORT);

            try {
                Log.d(MapsActivity.TAG, "Opening client socket - ");
                socket.bind(null);
                socket.connect((new InetSocketAddress(host, port)), SOCKET_TIMEOUT);

                Log.d(MapsActivity.TAG, "Client socket - " + socket.isConnected());

                OutputStream stream = socket.getOutputStream();
                PrintWriter pw = new PrintWriter(stream);
                pw.println(jsonObject.toString());
                pw.flush();
                Log.d(MapsActivity.TAG, "Client: Data written");
            } catch (IOException e) {
                Log.e(MapsActivity.TAG, e.getMessage());
            } finally {
                if (socket != null) {
                    if (socket.isConnected()) {
                        try {
                            socket.close();
                        } catch (IOException e) {
                            // Give up
                            e.printStackTrace();
                        }
                    }
                }
            }

        }
    }

    /**
     * Resize the image size using the camera resolution as ratio
     * @param bmp
     * @return
     */
    private Bitmap resizeBitmap(Bitmap bmp) {
        //Set height and width of the image
        Camera c = Camera.open();
        android.hardware.Camera.Parameters parameters = c.getParameters();
        android.hardware.Camera.Size size = parameters.getPictureSize();
        int height = size.height;
        int width = size.width;
        if (c != null){
            c.release();
            c = null;
        }
        int imageWidth = 2 * (int)((double)bmp.getWidth()/width * 400 *
                (double)bmp.getWidth()/(double)bmp.getHeight());
        int imageHeight = 2 * (int)((double)bmp.getHeight()/height * 440 *
                (double)bmp.getHeight()/(double)bmp.getWidth());
        final Bitmap resizedImage = ThumbnailUtils.extractThumbnail(bmp, imageWidth, imageHeight);

        return resizedImage;
    }

    /**
     * Encode the image into string
     * @param bitmapPicture
     * @return
     */
    private String getStringFromBitmap(Bitmap bitmapPicture) {
        final int COMPRESSION_QUALITY = 50;
        String encodedImage;
        ByteArrayOutputStream byteArrayBitmapStream = new ByteArrayOutputStream();
        bitmapPicture.compress(Bitmap.CompressFormat.JPEG, COMPRESSION_QUALITY,
                byteArrayBitmapStream);
        bitmapPicture.recycle();
        byte[] b = byteArrayBitmapStream.toByteArray();
        encodedImage = Base64.encodeToString(b, Base64.DEFAULT);

        try {
            byteArrayBitmapStream.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return encodedImage;
    }
}