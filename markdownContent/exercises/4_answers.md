# Exercise Answers: Computational Thinking in Linguistics

## Exercise 1: Decomposition Practice

### Breaking down the text comparison problem:

1. **Sub-problems**:
   - Text preprocessing
   - Word comparison
   - Difference analysis
   - Results presentation

2. **Input/Output for each sub-problem**:
   ```
   Text preprocessing:
   - Input: Raw text
   - Output: Cleaned, normalized text
   
   Word comparison:
   - Input: Two preprocessed texts
   - Output: List of matching and different words
   
   Difference analysis:
   - Input: Comparison results
   - Output: Statistical summary of differences
   
   Results presentation:
   - Input: Analysis results
   - Output: Formatted report
   ```

3. **Basic flowchart**:
   ```
   Raw Texts → Clean Texts → Compare Words → Analyze Differences → Present Results
   ```

## Exercise 2: Pattern Recognition in Text

### Analysis of the sentences:

1. **Common Patterns**:
   ```python
   # Structure pattern:
   "The [adjective] [noun] [adverb] [verb] [preposition] the [noun]"
   
   # Components:
   - Always starts with "The"
   - Contains exactly 7 words
   - Follows subject-verb-object structure
   - Uses same grammatical pattern
   ```

2. **Sentence Structure**:
   ```python
   # We can represent each sentence as a dictionary
   sentence1 = {
       "determiner": "The",
       "adjective": "small",
       "subject": "cat",
       "adverb": "quickly",
       "verb": "jumped",
       "preposition": "over",
       "object": "fence"
   }

   # We can create a function to break down any sentence following this pattern
   def analyze_sentence(text):
       words = text.split()
       return {
           "determiner": words[0],    # The
           "adjective": words[1],     # small/big/tiny
           "subject": words[2],       # cat/dog/mouse
           "adverb": words[3],        # quickly/slowly/quietly
           "verb": words[4],          # jumped/walked/ran
           "preposition": words[5],   # over/under/through
           "object": words[7]         # fence/gate/hole (after 'the')
       }

   # Test with our example sentences
   sentence1 = analyze_sentence("The small cat quickly jumped over the fence")
   sentence2 = analyze_sentence("The big dog slowly walked under the gate")
   sentence3 = analyze_sentence("The tiny mouse quietly ran through the hole")
   ```

3. **Linguistic Patterns**:
   - Consistent subject-verb-object order
   - Similar semantic roles (animal + movement + location)
   - Parallel adjective-noun combinations

## Exercise 3: Abstraction Challenge

### Finding the Main Topic in Text

Here's a simple way to find the main topic in a text:

```python
# Step 1: Make a list of common words we want to ignore
common_words = ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for"]

def find_main_topic(text):
    # Step 2: Clean the text
    text = text.lower()
    
    # Step 3: Split text into words
    words = text.split()
    
    # Step 4: Count important words (not in common_words)
    word_counts = {}
    for word in words:
        if word not in common_words:
            # Add to dictionary or increase count
            if word in word_counts:
                word_counts[word] += 1
            else:
                word_counts[word] = 1
    
    # Step 5: Find the most common word
    most_common_word = ""
    highest_count = 0
    
    for word, count in word_counts.items():
        if count > highest_count:
            most_common_word = word
            highest_count = count
    
    return most_common_word

# Test the function
text = """
The cat sat on the mat. 
The cat was happy. 
The cat played with a toy.
"""

main_topic = find_main_topic(text)
print(f"The main topic is: {main_topic}")  # Should print: "cat"
```

## Exercise 4: Algorithm Development

Here's a simple word counter that groups similar words together:

```python
def count_word_groups(text):
    # Step 1: List of words to ignore
    ignore_words = ["the", "and", "in"]
    
    # Step 2: Clean and split text
    words = text.lower().split()
    
    # Step 3: Count words (grouping similar ones)
    word_groups = {}
    
    for word in words:
        # Skip words we want to ignore
        if word in ignore_words:
            continue
            
        # Remove 's' from end of words
        if word.endswith('s'):
            word = word[:-1]
            
        # Remove 'ing' from end of words    
        if word.endswith('ing'):
            word = word[:-3]
        
        # Count the word
        if word in word_groups:
            word_groups[word] += 1
        else:
            word_groups[word] = 1
    
    # Step 4: Find top 3 words
    # Sort words by count (highest first)
    sorted_words = sorted(word_groups.items(), 
                         key=lambda x: x[1], 
                         reverse=True)
    
    # Get top 3 words
    top_words = sorted_words[:3]
    
    return top_words

# Test the function
test_text = """
The cats are running and jumping.
Many cats like running around.
The cat jumps high.
"""

results = count_word_groups(test_text)
print("Top 3 most common words:")
for word, count in results:
    print(f"'{word}': {count} times")
```

