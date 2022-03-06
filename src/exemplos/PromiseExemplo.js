

const PromiseExemplo = (a) => {
    
    return new Promise((resolve, reject) => {
        if (a > 10) {
            resolve( {out: 'Maior que dez'})
        } else {
            reject( {out: 'Menor ou igual que dez'})
        }
    })

}


 
PromiseExemplo(5)
    .then(result => console.log(result))
    .catch(result => console.log(result))