import gql from 'graphql-tag'

const query = gql`
  query films {
    allFilms {
      edges {
        node {
          title
          id
          episodeID
          releaseDate
        }
      }
    }
  }
`

export default query
