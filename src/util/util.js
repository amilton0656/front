export const cpfMask = value => {
      if (value.length === 0) return value
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  export const cnpjMask = value => {
      if (value.length === 0) return value
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  export const cepMask = value => {
      if (value.length === 0) return value
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  export const cpfFormat = value => {
        value = value.replace(/\D/g, '')
      if (value.length === 0) return value
      let a = value.replace(/\D/g, '')
      let b=a.substring(0,3)
      if (a.length > 3) b = b + '.' + a.substring(3,6)
      if (a.length > 6) b = b + '.' + a.substring(6,9)
      if (a.length > 9) b = b + '-' + a.substring(9,11)
      return b
  }

export const cnpjFormat = value => {
      if (value.length === 0) return value
    let a = value.replace(/\D/g, '')
    let b=a.substring(0,2)
    if (a.length > 2) b = b + '.' + a.substring(2,5)
    if (a.length > 5) b = b + '.' + a.substring(5,8)
    if (a.length > 8) b = b + '/' + a.substring(8,12)
    if (a.length > 12) b = b + '-' + a.substring(12,14)
    return b
}

export const clearFormat = value => {
      if (value === undefined) return value
      if (value.length === 0) return value
  return value.replace(/\D/g, '')
}

export const validarCPF = (cpf) => {
      if (cpf.length === 0) return false
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11)
        return false;
  for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1))
              {
              digitos_iguais = 0;
              break;
              }
  if (!digitos_iguais)
        {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
              soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
              return false;
        numeros = cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--)
              soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return false;
        return true;
        }
  else
      return false;
}

export const validarCNPJ = (s) => {
      if (s.length === 0) return s
	let cnpj = s.replace(/[^\d]+/g, '')

	// Valida a quantidade de caracteres
	if (cnpj.length !== 14)
		return false

	// Elimina inválidos com todos os caracteres iguais
	if (/^(\d)\1+$/.test(cnpj))
		return false

	// Cáculo de validação
	let t = cnpj.length - 2,
		d = cnpj.substring(t),
		d1 = parseInt(d.charAt(0)),
		d2 = parseInt(d.charAt(1)),
		calc = x => {
			let n = cnpj.substring(0, x),
				y = x - 7,
				s = 0,
				r = 0

				for (let i = x; i >= 1; i--) {
					s += n.charAt(x - i) * y--;
					if (y < 2)
						y = 9
				}

				r = 11 - s % 11
				return r > 9 ? 0 : r
		}

	return calc(t) === d1 && calc(t + 1) === d2
}

export const formatarNumero = (n) => {
      var n = n.toString();
      var r = '';
      var x = 0;
  
      for (var i = n.length; i > 0; i--) {
          r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? '.' : '');
          x = x == 2 ? 0 : x + 1;
      }
  
      return r.split('').reverse().join('');
  }

  export const formatarData = data => {
      return data
  }

  export const convertToReal = (number, options = {}) => {



      const { moneySign = false } = options;
  
      if(Number.isNaN(number) || !number) return 
  
      if(typeof number === "string") { // n1
          number = Number(number);
      }
  
      let res;
  
      const config = moneySign ? {style: 'currency', currency: 'BRL'} : {minimumFractionDigits: 2};
  
      moneySign
      ? res = number.toLocaleString('pt-BR', config)
      : res = number.toLocaleString('pt-BR', config)
  
      const needComma = number => number <= 1000;
      if(needComma(number)) {
          res = res.toString().replace(".", ",");
      }
  
      return res; // n2

//       const numero = 123456789.98
//     var dinheiro = numero.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  export const isMobile = () => {
      let isMobile = false

      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
            isMobile = true
      } else if (userAgent.match(/Android/i)) {
          isMobile = true;
      }

      return isMobile
  }
