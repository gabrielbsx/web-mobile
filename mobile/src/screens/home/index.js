import React, {useEffect, useState} from 'react';
import {Button, FlatList, ImageBackground, TextInput, View} from 'react-native';
import styles from './styles';
import {app, auth, db} from '../../services/firebase';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import SearchIcon from '../../assets/images/icon-search.png';
import CardVaccine from '../../components/card';
import {useDispatch, useSelector} from 'react-redux';
import {reducerSetVaccine} from '../../hooks/vaccine-slice';

function Home({navigation}) {
  const [vaccineSearch, setVaccineSearch] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [vaccines, setVaccine] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onHandleEdit = id => {
    dispatch(reducerSetVaccine({id}));
    navigation.navigate('EditVaccine');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccines]);

  useEffect(() => {
    const q = query(collection(db, 'vaccines'), where('userId', '==', user.id));
    const unsubscribe = onSnapshot(q, snapshot => {
      const vaccines = [];
      snapshot.forEach(doc => {
        const vaccine = doc.data();
        vaccines.push({
          ...doc.data(),
          id: doc.id,
          date: vaccine.date?.toDate(),
          nextDateDose: vaccine.nextDateDose?.toDate(),
        });
      });
      setVaccine(vaccines);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
