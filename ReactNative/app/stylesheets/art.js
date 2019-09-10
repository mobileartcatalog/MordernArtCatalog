import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  thumbnail: {
    height: 75,
    width: 75,
  },

  detailImage: {
    height: 400,
    width: 400,
  },

  selected: {
    borderWidth: 2,
    borderColor: 'red',
  },

  title: {
    fontWeight: '700',
  },
  icon: {
    color: 'black',
    fontSize: 20,
    marginRight: 10,
  },

  container: {
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // width: '33%',
    // flexDirection: 'column',
    // backgroundColor: 'lightgray',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  innerContainer: {
    // alignItems: 'center',
    backgroundColor: 'whitesmoke',
    // backgroundColor: 'rgba(119, 136, 153, 0.1)',
    borderColor: 'rgba(119, 136, 153, 0.25)',
    borderWidth: 0.5,
    // borderRadius: 8,
    // margin: 20,
    paddingVertical: 10,
  },

  row: {
    // flex: 1,
    flexWrap: 'wrap',
    // width: '100%',
    // flexDirection: 'row',
  },

  cardDivider: {
    color: 'orangered',
  },

  cardTitle: {
    color: 'orangered',
  },
  cardSubtitle: {
    color: 'orangered',
  },

  headlineText: {
    color: 'orangered',
    fontSize: 34,
    fontWeight: '500',
  },

  bodyText: {
    color: 'gray',
    fontSize: 24,
    fontWeight: '100',
  },
});
