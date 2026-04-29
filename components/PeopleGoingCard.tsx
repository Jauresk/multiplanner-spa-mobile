import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface PeopleGoingCardProps {
    name: string;
    position: string;
    avatar: ImageSourcePropType;
}

const PeopleGoingCard: React.FC<PeopleGoingCardProps> = ({ name, position, avatar }) => {
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const { dark } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    source={avatar}
                    resizeMode='contain'
                    style={styles.avatar}
                />
                <View style={styles.viewContainer}>
                    <Text style={[styles.name, {
                        color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                    }]}>{name}</Text>
                    <Text style={[styles.phoneNumber, {
                        color: dark ? COLORS.grayscale400 : COLORS.grayscale700
                    }]}>{position}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => setIsFollow(!isFollow)}
                style={[styles.btn, {
                    backgroundColor: isFollow ? (dark ? "transparent" : COLORS.white) : COLORS.primary,
                    borderColor: isFollow ? COLORS.primary : COLORS.white,
                    borderWidth: isFollow ? 1 : 0
                }]}>
                <Text style={[styles.btnText, {
                    color: isFollow ? COLORS.primary : COLORS.white
                }]}>{isFollow ? "Following" : "Follow"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width - 32,
        marginVertical: 12
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        height: 52,
        width: 52,
        borderRadius: 999
    },
    name: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black,
        marginBottom: 6
    },
    phoneNumber: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.grayscale700
    },
    viewContainer: {
        marginLeft: 16
    },
    btn: {
        width: 72,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    btnText: {
        fontFamily: "medium",
        fontSize: 12
    }
});

export default PeopleGoingCard;
