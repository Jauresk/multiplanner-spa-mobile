import React from 'react';
import { View, ViewStyle } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

interface ReviewStarsProps {
    review: number;
    size: number;
    color: string;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ review, size, color }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < review; i++) {
            stars.push(
                <View
                    style={{ marginRight: 4 } as ViewStyle}
                    key={i}>
                    <FontAwesome name="star" size={size} color={color} />
                </View>
            );
        }
        return stars;
    };

    return (
        <View style={{ flexDirection: 'row' } as ViewStyle}>
            {renderStars()}
        </View>
    );
};

export default ReviewStars;
