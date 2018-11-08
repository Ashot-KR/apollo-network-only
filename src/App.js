import React, { Component } from 'react'
import { graphql, ApolloProvider } from 'react-apollo'

import query from './query'
import client from './client'

class App extends Component {
  constructor () {
    super()

    this.state = {
      showFilms: true
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <button onClick={() => { this.setState({ showFilms: !this.state.showFilms }) }}>
          {
            this.state.showFilms
              ? 'unmount films list'
              : 'mount films list'
          }
        </button>
        <div className="App">
          {
            this.state.showFilms
              ? <FilmsList />
              : <p>click button mount component</p>
          }
        </div>
      </ApolloProvider>
    )
  }
}

class FilmsListComponent extends Component {
  componentDidMount () {
    console.log('MOUNT', this.props.data.allFilms)
  }

  render () {
    if (this.props.data.loading) {
      return 'loading…'
    }

    return <ul>
      {
        this.props.data.allFilms.edges.map(({ node }) => (
          <li key={node.id}>{ node.title }</li>
        ))
      }
    </ul>
  }
}

const FilmsList = graphql(query, {
  options: () => {
    return {
      fetchPolicy: 'network-only'
    }
  }
})(FilmsListComponent)

export default App
