export const START_GAME = 'START_GAME'

export const startGame = (data) => {
  return {
    type: START_GAME,
    data,
  }
}
