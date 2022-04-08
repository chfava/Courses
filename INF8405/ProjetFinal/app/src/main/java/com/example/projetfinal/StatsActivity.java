package com.example.projetfinal;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.TrafficStats;
import android.os.BatteryManager;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class StatsActivity extends AppCompatActivity {
    private final Globals GLOBALS = Globals.getInstance();
    private Button backButton;
    private TextView batteryLevelTV;
    private TextView batteryTempTV;
    private TextView batteryVoltTV;
    private TextView batteryConsumptionSinceLaunchTV;
    private Handler mHandler = new Handler();
    private long mStartRX = 0;
    private long mStartTX = 0;

    private static String INIT_BATTERY_CONSUMPTION = "0%";

    /**
     * On creation of the activity
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stats);

        setButtons();
        setBatteryInfo();
        updateBandwithInfo();
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
    }

    /**
     * Sets battery info and receiver for battery level updates
     */
    public void setBatteryInfo() {
        BatteryManager bm = (BatteryManager)getSystemService(BATTERY_SERVICE);
        int batLevel = 0;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            batLevel = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        }
        GLOBALS.setBatteryLevelAtLaunch(batLevel);

        batteryLevelTV = (TextView) this.findViewById(R.id.battery_level_value_tv);
        batteryLevelTV.setText(BatteryManager.EXTRA_LEVEL + "%");

        batteryTempTV = (TextView) this.findViewById(R.id.battery_temp_value_tv);
        batteryTempTV.setText("--- °C");

        batteryVoltTV = (TextView) this.findViewById(R.id.battery_volt_value_tv);
        batteryVoltTV.setText("--- V");

        batteryConsumptionSinceLaunchTV = (TextView) this.findViewById(R.id.battery_consumption_value_tv);
        batteryConsumptionSinceLaunchTV.setText(INIT_BATTERY_CONSUMPTION);

        this.registerReceiver(this.mBatteryLevelReceiver,new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
    }

    /**
     * Sets the receiver for battery level updates
     */
    public BroadcastReceiver mBatteryLevelReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL,0);
            int voltage_int = intent.getIntExtra(BatteryManager.EXTRA_VOLTAGE, 0);
            float voltage = (float) voltage_int/1000;
            int temperature_int = intent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, 0);
            float temperature = (float)temperature_int/10;

            batteryLevelTV.setText(String.valueOf(level)+"%");
            batteryTempTV.setText(String.valueOf(temperature) + " °C");
            batteryVoltTV.setText(String.valueOf(voltage) + " V");
            batteryConsumptionSinceLaunchTV.setText(String.valueOf(GLOBALS.getBatteryLevelAtLaunch() - level)+"%");
        }
    };

    /**
     * Updates bandwith info everytime the activity is called
     */
    public void updateBandwithInfo() {
        updateBandwithText();
        mHandler.postDelayed(mRunnable, 1000);
    }

    /**
     * Updates the bandwith info every second
     */
    private final Runnable mRunnable = new Runnable() {
        public void run() {
            updateBandwithText();
            mHandler.postDelayed(mRunnable, 1000);
        }
    };

    /**
     * Updates the view for the bandwith info changes
     */
    public void updateBandwithText() {
        TextView RX = (TextView)findViewById(R.id.downlink_value_tv);
        TextView TX = (TextView)findViewById(R.id.uplink_value_tv);

        long rxBytes = TrafficStats.getTotalRxBytes() - GLOBALS.getmStartRX();
        RX.setText(Long.toString(rxBytes));

        long txBytes = TrafficStats.getTotalTxBytes()- GLOBALS.getmStartTX();
        TX.setText(Long.toString(txBytes));
    }

    /**
     * Click function to return to main menu
     * @param view
     */
    public void clickBackButton(View view) {
        Intent intent = new Intent(this, MainActivity.class);
        unregisterReceiver(mBatteryLevelReceiver);
        finish();
        startActivity(intent);
    }
}
