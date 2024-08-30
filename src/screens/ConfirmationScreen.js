// src/screens/ConfirmationScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmationScreen = ({ route, navigation }) => {
  const { values } = route.params;

  const calculateCarbonFootprint = (quantity) => {
    // Sample calculation: 1 kg = 0.5 kg CO2 saved
    return quantity * 0.5;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Thank you for your donation!</Text>
      <Text style={styles.message}>You have helped save {calculateCarbonFootprint(values.quantity)} kg of CO2.</Text>

      <Button
        title="Schedule Another Donation"
        onPress={() => navigation.navigate('Donation')}
      />
      <Button
        title="Log Out"
        onPress={() => navigation.navigate('Registration')}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ConfirmationScreen;
