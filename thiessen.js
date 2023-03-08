


let input, checkbox

function setup() {
    // Creates the canvas
    createCanvas(800, 600)
    clear()

    input = createInput('')
    checkbox = createCheckbox('Mostrar puntos', true)
    let btn = createButton('Crear')
    btn.mousePressed(buttonPressed)

}

function buttonPressed() {
    let quantity = Number(input.value())
    let showPoints = checkbox.checked()
    generateRandomThiessenPolygons(quantity, showPoints)
}

function generateRandomThiessenPolygons(quantity, showPoints) {

    const points = generateRandomPoints(0, 0, width, height, quantity)

    // Passes through all the points (VERY INEFFICIENT)
    for (let p = 0; p < points.length; p++)
    {
        // Sets a random color
        stroke(randomIntBetween(0, 255), randomIntBetween(0, 255), randomIntBetween(0, 255))
        for (let y = 0; y < width; y++)
            for (let x = 0; x < height; x++) {
                // Checks the points that have the same distance as another one
                if (lessEqualThanAll({ x: x, y: y }, points[p], points))
                    point(x, y)
            }
    }
    // Draws the points
    if (showPoints) {
        stroke(255)
        for (let p of points)
            ellipse(p.x, p.y, 3, 3)
    }
}

/**
 * Checks if a point's distance to a reference is less or equals to every other point
 * @param {*} point 
 * @param {*} reference 
 * @param {*} points 
 */
function lessEqualThanAll(point, reference, points) {
    let distance = euclideanDistance(point, reference)
    for (let p of points) {
        // Skips the same point
        if (reference.x === p.x && reference.y === p.y)
            continue
        // Checks the distance
        if (distance > euclideanDistance(point, p))
            return false
    }
    return true
}

/**
 * Gets the euclidean distance between two points.
 * @param {*} p1 
 * @param {*} p2 
 */
function euclideanDistance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y))
}  

/**
 * Generates random points
 * @param {*} quantity 
 */
function generateRandomPoints(minX, minY, maxX, maxY, quantity) {
    let points = []
    for (let i = 0; i < quantity; i++)
        points.push({ x: Math.round(randomBetween(minX, maxX)), y: Math.round(randomBetween(minY, maxY)) })
    return points
}

/**
 * Gets a random value between a min and a max (inclusive).
 * @param {*} min 
 * @param {*} max 
 */
function randomBetween(min, max) {
    return Math.random() * (max - min + 1) + min
}

/**
 * Gets a random int value between a min and a max (inclusive).
 * @param {*} min 
 * @param {*} max 
 */
function randomIntBetween(min, max) {
    return Math.round(randomBetween(min, max))
}