This code:
1. Removes common words like "the" and "and"
2. Groups similar words together (like "cat" and "cats")
3. Shows the top 3 most used words

When we test it with our example, it will group:
- "cats", "cat" → "cat"
- "running", "run" → "run"
- "jumping", "jumps" → "jump"

## Exercise 5: Practical Application

### Children's Story Analysis Solution:

```python
def analyze_story_vocabulary(story):
    # DECOMPOSITION: Break into tasks
    
    # 1. Word length classification
    def classify_word_length(word):
        if len(word) <= 3:
            return "short"
        elif len(word) <= 6:
            return "medium"
        else:
            return "long"
    
    # 2. Count unique words
    def get_unique_words(words):
        return set(words)
    
    # 3. Find repeated phrases
    def find_repeated_phrases(text, phrase_length=3):
        words = text.split()
        phrases = {}
        for i in range(len(words) - phrase_length + 1):
            phrase = " ".join(words[i:i + phrase_length])
            phrases[phrase] = phrases.get(phrase, 0) + 1
        return {p: c for p, c in phrases.items() if c > 1}
    
    # Main analysis
    words = story.lower().split()
    analysis = {
        "length_categories": {
            "short": 0,
            "medium": 0,
            "long": 0
        },
        "unique_words": len(get_unique_words(words)),
        "repeated_phrases": find_repeated_phrases(story)
    }
    
    # Count word lengths
    for word in words:
        category = classify_word_length(word)
        analysis["length_categories"][category] += 1
    
    return analysis
```

## Exercise 6: Integration Challenge

### Translation Comparison Solution:

1. **Problem Breakdown**:
   - Text normalization
   - Word comparison
   - Synonym detection
   - Similarity scoring

2. **Patterns**:
   - Similar meaning words (cold/chilly, strong/powerful)
   - Shared grammatical structure
   - Equivalent phrases

3. **Important Information**:
   - Core meaning of words
   - Sentence structure
   - Key concepts

4. **Comparison Plan**:
   ```python
   def compare_translations(text1, text2):
       # 1. Normalize texts
       normalized1 = normalize_text(text1)
       normalized2 = normalize_text(text2)
       
       # 2. Find exact matches
       exact_matches = find_matching_words(normalized1, normalized2)
       
       # 3. Find similar meanings
       similar_words = find_synonyms(normalized1, normalized2)
       
       # 4. Calculate similarity score
       similarity = calculate_similarity(exact_matches, similar_words)
       
       return {
           "exact_matches": exact_matches,
           "similar_words": similar_words,
           "similarity_score": similarity
       }
   ```

## Bonus Challenge: Plagiarism Detector

### Solution Approach:

```python
def detect_plagiarism(text1, text2):
    # DECOMPOSITION: Break into components
    
    # 1. Text preprocessing
    def preprocess(text):
        return text.lower().split()
    
    # 2. Find common phrases
    def find_common_phrases(words1, words2, phrase_length=3):
        phrases1 = get_phrases(words1, phrase_length)
        phrases2 = get_phrases(words2, phrase_length)
        return phrases1.intersection(phrases2)
    
    # 3. Calculate similarity score
    def calculate_similarity(common_phrases, total_phrases):
        return len(common_phrases) / total_phrases if total_phrases > 0 else 0
    
    # Main detection logic
    words1 = preprocess(text1)
    words2 = preprocess(text2)
    
    common_phrases = find_common_phrases(words1, words2)
    similarity_score = calculate_similarity(
        common_phrases,
        max(len(words1), len(words2))
    )
    
    return {
        "common_phrases": list(common_phrases),
        "similarity_score": similarity_score,
        "plagiarism_detected": similarity_score > 0.3  # Threshold
    }
```

Remember: These solutions demonstrate the computational thinking process. There might be multiple valid approaches to each problem! 