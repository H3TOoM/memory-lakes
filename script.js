// select span to start game 
document.querySelector('.control-btns span').onclick = () => {
    let yourName = prompt('Enter Your Name');


    // check if the user name is empty 
    if (yourName === null || yourName === "") {
        // Name is empty
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        // Set Name
        document.querySelector(".name span").innerHTML = yourName;
    };


    // delete splash screen 
    document.querySelector(".control-btns").remove();

};


// flip card duration 
let duration = 1000;

// select block container 
let blocksContainer = document.querySelector(".memory-game-blocks");

// array from all blocks 
let blocks = Array.from(blocksContainer.children);

// create order range to order elements 
// This array contains numbers from 0 to 15 (for 16 cards)
// It will be used to shuffle the cards randomly in the game
let orderRange = [...Array(blocks.length).keys()]
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);
// if i not used spread operators the result will be ==>
// [Array Iterator] 0 : Array Iterator {}length: 1[[Prototype]]: Array(0)



// Add Order Css Property To Game Blocks 
// loop at blocks 
blocks.forEach((block, index) => {
    // add CSS Order Property
    block.style.order = orderRange[index];

    // Add click event 
    block.addEventListener('click', function () {
        // trigger the flip block function 
        flipBlock(block)
    })
})


// shuffle function 
// This function shuffles an array using Fisher-Yates algorithm
function shuffle(array) {
    // settings vars 
    let current = array.length,  // Start from the last element
        temp,                    // Temporary variable to store element
        random;                  // Random index


    while (current > 0) {

        // Get random number between 0 and current-1
        random = Math.floor(Math.random() * current)

        // Decrease Length By One (move to previous element)
        current--;

        // 1 - Save Current Element in Stash (temp variable)
        temp = array[current];


        // 2 - Current Element = Random Element (swap current with random)
        array[current] = array[random];


        // 3 - Random Element = Get Element From Stash (complete the swap)
        array[random] = temp;

    };

    return array;

};

// Stop Clicking Function 
function stopClicking() {
    // Add class No Clicking On Main Container 
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        // remove class no clicking after duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
};


function checkMatchedBlocks(firstBlock, secondBlock) {

    // select triens element
    let triesElement = document.querySelector('.tries span');


    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        // remove fliped class 
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');

        // add has-match class
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');


        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            // remove fliped class 
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');

        }, duration);

        document.getElementById('fail').play();
    }

}

// Flip Block Function 
function flipBlock(selectedBlock) {
    // Add class flipped to cards
    selectedBlock.classList.add("flipped");

    // collect all fliped cards
    let allFlipedBlocks = blocks.filter(flipedBlock => flipedBlock.classList.contains('flipped'));

    // console.log(allFlipedBlocks);

    // If user select two cards || if two cards is fliped
    if (allFlipedBlocks.length === 2) {
        // console.log("two fliped cards selected");

        // Stop Clicking Function 
        stopClicking();



        // Check Matched Block Function
        checkMatchedBlocks(allFlipedBlocks[0], allFlipedBlocks[1])

    }
}



