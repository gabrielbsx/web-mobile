import React, {useEffect, useState} from 'react';
import {Button, FlatList, View} from 'react-native';
import styles from './styles';
import CardNextVaccine from '../../components/cardNextVaccine';

function NextVaccines({navigation, vaccines, setVaccine}) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        // ListHeaderComponent={}
        data={vaccines}
        renderItem={({item}) => <CardNextVaccine item={item} key={item.id} />}
        keyExtractor={item => item.id}
        numColumns={1}
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

export default NextVaccines;
