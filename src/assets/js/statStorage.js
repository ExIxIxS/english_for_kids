/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

class StatStorage {
  constructor(topicsArr, cardsArr) {
    this.topicsArr = topicsArr;
    this.cardsArr = cardsArr;
    this.statArr = JSON.parse(localStorage.getItem('EnglishForKids'));
    if (!this.statArr) {
      this
        .build()
        .updateStorage();
    }
  }

  build() {
    const statDataArr = [];
    this.topicsArr.forEach((topiName, index) => {
      const topicCardsArr = this.cardsArr[index];

      topicCardsArr.forEach((wordObj) => {
        const statWordObj = {
          topic: topiName,
          word: wordObj.word,
          translation: wordObj.translation,
          trainClick: 0,
          correctAnswers: 0,
          mistakes: 0,
          percentage: 0,
          image: wordObj.image,
          audioSrc: wordObj.audioSrc,
        };
        statDataArr.push(statWordObj);
      });
    });
    this.statArr = statDataArr;
    return this;
  }

  updateStorage() {
    localStorage.setItem('EnglishForKids', JSON.stringify(this.statArr));
    return this;
  }

  cleanStorage() {
    localStorage.setItem('EnglishForKids', JSON.stringify(''));
    this
      .build()
      .updateStorage();
    return this;
  }

  add(type, cardObj) {
    const objIndex = this.statArr.findIndex((wordObj) => {
      const result = (wordObj.word === cardObj.word)
            && (wordObj.translation === cardObj.translation);
      return result;
    });

    switch (type) {
      case 'click': {
        this.statArr[objIndex].trainClick += 1;
        break;
      }
      case 'correct': {
        this.statArr[objIndex].correctAnswers += 1;
        break;
      }
      case 'wrong': {
        this.statArr[objIndex].mistakes += 1;
        break;
      }
      default:
        break;
    }

    const corrAnsw = this.statArr[objIndex].correctAnswers;
    const wrongAnsw = this.statArr[objIndex].mistakes;
    if (corrAnsw && wrongAnsw) {
      this.statArr[objIndex].percentage = Math.round((corrAnsw / (corrAnsw + wrongAnsw)) * 100);
    } else if (corrAnsw) {
      this.statArr[objIndex].percentage = 100;
    }

    this.updateStorage();
    return this;
  }

  getSortedArrByProp(property, sortType = 'down') {
    const sortedArr = [];
    this.statArr.forEach((item) => sortedArr.push(item));

    function compareFunction(objA, objB) {
      if (objA[property] > objB[property]) {
        return 1;
      }
      if (objA[property] < objB[property]) {
        return -1;
      }
      return 0;
    }

    if (sortType === 'down') {
      sortedArr.sort((a, b) => compareFunction(a, b));
    } else {
      sortedArr.sort((a, b) => compareFunction(b, a));
    }
    return sortedArr;
  }

  getDiffWordsArr() {
    const sortedArr = this.getSortedArrByProp('percentage', 'down');
    const resultArr = sortedArr.filter((item) => item.percentage > 0 && item.percentage < 100);
    return resultArr;
  }
}

export default StatStorage;
