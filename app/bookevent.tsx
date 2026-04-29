import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useTheme } from '../theme/ThemeProvider';
import Button from '../components/Button';
import { Economy, Vip } from '@/tabs';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

const renderScene = SceneMap({
  first: Economy,
  second: Vip,
});

// Define the types for the route and focused props
interface TabRoute {
  key: string;
  title: string;
}

interface RenderLabelProps {
  route: TabRoute;
  focused: boolean;
}

// Book event
const BookEvent = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const layout = useWindowDimensions();
  const { colors, dark } = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Economy' },
    { key: 'second', title: 'VIP' }
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      activeColor={COLORS.primary}
      inactiveColor={dark ? COLORS.white : COLORS.greyscale900}
      renderLabel={({ route, focused }: RenderLabelProps) => (

        <Text style={[{
          color: focused ? COLORS.primary : "gray",
          fontSize: 16,
          fontFamily: "semiBold"
        }]}>
          {route.title}
        </Text>
      )}
    />
  )

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Book Event" />
        <View style={{ flex: 1 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue - $50"
            filled
            style={styles.button}
            onPress={() => navigation.navigate("bookeventdetails")}
          />
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 62,
  },
  button: {
    width: SIZES.width - 32,
    marginTop: 22
  }
})

export default BookEvent