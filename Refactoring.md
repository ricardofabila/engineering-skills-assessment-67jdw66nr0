# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
Here I broke down the original `deterministicPartitionKey` function into smaller pieces:

    `getCandidateFromEvent`
    `getCleanCandidate`
    `getCandidatePartitionKey`

It is good practice to make your functions as small as posible (within reason). This has many advantages, but the two mayor ones are:

1) They make these smaller functions much easier to test.
2) It is easier to read and comprehend smaller bits of code than larger ones. 

I expanded the test suite to cover all the cases for these smaller functions.