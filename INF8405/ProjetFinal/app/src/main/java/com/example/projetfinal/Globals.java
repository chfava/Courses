package com.example.projetfinal;

/**
 * Get and set for the global variables
 */
public final class Globals {
    // Singleton to declare global variables and access them from anywhere
    private static Globals instance;

    // Global variables
    private static int BATTERY_LEVEL_AT_LAUNCH;
    private static long mStartRX = 0;
    private static long mStartTX = 0;
    private static boolean mStartSet = false;
    private static String IP_ADDRESS = "0.0.0.0";
    private static boolean mIpAddressSet = false;
    private static String PAIRED_IP_ADDRESS = null;

    private static AppDatabase DB;

    // Restrict the constructor from being instantiated
    private Globals(){};

    /**
     * Used instead of the normal constructor, so that only one instance can be used
     * @return
     */
    static synchronized Globals getInstance(){
        if(instance==null){
            instance=new Globals();
        }
        return instance;
    }

    /**
     * Returns the battery level at launch
     * @return
     */
    public static int getBatteryLevelAtLaunch() {
        return BATTERY_LEVEL_AT_LAUNCH;
    }

    /**
     * Sets the battery level at launch
     * @param batteryLevelAtLaunch
     */
    public static void setBatteryLevelAtLaunch(int batteryLevelAtLaunch) {
        BATTERY_LEVEL_AT_LAUNCH = batteryLevelAtLaunch;
    }

    /**
     * Returns the starting value of download bytes
     * @return
     */
    public static long getmStartRX() {
        return mStartRX;
    }

    /**
     * Sets the starting value of download bytes
     * @param mStartRX
     */
    public static void setmStartRX(long mStartRX) {
        Globals.mStartRX = mStartRX;
    }

    /**
     * Returns the starting value of upload bytes
     * @return
     */
    public static long getmStartTX() {
        return mStartTX;
    }

    /**
     * Sets the starting value of upload bytes
     * @param mStartTX
     */
    public static void setmStartTX(long mStartTX) {
        Globals.mStartTX = mStartTX;
    }

    /**
     * Returns the value of whether or not the starting download/upload values have been set
     * @return
     */
    public static boolean ismStartSet() {
        return mStartSet;
    }

    /**
     * Sets the value of whether or not the starting download/upload values have been set
     * @param mStartSet
     */
    public static void setmStartSet(boolean mStartSet) {
        Globals.mStartSet = mStartSet;
    }

    /**
     * returns the ip adress of the device
     * @return
     */
    public static String getIpAddress() {
        return IP_ADDRESS;
    }

    /**
     * sets the ip adress of the device
     * @param ipAddress
     */
    public static void setIpAddress(String ipAddress) {
        IP_ADDRESS = ipAddress;
    }

    /**
     * gets the ip adress of the paired device
     * @return
     */
    public static String getPairedIpAddress() {
        return PAIRED_IP_ADDRESS;
    }

    /**
     * sets the ip adress of the paired device
     * @param pairedIpAddress
     */
    public static void setPairedIpAddress(String pairedIpAddress) {
        PAIRED_IP_ADDRESS = pairedIpAddress;
    }

    /**
     * get the database
     * @return
     */
    public static AppDatabase getDB() {
        return DB;
    }

    /**
     * Sets the database
     * @param DB
     */
    public static void setDB(AppDatabase DB) {
        Globals.DB = DB;
    }
}
