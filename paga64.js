const FPS = 24.0;

const WIDTH = 64;
const HEIGHT = 64;
const OFFSET = 8;

const TILE_SIZE = 4;
const MAP_WIDTH = 16;
const MAP_HEIGHT = 12;

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_A = 65;
const KEY_R = 82;
const KEY_X = 88;
const KEY_Z = 90;

const DXS = [0, 1, 0, -1];
const DYS = [1, 0, -1, 0];

/*
 * Map key:
 *  0 = blocked
 *  1 = open
 *  2 = player
 *  3 = boulder
 *  4 = key
 *  5 = snake
 *  7 = door
 *  8 = cobwebs
 *  9 = diamond
 *  10 = hidden diamond
 *  11 = water
 *  12 = spikes
 *  13 = spider, turn left, start north
 *  14 = spider, turn left, start east
 *  15 = spider, turn left, start south
 *  16 = spider, turn left, start west
 *  17 = spider, turn right, start north
 *  18 = spider, turn right, start east
 *  19 = spider, turn right, start south
 *  20 = spider, turn right, start west
 *  21 = pipe, horizontal
 *  22 = pipe, vertical
 *  23 = pipe, west/south
 *  24 = pipe, west/north
 *  25 = pipe, north/east
 *  26 = pipe, south/east
 *  30 = slab
 *  31 = slab trigger
 *  40 = lightswitch
 *  50+ = teleports (number is teleport ID)
 */

