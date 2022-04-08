package com.example.projetfinal;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.net.TrafficStats;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.text.format.Formatter;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private final Globals GLOBALS = Globals.getInstance();
    private Button checkStatsButton;
    private Button checkMapButton;
    private TextView ipAddressTV;
    private Handler mHandler = new Handler();
    private long mStartRX = 0;
    private long mStartTX = 0;

    private static String MY_IP_ADDRESS = "My IP address is: ";

    static final int MY_PERMISSIONS_REQUEST_CAMERA = 1;

    /**
     * On creation of the activity
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setButtons();
        setBandwithInfo();
        setIpAddress();



        //check permissions
        String[] permissions = {Manifest.permission.CAMERA, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_WIFI_STATE, Manifest.permission.INTERNET,
                Manifest.permission.CHANGE_WIFI_STATE, Manifest.permission.WRITE_EXTERNAL_STORAGE};
        for(String permission : permissions) {
            if (ActivityCompat.checkSelfPermission(this, permission) == 0) {
                ActivityCompat.requestPermissions(this, permissions, MY_PERMISSIONS_REQUEST_CAMERA);
            }
        }

    }

    /**
     * Sets all buttons in view
     */
    public void setButtons() {
        checkStatsButton = findViewById(R.id.stats_button);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            // Button to check out application stats
            checkStatsButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    clickCheckStatsButton(v);
                }
            });
        } else {
            checkStatsButton.setEnabled(false);
            checkStatsButton.setText(R.string.upgrade_required_21_string);
        }
        // Button to check out map
        checkMapButton = findViewById(R.id.map_button);
        checkMapButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clickCheckMapButton(v);
            }
        });
    }

    /**
     * set the ip address to the globals
     */
    public void setIpAddress() {
        Context context = this;
        WifiManager wm = (WifiManager) context.getSystemService(WIFI_SERVICE);
        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());

        GLOBALS.setIpAddress(ip);

        ipAddressTV = findViewById(R.id.ip_address_tv);
        ipAddressTV.setText(MY_IP_ADDRESS + ip);
    }

    /**
     * Sets initial bandwith information
     */
    public void setBandwithInfo() {
        if(!GLOBALS.ismStartSet()) {
            mStartRX = TrafficStats.getTotalRxBytes();
            mStartTX = TrafficStats.getTotalTxBytes();

            if (mStartRX == TrafficStats.UNSUPPORTED || mStartTX == TrafficStats.UNSUPPORTED) {
                AlertDialog.Builder alert = new AlertDialog.Builder(this);
                alert.setTitle("Uh Oh!");
                alert.setMessage("Your device does not support traffic stat monitoring.");
                alert.show();
            } else {
                GLOBALS.setmStartRX(mStartRX);
                GLOBALS.setmStartTX(mStartTX);
                GLOBALS.setmStartSet(true);
            }
        }
    }

    /**
     * Click function to check out application stats
     * @param view
     */
    public void clickCheckStatsButton(View view) {
        Intent intent = new Intent(this, StatsActivity.class);
        finish();
        startActivity(intent);
    }

    /**
     * Click function to check out map
     * @param view
     */
    public void clickCheckMapButton(View view) {
        Intent intent = new Intent(this, MapsActivity.class);
        finish();
        startActivity(intent);
    }
}
