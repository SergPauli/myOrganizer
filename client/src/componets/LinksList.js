import React from 'react'
import {Link} from 'react-router-dom'
export const LinksList = ({links})=>{
  if (!links.length>0) {
    return (
      <p className="center"> Ccылок пока нет </p>
    )
  }
  return (
    <div className="row">
    <div className="col s12 ">
    <table className="striped highlight">
      <thead>
        <tr>
            <th>№</th>
            <th>Оригинал</th>
            <th>Сокращенная</th>
            <th>Действие</th>
        </tr>
      </thead>

      <tbody>
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index+1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td><Link to={`/detail/${link._id}`}> Открыть</Link></td>
          </tr>
        )})
      }

      </tbody>
    </table>

    </div>
  </div>
  )
}