const ROOMS = [
    // Room 1
    [
        [ 0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 22,  0],
        [ 0,  0,  2,  0,  0,  0,  0,  1, 11, 11, 21, 23,  0,  0, 22,  0],
        [ 0,  0,  1,  0,  0,  0,  0,  1, 11, 11,  0, 25, 21, 21, 24,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  8,  8,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  8,  8,  1,  1,  1,  9,  9,  0],
        [ 0,  1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 26, 21, 21],
        [ 0,  1,  1,  1,  1,  1,  5,  0,  0,  0,  0,  0,  0, 22,  0,  0],
        [ 0,  1,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  0, 25, 21, 23],
        [ 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 22],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0, 22],
        [ 0, 10, 10,  0,  4,  1,  1,  1,  1,  1,  1,  9,  9,  9,  0, 22],
        [ 0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0, 25]
    ],
    // Room 2
    [
        [ 0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  0,  1,  0,  1,  4,  1,  1,  4,  1,  0,  1,  0,  1,  0],
        [ 0,  1,  0, 13,  0,  1,  1,  1,  1,  1,  1,  0, 13,  0,  1,  0],
        [ 0,  1,  0,  9,  0,  1,  0,  9,  9,  0,  1,  0,  9,  0,  1,  0],
        [ 0,  1,  0,  0,  0,  1,  0,  9,  9,  0,  1,  0,  0,  0,  1,  0],
        [ 0,  1,  0,  0,  0,  1,  0,  9,  9,  0,  1,  0,  0,  0,  1,  0],
        [ 0,  1,  0,  9,  0,  1,  0,  9,  9,  0,  1,  0,  9,  0,  1,  0],
        [ 0,  1,  0, 15,  0,  1,  1,  1,  1,  1,  1,  0, 15,  0,  1,  0],
        [ 0,  1,  0,  1,  0,  1,  4,  1,  1,  4,  1,  0,  1,  0,  1,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 3
    [
        [ 0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 10,  0,  0,  0],
        [ 0,  1,  0,  1,  3,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0],
        [ 0,  1,  0,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  5,  0],
        [ 0,  1,  0,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  0,  0,  5,  1,  1,  1,  1,  4,  1,  1,  1,  3,  1,  0],
        [ 0,  1,  0,  0,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  0,  1,  3,  1,  1,  4,  1,  1,  1,  1,  1,  1,  5,  0],
        [ 0,  1,  0,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  0,  0,  0],
        [ 0,  1,  0,  1,  1,  1, 11, 11,  1,  1,  1,  0,  0,  0,  0,  0],
        [ 2,  1,  0, 11, 11, 11, 11, 11, 21, 23,  1, 26, 21, 23,  0,  0],
        [ 0, 11, 11, 11, 11, 11, 11, 11,  0, 25, 21, 24,  1, 25, 21, 21]
    ],
    // Room 4
    [
        [22,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0],
        [25, 11,  0,  1,  1,  1,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0],
        [11, 11,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [11, 11,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  1,  3,  1,  1,  9,  9,  9,  9,  9,  9,  1,  1,  0],
        [ 0,  0,  0, 10,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1, 15,  0],
        [ 0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 1,  1,  3,  3,  1,  1,  1,  9,  9,  9,  9,  9,  9,  1,  1,  0],
        [ 0,  1,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,  7],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 5
    [
        [ 0,  7,  0,  0, 25, 21, 21, 21, 21, 21, 21, 11, 11, 21, 21, 23],
        [ 0,  4, 11, 11,  1,  1,  1,  1,  1,  3,  1, 11, 11,  4,  4, 22],
        [ 0,  0, 11, 11,  1,  1,  0,  0,  1,  3,  1, 11, 11,  8,  8, 22],
        [ 0,  4, 11, 11,  9,  1, 14,  1,  1,  1,  1, 11, 11,  8,  8, 22],
        [ 0,  1, 25, 21, 21,  8, 21, 21, 21, 23,  1,  1,  1,  8,  8, 22],
        [ 0,  1,  0,  1,  1,  1,  1,  1,  1, 22, 26, 21, 21, 21, 21, 24],
        [ 0,  1,  1,  1,  0,  0,  0,  0,  1, 25, 24,  8,  8, 11, 11,  0],
        [ 0,  1, 26, 23,  0, 11, 11,  0,  1,  1,  1,  1,  3, 11, 11,  0],
        [ 2,  1, 22, 25, 21, 11, 11,  0,  1, 26, 23,  1,  1, 11, 21, 23],
        [26, 21, 24,  4,  0,  0,  0,  0,  8, 22, 25, 21,  1,  1,  9, 22],
        [22,  1,  1,  1, 18,  1,  1,  1,  1, 22,  1,  1,  1,  1,  9, 22],
        [25, 21, 21, 21, 21, 21, 21, 21, 21, 24, 26, 21, 21, 21, 21, 24]
    ],
    // Room 6
    [
        [ 0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1,  4,  3,  3,  2,  3,  3,  1,  3,  1,  1,  4,  0],
        [ 0,  1,  3,  1,  3,  1,  3,  3,  3,  3,  1,  3,  1,  1,  3,  0],
        [ 0,  3,  1,  1,  3,  1,  3,  1,  1,  1,  3,  3,  3,  3,  3,  0],
        [ 0,  1,  1,  1,  3,  1,  1,  3,  3,  3,  1,  3,  1,  1,  1,  0],
        [ 0,  3,  3,  1,  1,  3,  1,  4,  1,  3,  1,  3,  1,  3,  3,  0],
        [ 0,  4,  3,  3,  1,  1,  3,  3,  1,  4,  1,  3,  3,  1,  1,  0],
        [ 0,  1,  1,  1,  3,  3,  4,  3,  3,  1,  3,  1,  1,  1,  1,  0],
        [ 0,  3,  3,  3,  1,  3,  1,  1,  3,  1,  3,  3,  3,  3,  3,  0],
        [ 0,  3,  4,  3,  1,  3,  1,  3,  1,  1,  3,  1,  1,  3,  1,  7],
        [ 0,  1,  1,  1,  1,  3,  1,  3,  1,  1,  3,  1,  1,  4,  1,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 7
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  0, 10, 10,  8,  8, 10, 10,  0,  1,  0,  1,  0,  8,  1,  0],
        [ 7,  4, 10,  0,  0, 10,  8, 10,  0,  8,  0,  0,  0,  0,  4,  0],
        [ 0,  0,  0,  4, 10, 10,  0,  0,  0,  0, 10, 10, 10, 10,  1,  0],
        [ 0,  0,  0,  8,  0, 10,  0,  4,  0,  0, 10,  0,  1,  0,  0,  0],
        [ 0,  0,  0,  0,  0, 10,  0, 10, 10, 10, 10,  0,  0,  0,  1,  0],
        [ 0, 10, 10, 10,  8,  8,  0, 10,  0,  0,  0,  0,  0,  1,  1,  0],
        [ 0, 10,  0,  0,  0,  0,  0, 10,  0,  0,  1, 10, 10,  1,  0,  0],
        [ 0, 10, 10, 10, 10,  0,  8, 10,  0,  0,  8,  0, 10,  0,  0,  0],
        [ 0,  8,  0,  0, 10,  0,  8,  0, 10,  8,  8,  0, 10,  1,  0,  0],
        [ 0,  4,  8,  0, 10, 10, 10, 10, 10,  0,  0,  4,  8,  2,  0,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0]
    ],
    // Room 8
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 2,  1,  1, 52,  0, 52, 53,  0, 60,  1,  1, 53,  0, 56, 55,  0],
        [ 0,  1,  4,  1,  0,  1,  1,  0,  1,  1,  1,  1,  0,  1,  4,  0],
        [ 0, 50,  1, 51,  0,  1,  4,  0,  1,  1,  4,  1,  0,  1,  1,  0],
        [ 0,  0,  0,  0,  0, 54, 56,  0, 61,  1,  1, 57,  0, 57, 58,  0],
        [ 0, 50,  1,  4, 10,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0, 61,  1, 60,  0, 51,  1,  1, 54,  0,  9,  9,  9,  9,  9,  0],
        [ 0,  0,  0,  0, 10,  1,  1,  1,  4,  0,  1,  1,  1, 18,  1,  0],
        [ 0, 59,  1, 58,  0, 59,  1,  1, 55,  0,  8,  8,  8,  8,  8,  0],
        [ 0,  1,  4,  1,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  7],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 9
    [
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        [11,  4,  8, 11, 11,  8,  8, 11, 11, 50,  8,  4, 11, 11,  8, 11],
        [11,  8, 50, 11, 11,  3,  8, 11, 11, 11, 11, 11, 11, 11,  4, 11],
        [11, 11, 11, 11, 11,  8,  8, 11, 11, 11, 11, 11, 11, 11,  8, 11],
        [11, 11, 11, 11, 11,  3,  8, 11, 11,  9,  9,  8,  8,  8,  8, 11],
        [11, 11,  8, 11, 11,  8,  8,  2, 11, 11,  9,  8,  3,  8,  8,  7],
        [11, 11,  8, 11, 11,  8,  4,  8, 11, 11,  8,  8,  8,  8,  8, 11],
        [11, 11,  8, 11, 11,  8,  8,  8, 11, 11, 11, 11, 11, 11, 11, 11],
        [11,  9,  8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        [11,  9,  8, 11, 11, 11, 11, 11, 11,  4,  3,  3,  3,  3,  3, 11],
        [11,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 11],
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    ],
    // Room 10
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  3,  1,  1,  0,  4,  0,  4,  0,  4,  0,  4,  0,  1,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1,  0],
        [ 0,  1,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0],
        [ 0,  0,  3,  0,  0,  0, 12,  0, 12,  0, 12,  0, 12,  0,  1,  0],
        [ 0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0],
        [ 0,  1,  3,  1,  0,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  1,  1,  0,  9,  1,  1,  1,  1,  1,  1,  1,  1,  9,  0],
        [ 0,  1,  1,  1,  0,  9,  1,  1,  1,  1,  1,  1,  1,  1,  9,  0],
        [ 0,  1,  2,  1,  0,  5,  1,  1,  1,  1, 18,  1,  1,  1,  1,  0],
        [ 0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0]
    ],
    // Room 11
    [
        [ 0,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  9,  9,  0],
        [ 0,  4,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0,  9,  0],
        [ 0,  1,  0,  0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  0,  9,  0],
        [ 2,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  9,  0],
        [ 0,  0,  0,  0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  0,  9,  0],
        [ 0,  1,  1,  1,  0,  1,  0, 12, 12, 12, 12, 12, 12,  0,  9,  0],
        [ 0,  1,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0],
        [ 0,  0,  1,  1,  0,  1,  0,  1,  1, 20,  9,  9,  9,  9,  9,  0],
        [ 0,  0,  1,  0,  0,  8,  0,  0,  0,  0,  9,  9,  9,  9,  9,  0],
        [ 0,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  9,  9,  9,  9,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 12
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [21, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  0],
        [ 0,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0,  9,  9,  9,  7],
        [ 0,  1,  1,  1,  0,  1,  4,  0,  0,  4,  1,  0,  9,  4,  9,  0],
        [ 0,  3,  3,  3,  0,  1,  1,  5,  5,  1,  1,  0,  9,  9,  9,  0],
        [ 0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0],
        [ 0,  1,  4,  1,  0,  1,  1,  1,  1,  1,  1,  0,  8,  3,  8,  0],
        [ 0,  3,  3,  3,  0,  5,  1,  1,  1,  1,  5,  0,  3,  3,  3,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  0,  0,  1,  1,  3,  3,  1,  1,  0,  0,  0,  0,  0],
        [ 0, 14,  1,  1,  1,  8,  1,  1,  1,  1,  8,  1,  1,  1,  1,  2],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 13
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  1, 18,  1,  1,  0,  2,  0,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  7],
        [ 0,  1, 20,  1, 16,  1,  9,  9,  9,  1,  1,  0,  0,  0,  0,  0],
        [ 0,  1,  0,  0,  0,  1,  9,  9,  9,  1,  1,  8,  1,  1,  1,  0],
        [ 0,  1, 14,  1, 18,  1,  1,  1,  1,  0,  0,  0,  1, 11,  1,  0],
        [ 0,  1,  0,  0,  0,  1,  1,  1,  1,  0,  1,  1,  1, 11,  1,  0],
        [ 0,  1, 20,  1,  1,  1,  0,  0,  0,  0,  1, 11, 11, 11,  1,  0],
        [ 0,  1,  1,  1,  0, 12,  0,  1,  1,  1,  1, 11, 11, 11,  1,  0],
        [ 0,  1,  1,  1,  0,  0,  0,  1,  1,  1, 11, 11, 11, 11,  1,  0],
        [ 0,  4,  1,  1,  1,  8,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 14
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0, 10,  9,  9, 50,  0],
        [ 0,  0,  1,  1,  0,  1,  1,  1,  0,  1,  0,  0,  9,  9,  9,  0],
        [ 0,  0,  1,  1,  0,  1,  1,  1,  0,  1,  0,  0,  0,  0,  0,  0],
        [ 0,  0,  1,  1,  0,  1,  1,  1,  0, 19,  0,  0,  4,  4,  4,  0],
        [ 0,  0,  1,  1,  0,  1,  1,  1,  0,  1,  0,  0,  1,  1,  1,  0],
        [ 0,  0,  1,  1,  3,  1, 16,  1,  0,  1,  0,  0,  1,  0,  1,  0],
        [ 0,  0,  1,  1,  0,  0,  0,  1,  0,  1,  1,  0,  1,  0,  1,  7],
        [ 0,  1,  1,  1,  1,  1,  1, 17,  0,  0,  1,  0, 15,  0,  1,  0],
        [50,  0,  0, 10,  0,  0,  0,  1,  1,  1,  1,  0,  1,  0,  1,  0],
        [10, 10, 10, 10,  0,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 15
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  8,  0],
        [10, 11, 11,  1,  1,  1,  8,  1,  1,  1,  3,  1,  1,  1,  1,  0],
        [10, 11, 11,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  3,  1,  0],
        [ 0,  1, 11,  1,  1,  1,  0,  4,  4,  0,  4,  4,  0,  1,  1,  0],
        [ 0, 19, 11,  1,  1,  1,  0,  1,  1,  0,  1,  1,  0,  9,  9,  0],
        [ 0,  1, 11,  1,  1,  1,  0,  1,  1,  0,  1,  1,  0,  9,  9,  7],
        [ 0,  1, 11,  1,  1,  1,  1,  1,  0,  0,  0,  1,  0,  0,  0,  0],
        [ 1,  1, 11, 11, 11, 11, 11, 11, 11, 11, 21, 21, 23,  4,  4,  0],
        [ 1,  1,  8,  1,  1,  1,  1,  1,  1,  1,  1,  1, 22,  4,  4,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 22,  0,  0,  0]
    ],
    // Room 16
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  1,  1,  0,  1,  1,  0,  1,  1, 10,  1,  1,  0,  1,  1,  0],
        [ 0,  4, 15,  0,  4, 15,  0,  4, 15,  0,  4, 15,  0,  4, 15,  0],
        [ 0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0],
        [ 0, 31, 30, 30,  1, 30, 30,  1, 30, 30,  1, 30, 30,  1, 30, 30],
        [ 0,  1,  3,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0],
        [ 0,  1,  3,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0],
        [ 0,  1,  3,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0],
        [ 0,  1,  3,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0],
        [ 0,  1,  3,  1,  1,  1,  1,  1,  1,  0,  1,  0,  1,  0,  1,  0],
        [ 2,  1,  3,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  7],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    // Room 17
    [
        [ 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [ 0,  2,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  0,  0,  1,  4, 16,  1,  4,  1,  4,  1,  1,  4,  1,  0],
        [ 0,  1,  0,  0,  1,  1,  3,  3,  1,  1,  1,  3,  3,  1,  1,  0],
        [ 0,  1,  1,  1,  1,  4,  1,  1,  4,  1,  4,  1,  1,  4,  1,  0],
        [ 0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 0,  1,  1,  0,  1,  4,  1,  1,  4,  1,  4,  1,  1,  4,  1,  0],
        [ 0,  1,  0,  0,  1,  1,  3,  3,  1,  1,  1,  3,  3,  1,  1,  0],
        [ 0,  1,  1,  0,  1,  4,  1,  1,  4,  1,  4,  1, 20,  4,  1,  0],
        [ 0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [ 1, 40,  1,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0]
    ],
    // Room 18
    [
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        [11,  2,  3, 11, 11, 14,  1, 11, 11, 11, 11,  1,  8, 11, 11, 11],
        [11,  3,  3, 11, 11,  3,  1, 11, 11,  8,  1,  1,  3,  1,  8,  7],
        [11,  3,  1, 11,  1,  1, 11, 11, 11,  4,  1, 11, 11, 13,  8, 11],
        [11,  1,  3, 11, 13,  4, 11, 11, 11,  8,  1, 11, 11, 11, 11, 11],
        [11,  1,  3,  3,  3, 11, 11, 11, 11, 11, 13,  3,  3, 11, 11, 11],
        [11,  1,  4,  3,  8, 11, 11, 11, 11, 11, 11,  3,  8,  1, 11, 11],
        [11, 13,  3, 11,  3,  3, 11, 11, 11, 11, 11, 11, 11,  1,  8, 11],
        [11,  8,  3, 11,  4,  8, 11, 11, 11, 50,  3, 11, 11,  1,  4, 11],
        [11,  3,  8, 11, 11,  3,  4, 11, 11,  3,  3, 14,  1,  1,  8, 11],
        [11,  4,  3, 11, 11,  1, 50, 11, 11, 11, 11,  4,  3, 11, 11, 11],
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
    ],
    // Room 19
    [
        [ 0,  0,  0,  0,  0,  0,  0, 22,  7,  0,  0,  0,  0,  0,  0,  0],
        [ 0, 11, 11, 11, 11, 11, 21, 24,  1,  0,  0,  1,  1,  1,  4,  0],
        [ 0,  1,  1,  4,  1,  9,  0,  9,  1,  1,  0,  1,  1,  1,  1,  0],
        [ 0,  1,  4,  3,  1,  1,  0,  9,  1,  1,  0,  1,  1,  1,  5,  0],
        [ 0,  1,  3,  1,  1, 26, 21, 11,  1,  1,  0, 11, 11, 11, 11,  0],
        [ 0,  1,  3,  1,  3, 22, 11, 11,  1,  1,  0, 11, 11, 11, 11,  0],
        [ 0, 14,  1,  1,  1, 25, 21, 11,  1,  1,  1,  1,  1,  1,  4,  0],
        [ 0,  1,  1,  3,  1,  1,  0,  1,  3,  1,  1,  3,  1,  1,  1,  0],
        [ 0,  9,  1,  1,  1,  9,  0,  1,  3,  1,  1,  3,  3,  1,  1,  0],
        [ 2,  1,  9,  1,  9, 11,  0,  1,  3,  1,  1,  1,  3,  1,  1,  0],
        [ 0, 11, 11, 11, 11, 11, 21,  1,  5,  1,  1,  4, 10,  1,  1,  0],
        [ 0,  0,  0,  0,  0,  0,  0, 22,  0,  0, 12,  0,  0,  0, 12,  0]
    ],
    // Room 20
    [
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  0],
        [ 0, 17,  8,  1,  1,  1,  1,  8,  0,  0,  0,  0,  0,  0,  9,  0],
        [ 0,  1,  8,  1,  8,  1,  3,  1,  0,  5,  9,  9,  9,  0,  9,  0],
        [ 0,  1,  4,  8,  1, 18,  1,  1,  0,  3,  1,  1,  3,  0,  9,  0],
        [ 0,  1,  1,  1,  1,  4,  3,  1,  0,  9,  9,  9,  5,  0,  9,  0],
        [ 0,  1,  1,  1,  8,  1,  8,  1,  0,  3,  1,  1,  3,  0,  9,  0],
        [ 0,  1,  1,  1,  1,  1,  8,  1,  0,  5,  9,  9,  9,  0,  9,  0],
        [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1,  0,  9,  0],
        [ 0,  1,  1,  1,  4,  1,  1,  1,  0,  0,  0,  0,  0,  0,  9,  0],
        [ 0, 12,  0, 12,  0, 12,  0, 12,  0,  1, 18,  1,  1,  1,  1,  0],
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0]
    ],
];

