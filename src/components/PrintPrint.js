import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

// import { ComponentToPrint } from './ComponentToPrint';

const Componente = () => {
    return (
        <div>
            Componente
        </div>
    )
}

const PrintPrint = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Componente ref={componentRef} />
    </div>
  );
};

export default PrintPrint