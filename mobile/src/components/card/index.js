import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styles from './styles';

function CardVaccine({onHandleEdit, item}) {
  const getNextDoseText = nextDose => {
    if (!nextDose) {
      return 'Não há próxima dose';
    }
    const day = nextDose.getDate();
    const month = nextDose.getMonth() + 1;
    const year = nextDose.getFullYear();
    return `Próxima dose: ${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;
  };

  return (
    <TouchableOpacity onPress={() => onHandleEdit(item.id)}>
      <View style={styles.card} key={item.id}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDose}>{item.dose}</Text>
        <Text style={styles.cardDate}>
          {item.date.getDate().toString().padStart(2, '0')}/
          {(item.date.getMonth() + 1).toString().padStart(2, '0')}/
          {item.date.getFullYear()}
        </Text>
        <View style={styles.cardProof}>
          <ImageBackground
            style={styles.cardImageProof}
            source={{uri: item.proof}}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.nextDateDose}>
          {getNextDoseText(item.nextDateDose)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardVaccine;
