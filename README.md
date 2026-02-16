# 🏆 USACO Bronze Prep - Quick Quiz

A focused, mobile-friendly quiz app for mastering USACO Bronze competitive programming concepts through 60-second micro-practice sessions.

## Features

- **10-Question Quizzes**: Randomly selected from a bank of 50+ Bronze-level questions
- **Difficulty Mix**: 3 easy, 5 medium, 2 hard Bronze questions per quiz
- **Algorithm Coverage**: Simulation, arrays, sorting, greedy, counting, hash sets, brute force, strings, grids, and more
- **Instant Feedback**: Immediate explanations after each answer
- **Performance Tracking**: Identifies weak areas by algorithm category
- **Mobile-Optimized**: Clean, distraction-free interface perfect for quick practice sessions
- **Timer**: Track your total quiz time
- **Progress Bar**: Visual feedback on quiz completion

## How to Use

1. Open `index.html` in your web browser
2. Click "Start Quiz" to begin
3. Read each question carefully (designed to be answered in 60-90 seconds)
4. Select your answer from the 4 choices
5. Review the explanation to understand the concept
6. Click "Next Question" to continue
7. View your results and identify areas to focus on
8. Click "Take Another Quiz" for a fresh set of questions

## Question Types

- **Algorithm Recognition**: Identify the best approach for a problem
- **Complexity Analysis**: Determine time/space complexity
- **Code Snippets**: Recognize or mentally construct short code blocks
- **Pattern Matching**: Apply Bronze-level techniques to scenarios

## Files

- `index.html` - Quiz interface structure
- `style.css` - Modern gradient styling and responsive design
- `script.js` - Quiz logic, timer, and results tracking
- `questions.js` - Question bank with 50+ USACO Bronze questions

## Technologies Used

- HTML5
- CSS3 (Flexbox, Animations, Responsive Design)
- Vanilla JavaScript (ES6+)

## Running the App

Simply open `index.html` in any modern web browser. No build process or dependencies required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended for development)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Question Bank Structure

Each question includes:
- **Difficulty**: easy, medium, or hard (Bronze level)
- **Type**: multiple_choice or code_snippet
- **Question**: Clear, concise problem statement (< 120 words)
- **Choices**: 4 answer options
- **Correct Answer**: The one correct solution
- **Explanation**: Why the answer is correct and others are wrong (< 80 words)
- **Algorithm**: Category tag (e.g., "Simulation", "Greedy", "Array Traversal")
- **Estimated Time**: Target completion time (60-90 seconds)

## Customization

You can easily customize the app by:

- **Adding Questions**: Edit `questions.js` to add more questions to the bank
- **Adjusting Difficulty Mix**: Modify `generateQuiz()` in `questions.js` to change the ratio
- **Styling**: Edit gradient colors and UI elements in `style.css`
- **Quiz Length**: Change the number of questions selected in `generateQuiz()`

## Performance Tracking

After completing a quiz, you'll see:
- **Overall Score**: Correct answers out of 10
- **Time Taken**: Total quiz duration
- **Algorithm Breakdown**: Performance by algorithm category
- **Weak Areas**: Algorithms where you scored < 50% (focus areas)

## Learning Strategy

This app is designed for:
- **Quick Daily Practice**: 10-minute focused sessions
- **Pattern Recognition**: Train your brain to identify algorithms quickly
- **Mobile Learning**: Practice anywhere, anytime
- **Iterative Improvement**: Track weak areas and retake quizzes

## License

Free to use and modify as you wish!