/**
 * Draws a 4x4 sprite.
 * @param {number} sx Source x (in tiles, not pixels)
 * @param {number} sy Source y (in tiles, not pixels)
 * @param {number} dx Destination x (in pixels)
 * @param {number} dy Destination y (in pixels)
 * @param {boolean=} reverse Flag to horizontally reverse the image
 */
function drawSprite(sx, sy, dx, dy, reverse) {
    if (reverse) {
        ctx.translate(2 * dx + TILE_SIZE, 0);
        ctx.scale(-1, 1);
    }

    ctx.drawImage(
        sprites,
        sx * TILE_SIZE,
        sy * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        dx | 0,
        OFFSET + dy | 0,
        TILE_SIZE,
        TILE_SIZE);

    if (reverse) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

/**
 * Draws a number as a string of sprites.
 * @param {number} x
 * @param {number} y
 * @param {number} n
 */
function drawNumber(x, y, n) {
    const str = n.toString();
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i) - 48;
        ctx.drawImage(sprites, c * 4, 50, 3, 5, x, y, 3, 5);
        x += 4;
    }
}

class Entity {
    constructor(x, y) {
        // Current location
        this.x = x;
        this.y = y;

        // Current movement direction (in tiles)
        this.dx = 0;
        this.dy = 0;

        // Current offset (in pixels)
        this.ox = 0;
        this.oy = 0;

        // Previous movement direction (in tiles)
        this.pdx = 0;
        this.pdy = 1;

        // Movement speed
        // Must be 1, 2, or 4
        this.speed = 1;

        // Flag to horizontally flip the sprite
        this.reverse = false;

        // Flag if alive
        this.alive = true;

        // Random animation offset
        this.animDelay = 60 + (Math.random() * 120.0) | 0;
    }

