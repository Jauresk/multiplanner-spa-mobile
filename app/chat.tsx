import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons, images } from '../constants';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat, Bubble, IMessage } from 'react-native-gifted-chat';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

interface ChatProps { }

const Chat: React.FC<ChatProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const { colors, dark } = useTheme();

    const handleInputText = (text: string) => {
        setInputMessage(text);
    };

    const renderMessage = (props: any) => {
        const { currentMessage } = props;

        if (currentMessage.user._id === 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    } as ViewStyle}
                >
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: COLORS.primary,
                                marginRight: 12,
                                marginVertical: 12,
                            } as ViewStyle,
                        }}
                        textStyle={{
                            right: {
                                color: COLORS.white, // Change the text color for the sender here
                            } as TextStyle,
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    } as ViewStyle}
                >
                    <Image
                        source={images.avatar}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginLeft: 8,
                        } as ImageStyle}
                    />
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: COLORS.secondary,
                                marginLeft: 12,
                            } as ViewStyle,
                        }}
                        textStyle={{
                            left: {
                                color: COLORS.white, // Change the text color for the sender here
                            } as TextStyle,
                        }}
                    />
                </View>
            );
        }
    };

    const submitHandler = () => {
        const message: IMessage = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createdAt: new Date(),
            user: { _id: 1 },
        };
        setMessages((previousMessage) =>
            GiftedChat.append(previousMessage, [message])
        );

        setInputMessage("");
    };

    const renderInputToolbar = () => {
        return null;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar hidden={true} />
            <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={icons.arrowLeft}
                                resizeMode="contain"
                                style={[styles.headerIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Jenny Wilona</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image
                                source={icons.call}
                                resizeMode="contain"
                                style={[styles.headerIcon, { tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 16 }}>
                            <Image
                                source={icons.moreCircle}
                                resizeMode="contain"
                                style={[styles.headerIcon, { tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.chatContainer}>
                    <GiftedChat
                        messages={messages}
                        renderInputToolbar={renderInputToolbar}
                        user={{ _id: 1 }}
                        minInputToolbarHeight={0}
                        renderMessage={renderMessage}
                    />
                </View>
                <View style={[styles.inputContainer, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
                    <View style={[styles.inputMessageContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100 }]}>
                        <TextInput
                            style={[styles.input, { color: dark ? COLORS.secondaryWhite : COLORS.grayscale700 }]}
                            value={inputMessage}
                            onChangeText={handleInputText}
                            placeholderTextColor={COLORS.grayscale700}
                            placeholder="Enter your message..."
                        />
                        <View style={styles.attachmentIconContainer}>
                            <TouchableOpacity>
                                <Feather name="image" size={24} color={COLORS.gray} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.microContainer}>
                        <MaterialCommunityIcons name="microphone" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    } as ViewStyle,
    contentContainer: {
        flex: 1,
    } as ViewStyle,
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
    } as ViewStyle,
    headerTitle: {
        fontSize: 18,
        fontFamily: "semiBold",
        color: COLORS.black,
        marginLeft: 22
    } as TextStyle,
    headerIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    } as ImageStyle,
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    actionIcon: {
        marginRight: 12,
    } as ViewStyle,
    chatContainer: {
        flex: 1,
        justifyContent: 'center',
    } as ViewStyle,
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        paddingHorizontal: 16
    } as ViewStyle,
    inputMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        backgroundColor: COLORS.grayscale100,
        paddingVertical: 8,
        marginRight: 12,
        borderRadius: 12,
        alignItems: 'center'
    } as ViewStyle,
    attachmentIconContainer: {
        marginRight: 12,
    } as ViewStyle,
    input: {
        color: COLORS.grayscale700,
        flex: 1,
        paddingHorizontal: 10,
    } as TextStyle,
    microContainer: {
        height: 48,
        width: 48,
        borderRadius: 49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    } as ViewStyle,
});

export default Chat;
