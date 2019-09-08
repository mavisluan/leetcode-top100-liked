// Solution 1
// Time: O(n) Space: O(1)
// partialSum save the contiguous sum
// when partialSum is negative, reset it to 0
const maxSubArray1 = (nums) => {
    let maxSum = nums[0];
    let partialSum = 0;

    for (let num of nums) {
        partialSum += num;
        maxSum = Math.max(maxSum, partialSum);

        if (partialSum < 0) partialSum = 0;
    }

    return maxSum;
};
