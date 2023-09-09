import  Solve from "./Solve";
function GenerateQuestion(length) {
    // generate an array of random numbers of length length between 1 and 15
    var nums = Array.from({length: length}, () => Math.floor(Math.random() * 15) + 1);
    var possible_targets = [];
    for (let i = 0; i < 100; i++){
        if (Solve(nums, i).size > 0) {
            possible_targets.push(i);
        }    
    }
    //pick a random target from the possible targets
    var target = possible_targets[Math.floor(Math.random() * possible_targets.length)];
    return [...nums, target];
  }
  
  export default GenerateQuestion;