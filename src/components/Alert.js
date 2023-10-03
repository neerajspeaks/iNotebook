import React from 'react';

export default function Alert(props) {

  const capitalize = (word) => {
    if(word === 'danger') {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div className="row" style = {{height:'50', marginTop:'60px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong><center><i>{capitalize(props.alert.type)} : {props.alert.message}</i></center></strong>
      </div>}
    </div>
  );
}
