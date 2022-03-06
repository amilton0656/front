import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const PessoaFichaCadastralPdf = (formDataI, formDataII) => {

    const tipoPessoax = formDataI === '2' ? 'Jurídica' : 'Física'

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
            text: 'Ficha Cadastral',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left top right bottom
        }
    ]

    // const usuariosData = usuarios.map(cli => {
    //     return [
    //         {text: cli.id, fontSize: 10},
    //         {text: cli.nome, fontSize: 10},
    //         {text: cli.email, fontSize: 10}
    //     ]
    // })

    const details = [
        {
          layout: 'noBorders', // optional
          table: {
            headerRows: 1,
            widths: [ '20%', '*' ],
    
            body: [
                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

                [ 'Tipo de Pesssoa:', tipoPessoax ],
                [ 'CPF:', formDataI.cpf_cnpj ],  
                [ 'Nome:', formDataI.nome ],
                [ 'CEP:', formDataI.cep ],
                [ 'Endereço:', formDataI.endereco ],
                [ 'Complemento:', formDataI.complemento ],
                [ 'Bairro:', formDataI.bairro ],
                [ 'Município:', formDataI.municipio ],
                [ 'UF:', formDataI.uf ],

            ]
    }}
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
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download()



    return ( 
        <div>PessoaFichaCadastralPdf</div>
     );
}
 
export default PessoaFichaCadastralPdf;