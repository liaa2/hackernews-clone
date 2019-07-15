import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Link from './Link'

//The gql function is used to parse the plain string that contains the GraphQL code
const FEED_QUERY = gql `
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

class LinkList extends Component {
  render(){
    return (
      // fetched data from the server via <Query /> render prop function
      // These 3 props provide information about the state of the network request:
      /* 1. loading: Is true as long as the request is still ongoing and the response hasn’t been received.
      2. error: In case the request fails, this field will contain information about what exactly went wrong.
      3. data: This is the actual data that was received from the server. */
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const linksToRender = data.feed.links
          
          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link key={link.id} link={link} index={index}/>
              ))}
            </div>
          ) 
        }}   
      </Query>
    )
  }
}

export default LinkList