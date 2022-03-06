import PrintPDF from "../components/PrintPDF";
import classes from './Documento.module.css'


const Documento = () => {
  return ( 
    <PrintPDF title='Título do Documento'>
    <div>
      Teste documento
      Teste documento
      <div className={classes.newPage}></div>
      Teste documento
      Teste documento
      Teste documento
    </div>

    </PrintPDF>
   );
}
 
export default Documento;