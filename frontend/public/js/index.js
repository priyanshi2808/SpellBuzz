$.getJSON(
    "https://random-words-api.vercel.app/word", function(data){
        console.log(data);

        var word = data[0].word;
        $(".oriWord").text(word);
        var definition = data[0].definition;

        const scrambleWords = (arr) => {
            for(let i=arr.length-1;i>0;i--)
            {
              let temp = arr[i];
              let j = Math.floor(Math.random()*(i+1));
  
              arr[i] = arr[j];
              arr[j] = temp;
            }
  
            return arr;
          }

        var ranWord = scrambleWords(word.split(""));
        ranWord.join("");

        $(".msg").text(ranWord);
        $(".meaning").text(definition);
    }
);