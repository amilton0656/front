import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";

import classes from './PrintPDF.module.css'

// import "./styles.css";
const ref = React.createRef();


const PrintPDF = (props) => {
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.containerButton}>
          <Pdf targetRef={ref} filename="code-example.pdf" >

            {({ toPdf }) => <button onClick={toPdf} ><span>Gerar Pdf</span></button>}

          </Pdf>
        </div>
        <div className={classes.headerTitle}>
        {props.title}

        </div>

      </div>
      <div ref={ref}>
        {props.children}
      </div>
    </div>
  );
}

export default PrintPDF;