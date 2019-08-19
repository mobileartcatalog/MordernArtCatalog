import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    height: 700,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hamburger: { width: 44, height: 44, marginLeft: 20 },

  button: {
    backgroundColor: 'orange',
    color: 'black',
    width: '50%'
  },

  container: {
    backgroundColor: 'rgba(119, 136, 153, 0.35)',
    // backgroundColor: '#afd9e3',
    height: '100%',
    justifyContent: 'center',
    marginBottom: 10
  },

  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(119, 136, 153, 0.1)',
    borderColor: 'rgba(119, 136, 153, 0.25)',
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 20,
    paddingVertical: 30,
    marginBottom: 40
  },

  horizontalLabel: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10
  },

  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  inputContainer: {
    width: '80%',
    height: 40,
    backgroundColor: 'whitesmoke',
    // marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray'
  },

  inputText: {
    borderBottomWidth: 0
  },

  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 10
  },

  checkboxInput: {
    backgroundColor: 'transparent'
  },

  primaryButton: {
    backgroundColor: 'slategray',
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 20
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.6,
    // shadowRadius: 2
  },

  secondaryButton: {
    backgroundColor: 'transparent'
  },

  Disable: {
    backgroundColor: 'gray',
    borderColor: 'transparent',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 60,
    paddingHorizontal: 20
  },

  buttonText: {
    color: 'slategray'
  },

  icon: {
    color: 'slategray',
    fontSize: 20,
    marginRight: 10
  },

  headlineText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500'
  },

  bodyText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '100'
  },
  h1: {
    color: 'gray',
    fontSize: 20,
    marginBottom: 10
  },
  inputWrapper: { marginHorizontal: 20, marginVertical: 5 },

  errorMessage: {
    color: '#f06102',
    marginTop: 2,
    marginBottom: 6

  },
  formLabel: {
    fontSize: 16,
    color: 'slategray',
    marginBottom: 3
  }
});
