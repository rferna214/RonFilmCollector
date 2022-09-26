import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import Actor from '../../components/Actor';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

import { openDatabase } from "react-native-sqlite-storage";

const filmCollectorDB = openDatabase({name: 'filmCollector.db'});
const actorsTableName = 'actors';

const ActorsScreen = props => {

  const navigation = useNavigation();

  const [actors, setActors] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      
      let results = [];
      // declare a transaction that will execute the SELECT
      filmCollectorDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${actorsTableName}`,
          [],
          // callback function to handle the results from the SELECT
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of actors ' + len);
            // if more than one row was returned
            if (len > 0){
              // loop through the rows
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto the results array
                let actor = res.rows.actor(i);
                results.push({
                  id: actor.id,
                  firstName: actor.firstName,
                  lastName: actor.lastName,
                });
              }
              // assign results array to lists state variable
              setActors(results);
            } else {
              // if no rows of data were returned,
              // set lists state variable to an empty array
              setActors([]);
            }
          },
          error => {
            console.log('Error getting Actors ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
        data={actors}
        renderItem={({actor}) => <Actor post={actor} />}
        keyExtractor={actor => actor.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Add Actor')}>
                <Text style={styles.buttonText}>Add Actor</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ActorsScreen;