import React from 'react'
export const LinkCard = ({link})=>{

  return (
    <div className="row">
    <div className="col s12 m6 s4">
      <div className="card">
          <div className="card-content blue lighten-5">
            <h4>Ссылка</h4>
            <p>Количество кликов по данной ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{link.date.toString()}</strong></p>
            <p><a href={link.to} target="_blank" rel="noopener noreferrer">Ваша ссылка: {link.to}</a></p>
          </div>
          <div className="card-action">
            <p><a href={link.from} target="_blank" rel="noopener noreferrer">Источник: {link.from}</a></p>
          </div>
      </div>
    </div>
  </div>
  )
}
