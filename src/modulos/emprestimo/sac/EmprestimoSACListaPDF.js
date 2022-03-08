import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { convertToReal } from '../../../util/util'
import './EmprestimoSACListaPDF.css'

const EmprestimoSACListaPDF = (formData, listaPDF, totalDesembolso) => {

  pdfMake.fonts = {
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
  }

    console.log('dentro do pdf ', formData, listaPDF)

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
            text: 'Simulação - SAC',
            fontSize: 15,
            bold: false,
            margin: [25, 20, 0, 45] // left top right bottom
        }
    ]

    const planData = listaPDF.map(cli => {
        return [
            {text: cli.mes, style: {alignment: 'right'}},
            {text: cli.aporte, style: {alignment: 'right'}},
            {text: cli.juros, style: {alignment: 'right'}},
            {text: cli.amortizacao, style: {alignment: 'right'}},
            {text: cli.desembolso, style: {alignment: 'right'}},
            {text: cli.saldo, style: {alignment: 'right'}}
        ]
    })

    const details = [
        {
          layout: 'noBorders', // optional
        
	// layout: {
	// 	hLineWidth: function (i, node) {
	// 		return 0.75;
	// 	},
	// 	vLineWidth: function (i, node) {
	// 		return 0.75;
	// 	}
	// },
          table: {
            headerRows: 1,
            widths: [ '25%', '15%', '15%', '25%', '15%' ],
    
            body: [
                [ 'Valor do empréstimo:', {text: convertToReal(formData.valorEmprestimo), style: {alignment: 'right'}}, '',
                  'Carência (em meses):', {text: formData.carencia, style: {alignment: 'right'}}],

                [ 'Caução (Percentual):', {text: convertToReal(formData.caucaoPerc), style: {alignment: 'right'}}, '',
                  'Caução (Valor):', {text: convertToReal(formData.caucaoValor), style: {alignment: 'right'}}],

                [ 'Qtde meses (Aporte):', {text: convertToReal(formData.aporteMeses), style: {alignment: 'right'}}, '',
                  'Aporte Mensal:', {text: convertToReal(formData.aporteValor), style: {alignment: 'right'}}],

                [ 'Qtde meses (Amort):', {text: convertToReal(formData.amortizacaoMeses), style: {alignment: 'right'}}, '',
                  'Amortização Mensal:', {text: convertToReal(formData.amortizacaoValor), style: {alignment: 'right'}}],

                [ 'Taxa Juros (% a.a.):', {text: convertToReal(formData.taxaJurosAA), style: {alignment: 'right'}}, '',
                  'Taxa Juros (% a.m.):', {text: convertToReal(formData.taxaJurosAM), style: {alignment: 'right'}}],

                [ 'Comissão (1) - Perc:', {text: convertToReal(formData.comissao1Perc), style: {alignment: 'right'}}, '',
                  'Comissão (1) - Valor:', {text: convertToReal(formData.comissao1Valor), style: {alignment: 'right'}}],

                [ 'Comissão (2) - Perc:', {text: convertToReal(formData.comissao2Perc), style: {alignment: 'right'}}, '',
                  'Comissão (2) - Valor:', {text: convertToReal(formData.comissao2Valor), style: {alignment: 'right'}}],

                  [ 'Total do desembolso', {text: convertToReal(totalDesembolso), style: {alignment: 'right'}}, '',
                  '', {text: ''}]

                ]
            },
            
        },
        {
            layout: 'headerLineOnly', // optional
            
            table: {
              headerRows: 1,
              widths: [ '10%', '17%', '17%', '17%', '17%', '17%' ],
      
              body: [
                    [{text: '', style: 'tableHeader'}, {text: '', style: 'tableHeader'}, {text: '', style: 'tableHeader'},
                    {text: '', style: 'tableHeader'}, {text: '', style: 'tableHeader'}, {text: '', style: 'tableHeader'}],
                    ['', '', '', '', '', '']
                  ]
              },
              
          },
          {
              layout: 'headerLineOnly', // optional
              table: {
                headerRows: 1,
                widths: [ '10%', '17%', '17%', '17%', '17%', '17%' ],
        
                body: [
                      [{text: 'Mês', style: {alignment: 'right', border: [true, true, true, true],}}, {text: 'Aporte', style: {alignment: 'right'}}, {text: 'Juros', style: {alignment: 'right'}},
                      {text: 'Amortização', style: {alignment: 'right'}}, {text: 'Desembolso', style: {alignment: 'right'}}, {text: 'Saldo', style: {alignment: 'right'}}],
                      ...planData
                    ]
                },
                
            }
]

    const rodape = (currentPage, pageCount) => {
        return [
            {
                text: currentPage + '/' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] 
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [25, 50, 0, 40],

        header: [reportTitle],
        content: [details],
        footer: rodape,
        defaultStyle: {
          font: 'Roboto'
        }
    }

    pdfMake.createPdf(docDefinitions).download()



    return ( 
        <div>EmprestimoSACListaPDF</div>
     );
}
 
export default EmprestimoSACListaPDF;