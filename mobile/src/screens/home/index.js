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
import CardVaccine from '../../components/card';

function Home({navigation, vaccines, setVaccine}) {
  const [vaccineSearch, setVaccineSearch] = useState([]);
  const [textSearch, setTextSearch] = useState('');

  const onHandleEdit = id => {
    navigation.navigate('EditVaccine', {vaccineId: id});
  };

  const onHandleSearch = text => {
    setTextSearch(text);
    const filteredVaccines = vaccines.filter(vaccine => {
      return vaccine.name.toLowerCase().includes(text.toLowerCase());
    });
    setVaccineSearch(filteredVaccines);
  };

  useEffect(() => {
    onHandleSearch(textSearch);
  }, [vaccines]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTextSearch('');
      setVaccineSearch([]);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <ImageBackground
          source={SearchIcon}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          onChangeText={onHandleSearch}
          style={styles.searchInput}
          placeholder="PESQUISAR VACINA..."
          placeholderTextColor="#8B8B8B"
        />
      </View>
      <FlatList
        style={styles.list}
        // ListHeaderComponent={}
        data={vaccineSearch.length && !!textSearch ? vaccineSearch : vaccines}
        renderItem={({item}) => (
          <CardVaccine onHandleEdit={onHandleEdit} item={item} key={item.id} />
        )}
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
