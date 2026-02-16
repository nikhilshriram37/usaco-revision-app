// USACO Bronze Practice Questions
// Each quiz randomly selects 10 questions from this bank

const questionBank = [
    // EASY BRONZE (Questions 1-15)
    {
        id: 1,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You need to find the maximum value in an array of N integers (N ≤ 1000). What is the time complexity?",
        choices: [
            "O(N log N)",
            "O(N)",
            "O(N²)",
            "O(1)"
        ],
        correct_answer: "O(N)",
        explanation: "You must examine each element once to find the maximum, giving O(N). Sorting would be O(N log N) but is unnecessary. O(N²) would involve nested loops, which aren't needed here.",
        algorithm: "Array Traversal",
        estimated_time_seconds: 45
    },
    {
        id: 2,
        difficulty: "easy",
        type: "multiple_choice",
        question: "A farmer has 3 cows with milk productions [10, 5, 8]. He wants to know which cow produces the most milk. What technique should you use?",
        choices: [
            "Binary search",
            "Simple iteration to find maximum",
            "Dynamic programming",
            "Depth-first search"
        ],
        correct_answer: "Simple iteration to find maximum",
        explanation: "With only 3 elements, iterate through the array tracking the maximum value. Binary search requires sorted data. DP and DFS are overkill for this simple problem.",
        algorithm: "Simulation",
        estimated_time_seconds: 50
    },
    {
        id: 3,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You have a string 'AABBC'. You need to count how many times each letter appears. What data structure is most appropriate?",
        choices: [
            "Queue",
            "Stack",
            "Frequency array or hash map",
            "Linked list"
        ],
        correct_answer: "Frequency array or hash map",
        explanation: "Frequency arrays (or hash maps) are perfect for counting occurrences. Iterate through the string once, incrementing counts. Queues and stacks don't support efficient counting by key.",
        algorithm: "Frequency Counting",
        estimated_time_seconds: 55
    },
    {
        id: 4,
        difficulty: "easy",
        type: "multiple_choice",
        question: "Given N = 100, which nested loop structure runs in O(N²) time?",
        choices: [
            "for i in range(N): for j in range(10):",
            "for i in range(N): for j in range(N):",
            "for i in range(N): for j in range(i):",
            "Both B and C"
        ],
        correct_answer: "Both B and C",
        explanation: "B is clearly O(N²). C runs N + (N-1) + ... + 1 = N(N+1)/2 iterations, which is also O(N²). A is O(N) since the inner loop is constant.",
        algorithm: "Complexity Analysis",
        estimated_time_seconds: 60
    },
    {
        id: 5,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You need to check if a number X exists in an unsorted array of 1000 elements. What's the best approach for Bronze?",
        choices: [
            "Sort then binary search",
            "Linear search through the array",
            "Build a binary search tree",
            "Use dynamic programming"
        ],
        correct_answer: "Linear search through the array",
        explanation: "For a single query on unsorted data, linear search O(N) is simplest. Sorting first takes O(N log N) which is slower. For Bronze, keep it simple unless multiple queries are needed.",
        algorithm: "Linear Search",
        estimated_time_seconds: 50
    },
    {
        id: 6,
        difficulty: "easy",
        type: "code_snippet",
        question: "Write a loop that counts how many even numbers are in array arr of size n.",
        choices: [
            "count = 0\nfor i in range(n):\n    if arr[i] % 2 == 0:\n        count += 1",
            "count = 0\nfor i in range(n):\n    if arr[i] % 2 == 1:\n        count += 1",
            "count = 1\nfor i in range(n):\n    if arr[i] % 2 == 0:\n        count += 1",
            "count = 0\nfor i in range(n+1):\n    if arr[i] % 2 == 0:\n        count += 1"
        ],
        correct_answer: "count = 0\nfor i in range(n):\n    if arr[i] % 2 == 0:\n        count += 1",
        explanation: "Initialize count to 0, iterate through valid indices (0 to n-1), check if divisible by 2 (even). B checks for odd. C starts at 1. D goes out of bounds.",
        algorithm: "Counting",
        estimated_time_seconds: 60
    },
    {
        id: 7,
        difficulty: "easy",
        type: "multiple_choice",
        question: "Bessie walks on a 1D line. She starts at position 0. Given moves 'L' (left) and 'R' (right), how do you find her final position?",
        choices: [
            "Count Rs minus Ls",
            "Use a stack to track moves",
            "Sort the moves first",
            "Use binary search"
        ],
        correct_answer: "Count Rs minus Ls",
        explanation: "Each R adds 1, each L subtracts 1. Final position = count(R) - count(L). This is simple simulation. Stacks, sorting, and binary search are unnecessary.",
        algorithm: "Simulation",
        estimated_time_seconds: 45
    },
    {
        id: 8,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You have coordinates (x1, y1) and (x2, y2). What's the Manhattan distance between them?",
        choices: [
            "sqrt((x2-x1)² + (y2-y1)²)",
            "|x2-x1| + |y2-y1|",
            "(x2-x1) + (y2-y1)",
            "max(|x2-x1|, |y2-y1|)"
        ],
        correct_answer: "|x2-x1| + |y2-y1|",
        explanation: "Manhattan distance is the sum of absolute differences in coordinates. A is Euclidean distance. C forgets absolute values. D is Chebyshev distance.",
        algorithm: "Coordinate Geometry",
        estimated_time_seconds: 50
    },
    {
        id: 9,
        difficulty: "easy",
        type: "multiple_choice",
        question: "Given a sorted array [1, 3, 5, 7, 9], you want to find if 5 exists. What's the most efficient Bronze approach?",
        choices: [
            "Linear search O(N)",
            "Binary search O(log N)",
            "Both work, but binary search is faster",
            "Hash the array first"
        ],
        correct_answer: "Both work, but binary search is faster",
        explanation: "Since it's sorted, binary search is more efficient. However, for Bronze, linear search is acceptable and simpler to code. Both are valid; binary search is optimal.",
        algorithm: "Binary Search",
        estimated_time_seconds: 55
    },
    {
        id: 10,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You need to reverse a string 'ABCD'. Which approach works?",
        choices: [
            "Use two pointers, swap characters from ends moving inward",
            "Sort the string",
            "Use binary search",
            "Count character frequencies"
        ],
        correct_answer: "Use two pointers, swap characters from ends moving inward",
        explanation: "Two pointers starting at both ends, swapping and moving inward, reverses in O(N). Sorting changes order incorrectly. Binary search doesn't apply. Frequency counting doesn't reverse.",
        algorithm: "Two Pointers",
        estimated_time_seconds: 50
    },
    {
        id: 11,
        difficulty: "easy",
        type: "multiple_choice",
        question: "A problem says N ≤ 100,000 and time limit is 2 seconds. Which complexity is likely too slow?",
        choices: [
            "O(N)",
            "O(N log N)",
            "O(N²)",
            "O(log N)"
        ],
        correct_answer: "O(N²)",
        explanation: "O(N²) with N=100,000 means 10 billion operations, likely too slow. O(N) and O(N log N) are fast enough. O(log N) is very fast. Rule of thumb: ~10⁸ operations per second.",
        algorithm: "Complexity Analysis",
        estimated_time_seconds: 60
    },
    {
        id: 12,
        difficulty: "easy",
        type: "code_snippet",
        question: "Find the sum of all elements in array arr of size n.",
        choices: [
            "sum = 0\nfor i in range(n):\n    sum += arr[i]",
            "sum = 1\nfor i in range(n):\n    sum += arr[i]",
            "sum = 0\nfor i in range(1, n):\n    sum += arr[i]",
            "sum = arr[0]\nfor i in range(n):\n    sum += arr[i]"
        ],
        correct_answer: "sum = 0\nfor i in range(n):\n    sum += arr[i]",
        explanation: "Initialize sum to 0, add each element. B starts at 1 (wrong). C skips first element. D double-counts arr[0].",
        algorithm: "Array Traversal",
        estimated_time_seconds: 55
    },
    {
        id: 13,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You have a list of N numbers. You need to output them in reverse order. What's the approach?",
        choices: [
            "Iterate from index N-1 down to 0",
            "Sort the array",
            "Use binary search",
            "Build a frequency map"
        ],
        correct_answer: "Iterate from index N-1 down to 0",
        explanation: "Simply loop backwards through the array printing each element. Sorting changes the order incorrectly. Binary search and frequency maps don't help with reversing output order.",
        algorithm: "Array Traversal",
        estimated_time_seconds: 45
    },
    {
        id: 14,
        difficulty: "easy",
        type: "multiple_choice",
        question: "Farmer John has 5 cows with IDs [3, 1, 4, 1, 5]. He wants them sorted by ID. What should you use?",
        choices: [
            "Built-in sort function",
            "Binary search",
            "Hash map",
            "Depth-first search"
        ],
        correct_answer: "Built-in sort function",
        explanation: "Use the language's built-in sort (Python's sorted() or sort(), C++ sort()). It's O(N log N) and handles this easily. Binary search finds elements. Hash maps count. DFS is for graphs.",
        algorithm: "Sorting",
        estimated_time_seconds: 50
    },
    {
        id: 15,
        difficulty: "easy",
        type: "multiple_choice",
        question: "You need to check if two strings are equal. What's the correct approach?",
        choices: [
            "Use == operator or equals() method",
            "Sort both strings and compare",
            "Count frequencies and compare",
            "Use binary search"
        ],
        correct_answer: "Use == operator or equals() method",
        explanation: "Direct comparison with == (Python) or .equals() (Java) is O(N) and straightforward. Sorting or frequency counting checks for anagrams, not equality. Binary search doesn't apply.",
        algorithm: "String Processing",
        estimated_time_seconds: 45
    },

    // MID BRONZE (Questions 16-40)
    {
        id: 16,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have N rectangles on a grid. Each has coordinates (x1, y1, x2, y2). You need to find which rectangle has the largest area. What's the approach?",
        choices: [
            "For each rectangle, calculate area = (x2-x1)*(y2-y1), track maximum",
            "Sort rectangles by x-coordinate",
            "Use dynamic programming",
            "Binary search on the answer"
        ],
        correct_answer: "For each rectangle, calculate area = (x2-x1)*(y2-y1), track maximum",
        explanation: "Iterate through rectangles, compute each area, track the max. This is O(N) simulation. Sorting doesn't help find max area. DP and binary search are unnecessary for this direct calculation.",
        algorithm: "Simulation",
        estimated_time_seconds: 70
    },
    {
        id: 17,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Given an array of N integers, find the number of pairs (i, j) where i < j and arr[i] == arr[j]. N ≤ 1000.",
        choices: [
            "Use nested loops O(N²)",
            "Sort then count O(N log N)",
            "Use frequency map: for each value with count c, add c*(c-1)/2 pairs",
            "Both A and C work"
        ],
        correct_answer: "Both A and C work",
        explanation: "Nested loops check all pairs directly in O(N²). Frequency map is more elegant: if a value appears c times, it forms c*(c-1)/2 pairs. Both work for N ≤ 1000. C is more efficient.",
        algorithm: "Counting",
        estimated_time_seconds: 75
    },
    {
        id: 18,
        difficulty: "medium",
        type: "code_snippet",
        question: "Find the minimum value in array arr of size n and print its index (0-indexed).",
        choices: [
            "min_val = arr[0]\nmin_idx = 0\nfor i in range(1, n):\n    if arr[i] < min_val:\n        min_val = arr[i]\n        min_idx = i\nprint(min_idx)",
            "min_val = arr[0]\nfor i in range(n):\n    if arr[i] < min_val:\n        min_val = arr[i]\nprint(min_val)",
            "min_idx = 0\nfor i in range(n):\n    if arr[i] < arr[min_idx]:\n        min_idx = i\nprint(min_idx)",
            "Both A and C"
        ],
        correct_answer: "Both A and C",
        explanation: "A tracks both value and index explicitly. C cleverly compares arr[i] with arr[min_idx]. Both correctly find the minimum's index. B prints the value, not index.",
        algorithm: "Array Traversal",
        estimated_time_seconds: 80
    },
    {
        id: 19,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Cows are at positions [1, 4, 7, 9] on a number line. You want to place a barn to minimize the maximum distance any cow travels. Where should you place it?",
        choices: [
            "At position 1 (leftmost)",
            "At position 5 (median/middle)",
            "At position 9 (rightmost)",
            "At position 4 (second cow)"
        ],
        correct_answer: "At position 5 (median/middle)",
        explanation: "To minimize maximum distance, place the barn at the median/center. Here, the middle is around (1+9)/2 = 5. This balances distances. Endpoints leave some cows very far away.",
        algorithm: "Greedy",
        estimated_time_seconds: 75
    },
    {
        id: 20,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have a string of parentheses '((()))'. How do you check if it's balanced?",
        choices: [
            "Count '(' and ')' - if equal, it's balanced",
            "Use a counter: +1 for '(', -1 for ')'. Valid if never negative and ends at 0",
            "Sort the string",
            "Use binary search"
        ],
        correct_answer: "Use a counter: +1 for '(', -1 for ')'. Valid if never negative and ends at 0",
        explanation: "Track depth with a counter. Increment for '(', decrement for ')'. If it goes negative or doesn't end at 0, it's invalid. Just counting totals misses cases like '))(('.",
        algorithm: "Simulation",
        estimated_time_seconds: 70
    },
    {
        id: 21,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Given N points on a 2D grid, find the two points that are closest together (Euclidean distance). N ≤ 1000. What's a Bronze approach?",
        choices: [
            "Check all pairs with nested loops O(N²)",
            "Sort by x-coordinate then check neighbors",
            "Use a sweep line algorithm",
            "Dynamic programming"
        ],
        correct_answer: "Check all pairs with nested loops O(N²)",
        explanation: "For N ≤ 1000, brute force O(N²) checking all pairs works fine. Calculate distance for each pair, track minimum. Advanced algorithms exist but are overkill for Bronze.",
        algorithm: "Brute Force",
        estimated_time_seconds: 75
    },
    {
        id: 22,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have an array [3, 1, 4, 1, 5]. You want to find the second largest element. What's the approach?",
        choices: [
            "Sort descending, return arr[1]",
            "Find max, remove it, find max again",
            "Track both max and second_max in one pass",
            "All of the above work"
        ],
        correct_answer: "All of the above work",
        explanation: "Sorting works but is O(N log N). Removing max and finding again works. Tracking both in one pass is O(N) and most efficient. All are valid Bronze approaches.",
        algorithm: "Array Traversal",
        estimated_time_seconds: 70
    },
    {
        id: 23,
        difficulty: "medium",
        type: "code_snippet",
        question: "Check if array arr of size n is sorted in non-decreasing order (arr[i] ≤ arr[i+1]).",
        choices: [
            "for i in range(n-1):\n    if arr[i] > arr[i+1]:\n        return False\nreturn True",
            "for i in range(n):\n    if arr[i] > arr[i+1]:\n        return False\nreturn True",
            "for i in range(1, n):\n    if arr[i] < arr[i-1]:\n        return False\nreturn True",
            "Both A and C"
        ],
        correct_answer: "Both A and C",
        explanation: "A checks forward (i to i+1) for n-1 pairs. C checks backward (i-1 to i) starting from index 1. Both correctly verify sorted order. B goes out of bounds at i=n-1.",
        algorithm: "Array Traversal",
        estimated_time_seconds: 75
    },
    {
        id: 24,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You need to remove all duplicates from an array [1, 2, 2, 3, 3, 3]. What's a simple Bronze approach?",
        choices: [
            "Use a set/hash set to track seen elements",
            "Sort then iterate, skipping consecutive duplicates",
            "Use nested loops to check each pair",
            "Both A and B work"
        ],
        correct_answer: "Both A and B work",
        explanation: "A set automatically handles uniqueness in O(N). Sorting then skipping duplicates also works in O(N log N). Both are valid. Nested loops are O(N²) and less efficient.",
        algorithm: "Hash Set",
        estimated_time_seconds: 70
    },
    {
        id: 25,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Farmer John records daily milk production for 7 days: [10, 12, 8, 15, 9, 11, 13]. On how many days did production increase from the previous day?",
        choices: [
            "3 days",
            "4 days",
            "5 days",
            "6 days"
        ],
        correct_answer: "4 days",
        explanation: "Compare each day with previous: 12>10✓, 8<12✗, 15>8✓, 9<15✗, 11>9✓, 13>11✓. That's 4 increases. Iterate through array comparing consecutive elements.",
        algorithm: "Simulation",
        estimated_time_seconds: 80
    },
    {
        id: 26,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have a grid of characters. You need to count how many times the letter 'X' appears. Grid is N×M where N, M ≤ 100. What's the approach?",
        choices: [
            "Nested loops: for each row, for each column, check if grid[i][j] == 'X'",
            "Sort the grid first",
            "Use binary search",
            "Dynamic programming"
        ],
        correct_answer: "Nested loops: for each row, for each column, check if grid[i][j] == 'X'",
        explanation: "Iterate through all cells with nested loops, count 'X' characters. This is O(N*M) which is fine for the constraints. Sorting and binary search don't apply to 2D grids for counting.",
        algorithm: "Grid Traversal",
        estimated_time_seconds: 65
    },
    {
        id: 27,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Given a list of N intervals [start, end], you want to find how many overlap with a query interval [a, b]. N ≤ 1000. What's the Bronze approach?",
        choices: [
            "Check each interval: overlaps if not (end < a or start > b)",
            "Sort intervals by start time",
            "Use a segment tree",
            "Dynamic programming"
        ],
        correct_answer: "Check each interval: overlaps if not (end < a or start > b)",
        explanation: "For each interval, check if it overlaps with [a,b]. Two intervals overlap unless one ends before the other starts. This is O(N) per query. Advanced structures are overkill for Bronze.",
        algorithm: "Simulation",
        estimated_time_seconds: 80
    },
    {
        id: 28,
        difficulty: "medium",
        type: "code_snippet",
        question: "Swap the values at indices i and j in array arr.",
        choices: [
            "temp = arr[i]\narr[i] = arr[j]\narr[j] = temp",
            "arr[i] = arr[j]\narr[j] = arr[i]",
            "arr[i], arr[j] = arr[j], arr[i]",
            "Both A and C"
        ],
        correct_answer: "Both A and C",
        explanation: "A uses a temporary variable (classic approach). C uses Python's tuple unpacking (elegant). Both correctly swap. B fails because arr[i] is overwritten before arr[j] gets the original value.",
        algorithm: "Array Manipulation",
        estimated_time_seconds: 60
    },
    {
        id: 29,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have a string 'AABBBCC'. You want to compress it to 'A2B3C2' (character + count). What's the approach?",
        choices: [
            "Iterate through string, count consecutive characters, append char+count",
            "Sort the string first",
            "Use binary search",
            "Build a frequency array then output"
        ],
        correct_answer: "Iterate through string, count consecutive characters, append char+count",
        explanation: "Track current character and its count. When character changes, output previous char+count. This is run-length encoding. Sorting breaks consecutive runs. Frequency arrays lose position info.",
        algorithm: "String Processing",
        estimated_time_seconds: 75
    },
    {
        id: 30,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Bessie is at (0, 0). She receives N commands: 'N', 'S', 'E', 'W' (north, south, east, west). After all commands, she's at (3, -2). How many 'E' commands were there if 'N'=5, 'S'=7, 'W'=1?",
        choices: [
            "2",
            "3",
            "4",
            "5"
        ],
        correct_answer: "4",
        explanation: "Final x = E - W = 3, so E - 1 = 3, thus E = 4. Final y = N - S = 5 - 7 = -2 ✓. This is simulation with coordinate tracking.",
        algorithm: "Simulation",
        estimated_time_seconds: 75
    },
    {
        id: 31,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have N boxes with weights [5, 2, 8, 3]. You can carry at most 10 units. What's the maximum number of boxes you can carry?",
        choices: [
            "1 box (take the 8)",
            "2 boxes (5 + 2 or 5 + 3)",
            "3 boxes (2 + 3 + 5)",
            "4 boxes"
        ],
        correct_answer: "3 boxes (2 + 3 + 5)",
        explanation: "Greedy: sort by weight [2, 3, 5, 8], take smallest until capacity reached. 2+3+5=10 ✓. Can't add 8. This greedy approach maximizes count.",
        algorithm: "Greedy",
        estimated_time_seconds: 80
    },
    {
        id: 32,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Given a sorted array [1, 3, 5, 7, 9, 11], you want to find how many elements are greater than 6. What's the most efficient approach?",
        choices: [
            "Linear search counting elements > 6",
            "Binary search to find first element > 6, then count remaining",
            "Both work, but binary search is more efficient",
            "Sort the array first"
        ],
        correct_answer: "Both work, but binary search is more efficient",
        explanation: "Linear search is O(N). Binary search finds the position in O(log N), then count = n - position. Both work; binary search is optimal for sorted arrays. Already sorted, so no need to sort again.",
        algorithm: "Binary Search",
        estimated_time_seconds: 75
    },
    {
        id: 33,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have a list of N student scores. You want to find the median score. N ≤ 1000. What's the approach?",
        choices: [
            "Sort the array, return middle element (or average of two middle if even)",
            "Find max and min, return average",
            "Use frequency counting",
            "Binary search"
        ],
        correct_answer: "Sort the array, return middle element (or average of two middle if even)",
        explanation: "Median requires sorted order. Sort in O(N log N), then return arr[n//2] (odd) or average of arr[n//2-1] and arr[n//2] (even). Max/min average gives midrange, not median.",
        algorithm: "Sorting",
        estimated_time_seconds: 70
    },
    {
        id: 34,
        difficulty: "medium",
        type: "code_snippet",
        question: "Find the index of the first occurrence of value x in array arr of size n. Return -1 if not found.",
        choices: [
            "for i in range(n):\n    if arr[i] == x:\n        return i\nreturn -1",
            "for i in range(n):\n    if arr[i] == x:\n        return x\nreturn -1",
            "for i in range(1, n):\n    if arr[i] == x:\n        return i\nreturn -1",
            "for i in range(n):\n    if arr[i] != x:\n        return i\nreturn -1"
        ],
        correct_answer: "for i in range(n):\n    if arr[i] == x:\n        return i\nreturn -1",
        explanation: "Iterate from 0 to n-1, return index i when found. B returns value instead of index. C skips index 0. D returns index of first non-match (wrong logic).",
        algorithm: "Linear Search",
        estimated_time_seconds: 70
    },
    {
        id: 35,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have a 2D grid representing a field. '.' is grass, '#' is a rock. You start at (0,0) and want to reach (N-1, M-1) moving only right or down. What technique finds if a path exists?",
        choices: [
            "Depth-first search or breadth-first search",
            "Dynamic programming",
            "Simple simulation checking if any '#' blocks the path",
            "Both A and B work"
        ],
        correct_answer: "Both A and B work",
        explanation: "DFS/BFS explores reachable cells. DP tracks if each cell is reachable. Both work. Simple simulation doesn't handle all cases (rocks might not fully block). For Bronze, DFS is most common.",
        algorithm: "Graph Traversal",
        estimated_time_seconds: 85
    },
    {
        id: 36,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Given N intervals [start, end], find the maximum number of overlapping intervals at any point in time. N ≤ 100.",
        choices: [
            "For each point in time, count how many intervals contain it",
            "Sort intervals, use a sweep line with events",
            "Use brute force checking all pairs",
            "Both A and B work"
        ],
        correct_answer: "Both A and B work",
        explanation: "Brute force: check each time point. Sweep line: sort events (start/end), track active intervals. Both work for small N. Sweep line is more elegant and scales better.",
        algorithm: "Greedy",
        estimated_time_seconds: 85
    },
    {
        id: 37,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have a string 'racecar'. How do you check if it's a palindrome?",
        choices: [
            "Compare string with its reverse",
            "Use two pointers from both ends, check if characters match",
            "Sort the string and check",
            "Both A and B work"
        ],
        correct_answer: "Both A and B work",
        explanation: "Reversing and comparing works. Two pointers checking from ends also works. Both are O(N). Sorting doesn't check palindrome property (e.g., 'aab' sorted is 'aab' but not a palindrome).",
        algorithm: "String Processing",
        estimated_time_seconds: 70
    },
    {
        id: 38,
        difficulty: "medium",
        type: "multiple_choice",
        question: "Farmer John has N cows with arrival times [1, 3, 2, 5]. He milks them in arrival order. Each takes 2 minutes. When does the last cow finish?",
        choices: [
            "At time 8",
            "At time 9",
            "At time 10",
            "At time 11"
        ],
        correct_answer: "At time 9",
        explanation: "Sort by arrival: [1,2,3,5]. Cow 1 finishes at 1+2=3. Cow 2 starts at max(2,3)=3, finishes at 5. Cow 3 starts at max(3,5)=5, finishes at 7. Cow 4 starts at max(5,7)=7, finishes at 9.",
        algorithm: "Simulation",
        estimated_time_seconds: 85
    },
    {
        id: 39,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have an array of N integers. You want to find the length of the longest subarray where all elements are equal. N ≤ 1000.",
        choices: [
            "Use nested loops to check all subarrays O(N²)",
            "Iterate once, track current streak length, update max",
            "Sort the array first",
            "Use binary search"
        ],
        correct_answer: "Iterate once, track current streak length, update max",
        explanation: "Track current element and streak length. When element changes, reset streak. Update max streak. This is O(N). Nested loops work but are slower. Sorting loses position info.",
        algorithm: "Array Traversal",
        estimated_time_seconds: 75
    },
    {
        id: 40,
        difficulty: "medium",
        type: "multiple_choice",
        question: "You have coordinates of N points. You want to find how many points lie strictly inside a rectangle [x1, y1, x2, y2]. N ≤ 1000.",
        choices: [
            "For each point (x,y), check if x1 < x < x2 and y1 < y < y2",
            "Sort points by x-coordinate",
            "Use binary search",
            "Dynamic programming"
        ],
        correct_answer: "For each point (x,y), check if x1 < x < x2 and y1 < y < y2",
        explanation: "Iterate through points, check if each satisfies the rectangle bounds. This is O(N) simulation. Sorting and binary search don't help with 2D containment checks.",
        algorithm: "Coordinate Geometry",
        estimated_time_seconds: 70
    },

    // HARD BRONZE (Questions 41-50)
    {
        id: 41,
        difficulty: "hard",
        type: "multiple_choice",
        question: "You have N cows in a line, each facing 'L' or 'R'. A cow is 'happy' if the cow in front of it faces toward it. How do you count happy cows?",
        choices: [
            "For each cow i, check if cow i-1 faces 'R' or cow i+1 faces 'L'",
            "Count all 'L' cows and all 'R' cows",
            "Sort the cows by direction",
            "Use dynamic programming"
        ],
        correct_answer: "For each cow i, check if cow i-1 faces 'R' or cow i+1 faces 'L'",
        explanation: "A cow is happy if the cow in front faces toward it. For cow i: if i>0 and cow[i-1]=='R', or if i<n-1 and cow[i+1]=='L', it's happy. Check each cow individually.",
        algorithm: "Simulation",
        estimated_time_seconds: 90
    },
    {
        id: 42,
        difficulty: "hard",
        type: "multiple_choice",
        question: "Given N intervals [start, end], find the minimum number of intervals to remove so that no two intervals overlap. N ≤ 1000.",
        choices: [
            "Sort by end time, greedily select non-overlapping intervals, remove the rest",
            "Sort by start time, remove overlaps",
            "Use dynamic programming",
            "Check all possible subsets"
        ],
        correct_answer: "Sort by end time, greedily select non-overlapping intervals, remove the rest",
        explanation: "Classic interval scheduling. Sort by end time, greedily pick intervals that don't overlap. Count selected intervals, subtract from N to get removals. This is optimal greedy.",
        algorithm: "Greedy",
        estimated_time_seconds: 90
    },
    {
        id: 43,
        difficulty: "hard",
        type: "multiple_choice",
        question: "You have a grid where some cells are blocked. Starting at (0,0), you can move right or down. How many distinct paths reach (N-1, M-1)? N, M ≤ 20.",
        choices: [
            "Use recursion with memoization or DP: paths[i][j] = paths[i-1][j] + paths[i][j-1]",
            "Use BFS to count all paths",
            "Brute force all possible paths",
            "Use greedy selection"
        ],
        correct_answer: "Use recursion with memoization or DP: paths[i][j] = paths[i-1][j] + paths[i][j-1]",
        explanation: "DP is ideal. paths[i][j] = paths from above + paths from left (if not blocked). Base case: paths[0][0]=1. This counts all distinct paths efficiently in O(N*M).",
        algorithm: "Dynamic Programming",
        estimated_time_seconds: 90
    },
    {
        id: 44,
        difficulty: "hard",
        type: "code_snippet",
        question: "Find the longest increasing subsequence length in array arr of size n using a simple O(N²) approach.",
        choices: [
            "dp = [1]*n\nfor i in range(n):\n    for j in range(i):\n        if arr[j] < arr[i]:\n            dp[i] = max(dp[i], dp[j]+1)\nreturn max(dp)",
            "count = 1\nfor i in range(1, n):\n    if arr[i] > arr[i-1]:\n        count += 1\nreturn count",
            "dp = [0]*n\nfor i in range(n):\n    for j in range(i):\n        if arr[j] < arr[i]:\n            dp[i] = dp[j]+1\nreturn max(dp)",
            "return n"
        ],
        correct_answer: "dp = [1]*n\nfor i in range(n):\n    for j in range(i):\n        if arr[j] < arr[i]:\n            dp[i] = max(dp[i], dp[j]+1)\nreturn max(dp)",
        explanation: "Classic DP LIS. dp[i] = longest increasing subsequence ending at i. For each i, check all j<i where arr[j]<arr[i], update dp[i]. B only finds consecutive increases. C initializes wrong.",
        algorithm: "Dynamic Programming",
        estimated_time_seconds: 90
    },
    {
        id: 45,
        difficulty: "hard",
        type: "multiple_choice",
        question: "You have N tasks with deadlines and profits. You can do one task per day. How do you maximize profit? N ≤ 100.",
        choices: [
            "Sort by profit descending, greedily schedule tasks before their deadlines",
            "Sort by deadline, do tasks in order",
            "Use dynamic programming",
            "Brute force all permutations"
        ],
        correct_answer: "Sort by profit descending, greedily schedule tasks before their deadlines",
        explanation: "Greedy: sort by profit (high to low). For each task, schedule it on the latest available day before its deadline. This maximizes profit. Sorting by deadline alone doesn't optimize profit.",
        algorithm: "Greedy",
        estimated_time_seconds: 90
    },
    {
        id: 46,
        difficulty: "hard",
        type: "multiple_choice",
        question: "Given a string, find the length of the longest substring without repeating characters. Example: 'abcabcbb' → 3 ('abc').",
        choices: [
            "Use sliding window with a hash set to track characters in current window",
            "Check all substrings with nested loops O(N³)",
            "Sort the string first",
            "Use binary search"
        ],
        correct_answer: "Use sliding window with a hash set to track characters in current window",
        explanation: "Sliding window: expand right, add characters to set. If duplicate found, shrink from left until no duplicate. Track max length. This is O(N). Nested loops work but are O(N²) or O(N³).",
        algorithm: "Sliding Window",
        estimated_time_seconds: 90
    },
    {
        id: 47,
        difficulty: "hard",
        type: "multiple_choice",
        question: "You have N sticks of different lengths. You want to form the maximum number of triangles (each triangle uses 3 sticks). What's the approach?",
        choices: [
            "Sort sticks, greedily form triangles checking triangle inequality",
            "Use all combinations of 3 sticks",
            "Dynamic programming",
            "Binary search"
        ],
        correct_answer: "Sort sticks, greedily form triangles checking triangle inequality",
        explanation: "Sort sticks. Greedily try to form triangles from largest sticks first (or smallest). Check triangle inequality: a+b>c. Mark used sticks. This is greedy with O(N log N) sort.",
        algorithm: "Greedy",
        estimated_time_seconds: 90
    },
    {
        id: 48,
        difficulty: "hard",
        type: "multiple_choice",
        question: "You have a 2D grid. Find the size of the largest connected component of '1's (4-directional connectivity). Grid is N×M, N,M ≤ 50.",
        choices: [
            "Use DFS or BFS from each unvisited '1', count cells in component",
            "Count all '1's in the grid",
            "Use dynamic programming",
            "Sort the grid"
        ],
        correct_answer: "Use DFS or BFS from each unvisited '1', count cells in component",
        explanation: "For each unvisited '1', run DFS/BFS to explore the entire connected component, counting cells. Track max size. This is flood fill. Simply counting '1's doesn't identify components.",
        algorithm: "Graph Traversal",
        estimated_time_seconds: 90
    },
    {
        id: 49,
        difficulty: "hard",
        type: "multiple_choice",
        question: "Given N integers, find the maximum sum of any contiguous subarray. Example: [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1]).",
        choices: [
            "Kadane's algorithm: track current_sum and max_sum, reset current_sum if negative",
            "Check all subarrays with nested loops O(N²)",
            "Sort the array",
            "Use binary search"
        ],
        correct_answer: "Kadane's algorithm: track current_sum and max_sum, reset current_sum if negative",
        explanation: "Kadane's algorithm is O(N): current_sum = max(arr[i], current_sum + arr[i]), max_sum = max(max_sum, current_sum). Nested loops work but are O(N²). Sorting loses subarray structure.",
        algorithm: "Dynamic Programming",
        estimated_time_seconds: 90
    },
    {
        id: 50,
        difficulty: "hard",
        type: "multiple_choice",
        question: "You have N cows at positions on a number line. You want to place K barns to minimize the maximum distance any cow travels. What technique is appropriate?",
        choices: [
            "Binary search on the answer (max distance), check if K barns can cover all cows",
            "Greedy: place barns at cow positions",
            "Dynamic programming",
            "Sort cows and place barns evenly"
        ],
        correct_answer: "Binary search on the answer (max distance), check if K barns can cover all cows",
        explanation: "Binary search on max distance. For each candidate distance, greedily check if K barns can cover all cows within that distance. This is a classic 'binary search on answer' problem.",
        algorithm: "Binary Search on Answer",
        estimated_time_seconds: 90
    }
];

// Function to get a random quiz of 10 questions
function generateQuiz() {
    // Separate questions by difficulty
    const easy = questionBank.filter(q => q.difficulty === 'easy');
    const medium = questionBank.filter(q => q.difficulty === 'medium');
    const hard = questionBank.filter(q => q.difficulty === 'hard');
    
    // Randomly select questions according to requirements
    const selectedEasy = getRandomQuestions(easy, 3);
    const selectedMedium = getRandomQuestions(medium, 5);
    const selectedHard = getRandomQuestions(hard, 2);
    
    // Combine and shuffle
    const quiz = [...selectedEasy, ...selectedMedium, ...selectedHard];
    return shuffleArray(quiz);
}

// Helper function to get N random questions from an array
function getRandomQuestions(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}

// Helper function to shuffle array
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
