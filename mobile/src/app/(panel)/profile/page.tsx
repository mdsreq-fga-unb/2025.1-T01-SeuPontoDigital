import { View, Text, StyleSheet } from 'react-native';

export default function Profile(){
    return(
        <View style = {styles.container}>
            <Text>Pagina Profile</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});