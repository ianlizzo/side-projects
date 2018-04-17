import requests

word_site = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
response = requests.get(word_site)
secret_word = response.json()["word"].lower()

def guess_word():
    dashes = "-" * len(secret_word)
    guesses_left = 10
    guesses = []
    print (dashes)
    while guesses_left > 0 and not dashes == secret_word:
        print ("Number of guesses left: " + str(guesses_left))
        guess = input('Guess: ')

        if guess in secret_word:
            print ("Its in the word!")
            dashes = update_dashes(secret_word, dashes, guess)
        else:
            print ("Not in word")
            dashes = update_dashes(secret_word, dashes, guess)
            guesses_left-=1
        guesses.append(guess)
        print(str(guesses))
        print(dashes)

    if guesses_left == 0:
        print ("You lose! Your word was: " + secret_word)

    if dashes == secret_word:
        print ("Congrats! You won!")



#this function updates number of dashes to print after a guess
def update_dashes(secret, cur_dash, rec_guess):
  result = ""

  for i in range(len(secret)):
    if secret[i] == rec_guess:
      result = result + rec_guess
    else:
      result = result + cur_dash[i]

  return result


guess_word()
