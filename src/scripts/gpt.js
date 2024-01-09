// ... (seu código anterior)

function endGame() {
    playSound("failure");
    setTimeout(() => {
        alert("Game over! Suas vidas acabaram :-(\nYour score: " + state.values.result + "\nRecarregue a página para começar novamente!");
    }, 500); // Ajuste o tempo de espera conforme necessário
}

// ... (seu código posterior)
