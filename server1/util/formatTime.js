
 const formatDate={
    getTime:(date) => {
        if (date instanceof Date) {
          return date.toISOString().slice(0, 19).replace('T', ' ');
        }
        return date;
      }
 } 
 module.exports=formatDate