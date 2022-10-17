import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

function CardNextVaccine({item}) {
  const getNextDoseText = nextDose => {
    if (!nextDose) {
      return 'Não há próxima dose';
    }
    const day = nextDose.getDate();
    const month = nextDose.getMonth() + 1;
    const year = nextDose.getFullYear();
    return `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;
  };

  return (
    <View style={styles.card} key={item.id}>
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.nextDateDose}>
        {getNextDoseText(item.nextDateDose)}
      </Text>
    </View>
  );
}

export default CardNextVaccine;
