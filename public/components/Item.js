import React, { Component, PropTypes } from 'react';
import styles from './Item.css'
import Avatar from 'react-avatar'
import ReactLetterAvatar from 'react-letter-avatar'

class Item extends Component {

  render() {

    let {email, name} = this.props
    
    return(
      <div className={styles.reply}>
        <div className={styles.avatar}>
        <ReactLetterAvatar name={email} size={48}/>
        </div>
        <div className={styles.infos}>
          {name}
        </div>
      </div>
    )
  }
}

export default Item;