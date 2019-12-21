const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 24;

const PAUSED = 0;
const RUNNING = 1;
const MENU = 2;
const GAMEOVER = 3; 
const WIN = 4;
const POWERUP_NUM_BALLS = 3;
const BALL_SIZE = 16; 
const BRICK_Y_OFFSET = 50;
const NUM_LIVES = 5;

let gameState = RUNNING;
let lives = NUM_LIVES;
let currentLevelIndex = 0;


