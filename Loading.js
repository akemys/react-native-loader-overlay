// @flow

import React from 'react'
import PropTypes from 'prop-types'
import {View, TouchableWithoutFeedback, ActivityIndicator, StyleSheet, Dimensions, Text} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader'

const {height, width} = Dimensions.get('window')

const LoadingType = {
    'Bubbles': Bubbles,
    'DoubleBounce': DoubleBounce,
    'Bars': Bars,
    'Pulse': Pulse,
    'Spinner': ActivityIndicator
}

class LoadingContainer extends React.Component {
    static propTypes = {
        closeOnTouch: PropTypes.bool,
        color: PropTypes.string,
        text: PropTypes.string,
        size: PropTypes.number,
        overlayColor: PropTypes.string,
        loadingType: PropTypes.oneOf(['Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'])
    }

    static defaultProps = {
        color: '#FFFFFF',
        size: 20,
        text: null,
        overlayColor: 'rgba(0,0,0,0.5)',
        closeOnTouch: false,
        loadingType: 'Bars'
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible
        }
    }

    componentDidMount = () => {
        if (this.state.visible) {
            this.show()
        }
    }

    componentWillUnmount = () => {
        this.close()
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.state.visible !== nextState.visible
    }

    show() {
        this.setState({visible: true})
    }

    close() {
        this.setState({visible: false})
        this.props.onClose && this.props.onClose()
    }

    render() {
        let {overlayColor, loadingType, size, color, text} = this.props
        if (loadingType === 'Spinner') {
            size = 'large'
        }
        const Loading = LoadingType[loadingType]
        return this.state.visible ? (
            <View style={[styles.modalWrapper, {backgroundColor: overlayColor}]}>
                <TouchableWithoutFeedback
                    onPress={() => this.props.closeOnTouch === true ? this.setState({visible: false}) : null}>
                    <View style={styles.modalUnderlay}/>
                </TouchableWithoutFeedback>
                <View style={styles.content}>
                    {text ? <Text style={styles.text}>
                        {text}
                    </Text> : null}
                    <Loading size={size} color={color}/>
                </View>
            </View>
        ) : null
    }
}

class Loading extends React.Component {
    static displayName = 'Loading';
    static propTypes = LoadingContainer.propTypes;

    static show = (options = {}) => {
        return new RootSiblings(<LoadingContainer
            {...options}
            visible
        />)
    };

    static hide = loading => {
        if (loading instanceof RootSiblings) {
            loading.destroy()
        } else {
            console.warn(`Loading.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof alert}\` instead.`)
        }
    };

    render() {
        return null
    }
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        position: 'absolute',
        width,
        height,
        left: 0,
        top: 0,
        backgroundColor: '#000',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalUnderlay: {
        position: 'absolute',
        width,
        height,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    text: {
      color: 'white',
      fontSize: 20,
      marginBottom: 30
    },
    content: {}
})

export {
    RootSiblings as Manager
}
export default Loading
