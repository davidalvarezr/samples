import React, { Dispatch } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { incrementAction, decrementAction, resetAction, changeResetValAction, changeStepAction } from './actions/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Incrementer extends React.Component {

    render() {

        const { reset, decrement, increment, changeResetVal, changeStep }: any = this.props;       // Actions
        const { counter, theState, step, resetValue, resetValueDisp, stepDisp }: any = this.props; // Values

        return (
            <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >

                <Text style={styles.bigText}>Learn Redux</Text>

                <View style={styles.resetView}>
                    <TouchableOpacity style={[styles.greyBackground, styles.reset]}
                        onPress={() => reset(resetValue)}>
                        <Text style={styles.text}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.centered}>
                    <Text>Reset value : </Text>
                    <TextInput style={styles.textinput} placeholder="Reset value" value={resetValueDisp.toString()}
                        keyboardType="numeric" onChangeText={ text => changeResetVal(parseInt(text))} />
                    <Text>Step : </Text>
                    <TextInput style={styles.textinput} placeholder="Step" value={stepDisp}
                        keyboardType="numeric" onChangeText={ text => changeStep(text)} />

                    <View style={styles.incrementer}>
                        <TouchableOpacity style={[styles.squareCentered, styles.greyBackground]}
                            onPress={() => decrement(step)}>
                            <Text style={styles.text}>-</Text>
                        </TouchableOpacity>

                        <View style={styles.squareCentered}>
                            <Text style={styles.text}>{counter}</Text>
                        </View>

                        <TouchableOpacity style={[styles.squareCentered, styles.greyBackground]}
                            onPress={() => increment(step)}>
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.stateStyle}>
                    <Text>
                        {JSON.stringify(theState)}
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

/**
 * Elements on the left represent the props of the component.
 * @param {*} state Redux state
 */
function mapStateToProps(state: ReduxState) {
    return {
        counter: state.counter,
        theState: state,
        step: state.step,
        stepDisp: state.stepDisp,
        resetValue: state.resetValue,
        resetValueDisp: state.resetValueDisp,
    };
}

/**
 * Elements on the left represent the props (functions, this time) of the component
 * Element in dispatcher is an action (in ./actions/actions.js)
 * @param {*} dispatch
 */
function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        increment: (value: number) => dispatch(incrementAction(value)),
        decrement: (value: number) => dispatch(decrementAction(value)),
        reset: (value: number) => dispatch(resetAction(value)),
        changeResetVal: (value: number) => dispatch(changeResetValAction(value)),
        changeStep: (value: number) => dispatch(changeStepAction(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Incrementer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    contentContainer: {
        paddingTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    incrementer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    squareCentered: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    greyBackground: {
        backgroundColor: '#DDDDDD',
    },
    text: {
        fontSize: 20,
    },
    bigText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    centered: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stateStyle: {
        flex: 1,
    },
    reset: {
        padding: 10,
        margin: 10,
    },
    resetView: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    textinput: {
        width: 150,
    },
});
