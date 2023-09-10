import {OptionImage, OptionListItem, GameOptionButton} from './styledComponent'

const GameOptions = props => {
  const {optionsDetails, onClickUserChoice} = props
  const {imageUrl, id} = optionsDetails

  const userChoice = () => {
    onClickUserChoice(id)
  }

  return (
    <OptionListItem>
      <GameOptionButton
        type="button"
        onClick={userChoice}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <OptionImage src={imageUrl} alt={id} />
      </GameOptionButton>
    </OptionListItem>
  )
}

export default GameOptions
