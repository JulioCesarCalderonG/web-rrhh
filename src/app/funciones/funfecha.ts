export const funDate = () => {
    const today = new Date();
    //const numberOfMlSeconds = today.getTime();
    //const addMlSeconds = 1 * 60 * 60000;
    //const date = new Date(numberOfMlSeconds - addMlSeconds);
    const date = new Date();
    const output = date.getFullYear() + "-" +String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
    const separ = String(date).split(" ");
    const fecha = output;
  
    const hora = separ[4]
    const ano = date.getFullYear();
    //const mes = `${String(date.getMonth()+1)}`.padStart(2,0);
    const mes = `${String(date.getMonth()+1).padStart(2,'0')}`;
    return {
      fecha,
      hora,
      ano,
      mes,
      today,
      date
    };
  };