    /**
     * True moving or not.
     */
    isMoving() {
        return this.dx !== 0 || this.dy !== 0;
    }

    move(dx, dy) {
        if (!this.alive) {
            return false;
        }

        if (this.isMoving()) {
            return false;
        }

        const x2 = this.x + dx;
        const y2 = this.y + dy;
        if (game.isBlockingTile(x2, y2)) {
            return false;
        }

        const other = game.getEntityAt(x2, y2);
        if (other && !other.bump(this, dx, dy)) {
            return false;
        }

        // Can move
        this.dx = dx;
        this.dy = dy;
        this.pdx = dx;
        this.pdy = dy;
        this.x += dx;
        this.y += dy;
        this.ox = -dx * TILE_SIZE;
        this.oy = -dy * TILE_SIZE;
        if (dx < 0) {
            this.reverse = true;
        }
        if (dx > 0) {
            this.reverse = false;
        }
        return true;
    }

    update() {
        if (!this.alive) {
            return;
        }
        if (this.dx !== 0 || this.dy !== 0) {
            this.ox += this.dx * this.speed;
            this.oy += this.dy * this.speed;
            if (this.ox === 0 && this.oy === 0) {
                this.dx = 0;
                this.dy = 0;
                this.ox = 0;
                this.oy = 0;
            }
        }
    }

    drawSprite(sx, sy) {
        drawSprite(sx, sy, this.x * TILE_SIZE + this.ox, this.y * TILE_SIZE + this.oy, this.reverse);
    }

    ai() {
        // Extending classes should implement
    }

    render() {
        // Extending classes should implement
    }

    bump(other, dx, dy) {
        // Extending classes should implement
        // By default, cannot move through entities.
        return false;
    }

    destroy() {
        game.entities.splice(game.entities.indexOf(this), 1);
    }
}

class Player extends Entity {

    constructor(x, y) {
        super(x, y);
        this.keys = 0;
        this.deathTime = 0;
    }

    kill() {
        this.alive = false;
        this.deathTime = Date.now();
        playSound(deathSound);
    }

    move(dx, dy) {
        if (super.move(dx, dy)) {
            walkSound.play();
            return true;
        }
        return false;
    }

    bump(other) {
        if (other instanceof Spikes) {
            // Kludge to let spikes move through player
            return true;
        }
        return false;
    }

    render() {
        if (!this.alive) {
            const frame = Math.min(7, Math.floor((Date.now() - this.deathTime) / 75));
            this.drawSprite(5 + frame, 5);
        } else {
            this.drawSprite(game.frame % 20 < 10 ? 0 : 1, 5);
        }
    }
}

class Boulder extends Entity {

    bump(other, dx, dy) {
        if (!(other instanceof Player)) {
            return false;
        }
        if (this.move(dx, dy)) {
            playSound(boulderSound);
            return true;
        }
        return false;
    }

    render() {
        this.drawSprite(3, 0);
    }
}

class Snake extends Entity {

    ai() {
        if (game.player.x < this.x) {
            this.reverse = true;
        }

        if (game.player.x > this.x) {
            this.reverse = false;
        }

        if (this.y !== game.player.y || Math.abs(game.player.oy) > 1) {
            // Not on the same row
            return;
        }

        const x1 = Math.min(this.x, game.player.x);
        const x2 = Math.max(this.x, game.player.x);
        for (let x = x1 + 1; x < x2; x++) {
            if (game.isBlockingTile(x, this.y) || game.getEntityAt(x, this.y)) {
                // Line of sight is blocked
                return;
            }
        }

        // Uh oh, the snake can see the player
        game.player.dx = 0;
        game.player.dy = 0;
        game.player.ox = 0;
        game.player.oy = 0;
        game.effects.push(new SnakeSpit(this));
        resetKeys();
    }

    render() {
        this.drawSprite(game.frame % 20 < 10 ? 4 : 5, 4);
    }
}

class Spider extends Entity {

    constructor(x, y, dx, dy, turnDir) {
        super(x, y);

        // Initial movement is important for spiders
        // so they turn the correct direction.
        // Unfortunately we cannot use the 'move' function yet,
        // because the rest of the map and entities are not
        // initialized yet.
        this.dx = dx;
        this.dy = dy;
        this.ox = -dx * TILE_SIZE;
        this.oy = -dy * TILE_SIZE;
        this.pdx = dx;
        this.pdy = dy;
        this.turnDir = turnDir;
    }

    ai() {
        if (this.isMoving()) {
            return;
        }

        // Check if the player is within reach
        for (let i = 0; i < 4; i++) {
            const x2 = this.x + DXS[i];
            const y2 = this.y + DYS[i];
            if (game.player.x === x2 &&
                game.player.y === y2 &&
                game.player.ox === 0 &&
                game.player.oy === 0) {
                game.player.kill();
                return;
            }
        }

        // Try to turn
        let ndx = this.pdy * this.turnDir;
        let ndy = -this.pdx * this.turnDir;

        // Can only try 4 directions
        for (let i = 0; i < 4; i++) {
            if (this.move(ndx, ndy)) {
                // Successfully moved
                return;
            }

            // Try next direction to the left
            const tmp = ndx;
            ndx = -ndy * this.turnDir;
            ndy = tmp * this.turnDir;
        }

        // No moves available
        if (this.shouldExplode()) {
            // Destroy self and replace with diamonds
            game.effects.push(new SpiderExplosion(this));
        }
    }

    shouldExplode() {
        for (let i = 0; i < 4; i++) {
            const other = game.getEntityAt(this.x + DXS[i], this.y + DYS[i]);
            if (other && other.isMoving() && (Math.abs(other.ox) > 1 || Math.abs(other.oy) > 1)) {
                return false;
            }
        }
        return true;
    }

    render() {
        this.drawSprite(game.frame % 10 < 5 ? 0 : 1, 4);
    }
}

class Cobweb extends Entity {

    bump(other) {
        if (!(other instanceof Player)) {
            return false;
        }
        this.destroy();
        playSound(cobwebSound);
        return true;
    }

