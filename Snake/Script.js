var FIELD_SIZE_X = 40;//строки
var FIELD_SIZE_Y = 40;//столбцы
var SNAKE_SPEED = 100;//интервал между перемещениями змейки
var snake = [];//Сама змейка
var direction = 'y+';// Направление движения змеи
var gameIsRunning = false;// запущена ли игра
var snake_timer;//Таймер змейки
var food_timer;//таймер еды
var score = 0;// Результат

function init() {
    prepareGameField(); //Генерация поля

    var wrap = document.getElementsByClassName('wrap')[0];

    wrap.style.width = '800px';
    //события кнопок старт и новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    //Отслеживание клавиш клавиатуры
    addEventListener("keydown", changeDirection);
}



//функция генерации игрового поля

function prepareGameField(){
    // создаем таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    //генерация ячеек игрового поля
    for (i = 0; i < FIELD_SIZE_X; i++){
        //создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (j = 0; j < FIELD_SIZE_Y; j++){
            //создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // добавление ячейки
        }
        game_table.appendChild(row); //добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); //добавление таблицы
}



//старт игры

function startGame() {
    gameIsRunning = true;
    respawn();

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 3000);
}

//функция расположения змейки на игровом поле

function respawn() {
    //змейка массив td
    //стартовая длина змейки = 2

    //respawn змейки из центра
    var start_cord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_cord_y = Math.floor(FIELD_SIZE_Y / 2);

    //голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_cord_y + '-' + start_cord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + 'snake-unit');

    var snake_tail = document.getElementsByClassName('cell-' + (start_cord_y - 1) + '-' + start_cord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + 'snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}



//Движение змейки

function move() {
    //console.log('move', direction);
    //Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    var new_unit;
    var snake_cords = snake_head_classes[1].split('-');
    var cord_y = parseInt(snake_cords[1]);
    var cord_x = parseInt(snake_cords[2]);

    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y) + '-' + (cord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y) + '-' + (cord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y - 1) + '-' + (cord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y + 1) + '-' + (cord_x))[0];
    }

    //Проверка
    //1) new_unit не часть змейки
    //2) Змемйка не ушла за границу поля
    //console.log(new_unit);
    if (!isSnakeUnit(new_unit) && new_unit !== undefined) {
        //добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        //Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');

            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}                                                                  
 */
function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check
}
/**
 * Проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    //Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();

        score++;
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;

    while (!foodCreated) {
        //Рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        //Проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) {
            var classes = '';
            for (i = 0; i < food_cell_classes.length; i++){
                classes += food_cell_classes[i] + ' ';
            }
        
            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}

/**
 * изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
    switch (e.keyCode) {
        case 37://Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38://клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39:// клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40:// клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert(`Вы проиграли! Ваш результат:${score}`);
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

//Инициализация
window.onload = init;