import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import {app, auth, db} from '../../services/firebase';
import {doc, runTransaction} from 'firebase/firestore';
import VaccineProofImage from '../../assets/images/image-comprovante.png';
import SearchIcon from '../../assets/images/icon-search.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation, vaccines, setVaccine}) {
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

  const onHandleEdit = id => {
    navigation.navigate('EditVaccine', {vaccineId: id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <ImageBackground
          source={SearchIcon}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="PESQUISAR VACINA..."
          placeholderTextColor="#8B8B8B"
        />
      </View>
      <FlatList
        style={styles.list}
        // ListHeaderComponent={}
        data={vaccines}
        renderItem={({item}) => {
          return (
            <TouchableWithoutFeedback onPress={() => onHandleEdit(item.id)}>
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
            </TouchableWithoutFeedback>
          );
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          console.log('onEndReached');
        }}
        // ListFooterComponent={() => {
        //   return (
        //     <View style={styles.spinner}>
        //       <ActivityIndicator size="large" color="#3F92C5" />
        //     </View>
        //   );
        // }}
      />
      <View style={styles.containerButton}>
        <Button
          color="#49B976"
          title="Nova vacina"
          onPress={() => navigation.navigate('AddVaccine')}
        />
      </View>
    </View>
  );
}

export default Home;
