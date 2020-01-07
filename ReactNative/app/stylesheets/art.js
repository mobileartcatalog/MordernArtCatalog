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
    borderColor: 'green',
  },

  listItem: {
    borderWidth: 0,
  },

  title: {
    color: 'slategray',
    fontWeight: '700',
  },
  icon: {
    color: 'black',
    fontSize: 20,
    marginRight: 10,
  },

  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '33%',
    flexDirection: 'column',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    // alignItems: 'center',
    backgroundColor: 'whitesmoke',
    // backgroundColor: 'rgba(119, 136, 153, 0.1)',
    borderColor: 'rgba(119, 136, 153, 0.25)',
    // borderWidth: 1,
    borderRadius: 5,
    // margin: 20,
    paddingVertical: 10,
  },

  artworkBackground: {
    backgroundColor: '#f1f1f1',
  },

  artworkContainer: {
    // display: flex;
    // flex-direction: column;
    // overflow: hidden;
    // justify-content: space-between;

    backgroundColor: '#FFF',
    borderColor: 'rgba(119, 136, 153, 0.25)',
    borderWidth: 0.5,
    borderRadius: 5,
    minWidth: 100,
    minHeight: 100,
    padding: '1%',
    margin: '1%',
  },

  row: {
    display: 'flex',
    flexWrap: 'wrap',
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
    color: 'slategray',
    fontSize: 16,
    fontWeight: '500',
  },

  bodyText: {
    color: 'slategray',
    fontSize: 15,
    fontWeight: '400',
  },

  imageCarousel: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },

  separator: {
    color: '#000',
  },

  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'whitesmoke',
    marginTop: 10,
    padding: 5,
  },

  listRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
});
