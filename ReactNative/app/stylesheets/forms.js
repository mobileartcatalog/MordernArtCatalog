import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    height: 700,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hamburger: { width: 44, height: 44, marginLeft: 20 },

  stackNav: {
    backgroundColor: 'whitesmoke'
  },

  button: {
    backgroundColor: 'orange',
    color: 'black',
    width: '50%'
  },

  container: {
    backgroundColor: 'whitesmoke',
    height: '100%'
  },

  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(119, 136, 153, 0.1)',
    borderColor: 'rgba(119, 136, 153, 0.25)',
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 20,
    paddingVertical: 30
  },

  navContainer: {
    flexDirection: 'row',
    margin: 10
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

  primaryButton: {
    backgroundColor: 'slategray',
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2
  },

  secondaryButton: {
    backgroundColor: 'transparent'
  },

  switch: {
    marginBottom: 20
  },

  title: {
    fontWeight: '700'
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
    textAlign: 'center',
    color: '#2b8c5f',
    fontSize: 30,
    fontWeight: '500'
  },

  bodyText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'left',
    margin: 10
  },
  h1: {
    color: 'slategray',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  },
  inputWrapper: { marginHorizontal: 20, marginVertical: 5 },

  errorMessage: {
    color: '#2b8c5f',
    marginVertical: 5
    // marginBottom: 6
  },
  formLabel: {
    fontSize: 16,
    color: 'slategray',
    marginBottom: 3
  }
});