    render() {
        this.drawSprite(0, 7);
    }
}

class Diamond extends Entity {

    bump(other) {
        if (!(other instanceof Player)) {
            return false;
        }
        this.destroy();
        game.score++;
        playSound(diamondSound);
        return true;
    }

    render() {
        const t = game.frame % this.animDelay;
        const frame = t < 14 ? ((t / 2) | 0) : 0;
        this.drawSprite(frame, 6);
    }
}

class HiddenDiamond extends Entity {

    bump(other) {
        if (!(other instanceof Player)) {
            return false;
        }
        this.destroy();
        game.entities.push(new Diamond(this.x, this.y));
        playSound(explodeSound);
        return false;
    }

    render() {
        this.drawSprite(0, 0);
    }
}

class Spikes extends Entity {

    constructor(x, y) {
        super(x, y);
        this.triggered = false;
        this.triggeredCount = 0;
        this.done = false;
        this.speed = 2;
    }

    isTriggered() {
        if (this.x !== game.player.x) {
            // Not on the same column
            return false;
        }

        const y1 = Math.min(this.y, game.player.y);
        const y2 = Math.max(this.y, game.player.y);
        for (let y = y1 + 1; y < y2; y++) {
            if (game.isBlockingTile(this.x, y)) {
                return false;
            }
            const e = game.getEntityAt(this.x, y);
            if (e && !(e instanceof Player)) {
                return false;
            }
        }

        return true;
    }

    ai() {
        if (this.done) {
            // Spike has already been triggered and shot
            return;
        }

        if (this.triggeredCount < 3) {
            if (this.isTriggered()) {
                this.triggeredCount++;
            }
            if (this.triggeredCount < 3) {
                return;
            }
        }

        // Calculate the actual pixels of the player and spikes
        const spikesX1 = this.x * TILE_SIZE + this.ox;
        const spikesY1 = this.y * TILE_SIZE + this.oy;
        const spikesX2 = spikesX1 + TILE_SIZE;
        const spikesY2 = spikesY1 + TILE_SIZE;

        let playerX1 = game.player.x * TILE_SIZE + game.player.ox;
        let playerY1 = game.player.y * TILE_SIZE + game.player.oy;
        let playerX2 = playerX1 + TILE_SIZE;
        let playerY2 = playerY1 + TILE_SIZE;

        // If moving, only consider the front 2 pixels
        if (game.player.dx < 0) {
            playerX2 = playerX1 + 2;
        } else if (game.player.dx > 0) {
            playerX1 = playerX2 - 2;
        } else if (game.player.dy < 0) {
            playerY2 = playerY1 + 2;
        }

        if (((playerX1 >= spikesX1 && playerX1 < spikesX2) || (playerX2 >= spikesX1 && playerX2 < spikesX2)) &&
            ((playerY1 >= spikesY1 && playerY1 < spikesY2) || (playerY2 >= spikesY1 && playerY2 < spikesY2))) {
            game.player.kill();
            return;
        }

        if (this.isMoving()) {
            // Already moving
            return;
        }

        // Move the spikes upward
        if (!this.move(0, -1)) {
            this.done = true;
            return;
        }

        // Create the rods where the spikes used to be
        game.entities.push(new SpikeRods(this.x, this.y + 1));
    }

    render() {
        this.drawSprite(3, 4);
    }
}

class SpikeRods extends Entity {

    render() {
        this.drawSprite(3, 5);
    }
}

class Pipe extends Entity {

    constructor(x, y, sx, sy) {
        super(x, y);
        this.sx = sx;
        this.sy = sy;
    }

    render() {
        this.drawSprite(this.sx, this.sy);
    }
}

class Key extends Entity {

    bump(other) {
        if (!(other instanceof Player)) {
            return false;
        }
        this.destroy();
        game.player.keys++;
        if (game.player.keys === game.totalKeys) {
            playSound(doorUnlockSound);
            game.effects.push(new Explosion(game.door.x * TILE_SIZE, game.door.y * TILE_SIZE));
        } else {
            playSound(keySound);
        }
        return true;
    }

    render() {
        const t = game.frame % this.animDelay;
        const frame = t < 10 ? ((t / 2) | 0) : 0;
        this.drawSprite(frame, 3);
    }
}

class Door extends Entity {

    bump(other) {
        if (other instanceof Player) {
            if (game.player.keys < game.totalKeys) {
                game.help = new HelpDialog(64, 128, 57, 23);
            } else {
                this.destroy();
                game.entities.push(new Exit(this.x, this.y));
                game.effects.push(new Explosion(this.x * TILE_SIZE, this.y * TILE_SIZE));
                playSound(explodeSound);
            }
        }
    }

    render() {
        this.drawSprite(2, 0);
    }
}

class Exit extends Entity {

    bump(other) {
        if (!(other instanceof Player)) {
            return false;
        }
        game.nextRoom();
    }
}

class Water extends Entity {

    bump(other) {
        if (other instanceof Boulder) {
            this.destroy();
            other.destroy();
            return true;
        }
        return false;
    }

    render() {
        this.drawSprite(game.frame % 40 < 20 ? 6 : 7, 7);
    }
}

class Teleport extends Entity {

    constructor(x, y, id) {
        super(x, y);
        this.id = id;
        this.triggered = false;
    }

    isDest(other) {
        return other !== this &&
                other instanceof Teleport &&
                other.id === this.id;
    }

    bump(other) {
        if (other instanceof Player) {
            this.triggered = true;
            game.resetTarget();
            return true;
        }
    }

    ai() {
        if (this.triggered && game.player.x === this.x && game.player.y === this.y && game.player.ox === 0 && game.player.oy === 0) {
            const dest = game.entities.find(e => this.isDest(e));
            if (!dest) {
                throw new Error('Missing teleport destination');
            }
            game.player.dx = 0;
            game.player.dy = 0;
            game.effects.push(new TeleportEffect(dest));
            resetKeys();
            this.triggered = false;
        }
    }
}

class Slab extends Entity {

    constructor(x, y) {
        super(x, y);
        this.speed = 0.25;
    }

    bump(other) {
        return !!(other instanceof Slab);
    }

    render() {
        this.drawSprite(6, 3);
    }
}

class SlabTrigger extends Entity {

    bump(other) {
        if (!(other instanceof Player) && !(other instanceof Boulder)) {
            return false;
        }
        this.destroy();
        game.effects.push(new SlabEffect());
        return true;
    }
}

class Lightswitch extends Entity {

    bump(other) {
        if (!(other instanceof Player)) {
            return false;
        }
        this.destroy();
        game.effects = game.effects.filter(e => !(e instanceof Darkness));
        return true;
    }
}

class Effect {
    constructor(blocking) {
        this.blocking = blocking;
    }
}

class SnakeSpit extends Effect {
    constructor(snake) {
        super(true);
        this.snake = snake;
        this.x = snake.x * TILE_SIZE;
        if (game.player.x < snake.x) {
            this.dx = -2;
            this.x2 = (game.player.x + 1) * TILE_SIZE;
        } else {
            this.dx = 2;
            this.x2 = game.player.x * TILE_SIZE;
        }
    }

    update() {
        this.x += this.dx;
        const done = (this.dx < 0 && this.x < this.x2) || (this.dx > 0 && this.x > this.x2);
        if (done) {
            game.player.kill();
        }
        return done;
    }

    render() {
        drawSprite(6, 4, this.x, this.snake.y * TILE_SIZE, this.dx < 0);
    }
}

