const NumberGame = ({setShowGame, gameState, setGameState}) => {
    // Random Number Function
    return(
        <>
        <p>Guess Number</p>
         <input type="number" />
         <button onClick={() => setShowGame(false)}>Abschicken</button>
        </>
    )
}

export default NumberGame;