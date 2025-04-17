import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useTheme } from './context/ThemeContext';
import { ExerciseCard } from './components/ExerciseCard';
import { exercises } from './data/exercises';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
    const { colors, isDark } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen
                options={{
                    title: 'Sport+',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: colors.card,
                }}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                        <Image
                            source={require('./assets/logo.png')}
                            style={styles.logo}
                        />
                        <Text style={[styles.title, { color: colors.text.primary }]}>
                            Exercices Disponibles
                        </Text>
                    </View>

                    {exercises.map((exercise, index) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            index={index}
                        />
                    ))}
                </View>
            </ScrollView>
            <Link href="/history" asChild>
                <TouchableOpacity style={styles.historyButton}>
                    <LinearGradient
                        colors={isDark ? ['#1a1a1a', '#2a2a2a'] : ['#4a90e2', '#357abd']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradient}
                    >
                        <Text style={[styles.historyButtonText, { color: isDark ? '#ffffff' : '#ffffff' }]}>
                            Voir l'historique
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
    scrollView: {
        marginBottom: 30,
        flex: 1,
    } as ViewStyle,
    content: {
        padding: 16,
        paddingBottom: 80,
    } as ViewStyle,
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    } as ViewStyle,
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    } as ImageStyle,
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    } as TextStyle,
    historyButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    } as ViewStyle,
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    historyButtonText: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    } as TextStyle,
});
