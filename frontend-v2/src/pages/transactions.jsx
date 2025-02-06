import React from 'react'
import { TransactionItem } from '../Dashboard/transactionIteam'
import { TransactionsList } from '../Dashboard/transactionList'

function Transactions() {
  return (
    <div>
      <div className='h-screen w-68'>
        <TransactionsList/>
         <TransactionItem/>
      </div>
    </div>
  )
}

export default Transactions
