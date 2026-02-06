/**
 * App Navigator
 * Main navigation structure
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    HomeScreen,
    TikTokScreen,
    YouTubeScreen,
    InstagramScreen,
    FacebookScreen,
    TwitterScreen,
    HistoryScreen,
    BulkDownloadScreen,
} from '../screens';
import { RootStackParamList } from '../types';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background.darker },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="TikTok" component={TikTokScreen} />
                <Stack.Screen name="YouTube" component={YouTubeScreen} />
                <Stack.Screen name="Instagram" component={InstagramScreen} />
                <Stack.Screen name="Facebook" component={FacebookScreen} />
                <Stack.Screen name="Twitter" component={TwitterScreen} />
                <Stack.Screen name="BulkDownload" component={BulkDownloadScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
