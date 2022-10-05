import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import './App.css'

export default function App () {
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)

  async function fetchData () {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
    )
    const data = await response.json()
    console.log(data)
    setPhotos([...photos, ...data])
    setPage(page + 1)
  }

  return (
    <div className='App'>
      <h1>List</h1>

      <button onClick={fetchData}>Fetch photos</button>

      <div className='container'>
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchData}
          hasMore={true}
          loader={<p>Loading...</p>}
          endMessage={<p>End of list</p>}
        >
          <div>
            {photos &&
              photos.map((item, index) => {
                return <ListItem item={item} key={index} />
              })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

function ListItem (props) {
  return (
    <div className='photo' id={props.item.id}>
      <h6>{props.item.title}</h6>
      <img src={`${props.item.url}`} alt='random' />
    </div>
  )
}
