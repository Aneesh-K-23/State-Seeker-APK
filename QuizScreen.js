import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import firebase from 'firebase';
import db from '../config';
import { Header, Icon, Avatar } from 'react-native-elements';

export default class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      previousScore: '',
      questionData: [],
      // Array to store question data
      selectedAnswers: {}, // Object to store selected answers for each question
    };
  }
  fetchUser = () => {
    let username;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        username = snapshot.val().username;
        bestQuizScore = snapshot.val().bestQuizScore;
        this.setState({ uname: username, previousScore: bestQuizScore });
      });
  };
  componentDidMount() {
    this.fetchQuizData();
    this.fetchUser();
  }

  fetchQuizData = async () => {
    try {
      firebase
        .database()
        .ref('/quizes/')
        .on('value', (snapshot) => {
          let statequestions = [];
          if (snapshot.val()) {
            //      console.log(snapshot.val())
            var statesData = snapshot.val();
            // console.log('statesData', statesData);
            for (var s in statesData) {
              const questions = statesData[s];
              //  console.log('questions', questions);
              const questionKeys = Object.keys(questions);
              const questionData = {
                questionText: questions.questions,
                options: [questions.options.op1, questions.options.op2],
                answer:
                  questions.answer === 'op2'
                    ? questions.options.op2
                    : questions.options.op1,
              };

              //       console.log('questionData', questionData);
              statequestions.push(questionData);
            }
          }
          this.setState({ questionData: statequestions });
          //console.log('statequestions', statequestions);
        });
    } catch (error) {
      console.error('Error fetching quiz data');
    }
  };

  handleRadioSelect = (questionIndex, value) => {
    this.setState((prevState) => ({
      selectedAnswers: {
        ...prevState.selectedAnswers,
        [questionIndex]: value, // Store selected answer for the corresponding question
      },
    }));
  };

  handleSubmit = () => {
    console.log('came here');
    // console.log("selectedAse :",this.state.selectedAnswers )
    // console.log("questino :",this.state.questionData )
    const { questionData, selectedAnswers } = this.state;
    let score = 0;

    questionData.forEach((question, index) => {
      const correctAnswer = question.answer;
      const selectedAnswer = selectedAnswers[index];
      console.log('selectedAse :', selectedAnswer);
      console.log('questino :', correctAnswer);
      if (selectedAnswer === correctAnswer) {
        score++;
      }
      console.log('score :', score);
    });
    if (this.state.previousScore < score) {
      var userRef = firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid);
      userRef.update({
        bestQuizScore: score,
      });
    }

    this.props.navigation.navigate('MyHome');
    Alert.alert('Result', `Your score: ${score} / ${questionData.length}`);
  };

  renderItem = ({ item, index }) => {};

  render() {
    const { questionData } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/statebg1.png')}
          style={{ width: '100%', height: '100%' }}>
          <Header
            leftComponent={
              <View>
                <Image
                  source={require('../assets/usa-logo.png')}
                  style={{
                    width: 35,
                    height: 35,
                  }}></Image>
              </View>
            }
            centerComponent={{
              text: 'Quiz',
              style: { color: '#1D82FF', fontSize: 23 },
            }}
            backgroundColor="#EBEBEB"
            rightComponent={
              <Avatar
                containerStyle={{
                  backgroundColor: '#1D82FF',
                  borderColor: 'white',
                  borderRadius: 55,
                }}
                rounded
                title={this.state.uname[0]}
                activeOpacity={0.7}
              />
            }
          />
            <ScrollView style={styles.container}>
              {questionData ? (
                questionData.map((question, questionIndex) => (
                  <View key={questionIndex}>
                    {/* Render question */}
                    <Text style={styles.questionText}>
                      {(questionIndex+1)+". "+question.questionText}
                    </Text>
                    <RadioForm style={styles.radioForm}>
                      {question.options.map((option, optionIndex) => (
                        <RadioButton labelHorizontal key={optionIndex}>
                          <RadioButtonInput
                            obj={{ label: option, value: option }}
                            index={optionIndex}
                            isSelected={
                              this.state.selectedAnswers[questionIndex] ===
                              option
                            }
                            onPress={() =>
                              this.handleRadioSelect(questionIndex, option)
                            }
                            borderWidth={1}
                            buttonInnerColor={'#2196f3'}
                            buttonOuterColor={'#2196f3'}
                            buttonSize={15}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginRight: 10 }}
                          />
                          <RadioButtonLabel
                            obj={{ label: option, value: option }}
                            index={optionIndex}
                            labelHorizontal
                            onPress={() =>
                              this.handleRadioSelect(questionIndex, option)
                            }
                            labelStyle={{ fontSize: 15, color: '#000' }}
                            labelWrapStyle={{}}
                          />
                        </RadioButton>
                      ))}
                    </RadioForm>
                  </View>
                ))
              ) : (
                <Text>No questions available</Text>
              )}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    padding: 20,
   backgroundColor:'#EBEBEB'
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
