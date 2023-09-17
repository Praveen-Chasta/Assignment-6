import {Component} from 'react'

import {RiCloseLine} from 'react-icons/ri'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import GameOptions from '../GameOptions'

import {
  MainHeading,
  AppContainer,
  ResultContainer,
  OptionsContainer,
  Option,
  ScoreContainer,
  ScorePhrase,
  ScoreNumber,
  GameViewContainer,
  GameOptionsList,
  PopupContainer,
  TriggerButton,
  CloseButton,
  PopUpImage,
  PopUpBody,
  GameResultViewContainer,
  SelectedOptionsContainer,
  GameUserOptionContainer,
  GameParticipantText,
  GameParticipantChoiceImage,
  ResultText,
  PlayAgainButton,
} from './styledComponent'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    gameStatus: gameStatusConstants.inProgress,
    userInput: '',
    gameInput: '',
    score: 0,
  }

  onClickUserChoice = id => {
    this.setState(
      {
        userInput: id,
        gameInput: this.getGameChoice(),
      },
      this.evaluateGame,
    )
  }

  onClickGoToGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoicesList = choicesList.map(choices => choices.id)
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return gameChoicesList[randomIndex]
  }

  evaluateGame = () => {
    const {userInput, gameInput} = this.state

    if (userInput === gameInput) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (userInput === 'ROCK') {
      if (gameInput === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userInput === 'PAPER') {
      if (gameInput === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userInput === 'SCISSORS') {
      if (gameInput === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderInProgressView = () => {
    const {choicesList} = this.props
    return (
      <GameOptionsList>
        {choicesList.map(eachItem => (
          <GameOptions
            key={eachItem.id}
            optionsDetails={eachItem}
            onClickUserChoice={this.onClickUserChoice}
          />
        ))}
      </GameOptionsList>
    )
  }

  renderGameWonView = () => {
    const {userInput, gameInput} = this.state
    const {choicesList} = this.props
    const userChoiceObjectList = choicesList.filter(
      choice => choice.id === userInput,
    )
    const userChoiceObject = userChoiceObjectList[0]
    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameInput,
    )
    const gameChoiceObject = gameChoiceObjectList[0]

    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>YOU</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>OPPONENT</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText>YOU WON</ResultText>
        <PlayAgainButton type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </PlayAgainButton>
      </GameResultViewContainer>
    )
  }

  renderGameLostView = () => {
    const {userInput, gameInput} = this.state
    const {choicesList} = this.props
    const userChoiceObjectList = choicesList.filter(
      choice => choice.id === userInput,
    )
    const userChoiceObject = userChoiceObjectList[0]
    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameInput,
    )
    const gameChoiceObject = gameChoiceObjectList[0]

    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>YOU</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>OPPONENT</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText>YOU LOSE</ResultText>
        <PlayAgainButton type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </PlayAgainButton>
      </GameResultViewContainer>
    )
  }

  renderGameDrawView = () => {
    const {userInput, gameInput} = this.state
    const {choicesList} = this.props
    const userChoiceObjectList = choicesList.filter(
      choice => choice.id === userInput,
    )
    const userChoiceObject = userChoiceObjectList[0]
    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameInput,
    )
    const gameChoiceObject = gameChoiceObjectList[0]

    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>YOU</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>OPPONENT</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText>IT IS DRAW</ResultText>
        <PlayAgainButton type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </PlayAgainButton>
      </GameResultViewContainer>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderInProgressView()
      case gameStatusConstants.win:
        return this.renderGameWonView()
      case gameStatusConstants.lost:
        return this.renderGameLostView()
      case gameStatusConstants.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state

    return (
      <AppContainer>
        <MainHeading>Rock Paper Scissors</MainHeading>
        <ResultContainer>
          <OptionsContainer>
            <Option>
              ROCK
              <br />
              <br />
              PAPER
              <br />
              <br />
              SCISSOR
            </Option>
          </OptionsContainer>
          <ScoreContainer>
            <ScorePhrase>Score</ScorePhrase>
            <ScoreNumber>{score}</ScoreNumber>
          </ScoreContainer>
        </ResultContainer>
        <GameViewContainer>{this.renderGameView()}</GameViewContainer>
        <PopupContainer>
          <Popup
            modal
            trigger={<TriggerButton type="button">Rules</TriggerButton>}
            closeOnEscape
            window
          >
            {close => (
              <PopUpBody>
                <PopUpImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
                <CloseButton type="button" onClick={() => close()}>
                  <RiCloseLine />
                </CloseButton>
              </PopUpBody>
            )}
          </Popup>
        </PopupContainer>
      </AppContainer>
    )
  }
}

export default RockPaperScissors
