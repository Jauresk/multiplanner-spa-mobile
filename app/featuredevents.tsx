import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ListRenderItem } from 'react-native';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { allEvents, categories, facilities, featuredEvents, ratings } from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeProvider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import VerticalEventCard from '../components/VerticalEventCard';
import HorizontalEventCard from '../components/HorizontalEventCard';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

interface Event {
    id: string;
    name: string;
    image: any;
    date: string;
    startTime: string;
    endTime: string;
    isFree: boolean;
    location: string;
}

interface Category {
    id: string;
    name: string;
}

interface Facility {
    id: string;
    name: string;
}

interface Rating {
    id: string;
    title: string;
}

interface SearchProps {
    navigation: any; // You might want to use a more specific type for navigation if you have one
}

const CustomSliderHandle = ({
    enabled,
    markerStyle
}: {
    enabled: boolean;
    markerStyle: any;
}) => {
    return (
        <View
            style={[
                markerStyle,
                {
                    backgroundColor: enabled ? COLORS.primary : 'lightgray',
                    borderColor: 'white',
                    borderWidth: 2,
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                },
            ]}
        />
    );
};

const FeaturedEvents: React.FC<SearchProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const refRBSheet = useRef<any>(null);
    const { dark, colors } = useTheme();
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['1']);
    const [selectedRating, setSelectedRating] = useState<string[]>(['1']);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

    const handleSliderChange = (values: number[]) => {
        setPriceRange(values);
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={[
                            styles.backIcon,
                            {
                                tintColor: dark ? COLORS.white : COLORS.greyscale900
                            }
                        ]}
                    />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
                    Featured
                </Text>
            </View>
            <TouchableOpacity>
                <Image
                    source={icons.moreCircle}
                    resizeMode='contain'
                    style={[styles.moreIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                />
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => {
        const [selectedTab, setSelectedTab] = useState<'row' | 'column'>('row');
        const [searchQuery, setSearchQuery] = useState<string>('');
        const [filteredEvents, setFilteredEvents] = useState<Event[]>(featuredEvents);
        const [resultsCount, setResultsCount] = useState<number>(0);

        useEffect(() => {
            handleSearch();
        }, [searchQuery, selectedTab]);

        const handleSearch = () => {
            const events = allEvents.filter((event) =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEvents(events);
            setResultsCount(events.length);
        };

        return (
            <View>
                {/* Search bar */}
                <View
                    style={[styles.searchBarContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite }]}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={icons.search2} resizeMode='contain' style={styles.searchIcon} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={COLORS.gray}
                        style={[styles.searchInput, { color: dark ? COLORS.white : COLORS.greyscale900 }]}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                        <Image source={icons.filter} resizeMode='contain' style={styles.filterIcon} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.reusltTabContainer}>
                        <Text style={[styles.tabText, { color: dark ? COLORS.secondaryWhite : COLORS.black }]}>
                            {resultsCount} founds
                        </Text>
                        <View style={styles.viewDashboard}>
                            <TouchableOpacity onPress={() => {
                                setSelectedTab('column');
                                setSearchQuery(''); // Clear search query when changing tab
                            }}>
                                <Image
                                    source={selectedTab === 'column' ? icons.document2 : icons.document2Outline}
                                    resizeMode='contain'
                                    style={styles.dashboardIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setSelectedTab('row');
                                setSearchQuery(''); // Clear search query when changing tab
                            }}>
                                <Image
                                    source={selectedTab === 'row' ? icons.dashboard : icons.dashboardOutline}
                                    resizeMode='contain'
                                    style={styles.dashboardIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Results container  */}
                    <View>
                        {/* Events result list */}
                        <View style={{ backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite, marginVertical: 16 }}>
                            {resultsCount > 0 ? (
                                selectedTab === 'row' ? (
                                    <FlatList
                                        data={filteredEvents}
                                        keyExtractor={(item) => item.id}
                                        numColumns={2}
                                        columnWrapperStyle={{ gap: 16 }}
                                        renderItem={({ item }) => (
                                            <VerticalEventCard
                                                name={item.name}
                                                image={item.image}
                                                date={item.date}
                                                startTime={item.startTime}
                                                endTime={item.endTime}
                                                isFree={item.isFree}
                                                location={item.location}
                                                onPress={() => navigation.navigate("eventdetails")}
                                            />
                                        )}
                                    />
                                ) : (
                                    <FlatList
                                        data={filteredEvents}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <HorizontalEventCard
                                                name={item.name}
                                                image={item.image}
                                                date={item.date}
                                                startTime={item.startTime}
                                                endTime={item.endTime}
                                                isFree={item.isFree}
                                                location={item.location}
                                                onPress={() => navigation.navigate("eventdetails")}
                                            />
                                        )}
                                    />
                                )
                            ) : (
                                <NotFoundCard />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    const toggleCategory = (categoryId: string) => {
        const updatedCategories = [...selectedCategories];
        const index = updatedCategories.indexOf(categoryId);

        if (index === -1) {
            updatedCategories.push(categoryId);
        } else {
            updatedCategories.splice(index, 1);
        }

        setSelectedCategories(updatedCategories);
    };

    const toggleRating = (ratingId: string) => {
        const updatedRatings = [...selectedRating];
        const index = updatedRatings.indexOf(ratingId);

        if (index === -1) {
            updatedRatings.push(ratingId);
        } else {
            updatedRatings.splice(index, 1);
        }

        setSelectedRating(updatedRatings);
    };

    const toggleFacility = (facilityId: string) => {
        setSelectedFacilities(prevFacilities =>
            prevFacilities.includes(facilityId)
                ? prevFacilities.filter(id => id !== facilityId)
                : [...prevFacilities, facilityId]
        );
    };

    const renderFacilitiesItem: ListRenderItem<Facility> = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedFacilities.includes(item.id) ? COLORS.primary : "transparent",
                padding: 10,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
            }}
            onPress={() => toggleFacility(item.id)}
        >
            <Text style={{ color: selectedFacilities.includes(item.id) ? COLORS.white : COLORS.primary }}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderCategoryItem: ListRenderItem<Category> = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
                padding: 10,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
            }}
            onPress={() => toggleCategory(item.id)}
        >
            <Text style={{ color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary }}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderRatingItem: ListRenderItem<Rating> = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedRating.includes(item.id) ? COLORS.primary : "transparent",
                paddingHorizontal: 16,
                paddingVertical: 6,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
                flexDirection: "row",
                alignItems: "center",
            }}
            onPress={() => toggleRating(item.id)}>
            <View style={{ marginRight: 6 }}>
                <FontAwesome name="star" size={14} color={selectedRating.includes(item.id) ? COLORS.white : COLORS.primary} />
            </View>
            <Text style={{
                color: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
            }}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {renderHeader()}
            <View>
                {renderContent()}
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={true}
                height={580}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: dark ? COLORS.dark3 : "#000",
                    },
                    container: {
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        height: 580,
                        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                        alignItems: "center",
                    }
                }}>
                <Text style={[styles.bottomTitle, {
                    color: dark ? COLORS.white : COLORS.greyscale900
                }]}>Filter</Text>
                <View style={styles.separateLine} />
                <View style={{ width: SIZES.width - 32 }}>
                    <Text style={[styles.sheetTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Category</Text>
                    <FlatList
                        data={categories}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={renderCategoryItem}
                    />
                    <Text style={[styles.sheetTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Filter</Text>
                    <MultiSlider
                        values={priceRange}
                        sliderLength={SIZES.width - 32}
                        onValuesChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={1}
                        allowOverlap={false}
                        snapped
                        minMarkerOverlapDistance={40}
                        customMarker={CustomSliderHandle}
                        selectedStyle={{ backgroundColor: COLORS.primary }}
                        unselectedStyle={{ backgroundColor: 'lightgray' }}
                        containerStyle={{ height: 40 }}
                        trackStyle={{ height: 3 }}
                    />

                    <Text style={[styles.sheetTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Facilities</Text>

                    <FlatList
                        data={facilities}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={renderFacilitiesItem}
                    />

                    <Text style={[styles.sheetTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Rating</Text>
                    <FlatList
                        data={ratings}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={renderRatingItem}
                    />
                </View>

                <View style={styles.separateLine} />

                <View style={styles.bottomContainer}>
                    <Button
                        title="Reset"
                        style={{
                            width: (SIZES.width - 32) / 2 - 8,
                            backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                            borderRadius: 32,
                            borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
                        }}
                        textColor={dark ? COLORS.white : COLORS.primary}
                        onPress={() => refRBSheet.current.close()}
                    />
                    <Button
                        title="Filter"
                        filled
                        style={styles.logoutButton}
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
            </RBSheet>
        </SafeAreaView>
    );
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
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        marginBottom: 16
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 16
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    searchBarContainer: {
        width: SIZES.width - 32,
        backgroundColor: COLORS.secondaryWhite,
        padding: 16,
        borderRadius: 12,
        height: 52,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.gray
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "regular",
        marginHorizontal: 8
    },
    filterIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary
    },
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        justifyContent: "space-between"
    },
    tabBtn: {
        width: (SIZES.width - 32) / 2 - 6,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.4,
        borderColor: COLORS.primary,
    },
    selectedTab: {
        width: (SIZES.width - 32) / 2 - 6,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.4,
        borderColor: COLORS.primary,
    },
    tabBtnText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.primary,
        textAlign: "center"
    },
    selectedTabText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.white,
        textAlign: "center"
    },
    resultContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width - 32,
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black,
    },
    subResult: {
        fontSize: 14,
        fontFamily: "semiBold",
        color: COLORS.primary
    },
    resultLeftView: {
        flexDirection: "row"
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        paddingHorizontal: 16,
        width: SIZES.width
    },
    cancelButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.tansparentPrimary,
        borderRadius: 32
    },
    logoutButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.primary,
        borderRadius: 32
    },
    bottomTitle: {
        fontSize: 24,
        fontFamily: "semiBold",
        color: COLORS.black,
        textAlign: "center",
        marginTop: 12
    },
    separateLine: {
        height: .4,
        width: SIZES.width - 32,
        backgroundColor: COLORS.greyscale300,
        marginVertical: 12
    },
    sheetTitle: {
        fontSize: 18,
        fontFamily: "semiBold",
        color: COLORS.black,
        marginVertical: 12
    },
    reusltTabContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        justifyContent: "space-between"
    },
    viewDashboard: {
        flexDirection: "row",
        alignItems: "center",
        width: 36,
        justifyContent: "space-between"
    },
    dashboardIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary
    },
    tabText: {
        fontSize: 20,
        fontFamily: "semiBold",
        color: COLORS.black
    }
});


export default FeaturedEvents