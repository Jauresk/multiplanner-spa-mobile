import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface HorizontalFavouriteEventCardProps {
    name?: string;
    image?: ImageSourcePropType;
    location?: string;
    startTime?: string;
    endTime?: string;
    date?: string;
    isFree?: boolean;
    onPress: () => void;
}

const HorizontalFavouriteEventCard: React.FC<HorizontalFavouriteEventCardProps> = ({
    name,
    image,
    location,
    startTime,
    endTime,
    date,
    isFree,
    onPress
}) => {
    const { dark } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white
            }]}>
            <Image
                source={image}
                resizeMode='cover'
                style={styles.image}
            />
            {
                isFree && (
                    <View style={styles.reviewContainer}>
                        <Text style={styles.rating}>FREE</Text>
                    </View>
                )
            }
            <View style={styles.columnContainer}>
                <View style={styles.topViewContainer}>
                    <Text style={[styles.name, {
                        color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                    }]}>{name}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.duration}>{`${date}, ${startTime}-${endTime}`}</Text>
                </View>
                <View style={styles.bottomViewContainer}>
                    <Text style={[styles.location, {
                        color: dark ? COLORS.greyscale300 : COLORS.grayscale700
                    }]}>{location}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <Image
                            source={icons.heart2}
                            resizeMode='contain'
                            style={styles.heartIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: SIZES.width - 32,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12,
        height: 112,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 16,
    },
    columnContainer: {
        flexDirection: "column",
        marginLeft: 12,
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        marginVertical: 4,
        marginRight: 40,
    },
    location: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.grayscale700,
        marginVertical: 4,
    },
    priceContainer: {
        flexDirection: "column",
        marginVertical: 4,
    },
    duration: {
        fontSize: 12,
        fontFamily: "semiBold",
        color: COLORS.primary,
        marginRight: 8,
    },
    heartIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary,
        marginLeft: 6,
    },
    reviewContainer: {
        position: "absolute",
        top: 16,
        left: 54,
        width: 46,
        height: 20,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    rating: {
        fontSize: 12,
        fontFamily: "semiBold",
        color: COLORS.white,
        marginLeft: 4,
    },
    topViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 164,
    },
    bottomViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
    },
});

export default HorizontalFavouriteEventCard