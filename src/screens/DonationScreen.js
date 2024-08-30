// src/screens/DonationScreen.js
import React from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const DonationScreen = ({ navigation }) => {
  const donationSchema = Yup.object().shape({
    itemType: Yup.string().required('Required'),
    quantity: Yup.number().min(1, 'Quantity must be at least 1 kg').required('Required'),
    donationOption: Yup.string().required('Required'),
    timeSlot: Yup.string().required('Required'),
    address: Yup.string().when('donationOption', {
      is: 'Pick Up',
      then: Yup.string().required('Required for pick-up option'),
      otherwise: Yup.string(),
    }),
    phoneNumber: Yup.string().matches(/^\+971 \d{2} \d{7}$/, 'Invalid phone number').required('Required'),
  });

  return (
    <Formik
      initialValues={{
        itemType: '',
        quantity: '',
        donationOption: 'Drop Off',
        timeSlot: '',
        address: '',
        phoneNumber: '',
      }}
      validationSchema={donationSchema}
      onSubmit={(values) => {
        // Handle donation scheduling logic
        navigation.navigate('Confirmation', { values });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Type of Item</Text>
          <Picker
            selectedValue={values.itemType}
            onValueChange={(value) => setFieldValue('itemType', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Item" value="" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Glass" value="Glass" />
            <Picker.Item label="Aluminum Cans" value="Aluminum Cans" />
            <Picker.Item label="Old Mobiles" value="Old Mobiles" />
          </Picker>
          {errors.itemType && touched.itemType ? (
            <Text style={styles.error}>{errors.itemType}</Text>
          ) : null}

          <Text>Quantity (kg)</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('quantity')}
            onBlur={handleBlur('quantity')}
            value={values.quantity}
            keyboardType="numeric"
          />
          {errors.quantity && touched.quantity ? (
            <Text style={styles.error}>{errors.quantity}</Text>
          ) : null}

          <Text>Donation Option</Text>
          <Picker
            selectedValue={values.donationOption}
            onValueChange={(value) => setFieldValue('donationOption', value)}
            style={styles.picker}
          >
            <Picker.Item label="Drop Off" value="Drop Off" />
            <Picker.Item label="Pick Up" value="Pick Up" />
          </Picker>

          {values.donationOption === 'Pick Up' && (
            <>
              <Text>Home Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {errors.address && touched.address ? (
                <Text style={styles.error}>{errors.address}</Text>
              ) : null}
            </>
          )}

          <Text>Contact Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            keyboardType="phone-pad"
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          ) : null}

          <Text>Preferred Time Slot</Text>
          <Picker
            selectedValue={values.timeSlot}
            onValueChange={(value) => setFieldValue('timeSlot', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Time Slot" value="" />
            <Picker.Item label="Saturday 10:00am" value="Saturday 10:00am" />
            <Picker.Item label="Saturday 6:00pm" value="Saturday 6:00pm" />
            <Picker.Item label="Sunday 10:00am" value="Sunday 10:00am" />
            <Picker.Item label="Sunday 6:00pm" value="Sunday 6:00pm" />
          </Picker>
          {errors.timeSlot && touched.timeSlot ? (
            <Text style={styles.error}>{errors.timeSlot}</Text>
          ) : null}

          <Button onPress={handleSubmit} title="Schedule Donation" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default DonationScreen;
