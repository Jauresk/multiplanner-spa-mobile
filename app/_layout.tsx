import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { FONTS } from '@/constants/fonts';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function RootLayout() {
  const [loaded] = useFonts(FONTS);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding2" />
        <Stack.Screen name="onboarding3" />
        <Stack.Screen name="onboarding4" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgotpasswordmethods" />
        <Stack.Screen name="forgotpasswordphonenumber" />
        <Stack.Screen name="forgotpasswordemail" />
        <Stack.Screen name="otpverification" />
        <Stack.Screen name="createnewpin" />
        <Stack.Screen name="reasonforusingeveno" />
        <Stack.Screen name="verifyyouridentity" />
        <Stack.Screen name="proofofresidency" />
        <Stack.Screen name="photoidcard" />
        <Stack.Screen name="selfiewithidcard" />
        <Stack.Screen name="facerecognitionwalkthrough" />
        <Stack.Screen name="facerecognitionscan" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="addnewcard" />
        <Stack.Screen name="settingsinvitefriends" />
        <Stack.Screen name="settingsprivacypolicy" />
        <Stack.Screen name="settingshelpcenter" />
        <Stack.Screen name="settingslanguage" />
        <Stack.Screen name="settingsnotifications" />
        <Stack.Screen name="settingssecurity" />
        <Stack.Screen name="customerservice" />
        <Stack.Screen name="favourite" />
        <Stack.Screen name="search" />
        <Stack.Screen name="bookevent" />
        <Stack.Screen name="bookeventdetails" />
        <Stack.Screen name="cancelbooking" />
        <Stack.Screen name="cancelbookingpaymentmethods" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="enteryourpin" />
        <Stack.Screen name="ereceipt" />
        <Stack.Screen name="eventdetails" />
        <Stack.Screen name="eventdetailslocation" />
        <Stack.Screen name="eventdetailsorganizer" />
        <Stack.Screen name="eventdetailspeoplegoing" />
        <Stack.Screen name="eventreviews" />
        <Stack.Screen name="featuredevents" />
        <Stack.Screen name="gallery" />
        <Stack.Screen name="paymentmethods" />
        <Stack.Screen name="popularevents" />
        <Stack.Screen name="reviewsummary" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}