// Comprehensive Story Data with Detailed Class Paths
const storyData = {
    warrior: {
        start: {
            text: "As a Warrior, you stand at a critical crossroads. The path ahead splits into two treacherous routes: a dark cave and a narrow mountain pass.",
            choices: [
                { text: "Enter the Dark Cave", nextScene: "cave" },
                { text: "Take the Mountain Pass", nextScene: "mountain" }
            ]
        },
        cave: {
            text: "The cave is pitch black. A menacing growl echoes through the cavern. A monstrous beast blocks your path.",
            choices: [
                { text: "Fight the Beast", nextScene: "caveFight" }, // Fixed hyphen issue
                { text: "Sneak Past", nextScene: "caveSneak" }
            ]
        },
        caveFight: {
            text: "You engage in a fierce battle with the monstrous beast. It lunges at you with razor-sharp claws.",
            choices: [
                { 
                    text: "Dodge and Counterattack", 
                    nextScene: "escape1",  // 🔥 Fix: Leads to mountain scene  
                    consequence: "With swift reflexes, you dodge the beast's attack and strike it down! You earn *Legendary Armor*!",
                   
                },
                { 
                    text: "Block with Your Shield", 
                    nextScene: "defeat",
                    consequence: "The beast overpowers you, crushing your shield. You are gravely wounded.",
                    gameOver: true
                }
            ]
        },
        
        caveSneak: {
            text: "You attempt to sneak past the beast. Every step is carefully placed, but suddenly, you stumble on loose stones.",
            choices: [
                { text: "Run for It!", nextScene: "escape", consequence: "You barely escape, but in the chaos, you *lose your sword*!" },
                { text: "Try to Remain Silent", nextScene: "death", consequence: "The beast notices you. It attacks before you can react.", gameOver: true }
            ]
        },
        escape: {
            text: "You sprint away from the beast, barely escaping with your life. But in the chaos, your sword is lost.",
            choices: [
                { text: "Continue Forward", nextScene: "mountain", consequence: "You press on without your sword, hoping to find another weapon." }
            ]
        },
        escape1: {
            text: "You have successfully defeated the beast, barely escaping with your life. But in the chaos, you earned a *Legendary Armor*!",
            choices: [
                { text: "Continue Forward", nextScene: "mountain", consequence: "You press on without your sword, hoping to find another weapon." }
            ]
        },
        mountain: {
            text: "The mountain path is treacherous. A massive ledge stands before you, promising certain death if you make the wrong choice.",
            choices: [
                { 
                    text: "Jump to the Ledge", 
                    nextScene: "mountain-jump",
                    consequence: "Your agile leap saves your life! You narrowly escape certain doom."
                },
                { 
                    text: "Brace for Impact", 
                    nextScene: "mountain-death",
                    consequence: "Your hesitation proves fatal. The mountain claims your life.",
                    gameOver: true
                }
            ]
        },
        
        "mountain-jump": {
            text: "With a powerful leap, you barely grasp the ledge. Pulling yourself up, you see the path forward.",
            choices: [
                { 
                    text: "Continue Climbing", 
                    nextScene: "finalBattle", 
                    consequence: "You reach the mountain peak, where your final challenge awaits."
                }
            ]
        },
        
        
        finalBattle: {
            text: "The legendary warlord stands before you. This is the moment that will define your warrior's legacy.",
            choices: [
                { text: "Challenge the Warlord Directly", nextScene: "battleDirect", consequence: "Your courage and skill prevail! You defeat the warlord and become a true legend of the land.", victory: true },
                { text: "Set a Cunning Trap", nextScene: "battleTrap", consequence: "Your trap fails. You are captured by the warlord's forces.", gameOver: true }
            ]
        }
    },
    mage: {
        start: {
            text: "Ancient temple ruins surround you. Mystical energy crackles in the air. Two paths of arcane knowledge beckon: a forbidden library and a mysterious altar.",
            choices: [
                { text: "Explore the Library", nextScene: "library" },
                { text: "Approach the Altar", nextScene: "altar" }
            ]
        },
        library: {
            text: "Forbidden spellbooks line the shelves. Dark magic pulses within their pages.",
            choices: [
                { text: "Read the Spellbook", nextScene: "fireSpell", consequence: "You unlock a powerful Fire Spell, gaining immense magical knowledge!" },
                { text: "Destroy the Spellbook", nextScene: "libraryDestroy", consequence: "You prevent dark magic from spreading, but gain no magical advantage." }
            ]
        },
        fireSpell: {
            text: "The Fire Spell burns within you. Its power demands a choice: will you use it for good or evil?",
            choices: [
                { text: "Use the Spell for Good", nextScene: "spellGood", consequence: "Your noble spirit prevails. You become the Guardian of the Land, protecting the realm with your magical powers.", victory: true },
                { text: "Embrace the Spell's Dark Power", nextScene: "spellEvil", consequence: "The dark magic consumes you. Your soul is lost to the spell's corrupting influence.", gameOver: true }
            ]
        }
    }
};