class Explosion extends Effect {
    constructor(x, y) {
        super(true);
        this.x = x;
        this.y = y;
        this.frame = 0;
    }

    update() {
        this.frame++;
        return this.frame >= 10;
    }

    render() {
        const index = (this.frame / 2) | 0;
        if (index < 5) {
            drawSprite(index, 8, this.x, this.y);
        }
    }
}

class SpiderExplosion extends Effect {
    constructor(spider) {
        super(true);
        this.explosion = null;
        this.index = 0;

        // Build list of entities to destroy
        this.entities = [spider];
        for (let i = 0; i < 4; i++) {
            const x2 = spider.x + DXS[i];
            const y2 = spider.y + DYS[i];
            const other = game.getEntityAt(x2, y2);
            if (other &&
                !(other instanceof Key) &&
                !(other instanceof Spider) &&
                !(other instanceof Water)) {
                this.entities.push(other);
            }
        }
    }

    update() {
        if (this.explosion && !this.explosion.update()) {
            // Current explosion still running
            return false;
        }

        if (this.index >= this.entities.length) {
            // Done exploding all entities
            return true;
        }

        const other = this.entities[this.index++];
        other.destroy();
        this.explosion = new Explosion(other.x * TILE_SIZE, other.y * TILE_SIZE);
        game.entities.push(new Diamond(other.x, other.y));
        playSound(explodeSound);
        return false;
    }

    render() {
        this.explosion.render();
    }
}

class TeleportEffect extends Effect {
    constructor(dest) {
        super(true);
        this.dest = dest;
        this.index = 0;
        this.explosion = new Explosion(game.player.x * TILE_SIZE, game.player.y * TILE_SIZE);
        playSound(teleportSound);
    }

    update() {
        if (this.index === 0) {
            // Phase 1: the starting point cloud poof
            if (this.explosion.update()) {
                this.index = 1;
                game.player.x = this.dest.x;
                game.player.y = this.dest.y;
                this.explosion = new Explosion(this.dest.x * TILE_SIZE, this.dest.y * TILE_SIZE);
                playSound(teleportSound);
            }
        } else {
            // Phase 2: the destination point cloud poof
            return this.explosion.update();
        }
    }

    render() {
        this.explosion.render();
    }
}

class RoomTransition extends Effect {
    constructor() {
        super(true);
        this.frame = 0;
        this.rooms = [];

        // Build list of rooms
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                this.rooms.push({x: x, y: y});
            }
        }

        // Shuffle the list
        for (let i = this.rooms.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const x = this.rooms[i];
            this.rooms[i] = this.rooms[j];
            this.rooms[j] = x;
        }
    }

    update() {
        this.frame += 16;
        if (this.frame === this.rooms.length) {
            game.currRoom++;
            game.startRoom();
            game.effects.push(this);
        }
        const done = this.frame >= (this.rooms.length * 2);
        if (done) {
            game.showRoomHelp();
        }
        return done;
    }

    render() {
        const n = this.frame <= this.rooms.length ? this.frame : this.rooms.length * 2 - this.frame;
        for (let i = 0; i < n; i++) {
            drawSprite(0, 9, this.rooms[i].x * TILE_SIZE, this.rooms[i].y * TILE_SIZE);
        }
    }
}

class SlabEffect extends Effect {

    constructor() {
        super(true);
        this.index = 0;
        this.slabs = [];
        this.passage = null;
        for (let i = 0; i < game.entities.length; i++) {
            const e = game.entities[i];
            if (e instanceof Slab) {
                this.slabs.push(e);
                e.move(1, 0);
            }
            if (e instanceof HiddenDiamond) {
                this.passage = e;
            }
        }
        if (this.slabs.length !== 10) {
            throw new Error('Incorrect number of slabs');
        }
        if (!this.passage) {
            throw new Error('Missing passage');
        }
    }

    update() {
        for (let i = 0; i < 2; i++) {
            this.slabs[this.index + i].update();
        }
        if (!this.slabs[this.index].isMoving()) {
            this.index += 2;
            if (this.index >= this.slabs.length) {
                this.passage.destroy();
                game.effects.push(new Explosion(this.passage.x * TILE_SIZE, this.passage.y * TILE_SIZE));
                playSound(explodeSound);
                return true;
            }
        }
        return false;
    }

    render() {

    }
}

class Darkness extends Effect {

    update() {
        // Darkness only ends when the player finds the lightswitch
        return false;
    }

    render() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 8, 64, 48);
        game.player.render();
    }
}

class MainMenu {

    constructor() {
        this.selected = 0;
    }

    startGame() {
        game.menu = null;
        if (!game.map) {
            game.startRoom();
            game.showRoomHelp();
        }
        playSound(menuSelectSound);
    }

    chooseRoom() {
        game.menu = new RoomMenu();
        playSound(menuSelectSound);
    }

    showHelp() {
        game.menu = new HelpScreen();
        playSound(menuSelectSound);
    }

    update() {
        if (keys[KEY_ENTER]) {
            switch (this.selected) {
            case 0:
                this.startGame();
                break;
            case 1:
                this.chooseRoom();
                break;
            case 2:
                this.showHelp();
                break;
            }
        }
        if (keys[KEY_UP]) {
            if (this.selected > 0) {
                this.selected--;
                playSound(menuMoveSound);
            }
        }
        if (keys[KEY_DOWN]) {
            if (this.selected < 2) {
                this.selected++;
                playSound(menuMoveSound);
            }
        }
        resetKeys();
    }

    onClick(x, y) {
        if (inRect(x, y, 12, 38, 40, 6)) {
            this.startGame();
        }
        if (inRect(x, y, 12, 45, 40, 6)) {
            this.chooseRoom();
        }
        if (inRect(x, y, 12, 52, 40, 6)) {
            this.showHelp();
        }
    }

    render() {
        ctx.drawImage(
            sprites,
            0, 64, WIDTH, HEIGHT,
            0, 0, WIDTH, HEIGHT);
        ctx.drawImage(
            sprites,
            4, 36, 4, 4,
            8, this.selected * 7 + 39, 4, 4);
    }
}

class RoomMenu {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    goToMainMenu() {
        game.menu = new MainMenu();
        playSound(menuSelectSound);
    }

    chooseRoom() {
        game.menu = null;
        game.currRoom = this.y * 5 + this.x;
        game.score = 0;
        game.startRoom();
        game.showRoomHelp();
        playSound(menuSelectSound);
    }

    update() {
        if (keys[KEY_ESCAPE]) {
            this.goToMainMenu();
        }
        if (keys[KEY_ENTER]) {
            this.chooseRoom();
        }
        if (keys[KEY_UP]) {
            if (this.y > 0) {
                this.y--;
                playSound(menuMoveSound);
            }
        }
        if (keys[KEY_DOWN]) {
            if (this.y < 3) {
                this.y++;
                playSound(menuMoveSound);
            }
        }
        if (keys[KEY_LEFT]) {
            if (this.x > 0) {
                this.x--;
                playSound(menuMoveSound);
            }
        }
        if (keys[KEY_RIGHT]) {
            if (this.x < 4) {
                this.x++;
                playSound(menuMoveSound);
            }
        }
        resetKeys();
    }

    onClick(x, y) {
        if (inRect(x, y, 0, 57, 32, 7)) {
            this.goToMainMenu();
            return;
        }

        if (inRect(x, y, 2, 13, 60, 40)) {
            this.x = ((x - 2) / 12) | 0;
            this.y = ((y - 13) / 10) | 0;
            this.chooseRoom();
        }
    }

