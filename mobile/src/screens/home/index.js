import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';
import {app, auth, db} from '../../services/firebase';
import {doc, runTransaction} from 'firebase/firestore';
import VaccineProofImage from '../../assets/images/image-comprovante.png';
import SearchIcon from '../../assets/images/icon-search.png';

function Home() {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const example = {
        name: 'Vacina 3',
        dose: '1ª dose',
        date: new Date(),
        nextDateDose: new Date(),
      };
      const vacs = [];
      for (let i = 0; i < 4; i++) {
        vacs.push({
          id: i + 1,
          ...example,
        });
      }
      setVaccines(vacs);
    };
    fetchData();
  }, []);

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
                  source={VaccineProofImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.nextDateDose}>
                {getNextDoseText(item.nextDateDose)}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          const fetchData = async () => {
            const example = {
              name: 'Vacina 3',
              dose: '1ª dose',
              date: new Date(),
              nextDateDose: new Date(),
            };
            const vacs = [];
            for (let i = 0; i < 4; i++) {
              vacs.push({
                id: i + 1 + vaccines.length,
                ...example,
              });
            }
            setVaccines([...vaccines, ...vacs]);
          };
          fetchData();
        }}
        ListFooterComponent={() => {
          return (
            <View style={styles.spinner}>
              <ActivityIndicator size="large" color="#3F92C5" />
            </View>
          );
        }}
      />
      <View style={styles.containerButton}>
        <Button
          color="#49B976"
          title="Nova vacina"
          onPress={() => {
            console.log('teste');
          }}
        />
      </View>
    </View>
  );
}

export default Home;