// Game State Management
const gameState = {
    currentClass: null,
    currentScene: null,
    playerChoices: [],
    consequences: []
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const storyText = document.getElementById('story-text');
const choiceContainer = document.getElementById('choice-container');
const gameImage = document.getElementById('game-image');
const gameOverTitle = document.getElementById('game-over-title');
const gameOverMessage = document.getElementById('game-over-message');

// Update Scene Function
function updateScene(playerClass, sceneName) {
    try {
        console.log(Updating scene: ${playerClass} - ${sceneName});

        // Get current scene data
        const scene = storyData[playerClass][sceneName];

        if (!scene) {
            throw new Error(Scene not found: ${playerClass} - ${sceneName});
        }

        // Update story text
        storyText.textContent = scene.text;

        // Clear previous choices
        choiceContainer.innerHTML = '';

        // Create choice buttons
        scene.choices.forEach(choice => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice.text;
            
            choiceButton.addEventListener('click', () => {
                // Store player's choice
                gameState.playerChoices.push(choice.text);

                // Store consequence if exists
                if (choice.consequence) {
                    gameState.consequences.push(choice.consequence);
                }

                // Check for game-ending scenes
                if (choice.gameOver) {
                    endGame(false, choice.consequence);
                    return;
                }

                // Check for victory scenes
                if (choice.victory) {
                    endGame(true, choice.consequence);
                    return;
                }

                // Update to next scene
                updateScene(playerClass, choice.nextScene);
            });

            choiceContainer.appendChild(choiceButton);
        });

    } catch (error) {
        console.error("Scene Update Error:", error);
    }
}

// End Game Function
function endGame(isVictory, message) {
    // Hide game screen
    gameScreen.classList.add('hidden');
    
    // Show game over screen
    gameOverScreen.classList.remove('hidden');
    
    // Set game over title and message
    gameOverTitle.textContent = isVictory ? "Victory!" : "Game Over";
    gameOverMessage.textContent = message;
}

// Class Selection
document.querySelectorAll('.class-select').forEach(button => {
    button.addEventListener('click', (e) => {
        const playerClass = e.target.id.split('-')[0];
        
        // Start the game
        gameState.currentClass = playerClass;
        gameState.currentScene = 'start';
        
        // Hide start screen, show game screen
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Update first scene
        updateScene(playerClass, 'start');
    });
});

// Restart Game
document.getElementById('restart-btn').addEventListener('click', () => {
    // Hide game over screen, show start screen
    gameOverScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    
    // Reset game state
    gameState.currentClass = null;
    gameState.currentScene = null;
    gameState.playerChoices = [];
    gameState.consequences = [];
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log("Game initialized");
});

document.getElementById('home-btn').addEventListener('click', () => {
    // Hide game and game over screens
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Show the start screen
    startScreen.classList.remove('hidden');

    // Reset game state
    gameState.currentClass = null;
    gameState.currentScene = null;
    gameState.playerChoices = [];
    gameState.consequences = [];
});