    render() {
        ctx.drawImage(
            sprites,
            64, 64, WIDTH, HEIGHT,
            0, 0, WIDTH, HEIGHT);
        ctx.drawImage(
            sprites,
            0, 40, 11, 9,
            this.x * 12 + 2, this.y * 10 + 13, 11, 9);
    }
}

class HelpScreen {

    constructor() {
        this.frame = 0;
    }

    update() {
        this.frame++;
        if (keys[KEY_ENTER] || keys[KEY_ESCAPE]) {
            game.menu = new MainMenu();
            playSound(menuSelectSound);
        }
        resetKeys();
    }

    render() {
        ctx.drawImage(
            sprites,
            128, 0, WIDTH, HEIGHT,
            0, 0, WIDTH, HEIGHT);

        const f1 = (this.frame / 8) | 0;
        const f2 = (this.frame / 4) | 0;
        const x = 52;

        // Player
        drawSprite(0 + (f1 % 2), 5, x, -5);

        // Keys
        drawSprite(0 + (f2 % 5), 3, x, 4);

        // Door
        drawSprite(2, 0, x, 11);

        // Snakes
        drawSprite(4 + (f1 % 2), 4, x, 27);

        // Spiders
        drawSprite(0 + (f1 % 2), 4, x, 34);

        // Spikes
        drawSprite(3, 4, x, 41);
    }
}

class WinScreen {

    update() {
        if (keys[KEY_ENTER] || keys[KEY_ESCAPE]) {
            game.menu = new MainMenu();
            playSound(menuSelectSound);
        }
        resetKeys();
    }

    render() {
        ctx.drawImage(
            sprites,
            128, 64, WIDTH, HEIGHT,
            0, 0, WIDTH, HEIGHT);
    }
}

class HelpDialog {

    constructor(x, y, w, h) {
        // Source image
        this.sx = x;
        this.sy = y;
        this.w = w;
        this.h = h;

        // Destination
        this.dx = ((WIDTH - w) / 2) | 0;
        this.dy = OFFSET + 2;
    }

    onClick() {
        game.help = null;
        playSound(menuSelectSound);
    }

    update() {
        if (keys[KEY_ENTER] || keys[KEY_ESCAPE]) {
            game.help = null;
            playSound(menuSelectSound);
        }
        resetKeys();
    }

    render() {
        ctx.drawImage(
            sprites,
            this.sx, this.sy, this.w, this.h,
            this.dx, this.dy, this.w, this.h);
    }
}

class Game {
    constructor() {
        this.player = null;
        this.door = null;
        this.entities = null;
        this.effects = null;
        this.map = null;
        this.frame = 0;
        this.currRoom = 0;
        this.totalKeys = 0;
        this.score = 0;
        this.startScore = 0;
        this.startTime = 0;
        this.menu = new MainMenu();
        this.help = null;
        this.targetX = -1;
        this.targetY = -1;
    }

    resetTarget() {
        this.targetX = -1;
        this.targetY = -1;
    }

    nextRoom() {
        playSound(roomTransitionSound);
        if (this.currRoom === ROOMS.length - 1) {
            this.currRoom = 0;
            this.startRoom();
            this.menu = new WinScreen();
        } else {
            game.effects.push(new RoomTransition());
        }
    }

