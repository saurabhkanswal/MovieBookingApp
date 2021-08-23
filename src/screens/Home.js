import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width: screenWidth} = Dimensions.get('window');
import Icons from 'react-native-vector-icons/MaterialIcons';
// API SERVICES
import {
  getNewReleasedMovies,
  getpopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
} from '../action/getMovies';
//
import {connect} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MovieListContainer from '../components/MovieListContainer';
// Screens
// import MovieDetail from './MovieDetail';
import {NavigationContainer} from '@react-navigation/native';

const carouselItems = [
  {
    id: 1,
    image: 'http://pokerlogia.com/wp-content/uploads/joker-4.jpg',
  },
  {
    id: 2,
    image:
      'https://theprimetime.in/wp-content/uploads/2020/12/The-first-look-poster-of-Sarpatta-Parambarai-released-768x432.jpg',
  },
  {
    id: 3,
    image:
      'https://sunraycinema.com/wp-content/uploads/2021/02/ddy7ptk-e2cbec0e-45df-4709-8f06-e5d3eca07b1c.png',
  },
  {
    id: 4,
    image:
      'https://cdn.mos.cms.futurecdn.net/wJ4s9FFL6FdxAoKixtr4FS-970-80.jpg.webp',
  },
];

const Home = ({
  getNewReleasedMovies,
  movieState,
  getpopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  navigation,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('POPULAR');
  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    getNewReleasedMovies();
    await getpopularMovies();
    setDATA([...movieState.popularMovies]);
    // setLoading(false);
  }, []);

  useEffect(async () => {
    if (activeSection === 'NOW PLAYING') {
      // setLoading(true);
      if (movieState.nowPlayingMovies === null) {
        await getNowPlayingMovies();
      }
      setDATA(movieState.nowPlayingMovies);
      // setLoading(false);
    } else if (activeSection === 'TOP RATED') {
      // setLoading(true);
      if (movieState.topRatedMovies === null) {
        await getTopRatedMovies();
      }

      setDATA([...movieState.topRatedMovies]);
      // setLoading(false);
    } else {
      // setLoading(true);
      setDATA([...movieState.popularMovies]);
      // setLoading(false);
    }
  }, [activeSection]);

  const renderCarousel = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: item.image}}
        resizeMode="contain"
        style={styles.Banneritem}>
        <View style={styles.buyTicket}>
          <Icons name="theaters" size={15} color="black" />
          <Text style={styles.buyTicketText}> BUY TICKET</Text>
        </View>
      </ImageBackground>
    );
  };

  const renderMovie = ({item}) => (
    <View>
      <MovieListContainer
        title={item.title}
        vote_average={item.vote_average}
        release_date={item.release_date}
        overView={item.overview}
        poster_path={item.poster_path}
        key={item.id}
      />
    </View>
  );

  const changeSection = ({sectionName}) => {
    setActiveSection(sectionName);
  };

  const releasedMovies = movieState.newReleasedMovies?.slice(0, 5);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA && DATA}
        renderItem={renderMovie}
        extraData={DATA}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <View style={styles.containerTop}>
              <View style={[styles.header, styles.marginSpace]}>
                <Text style={styles.headerText}>MOVIE </Text>
                <Text style={[styles.headerText, styles.makeTextYellow]}>
                  PREMIER
                </Text>
              </View>
              <View>
                <Carousel
                  // ref={(c) => { this._carousel = c; }}
                  data={carouselItems}
                  renderItem={renderCarousel}
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  // layout={'default'}
                  itemWidth={screenWidth}
                  onSnapToItem={index => setActiveSlide(index)}
                />
                <Pagination
                  dotsLength={carouselItems.length}
                  activeDotIndex={activeSlide}
                  containerStyle={{paddingVertical: 15}}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#edb413',
                  }}
                  inactiveDotStyle={{
                    backgroundColor: '#FFFFFF',
                  }}
                  inactiveDotOpacity={1}
                  inactiveDotScale={0.8}
                />
              </View>
              <View style={[styles.spacebetween, styles.marginSpace]}>
                <View style={styles.header}>
                  <Icons
                    name="local-fire-department"
                    size={22}
                    color="#edb413"
                  />
                  <Text style={styles.headingText}> NEW RELEASED</Text>
                </View>
                <Text
                  style={styles.actionText}
                  onPress={() => navigation.navigate('AllMovieList')}>
                  See All
                </Text>
              </View>
              <View style={styles.marginSpace}>
                {releasedMovies === undefined ? (
                  <SkeletonPlaceholder
                    backgroundColor="#384454"
                    highlightColor="#758294">
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: wp('30%'),
                          height: hp('20%'),
                          marginRight: 18,
                        }}></View>
                      <View
                        style={{
                          width: wp('30%'),
                          height: hp('20%'),
                          marginRight: 18,
                        }}></View>
                      <View
                        style={{width: wp('30%'), height: hp('20%')}}></View>
                    </View>
                  </SkeletonPlaceholder>
                ) : (
                  <ScrollView
                    horizontal
                    style={{
                      height: hp('20%'),
                      width: wp('100%'),

                      // backgroundColor: 'red',
                      marginRight: 10,
                    }}>
                    {releasedMovies.map((item, index) => (
                      <Pressable
                        style={{marginRight: 18}}
                        key={item.id}
                        onPress={() =>
                          navigation.navigate('MovieDetail', {
                            index,
                            movieType: 'newReleasedMovies',
                          })
                        }>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w154${item.poster_path}`,
                          }}
                          style={{width: wp('30%'), height: hp('20%')}}
                        />
                      </Pressable>
                    ))}
                  </ScrollView>
                )}
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Pressable
                style={styles.eachSection}
                onPress={() =>
                  changeSection({
                    sectionName: 'POPULAR',
                  })
                }>
                <Text
                  style={[
                    styles.sectionText,
                    activeSection === 'POPULAR' && styles.activeSectionText,
                  ]}>
                  POPULAR
                </Text>
              </Pressable>
              <Pressable
                style={styles.eachSection}
                onPress={() =>
                  changeSection({
                    sectionName: 'NOW PLAYING',
                  })
                }>
                <Text
                  style={[
                    styles.sectionText,
                    activeSection === 'NOW PLAYING' && styles.activeSectionText,
                  ]}>
                  NOW PLAYING
                </Text>
              </Pressable>
              <Pressable
                style={styles.eachSection}
                onPress={() =>
                  changeSection({
                    sectionName: 'TOP RATED',
                  })
                }>
                <Text
                  style={[
                    styles.sectionText,
                    activeSection === 'TOP RATED' && styles.activeSectionText,
                  ]}>
                  TOP RATED
                </Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181828',
    flex: 1,
  },
  containerTop: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 27,
    fontWeight: '700',
    fontFamily: 'sans-serif-condensed',
  },
  headingText: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },
  makeTextYellow: {
    color: '#edb413',
  },
  Banneritem: {
    width: screenWidth - 30,
    height: hp('25%'),
    backgroundColor: '#262f3b',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },

  buyTicket: {
    height: hp('3%'),
    width: wp('22%'),
    backgroundColor: '#edb413',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyTicketText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 12,
  },
  spacebetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 15,
    color: '#edb413',
  },
  sectionContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: '#384454',
  },
  eachSection: {
    width: wp('33.3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B2ADA2',
  },
  activeSectionText: {
    borderBottomWidth: 2,
    color: '#edb413',
    borderBottomColor: '#edb413',
  },
  marginSpace: {
    marginBottom: 14,
  },
});

const mapDispatchToProps = {
  getNewReleasedMovies,
  getpopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
};

const mapStateToProps = state => {
  const {movie} = state;
  return {
    movieState: movie,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
