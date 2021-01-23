// This afternoon for number '2345' we notices some 3 char long on the list. It was becuase we did not clear the sink after running for '234'
// That issue is no longer relevent with the code cleanup

function numberToStringList(digits) {
    let digitToLetter = {
        '1': '1',
        '2': '2abc',
        '3': '3def',
        '4': '4ghi',
        '5': '5jkl',
        '6': '6mno',
        '7': '7pqrs',
        '8': '8tuv',
        '9': '9wxyz',
        '0': '0'
    }

    digits = digits.toString()

    if (!digits || !digits.length) {
        return []
    }

    if (digits.length === 1) {
        return digitToLetter[digits].split('')
    }

    let result = []
    getCombination(digits, [], result)
    return result
}


function getCombination(digits, combination = '', result=[]) {
    if (digits.length === 0) {
        result.push(combination.join(''))
        return
    }

    let letters = digitToLetter[digits.charAt(0)]

    //**********************************************/
    //***** explaining for digits '23' only ********/
    //**********************************************/

    // First time letters are '2abc'; 2 is pushed to combination; call stack would preserve following thing before calling recursion with digit '3'
    // value of i = 0
    // letter = '2abc'

    // Second time letters are '3def'; 3 is pushed to combination; result is '23'; call stack would preserve following thing before calling recursion
    // value of i=0 (this is a new loop)
    // letters = 3def
    // This time when recursion is called, the value of digit would be empty. So we end up in the IF block at the top. Combination would hold '23' at this time. We return from 
    // IF block and program continues to next line number 66
    //------------------------------
    // Because there is no more recursion, it will pop the last value which is '3' and continue with look, with the following values
    // value of i=1
    // letter = 3def
    // now combination will hold '2d'. On callin recursion digits would be empty and things will repeat as explained above.

    // Once the second loop covers all the letters ('3def'), call stack would go back to first look and second index which is 'a'. Now for 'a' we repeat the whole process

    for (let i = 0; i < letters.length; i++) {
        combination.push(letters.charAt(i))
        getCombination(digits.substring(1), combination, result)
        combination.pop()
    }
}