    startRoom() {
        this.player = null;
        this.door = null;
        this.entities = [];
        this.effects = [];
        this.map = new Array(MAP_HEIGHT);
        this.startScore = this.score;
        this.startTime = Date.now();
        this.resetTarget();
        resetKeys();

        // Convert map definition to tilemap
        const input = ROOMS[this.currRoom];
        for (let y = 0; y < MAP_HEIGHT; y++) {
            // Fill the map with the floor (open) tile
            this.map[y] = new Array(MAP_WIDTH).fill(1);

            for (let x = 0; x < MAP_WIDTH; x++) {
                switch (input[y][x]) {
                case 0: // Wall
                    this.map[y][x] = 0;
                    break;
                case 1: // Open
                    this.map[y][x] = 1;
                    break;
                case 2: // Player
                    this.player = new Player(x, y);
                    this.entities.push(this.player);
                    break;
                case 3: // Boulder
                    this.entities.push(new Boulder(x, y));
                    break;
                case 4: // Key
                    this.entities.push(new Key(x, y));
                    break;
                case 5: // Snake
                    this.entities.push(new Snake(x, y));
                    break;
                case 6: // Spider
                    throw new Error('Deprecated spider');
                case 7: // Door
                    this.door = new Door(x, y);
                    this.entities.push(this.door);
                    break;
                case 8: // Cobweb
                    this.entities.push(new Cobweb(x, y));
                    break;
                case 9: // Diamond
                    this.entities.push(new Diamond(x, y));
                    break;
                case 10: // Hidden diamond
                    this.entities.push(new HiddenDiamond(x, y));
                    break;
                case 11: // Water
                    this.entities.push(new Water(x, y));
                    break;
                case 12: // Spikes
                    this.entities.push(new Spikes(x, y));
                    break;
                case 13: // Spider, turn left, start north
                    this.entities.push(new Spider(x, y, 0, -1, 1));
                    break;
                case 14: // Spider, turn left, start east
                    this.entities.push(new Spider(x, y, 1, 0, 1));
                    break;
                case 15: // Spider, turn left, start south
                    this.entities.push(new Spider(x, y, 0, 1, 1));
                    break;
                case 16: // Spider, turn left, start west
                    this.entities.push(new Spider(x, y, -1, 0, 1));
                    break;
                case 17: // Spider, turn right, start north
                    this.entities.push(new Spider(x, y, 0, -1, -1));
                    break;
                case 18: // Spider, turn right, start east
                    this.entities.push(new Spider(x, y, 1, 0, -1));
                    break;
                case 19: // Spider, turn right, start south
                    this.entities.push(new Spider(x, y, 0, 1, -1));
                    break;
                case 20: // Spider, turn right, start west
                    this.entities.push(new Spider(x, y, -1, 0, -1));
                    break;
                case 21: // Pipe, horizontal
                    this.entities.push(new Pipe(x, y, 0, 1));
                    break;
                case 22: // Pipe, vertical
                    this.entities.push(new Pipe(x, y, 1, 1));
                    break;
                case 23: // Pipe, west/south
                    this.entities.push(new Pipe(x, y, 0, 2));
                    break;
                case 24: // Pipe, west/north
                    this.entities.push(new Pipe(x, y, 1, 2));
                    break;
                case 25: // Pipe, north/east
                    this.entities.push(new Pipe(x, y, 2, 2));
                    break;
                case 26: // Pipe, south/east
                    this.entities.push(new Pipe(x, y, 3, 2));
                    break;
                case 30: // Slab
                    this.entities.push(new Slab(x, y));
                    break;
                case 31: // Slab trigger
                    this.entities.push(new SlabTrigger(x, y));
                    break;
                case 40: // Light switch
                    this.entities.push(new Lightswitch(x, y));
                    this.effects.push(new Darkness());
                    break;
                default: // Teleports
                    this.entities.push(new Teleport(x, y, input[y][x]));
                    break;
                }
            }
        }

        // Touch-up tiles
        // Convert corners to corner tiles, etc
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                const curr = this.isBlockingTile(x, y),
                    north = this.isBlockingTileOrHiddenDiamond(x, y - 1),
                    east = this.isBlockingTileOrHiddenDiamond(x + 1, y),
                    south = this.isBlockingTileOrHiddenDiamond(x, y + 1),
                    west = this.isBlockingTileOrHiddenDiamond(x - 1, y);
                if (curr && east === west && !south) {
                    this.map[y][x] = 21;
                } else if (curr && east && !west && !south) {
                    this.map[y][x] = 20;
                } else if (curr && !east && west && !south) {
                    this.map[y][x] = 22;
                }
            }
        }

        if (!this.player) {
            throw new Error('Map missing player');
        }

        if (!this.door) {
            throw new Error('Map missing door');
        }

        this.totalKeys = this.entities.filter(e => e instanceof Key).length;
    }

    showRoomHelp() {
        if (this.currRoom === 0) {
            this.help = new HelpDialog(0, 128, 49, 23);
        } else if (this.currRoom === 3) {
            this.help = new HelpDialog(128, 128, 62, 23);
        } else if (this.currRoom === 4) {
            this.help = new HelpDialog(192, 128, 58, 23);
        }
    }

    getTileAt(x, y) {
        if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
            return -1;
        }
        return this.map[y][x];
    }

    isBlockingTile(x, y) {
        const tile = this.getTileAt(x, y);
        return tile !== 1;
    }

    isBlockingTileOrHiddenDiamond(x, y) {
        if (this.isBlockingTile(x, y)) {
            return true;
        }
        const e = this.getEntityAt(x, y);
        return !!(e && ((e instanceof Door) || (e instanceof HiddenDiamond)));
    }

    getEntityAt(x, y) {
        for (let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if (e.x === x && e.y === y) {
                return e;
            }
            const rx = Math.round((e.x * TILE_SIZE + e.ox) / TILE_SIZE);
            const ry = Math.round((e.y * TILE_SIZE + e.oy) / TILE_SIZE);
            if (rx === x && ry === y) {
                return e;
            }
        }
        return null;
    }

    update() {
        if (this.menu) {
            this.resetTarget();
            this.menu.update();
            return;
        }

        if (this.help) {
            this.resetTarget();
            this.help.update();
            return;
        }

        if (keys[KEY_ESCAPE]) {
            this.menu = new MainMenu();
            return;
        }

        if (this.effects) {
            let i = 0;
            while (i < this.effects.length) {
                const e = this.effects[i];
                if (e.update()) {
                    this.effects.splice(i, 1);
                } else {
                    if (e.blocking) {
                        return;
                    }
                    i++;
                }
            }
        }
        if (this.player && this.player.alive) {
            if (keys[KEY_LEFT]) {
                this.player.move(-1, 0);
                this.resetTarget();
            }
            if (keys[KEY_RIGHT]) {
                this.player.move(1, 0);
                this.resetTarget();
            }
            if (keys[KEY_UP]) {
                this.player.move(0, -1);
                this.resetTarget();
            }
            if (keys[KEY_DOWN]) {
                this.player.move(0, 1);
                this.resetTarget();
            }
            if (this.targetX !== -1 && this.targetY !== -1) {
                if (this.targetX < this.player.x) {
                    this.player.move(-1, 0);
                }
                if (this.targetX > this.player.x) {
                    this.player.move(1, 0);
                }
                if (this.targetY < this.player.y) {
                    this.player.move(0, -1);
                }
                if (this.targetY > this.player.y) {
                    this.player.move(0, 1);
                }
            }
        }
        if (keys[KEY_R]) {
            this.score = this.startScore;
            this.startRoom();
        }
        if (this.player.alive) {
            this.entities.forEach(e => e.ai());
        }
        this.entities.forEach(e => e.update());
        this.effects.forEach(e => e.update());
    }

    onClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (WIDTH * (e.clientX - rect.left) / rect.width) | 0;
        const y = (HEIGHT * (e.clientY - rect.top) / rect.height) | 0;

        if (this.menu) {
            this.menu.onClick(x, y);
            return;
        }

        if (this.help) {
            this.help.onClick(x, y);
            return;
        }

        if (inRect(x, y, 0, 57, 32, 7)) {
            // Menu
            this.menu = new MainMenu();
            return;
        }

        if (inRect(x, y, 32, 57, 32, 7)) {
            // Reload
            this.score = this.startScore;
            this.startRoom();
            return;
        }

        const tx = (x / TILE_SIZE) | 0;
        const ty = ((y - OFFSET) / TILE_SIZE) | 0;
        if (tx >= 0 && tx < MAP_WIDTH && ty >= 0 && ty < MAP_HEIGHT) {
            this.targetX = tx;
            this.targetY = ty;
        }
    }

    render() {
        if (this.menu) {
            this.menu.render();
            return;
        }
        ctx.drawImage(sprites, 64, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
        drawNumber(19, 1, this.currRoom + 1);
        drawNumber(51, 1, this.score);
            this.renderMap();
            this.entities.forEach(e => e.render());
            this.effects.forEach(e => e.render());
        this.frame++;
        if (this.help) {
            this.help.render();
            return;
        }
    }

    renderMap() {
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                const t = this.map[y][x];
                const tx = t % 8;
                const ty = t >> 3;
                drawSprite(tx, ty, x * TILE_SIZE, y * TILE_SIZE);
            }
        }
    }
}

function setKey(e, state) {
    const code = e.keyCode;
    if (code >= 0 && code < keys.length) {
        e.preventDefault();
        e.stopPropagation();
        keys[code] = state;
    }
}

function resetKeys() {
    for (let i = 0; i < keys.length; i++) {
        keys[i] = false;
    }
}

function playSound(sound) {
    const sfx = sound.cloneNode(true);
    sfx.volume = 0.5;
    sfx.play();
}

function handleResize() {
  const size = Math.min(document.body.offsetWidth, document.body.offsetHeight);
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
}

function inRange(x, min, max) {
    return x >= min && x < max;
}

function inRect(px, py, rx, ry, rw, rh) {
    return inRange(px, rx, rx + rw) && inRange(py, ry, ry + rh);
}

const sprites = new Image();
sprites.src = 'paga64.png';

const menuMoveSound = new Audio('sfx/sfx_menu_move1.wav');
menuMoveSound.volume = 0.1;

const menuSelectSound = new Audio('sfx/sfx_menu_select2.wav');
const walkSound = new Audio('sfx/sfx_movement_footsteps5.wav');
const cobwebSound = new Audio('sfx/sfx_movement_ladder6a.wav');
const boulderSound = new Audio('sfx/sfx_sounds_impact1.wav');
const diamondSound = new Audio('sfx/sfx_coin_double1.wav');
const keySound = new Audio('sfx/sfx_coin_double2.wav');
const explodeSound = new Audio('sfx/sfx_exp_shortest_soft1.wav');
const doorUnlockSound = new Audio('sfx/sfx_sounds_fanfare3.wav');
const teleportSound = new Audio('sfx/sfx_movement_dooropen1.wav');
const roomTransitionSound = new Audio('sfx/sfx_sounds_fanfare1.wav');
const deathSound = new Audio('sfx/sfx_sounds_damage1.wav');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', {alpha: false});

const keys = new Array(256);

const game = new Game();

document.addEventListener('keydown', e => setKey(e, true));
document.addEventListener('keyup', e => setKey(e, false));
window.setInterval(() => { game.update(); game.render(); }, 1000.0 / FPS);
window.addEventListener('resize', () => handleResize());
canvas.addEventListener('click', e => game.onClick(e));
handleResize();
