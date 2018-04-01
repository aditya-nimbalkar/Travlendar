import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import mainColor from './constants'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    addressColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    addressIcon: {
        color: mainColor,
        fontSize: 30,
    },
    homeAddressNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    homeAddressNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    homeAddressRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    workAddressText: {
        fontSize: 16,
    },
    workAddressNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    workAddressNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    workAddressRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    workAddressText: {
        fontSize: 16,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
})

const address = ({ containerStyle, onPressaddress, name, address, index }) => (
    <TouchableOpacity onPress={() => onPressaddress(address)}>
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconRow}>
                {+index === 0 && (
                    <Icon
                        name="address"
                        underlayColor="transparent"
                        iconStyle={styles.addressIcon}
                        onPress={() => onPressaddress()}
                    />
                )}
            </View>
            <View style={styles.addressRow}>
                <View style={styles.addressColumn}>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
                <View style={styles.addressNameColumn}>
                    {name.trim().length !== 0 && (
                        <Text style={styles.addressNameText}>{name}</Text>
                    )}
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

address.propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    address: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
    name: PropTypes.string,
    onPressaddress: PropTypes.func.isRequired,
}

address.defaultProps = {
    containerStyle: {},
    name: null,
}

export default address
