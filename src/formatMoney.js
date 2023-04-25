// function to format money
// put commas in the right places

const formatMoney = (money) => {
    const moneyString = money.toString();
    const moneyLength = moneyString.length;
    let formattedMoney = '';
    let counter = 0;
    for (let i = moneyLength - 1; i >= 0; i--) {
        if (counter === 3) {
        formattedMoney = ',' + formattedMoney;
        counter = 0;
        }
        formattedMoney = moneyString[i] + formattedMoney;
        counter++;
    }
    return formattedMoney;
    }

export default formatMoney;