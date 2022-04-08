package com.example.projetfinal;

import android.app.Service;
import android.arch.persistence.room.Room;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.media.ThumbnailUtils;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.IBinder;
import android.text.format.Formatter;
import android.util.Base64;
import android.util.Log;

import com.google.android.gms.maps.model.LatLng;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;

public class FileListenerService extends Service implements Runnable {
    private boolean mRunning = false;
    private Thread mThread;

    private ServerSocket mServerSocket;
    private Socket mClientSocket;
    private InputStream mInputStream;
    private final String DB_NAME = "realtest";

    /**
     *Called when the service is started
     * @param intent
     * @param flags
     * @param startId
     * @return
     */
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        //Start the thread to listen to socket
        if (mThread == null) {
            mRunning = true;

            mThread = new Thread(this);
            mThread.start();
        }
        return Service.START_NOT_STICKY;
    }

    /**
     *
     * @param intent
     * @return
     */
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    /**
     * Starts the socket service
     */
    @Override
    public void run() {
        try {
            mServerSocket = new ServerSocket(8988);
            while (mRunning) {
                try {
                    mClientSocket = mServerSocket.accept();
                    mInputStream = mClientSocket.getInputStream();

                    //Add the received image to database
                    BufferedReader r = new BufferedReader(new InputStreamReader(mInputStream));
                    StringBuilder total = new StringBuilder();
                    for (String line; (line = r.readLine()) != null; ) {
                        total.append(line).append('\n');
                    }

                    Log.d(MapsActivity.TAG, "***Received ImageJson***\n" + total.toString());
                    try {
                        JSONObject obj = new JSONObject(total.toString());
                        //ImageJson newImage = new ImageJson(getBitmapFromString((String) obj.get("image")), (double) obj.get("lat"), (double) obj.get("lng"));
                        //TODO : ADD TO DATABASE
                        Picture picture = new Picture((double) obj.get("lat"), (double) obj.get("lng"), (String) obj.get("image"));
                        final AppDatabase db = Room.databaseBuilder(getApplicationContext(),
                                AppDatabase.class, DB_NAME).build();
                        db.pictureDao().insert(picture);
                    }
                    catch (Throwable t) {
                        t.printStackTrace();
                        Log.e(MapsActivity.TAG, "Error parsing json: " + total.toString());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                finally {
                    try {
                        mInputStream.close();
                        mInputStream = null;
                        mClientSocket.close();
                        mClientSocket = null;
                    } catch (IOException ignored) {
                    }
                }
                try {
                    // Reconnect delay
                    Thread.sleep(10);
                } catch (InterruptedException ignored) {
                }
            }
        }
        catch (IOException ex) {
            ex.printStackTrace();
            close();
        }
        finally {
            // Will eventually call onDestroy()
            stopSelf();
        }
    }

    /**
     * Closes the sockets
     */
    private void close() {
        if (mInputStream != null) {
            try {
                mInputStream.close();
                mInputStream = null;
            } catch (IOException ignored) {
            }
        }

        if (mServerSocket != null) {
            try {
                mServerSocket.close();
                mServerSocket = null;
            } catch (IOException ignored) {
            }
        }
    }

    /**
     * Free the memory
     */
    @Override
    public void onDestroy() {
        if (mThread != null) {
            mRunning = false;

            close();

            while (true) {
                try {
                    mThread.interrupt();
                    mThread.join();
                    mThread = null;
                    break;
                } catch (InterruptedException ignored) {
                }
            }
        }
        super.onDestroy();
    }
}
