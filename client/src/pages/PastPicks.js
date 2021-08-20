import React from 'react'
import Books from './../components/Books'
import { useGlobalContext } from '../context'

export default function PastPicks() {
  const { books } = useGlobalContext();

  return (
    <main>
      <Books/>
    </main>
  )
}