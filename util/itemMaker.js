const itemMaker = (family, instrument) => {
    const age = ['New', 'Used', 'Antique'];
    const level = ['Professional', 'Student', 'Amateur'];

    const arr = [];

    age.forEach(old => {
        level.forEach(grade => {
            const price = ((Math.random() + 1) * 2000).toFixed(2);
            const stock = Math.round(Math.random() * 10);
            
            arr.push({
                name: `${old} ${grade} ${instrument}`,
                family: family,
                description: `${old} ${grade} ${instrument} that you can buy here!`,
                price: price,
                num_in_stock: stock
            });
        })
    });

    return arr
};

itemMaker();

module.exports = itemMaker;