import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const UsuarioListaPdf = (usuarios) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
            text: 'Lista de Usuários',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left top right bottom
        }
    ]

    const usuariosData = usuarios.map(cli => {
        return [
            {text: cli.id, fontSize: 10},
            {text: cli.nome, fontSize: 10},
            {text: cli.email, fontSize: 10}
        ]
    })

    const details = [
        {
            table: {
                headerRows: 1,
                widths: [50, '*', '*'],
                body: [
                    [
                        {text: 'Código', style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2]},
                        {text: 'Nome', style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2]},
                        {text: 'Email', style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2]}
                    ],
                    ...usuariosData
                ]
            },
            layout: 'headerLineOnly'
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
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download()



    return ( 
        <div>UsuarioListaPdf</div>
     );
}
 
export default UsuarioListaPdf;