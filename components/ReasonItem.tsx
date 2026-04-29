import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface ReasonItemProps {
    checked: boolean;
    onPress: (event: GestureResponderEvent) => void;
    title: string;
}

const ReasonItem: React.FC<ReasonItemProps> = ({ checked, onPress, title }) => {
    const { dark } = useTheme();

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={{ marginLeft: 8 }} onPress={onPress}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 10,
                        } as ViewStyle}
                    >
                        {checked && <View style={{
                            height: 10,
                            width: 10,
                            backgroundColor: COLORS.primary,
                            borderRadius: 999
                        } as ViewStyle} />}
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.black
                    } as TextStyle]}>{title}</Text>
                </View>
            </View>
            <View style={styles.leftContainer}>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    } as ViewStyle,
    rightContainer: {
        flexDirection: "row",
        alignItems: "center"
    } as ViewStyle,
    icon: {
        height: 26,
        width: 26,
        marginRight: 16
    } as ViewStyle,
    title: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.black
    } as TextStyle,
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    } as ViewStyle
});

export default ReasonItem;
