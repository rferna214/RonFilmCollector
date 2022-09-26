import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Actor = props => {

    const post = props.post;

    const onPress = () => {
        console.log(post.firstname + " " + post.lastname);
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 1}}>
                <Text style={styles.firstname}>
                    {post.firstName}
                </Text>
                <Text style={styles.lastname} >
                    {post.lastName}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Actor;